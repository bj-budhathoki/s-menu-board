//cachaname
var STATIC_CACHE_NAME = 'static-v1';
//app shell assets to cache
const assetsToCache = [
    '/',
    'index.html',
    'global.css',
    './build/bundle.css',
    './build/bundle.js',
    'https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i,900'
]

//service worker installation
self.addEventListener('install', function (e) {
    console.log('sw install')
    e.waitUntil(caches.open(STATIC_CACHE_NAME).then(function (cache) {
        cache.addAll(assetsToCache)
    }))
})
//network then cache fallback
self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .then(function (res) {
                return caches.open(STATIC_CACHE_NAME)
                    .then(function (cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
            })
            .catch(function (err) {
                return caches.match(event.request);
            })
    );
});