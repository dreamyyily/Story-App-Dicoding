const CACHE_NAME = "story-cache-v1";

const OFFLINE_URL = `${self.registration.scope}offline.html`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([OFFLINE_URL]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  }
});

self.addEventListener("push", (event) => {
  let title = "Story berhasil dibuat";
  let body = "Anda telah membuat story baru";

  if (event.data) {
    try {
      const data = event.data.json();

      title = data.title || title;
      body = data.options?.body || body;
    } catch (e) {
      body = event.data.text();
    }
  }

  const options = {
    body: body,
    icon: "/icons/icon-192.png",  
    badge: "/icons/icon-512.png",
    tag: "story-creation",
    renotify: true
  };

  event.waitUntil(
    (async () => {
      await self.registration.showNotification(title, {
        body,
      });
    })()
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(self.registration.scope));
});
