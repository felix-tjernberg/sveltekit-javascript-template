import { build, files, version } from '$service-worker'

const WORKER = self
const CACHE_NAME = `static-chache-${version}`
const CACHE_URLS = build.concat(files)

WORKER.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			// console.log('[ServiceWorker] Pre-caching offline page')
			cache.addAll(CACHE_URLS).then(() => WORKER.skipWaiting())
		})
	)
})

WORKER.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== CACHE_NAME)
					.map((key) => {
						// console.log('[ServiceWorker] Removing old cache', key)
						return caches.delete(key)
					})
			)
		})
	)
	WORKER.clients.claim()
})

WORKER.addEventListener('fetch', (event) => {
	if (event.request.mode !== 'navigate') {
		return // Seems to be a guard clause for the SPA router
	}

	event.respondWith(
		caches
			.match(event.request)
			.then((cacheResponse) => {
				return (
					cacheResponse ||
					fetch(event.request).then((fetchRes) => {
						return caches.open(CACHE_NAME).then((cache) => {
							cache.put(event.request.url, fetchRes.clone())
							return fetchRes
						})
					})
				)
			})
			.catch(() => {
				return caches.match('/') // If the request fails, return the cached home page
			})
	)
})
