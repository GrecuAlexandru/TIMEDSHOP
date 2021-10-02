import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkBvDNzSvorpEdz2twDAVI09x-FaVsDGg",
  authDomain: "timedshop-a5a66.firebaseapp.com",
  projectId: "timedshop-a5a66",
  storageBucket: "timedshop-a5a66.appspot.com",
  messagingSenderId: "172835576987",
  appId: "1:172835576987:web:2e588ca7a77cc008affa3e",
  measurementId: "G-3VCHXLRX5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();



