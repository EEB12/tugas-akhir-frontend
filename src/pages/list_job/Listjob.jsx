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
import { useState, useEffect, useParams } from "react";
import './upload.css'
import FileUpload from "react-mui-fileuploader";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Navbar from '../Component/navbar';
import swal from 'sweetalert';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const mdTheme = createTheme();





const Listjob = () => {

    // const getHeadings = () => {
    //     return Object.keys(contoh[0]);
    // }
    const [data, setData] = useState([]);
    const [role, setRole] = useState('');
    const [age, setAge] = React.useState('');

   








    useEffect(() => {

        var token = localStorage.getItem('tokenAccess')
        
        console.log(token)

        var role = localStorage.getItem('role')
        setRole(role)
        const handleSubmit = async (event) => {
            
           
            

           
                const response = await axios({
                    method: "get",
                    url: "http://103.157.96.170:5000/api/list_job_penelitian",
    
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }).then(data => data);
    
                console.log(response.data)
                setData(response.data)
            
            
        };



        handleSubmit()


    }, []);



    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>

                    <Navbar />

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            width: '100%',
                            height: '100%',
                            overflowX: 'initial',
                        }}
                    >

                        <Toolbar />
                        <Container maxWidth="lg" sx={{
                            mr: 80,
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

                                            height: '100vh',
                                            width: 1600,
                                            pb: 10,
                                            flexDirection: 'column',
                                            backgroundColor: '#f5f5f5'
                                        }}

                                    >
                                        <div className='container-fluid'>
                                            <div className='row mb-5'>


                                                <Typography sx={{
                                                    color: '#0285F1',
                                                    fontWeight: 600, m: 1, fontSize: 60
                                                }} variant="h3" gutterBottom>
                                                    List Job Anotate
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='col-12'>
                                                    {data.map((item, index) =>
                                                        <>
                                                            <div className='row mb-4'>
                                                                <Card sx={{ maxWidth: 1500, Height: 200,boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',borderRadius: '10px', }} variant='outlined'>
                                                                    <CardContent>

                                                                        <div className='container-fluid'>
                                                                            <div className='row'>
                                                                                <div className='col-6 mt-3'>

                                                                                    <Typography component="div">

                                                                                        Nama Penelitian :{item.title}
                                                                                    </Typography>
                                                                                    <Typography component="div">

                                                                                        Type Anotasi Data :{item.type_anotasi}
                                                                                    </Typography>




                                                                                </div>


                                                                                <div className='col-6 d-flex justify-content-end'>
                                                                                    
                                                                                    {item.type_anotasi == 'manual'?
                                                                                    <>  
                                                                                    <Button href={`/mytable/`+item.id_anotasi}  type="button" class="btn btn-light  interactive-button detail ">
                                                                                        <Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16,paddingTop:2}}>Anotate  </Box></Button></>
                                                                                        : <><Button href={`/anotate-auto/`+item.id_anotasi}  type="button" class="btn btn-light  interactive-button detail ">
                                                                                        <Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16,paddingTop:2}}>Anotate </Box></Button></>}
                                                                                   
                                                                                    
                                                                                    
                                                                                </div>


                                                                            </div>
                                                                        </div>




                                                                    </CardContent>

                                                                </Card>

                                                            </div>
                                                        </>
                                                    )}
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


        </>
    );
}

export default Listjob;
