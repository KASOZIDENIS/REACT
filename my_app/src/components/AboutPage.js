import React from 'react';
import "./AboutPage.css";
import { Button } from '@mui/material';

const AboutPage = () => {
  return (
    <div className='about-container'>
      <Button variant='outlined' > <div className='heading'> <h1>About My To-Do App</h1></div></Button>
     
     
      <p>Welcome to My To-Do App! This app helps you stay organized and manage your tasks effectively.</p>
      <p>Features:</p>
      <ul>
        <li>Add tasks with due dates</li>
        <li>Mark tasks as completed</li>
        <li>Filter tasks by status</li>
        <li>Delete tasks</li>
      </ul>
      <p>Our goal is to provide a simple and intuitive interface that allows you to focus on what's important - getting things done!</p>
      <p>If you have any feedback or suggestions, please feel free to reach out to us. We'd love to hear from you!</p>
      <p>Happy organizing!</p>
    </div>
  );
};

export default AboutPage;
