import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';

import Avatar from '@mui/material/Avatar';
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open1 }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

}));
const mdTheme = createTheme();
const Navbar = () => {
  return (
    <AppBar position="absolute" >
      <Toolbar

      >

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard tes
        </Typography>


        <IconButton color="inherit">
          <Avatar  sx={{ bgcolor: blue[700] }} src="/broken-image.jpg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
