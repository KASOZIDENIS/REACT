import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from 'zustand';
import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';

const todoStore = create((set, get) => ({
  todos: [],

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

      set((state) => ({ todos: todosResponse }));
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
  
  updateTodo: async (item) => {
    try {
      const todoRef = doc(db, 'todos', item?.id);
      await updateDoc(todoRef, { todo: item.todo });
      
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

export default todoStore;