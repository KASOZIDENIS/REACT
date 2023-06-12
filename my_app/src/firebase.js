import 'firebase/compat/database';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSZo3tcmV54-DllU92BdSY3jp7-yXz86k",
  authDomain: "zillah-c9c6f.firebaseapp.com",
  projectId: "zillah-c9c6f",
  storageBucket: "zillah-c9c6f.appspot.com",
  messagingSenderId: "235424138239",
  appId: "1:235424138239:web:956e24142e52244faeddca",
  measurementId: "G-7TRVMCJM3C"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }