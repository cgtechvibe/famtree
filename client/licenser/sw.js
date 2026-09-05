const CACHE_NAME = 'pwa-wrapper-v1';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });

self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });

self.addEventListener('fetch', (e) => { if (!e.request.url.startsWith(self.location.origin)) return; e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open(CACHE_NAME).then((ca) => ca.put(e.request, c)); return r; }).catch(() => caches.match(e.request))); });