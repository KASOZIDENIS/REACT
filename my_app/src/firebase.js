// import 'firebase/compat/database';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// import 'firebase/auth';
// // import { initializeApp } from 'firebase/compat/app';
// // import { getFirestore } from 'firebase/compat/firestore';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCSZo3tcmV54-DllU92BdSY3jp7-yXz86k",
//   authDomain: "zillah-c9c6f.firebaseapp.com",
//   projectId: "zillah-c9c6f",
//   storageBucket: "zillah-c9c6f.appspot.com",
//   messagingSenderId: "235424138239",
//   appId: "1:235424138239:web:956e24142e52244faeddca",
//   measurementId: "G-7TRVMCJM3C"
// };
// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
// export { db }


//demo
// Import the functions you need from the SDKs you need
import 'firebase/compat/database';
import { initializeApp } from "firebase/app";
//import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';

//new imports
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
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
  appId: "1:235424138239:web:09971b4f62487ad2aeddca",
  measurementId: "G-GYJ061B5JR"
};

// Initialize Firebase in a new way

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  var navigate = useNavigate();
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    if(response){
      navigate("/dashboard");
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  sendPasswordResetEmail,
  logout,
};