/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

let CACHE_NAME = 'React App';
let urlsToCache = ['/'];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function (registration) {})
    .catch(function (err) {});
}

// Install a service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Cache and return requests
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    }),
  );
});

// Update a service worker
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  let cacheWhitelist = ['React App'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

const firebaseConfig = {
  apiKey: 'AIzaSyCrtNWy-vBMARmFHQU57WeqeTFQsInB3Vg',
  authDomain: 'test-notification-coffee-app.firebaseapp.com',
  databaseURL: 'https://test-notification-coffee-app-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'test-notification-coffee-app',
  storageBucket: 'test-notification-coffee-app.appspot.com',
  messagingSenderId: '180423453297',
  appId: '1:180423453297:web:f1f70e65394de09bbb49d0',
  measurementId: 'G-V07GNPW3NJ',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: './images/OTSVLogo.png',
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});

// FIXME: Notification click can improve UX by below code
// if the user is already open the coffe app tab then focuses tab
// if not , open a new coffe app tab tab
// event.waitUntil(clients.matchAll({
//   type: "window"
// }).then(function(clientList) {
//   for (var i = 0; i < clientList.length; i++) {
//     var client = clientList[i];
//     if (client.url == '/' && 'focus' in client)
//       return client.focus();
//   }
//   if (clients.openWindow)
//     return clients.openWindow('/');
// }));
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
