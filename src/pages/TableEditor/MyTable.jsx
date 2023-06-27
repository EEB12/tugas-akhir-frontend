// import React, { useState } from 'react';
import { useTable } from 'react-table';
import EasyEdit, { Types } from "react-easy-edit";
import { useState, useEffect } from "react";
import { event } from 'jquery';
import axios from 'axios';
import Papa from 'papaparse';
import Pagination from '@mui/material/Pagination';
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
import './upload.css'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Navbar from '../Component/navbar';
import swal from 'sweetalert';

const mdTheme = createTheme();

const MyTable = () => {

    const [jsonData, setJsonData] = useState([{ name: 'John', age: 25 }, // data buat nampilin tabel jadi pake pagination
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 35 }]);
    const [data, setData] = useState([]) // data besar
    const [dataResult, setDataResult] = useState([]) // data buat nampung result data
    const [headers, setHeaders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const getHeadings = () => {
        return Object.keys(jsonData[0]);
    }
    const params = useParams();

    const updateData = (index, newName) => {
        setJsonData(prevData => {
            const newData = [...prevData]; // Create a copy of the state array
            newData[index] = { ...newData[index], result: newName }; // Create a new object with updated value
            return newData; // Return the updated array as the new state
        });
    };


    const handlePageChange = (event, page) => {
        setDataResult([...dataResult, ...jsonData]);
        setCurrentPage(page);

        // Perform data fetching or update based on the new page
        // For example, fetch data from API with the new page number
    };

    const save = (value, index) => {
        updateData(index, value)
        //    console.log(value,index)
        // console.log(value)
    };


    const convertToCSV = (data) => {
        const csv = Papa.unparse(data);
        return csv;
    };

    const buttonhandler = async () => {
        console.log(jsonData)
        console.log(currentPage)
        console.log(dataResult)
        const array2 = jsonData;
        const array1 = dataResult;
        const appendedArray = [...array1, ...array2];
        console.log(appendedArray);
        var token = localStorage.getItem('tokenAccess')
        if (currentPage == 1) {
            setDataResult(jsonData)
            const updatedJsonData = data.map(obj => {
                const matchingData = jsonData.find(d => d.userName === obj.userName);
                if (matchingData) {
                    return {
                        ...obj,
                        result: matchingData.result
                    };
                }
                return obj;
            });


            console.log("dah gabung sama result", updatedJsonData)
            setData(updatedJsonData); // Update the data state first
            const csvData = convertToCSV(updatedJsonData); // Convert the updated data to CSV
            const csvBlob = new Blob([csvData], { type: 'text/csv' });
            const formData = new FormData();
            formData.append('file', csvBlob, 'data_result_testing_auto.csv');
            formData.append('id_anotasi', 12);


            const response = await axios.post('http://103.157.96.170:5000/api/manual_anotate', formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
        }
        else {

            const updatedJsonData = data.map(obj => {
                const matchingData = appendedArray.find(d => d.userName === obj.userName);
                if (matchingData) {
                    return {
                        ...obj,
                        result: matchingData.result
                    };
                }
                return obj;
            });


            console.log("dah gabung sama result", updatedJsonData)
            setData(updatedJsonData); // Update the data state first
            const csvData = convertToCSV(updatedJsonData); // Convert the updated data to CSV
            const csvBlob = new Blob([csvData], { type: 'text/csv' });
            const formData = new FormData();
            formData.append('file', csvBlob, 'data_result_testing_auto.csv');
            formData.append('id_anotasi', 12);


            const response = await axios.post('http://103.157.96.170:5000/api/manual_anotate', formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

        }




        // // Handle the response
        // console.log(response);
    };




    const cancel = () => {

    };


    function Table({ theadData, tbodyData }) {
        // console.log(typeof (tbodyData))
        // console.log(typeof (theadData))
        return (
            <table className=' fl-table   '>


                <thead>
                    <tr>
                        {theadData?.map(heading => {

                            return <>
                                <th style={{ width: "30%" }} key={heading}>{heading}</th>
                            </>
                        })}

                    </tr>
                </thead>
                <tbody>
                    {tbodyData?.map((row, indexL) => {
                        return <tr key={indexL}>
                            {row[indexL]}
                            {theadData?.map((key, index) => {

                                return <td className='ml-5' key={row[key]}>

                                    <EasyEdit
                                        value={row[key]}
                                        type={Types.TEXT}
                                        onSave={(value) => save(value, indexL)}
                                        onCancel={cancel}
                                        saveButtonLabel="Save Edit"
                                        cancelButtonLabel="Cancel Edit"
                                        attributes={{ name: "awesome-input", id: 1 }}

                                    />
                                </td>
                            })}


                        </tr>;
                    })}
                </tbody>
            </table>


        );
    }

    // useEffect(() => {
    //     console.log("data berubah")
    // }, [jsonData]);

    function sortObjects(data) {
        return data?.map(obj => {
            const { result, ...rest } = obj;
            return { ...rest, result };
        });
    }


    useEffect(() => {
        console.log(jsonData)
    }, [jsonData]);

    useEffect(() => {
        console.log(currentPage, "berubah pagenya")
        var token = localStorage.getItem('tokenAccess')
        const dataRetriever = async (event) => {

            const response = await axios({
                method: "get",
                url: `http://103.157.96.170:5000/api/get-data-progress-pagination`,
                headers: {
                    "Authorization": `Bearer ${token}`,

                },
                params: {
                    page: currentPage,
                    per_page: 10,
                    id_anotasi: params.id,
                }
            }).then(data => data);

            setJsonData(sortObjects(response.data.data))
            console.log(response.data.data)
            // setDataResult([...dataResult, ...jsonData]);

        }
        dataRetriever()

    }, [currentPage]);



    useEffect(() => {
        console.log(dataResult)
    }, [dataResult]);
    useEffect(() => {
        var token = localStorage.getItem('tokenAccess')
        // console.log(token)
        const handleSubmit = async (event) => {



            const response = await axios({
                method: "get",
                url: `http://103.157.96.170:5000/api/get-data-progress-pagination`,
                headers: {
                    "Authorization": `Bearer ${token}`,

                },
                params: {
                    page: 1,
                    per_page: 10,
                    id_anotasi: params.id,
                }
            }).then(data => data);

            // setJsonData(response.data)

            // console.log(response.data.data)
            setHeaders(Object.keys(response?.data.data[0]).reverse())
            const preview1 = response?.data?.data.slice(0, 10)

            const responseBaseData = await axios({
                method: "get",
                url: `http://103.157.96.170:5000/api/get-data-progress/12`,
                headers: {
                    "Authorization": `Bearer ${token}`,

                }

            }).then(data => data);

            console.log("inibase data", responseBaseData.data)

            setJsonData(sortObjects(preview1))
            // setDataResult(sortObjects(preview1));
            setData(sortObjects(responseBaseData?.data))
            console.log(headers)
        };




        handleSubmit()

        // setDataResult([...dataResult, ...jsonData]);
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
                                                    Anotasi Manual
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
                                                                }} id="standard-basic" variant="standard" value="Sentiment Analysis Tweet" />

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
                                                                }} id="standard-basic" variant="standard" value="Manual" />


                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    DataSet
                                                                </Typography>
                                                                <Typography variant="subtitle1" sx={{
                                                                    color:'var(--neutral-500, #8F97A3);'
                                                                }} display="inline">
                                                                   Data dapat diedit dengan klik pada kolom result
                                                                </Typography>
                                                            </div>
                                                            <div className='row mt-2'>

                                                                <Table theadData={getHeadings()} tbodyData={jsonData}>


                                                                </Table>
                                                                {/* <button onClick={() => buttonhandler()}>upload</button> */}

                                                                <Pagination
                                                                    count={10} // Total number of pages
                                                                    page={currentPage} // Current active page
                                                                    onChange={handlePageChange} // Callback function for page change
                                                                />

                                                            </div>

                                                        </div>
                                                        <br></br>
                                                        <br></br>
                                                        <Button type="button" variant="contained" onClick={() => buttonhandler()} className="button-submit mt-3 w-25">Upload</Button>
                                                        <br></br>

                                                        <br></br>


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
};

export default MyTable;