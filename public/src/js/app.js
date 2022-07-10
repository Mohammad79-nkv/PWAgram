if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../../sw.js")
    .then((res) => console.log("serviceWorker registered", res))
    .catch((err) => console.log(err));
}
