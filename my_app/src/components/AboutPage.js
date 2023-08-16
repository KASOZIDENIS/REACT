import "./AboutPage.css";
// import { Button } from '@mui/material';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CustomImageList from './CustomImage';




const AboutPage = () => {

  //HANDLING IMAGE ONCE A USER CLICKS ON IT

  return (
    <div className='about-container'>
      <Card elevation={24} bgcolor='aliceblue'>
        <CardContent>
          <Typography variant='h5' component="div" textAlign='center' fontSize='40px' font-fontWeight='bolder'>
            About My To-Do App
          </Typography>

        </CardContent>
      </Card>


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


      </Box>


      <Card elevation={24}>
        <CardContent>
          <Typography variant='h5' component='div' textAlign='center' text-Decoration='underline' color='blue'>
            APP FEATURES!
          </Typography>

          <Typography variant='body2' color='black'>


            <li>Add task items</li>


          </Typography>
        </CardContent>
      </Card >

      <br />

      <Card elevation={24}>
        <CardContent>
          <Typography>


            <li>Edit tasks if errors are made</li>
            <img src='https://static.vecteezy.com/system/resources/previews/000/379/094/non_2x/edit-profile-vector-icon.jpg' alt='/'></img>

          </Typography>
        </CardContent>
      </Card>

      <br />

      <Card elevation={24}>
        <CardContent>

          <Typography variant='body2' color='black'>


            <li>Delete tasks whenever they arent needed</li>
            <img src='https://www.iconshock.com/image/SuperVista/Education/attendance_list' alt='/' />


          </Typography>
        </CardContent>
      </Card>

      <br />
      <Card elevation={24}>
        <CardContent>

          <Typography variant='body2' color='black'>
            <li>Delete tasks</li>
            <img src='https://www.iconexperience.com/_img/v_collection_png/512x512/shadow/user_delete.png' alt='/'></img>



          </Typography>
        </CardContent>
      </Card>
      <div className='paragraph'>
        <p> PICTORIAL MOMENTS</p>
      </div>

      <div className='customImage'>
        <CustomImageList />
      </div>


    </div>



    //demo


    //end demo
  );
};

export default AboutPage;
