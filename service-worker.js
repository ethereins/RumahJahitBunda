const CACHE_NAME = 'rumah-jahit-bunda-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',  
  '/about.html',
  '/contact.html',
  '/styles.css',
  '/192x192.png',
  '/512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Cache opened');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        return caches.match('/offline.html');
    });
    })
  );
});
