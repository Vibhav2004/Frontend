// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// firebase.initializeApp({
//     apiKey: "AIzaSyAbrKJQ8bf67i1LDjA9CXGyiKC5Ud192Bc",
//     projectId: "swipe-now",
//     messagingSenderId: "1057628436520",
//     appId: "1:1057628436520:web:9f367d79904e5e08765d1d"
  
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(payload => {
//   self.registration.showNotification(
//     payload.notification.title,
//     {
//       body: payload.notification.body,
//       icon: "/icon.png"
//     }
//   );
// });




// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyAbrKJQ8bf67i1LDjA9CXGyiKC5Ud192Bc",
//   projectId: "swipe-now",
//   messagingSenderId: "1057628436520",
//   appId: "1:1057628436520:web:9f367d79904e5e08765d1d"
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(payload => {
//   self.registration.showNotification(
//     payload.notification.title,
//     {
//       body: payload.notification.body,
//       icon: "/icon.png"
//     }
//   );
// });

// self.addEventListener("notificationclick", event => {
//   event.notification.close();

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true })
//       .then(clientList => {
//         for (const client of clientList) {
//           if (client.url.includes("/") && "focus" in client) {
//             return client.focus();
//           }
//         }
//         return clients.openWindow("/");
//       })
//   );
// });


importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAbrKJQ8bf67i1LDjA9CXGyiKC5Ud192Bc",
  projectId: "swipe-now",
  messagingSenderId: "1057628436520",
  appId: "1:1057628436520:web:9f367d79904e5e08765d1d"
});

const messaging = firebase.messaging();

// Background notifications
messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png" // make sure this icon exists
  });
});

// Notification click event
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url.includes("/") && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
  );
});
