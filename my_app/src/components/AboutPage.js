import React from 'react';
import "./AboutPage.css";
// import { Button } from '@mui/material';
import {Card, CardContent, Typography,Paper, Box} from '@mui/material';


const AboutPage = () => {
  return (
    <div className='about-container'>
      <Card elevation={24} bgcolor='aliceblue'>
        <CardContent>
          <Typography variant='h5' component="div" textAlign= 'center' fontSize='40px' font-fontWeight='bolder'>
          About My To-Do App            
            </Typography> 
                  
        </CardContent>
        </Card>
        <br/>
        Welcome to My To-Do App! This app helps you stay organized and manage your tasks effectively.            
           
           Our goal
           <br/>
           
         To provide a simple and intuitive interface that allows you to focus on what's important - getting things done!
                
           <br/>
           If you have any feedback or suggestions, please feel free to reach out to us. We'd love to hear from you!
         Happy organizing! 

         {/* //papers */}

         <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 124,
          height: 128,
        },
      }}
    >
 
      <Paper elevation={24}/>
      <Paper elevation={24} />
      <Paper elevation={24}/>
      <Paper elevation={24}/>
      <Paper elevation={24}/>
      <Paper elevation={24}/>
    </Box>
       

        <Card elevation={24}>
        <CardContent>
          <Typography variant='h5' component='div' textAlign='center' text-Decoration ='underline' color='blue'>
            APP FEATURES!
          </Typography>
          
            <Typography variant='body2' color='black'>
            <ul>
        <li>Add task items</li>
       
      </ul>              
              </Typography>       
        </CardContent>
        </Card >

        <br/>

        <Card elevation={24}>
        <CardContent>
          <Typography>
          <ul>
         
        <li>Edit tasks if errors are made</li>
              </ul>              
              </Typography>       
        </CardContent>
        </Card>

        <br/>

        <Card elevation={24}>*
        <CardContent>
        
            <Typography variant='body2' color='black'>
            <ul>
       
        <li>Delete tasks whenever they arent needed</li>
       
      </ul>              
              </Typography>       
        </CardContent>
        </Card>

        <br/>
        <Card elevation={24}>
        <CardContent>
          
            <Typography variant='body2' color='black'>
            <ul>
       
        <li>Delete tasks</li>
      </ul>              
              </Typography>       
        </CardContent>
        </Card>


      
      </div>

      //demo
      

      //end demo
  );
};

export default AboutPage;
