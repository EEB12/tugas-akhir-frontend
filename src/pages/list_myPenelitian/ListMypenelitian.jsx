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
import csvDownload from 'json-to-csv-export'
const mdTheme = createTheme();


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


const ListMypenelitian = () => {

    // const getHeadings = () => {
    //     return Object.keys(contoh[0]);
    // }
    const [data, setData] = useState([]);
    const [role, setRole] = useState('');
    const [age, setAge] = React.useState('');

    const download = async (id, name) => {
        var token = localStorage.getItem('tokenAccess')
        let formData = new FormData()

        formData.append("id_anotasi", id)
        const response = await axios({
            method: "get",
            url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${id}}`,

            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);

        console.log(response.data)
        const dataDownload = response.data[1]
        var headers = Object.keys(dataDownload[0]).reverse()
        console.log(headers)
        const dataToConvert = {
            data: dataDownload,
            filename: `${name}`,
            delimiter: ',',
            headers: headers
        }
        csvDownload(dataToConvert)
    }
    useEffect(() => {

        var token = localStorage.getItem('tokenAccess')

        console.log(token)

        var role = localStorage.getItem('role')
        setRole(role)
        const getPenelitian = async (event) => {
            if (role == '"peneliti"' || role == '"anotator"') {
                const response = await axios({
                    method: "get",
                    url: "https://backend-ta.ndne.id/api/my_list_penelitian",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }).then(data => data);

                console.log(response.data)
                setData(response.data)
            }
            else {
                const response = await axios({
                    method: "get",
                    url: "https://backend-ta.ndne.id/api/list_penelitian",

                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }).then(data => data);

                console.log(response.data)
                setData(response.data)
            }

        };



        getPenelitian()


    }, []);



    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>

                    <Navbar />

                    <Box
                        component="main"
                        sx={{
                            width: '100%',
                            height: '100%',
                            overflowX: 'hidden',
                            position: 'fixed',
                            backgroundColor: '#f5f5f5',
                            overflowY: 'auto',
                        }}
                    >

                        <Toolbar />
                        <Container maxWidth="100vh" sx={{
                            mr: 80,
                            p: 2,
                            display: 'flex',


                            alignItems: 'center'
                        }}>

                            <Grid container spacing={1}>
                                {/* Chart */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={0}

                                        sx={{
                                            p: 2,
                                            display: 'flex',

                                            height: '100vh',
                                            width: '100%%',
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
                                                    My Penelitian
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='row'>
                                                    {console.log(data.length)}

                                                    {data.length == 0 ?
                                                        <>

                                                            <div className='col-12 d-flex justify-content-center'>



                                                                <div class="card empty" style={{ width: '80%' }}>

                                                                    <div class="card-body" style={{ width: '100%' }}>
                                                                        <h5 class="card-title text-center">Data Penelitian Kosong </h5>

                                                                        <p class="card-text text-center">Klik "Buat Penelitian" untuk membuat penelitian</p>
                                                                        <div className='w-100 d-flex justify-content-center'>

                                                                            <a href='/new-penelitian' type="button" class="btn btn-primary w-25">Buat Penelitian</a>

                                                                        </div>
                                                                        <p className='mt-3 text-center text-danger'>( Siapkan dataset penelitian sebelum membuat penelitian )</p>
                                                                    </div>
                                                                </div>



                                                            </div>


                                                        </>
                                                        :

                                                        <><div className='col-12'>





                                                            <div className='row mb-4'>
                                                                {data.map((item, index) =>
                                                                    <>
                                                                        <div className='col-3 ml-3 mb-3'>

                                                                            <div class="card card-layout" style={{  minHeight: '200px',maxWidth: '100%' }}>
                                                                                <img src="/loginregister.jpg" style={{  maxHeight: '150px', width: '100%', objectFit: 'cover' }} class="card-img-top" alt="..." />
                                                                                <div class="card-body detail-card " style={{  minHeight: '140px' }}>
                                                                                    <h5 class="card-title text-blue">{item.title}</h5>
                                                                                    <p class="card-text text-blue">{item.desc}.</p>

                                                                                </div>
                                                                            </div>
                                                                            <a href={`/detail-penelitian/` + item.id_anotasi} class="btn btn-primary button-detail" style={{ minWidth:'100%' , maxWidth: '40vh' }}>Detail Penelitian</a>
                                                                        </div>

                                                                        

                                                                        

                                                                       

                                                                       


                                                                    </>
                                                                )}



                                                            </div >

                                                        </div></>}




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

export default ListMypenelitian;
