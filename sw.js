const CACHE_NAME="mission-planner-github-v18";
const APP_SHELL=[
  "./",
  "./index.html",
  "./planner.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached =>
          cached || caches.match("./index.html")
        )
      )
  );
});

// This handler is ready for Web Push if a backend is connected in a future version.
self.addEventListener("push", event => {
  let data = {
    title: "⏰ Timer finished",
    body: "Your activity timer has finished.",
    url: "./planner.html",
    tag: "mission-planner-timer"
  };

  try {
    if (event.data) data = {...data, ...event.data.json()};
  } catch {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "./icon-192.png",
      badge: "./icon-192.png",
      tag: data.tag,
      data: {url: data.url}
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target = event.notification.data?.url || "./planner.html";

  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true
    });

    for (const client of windows) {
      if ("focus" in client) {
        try { await client.navigate(target); } catch {}
        return client.focus();
      }
    }

    if (self.clients.openWindow) return self.clients.openWindow(target);
  })());
});
