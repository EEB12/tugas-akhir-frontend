import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Table from '../Component/Table';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import './landing.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

}));




const mdTheme = createTheme();




const Landing = () => {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlemodel = () => {
    window.location.href = "/list-penelitian";
  };
  const  handlemodelManual = () => {
    window.location.href = "/list-penelitian-manual";
  };
 


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
              Dashboard
            </Typography>


            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            width: '100%',

            overflow: 'auto',
          }}
        >

          <Toolbar />
          <Container maxWidth="lg" sx={{
            mr: 50,
            p: 2,
            display: 'flex',


            alignItems: 'center'
          }}>

            <Grid container spacing={1}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper elevation={0}
                  sx={{
                    p: 2,
                    display: 'flex',

                    height: 833,
                    width: 1400,
                    pb: 10,
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5'
                  }}

                >

                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='content1 col  d-flex justify-content-center'>
                        <Button href="/upload" className="button w-25 me-5" variant="contained" sx={{
                          height: '100px',
                          ':hover': {
                            bgcolor: 'primary.main', // theme.palette.primary.main
                            color: 'black',

                          },
                        }}>Upload data Penelitian</Button>

                        <Button sx={{
                          height: '100px',
                          ':hover': {
                            bgcolor: 'primary.main', // theme.palette.primary.main
                            color: 'black',

                          },
                        }} variant="contained" className="button w-25">Dapatkan hasil Anotasi</Button>


                      </div>

                    </div>

                    <div className='row mt-5'>
                      <div className='content1 col  d-flex justify-content-center'>
                        <Button
                          id="demo-positioned-button"
                          aria-controls={open ? 'demo-positioned-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                          sx={{
                            height: '100px',
                            ':hover': {
                              bgcolor: 'primary.main', // theme.palette.primary.main
                              color: 'black',
                              
                            },
                          }} variant="contained" className="button w-25 me-5"
                        >
                          Anotasi Data Penelitian
                        </Button>
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}

                          sx={{
                           
                           width:200
                          }}
                          className=" w-25 me-5"
                        >
                          <MenuItem onClick={handlemodel}>Model</MenuItem>
                          <MenuItem onClick={handlemodelManual}>Manual</MenuItem>
                          
                        </Menu>

                        <Button href="/upload-model"
                          sx={{
                            height: '100px',
                            ':hover': {
                              bgcolor: 'primary.main', // theme.palette.primary.main
                              color: 'black',

                            },
                          }} variant="contained" className="button w-25">Upload Model</Button>


                      </div>

                    </div>


                  </div>


                </Paper>
              </Grid>


            </Grid>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Landing;
