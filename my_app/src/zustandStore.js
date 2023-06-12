import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from 'zustand';
import { db } from './firebase';
//import Todo from './components/Todo.css';
import "./App.css";
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';

const todoStore = create((set, get) => ({
  todos: [],

  addTodo: async (input) => {
    try {
      const response = await addDoc(collection(db, 'todos'), {
        todo: input,
        timestamp: serverTimestamp(),
        id: null,
      });

      console.log('THE DOCUMENT ID IS: ' + response.id);

      await updateDoc(doc(db, 'todos', response.id), { id: response.id });

      set((state) => ({ todos: [...state.todos, input] }));

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

  getTodos: async () => {
    try {
      const todos_response = [];
      const response = await getDocs(collection(db, 'todos'));

      response.docs.map((doc) => {
        todos_response.push(doc.data());
        return null; // Add a return statement here
      });

      set((state) => ({ todos: todos_response }));
    } catch (error) {
      console.error('Error retrieving todos: ', error);
      toast.error('Error retrieving todos', { 
        toastId: 'get-error',
        className: 'red-toast',
      });
    }
  },

  deleteTodo: async (item) => {
    try {
      await deleteDoc(doc(db, 'todos', item?.id));
      await get().getTodos();
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
      throw error; // Rethrow the error to propagate it
    }
  },
}));

export default todoStore;