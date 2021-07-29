const cacheName = 'pwa-cache-v1';
const filesToCache = [
    '/dd/',
    '/dd/user/hp/',
    '/dd/fonts/Nunito-Regular.ttf',
    '/dd/fonts/Nunito-Bold.ttf',
    '/dd/fonts/materials.woff2',
    '/dd/sass/main.min.css',
    '/dd/img/logo.svg',
    '/dd/js/main.min.js'
];

self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(cacheName).then(cache => {return cache.addAll(filesToCache)})
    );
});

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(e.request))
        .then(function(response){
            return response || fetch(e.request);
        })
    );
});