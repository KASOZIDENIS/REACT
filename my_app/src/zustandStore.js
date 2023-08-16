import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from 'zustand';
import { db } from './firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  updateDoc,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const todoStore = create((set, get) => ({
  todos: [],
  user: {},

  // METHOD TO LOGIN
  login: async (username, password) => {
    try {
      let response = await signInWithEmailAndPassword(auth, username, password);
      console.log("THE RESPONSE: ", response);
      console.log("THE USER ID: ", response?.user?.uid);
      var userDocument = doc(db, "users", response?.user?.uid);
      var userData = await getDoc(userDocument);
      console.log("THE DATA GOT: ", userData.data());

      // SETTING
      set((state) => ({ user: userData }));
    } catch (error) {
      console.log("AN ERROR HAPPENED WHEN LOGGING IN: ", error);
    }
  },

  // METHOD TO REGISTER USER
  register: async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

     var userDocument = doc(db, "users", user.uid);

      var userData = {
        uid: user.uid,
        name: name,
        authProvider: "local",
        email: email,
      };

      await setDoc(userDocument, userData);

      // SETTING
      set((state) => ({ user: userData }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  },

  // METHODS TO ADD AND FETCH DATA FROM FIREBASE

  signInWithGoogle: async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const docs = await getDocs(q);

      // IF THE LOGGED IN USER DOESN'T HAVE AN ACCOUNT ALREADY
      if (docs.docs.length === 0) {
       var  userDocument = doc(db, "users", user.uid);
       var userData = {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        };

        await setDoc(userDocument, userData);

        // SETTING
        set((state) => ({ user: userData }));
      }
      // IF THE LOGGED IN USER ALREADY HAS AN ACCOUNT
      else {
        // getting the user data from firestore
        userDocument = doc(db, "users", res.user.uid);
         userData = await getDoc(userDocument);

        // Setting user data in state
        set((state) => ({ user: userData }));
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  },

  // METHOD TO RESET PASSWORD
  sendPasswordReset: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");

      // Setting user data to empty object after successful action
      set((state) => ({ user: {} }));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  },

  // METHOD TO LOGOUT
  logout: async () => {
    try {
      await signOut(auth);

      // Setting user data to empty object after successful action
      set((state) => ({ user: {} }));
      return true;
    } catch (error) {
      console.log("FAILED TO LOGOUT");
      return false;
    }
  },

  // METHOD TO ADD TODOS
  addTodo: async (input) => {
    try {
      const todoRef = await addDoc(collection(db, 'todos'), {
        todo: input,
        timestamp: serverTimestamp(),
        id: null,
      });

      const todo = {
        id: todoRef.id,
        todo: input,
      };

      set((state) => ({ todos: [...state.todos, todo] }));

      toast.success('One Todo added successfully', {
        toastId: 'add-success',
        className: 'green-toast',
        theme: 'colored',
        hideProgressBar: true,
      });
    } catch (error) {
      console.error('Error adding todo: ', error);
      toast.error('Error adding todo', {
        toastId: 'add-error',
        className: 'red-toast',
      });
    }
  },

  // METHOD TO FETCH TODOS
  getTodos: async () => {
    try {
      const todosResponse = [];
      const response = await getDocs(collection(db, 'todos'));

      response.docs.map((doc) => {
        const todo = {
          id: doc.id,
          todo: doc.data().todo,
        };
        todosResponse.push(todo);
        return null;
      });

      // SETTING
      set((state) => ({ todos: todosResponse }));
    } catch (error) {
      console.error('Error retrieving todos: ', error);
      toast.error('Error retrieving todos', {
        toastId: 'get-error',
        className: 'red-toast',
      });
    }
  },

  // METHOD TO DELETE TODOS
  deleteTodo: async (item) => {
    try {
      await deleteDoc(doc(db, 'todos', item?.id));

      // SETTING
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== item.id),
      }));
      toast.success('One Todo deleted successfully', {
        toastId: 'delete-success',
        className: 'green-toast',
        theme: 'colored',
        hideProgressBar: true,
      });
    } catch (error) {
      console.error('Error deleting todo: ', error);
      toast.error('Error deleting todo', {
        toastId: 'delete-error',
        className: 'red-toast',
      });
      throw error;
    }
  },

  // METHOD TO UPDATE TODO
  updateTodo: async (item) => {
    try {
      const todoRef = doc(db, 'todos', item?.id);
      await updateDoc(todoRef, { todo: item.todo });

      // SETTING
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === item.id ? { ...todo, todo: item.todo } : todo
        ),
      }));

      toast.success('Todo updated successfully', {
        toastId: 'update-success',
        className: 'green-toast',
        theme: 'colored',
        hideProgressBar: true,
      });
    } catch (error) {
      console.error('Error updating todo: ', error);
      toast.error('Error updating todo', {
        toastId: 'update-error',
        className: 'red-toast',
      });
      throw error;
    }
  },
}));

export default todoStore ;
