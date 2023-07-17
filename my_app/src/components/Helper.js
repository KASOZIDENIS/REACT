import * as React from 'react';
import Alert from '@mui/material/Alert';
import {toast} from "react-toastify"; 
import { green } from '@mui/material/colors';

//filled alerts


    // success toast
    const SuccessAlert =() =>{
        return(
            <Alert variant='filled' severity='success'>you were successfully</Alert>
        );
    };

    //error toast
    const ErrorAlert = ()=>{
        return(
            <Alert variant='filled' severity='error'>an error occured</Alert>
        );
    };

    //warning toast
    const WarningAlert =() =>{
        return(
            <Alert variant='filled' severity='warning'>you are warned</Alert>
        );
    };

    //info alert
    const InfoAlert =() =>{
      return(
        <Alert variant='filled' severity='info'>information alert</Alert>
      );
    };
  
  //react toasts

  
  const DefaultToast=()=> toast("Default Notification !");

  const SuccessToast=()=> toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

    const ErrorToast =()=> toast.error("Error Notification !", {
      position: toast.POSITION.TOP_LEFT
    });

    const WarningToast=() => toast.warn("Warning Notification !", {
      position: toast.POSITION.BOTTOM_LEFT
    });

    const InfoToast=()=> toast.info("Info Notification !", {
      position: toast.POSITION.BOTTOM_CENTER
    });

    const CustomStyleToast=()=> toast("Custom Style Notification with css class!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: 'foo-bar'
    });
    const LogoutSuccessToast=()=> toast.success("Logged Out Successfully !", {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar:true,
      backgroundcolor:green,
      theme:'colored'
      
      
    });
      
    export{
      //alerts
      ErrorAlert,
      WarningAlert,
      SuccessAlert,
      InfoAlert,
      //toasts

      WarningToast,
      SuccessToast,
      ErrorToast,
      CustomStyleToast,
      InfoToast,
      DefaultToast,
      LogoutSuccessToast,
         }
  























