import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';


import Box from '@mui/material/Box';

import Toolbar from '@mui/material/Toolbar';

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





const AnotateAuto = () => {
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
    const handleToggle = () => {
        setOpen(!open);
    };
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChangeTitle = (event) => {
        setNamefile(event.target.value);
    };

    const handleFilesChange = (e) => {
        // Update chosen files
        console.log(e.target.files[0])
        setFilesToUpload(e.target.files[0])
    };

    const handlename = (event) => {
        setNamefile(event.target.value)
    }
    const getHeadings = () => {
        return Object.keys(preview[0]).reverse();
    }

    const params = useParams();

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
        // csvDownload(dataToConvert)
    }

    const handleSubmit = async () => {




        let formData = new FormData()




        formData.append("id_anotasi", params.id)
        formData.append("id_model", modelid)



        var token = localStorage.getItem('tokenAccess')


        const response = await axios({
            method: "post",
            url: "https://backend-ta.ndne.id/api/anotate_model",
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);

        const preview1 = response.data.data.slice(0, 5)

        setPreview(preview1)


        if (response.data) {
            swal("Success", "Model Uploaded", "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {


                });
        } else {
            swal("Failed", "Model Upload Failed", "error");
        }
    };

    useEffect(() => {
        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const handleSubmit = async (event) => {

            const response = await axios({
                method: "get",
                url: "https://backend-ta.ndne.id/api/list_model",

                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }).then(data => data);

            console.log(response.data)
            setData(response.data)
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
                                                    Anotasi otomatis
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='col-12'>
                                                    <Paper elevation={0}
                                                        sx={{
                                                            p: 2,
                                                            display: 'flex',

                                                            height: '80vh',
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
                                                                    marginBottom: 4
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value="Sentiment Analysis Tweet" />

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Type anotasi
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: 1400,
                                                                    marginBottom: 4
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value="Auto" />


                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Type Anotasi
                                                                </Typography>

                                                                <select onChange={(e) => setModelid(e.target.value)} class="form-select form-select-lg mb-3 w-25" aria-label=".form-select-lg example">
                                                                    <option selected>Program Model</option>
                                                                    {data.map((option, idx) => (
                                                                        <option value={option.id}>{option.title}</option>
                                                                    ))}

                                                                </select>
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
                                                        <Button type="button" variant="contained" onClick={handleSubmit} className="ms-2 mt-3 w-25">Upload</Button>

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

export default AnotateAuto;
