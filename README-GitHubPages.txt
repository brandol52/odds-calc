# Odds Calc — GitHub Pages PWA

This folder contains a ready-to-deploy Progressive Web App (PWA) stake calculator.
It works offline and supports iOS "Add to Home Screen" full-screen app mode.

## Deploy on GitHub Pages

1) Create a new public repo on GitHub, e.g., `odds-calc`.
2) Upload all files in this folder at the repo root:
   - index.html
   - manifest.webmanifest
   - service-worker.js
   - /icons/icon-192.png
   - /icons/icon-512.png
3) In the repo: Settings → Pages → Build and deployment:
   - Source: "Deploy from a branch"
   - Branch: "main" / root (`/`) → Save
4) After it builds, your site will be available at:
   `https://<your-username>.github.io/odds-calc/`

## Add to Home Screen (iOS)

1) Open the above URL in **Safari**.
2) Share → Add to Home Screen → Add.
3) Launch from the Home Screen icon — it opens full-screen and works offline.

## Dev Notes

- The service worker caches the app shell and icons for offline use.
- If you change files, bump the `CACHE_NAME` in `service-worker.js` to invalidate old caches.
- The manifest points `start_url` and `scope` to `.` so it works from `/` or `/repo/`.
