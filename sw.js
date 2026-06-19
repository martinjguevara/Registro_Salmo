const CACHE_NAME = 'fichaje-cache-v1';

// Los archivos que queremos guardar en el disco de la tablet
const urlsToCache = [
  './index.html',
  'https://unpkg.com/dexie/dist/dexie.js'
];

// Instalación del Service Worker: Descarga y guarda los archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta las peticiones: Si no hay red, saca los archivos del caché
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el archivo en caché si existe, si no, busca en la red
        return response || fetch(event.request);
      })
  );
});