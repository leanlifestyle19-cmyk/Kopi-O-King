const CACHE='kok-20260626c';
const BYPASS=[];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.add('./index.html')));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(BYPASS.some(h=>url.hostname.includes(h)))return;
  if(e.request.mode==='navigate'){e.respondWith(caches.match('./index.html').then(c=>c||fetch(e.request)));return;}
  e.respondWith(caches.match(e.request).then(c=>{if(c)return c;return fetch(e.request).then(r=>{const cl=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,cl));return r;});}));
});