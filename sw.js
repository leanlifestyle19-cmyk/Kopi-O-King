// ── Kopi O King Service Worker ───────────────────────────────────────────────
// M1: Bump this on EVERY index.html deploy — never skip
const CACHE = 'kok-20260625';

// M16: List every external API host here. Currently none — fully offline game.
const BYPASS = [];

// M4: Use cache.add() individually — NOT cache.addAll() (fails atomically)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.add('./index.html'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// M5: Navigate requests → serve ./index.html by mode, not URL path
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Bypass list — skip caching for live API hosts
  if (BYPASS.some(h => url.hostname.includes(h))) return;

  // Navigate requests always get the app shell
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then(cached => cached || fetch(e.request))
    );
    return;
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      });
    })
  );
});