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
import swal from "sweetalert";
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
import csvDownload from "json-to-csv-export";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const mdTheme = createTheme();

const DetailPenelitian = () => {
  const chartRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState();
  const [data, setData] = useState([]);
  const [dataBig, setDataBig] = useState([]);

  const [namefile, setNamefile] = useState("");
  const [modelid, setModelid] = useState("");
  const [preview, setPreview] = React.useState([]);
  const [display, setDisplay] = useState("table");
  const [chartType, setChartType] = useState("pie");
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalDataFill, setTotalDataFill] = useState(0);
  const [totalDataRecord, setTotalRecord] = useState(0);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const XLSX = require("xlsx");
  function downloadExcelFile(data, filename) {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  
    // Membersihkan setelah download
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
  
  const download = async (id, name) => {
    var token = localStorage.getItem("tokenAccess");
    // let formData = new FormData()
    // formData.append("id_anotasi", id)
    console.log(dataBig);
    console.log(name);
    try {
      // Assuming dataBig is available with your actual data
      const dataDownload = dataBig;
  
      // Calculate headers for the Excel file
      const headers = Object.keys(dataDownload[0]);
  
      // Prepare the worksheet
      const worksheet = XLSX.utils.json_to_sheet(dataDownload, {
        header: headers,
      });
  
      // Prepare the workbook and add the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Convert the workbook to a buffer
      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  
      // Generate the filename (optional, you can customize it as needed)
      const filename = `${name}.xlsx`;
  
      // Trigger the download
      downloadExcelFile(buffer, filename);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  const updateStatus = async (id, name) => {
    var token = localStorage.getItem("tokenAccess");
    let formData = new FormData();
    formData.append("id_anotasi", params.id);
    formData.append("status", status);
    handleToggle();
    try {
      const response = await axios({
        method: "post",
        url: `https://backend-ta.ndne.id/api/update_status_anotate`,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.data.message === "Research status updated successfully") {
        swal("Success", "Data Penelitian berhasil diupdate", "success", {
          buttons: false,
          timer: 2000,
        }).then(() => {
          handleClose();
          window.location.reload();
        });
      } else {
        const errorMessage = response.error.response.data.message;
        swal("Failed", errorMessage, "error");
        handleClose();
      }
    } catch (error) {
      const errorMessage = error.response.data.message;
      swal("Failed", errorMessage, "error");
      handleClose();
    }
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
    if (preview?.length > 0) {
      return Object.keys(preview[0]).reverse();
    }
    return [];
  };

  const params = useParams();
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
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

        const preview1 = response?.data[1].slice(0, 5);
        console.log(response.data);
        setDataBig(response?.data[1]);
        // console.log(preview1)
        setPreview(preview1);
        // console.log(response?.data[0].model.detail.Accuracy);
        setData(response?.data[0]);
        console.log(typeof response.data[0].status);
        setStatus(response.data[0].status.toUpperCase());
      } else {
        // console.log(response.data)
        const preview1 = response?.data[1].slice(0, 5);

        setDataBig(response?.data[1]);
        // console.log(preview1)
        setPreview(preview1);
        console.log(response?.data[0]);
        console.log(response.data[0].status);
        setStatus(response.data[0].status.toUpperCase());
        setData(response?.data[0]);
      }

      const responsePagination = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get-data-progress-pagination/${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: currentPage,
          per_page: 5,
          id_anotasi: params.id,
        },
      }).then((data) => data);
      console.log("tes", responsePagination.data.total_pages);
      setTotalPage(responsePagination.data.total_pages);
      setTotalDataFill(responsePagination.data.data_fill);
      setTotalRecord(responsePagination.data.total_records);
      console.log(responsePagination.data);
      const dataPagination = responsePagination?.data?.data;
      setPreview(dataPagination);
      handleClose();
    };

    handleSubmit();
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
  }, [preview]);

  useEffect(() => {
    console.log(currentPage, "berubah pagenya");
    var token = localStorage.getItem("tokenAccess");
    const dataRetriever = async (event) => {
      const response = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get-data-progress-pagination/${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: currentPage,
          per_page: 5,
          id_anotasi: params.id,
        },
      }).then((data) => data);

      setPreview(response?.data.data);
      console.log(response.data.data);
      // setDataResult([...dataResult, ...jsonData]);
    };
    dataRetriever();
  }, [currentPage]);
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
  var uniqueResults = [...new Set(dataBig.map((review) => review.result))];
  uniqueResults = uniqueResults.filter((result) => result !== "-");
  const dataValues = uniqueResults.map(
    (result) => dataBig.filter((review) => review.result === result).length
  );
  console.log(uniqueResults);
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
                <a href="/list-penelitian">
                  <ArrowBackIcon className="mt-1 me-3" />
                </a>
                <h3>Detail Informasi Penelitian</h3>
              </div>
            </div>
            <div className="container bg-white my-4 rounded-5 p-4">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-auto">
                  <h4>{data.title}</h4>
                  <p className="text-title">Status : {data.status}</p>
                </div>

                <div className="col-2">
                  <a href={`/admin/editUser/${data.id_anotasi}`}>
                    <button type="button" class="btn btn-primary w-75">
                      Edit
                    </button>
                  </a>
                </div>
              </div>

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
                      <select
                        className="form-select ms-3 menu-data"
                        value={display}
                        onChange={handleSelectChange}
                      >
                        <option value="table">Table</option>
                        <option value="chart">Chart</option>
                        {data.type_anotasi == "manual" ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <option value="accuracy">Accuracy</option>
                          </>
                        )}
                      </select>
                    </>
                  )}
                </div>
                <div className="row mt-2  d-flex justify-content-center">
                  {display === "table" ? (
                    <>
                      <div className="d-flex flex-column mb-3">
                        <div className="pb-4">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className="mb-3"
                            value={status}
                            sx={{
                              height: "38px",
                              width: 200,
                            }}
                            onChange={handleStatus}
                          >
                            <MenuItem value={"PROGRESS"}>Progress</MenuItem>
                            <MenuItem value={"FINISHED"}>Finished</MenuItem>
                          </Select>
                          <button
                            onClick={() => updateStatus()}
                            type="button"
                            class="btn btn-primary ms-5 "
                          >
                            Update Status
                          </button>
                        </div>

                        <button
                          onClick={() => download(data.id_anotasi, data.title)}
                          type="button"
                          class="btn btn-primary w-25"
                        >
                          Download File Excel
                        </button>
                        <div className="mt-4 d-flex justify-content-start gap-2">
                          <h6 className="text-title">
                            Data Terisi : {totalDataFill}/{totalDataRecord}
                          </h6>
                        </div>
                      </div>

                      <Table
                        theadData={getHeadings()}
                        tbodyData={preview}
                      ></Table>

                      <Pagination
                        count={totalPage} // Total number of pages
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
                      <div className="container-fluid border-line">
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
                              Akurasi Model
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
                                Accuracy Score
                              </Typography>
                              <ProgressBar
                                value={data?.model?.detail?.Accuracy}
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
                                F1-Score
                              </Typography>
                              <ProgressBar
                                value={data?.model?.detail["F-score"]}
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
                                value={data?.model?.detail["Precision"]}
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
                                value={data?.model?.detail["Recall"]}
                                maxValue={1}
                                color="#0285F1"
                              />
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
