// Simple cache-first service worker
const CACHE_NAME = 'odds-calc-v1';
const ASSETS = ['./','./index.html','./manifest.json','./service-worker.js','./apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png','./icons/favicon.ico'];
self.addEventListener('install', (event) => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); });
self.addEventListener('activate', (event) => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))); });
self.addEventListener('fetch', (event) => { event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))); });
