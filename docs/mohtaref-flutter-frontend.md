# Mohtaref – Flutter Frontend Plan (Mobile & Web)

Primary locale: AR (RTL). Secondary: EN. Auth: Phone (+964). Payments: ZainCash, AsiaHawala, QiCard. Calls: WebRTC.

## Packages
- firebase_core, firebase_auth, cloud_firestore, firebase_storage, firebase_messaging
- flutter_localizations, intl, easy_localization (or arb) – AR default RTL
- go_router (routing), riverpod (state) or bloc
- dio (network), freezed/json_serializable (models)
- cached_network_image, image_picker/file_picker, video_player/chewie
- flutter_webrtc (calls), permission_handler

## App Structure
- app/ (theme, i18n, router)
- features/
  - auth/ (phone login, reCAPTCHA safety)
  - onboarding/ (province + section/branch)
  - paywall/ (plans, payment start + verify)
  - profile/ (user/company, KYC)
  - feed/ (posts, comments, reactions, share)
  - search/ (users/companies by section/province)
  - chat/ (DMs, groups, admin broadcast, attachments, block/mute)
  - calls/ (setup & join, signaling via Firestore, WebRTC)
  - notifications/ (FCM, topics per section)
  - admin/ (moderation, settings)

## Localization
- AR as default with full RTL; EN supported; text resources via ARB files; numerals per locale

## UX Notes
- Enforce paywall gates on posting/messaging when subscription inactive
- Section/province filters throughout
- Media limits and progress UI on uploads
- Accessibility: scalable text, high contrast, keyboard nav on web
