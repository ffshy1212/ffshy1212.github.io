'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "8ca1a7383ba0cfe61aacd555d2e36497",
"index.html": "206bc421aab5b2ea7e9cfa6a4cd2d9b1",
"/": "206bc421aab5b2ea7e9cfa6a4cd2d9b1",
"main.dart.js": "5b9cd2aebdebf35874a4bfe48417bf4c",
"flutter.js": "0816e65a103ba8ba51b174eeeeb2cb67",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "922758b984888d7cd8aed89e6df1dbc1",
"assets/AssetManifest.json": "289ec1c8295ca76f7b20b0f40c72f6f2",
"assets/NOTICES": "7ed33520caccf5c7b625965afba848c4",
"assets/FontManifest.json": "420932ea7c014c2578366e4fc42baac9",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/slot_9.png": "ca578112e1481c288acb8dfee7b66af8",
"assets/assets/images/slot_8.png": "84e4d0f6acfa848e59b26466549654a3",
"assets/assets/images/neon_result.png": "19e25e0c2bf879552a494e411ea9f4b9",
"assets/assets/images/slot_bg.webp": "9ca18dd602c3e5b27b32442bad887a9b",
"assets/assets/images/slot_0.png": "d71d6a1d79e4fa45b8d6e1a69b5b7712",
"assets/assets/images/slot_1.png": "dc464fef4921f3dbf0d0af75585c90b2",
"assets/assets/images/slot_3.png": "6fe517a4848ee5e78aa2bff3ec6d271d",
"assets/assets/images/slot_2.png": "c27f4415d8e2729b5e5322588a5c5c45",
"assets/assets/images/slot_10.png": "2c5b3da3d68c66906aca023de296481a",
"assets/assets/images/slot_6.png": "081041b6b779d7e5424bfd8659344b0a",
"assets/assets/images/slot_7.png": "a68a3b92e425cf01e9df0e2eebd396c7",
"assets/assets/images/slot_11.png": "00bccdb2b70fee7ddc06e1ef16a5d34b",
"assets/assets/images/slot_5.png": "2a16cac7f251eb63cad5591dde33113f",
"assets/assets/images/slot_4.png": "dd4a094b85e483ec86bedc4f73960f9e",
"assets/assets/images/slot_12.png": "ae389b0bd8cdf7ebc6a788ad3072d988",
"assets/assets/audio/running.mp3": "f1c2a0b084f7617c12f3754701fe03aa",
"assets/assets/audio/coin.mp3": "ae5becb14ace91ead6144d5c683ab0cc",
"assets/assets/audio/win.mp3": "41664a4254bed4efbbc33b7cb4a5b810",
"assets/assets/lottie/big_win_bg.json": "b64a68aaabab1daa6912e31e536fc16e",
"assets/assets/lottie/fireworks.json": "6519d1e9d9c601d7e93174aac3e25dc5",
"assets/assets/lottie/fireworks2.json": "2b9c9b16a331db63acae071cf8b3fd5e",
"assets/assets/lottie/mega_win.json": "e1719e1dedc6a859fbb6534225fdc361",
"assets/assets/lottie/star.json": "49f5febbad1f701c1b236357486c63e2",
"assets/assets/fonts/LasEnter.ttf": "c161024b53fd9d99a60fa0ebc0a587fb",
"assets/assets/fonts/beon.ttf": "84545563cda7ea96687b42c1a814ab03",
"assets/assets/fonts/Qomarun.ttf": "002ca843c75c72f492dfe7bd0d10aa0a",
"assets/assets/fonts/Bullpen3D.ttf": "4418ca7d16a9d0c52b8f9c58e6fada01",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
