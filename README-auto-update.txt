# Auto-refreshing Service Worker

Drop `service-worker.js` into your repo root (replace the existing one).
This version:
- Activates immediately (skipWaiting + clients.claim)
- Uses **network-first** for HTML navigations so new deploys show up fast
- Uses **cache-first** for static assets (icons, manifest)
- Supports instant activation when the page sends a `SKIP_WAITING` message

## Update your `index.html` registration (minimal example)

```html
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const reg = await navigator.serviceWorker.register('./service-worker.js');

    // Check for updates on load and every 15 minutes
    reg.update();
    setInterval(() => reg.update(), 15 * 60 * 1000);

    // When a new worker is installed, tell it to activate immediately
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      if (!newSW) return;
      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
          else newSW.postMessage('SKIP_WAITING');
        }
      });
    });

    // When the controller changes (new SW took over), reload the page
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  });
}
</script>
```

No need to bump a cache version manually on each deploy. Pushing to `main` will roll out a new SW file; the page will update itself and refresh once the new worker takes control.
