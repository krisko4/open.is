/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js').then(registration => {
    console.log('hello')
    console.log(registration.scope)
  })
}

const firebaseConfig = {
  apiKey: 'AIzaSyDL4dXISILsjIUSq8kvGxQ_0cuVtxDWFZo',
  authDomain: 'open-is-push-notifications.firebaseapp.com',
  projectId: 'open-is-push-notifications',
  storageBucket: 'open-is-push-notifications.appspot.com',
  messagingSenderId: '528337537286',
  appId: '1:528337537286:web:1ba9f06afa5b85e3b43687',
  measurementId: 'G-HDWE95MVH6',
};

firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

// messaging.onMessage(function(payload) {
//   console.log('Received message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

