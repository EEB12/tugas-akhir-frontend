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
import { useState, useEffect, } from "react";
import './upload.css'
import FileUpload from "react-mui-fileuploader";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Navbar from '../Component/navbar';
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

}));
const mdTheme = createTheme();




const Upload = () => {
    const [open, setOpen] = useState(true);
    const [filesToUpload, setFilesToUpload] = useState();
    const [data, setdata] = useState([]);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleFilesChange = (files) => {
        // Update chosen files
        setFilesToUpload(files[0])
    };

    const getHeadings = () => {
        return Object.keys(data[0]).reverse();
    }

    const uploadFiles = async () => {
        // Create a form and post it to server
        let formData = new FormData()


        formData.append("file", filesToUpload)
        formData.append("title", 'teslagicuy')
        formData.append("type_anotasi", 'auto')
        console.log(filesToUpload)
        console.log(formData.get('file'))
        var token = localStorage.getItem('tokenAccess')
        console.log(token)
        const response = await axios({
            method: "post",
            url: "http://localhost:5000/api/upload",
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }).then(data => data);;

        console.log(response.data.data)

        const preview = response.data.data.slice(0, 5)
        console.log("before", data.length)
        setdata(preview)
        console.log(data)
        console.log("AFter", data.length)
    }

    useEffect(() => {
        // Update the document title using the browser API

    }, [data]);
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Navbar/>

                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            width: '100%',

                            overflow: 'auto',
                        }}
                    >

                        <Toolbar />
                        <Container maxWidth="lg" sx={{
                            mr: 50,
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

                                            height: 900,
                                            width: 1400,
                                            pb: 10,
                                            flexDirection: 'column',
                                            backgroundColor: '#f5f5f5'
                                        }}

                                    >
                                        <div className='container-fluid'>
                                            <div className='row'>
                                                <div className='content col h-100  mb-5'>

                                                    <FileUpload
                                                        className='uploadbar'
                                                        multiFile={false}
                                                        onFilesChange={handleFilesChange}
                                                        maxUploadFiles={1}
                                                        allowedExtensions={['csv']}
                                                        onContextReady={(context) => { }}
                                                        title=""
                                                        PlaceholderImageDimension={{
                                                            xs: { width: 300, height: 128 },
                                                            sm: { width: 300, height: 128 },
                                                            md: { width: 300, height: 164 },
                                                            lg: { width: 300, height: 256 }
                                                        }}
                                                    />




                                                </div>

                                                <div className='col-5'>
                                                    <Box sx={{ minWidth: 120 }}>
                                                        <FormControl
                                                            sx={{



                                                                width: 300,

                                                            }}
                                                        >
                                                            <InputLabel id="demo-simple-select-label">Tipe Anotasi</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={age}
                                                                label="Tipe Anotasi"
                                                                onChange={handleChange}
                                                            >
                                                                <MenuItem value={"auto"}>Auto</MenuItem>
                                                                <MenuItem value={"manual"}>Manual</MenuItem>

                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    <Box
                                                        component="form"

                                                        noValidate
                                                        autoComplete="off"
                                                        sx={{
                                                            mt:2,
                                                            mb:3

                                                        }}
                                                    >
                                                        <TextField id="outlined-basic" label="Nama File" variant="outlined"
                                                            inputProps={{
                                                                style: {
                                                                    height: 50,

                                                                },
                                                            }}
                                                            sx={{

                                                                width: 300,

                                                            }} />

                                                    </Box>
                                                    <Button type="button" variant="contained" onClick={uploadFiles} className="ms-5 w-25">Upload</Button>
                                                </div>

                                            </div>



                                        </div>


                                        {data == 0 ? <></> : <>

                                            <Table theadData={getHeadings()} tbodyData={data}>

                                            </Table>


                                        </>}







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

export default Upload;
