/* Nexus Prima PWA v1: network-only pages, with a small offline fallback.
 * Change this version whenever offline.html changes.
 * Do not change the cache prefix without also planning old-cache cleanup.
 */
'use strict';
const CACHE_PREFIX = 'nexus-prima-pwa-';
const CACHE_NAME = CACHE_PREFIX + 'v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    // Safe here: this worker never caches the page or its JavaScript assets.
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  // Leave images, animation code, video, POSTs and other origins alone.
  if (request.method !== 'GET' || request.mode !== 'navigate' ||
      new URL(request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      // Never serve a service-worker-cached homepage or hide HTTP errors.
      return await fetch(request);
    } catch (_) {
      try {
        const cache = await caches.open(CACHE_NAME);
        const fallback = await cache.match(OFFLINE_URL);
        if (fallback) return fallback;
      } catch (_) { /* Device storage may be unavailable or cleared. */ }
      return new Response(
        '<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nexus Prima — Offline</title><body><h1>You are offline.</h1><p>Reconnect to continue exploring Nexus Prima.</p><a href="/">Try again</a></body></html>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }
  })());
});
