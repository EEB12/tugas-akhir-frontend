import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

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

import Table from '../Component/Table';
import TableAdmin from '../Component/TableAdmin';
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



const ManagePenelitian = () => {

    // const getHeadings = () => {
    //     return Object.keys(contoh[0]);
    // }
    const [data, setData] = useState([]);
    const [header, setHeader] = useState([]);

    const [role, setRole] = useState('');
    const [age, setAge] = React.useState('');

    const download = async (id) => {
        var token = localStorage.getItem('tokenAccess')
        let formData = new FormData()

        formData.append("id_anotasi", id)
        const response = await axios({
            method: "post",
            url: 'hhttps://backend-ta.ndne.id/api/get-data',
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);

        var headers = Object.keys(response.data[0])
        console.log(headers)
        const dataToConvert = {
            data: response.data,
            filename: 'test download',
            delimiter: ',',
            headers: headers
        }
        csvDownload(dataToConvert)
    }

    const getHeadings = (header) => {
        return Object.keys(header).reverse();
    }
    useEffect(() => {

        var token = localStorage.getItem('tokenAccess')

        console.log(token)

        var role = localStorage.getItem('role')
        setRole(role)
        const getPenelitian = async (event) => {


            const response = await axios({
                method: "get",
                url: "https://backend-ta.ndne.id/api/get_all_penelitian",

                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }).then(data => data);

            console.log(Object.keys(response?.data[0]))
            setData(response.data)

            // var test = getHeadings(response?.data)
            // console.log(test)
            setHeader( Object.keys(response?.data[0]) )
        };


        console.log(header)
        getPenelitian()


    }, []);

    useEffect(() => {

        

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
                                <Grid item xs={12} md={12} lg={12}>
                                    <Paper elevation={0}
                                        sx={{
                                            p: 2,
                                            display: 'flex',

                                            height: '100vh',
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
                                                    List User
                                                </Typography>

                                            </div>
                                            <div className='row'>

                                                <div className='col'></div>
                                                <div className='col-10'>
                                                    <TableAdmin theadData={header} tbodyData={data} flag="delete_penelitian">

                                                    </TableAdmin>
                                                </div>

                                                <div className='col'></div>



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

export default ManagePenelitian;