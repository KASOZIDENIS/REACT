import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//firebase konfigurations
const firebaseConfig = {
  apiKey: "AIzaSyCSZo3tcmV54-DllU92BdSY3jp7-yXz86k",
  authDomain: "zillah-c9c6f.firebaseapp.com",
  projectId: "zillah-c9c6f",
  storageBucket: "zillah-c9c6f.appspot.com",
  messagingSenderId: "235424138239",
  appId: "1:235424138239:web:09971b4f62487ad2aeddca",
  measurementId: "G-GYJ061B5JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
};