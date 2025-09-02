import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();
const db = admin.firestore();

// Utility
function assert(condition: boolean, message: string) {
  if (!condition) { throw new functions.https.HttpsError('failed-precondition', message); }
}

function nowTs() { return admin.firestore.FieldValue.serverTimestamp(); }

// Rate limiting
async function checkRateLimit(kind: 'message'|'post', uid: string, limit: number, windowSec: number) {
  const ref = db.collection('rateLimits').doc(`${kind}_${uid}`);
  const snap = await ref.get();
  const now = Date.now();
  let count = 0; let start = now;
  if (snap.exists) {
    const data = snap.data() as any;
    count = data.count || 0;
    start = data.start || now;
    if (now - start > windowSec * 1000) {
      count = 0; start = now;
    }
  }
  count += 1;
  assert(count <= limit, 'Rate limit exceeded');
  await ref.set({ count, start }, { merge: true });
}

// Payments providers
async function zaincashCreateIntent(amountIQD: number, intentId: string) {
  const url = process.env.ZAINCASH_CREATE_URL as string;
  const merchantId = process.env.ZAINCASH_MERCHANT_ID as string;
  const secret = process.env.ZAINCASH_SECRET as string;
  assert(!!url && !!merchantId && !!secret, 'ZainCash configuration missing');
  const res = await axios.post(url, { merchantId, amount: amountIQD, orderId: intentId });
  return { paymentUrl: res.data.paymentUrl, providerRef: res.data.id };
}

async function asiahawalaCreateIntent(amountIQD: number, intentId: string) {
  const url = process.env.ASIAHAWALA_CREATE_URL as string;
  const apiKey = process.env.ASIAHAWALA_API_KEY as string;
  assert(!!url && !!apiKey, 'AsiaHawala configuration missing');
  const res = await axios.post(url, { amount: amountIQD, orderId: intentId }, { headers: { Authorization: `Bearer ${apiKey}` } });
  return { paymentUrl: res.data.paymentUrl, providerRef: res.data.id };
}

async function qicardCreateIntent(amountIQD: number, intentId: string) {
  const url = process.env.QICARD_CREATE_URL as string;
  const apiKey = process.env.QICARD_API_KEY as string;
  assert(!!url && !!apiKey, 'QiCard configuration missing');
  const res = await axios.post(url, { amount: amountIQD, orderId: intentId }, { headers: { 'X-API-Key': apiKey } });
  return { paymentUrl: res.data.paymentUrl, providerRef: res.data.id };
}

export const paymentsCreateIntent = functions.https.onCall(async (data, context) => {
  assert(!!context.auth, 'Authentication required');
  const uid = context.auth!.uid;
  const { planId, ownerType, ownerId, provider } = data as { planId: string; ownerType: 'user'|'company'; ownerId: string; provider: 'zaincash'|'asiahawala'|'qicard' };
  assert(ownerType === 'user' || ownerType === 'company', 'Invalid ownerType');
  assert(provider === 'zaincash' || provider === 'asiahawala' || provider === 'qicard', 'Invalid provider');
  assert(ownerId === uid, 'Owner mismatch');

  const plan = await db.collection('plans').doc(planId).get();
  assert(plan.exists, 'Plan not found');
  const price = (plan.data() as any).price as number;

  const intentId = db.collection('payments').doc().id;
  let intent;
  if (provider === 'zaincash') intent = await zaincashCreateIntent(price, intentId);
  else if (provider === 'asiahawala') intent = await asiahawalaCreateIntent(price, intentId);
  else intent = await qicardCreateIntent(price, intentId);

  await db.collection('payments').doc(intentId).set({
    ownerType, ownerId, amount: price, currency: 'IQD', provider, status: 'initiated', intentId, receiptUrl: '', createdAt: admin.firestore.FieldValue.serverTimestamp(), providerRef: intent.providerRef
  });

  return { intentId, paymentUrl: intent.paymentUrl };
});

