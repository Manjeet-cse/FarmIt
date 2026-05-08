// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEKn6LXIUaKGqGRG0vEG_HJEq7jYWeIbE",
  authDomain: "farmit-ef43b.firebaseapp.com",
  projectId: "farmit-ef43b",
  storageBucket: "farmit-ef43b.firebasestorage.app",
  messagingSenderId: "902748986679",
  appId: "1:902748986679:web:3d3d747a62e96c5c180eb2",
  measurementId: "G-KW12Z01XVP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
