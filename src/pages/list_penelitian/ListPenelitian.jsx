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


const Listpenelitian = () => {

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
        var headers = Object.keys(dataDownload[0])
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
                setData(response.data?.filter(item => item.status === "finished"))
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

                            backgroundColor: '#f5f5f5',
                            alignItems: 'center'
                        }}>

                            <Grid container >
                                {/* Chart */}
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={0}

                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            overflowX: 'hidden',
                                            
                                            backgroundColor: '#f5f5f5',
                                            overflowY: 'auto',
                                        }}

                                    >
                                        <div className='container   '>


                                            <div className='row  d-flex justify-content-around'>

                                                <div id="carouselExampleCaptions" class="carousel slide  " data-bs-ride="carousel">
                                                    <div class="carousel-indicators">
                                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                    </div>
                                                    <div class="carousel-inner rounded-5">

                                                        <div class="carousel-item active">

                                                            <img src="/carousel-2.jpg" class="d-block" style={{ width: '100%', height: '467px' }} alt="..." />
                                                            <div class="carousel-caption custom-first px-5 d-none d-md-block rounded-4" >
                                                                <h1>Selamat Datang di Website Anotasi</h1>
                                                                <h5 className='fw-normal'>Website Anotasi Data merupakan website yang menyediakan fitur anotasi data manual maupun otomatis
                                                                    untuk mahasiswa dalam melakukan penelitian anotasi data. Website ini mendukung penggunaan model dalam berbagai penelitian.

                                                                </h5>
                                                                <p className='mt-3 text-md-center'>
                                                                    Fitur yang disediakan oleh website ini berupa:
                                                                    <div class=" gap-3 d-flex align-items-center justify-content-center flex-column mt-3">
                                                                        <div class=" list-group-mine py-2 fw-normal w-25" href="/#">Membuat Penelitian Data</div>
                                                                        <div class=" list-group-mine py-2 fw-normal w-25" href="/#">Melakukan Anotasi Data</div>
                                                                        <div class=" list-group-mine py-2 fw-normal w-25" href="/#">Export Data Hasil Anotasi</div>
                                                                    </div>

                                                                </p>



                                                            </div>
                                                        </div>

                                                        <div class="carousel-item">
                                                            <img src="/carousel.jpg" class="d-block" style={{ width: '100%', maxWidth: '2560px', maxHeight: '467px' }} alt="..." />
                                                            <div class="carousel-caption custom-second  px-5 d-none d-md-block rounded-4" >
                                                                <h1 className='text-dark'>Langkah Membuat Penelitian</h1>

                                                                <p className='mt-3 text-dark text-md-center'>

                                                                    <div class=" gap-3 d-flex align-items-center justify-content-center flex-row mt-3">
                                                                        <div class="  py-2 fw-normal w-25 text-dark" href="/#">
                                                                            <h4 className='text-center'> Langkah Pertama</h4>
                                                                            <img style={{ width: '100%', maxWidth: '50px' }} src="/click.png" />

                                                                            <p className='text-center'>
                                                                                Klik "Buat Penelitian"
                                                                            </p>

                                                                        </div>

                                                                        <img style={{ width: '100%', maxWidth: '50px' }} src="/arrow.png" />


                                                                        <div class="  py-2 fw-normal w-25 text-dark" href="/#">
                                                                            <h4 className='text-center'> Langkah Kedua</h4>
                                                                            <img style={{ width: '100%', maxWidth: '50px' }} src="/form.png" />
                                                                            <p className='text-center'>
                                                                                Lengkapi Data Penelitian
                                                                            </p>


                                                                        </div>

                                                                        <img style={{ width: '100%', maxWidth: '50px' }} src="/arrow.png" />

                                                                        <div class="  py-2 fw-normal w-25 text-dark" href="/#">
                                                                            <h4 className='text-center'> Langkah Ketiga</h4>
                                                                            <img style={{ width: '100%', maxWidth: '50px' }} src="/anotator.png" />
                                                                            <p className='text-center'>
                                                                                Pilih Anotator
                                                                            </p>

                                                                        </div>



                                                                    </div>

                                                                    <div class=" gap-3 mt-3 d-flex align-items-center justify-content-center flex-row mt-3">
                                                                        <div class="  py-2 fw-normal w-25 text-dark" href="/#">
                                                                            <h4 className='text-center'> Langkah Keempat</h4>
                                                                            <img style={{ width: '100%', maxWidth: '50px' }} src="/time.png" />

                                                                            <p className='text-center'>
                                                                                Menunggu Proses Anotasi
                                                                            </p>

                                                                        </div>

                                                                        <img style={{ width: '100%', maxWidth: '50px' }} src="/arrow.png" />

                                                                        <div class="  py-2 fw-normal w-25 text-dark" href="/#">
                                                                            <h4 className='text-center'> Langkah Kelima</h4>
                                                                            <img style={{ width: '100%', maxWidth: '50px' }} src="/form.png" />
                                                                            <p className='text-center'>
                                                                                Mendapatkan Hasil Anotasi
                                                                            </p>


                                                                        </div>




                                                                    </div>

                                                                </p>



                                                            </div>
                                                        </div>
                                                        {/* <div class="carousel-item">
                                                            <img src="/carousel-2.jpg" class="d-block" style={{ width: '100%', height: '467px' }} alt="..." />
                                                            <div class="carousel-caption d-none d-md-block">
                                                                <h5>Third slide label</h5>
                                                                <p>Some representative placeholder content for the third slide.</p>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Previous</span>
                                                    </button>
                                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span class="visually-hidden">Next</span>
                                                    </button>
                                                </div>


                                            </div>

                                            <div className='row  mb-4 d-flex justify-content-around'>

                                                <div className='title mx-5 mt-3'>
                                                    <Typography sx={{
                                                        color: '#0285F1',
                                                        fontWeight: 600, m: 1, fontSize: 30
                                                    }} variant="h3" gutterBottom>
                                                        List Penelitian Finished
                                                    </Typography>
                                                </div>


                                            </div>
                                            <div className='row'>
                                                {console.log(data.length)}
                                                <div className='col-12'>
                                                    {data.map((item, index) =>
                                                        <>




                                                            <div className='row mb-4'>
                                                                <div className='col-3 ml-3 mb-3'>

                                                                    <div class="card card-layout"  style={{ width: '18rem' }}>
                                                                        <img src="/loginregister.jpg"  style={{ maxHeight: '150px',width:'100%',objectFit:'cover' }} class="card-img-top" alt="..."/>
                                                                            <div class="card-body detail-card ">
                                                                                <h5 class="card-title">{item.title}</h5>
                                                                                <p class="card-text">{item.desc}.</p>
                                                                              
                                                                            </div>
                                                                    </div>
                                                                    <a href="/new-penelitian" class="btn btn-primary button-detail" style={{ width: '18rem' }}>Detail Penelitian</a>
                                                                </div>

                                                                

                                                                
                                                                

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

export default Listpenelitian;
