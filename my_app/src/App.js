
import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Todo from './components/Todo';
import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import './App.css';
import { toast } from 'react-toastify';
import todoStore from './zustandStore';

const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

function App() {
  const todos = todoStore((state) => state.todos);
  const addTodo = todoStore((state) => state.addTodo);
  const getTodos = todoStore((state) => state.getTodos);

  const [input, setInput] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null); // Add selectedTodo state

  useEffect(() => {
    getTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (selectedTodo) {
      // Update existing todo
      await updateTodo(selectedTodo.id, input);
    } else {
      // Add new todo
      await addTodo(input);
    }

    setInput('');
    setSelectedTodo(null);
  };

  const handleEditTodo = (todo) => {
    setInput(todo.todo);
    setSelectedTodo(todo);
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await updateDoc(doc(db, 'todos', id), {
        todo: updatedTodo,
        timestamp: serverTimestamp(),
      });

      toast.success('Todo updated successfully');
    } catch (error) {
      console.error('Error updating todo: ', error);
      toast.error('Error updating todo');
    }
  };

  return (
    <div className="App">
      <h2>TODO List App</h2>
      <form>
        <TextField
          id="outlined-basic"
          label="Add a Todo"
          variant="outlined"
          style={{ margin: '0px 5px', borderRadius: '20px' }}
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button variant="contained" color="primary" disabled={!input} onClick={handleAddTodo}>
          {selectedTodo ? 'Update Todo' : 'Add Todo'}
        </Button>
      </form>
      {todos.length === 0 ? (
        <p>No todo item added yet. Please add a todo.</p>
      ) : (
        <ul>
          {todos.map((item) => (
            <Todo key={item.id} item={item} onEdit={handleEditTodo} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
