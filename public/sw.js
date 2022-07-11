const updatedVersion = "V1";

self.addEventListener("install", (event) => {
  console.log("serive worker installing ...");
  event.waitUntil(
    caches.open(updatedVersion).then((cache) => {
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/js/material.min.js",
        "/src/js/fetch.js",
        "/src/js/promise.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/css/help.css",
        "/src/images/main-image.jpg",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
      ]);
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
