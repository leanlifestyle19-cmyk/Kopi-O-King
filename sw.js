// FamChat Service Worker
// Cache version — bump this string to force cache refresh across all clients
const CACHE = 'fc-v13';

// Firebase CDN domains that must never be SW-cached (live data)
const BYPASS = ['gstatic.com','firebaseio.com','googleapis.com','firebaseapp.com'];

// ──────────────────────────────────────────────────────────────────
// INSTALL — fetch the app shell individually (never cache.addAll)
// ──────────────────────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.add('./index.html'))
      .then(() => self.skipWaiting())
  );
});

// ──────────────────────────────────────────────────────────────────
// ACTIVATE — delete old caches, claim all clients immediately
// ──────────────────────────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ──────────────────────────────────────────────────────────────────
// FETCH — routing strategy per request type
// ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // 1. Firebase CDN: always network-only — never intercept
  if (BYPASS.some(host => url.hostname.endsWith(host))) {
    return; // let the browser handle it directly
  }

  // 2. Navigation (page load): return the cached shell
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then(r => r || fetch(e.request))
    );
    return;
  }

  // 3. Everything else: cache-first, network fallback, cache the result
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        // Only cache valid, same-origin responses
        if (response && response.status === 200 && response.type !== 'opaque') {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline and not cached — nothing we can do
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});