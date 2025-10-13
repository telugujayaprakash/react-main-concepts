// sw.js

// Listen for push events
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');

  let data = {
    title: 'Default Title',
    body: 'Default body',
    icon: '/icon.png',
    url: '/'
  };

  if (event.data) {
    try {
      data = event.data.json(); // Parse JSON payload from server
    } catch (err) {
      console.error('Error parsing push data', err);
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.icon, // Optional badge icon
    data: { url: data.url }, // Pass URL to click handler
    requireInteraction: true // Keep notification visible until user interacts
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click received.');

  event.notification.close(); // Close notification

  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Focus on an already open tab with the same URL
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Optional: handle push subscription changes
self.addEventListener('pushsubscriptionchange', event => {
  console.log('[Service Worker] Push Subscription change.');
  // You can re-subscribe here and send new endpoint to server if needed
});
