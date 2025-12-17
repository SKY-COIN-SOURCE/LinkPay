// ============================================================
// SERVICE WORKER PARA PUSH NOTIFICATIONS
// ============================================================

const CACHE_NAME = 'linkpay-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Push event - Recibir notificaciones push
self.addEventListener('push', (event) => {
  let data = {};
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'LinkPay', body: event.data.text() };
    }
  }

  const options = {
    body: data.body || data.message || 'Nueva notificación',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: data.id || 'linkpay-notification',
    data: data.metadata || {},
    requireInteraction: data.priority === 'urgent',
    silent: false,
    actions: data.actions || [],
    image: data.image,
    timestamp: Date.now(),
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'LinkPay', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const urlToOpen = data.url || '/app';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Si hay una ventana abierta, enfocarla
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Si no, abrir nueva ventana
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Background sync (opcional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notifications') {
    event.waitUntil(
      // Sincronizar notificaciones pendientes
      Promise.resolve()
    );
  }
});
