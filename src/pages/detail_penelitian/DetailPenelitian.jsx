import React, { useRef } from 'react';
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
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from "react";
import './upload.css'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Navbar from '../Component/navbar';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import html2canvas from 'html2canvas';

const mdTheme = createTheme();





const DetailPenelitian = () => {
    const chartRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState();
    const [data, setData] = useState([]);
    const [dataBig, setDataBig] = useState([]);
    const [table, setTable] = useState([]);
    const [age, setAge] = React.useState('');
    const [namefile, setNamefile] = useState('')
    const [modelid, setModelid] = useState('')
    const [preview, setPreview] = React.useState([]);
    const [display, setDisplay] = useState('table');
    const [chartType, setChartType] = useState('pie');
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleChangeTitle = (event) => {
        setNamefile(event.target.value);
    };

    const handleInputChange = (event) => {
        if (event.target.id === 'gfg2') {
            setDisplay('table');
        } else if (event.target.id === 'gfg3') {
            setDisplay('chart');
        }
    };

    const handleExport = () => {
        const link = document.createElement("a")
        link.download = 'chart.png'
        link.href = chartRef.current.toBase64Image()
        link.click()
    };
    const handlename = (event) => {
        setNamefile(event.target.value)
    }
    const getHeadings = () => {
        if (preview.length > 0) {
            return Object.keys(preview[0]).reverse();
        }
        return [];
    }

    const params = useParams();

    const handleSubmit = async () => {


    };

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
            const preview1 = response?.data[1].slice(0, 5)

            setDataBig(response?.data[1])
            // console.log(preview1)
            setPreview(preview1)
            console.log(response?.data[0])
            setData(response?.data[0])
            handleClose()
        };



        handleSubmit()

    }, []);




    useEffect(() => {
        // Update the document title using the browser API

    }, [preview]);

    useEffect(() => {
        // Update the document title using the browser API

    }, [display]);


    useEffect(() => {
        console.log(data)

    }, [data]);

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
        legend: { display: false },

    };
    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };
    const uniqueResults = [...new Set(dataBig.map((review) => review.result))];
    const dataValues = uniqueResults.map((result) =>
        dataBig.filter((review) => review.result === result).length
    );
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

                            <Grid container xs={12} md={12} lg={12} spacing={1}>
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
                                                    Detail Penelitian
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

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 5,

                                                                    width: '95%',
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }


                                                                }}
                                                                    inputProps={{
                                                                        style: {
                                                                            marginTop: 5,
                                                                            fontSize: '20px', // Adjust the font size as needed
                                                                        },
                                                                    }}
                                                                    onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.title} />

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Type anotasi
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    height: '50px',
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} inputProps={{
                                                                    style: {
                                                                        fontSize: '20px', // Adjust the font size as needed
                                                                    },
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.type_anotasi} />


                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Status
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} inputProps={{
                                                                    style: {
                                                                        fontSize: '20px', // Adjust the font size as needed
                                                                    },
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.status} />



                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Anotator
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4,
                                                                    "& .MuiInputBase-input.Mui-disabled": {
                                                                        WebkitTextFillColor: "#000000",
                                                                    }
                                                                }} inputProps={{
                                                                    style: {
                                                                        fontSize: '20px', // Adjust the font size as needed
                                                                    },
                                                                }} onChange={handleChangeTitle} id="standard-basic" variant="standard" value={data.anotator} />

                                                                <section class="btn-group">

                                                                    <input type="radio"
                                                                        class="btn-check"
                                                                        name="btnradio"
                                                                        id="gfg2"
                                                                        checked={display === 'table'}
                                                                        onChange={handleInputChange} />
                                                                    <label class="btn btn-outline-primary"
                                                                        for="gfg2">
                                                                        Table
                                                                    </label>

                                                                    <input type="radio"
                                                                        class="btn-check"
                                                                        name="btnradio"
                                                                        id="gfg3"
                                                                        checked={display === 'chart'}
                                                                        onChange={handleInputChange} />
                                                                    <label class="btn btn-outline-primary"
                                                                        for="gfg3">
                                                                        Chart
                                                                    </label>
                                                                </section>

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Data Preview
                                                                </Typography>
                                                            </div>
                                                            <div className='row mt-2' >


                                                                {display === 'table' ? <>

                                                                    <Table theadData={getHeadings()} tbodyData={preview}>

                                                                    </Table>

                                                                    {console.log(preview.length, "true")}

                                                                </> : <>
                                                                    <div>
                                                                        <label htmlFor="chart-type">Chart Type:</label>
                                                                        <select id="chart-type" onChange={handleChartTypeChange} value={chartType} >
                                                                            <option value="pie">Pie Chart</option>
                                                                            <option value="bar">Bar Chart</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className='pie-chart-container' style={{}}>

                                                                        {chartType === 'pie' ? <Pie
                                                                            ref={chartRef}
                                                                            data={{
                                                                                labels: uniqueResults,
                                                                                datasets: [
                                                                                    {
                                                                                        data: dataValues,

                                                                                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                                                        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                                                    },
                                                                                ],

                                                                            }}
                                                                            options={chartOptions}
                                                                        /> :
                                                                            <Bar
                                                                                ref={chartRef}
                                                                                data={{
                                                                                    labels: uniqueResults,
                                                                                    datasets: [
                                                                                        {   
                                                                                           
                                                                                            data: dataValues,
                                                                                            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                                                            hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                                                        },
                                                                                        
                                                                                    ],
                                                                                }}
                                                                                options={{
                                                                                    ...chartOptions,
                                                                                    plugins: {
                                                                                        legend: {
                                                                                            display: false,
                                                                                        },
                                                                                    },
                                                                                }}
                                                                            />

                                                                        }




                                                                        <button onClick={handleExport}>Export Chart</button>
                                                                    </div>


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

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default DetailPenelitian;
