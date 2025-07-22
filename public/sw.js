const CACHE_NAME = 'encouramind-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/offline.html',
  'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753161969397-EncouraMind%20favicon.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

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

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Sync offline data when connection is restored
  console.log('Background sync triggered');
}

// Push Notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New encouragement message available!',
    icon: 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753161969397-EncouraMind%20favicon.jpg',
    badge: 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753161969397-EncouraMind%20favicon.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'View Message', icon: 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753161969397-EncouraMind%20favicon.jpg'},
      {action: 'close', title: 'Close', icon: 'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1753161969397-EncouraMind%20favicon.jpg'}
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('EncouraMind', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/daily')
    );
  }
});