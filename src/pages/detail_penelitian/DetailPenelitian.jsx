import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Table from '../Component/Table';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from "react";
import './upload.css'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Navbar from '../Component/navbar';
import swal from 'sweetalert';


const mdTheme = createTheme();





const DetailPenelitian = () => {
    const [open, setOpen] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState();
    const [data, setData] = useState([]);
    const [table, setTable] = useState([]);
    const [age, setAge] = React.useState('');
    const [namefile, setNamefile] = useState('')
    const [modelid, setModelid] = useState('')
    const [preview, setPreview] = React.useState([]);
    const handleClose = () => {
        setOpen(false);
    };
   

    const handleChangeTitle = (event) => {
        setNamefile(event.target.value);
    };

   

    const handlename = (event) => {
        setNamefile(event.target.value)
    }
    const getHeadings = () => {
        return Object.keys(preview[0]).reverse();
    }

    const params = useParams();

    const handleSubmit = async () => {


    };

    useEffect(() => {
        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const handleSubmit = async (event) => {

            const response = await axios({
                method: "get",
                url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${params.id}`,

                headers: {
                    "Authorization": `Bearer ${token}`,

                },
            }).then(data => data);

            // console.log(response.data)
            const preview1 = response.data[1].slice(0, 5)
            // console.log(preview1)
            setPreview(preview1)
            // console.log(response.data[0])
            setData(response.data[0])
        };



        handleSubmit()

    }, []);





    useEffect(() => {
        // Update the document title using the browser API

    }, [preview]);




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

                                            height: '100%',
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
                                                    Detail Penelitian
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='col-12'>
                                                    <Paper elevation={0}
                                                        sx={{
                                                            p: 2,
                                                            display: 'flex',

                                                            height: '130vh',
                                                            width: 1600,
                                                            pb: 10,
                                                            flexDirection: 'column',
                                                            backgroundColor: '#fffff',
                                                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '5px'
                                                        }}

                                                    >
                                                        <div className='container-fluid'>
                                                            <div className='row mb-5'>


                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Judul Penelitian
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: 1400,
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.title} />

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Type anotasi
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: 1400,
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.type_anotasi} />


                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Status
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: 1400,
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.status} />



                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Anotator
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: 1400,
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.anotator} />



                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Data Preview
                                                                </Typography>
                                                            </div>
                                                            <div className='row mt-2'>
                                                                {preview.length > 0 ? <>

                                                                    <Table theadData={getHeadings()} tbodyData={preview}>

                                                                    </Table>

                                                                    {console.log(preview.length, "true")}

                                                                </> : <>


                                                                    {console.log(preview, "false")}

                                                                </>}


                                                            </div>

                                                        </div>
                                                        <br></br>
                                                        <br></br>
                                                        <br></br>
                                                        <br></br>
                                                        {/* <Button type="button" variant="contained" onClick={handleSubmit} className="ms-2 mt-3 w-25">Upload</Button> */}

                                                    </Paper>
                                                </div>



                                            </div>





                                        </div>










                                    </Paper>
                                </Grid>


                            </Grid>

                        </Container>
                    </Box>
                </Box>
            </ThemeProvider >


        </>
    );
}

export default DetailPenelitian;
