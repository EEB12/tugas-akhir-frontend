import React, { useRef } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Table from "../Component/Table";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import "./upload.css";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Navbar from "../Component/navbar";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import html2canvas from "html2canvas";
import Pagination from "@mui/material/Pagination";
import ProgressBar from "../Component/ProgressBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import csvDownload from 'json-to-csv-export'
const mdTheme = createTheme();





const DetailModel = () => {
    const chartRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [filesToUpload, setFilesToUpload] = useState();
    const [data, setData] = useState([]);
    const [dataBig, setDataBig] = useState([]);

    const [namefile, setNamefile] = useState("");
    const [modelid, setModelid] = useState("");
    const [preview, setPreview] = React.useState([]);
    const [display, setDisplay] = useState("other");
    const [chartType, setChartType] = useState("pie");
    const [currentPage, setCurrentPage] = useState(1);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };


    const download = async (id, name) => {
        var token = localStorage.getItem('tokenAccess')
        // let formData = new FormData()
        // formData.append("id_anotasi", id)
        console.log(dataBig)
        console.log(name)
        const dataDownload = dataBig
        var headers = Object.keys(dataDownload[0])
        const dataToConvert = {
            data: dataDownload,
            filename: `${name}`,
            delimiter: ',',
            headers: headers
        }
        csvDownload(dataToConvert)
    }
    const handleChangeTitle = (event) => {
        setNamefile(event.target.value);
    };
    const handlePageChange = (event, page) => {
        setCurrentPage(page);

        // Perform data fetching or update based on the new page
        // For example, fetch data from API with the new page number
    };
    const handleInputChange = (event) => {
        if (event.target.id === "gfg2") {
            setDisplay("table");
        } else if (event.target.id === "gfg3") {
            setDisplay("chart");
        } else if (event.target.id === "gfg4") {
            setDisplay("accuracy");
        }
    };

    const handleSelectChange = (event) => {
        setDisplay(event.target.value);
    };

    const handleExport = () => {
        const link = document.createElement("a");
        link.download = "chart.png";
        link.href = chartRef.current.toBase64Image();
        link.click();
    };
    const handlename = (event) => {
        setNamefile(event.target.value);
    };
    const getHeadings = () => {
        if (preview.length > 0) {
            return Object.keys(preview[0]).reverse();
        }
        return [];
    };

    const params = useParams();

    const handleSubmit = async () => { };

    useEffect(() => {
        var token = localStorage.getItem("tokenAccess");

        console.log(token);

        var role = localStorage.getItem("role");

        const getModel = async (event) => {
            const response = await axios({
                method: "get",
                url: `https://backend-ta.ndne.id/api/get_detail_model/${params.id}`,

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((data) => data);
            // console.log(int(params.id))
            const filteredData = response.data.filter(item => parseInt(params.id));
            console.log(filteredData);
            setData(filteredData);
        };

        getModel();
    }, []);

    useEffect(() => {
        // Update the document title using the browser API
    }, [preview]);


    useEffect(() => {
        // Update the document title using the browser API
    }, [display]);

    useEffect(() => {
        console.log(data);
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
    const dataValues = uniqueResults.map(
        (result) => dataBig.filter((review) => review.result === result).length
    );
    const progressPercentage = (0.86 / 1) * 100;

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: "flex" }}>
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
                        <div className="container mt-4">
                            <div className="mb-4 d-flex justify-content-start">
                                <a href="/list-model">
                                    <ArrowBackIcon className="mt-1 me-3" />
                                </a>
                                <h3>Detail Informasi Model</h3>
                            </div>
                        </div>
                        <div className="container bg-white my-4 rounded-5 p-4">
                           
                                <div className="row mb-4 d-flex justify-content-between align-items-center">
                                    <div className="col-auto">
                                        <h4>{data[0]?.title}</h4>
                                     
                                    </div>

                                    <div className="col-2">
                                        <a href={`/admin/edit-model/${data[0]?.id}`}><button type="button" class="btn btn-primary w-75" >Edit</button></a>
                                    </div>

                                </div>
                           
                            <div className="border-line">
                                <h5 className="mb-4">Detail Penelitian</h5>
                                <div className="row mb-4">

                                    <div className="col-4 col-md-2">
                                        <h6 className="fw-normal grey">Deskripsi</h6>
                                    </div>
                                    <div className="col-8 col-md-10">
                                        <h6>: {data[0]?.desc}</h6>
                                    </div>

                                </div>
                            


                                <div className="row mt-2  d-flex justify-content-center">
                                    {display === "table" ? (
                                        <>

                                        </>
                                    ) : display === "chart" ? (
                                        <>

                                        </>
                                    ) : (
                                        <>
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 500,
                                                               
                                                                fontSize: 20,
                                                            }}
                                                            variant="h3"
                                                            gutterBottom
                                                        >
                                                            Accuracy
                                                        </Typography>
                                                        <div>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 400,
                                                                    m: 1,
                                                                    fontSize: 15,
                                                                }}
                                                                variant="h5"
                                                                gutterBottom
                                                            >
                                                                F1-Score
                                                            </Typography>
                                                            <ProgressBar
                                                                value={data[0]?.detail.accuracy["f1-score"]}
                                                                maxValue={1}
                                                                color="#0285F1"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 500,
                                                                   
                                                                    fontSize: 20,
                                                                }}
                                                                variant="h3"
                                                                gutterBottom
                                                            >
                                                                Macro Avg
                                                            </Typography>
                                                            <div>
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 400,
                                                                        m: 1,
                                                                        fontSize: 15,
                                                                    }}
                                                                    variant="h5"
                                                                    gutterBottom
                                                                >
                                                                    F1-Score
                                                                </Typography>
                                                                <ProgressBar
                                                                    value={
                                                                        data[0]?.detail["macro avg"]["f1-score"]
                                                                    }
                                                                    maxValue={1}
                                                                    color="#0285F1"
                                                                />
                                                            </div>

                                                            <div>
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 400,
                                                                        m: 1,
                                                                        fontSize: 15,
                                                                    }}
                                                                    variant="h5"
                                                                    gutterBottom
                                                                >
                                                                    Precision
                                                                </Typography>
                                                                <ProgressBar
                                                                    value={
                                                                        data[0]?.detail["macro avg"]["precision"]
                                                                    }
                                                                    maxValue={1}
                                                                    color="#0285F1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 400,
                                                                        m: 1,
                                                                        fontSize: 15,
                                                                    }}
                                                                    variant="h5"
                                                                    gutterBottom
                                                                >
                                                                    Recall
                                                                </Typography>
                                                                <ProgressBar
                                                                    value={
                                                                        data[0]?.detail["macro avg"]["recall"]
                                                                    }
                                                                    maxValue={1}
                                                                    color="#0285F1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mt-5">
                                                    <div className="col-6">
                                                        <Typography
                                                            sx={{
                                                                fontWeight: 500,
                                                                
                                                                fontSize: 20,
                                                            }}
                                                            variant="h3"
                                                            gutterBottom
                                                        >
                                                            Negative
                                                        </Typography>
                                                        <div>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 400,
                                                                    m: 1,
                                                                    fontSize: 15,
                                                                }}
                                                                variant="h5"
                                                                gutterBottom
                                                            >
                                                                F1-Score
                                                            </Typography>
                                                            <ProgressBar
                                                                value={data[0]?.detail.negative["f1-score"]}
                                                                maxValue={1}
                                                                color="#0285F1"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 400,
                                                                    m: 1,
                                                                    fontSize: 15,
                                                                }}
                                                                variant="h5"
                                                                gutterBottom
                                                            >
                                                                Precision
                                                            </Typography>
                                                            <ProgressBar
                                                                value={data[0]?.detail.negative["precision"]}
                                                                maxValue={1}
                                                                color="#0285F1"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 400,
                                                                    m: 1,
                                                                    fontSize: 15,
                                                                }}
                                                                variant="h5"
                                                                gutterBottom
                                                            >
                                                                Recall
                                                            </Typography>
                                                            <ProgressBar
                                                                value={data[0]?.detail.negative["recall"]}
                                                                maxValue={1}
                                                                color="#0285F1"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div>
                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 500,
                                                                  
                                                                    fontSize: 20,
                                                                }}
                                                                variant="h3"
                                                                gutterBottom
                                                            >
                                                                Positive
                                                            </Typography>
                                                            <div>
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 400,
                                                                        m: 1,
                                                                        fontSize: 15,
                                                                    }}
                                                                    variant="h5"
                                                                    gutterBottom
                                                                >
                                                                    F1-Score
                                                                </Typography>
                                                                <ProgressBar
                                                                    value={
                                                                        data[0]?.detail["positive"]["f1-score"]
                                                                    }
                                                                    maxValue={1}
                                                                    color="#0285F1"
                                                                />
                                                            </div>

                                                            <div>
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 400,
                                                                        m: 1,
                                                                        fontSize: 15,
                                                                    }}
                                                                    variant="h5"
                                                                    gutterBottom
                                                                >
                                                                    Precision
                                                                </Typography>
                                                                <ProgressBar
                                                                    value={
                                                                        data[0]?.detail["positive"]["precision"]
                                                                    }
                                                                    maxValue={1}
                                                                    color="#0285F1"
                                                                />
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    sx={{
                                                                        fontWeight: 400,
                                                                        m: 1,
                                                                        fontSize: 15,
                                                                    }}
                                                                    variant="h5"
                                                                    gutterBottom
                                                                >
                                                                    Recall
                                                                </Typography>
                                                                <ProgressBar
                                                                    value={
                                                                        data[0]?.detail["positive"]["recall"]
                                                                    }
                                                                    maxValue={1}
                                                                    color="#0285F1"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* <Button type="button" variant="contained" onClick={handleSubmit} className="ms-2 mt-3 w-25">Upload</Button> */}
                        </div>
                    </Box>
                </Box>
            </ThemeProvider>

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default DetailModel;
