// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1HTMLwQabO3KzI8Qu_hWmZCfEMVly0o8",
  authDomain: "e-commerce-2745d.firebaseapp.com",
  projectId: "e-commerce-2745d",
  storageBucket: "e-commerce-2745d.firebasestorage.app",
  messagingSenderId: "632403175870",
  appId: "1:632403175870:web:f5989f96536b59d02631ef",
  measurementId: "G-8DEJ1S5XM0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);