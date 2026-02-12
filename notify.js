// // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// // import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

// // /* 🔹 Firebase Config */
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAbrKJQ8bf67i1LDjA9CXGyiKC5Ud192Bc",
// //   authDomain: "swipe-now.firebaseapp.com",
// //   projectId: "swipe-now",
// //   storageBucket: "swipe-now.firebasestorage.app",
// //   messagingSenderId: "1057628436520",
// //   appId: "1:1057628436520:web:9f367d79904e5e08765d1d",
// //   measurementId: "G-P13EXF1CZN"
// // };

// // const app = initializeApp(firebaseConfig);
// // const messaging = getMessaging(app);

// // /* 🔔 Ask Permission */
// // document.getElementById("enableNotify").addEventListener("click", async () => {

// //   if (!("Notification" in window)) {
// //     alert("Browser does not support notifications");
// //     return;
// //   }

// //   const permission = await Notification.requestPermission();

// //   if (permission === "granted") {
// //     registerAndGetToken();
// //   } else {
// //     alert("Permission denied");
// //   }
// // });

// // /* 🔔 Register SW + Get Token */
// // async function registerAndGetToken() {

// //   // Register SW
// //   await navigator.serviceWorker.register("/firebase-messaging-sw.js");

// //   // 🔥 WAIT until SW is fully active
// //   const reg = await navigator.serviceWorker.ready;

// //   const token = await getToken(messaging, {
// //     vapidKey: "BFDgqfYCiCGTVAnGMMq3ZTTilt8e8_q_bF6A3bBZXmacw-W9Oj6gMTLLn5XDs7VjAQsyE3SV8V2gOTNK3Iznefw",
// //     serviceWorkerRegistration: reg
// //   });

// //   console.log("🔥 FCM Token:", token);

// //   await fetch("http://localhost:8081/fcm-token", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({ token })
// //   });
// // }


// // /* 👉 Simulate swipe */
// // window.swipe = async function () {
// //   await fetch("http://localhost:8081/swipe", { method: "POST" });
// //   alert("Swipe recorded");
// // };


// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAbrKJQ8bf67i1LDjA9CXGyiKC5Ud192Bc",
//   authDomain: "swipe-now.firebaseapp.com",
//   projectId: "swipe-now",
//   messagingSenderId: "1057628436520",
//   appId: "1:1057628436520:web:9f367d79904e5e08765d1d"
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// document.getElementById("enableNotify").addEventListener("click", async () => {

//   if (!("Notification" in window)) {
//     alert("Notifications not supported");
//     return;
//   }

//   if (!("serviceWorker" in navigator)) {
//     alert("Service workers not supported");
//     return;
//   }

//   const permission = await Notification.requestPermission();
//   if (permission !== "granted") {
//     alert("Permission denied");
//     return;
//   }

//   const registration =
//     await navigator.serviceWorker.register("/firebase-messaging-sw.js");

//   await navigator.serviceWorker.ready;

//   const token = await getToken(messaging, {
//     vapidKey: "BFDgqfYCiCGTVAnGMMq3ZTTilt8e8_q_bF6A3bBZXmacw-W9Oj6gMTLLn5XDs7VjAQsyE3SV8V2gOTNK3Iznefw",
//     serviceWorkerRegistration: registration
//   });

//   if (!token) {
//     console.error("FCM token not generated");
//     return;
//   }

//   console.log("🔥 FCM Token:", token);

//   await fetch("http://localhost:8081/fcm-token", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ token })
//   });
// });
