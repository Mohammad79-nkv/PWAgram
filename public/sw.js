const updatedVersion = "V2";

self.addEventListener("install", (event) => {
  console.log("serive worker installing ...");
  event.waitUntil(
    caches.open(updatedVersion).then((cache) => {
      cache.addAll(["/src/js/app.js", "/", "/index.html"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("serive worker activate");
  event.waitUntil(
    caches.keys().then((keyList) => {
      keyList.map((key) => {
        if (key !== updatedVersion && key !== "dynamic") {
          console.log(key);
          caches.delete(key);
        }
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetching ", event);
  event.respondWith(
    caches.match(event.request).then((respond) => {
      if (respond) {
        return respond;
      } else {
        fetch(event.request).then((res) => {
          return caches.open("dynamic").then((cache) => {
            cache.put(event.request, res.clone());
            return res;
          });
        });
      }
    })
  );
});
