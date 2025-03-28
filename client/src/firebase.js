// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-finance-mate-c26cb.firebaseapp.com",
  projectId: "my-finance-mate-c26cb",
  storageBucket: "my-finance-mate-c26cb.firebasestorage.app",
  messagingSenderId: "92048094672",
  appId: "1:92048094672:web:03c0eb6e5093c6c79475d5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
