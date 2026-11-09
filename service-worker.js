const CACHE = "luvitus-store-v2";
const CORE = ["./","./index.html","./styles.css","./app.js","./config.js","./products.js","./manifest.webmanifest","./assets/logo.svg","./assets/cart.svg","./assets/hero-placeholder.svg","./assets/story-placeholder.svg","./assets/product-tonic.svg","./assets/product-capsules.svg","./assets/product-cream.svg","./assets/product-soap.svg"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy=response.clone(); caches.open(CACHE).then(cache=>cache.put(event.request,copy)); }
    return response;
  }).catch(() => caches.match("./index.html"))));
});
