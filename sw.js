var CACHE = "selfevopi-v1";

var ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./site.webmanifest",
  "./assets/og.svg",
  "./assets/selfevopi.ico",
  "./assets/wordmark.svg",
  "./assets/logo-dna-branco.svg",
  "./assets/logo-dna.svg"
];

self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE).then(function(cache){
      return cache.addAll(ASSETS);
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(key){ return key !== CACHE; }).map(function(key){ return caches.delete(key); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(event){
  var request = event.request;
  if(request.method !== "GET"){ return; }
  if(request.url.indexOf("http") !== 0){ return; }

  event.respondWith(
    caches.match(request).then(function(hit){
      if(hit){ return hit; }
      return fetch(request).then(function(response){
        if(response && response.ok && response.type === "basic"){
          var copy = response.clone();
          caches.open(CACHE).then(function(cache){ cache.put(request, copy); });
        }
        return response;
      }).catch(function(){
        if(request.mode === "navigate"){ return caches.match("./index.html"); }
        return caches.match("./index.html");
      });
    })
  );
});