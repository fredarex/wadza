importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')
 
firebase.initializeApp({
  apiKey: "AIzaSyDeYf57thHeqMeV5AfT_lz5G4oR048R8Ik",
  authDomain: "wadza-266c1.firebaseapp.com",
  projectId: "wadza-266c1",
  storageBucket: "wadza-266c1.appspot.com",
  messagingSenderId: "537123224990",
  appId: "1:537123224990:web:0f3eb65da18f906beb2a8f",
  measurementId: "G-9MMZCGMWN3"
})

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging()
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = 'Wadza'
  const notificationOptions = {
    body: payload?.data?.body,
    icon: '/wadza_nft_default.webp'
  }
  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
