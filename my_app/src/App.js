import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import Todo from './components/Todo';
import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
import todoStore from './zustandStore';
// responsiveness
import useMediaQuery from '@mui/material/useMediaQuery';

  function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}
//importing bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'react-bootstrap';

const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

function App() {

    const todos = todoStore((state) => state.todos);
    const addTodo = todoStore((state) => state.addTodo);
    const getTodos = todoStore((state) => state.getTodos);


    //   const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        getTodos();
    }, [todos?.length]);


    const handleAddTodo = async (e) => {
        e.preventDefault();
        setInput(null);
        await addTodo(input);
    };


    return (
        //<Container>    
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
                onChange={(e) => setInput(e.target.value,)}
            />

            <Button variant="contained" color="primary" disabled={!input} onClick={handleAddTodo}>
                Add Todo
            </Button>
            </form>
            {todos.length === 0 ? (
                <p>No todo item added yet. Please add a todo.</p>
            ) : (
                <ul>
                    {todos.map((item) => (
                        <Todo key={item.id} item={item} />
                    ))}
                </ul>
            )}
        </div>
        //</Container>
    );
    
}

export default App;
