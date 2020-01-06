"use strict";
var GolServiceWorker = /** @class */ (function () {
    function GolServiceWorker() {
    }
    GolServiceWorker.run = function () {
        addEventListener('install', GolServiceWorker.onInstalled);
        addEventListener('fetch', GolServiceWorker.onFetched);
    };
    GolServiceWorker.isLocalHost = function () {
        return location.hostname == "localhost";
    };
    GolServiceWorker.onInstalled = function (event) {
        event.waitUntil(caches.open('v0.1').then(function (cache) {
            var prefix = GolServiceWorker.isLocalHost() ? "" : "/golpwa";
            return cache.addAll([
                prefix + '/',
                prefix + '/js/index.js',
                prefix + '/images/icon-192.png',
                prefix + '/images/icon-512.png',
                prefix + '/css/base-min.css',
                prefix + '/css/buttons-min.css',
                prefix + '/css/forms-min.css',
                prefix + '/css/grids-min.css',
                prefix + '/css/menus-min.css',
                prefix + '/css/styles.css'
            ]);
        }));
    };
    GolServiceWorker.onFetched = function (event) {
        event.respondWith(caches.match(event.request).then(function (matchResponse) {
            return matchResponse || fetch(event.request).then(function (fetchResponse) {
                return caches.open('v0.1').then(function (cache) {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }));
    };
    return GolServiceWorker;
}());
GolServiceWorker.run();
