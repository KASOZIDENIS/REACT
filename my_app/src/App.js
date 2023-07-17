import ResponsiveAppBar from './components/Navbar';
import Login from './components/Login.js';
import './App.css';
import { Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register.js";
import Reset from "./components/Reset.js";
import Dashboard from "./components/Dashboard.js";
import Homepage from "./components/Homepage"; 
import StickyFooter from './components/StickyFooter';
import AboutPage from './components/AboutPage';
import ProfilePage from './components/ProfilePage';
import AccessDenied from './components/AccessDenied';
import BackToTop from './components/BackToTopIcon';
// import Demo from './components/Demonstration.js';


function App() {
  return (   
    <Container maxWidth="md">
{/* //router konfigs start here */}
<div className="app">
    <Router>
           <ResponsiveAppBar />
           <BackToTop/>
      <Routes>
        {/* <Route path="/demo" element={<Demonstration />}/> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path ="/access_denied" element={<AccessDenied/>}/>
        <Route path="/register" element={<Register />} />       
        <Route path='/login' element={<Login/>}/>        
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/aboutpage' element = {<AboutPage/>} />
        <Route path='/profilepage' element={<ProfilePage/>} />

      </Routes>
        <StickyFooter />
    </Router>
  </div> 
   </Container>
  );
}
export default App;