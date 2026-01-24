const CACHE_NAME = 'labourer-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/photo.jpg',
  '/manifest.json'
];

// При установке service worker — кэшируем файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// При запросе файлов — сначала проверяем кэш, потом идем в сеть
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
     