const CACHE_NAME = 'rumah-jahit-bunda-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',  
  '/about.html',
  '/contact.html',
  '/styles.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(function() {
        return caches.match('/offline.html').then(function(response) {
          if (response) {
            return response;
          } else {
            self.clients.openWindow('/offline.html');
          }
        });
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
