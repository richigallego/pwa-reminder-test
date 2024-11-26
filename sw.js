self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    return self.clients.claim();
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(windowClients => {
            // Si hay una ventana abierta, enfócala
            if (windowClients.length > 0) {
                windowClients[0].focus();
            }
            // Si no, abre una nueva
            else {
                clients.openWindow('/');
            }
        })
    );
});