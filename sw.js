const CACHE_NAME="mission-planner-github-v34";
const APP_SHELL=[
  "./",
  "./index.html",
  "./planner.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
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
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response=>{
        const copy=response.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));
        return response;
      })
      .catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./index.html")))
  );
});

self.addEventListener("push", event => {
  let data={
    title:"⏰ Activity timer finished",
    body:"Your timer has finished. Check what comes next.",
    tag:"mission-planner-timer",
    url:"./planner.html",
    force:false
  };

  try{
    if(event.data) data={...data,...event.data.json()};
  }catch{}

  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    const visible=windows.some(client=>client.visibilityState==="visible");

    // The open planner already has its own second-by-second alert.
    if(visible && !data.force) return;

    await self.registration.showNotification(data.title,{
      body:data.body,
      icon:"./icon-192.png",
      badge:"./icon-192.png",
      tag:data.tag,
      renotify:true,
      data:{url:data.url||"./planner.html"}
    });
  })());
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const target=event.notification.data?.url || "./planner.html";

  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    for(const client of windows){
      if("focus" in client){
        try{await client.navigate(target);}catch{}
        return client.focus();
      }
    }
    if(self.clients.openWindow) return self.clients.openWindow(target);
  })());
});
