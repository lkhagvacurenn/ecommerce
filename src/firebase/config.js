// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1HTMLwQabO3KzI8Qu_hWmZCfEMVly0o8",
  authDomain: "e-commerce-2745d.firebaseapp.com",
  projectId: "e-commerce-2745d",
  storageBucket: "e-commerce-2745d.firebasestorage.app",
  messagingSenderId: "632403175870",
  appId: "1:632403175870:web:f5989f96536b59d02631ef",
  measurementId: "G-8DEJ1S5XM0"
};

const app = initializeApp(firebaseConfig);

// Optional: analytics only in browser (avoid SSR errors)
let analytics;
if (typeof window !== "undefined") {
  try { analytics = getAnalytics(app); } catch(e){ /* ignore if not available */ }
}

export { app, analytics };
