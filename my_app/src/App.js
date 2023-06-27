import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register.js";
import Reset from "./components/Reset.js";
import Dashboard from "./components/Dashboard.js";
import Homepage from "./components/Homepage"; 

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