import React from 'react';
import ReactDOM from 'react-dom';
//importing toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//importing bootstrap
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Grid } from '@mui/material';
ReactDOM.render( <React.StrictMode >
    <App />
    <Grid />
    <ToastContainer />
    </React.StrictMode>,
    document.getElementById('root')
);
