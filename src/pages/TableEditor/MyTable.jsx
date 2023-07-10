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
    const [options, setOptions] = useState([]);
    const [detail, setDetail] = useState([]);
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

        const array2 = jsonData;
        const array1 = dataResult;
        const appendedArray = [...array1, ...array2];
        console.log(appendedArray);
        console.log(data)
        var token = localStorage.getItem('tokenAccess')
        if (currentPage == 1) {
            setDataResult(jsonData)
            const updatedJsonData = data.map(obj => {
                const matchingData = jsonData.find(d => {
                    const firstKey = Object.keys(d)[0]; // Retrieve the first key dynamically
                    return d[firstKey] === obj[firstKey];
                  });
                  
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
            formData.append('file', csvBlob, 'data_result_testing_auto123.csv');
            formData.append('id_anotasi', params.id);

            try {
                const response = await axios.post('https://backend-ta.ndne.id/api/manual_anotate', formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                console.log("berhasil")
                swal("Berhasil", "Data berhasil diupdate", "success");
            } catch (error) {
                swal("Error", "Ada kesalahan pada server", "error");
            }

        }
        else {

            const updatedJsonData = data.map(obj => {
                const matchingData = jsonData.find(d => {
                    const firstKey = Object.keys(d)[0]; // Retrieve the first key dynamically
                    return d[firstKey] === obj[firstKey];
                  });
                if (matchingData) {
                    return {
                        ...obj,
                        result: matchingData.result
                    };
                }
                return obj;
            });



            setData(updatedJsonData); // Update the data state first
            const csvData = convertToCSV(updatedJsonData); // Convert the updated data to CSV
            const csvBlob = new Blob([csvData], { type: 'text/csv' });
            const formData = new FormData();
            formData.append('file', csvBlob, 'data_result_testing_auto.csv');
            formData.append('id_anotasi', 12);

            try {
                const response = await axios.post('https://backend-ta.ndne.id/api/manual_anotate', formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                swal("Berhasil", "Data berhasil diupdate", "success");
            }
            catch (error) {
                swal("Error", "Ada kesalahan pada proses anotasi", "error");
            }


        }




        // // Handle the response
        // console.log(response);
    };


    const updateStatus = async () => {
        const id = params.id
        let formData = new FormData()


        formData.append("id_anotasi", id)
        formData.append("status", "finished")



        var token = localStorage.getItem('tokenAccess')
        console.log(token)

        const response = await axios({
            method: "post",
            url: "https://backend-ta.ndne.id/api/update_status_anotate",
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }).then(data => data);



        // if (response.data.message == 'Data created successfully') {
        //     swal("Success", "Model Uploaded", "success", {
        //         buttons: false,
        //         timer: 2000,
        //     })
        //         .then((value) => {

        //             // window.location.href = "/list-job";
        //         });
        // } else {
        //     swal("Failed", "Model Upload Failed", "error");
        // }
    };

    const cancel = () => {

    };


    function Table({ theadData, tbodyData }) {
        // console.log(typeof (tbodyData))
        // console.log(typeof (theadData))
        return (
            <table className='fl-table    '>


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
                                        type="select"
                                        onSave={(value) => save(value, indexL)}
                                        options={options.map(options => ({ label: options, value: options }))}
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


    // data getter
    useEffect(() => {
        console.log(currentPage, "berubah pagenya")
        var token = localStorage.getItem('tokenAccess')
        const dataRetriever = async (event) => {

            const response = await axios({
                method: "get",
                url: `https://backend-ta.ndne.id/api/get-data-progress-pagination/${params.id}`,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",

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
                url: `https://backend-ta.ndne.id/api/get-data-progress-pagination/${params.id}`,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",

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
            console.log(preview1)
            const responseBaseData = await axios({
                method: "get",
                url: `https://backend-ta.ndne.id/api/get-data-progress/${params.id}`,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",

                }

            }).then(data => data);

            const responsedetail = await axios({
                method: "get",
                url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${params.id}`,
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",

                }

            }).then(data => data);
            setDetail(responsedetail.data[0])
            console.log(responsedetail.data[0])
            console.log(responseBaseData)
            console.log(sortObjects(responseBaseData?.data[0]))
          
            setOptions(response.data.target)
            setJsonData(sortObjects(preview1))
            // setDataResult(sortObjects(preview1));
            setData(sortObjects(responseBaseData?.data[0]))
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
                                                    Anotasi Manual
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

                                                                <TextField disabled value={detail.title} sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4
                                                                }} id="standard-basic" variant="standard" />

                                                                <Typography sx={{

                                                                    fontWeight: 600, m: 1, fontSize: 35
                                                                }} variant="h3" gutterBottom>
                                                                    Type anotasi
                                                                </Typography>

                                                                <TextField disabled sx={{
                                                                    marginLeft: 3,
                                                                    marginTop: 3,
                                                                    width: '95%',
                                                                    marginBottom: 4
                                                                }} id="standard-basic" variant="standard" value={detail.type_anotasi} />


                                                                <div>
                                                                    <Typography sx={{ fontWeight: 600, m: 1, fontSize: 35 }} variant="h3" gutterBottom>
                                                                        Instruksi Anotasi Data Manual
                                                                    </Typography>

                                                                    <Typography variant="subtitle1"  display="inline">
                                                                        <ol>
                                                                            <li>
                                                                                Memilih dropdown pada kolom result
                                                                            </li>
                                                                            <li>
                                                                                Melakukan save edit pada row untuk konfirmasi perubahan pada row tersebut
                                                                            </li>
                                                                            <li>
                                                                                Klik Update data untuk menyimpan perubahan pada tabel
                                                                            </li>
                                                                            <li>
                                                                                Klik Update status to finish untuk melakukan update job dari progress menjadi finish
                                                                            </li>
                                                                        </ol>
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <div className='row mt-2'>

                                                                <Table theadData={getHeadings()} tbodyData={jsonData}>


                                                                </Table>
                                                                {/* <button onClick={() => buttonhandler()}>upload</button> */}

                                                                <Pagination
                                                                    count={40} // Total number of pages
                                                                    page={currentPage} // Current active page
                                                                    onChange={handlePageChange} // Callback function for page change
                                                                />

                                                            </div>

                                                        </div>
                                                        <br></br>
                                                        <br></br>
                                                        <Button type="button" variant="contained" onClick={() => updateStatus()} className="button-submit mt-3 w-25">Update Status to Finish</Button>
                                                        <Button type="button" variant="contained" onClick={() => buttonhandler()} className="button-submit mt-3 w-25">Update Data</Button>
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