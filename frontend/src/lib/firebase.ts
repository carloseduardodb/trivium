import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDLP56asbcqomefld6L45rItLZLn3PhcY",
  authDomain: "gloveritas-apps-x.firebaseapp.com",
  projectId: "gloveritas-apps-x",
  storageBucket: "gloveritas-apps-x.firebasestorage.app",
  messagingSenderId: "926083910974",
  appId: "1:926083910974:web:a9c0957d0a4b32106d306f",
  measurementId: "G-69EHGQRHRP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// if (window) {
//   const analytics = getAnalytics(app);
//   analytics.app.automaticDataCollectionEnabled = true;
// }

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, googleAuthProvider, facebookAuthProvider, db };
