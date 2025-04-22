importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
  );
importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
  );
  
  self.addEventListener("install", function (e) {
    self.skipWaiting();
  });
  
  self.addEventListener("activate", function (e) {});
  
  self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    const targetUrl = event.notification.data?.url;
  
    if (!targetUrl) return;
  
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url.includes(targetUrl) && "focus" in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(targetUrl);
          }
        })
    );
  });
  
const firebaseConfig = {
    apiKey: "AIzaSyDoedunVjEmdmVraM_L9xrN6HNKMinue7o",
    authDomain: "wooco-d72ba.firebaseapp.com",
    projectId: "wooco-d72ba",
    storageBucket: "wooco-d72ba.firebasestorage.app",
    messagingSenderId: "48093061821",
    appId: "1:48093061821:web:4aac24e5a09e82625b8dd4",
    measurementId: "G-R5NZNL4Z67"
  };

  firebase.initializeApp(firebaseConfig);
  
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage((payload) => {
    const { title, body } = payload.notification || {};
    const url = payload.data?.url;
  
    const options = {
      badge: "/logo.png",
      image: "/logo.png",
      body: body || "새로운 메시지가 도착했어요.",
      icon: "/logo.png",
      data: url ? { url } : {},
    };
  
    self.registration.showNotification(title || "알림", options);
  });
  
  // install event
  self.addEventListener("install", (e) => {
    console.log("[Service Worker] installed");
  });
  
  // activate event
  self.addEventListener("activate", (e) => {
    console.log("[Service Worker] actived", e);
  });
  
  // fetch event
  self.addEventListener("fetch", (e) => {
    console.log("[Service Worker] fetched resource " + e.request.url);
  });