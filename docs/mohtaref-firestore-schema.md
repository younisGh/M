# Mohtaref – Firestore Data Model (AR default, EN optional)

This document defines a production-ready, extensible Firestore schema for Mohtaref. Arabic is the primary locale. Authentication: Iraqi phone (+964). Payments: ZainCash, AsiaHawala, QiCard. Calls: Firebase (signaling) + WebRTC.

## Conventions
- serverTimestamps: createdAt, updatedAt
- Soft delete via `deleted` flags when needed
- Denormalized counters with Cloud Functions writers only
- Security via custom claims: admin, companyOwner, staff
- Multitenancy not needed; project-wide resources

## Collections

### settings (singleton docs)
- general: { localeDefault: "ar", rtlDefault: true, featureFlags: {posts: true, chat: true, calls: true}, media: {maxImageMB: 10, maxVideoMB: 200, allowedTypes: ["image/jpeg","image/png","video/mp4"]}, payments: {required: true}}
- admin: {readOnlyBroadcastDefault: true, allowUserFilesInBroadcast: false}

### provinces
- id (auto)
- name_ar: string (required, unique)
- name_en: string (required)
- active: boolean (default true)

### sections
- id (auto)
- name_ar: string (required)
- name_en: string (required)
- parentId: string | null (for branches)
- order: number
- active: boolean (default true)

Seed initial 12 sections and their branches per specification.

### users
- id (uid)
- phone: string (+964…)
- displayName: string
- photoUrl: string
- bio: string
- provinceId: ref -> provinces
- sectionIds: string[] (one or more)
- roles: { admin?: boolean, companyOwner?: boolean, staff?: boolean }
- companyId: string | null
- subscription: { status: "active"|"inactive"|"past_due", planId: string | null, renewAt: timestamp | null }
- kyc: { status: "pending"|"approved"|"rejected", docs: string[] }
- fcmTokens: string[]
- blocks: string[] (ids the user blocked)
- createdAt, updatedAt

### companies
- id (auto)
- ownerUserId: uid
- name: string
- logoUrl: string
- bio: string
- provinceId: ref -> provinces
- sectionIds: string[]
- verified: boolean
- admins: string[] (uids)
- employees: string[] (uids)
- createdAt, updatedAt

### plans
- id (auto/string)
- name_ar, name_en: string
- price: number
- currency: "IQD"
- interval: "monthly"|"yearly"
- caps: { postsPerDay: number, mediaMaxMB: number, chatLimit: number }
- active: boolean

### subscriptions
- id (auto)
- ownerType: "user"|"company"
- ownerId: string
- planId: string
- status: "active"|"inactive"|"past_due"|"canceled"
- startedAt, renewAt
- paymentRef: string

### payments
- id (auto)
- ownerType: "user"|"company"
- ownerId: string
- amount: number
- currency: "IQD"
- provider: "zaincash"|"asiahawala"|"qicard"
- status: "initiated"|"pending"|"paid"|"failed"|"refunded"
- intentId: string
- receiptUrl: string
- createdAt

### posts
- id (auto)
- author: { type: "user"|"company", id: string }
- text: string
- media: [{ type: "image"|"video", url: string, thumb?: string, sizeMB?: number }]
- provinceId: string | null
- sectionIds: string[]
- visibility: "public"|"section"|"followers"
- stats: { comments: number, reactions: number, shares: number }
- createdAt, updatedAt

### comments
- id (auto)
- postId: string
- authorId: string
- text: string
- parentId: string | null
- createdAt

### reactions
- id (auto)
- postId: string
- userId: string
- type: "like"|"up"|"down"
- createdAt

### follows
- id (auto)
- followerId: string
- followingId: string
- followingType: "user"|"company"
- createdAt

### friendRequests
- id (auto)
- fromId: string
- toId: string
- status: "pending"|"accepted"|"blocked"|"rejected"
- createdAt

### chats
- id (auto)
- type: "dm"|"group"|"admin_broadcast"
- memberIds: string[]
- readOnly: boolean
- allowFiles: boolean
- lastMessageAt: timestamp
- createdAt

### messages
- id (auto)
- chatId: string
- senderId: string
- text: string
- attachments: [{ type: "image"|"video"|"file", url: string, sizeMB?: number }]
- status: "sent"|"delivered"|"seen"
- deleted: boolean
- createdAt

### calls
- id (auto)
- chatId: string
- type: "audio"|"video"
- provider: "webrtc"
- channelId: string
- participantIds: string[]
- startedAt, endedAt

### notifications
- id (auto)
- userId: string
- type: string
- title: string
- body: string
- data: map
- seen: boolean
- createdAt

### reports
- id (auto)
- target: { type: "post"|"comment"|"user"|"company", id: string }
- reporterId: string
- reason: string
- status: "open"|"reviewing"|"resolved"|"rejected"
- createdAt

### blocks
- id (auto)
- blockerId: string
- blockedId: string
- createdAt

### media
- id (auto)
- ownerId: string
- path: string
- sizeMB: number
- type: "image"|"video"|"file"
- safeScan: { status: "pending"|"clean"|"flagged" }
- createdAt

### auditLogs
- id (auto)
- actorId: string
- action: string
- target: { type: string, id: string }
- meta: map
- createdAt

## Indexes (Composite)
- posts: sectionIds + createdAt DESC
- posts: provinceId + createdAt DESC
- posts: author.id + createdAt DESC
- posts: visibility + createdAt DESC
- messages: chatId + createdAt ASC
- payments: ownerId + createdAt DESC
- payments: status + createdAt DESC
- comments: postId + createdAt ASC
- reactions: postId + userId (unique via write rule)
- follows: followerId + createdAt DESC, followingId + createdAt DESC
- friendRequests: toId + status

## Security Principles (summary)
- Read public profiles/sections/provinces; writes restricted to owners/admins
- Enforce active subscription for posting/messaging (Functions write)
- Admin broadcast: only admin unless readOnly=false
- Payments/subscriptions writes via HTTPS Callable/Webhooks only
- Block and visibility checks in chat/post reads
