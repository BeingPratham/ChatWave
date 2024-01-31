const CACHE_NAME = "version-1"
// const urlToCache = ["index.html", "offline.html"]
const urlsToCache = [
    '/',
    '/index.html',
    ];

// this.addEventListener('install', (event)=>{
//     event.waitUntil(
//         caches.open(CACHE_NAME).then((cache)=>{
//             console.log("Open Cache")
//             return cache.addAll(urlToCache);
//         })
//     )
// })
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
    })
    );
    self.skipWaiting();
    });

// this.addEventListener("fetch", (event)=>{
//     event.respondWith(
//         caches.match(event.request).then((res)=>{
//             return fetch(event.request).catch(()=>caches.match('offline.html'))
//         })
//     )
// })
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request)
    .then(function(response) {
    if (response) {
    return response;
    }
    return fetch(event.request);
    })
    );
    });

this.addEventListener("activate", (event)=>{
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)
    event.waitUntil(caches.keys().then((cacheNames)=>Promise.all(
        cacheNames.map((cacheName)=>{
            if(!cacheWhiteList.includes(cacheName)){
                return caches.delete(cacheName);
            }
        })
    )))
})