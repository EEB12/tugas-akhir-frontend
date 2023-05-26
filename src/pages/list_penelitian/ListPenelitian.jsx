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


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


const Listpenelitian = () => {

    // const getHeadings = () => {
    //     return Object.keys(contoh[0]);
    // }
    const [data, setData] = useState([]);
    const [result,setResult]=useState([])
    const [data1, setData1] = useState(['a', 'b', 'c']);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };



    
    



    useEffect(() => {

        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const handleSubmit = async (event) => {

            const response = await axios({
                method: "get",
                url: "http://localhost:5000/api/list_dataset",

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
                            height:'100%',
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

                                            <div className='row'>

                                                <div className='col-6'>
                                                    {data.map((item, index) =>
                                                        <>
                                                            <div className='row mb-4'>
                                                                <Card sx={{ maxWidth: 800, Height: 200 }} variant='outlined'>
                                                                    <CardContent>

                                                                        <div className='container'>
                                                                            <div className='row'>
                                                                                <div className='col'>
                                                                                    <Typography variant="h5" component="div">
                                                                                       
                                                                                        {item.title}
                                                                                    </Typography>
                                                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                                                        {item.type_anotasi}
                                                                                    </Typography>


                                                                                </div>


                                                                                <div className='col'>
                                                                                    <Button href={`/list-model/`+item.id_anotasi} className=" w-75 me-5" variant="contained" sx={{
                                                                                        height: '80px',
                                                                                        ':hover': {
                                                                                            bgcolor: 'primary.main', // theme.palette.primary.main
                                                                                            color: 'black',

                                                                                        },
                                                                                    }}>Gunakan data ini</Button>

                                                                                </div>


                                                                            </div>
                                                                        </div>




                                                                    </CardContent>

                                                                </Card>

                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className='col-6 ps-5'>
                                                    {/* {data == 0 ? <></> : <>

                                                        <Table theadData={getHeadings()} tbodyData={contoh}>

                                                        </Table>


                                                    </>} */}
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

export default Listpenelitian;
