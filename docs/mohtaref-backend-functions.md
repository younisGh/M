# Mohtaref – Backend (Cloud Functions) Plan

Auth: Phone (+964). Payments: ZainCash, AsiaHawala, QiCard. Signaling: Firebase for WebRTC. Notifications: FCM. Storage scanning.

## Triggers
- auth.onCreate: seed `users` doc, default claims, province/section placeholders, init `fcmTokens` array
- firestore.posts.onCreate: inc counters, notify followers/section, enqueue media scan
- firestore.messages.onCreate: update chats.lastMessageAt, push FCM to recipients, apply anti-spam
- firestore.reports.onCreate: notify moderators

## Schedules (pub/sub)
- nightly backups export to Storage
- stale fcmTokens cleanup
- analytics aggregation (daily active users, posts per section)

## Callable HTTPS endpoints
- paymentsCreateIntent({planId, ownerType, ownerId, provider}): returns provider-specific payment URL/QR
- paymentsVerify({intentId, provider}): verify status with PSP; update `payments` and `subscriptions`
- adminBroadcast({title, body, data, allowReplies}): create/update admin broadcast chat, toggle readOnly
- toggleChatLock({chatId, readOnly}): owner/admin lock/unlock

## Webhooks (HTTP)
- /webhooks/zaincash: verify signature, map to `payments`
- /webhooks/asiahawala: verify, map
- /webhooks/qicard: verify, map

## Media Safety
- On upload finalize (Storage): scan via Vision/3rd-party; write `media.safeScan.status`

## Presence & Calls
- RTDB presence for online status
- createOffer/createAnswer/iceCandidate via Firestore subcollections per chat call session

## Config & Secrets
- Use runtime config/ENV: PSP keys/secrets, webhook secrets, adminUserIds, feature flags

## Error Handling & Observability
- Structured logs, Sentry integration, retries with idempotency keys for payments
