self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  self.skipWaiting(); // 🔥 important
});

self.addEventListener("activate", event => {
  console.log("Service Worker activating...");
  event.waitUntil(self.clients.claim()); // 🔥 important
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});
