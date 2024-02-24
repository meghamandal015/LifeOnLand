// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwWYOeTlH7hWcTc5Gbaz1dQdIE1_YkbkU",
  authDomain: "solution-7f57a.firebaseapp.com",
  projectId: "solution-7f57a",
  storageBucket: "solution-7f57a.appspot.com",
  messagingSenderId: "1056895491735",
  appId: "1:1056895491735:web:300806d7cae46e9ee0d3d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };
