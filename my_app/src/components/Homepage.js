import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import Todo from './Todo';
// import Login from './components/Login';
import { db } from '../firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import '../App.css';
import todoStore from '../zustandStore';
import { Container } from '@mui/material';
import { Box } from '@mui/material';

//imports for login page and google auth using firebase imports
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Register from "./components/Register.js";
// import Reset from "./components/Reset.js";
// import Dashboard from "./components/Dashboard.js";



const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

function Homepage() {

  //login router konfigs
  
  const todos = todoStore((state) => state.todos);
  const addTodo = todoStore((state) => state.addTodo);
  const getTodos = todoStore((state) => state.getTodos);

  const [input, setInput] = useState('');

  useEffect(() => {
    getTodos();
  }, [todos?.length]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setInput('');
    await addTodo(input);
  };

  return (
   
    <Container maxWidth="md">

{/* //router konfigs start here */}

{/* <div className="app">
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </div> */}

  {/* //router konfigs stop here */}

      <h2>TODO List App</h2>
      <form>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={8} md = {9}>
            <TextField
              id="outlined-basic"
              label="Add a Todo"
              variant="outlined"
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button variant="contained" color="primary" disabled={!input} onClick={handleAddTodo} fullWidth>  
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </form>
      {todos.length === 0 ? (
        <Typography variant="body1">No todo item added yet. Please add a todo.</Typography>
      ) : (
        <Box sx={{ marginTop: '1rem' }}>
        {todos.map((item) => (
          <Todo key={item.id} item={item} />
        ))}
      </Box>
      
      )}    
   </Container>
  );
}

export default Homepage;