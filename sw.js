const CACHE = "geo-v1";

const FILES = [
  "/",
  "/index.html",
  "/report.html",
  "/offline.html",
  "/style.css",
  "/js/app.js",
  "/js/db.js",
  "/js/camera.js",
  "/js/geo.js",
  "/js/notifications.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(FILES))
  );
});

self.addEventListener("fetch", e => {

  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});