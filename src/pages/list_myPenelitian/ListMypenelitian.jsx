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
        const dataDownload=response.data[1]
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
                                            width: '80%',
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

                                                <div className='col-12'>
                                                    {data.map((item, index) =>
                                                        <>
                                                            <div className='row mb-4'>
                                                                <Card sx={{ Width: '150%', Height: 200, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', borderRadius: '10px', }} variant='outlined'>
                                                                    <CardContent>

                                                                        <div className='container-fluid'>
                                                                            <div className='row'>
                                                                                <div className='col-6 mt-3'>

                                                                                    <Typography component="div">

                                                                                        <span className='fw-bold me-1'>Nama Penelitian &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> :<span className='fw-bold ms-2'>{item.title}</span>
                                                                                    </Typography>
                                                                                    <Typography component="div">

                                                                                        <span className='fw-bold me-3'> Type Anotasi Data &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>:<span className='ms-2 text-muted' >{item.type_anotasi}</span>
                                                                                    </Typography>

                                                                                    <Typography component="div">

                                                                                        <span className='fw-bold     text-deskripsi'>Deskripsi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>:<span className='ms-2 text-muted'>{item.desc}</span>
                                                                                    </Typography>

                                                                                    <Typography component="div">

                                                                                        <span className='fw-bold     text-deskripsi'>Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>:<span className='ms-2 fw-bold'>{item.status}</span>
                                                                                    </Typography>




                                                                                </div>


                                                                                <div className='col-6 d-flex justify-content-end mt-3'>
                                                                                <button href={`/detail-penelitian/` + item.id_anotasi} type="button" class=" interactive-button detail ms-4"><Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}><a className='detail' href={`/admin/editUser/` + item.id_anotasi}>Edit</a> </Box></button>
                                                                                    <button onClick={() => download(item.id_anotasi, item.title)} type="button" class="  ms-4 interactive-button "><Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16, paddingLeft: 2, paddingRight: 2 }}>Download .csv</Box></button>
                                                                                    <button href={`/detail-penelitian/` + item.id_anotasi} type="button" class=" interactive-button detail ms-4"><Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}><a className='detail' href={`/detail-penelitian/` + item.id_anotasi}>Detail</a> </Box></button>

                                                                                    {/* {role == '"peneliti"' ?<Button href={`/list-anotator/`+item.id_anotasi}  type="button" class="btn btn-light  interactive-button detail ">
                                                                                        <Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}>Pilih Anotator </Box></Button>:<></>} */}


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

export default ListMypenelitian;
