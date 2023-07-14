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

const mdTheme = createTheme();

const DetailPenelitian = () => {
  const chartRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState();
  const [data, setData] = useState([]);
  const [dataBig, setDataBig] = useState([]);
  const [table, setTable] = useState([]);
  const [age, setAge] = React.useState("");
  const [namefile, setNamefile] = useState("");
  const [modelid, setModelid] = useState("");
  const [preview, setPreview] = React.useState([]);
  const [display, setDisplay] = useState("table");
  const [chartType, setChartType] = useState("pie");
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

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

  const handleSubmit = async () => {};

  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");
    console.log(token);

    const handleSubmit = async (event) => {
      handleToggle();
      const response = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${params.id}`,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data);

      if (response.data[0].status == "finished") {
        const response = await axios({
          method: "get",
          url: `https://backend-ta.ndne.id/api/list_penelitian_detail/${params.id}`,

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((data) => data);

        // console.log(response.data[0].model.detail)
        const preview1 = response?.data[1].slice(0, 5);

        setDataBig(response?.data[1]);
        // console.log(preview1)
        setPreview(preview1);
        console.log(response?.data[0]);
        setData(response?.data[0]);
      } else {
        // console.log(response.data)
        const preview1 = response?.data[1].slice(0, 5);

        setDataBig(response?.data[1]);
        // console.log(preview1)
        setPreview(preview1);
        console.log(response?.data[0]);
        setData(response?.data[0]);
      }

      handleClose();
    };

    handleSubmit();
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
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              width: "100%",
              height: "100%",
              overflowX: "initial",
            }}
          >
            <Toolbar />
            <div className="container mt-4">
              <div className="mb-4 d-flex justify-content-start">
                <a href="/list-penelitian">
                  <ArrowBackIcon className="mt-1 me-3" />
                </a>
                <h3>Detail Informasi Penelitian</h3>
              </div>
            </div>
            <div className="container bg-white my-4 rounded-5 p-4 h-100">
              <h4>{data.title}</h4>
              <p className="text-title">Status : {data.status}</p>
              <div className="border-line">
                <h5 className="mb-4">Detail Penelitian</h5>
                <div className="row">
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Tipe Anotasi</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <h6>: {data.type_anotasi}</h6>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Author</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <h6>: {data.author}</h6>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Anotator</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <h6>: {data.anotator}</h6>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Deskripsi</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <h6>: {data.desc}</h6>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Target</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    {data.target &&
                      data.target.map((item, index) => (
                        <h6 key={index}>: {item}</h6>
                      ))}
                  </div>
                </div>
              </div>
              <div className="border-line">
                <h4>Data Preview</h4>
                <div className="row mb-5">
                  {data.status === "progress" ? (
                    <></>
                  ) : (
                    <>
                      <section class="btn-group gap-5">
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="gfg2"
                          checked={display === "table"}
                          onChange={handleInputChange}
                        />
                        <label class="btn btn-outline-primary" for="gfg2">
                          Table
                        </label>

                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="gfg3"
                          checked={display === "chart"}
                          onChange={handleInputChange}
                        />
                        <label class="btn btn-outline-primary" for="gfg3">
                          Chart
                        </label>
                        <input
                          type="radio"
                          class="btn-check"
                          name="btnradio"
                          id="gfg4"
                          checked={display === "accuracy"}
                          onChange={handleInputChange}
                        />
                        <label class="btn btn-outline-primary" for="gfg4">
                          Accuracy
                        </label>
                      </section>
                    </>
                  )}
                </div>
                <div className="row mt-2  d-flex justify-content-center">
                  {display === "table" ? (
                    <>
                      <Table
                        theadData={getHeadings()}
                        tbodyData={preview}
                      ></Table>

                      <Pagination
                        count={20} // Total number of pages
                        page={currentPage} // Current active page
                        onChange={handlePageChange} // Callback function for page change
                      />
                    </>
                  ) : display === "chart" ? (
                    <>
                      <div>
                        <label htmlFor="chart-type">Chart Type:</label>
                        <select
                          id="chart-type"
                          onChange={handleChartTypeChange}
                          value={chartType}
                        >
                          <option value="pie">Pie Chart</option>
                          <option value="bar">Bar Chart</option>
                        </select>
                      </div>
                      <div className="pie-chart-container" style={{}}>
                        {chartType === "pie" ? (
                          <Pie
                            ref={chartRef}
                            data={{
                              labels: uniqueResults,
                              datasets: [
                                {
                                  data: dataValues,
                                  backgroundColor: [
                                    "#36A2EB",
                                    "#FF6384",
                                    "#FFCE56",
                                  ],
                                  hoverBackgroundColor: [
                                    "#36A2EB",
                                    "#FF6384",
                                    "#FFCE56",
                                  ],
                                },
                              ],
                            }}
                            options={chartOptions}
                          />
                        ) : (
                          <Bar
                            ref={chartRef}
                            data={{
                              labels: uniqueResults,
                              datasets: [
                                {
                                  data: dataValues,
                                  backgroundColor: [
                                    "#36A2EB",
                                    "#FF6384",
                                    "#FFCE56",
                                  ],
                                  hoverBackgroundColor: [
                                    "#36A2EB",
                                    "#FF6384",
                                    "#FFCE56",
                                  ],
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
                        )}
                      </div>
                      <br />
                      <br></br>
                      <div className="row justify-content-center mt-5">
                        <Button
                          className="w-50"
                          type="button"
                          variant="contained"
                          onClick={handleExport}
                        >
                          Export Chart
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-6">
                            <Typography
                              sx={{
                                fontWeight: 500,
                                m: 1,
                                fontSize: 30,
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
                                  fontSize: 20,
                                }}
                                variant="h5"
                                gutterBottom
                              >
                                F1-Score
                              </Typography>
                              <ProgressBar
                                value={data.model.detail.accuracy["f1-score"]}
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
                                  m: 1,
                                  fontSize: 30,
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
                                    fontSize: 20,
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  F1-Score
                                </Typography>
                                <ProgressBar
                                  value={
                                    data.model.detail["macro avg"]["f1-score"]
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
                                    fontSize: 20,
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Precision
                                </Typography>
                                <ProgressBar
                                  value={
                                    data.model.detail["macro avg"]["precision"]
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
                                    fontSize: 20,
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Recall
                                </Typography>
                                <ProgressBar
                                  value={
                                    data.model.detail["macro avg"]["recall"]
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
                                m: 1,
                                fontSize: 30,
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
                                  fontSize: 20,
                                }}
                                variant="h5"
                                gutterBottom
                              >
                                F1-Score
                              </Typography>
                              <ProgressBar
                                value={data.model.detail.negative["f1-score"]}
                                maxValue={1}
                                color="#0285F1"
                              />
                            </div>

                            <div>
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  m: 1,
                                  fontSize: 20,
                                }}
                                variant="h5"
                                gutterBottom
                              >
                                Precision
                              </Typography>
                              <ProgressBar
                                value={data.model.detail.negative["precision"]}
                                maxValue={1}
                                color="#0285F1"
                              />
                            </div>

                            <div>
                              <Typography
                                sx={{
                                  fontWeight: 400,
                                  m: 1,
                                  fontSize: 20,
                                }}
                                variant="h5"
                                gutterBottom
                              >
                                Recall
                              </Typography>
                              <ProgressBar
                                value={data.model.detail.negative["recall"]}
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
                                  m: 1,
                                  fontSize: 30,
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
                                    fontSize: 20,
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  F1-Score
                                </Typography>
                                <ProgressBar
                                  value={
                                    data.model.detail["positive"]["f1-score"]
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
                                    fontSize: 20,
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Precision
                                </Typography>
                                <ProgressBar
                                  value={
                                    data.model.detail["positive"]["precision"]
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
                                    fontSize: 20,
                                  }}
                                  variant="h5"
                                  gutterBottom
                                >
                                  Recall
                                </Typography>
                                <ProgressBar
                                  value={
                                    data.model.detail["positive"]["recall"]
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
};

export default DetailPenelitian;
