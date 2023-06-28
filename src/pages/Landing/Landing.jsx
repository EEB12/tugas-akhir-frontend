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


mdTheme.typography.h3 = {
  color: '#0285F1', fontWeight: 600, mt: 1, fontSize: 60 ,
  '@media (min-width:600px)': {
    fontSize: 40,
    textAlign: 'center',
  },
 
};

mdTheme.typography.h4 = {
  width: 600, fontWeight: 400, mt: 4, ml: 1, fontSize: 28  ,
  '@media (min-width:600px)': {
    fontSize: 20,
    textAlign: 'center',
  },
  
};


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
  const handlemodelManual = () => {
    window.location.href = "/list-penelitian-manual";
  };

  return (
    <ThemeProvider theme={mdTheme}>

      <div className="container-fluid p-0 pb-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent sticky-top">
          <div className="container px-3">
            <img className="img-fluid" src="./Logo-its.png" style={{ width: 'auto', height: '2rem' }} alt="ITS Logo" />
            <div>
              <a href="/register" className="btn btn-light shadow-sm fw-bold px-3" role="button">
                Sign Up Free
              </a>
            </div>
          </div>
        </nav>
        <div className="container-fluid" >
          <div className="row">
            <div className="col-lg-6 col-12 order-lg-1 order-2">
              <img className="ms-3" src="./Icon-1.png" alt="Icon 1" />
              <Typography variant="h3"  theme={mdTheme} >
                About Website
              </Typography>
              <Typography variant='h4'theme={mdTheme} sx={{ width: 600, fontWeight: 400, mt: 4, ml: 1, fontSize: 28 }}>
                Website Anotasi Data merupakan website yang menyediakan fitur anotasi data manual maupun otomatis untuk mahasiswa dalam melakukan penelitian anotasi data. Website ini mendukung penggunaan model dalam berbagai penelitian.
              </Typography>
            </div>
            <div className="col-lg-6 col-12 order-lg-2 order-1">
              <div classname='d-flex justify-content-center'>
                <img className="hero" src="./Hero-1.png" alt="Hero 1" />
              </div>
            </div>
          </div>
          {/* <div classname="row">
            <div className='col-6'>
              <img className="ms-3" src="./Icon-1.png" alt="Icon 1" />
              <Typography variant="h3" sx={{ color: '#0285F1', fontWeight: 600, mt: 1, fontSize: 60 }}>
                About Website
              </Typography>
              <Box sx={{ width: 600, fontWeight: 400, mt: 4, ml: 1, fontSize: 28 }}>
                Website Anotasi Data merupakan website yang menyediakan fitur anotasi data manual maupun otomatis untuk mahasiswa dalam melakukan penelitian anotasi data. Website ini mendukung penggunaan model dalam berbagai penelitian.
              </Box>
            </div>

            <div className='col-6'>
              <img className="hero" src="./Hero-1.png" alt="Hero 1" />
            </div>
          </div> */}
          {/* <div classname="d-flex justify-content-around">

            <img className="ms-3" src="./Icon-1.png" alt="Icon 1" />
            <Typography variant="h3" sx={{ color: '#0285F1', fontWeight: 600, mt: 1, fontSize: 60 }}>
              About Website
            </Typography>
            <Box sx={{ width: 600, fontWeight: 400, mt: 4, ml: 1, fontSize: 28 }}>
              Website Anotasi Data merupakan website yang menyediakan fitur anotasi data manual maupun otomatis untuk mahasiswa dalam melakukan penelitian anotasi data. Website ini mendukung penggunaan model dalam berbagai penelitian.
            </Box>
            <img className="hero" src="./Hero-1.png" alt="Hero 1" />
          </div> */}
        </div>

      </div>



      {/* <Box
        component="main"
        sx={{
          backgroundImage: 'url(./Landing.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'contain',
          width: '100%',
          height: '110vh',
          marginBottom: '50px',

          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Toolbar />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div className='col-12 triple-dot'>
                <img className='ms-3  ' src='./Icon-1.png' />
                <Typography sx={{
                  color: '#0285F1',
                  fontWeight: 600, m: 1, fontSize: 60
                }} variant="h3" gutterBottom>
                  About Website
                </Typography>

                <Box sx={{ width: 600, fontWeight: 400, marginTop: 4, marginLeft: 1, fontSize: 28 }}>Website Anotasi Data merupakan website yang menyediakan fitur
                  anotasi data manual maupun otomatis untuk mahasiswa dalam melakaukan penelitian anotasi data. Website ini mendukung penggunaan model
                  diberbagai penelitian.</Box>


              </div>
            </div>
            <div className='col-6'>
              <img className='hero' src='./Hero-1.png' />
            </div>
          </div>
        </div>






      </Box> */}

      <Box
        component="main"
        sx={{
          backgroundImage: 'url(./Landing-2.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'contain',
          width: '100%',
          height: '100vh',


          overflow: 'auto',
        }}
      >





        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 mt-3'>
              <div className='d-flex justify-content-center mt-5'>
                <Box sx={{ fontWeight: 600, fontSize: 45 }}>Apa Saja Fitur yang Disediakan?</Box>
              </div>

            </div>
          </div>

          <div className='d-flex row card-group'>
            <div class="row row-cols-1 row-cols-md-3 g-4 mt-5 w-75 ms-5 ">


              <div class="col ">
                <div class="card w-100" style={{
                  width: 500,
                  height: 330,
                }}>
                  <div className='d-flex justify-content-center mt-4'>
                    <img src="/card-1.png" style={{
                      width: 83,
                      height: 86,

                    }} class=" " alt="..." />
                  </div>

                  <div class="card-body">
                    <h5 class="card-title text-center">Membuat Penelitian Data</h5>
                    <Box sx={{ width: 269, textAlign: 'center', fontWeight: 400, m: 1, fontSize: 19, marginLeft: 9 }}> Peneliti dapat membuat penelitian data di website dengan upload data penelitian ke website</Box>

                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card  w-100" style={{
                  width: 500,
                  height: 330,
                }}>
                  <div className='d-flex justify-content-center mt-4'>
                    <img src="/card-2.png" style={{
                      width: 83,
                      height: 86,

                    }} class="card-img-top" alt="..." />

                  </div>

                  <div class="card-body">
                    <h5 class="card-title text-center">Melakukan Anotasi Data</h5>

                    <Box sx={{ width: 269, textAlign: 'center', fontWeight: 400, m: 1, fontSize: 19, marginLeft: 9 }}> Dapat melakukan upgrade ke anotator. Anotator dapat melakukan proses anotasi data dengan program model</Box>

                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card  w-100" style={{
                  width: 500,
                  height: 330,

                }}>

                  <div className='d-flex justify-content-center mt-4'>
                    <img src="/card-3.png" style={{
                      width: 83,
                      height: 86,

                    }} class="card-img-top" alt="..." />

                  </div>

                  <div class="card-body">
                    <h5 class="card-title text-center">Export Data Hasil Anotasi</h5>
                    <Box sx={{ width: 269, textAlign: 'center', fontWeight: 400, m: 1, fontSize: 19, marginLeft: 9 }}> Hasil data penelitian yang telah dianotasi dapat diexport menjadi csv</Box>

                  </div>
                </div>
              </div>




            </div>

          </div>

        </div>








      </Box>


      {/* footer */}
      <Box
        component="main"
        sx={{
          backgroundImage: 'url(./Landing-2.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'contain',
          width: '100%',
          height: '53vh',


          overflow: 'hidden',
        }}
      >









        <div>
          <img src="/footer.png" alt="..." />
        </div>


      </Box>



    </ThemeProvider>
  );
}

export default Landing;