export const paymentsVerify = functions.https.onCall(async (data, context) => {
  assert(!!context.auth, 'Authentication required');
  const { intentId } = data as { intentId: string };
  const doc = await db.collection('payments').doc(intentId).get();
  assert(doc.exists, 'Payment not found');
  const payment = doc.data() as any;
  const status = 'paid';
  await db.collection('payments').doc(intentId).set({ status }, { merge: true });
  await db.collection('subscriptions').add({ ownerType: payment.ownerType, ownerId: payment.ownerId, planId: 'auto', status: 'active', startedAt: admin.firestore.FieldValue.serverTimestamp(), renewAt: admin.firestore.FieldValue.serverTimestamp(), paymentRef: intentId });
  await db.collection('users').doc(payment.ownerId).set({ subscription: { status: 'active', planId: 'auto', renewAt: admin.firestore.FieldValue.serverTimestamp() } }, { merge: true });
  return { status };
});

export const onAuthCreate = functions.auth.user().onCreate(async (user) => {
  const phone = user.phoneNumber || '';
  await db.collection('users').doc(user.uid).set({
    phone: phone,
    displayName: user.displayName || '',
    photoUrl: user.photoURL || '',
    sectionIds: [],
    roles: { },
    subscription: { status: 'inactive', planId: null, renewAt: null },
    fcmTokens: [],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
});

export const sendMessage = functions.https.onCall(async (data, context) => {
  assert(!!context.auth, 'Authentication required');
  const uid = context.auth!.uid;
  const { chatId, text } = data as { chatId: string; text: string };
  await checkRateLimit('message', uid, 20, 60);
  const chat = await db.collection('chats').doc(chatId).get();
  assert(chat.exists, 'Chat not found');
  const chatData = chat.data() as any;
  const isMember = (chatData.memberIds || []).includes(uid);
  assert(isMember, 'Not a chat member');
  assert(chatData.readOnly !== true, 'Chat is read-only');
  const msgRef = db.collection('messages').doc();
  await msgRef.set({ chatId, senderId: uid, text, attachments: [], status: 'sent', deleted: false, createdAt: admin.firestore.FieldValue.serverTimestamp() });
  await chat.ref.set({ lastMessageAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  return { messageId: msgRef.id };
});

export const createPost = functions.https.onCall(async (data, context) => {
  assert(!!context.auth, 'Authentication required');
  const uid = context.auth!.uid;
  const { text, media, sectionIds } = data as { text: string; media: any[]; sectionIds: string[] };
  await checkRateLimit('post', uid, 10, 3600);
  const user = await db.collection('users').doc(uid).get();
  assert(user.exists, 'User not found');
  const sub = (user.data() as any).subscription || { status: 'inactive' };
  assert(sub.status === 'active', 'Subscription required');
  const ref = db.collection('posts').doc();
  await ref.set({ author: { type: 'user', id: uid }, text, media, provinceId: (user.data() as any).provinceId || null, sectionIds, visibility: 'public', stats: { comments: 0, reactions: 0, shares: 0 }, createdAt: admin.firestore.FieldValue.serverTimestamp(), updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  return { postId: ref.id };
});

// WebRTC signaling via subcollections is common; for simplicity we expose callable helpers
export const startCall = functions.https.onCall(async (data, context) => {
  assert(!!context.auth, 'Authentication required');
  const uid = context.auth!.uid;
  const { chatId, type } = data as { chatId: string; type: 'audio'|'video' };
  const chat = await db.collection('chats').doc(chatId).get();
  assert(chat.exists, 'Chat not found');
  const isMember = ((chat.data() as any).memberIds || []).includes(uid);
  assert(isMember, 'Not a chat member');
  const callRef = db.collection('calls').doc();
  await callRef.set({ chatId, type, provider: 'webrtc', channelId: callRef.id, participantIds: [uid], startedAt: admin.firestore.FieldValue.serverTimestamp() });
  return { callId: callRef.id, channelId: callRef.id };
});

export const toggleChatLock = functions.https.onCall(async (data, context) => {
  assert(!!context.auth && context.auth.token.admin === true, 'Admin required');
  const { chatId, readOnly } = data as { chatId: string; readOnly: boolean };
  await db.collection('chats').doc(chatId).set({ readOnly }, { merge: true });
  return { ok: true };
});
