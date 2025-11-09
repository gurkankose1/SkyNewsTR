// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaVJLw4VXl3wR9Tt2SzsJwciJICH6j_uI",
  authDomain: "skynewstr.firebaseapp.com",
  projectId: "skynewstr",
  storageBucket: "skynewstr.firebasestorage.app",
  messagingSenderId: "565149586636",
  appId: "1:565149586636:web:372dec9553aa0a465b5e69",
  measurementId: "G-Q73SE2T6SN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
