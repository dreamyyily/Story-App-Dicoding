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

self.addEventListener("push", async (event) => {
  if (!event.data) return;

  if (Notification.permission !== "granted") {
    console.warn("Push received but notification permission not granted.");
    return;
  }

  let data = {};

  try {
    data = event.data.json();
  } catch (err) {
    data = { title: "Notification", body: event.data.text() };
  }

  const title = data.title || "Story App Notification";
  const body = data.body || "You have a new notification";

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
