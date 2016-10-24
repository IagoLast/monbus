var CACHE_NAME = 'sw-cache-monbus-' + (self.registration ? self.registration.scope : '');

var urlsToCache = [
	'https://iagolast.github.io/',
	'https://iagolast.github.io/index.html',
	'https://iagolast.github.io/manifest.json',
	'https://iagolast.github.io/stations.json',
	'https://iagolast.github.io/scripts/app.js',
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function(e) {
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== CACHE_NAME) {
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});
