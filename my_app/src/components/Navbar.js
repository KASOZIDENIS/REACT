import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import todoStore from "../zustandStore.js";

const pages = ['homepage', 'dashboard', 'aboutpage','gallery'];
const settings = ['profilepage', 'logout'];
const NotLoggedPages = ['homepage', 'aboutpage','gallery'];
const NotLoggedInSettings = ['register', 'login'];

export default function ResponsiveAppBar() {


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = todoStore((state) => state.user); //eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(user.uid ? true : false);
  console.log("USER ID: ", user.uid);

  var navigate = useNavigate();

  useEffect(()=>{
    
    console.log("THE USER IS: ", user);
    console.log("IS USER LOGGED IN: ", isLoggedIn);
    // hek if the user is logged in
    if(user.uid){
      navigate("/login");
    }
  });


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="80%">
        <Toolbar disableGutters>
          <CheckCircleIcon />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TODOAPP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {isLoggedIn
                ? pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        component={Link}
                        to={`/${page}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))
                : NotLoggedPages.map((NotLoggedPages) => (
                    <MenuItem key={NotLoggedPages} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        component={Link}
                        to={`/${NotLoggedPages}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        {NotLoggedPages}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '',
              fontWeight: 700,
              letterSpacing: '0rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TODO APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isLoggedIn?
               pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link}
                    to={`/${page}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {page}
                  </Button>
                ))
              : NotLoggedPages.map((NotLoggedPages) => (
                  <Button
                    key={NotLoggedPages}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    component={Link}
                    to={`/${NotLoggedPages}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {NotLoggedPages}
                  </Button>
                ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="https://res.cloudinary.com/startup-grind/image/upload/
                  c_fill,dpr_2.0,f_auto,g_center,h_250,q_auto:good,w_250/v1/gcs/platform-data-dsc/avatars/kasozi_denis.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="https://res.cloudinary.com/startup-grind/image/upload/
                  c_fill,dpr_2.0,f_auto,g_center,h_250,q_auto:good,w_250/v1/gcs/platform-data-dsc/avatars/kasozi_denis.jpg" />
                </IconButton>
              </Tooltip>
            )}
            <Menu 
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn?
                 settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        component={Link}
                        to={`/${setting}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))
                : NotLoggedInSettings.map((NotLoggedInSetting) => (
                    <MenuItem key={NotLoggedInSetting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        component={Link}
                        to={`/${NotLoggedInSetting}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        {NotLoggedInSetting}
                      </Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
