const CACHE_VERSION='spid-notify-v1';

self.addEventListener('install',event=>{
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=event.notification?.data?.url||'/';
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of windows){
      if('focus' in client){
        try{await client.focus();if('navigate' in client)await client.navigate(target);}catch(e){}
        return;
      }
    }
    if(self.clients.openWindow)await self.clients.openWindow(target);
  })());
});
