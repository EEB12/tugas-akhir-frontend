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
import axios from 'axios';
import { useState, useEffect, } from "react";
import './upload.css'
import FileUpload from "react-mui-fileuploader";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Navbar from '../Component/navbar';
import swal from 'sweetalert';
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




const Model = () => {
    const [open, setOpen] = useState(true);
    const [model, setModel] = useState();
    const [vectorizer, setVectorizer] = useState();
    const [data, setdata] = useState([]);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };




    // const handleFilesChange = (files) => {
    //     // Update chosen files
    //     console.log(files[0])
    //     setmodel(files[0])
    // };

    const handleFilesChange = (e) => {
        // Update chosen files
        console.log(e.target.files[0])
        setModel(e.target.files[0])
    };

    const handleVectorizerChange = (e) => {
        // Update chosen files
        console.log(e.target.files[0])
        setVectorizer(e.target.files[0])
    };

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        console.log({
            title: data.get('title'),
            desc: data.get('desc'),
        });

        var title= data.get('title')
        var desc=data.get('desc')
        
    
        let formData = new FormData()


        formData.append("file", model)
        formData.append("file_vectorizer", vectorizer)
        formData.append("title",title)
        formData.append("desc", desc)

        console.log("ini model",model)
        console.log("ini vectorizer",vectorizer)
        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const response = await axios({
            method: "post",
            url: "http://localhost:5000/api/upload_model",
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }).then(data => data);


        console.log(response)
        if (response.data.message =='Data created successfully' ) {
            swal("Success", "Model Uploaded", "success", {
              buttons: false,
              timer: 2000,
            })
            .then((value) => {
             
              window.location.href = "/landing";
            });
          } else {
            swal("Failed", "Model Upload Failed", "error");
          }
    };
   
    useEffect(() => {
        // Update the document title using the browser API

    }, [data]);
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Navbar />

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

                                            height: 900,
                                            width: 1400,
                                            pb: 10,
                                            flexDirection: 'column',
                                            backgroundColor: '#f5f5f5'
                                        }}

                                    >
                                        <div className='container-fluid'>
                                            <div className='row'>
                                                <div className=' col-12 h-100  mb-3'>

                                                    <Typography variant="h5" gutterBottom>
                                                        Input Vectorizer
                                                    </Typography>
                                                    <input type="file" onChange={handleVectorizerChange} />

                                                </div>

                                                <div className='col-12 h-100  mb-5'>

                                                    <Typography variant="h5" gutterBottom>
                                                        Input Model
                                                    </Typography>
                                                    <input type="file" onChange={handleFilesChange} />

                                                </div>
                                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: 620 }}>


                                                    <TextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="title"
                                                        label="title"
                                                        name="title"
                                                        autoComplete="email"
                                                        autoFocus
                                                        inputProps={{
                                                            style: {
                                                                height: 50,

                                                            },
                                                        }}
                                                        sx={{  mb: 3 }}
                                                    />
                                                  
                                                    <TextField
                                                        id="desc"
                                                        fullWidth
                                                        name="desc"
                                                        label="deskripsi"
                                                        type="desc"
                                        
                                                        multiline
                                                        rows={4}
                                                        defaultValue="Deskripsi"
                                                        
                                                    />
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        Submit
                                                    </Button>

                                                </Box>


                                            </div>

                                            {/* <div className='row'>
                                                <div className='content col h-100  mb-5'>

                                                    <Typography variant="h5" gutterBottom>
                                                        Input Model
                                                    </Typography>
                                                    <input type="file" onChange={handleFilesChange} />

                                                </div>


                                            </div> */}


                                        </div>


                                       







                                    </Paper>
                                </Grid>


                            </Grid>

                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>


        </>
    );
}

export default Model;
