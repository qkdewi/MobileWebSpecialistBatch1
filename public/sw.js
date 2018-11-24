// versi
var CACHE_NAME = 'qomariah-mws-v6';
var urlsToCache = [
    '/',
    '/css/peta.css',
    '/css/style.css',
    '/data/peta.json',
    '/images/gambar.jpg',
    '/images/icon.png',
    '/images/ikan_bakar.jpg',
    '/images/Qomariah.jpg',
    '/images/resto_spanyol.jpg',
    '/images/seafood.jpeg',
    '/images/steak.jpg',
    '/images/warkop.jpg',
    '/js/peta.js',
    '/kalkulator/kalkulator.html',
    '/kalkulator/kalkulator.js',
    '/maps/leaflet.html',
    '/maps/leaflet.css',
    '/peta.html'
];

//install service worker
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('in install serviceWorker.... cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// activate
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName != CACHE_NAME
        }).map(function(cacheName){
          return caches.delete(cacheName)
        })
      );
    })
  );
});