// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firebase Firestore
import { getStorage } from "firebase/storage"; // Firebase Storage
import { getAnalytics } from "firebase/analytics"; // Firebase Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCa1iNM4yGL6IQqUr_vVYXm97krwGXA9Eo",
    authDomain: "renntcar.firebaseapp.com",
    projectId: "renntcar",
    storageBucket: "renntcar.appspot.com",
    messagingSenderId: "113195436966",
    appId: "1:113195436966:web:f9f54d0eda9a4d806f9d67",
    measurementId: "G-S7ETKB55Z7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage

// Export auth, db, and storage so they can be used in your components
export { auth, db, storage };
