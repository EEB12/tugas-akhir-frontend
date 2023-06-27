import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import './upload.css'
import MenuItem from '@mui/material/MenuItem';
import jwtDecode from 'jwt-decode';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Navbar from '../Component/navbar';
import swal from 'sweetalert';
import { useJwt } from "react-jwt";
const mdTheme = createTheme();

const UpgradeRole = () => {

    const [open, setOpen] = useState(false);

    const [nik, setNIK] = useState('');
    const [myValue, setMyValue] = useState('');

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const params = useParams();
    const UploadFiles = async () => {

        let formData = new FormData()
        handleToggle()
        formData.append("nrp_nik", nik)



        var token = localStorage.getItem('tokenAccess')
        console.log(token)
        const response = await axios({
            method: "put",
            url: "http://103.157.96.170:5000/api/update_role",
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);;

        console.log(response.data)
        var token = response.data.token
        console.log(token)
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        var role = decodedToken.role;
        var extractedRole = role.split('.')[1].toLowerCase();
        localStorage.setItem('tokenAccess', response.data.token);
        localStorage.setItem('role', `"${extractedRole}"` );


        handleClose()
        if (response.data.message == 'User updated successfully.') {
            swal("Success", "Anotator berhasil diassign", "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {
                    window.location.href = "/list-penelitian";

                });
        } else {
            swal("Failed", "Anotator gagal diassign", "error");
        }

    }
    const handleChangeNIK = (event) => {
        setNIK(event.target.value);
    };

    useEffect(() => {




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
                                                    Upgrade to Anotator
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='col-12'>
                                                    <Paper elevation={0}
                                                        sx={{
                                                            p: 2,
                                                            display: 'flex',

                                                            height: '50vh',
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
                                                                    Masukkan NIK
                                                                </Typography>

                                                                <TextField sx={{
                                                                    marginLeft: 3,
                                                                    width: 1400,
                                                                    marginBottom: 4
                                                                }} onChange={handleChangeNIK} id="standard-basic" variant="standard" />


                                                            </div>

                                                        </div>
                                                        <br></br>
                                                        <br></br>
                                                        <br></br>
                                                        <br></br>
                                                        <Button type="button" onClick={UploadFiles} variant="contained" className="button-submit mt-3 w-25">Submit</Button>

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

export default UpgradeRole;
