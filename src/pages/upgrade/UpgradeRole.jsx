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
            url: "https://backend-ta.ndne.id/api/update_role",
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
        localStorage.setItem('role', `"${extractedRole}"`);


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
                            width: "100%",
                            height: "100%",
                            overflowX: "hidden",
                            position: "fixed",
                            backgroundColor: "#f5f5f5",
                            overflowY: "auto",
                        }}
                    >

                        <Toolbar />

                        <div className="container bg-white my-4 rounded-5 p-4  ">
                            <div className="mb-4 d-flex justify-content-between   profile-title ">
                                <h3 style={{ color: "#0285F1" }}>Buat Penelitian</h3>
                                {/* <button type="button" class="btn btn-custom shadow">
                  <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="pe-2" />
                  Tutorial
                </button> */}

                            </div>
                            <div className="row">
                                <div className="col-6 ps-4 mt-4">
                                    <div class="row mb-4">
                                        <label for="nama" class="col-lg-4 col-form-label">NIK/NRP</label>
                                        <div class="col-lg-8">
                                            <input type="text" class="form-control" id="nama" onChange={handleChangeNIK} />
                                        </div>
                                    </div>
                               

                                    
                              

                                 

                                    
                                </div>

                                <div className="col-6">
                                    
                                </div>
                            </div>

                            <div className="row">

                            </div>

                            <div className="row mt-5">
                                <button
                                    type="button" onClick={UploadFiles} class="btn btn-primary ms-2 mt-3 w-25"
                                   

                                >
                                    Submit
                                </button>

                            </div>


                        </div>
                        
                    </Box>
                </Box>
            </ThemeProvider >


        </>
    );
}

export default UpgradeRole;
