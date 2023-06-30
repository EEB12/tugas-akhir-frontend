import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import './navbar.css'
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import { useJwt } from "react-jwt";
// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open1 }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),

// }));
const mdTheme = createTheme();
const Navbar = () => {
  const [data, setData] = useState('');
  var role = localStorage.getItem('role')
  
  useEffect(() => {

    var token = localStorage.getItem('role')
    setData(token)


  },);
  return (
    <AppBar sx={{ bgcolor: '#FFFFFF' }} position="absolute" >
      <Toolbar

      >

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 20, marginTop: 1 }}
        >
          <img src='/Logo-its2.png' />
        </Typography>

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Typography
            component="h1"
            variant="h6"
            color="text.primary"
            noWrap
            sx={{ marginRight: 10, marginTop: 1 }}
          >
            <a href='/list-penelitian' >Home</a>

          </Typography>


          <div>

            <Typography
              component="h1"
              variant="h6"
              color="text.primary"
              noWrap
              sx={{ marginRight: 10 }}
            >

              <button class="btn " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">


                <Typography
                  component="h1"
                  variant="h6"
                  color="text.primary"
                  noWrap
                  sx={{}}
                >Penelitian

                </Typography>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                
                {data == '"anotator"' ?
                  <>
                  <li><a class="dropdown-item" href="/list-job">My Job Anotate</a></li>
                  <li><a class="dropdown-item" href="/list-mypenelitian">Penelitian Saya</a></li>
                  <li><a class="dropdown-item" href="/new-penelitian">Buat Penelitian</a></li>
                   </>
                  :data == '"peneliti"'? <>
                  
                  <li><a class="dropdown-item" href="/list-mypenelitian">Penelitian Saya</a></li>
                  <li><a class="dropdown-item" href="/list-penelitian">Progress Penelitian</a></li>
                  <li><a class="dropdown-item" href="/new-penelitian">Buat Penelitian</a></li>
                  
                  </> : data == '"admin"' ? 
                  <>
                  <li><a class="dropdown-item" href="/admin/list-penelitian">Manajemen Penelitian</a></li> 
                  <li><a class="dropdown-item" href="/list-penelitian">Manajemen Program Model</a></li> 
                  </>
                  : <></>
                  
                  
                  }

                
              </ul>

            </Typography>
          </div>


          {data == '"anotator"' ?

            <div>

              <Typography
                component="h1"
                variant="h6"
                color="text.primary"
                noWrap
                sx={{ marginRight: 10 }}
              >

                <button class="btn " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">


                  <Typography
                    component="h1"
                    variant="h6"
                    color="text.primary"
                    noWrap
                    sx={{}}
                  >Program Model

                  </Typography>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="list-model">Model Saya</a></li>
                  <li><a class="dropdown-item" href="list-model">List Model</a></li>
                  <li><a class="dropdown-item" href="new-model">Buat Model</a></li>

                </ul>

              </Typography>
            </div> : <></>}
          {data == '"admin"' ?

            <div>

              <Typography
                component="h1"
                variant="h6"
                color="text.primary"
                noWrap
                sx={{ marginRight: 10 }}
              >

                <button class="btn " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">


                  <Typography
                    component="h1"
                    variant="h6"
                    color="text.primary"
                    noWrap
                    sx={{}}
                  >User

                  </Typography>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="/admin/list-user">Detail User</a></li>
                  {/* <li><a class="dropdown-item" href="#">List Model</a></li> */}

                </ul>

              </Typography>
            </div> : <></>}
          <div>
            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" class="btn btn-light  account "><Box sx={{ color: '#02A9F1', fontWeight: 600, fontSize: 16 }}>Account</Box></button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="/profile">Profile</a></li>
              <li><a class="dropdown-item" href="/update-role">Upgrade to Anotator</a></li>
              <li><a class="dropdown-item" href="/login">Logout</a></li>
            </ul>
          </div>



        </Box>



      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
