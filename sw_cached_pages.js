const cacheName = "v1";
const cacheAssets = ["index.html", "about.html", "/style/style.css"];

// attach "install" eventListener to the serviceWorker itself
self.addEventListener("install", (e) => {
  console.log("Service worker installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("cache opened");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// attach "activate" eventListener to the serviceWorker itself
self.addEventListener("activate", function (e) {
  console.log("Service worker activated");
  // Removing un-used Cache Logic
  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .map(function (cache) {
            if(cache != cacheName) return caches.delete(cache);
          })
      );
    })
  );
});


self.addEventListener("fetch",(e) => {
    console.log("Fetch Event running")
e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
})