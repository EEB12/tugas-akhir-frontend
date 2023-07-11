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
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
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
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
const mdTheme = createTheme();





const EditPenelitian = () => {
    const [open, setOpen] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState();
    const [data, setdata] = useState([]);
    const [age, setAge] = React.useState('');
    const [namefile, setNamefile] = useState('')
    const [desc, setDesc] = useState('')
    const [dataAnotator, setDataAnotator] = useState([])
    const [myValue, setMyValue] = useState('');
    const [target, setTarget] = useState("");
    const [inputValue, setInputValue] = useState("");
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
    const handletarget = (event) => {
        setInputValue(event.target.value);
    };
    const handleTargetButton = () => {

        // if(inputValue=""){
        //   return
        // }
        if (target == "") {
            const merged = `${target}`
            console.log(merged)
            setTarget(inputValue);

            setInputValue("")
        }
        else {
            const merged = `${inputValue},${target}`
            setTarget(merged);
            setInputValue("")
        }



    };
    const uploadFiles = async () => {
        // Create a form and post it to server
        let formData = new FormData()
        handleToggle()

        formData.append("title", namefile)

        formData.append("desc", desc)
        formData.append("id_user_anotator", myValue)
        formData.append("target", target);

        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        try {
            const response = await axios({
                method: "post",
                url: `https://backend-ta.ndne.id/api/edit_penelitian/${data.id_anotasi}`,
                data: formData,
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });


            swal("Success", "Data Penelitian berhasil diedit", "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {

                    window.location.href = `/admin/list-penelitian`;
                });

            swal("Failed", response.data.error, "error");


        } catch (error) {
            // Handle the error
            swal("Failed", error.response.data.message, "error");
            console.error(error);
        }
        // const response = await axios({
        //     method: "post",
        //     url: `https://backend-ta.ndne.id/api/edit_penelitian/${data.id_anotasi}`,
        //     data: formData,
        //     headers: {
        //         "Authorization": `Bearer ${token}`,
        //     },
        // }).then(data => data);

        // console.log(response.data.data)



        handleClose()


    }

    useEffect(() => {
        // Update the document title using the browser API

    }, [data]);

    const params = useParams();
    useEffect(() => {
        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const handleSubmit = async (event) => {
            handleToggle()
            const response = await axios({
                method: "get",
                url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${params.id}`,

                headers: {
                    "Authorization": `Bearer ${token}`,

                },
            }).then(data => data);

            // console.log(response.data)

            console.log(response.data)
            setDesc(response?.data[0].desc)

            setNamefile(response?.data[0].title)
            setdata(response?.data[0])
            handleClose()
        };

        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const handleget = async (event) => {

            const response = await axios({
                method: "get",
                url: "https://backend-ta.ndne.id/api/anotators",

                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }).then(data => data);

            console.log(response.data)
            setDataAnotator(response.data)
        };



        handleget()


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
                        <Container maxWidth="100vh" sx={{
                            mr: 80,
                            p: 2,
                            display: 'flex',


                            alignItems: 'center'
                        }}>

                            <Grid container spacing={1}>
                                {/* Chart */}
                                <Grid item xs={12} md={12} lg={12} >
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
                                                    Edit Penelitian
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
                                                                    value={namefile}
                                                                    onChange={handleChangeTitle} id="standard-basic" variant="standard" />

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Deskripsi
                                                                </Typography>
                                                                <TextField
                                                                    id="filled-multiline-static"

                                                                    multiline
                                                                    rows={2}
                                                                    value={desc}
                                                                    onChange={handleDesc}
                                                                    sx={{
                                                                        marginLeft: 3,
                                                                        width: '95%',
                                                                        marginBottom: 4,
                                                                        backgroundColor: '#FFFFFF'
                                                                    }}
                                                                />

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Pilih Anotator
                                                                </Typography>

                                                                <select onChange={(e) => setMyValue(e.target.value)} class="form-select ms-4 form-select-lg mb-3 w-25" aria-label=".form-select-lg example">
                                                                    <option selected>Open this select menu</option>
                                                                    {dataAnotator?.map((option, idx) => (
                                                                        <option value={option.id_anotator}>{option.username}</option>
                                                                    ))}

                                                                </select>

                                                                <div className="row">
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 600,
                                                                            m: 1,
                                                                            fontSize: 35,
                                                                        }}
                                                                        variant="h3"
                                                                        gutterBottom
                                                                    >
                                                                        Target Label
                                                                    </Typography>
                                                                    <TextField disabled
                                                                        id="filled-multiline-static"
                                                                        multiline
                                                                        value={target}
                                                                        variant="filled"

                                                                        sx={{
                                                                            marginLeft: 3,
                                                                            width: "25%",
                                                                            marginBottom: 4,
                                                                            backgroundColor: "#FFFFFF",
                                                                        }}
                                                                    />

                                                                </div>
                                                                <div className="row">
                                                                    <TextField
                                                                        id="filled-multiline-static"
                                                                        multiline
                                                                        value={inputValue}
                                                                        onChange={handletarget}
                                                                        sx={{
                                                                            marginLeft: 3,
                                                                            width: "25%",
                                                                            marginBottom: 4,
                                                                            backgroundColor: "#FFFFFF",
                                                                        }}
                                                                    />

                                                                    <Button
                                                                        sx={{

                                                                            width: 100,
                                                                            height: 50,


                                                                        }}
                                                                        type="button"
                                                                        variant="contained"
                                                                        onClick={handleTargetButton}
                                                                        className="ms-2"
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </div>



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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}

                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </ThemeProvider >


        </>
    );
}

export default EditPenelitian;
