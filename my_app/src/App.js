import React, { useState, useEffect } from 'react';
// import { TextField, Button, Grid, Typography } from '@mui/material';
// import Todo from './components/Todo';
import Login from './components/Login';
import { db } from './firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import './App.css';
//import todoStore from './zustandStore';
import { Container } from '@mui/material';
// import { Box } from '@mui/material';

//imports for login page and google auth using firebase imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register.js";
import Reset from "./components/Reset.js";
import Dashboard from "./components/Dashboard.js";
import Homepage from "./components/Homepage"; 



// const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

function App() {
  return (   
    <Container maxWidth="md">
{/* //router konfigs start here */}
<div className="app">
    <Router>
      <Routes>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </div> 
   </Container>
  );
}
export default App;