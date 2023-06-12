import create from 'zustand';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const useTodoStore = create((set) => ({
  todos: [],
  getTodos: async () => {
    const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, todo: doc.data().todo });
      });
      set({ todos });
    });
    return unsubscribe;
  },
  addTodo: async (todo) => {
    await addDoc(collection(db, 'todos'), {
      todo,
      timestamp: serverTimestamp(),
    });
  },
  deleteTodo: async (id) => {
    await deleteDoc(collection(db, 'todos'), id);
  },
  updateTodo: async (id, todo) => {
    const docRef = collection(db, 'todos', id);
    await updateDoc(docRef, {
      todo,
    });
  },
}));

export default useTodoStore;
