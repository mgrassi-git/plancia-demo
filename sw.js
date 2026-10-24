/* Quota — vetrina (build 20261024-124758) */
const V="plancia-demo-20261024-124758";
const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL).catch(()=>{}))); self.skipWaiting(); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("plancia-demo-")&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{ const r=e.request; if(r.method!=="GET")return;
  e.respondWith(fetch(r).then(x=>{ if(x.ok){ const c=x.clone(); caches.open(V).then(ca=>ca.put(r,c)).catch(()=>{}); } return x; }).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||Response.error())));
});
