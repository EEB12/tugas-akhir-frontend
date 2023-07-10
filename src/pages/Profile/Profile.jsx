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
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
const mdTheme = createTheme();





const Profile = () => {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [NIK, setNIK] = useState('')

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 241, height: 241,
                fontSize: 95
            },
            children: `${name.split(' ')[0][0]}`,
        };
    }



    const handlename = (event) => {
        setName(event.target.value)
    }
    const handlemail = (event) => {
        setEmail(event.target.value)
    }

    const handleNIK = (event) => {
        setNIK(event.target.value)
    }




    useEffect(() => {
        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const handleSubmit = async (event) => {

            const response = await axios({
                method: "get",
                url: `https://backend-ta.ndne.id/api/profile`,

                headers: {
                    "Authorization": `Bearer ${token}`,

                },
            }).then(data => data);

            console.log(response.data)

            // console.log(response.data[0])
            setData(response.data)
            setName(response.data.username)
            setEmail(response.data.email)
        };



        handleSubmit()

    }, []);







    const handleSubmit = async () => {
        // Create a form and post it to server
        let formData = new FormData()

        formData.append("username", name)
        formData.append("email", email)


        var token = localStorage.getItem('tokenAccess')
        console.log(token)
        try {
            handleToggle()
            const response = await axios({
                method: "post",
                url: "https://backend-ta.ndne.id/api/update_user",
                data: formData,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            }).then(data => data);;

            console.log(response.data.data)


            swal("Success", "Profile Berhasil di update", "success", {
                buttons: false,
                timer: 6000,
            })
            window.location.href = `/list-penelitian`;

        } catch (error) {
            swal("Failed", error.response.data.message, "error");
            handleClose()

        }
    }


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
                                <Grid item xs={12} md={12} lg={12}>
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
                                                    Profile
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='col-12'>
                                                    <Paper elevation={0}
                                                        sx={{
                                                            p: 2,
                                                            display: 'flex',

                                                            height: '130vh',
                                                            width: '100%',
                                                            pb: 10,
                                                            flexDirection: 'column',
                                                            backgroundColor: '#fffff',
                                                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '5px'
                                                        }}

                                                    >
                                                        <div className='container-fluid'>
                                                            <div className='row mb-5 '>
                                                                <div className='col-12  d-flex justify-content-center'>
                                                                    <Stack direction="row" spacing={2}>
                                                                        <Avatar {...stringAvatar(`${data.username?.toUpperCase()}`)} />

                                                                    </Stack>
                                                                </div>

                                                            </div>
                                                            <div className='row mb-5'>


                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Nama Pengguna
                                                                </Typography>

                                                                <TextField sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }}
                                                                    inputProps={{
                                                                        style: {
                                                                            marginTop: 6,
                                                                            fontSize: '20px', // Adjust the font size as needed
                                                                        },
                                                                    }}
                                                                    onChange={handlename} id="standard-basic" variant="standard" value={name} />

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Email
                                                                </Typography>

                                                                <TextField inputProps={{
                                                                    style: {
                                                                        marginTop: 6,
                                                                        fontSize: '20px', // Adjust the font size as needed
                                                                    },
                                                                }} sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} onChange={handlemail} id="standard-basic" variant="standard" value={email} />


                                                                <Typography inputProps={{
                                                                    style: {
                                                                        marginTop: 6,
                                                                        fontSize: '20px', // Adjust the font size as needed
                                                                    },
                                                                }} sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    NIK/NRP
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4,

                                                                }} onChange={handleNIK} id="standard-basic" variant="standard" value={data.nrp_nik} />




                                                            </div>
                                                            <div className='row mb-5'>

                                                                <Button type="button" variant="contained" onClick={handleSubmit} className="ms-2 mt-3 w-25">Submit</Button>
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

export default Profile;
