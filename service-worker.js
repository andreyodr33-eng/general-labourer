const CACHE_NAME = "general-labourer-v2";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./IMG_E1029.JPG",
  "./icon-32.png",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png" ];
// Установка и кэширование файлов
self.addEventListener("install", event => {
event.waitUntil( 
  caches.open(CACHE_NAME)
  .then(cache => cache.addAll(FILES_TO_CACHE))
  .then(() => self.skipWaiting())
  );
});
// Активация и удаление старого кэша этого приложения
self.addEventListener("activate", event => {
event.waitUntil(
caches.keys()
 .then(keys => Promise.all( 
   keys 
     .filter(key => 
         key.startsWith("labourer-pwa-") &&
         key !== CACHE_NAME
        ) 
        .map(key => caches.delete(key))
 )) 
       .then(() => self.clients.claim())
   );
});
// Сначала ищем файл в кэше, затем обращаемся к сети
self.addEventListener("fetch", event => { 
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    caches.match(event.request)
        .then(response => response || fetch(event.request))
  );
});
     
