self.addEventListener('install', e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./", 
                "./css/bootstrap.min.css", 
                "./css/style.css", 
                "./js/bootstrap.bundle.min.js", 
                "./js/jquery.min.js", 
                "./js/login.js", 
                "./assets/icons/manifest-icon-192.maskable.png"]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})