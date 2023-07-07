import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import Todo from './Todo';
import { db } from '../firebase.js';
import { collection, query, orderBy } from 'firebase/firestore';
import '../App.css';
import todoStore from '../zustandStore';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import CurrentDate from './CurrentDate';// eslint-disable-next-line 
const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

function Homepage() {
  const todos = todoStore((state) => state.todos);
  const addTodo = todoStore((state) => state.addTodo);
  const getTodos = todoStore((state) => state.getTodos);

  const [input, setInput] = useState('');

  useEffect(() => {
    getTodos();// eslint-disable-next-line 
  }, [todos?.length]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setInput('');
    await addTodo(input);
  };

  return (
    <>
      {/* Todo kontainer */}
      <Container maxWidth="md">
        <h2>TODO List App</h2>
        <CurrentDate />
        <form>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={8} md={9}>
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
    </>
  );
}

export default Homepage;
