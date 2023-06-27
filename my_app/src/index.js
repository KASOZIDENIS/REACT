import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { Grid } from '@mui/material';
// import Homepage from './components/Homepage';
ReactDOM.render( <React.StrictMode >
    <App />
    <Grid />
    <ToastContainer />
    </React.StrictMode>,
    document.getElementById('root')
);
