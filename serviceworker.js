const CACHE_NAME = 'PreFinal';

let urlsToCache = [
  '/'
  ];

self.addEventListener('install', function(event) {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urlsToCache);
  })());
  
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    Promise.all(keyList.map((key) => {
      if (key === CACHE_NAME) { return; }
      caches.delete(key);
    }))
  }));
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(e.request, response.clone());
    return response;
  })());
});

