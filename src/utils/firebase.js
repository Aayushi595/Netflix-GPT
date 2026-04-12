// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe30rh11uco8rirFUzyzZpyM-4z4hkjG0",
  authDomain: "netflix-gpt-ef77f.firebaseapp.com",
  projectId: "netflix-gpt-ef77f",
  storageBucket: "netflix-gpt-ef77f.firebasestorage.app",
  messagingSenderId: "966316333682",
  appId: "1:966316333682:web:cbe5a4416818a0d4c980eb",
  measurementId: "G-3DDNDKYS6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth();
