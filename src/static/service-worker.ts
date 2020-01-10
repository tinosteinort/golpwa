class GolServiceWorker {

    public static run(): void {
        addEventListener('install', GolServiceWorker.onInstalled);
        addEventListener('fetch', GolServiceWorker.onFetched);
    }

    private static isLocalHost(): boolean {
        return location.hostname == "localhost";
    }

    public static onInstalled = (event: any): void => {
        event.waitUntil(
            caches.open('v0.2').then((cache) => {
                const prefix = GolServiceWorker.isLocalHost() ? "" : "/golpwa";
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
            })
        );
    }

    public static onFetched = (event: any): void => {
        event.respondWith(
            caches.match(event.request).then((matchResponse) => {
                return matchResponse || fetch(event.request).then((fetchResponse) => {
                    return caches.open('v0.2').then((cache) => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
}

GolServiceWorker.run();