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





const NewPenelitian = () => {
    const [open, setOpen] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState();
    const [data, setdata] = useState([]);
    const [age, setAge] = React.useState('');
    const [namefile, setNamefile] = useState('')
    const [desc, setDesc] = useState('')

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setNamefile(event.target.value);
    };
    const handleDesc = (event) => {
        setDesc(event.target.value);
    };

    const handleFilesChange = (e) => {
        // Update chosen files
        console.log(e.target.files[0])
        setFilesToUpload(e.target.files[0])
    };
    // const handleFilesChange = (files) => {
    //     // Update chosen files
    //     setFilesToUpload(files[0])
    // };
    const handlename = (event) => {
        setNamefile(event.target.value)
    }
    const getHeadings = () => {
        return Object.keys(data[0]).reverse();
    }

    const uploadFiles = async () => {
        // Create a form and post it to server
        let formData = new FormData()
        handleToggle()
        formData.append("file", filesToUpload)
        formData.append("title", namefile)
        formData.append("type_anotasi", age)
        formData.append("desc", desc)
        // console.log(filesToUpload)
        // console.log(formData.get('file'))
        var token = localStorage.getItem('tokenAccess')
        console.log(token)
        const response = await axios({
            method: "post",
            url: "https://backend-ta.ndne.id/api/upload_penelitian",
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }).then(data => data);;

        console.log(response.data.data)

        const preview = response.data.data.slice(0, 5)

        setdata(preview)
        handleClose()
        if (response.data.message == 'Data created successfully') {
            swal("Success", "Data Penelitian berhasil diupload", "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {

                    window.location.href = `/list-anotator/${response.data.id_anotasi}`;
                });
        } else {
            swal("Failed", "Model Upload Failed", "error");
        }

    }

    useEffect(() => {
        // Update the document title using the browser API

    }, [data]);










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
                        <Container maxWidth="100vh" sx={{
                            mr: 80,
                            p: 2,
                            display: 'flex',


                            alignItems: 'center'
                        }}>

                            <Grid container spacing={1}>
                                {/* Chart */}
                                <Grid item  xs={12} md={12} lg={12} >
                                    <Paper elevation={0}
                                        sx={{
                                            p: 2,
                                            display: 'flex',

                                            height: '100%',
                                            width: '100%',
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
                                                    Buat Penelitian
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='col-12'>
                                                    <Paper elevation={0}
                                                        sx={{
                                                            p: 2,
                                                            display: 'flex',

                                                           
                                                            height: '100%',
                                                            width: '100%',
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

                                                                <TextField sx={{
                                                                    marginLeft: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4
                                                                }}
                                                                inputProps={{
                                                                    style: {
                                                                        marginTop: 6,
                                                                        fontSize: '20px', // Adjust the font size as needed
                                                                    },
                                                                }}
                                                                onChange={handleChangeTitle} id="standard-basic" variant="standard" />
                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Type Anotasi
                                                                </Typography>

                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={age}
                                                                    sx={{
                                                                        marginLeft: 3,
                                                                        width: 200,
                                                                        marginBottom: 4
                                                                    }}
                                                                    onChange={handleChange}
                                                                >
                                                                    <MenuItem value={"AUTO"}>Auto</MenuItem>
                                                                    <MenuItem value={"MANUAL"}>Manual</MenuItem>

                                                                </Select>
                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Deskripsi
                                                                </Typography>
                                                                <TextField
                                                                    id="filled-multiline-static"
                                                                   
                                                                    multiline
                                                                    rows={2}
                                                                    
                                                                  onChange={handleDesc}
                                                                    sx={{
                                                                        marginLeft: 3,
                                                                        width: '95%',
                                                                        marginBottom: 4,
                                                                        backgroundColor:'#FFFFFF'
                                                                    }}
                                                                />
                                                                <Box sx={{
                                                                    marginLeft: '8px',
                                                                    marginTop: 1,
                                                                    width: 900
                                                                }}>
                                                                    <Typography sx={{

                                                                        fontWeight: 600, fontSize: 35
                                                                    }} variant="h3" gutterBottom>
                                                                        DataSet
                                                                    </Typography>
                                                                    <input type="file" onChange={handleFilesChange} />

                                                                </Box>




                                                            </div>

                                                        </div>
                                                        <br></br>
                                                        <br></br>
                                                        <br></br>
                                                        <br></br>
                                                        <Button type="button" variant="contained" onClick={uploadFiles} className="ms-2 mt-3 w-25">Upload</Button>

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

export default NewPenelitian;
