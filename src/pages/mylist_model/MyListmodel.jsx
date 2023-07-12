import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./upload.css";
import FileUpload from "react-mui-fileuploader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Navbar from "../Component/navbar";
import swal from "sweetalert";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import csvDownload from "json-to-csv-export";
import Modal from "@mui/material/Modal";
const mdTheme = createTheme();

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const MyListmodel = () => {
  const [data, setData] = useState([]);
  const [id, setID] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = React.useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [desc, setDesc] = useState("");
  const download = async (id) => {
    var token = localStorage.getItem("tokenAccess");
    let formData = new FormData();

    formData.append("id_anotasi", id);
    const response = await axios({
      method: "post",
      url: "https://backend-ta.ndne.id/api/get-data",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((data) => data);

    var headers = Object.keys(response.data[0]);
    console.log(headers);
    const dataToConvert = {
      data: response.data,
      filename: "test download",
      delimiter: ",",
      headers: headers,
    };
    csvDownload(dataToConvert);
  };

  const openModel = (title, desc, id) => {
    setModelTitle(title);
    setDesc(desc);
    setIsModelOpen(id);
    setIsModelOpen(true);
  };
  const submitModelEdit = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("tokenAccess");
    // Perform any necessary actions with the form data
    let formData = new FormData();

    formData.append("title", modelTitle);
    formData.append("desc", desc);

    const response = await axios({
      method: "post",
      url: `https://backend-ta.ndne.id/api/update_model/${id}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((data) => data);
    // Close the modal and reset the form fields
    setIsModelOpen(false);

    setRole("");
    window.location.reload();
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setDesc("");
    setModelTitle("");
  };
  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");

    console.log(token);

    var role = localStorage.getItem("role");
    setRole(role);
    const getModel = async (event) => {
      const response = await axios({
        method: "get",
        url: "https://backend-ta.ndne.id/api/my_list_model",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data);

      console.log(response.data);
      setData(response.data);
    };

    getModel();
  }, []);

  const handleDownload = (dataset) => {
    const link = document.createElement("a");
    link.href = dataset;
    link.download = dataset.substring(dataset.lastIndexOf("/") + 1);
    link.click();
  };

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
            <Container
              maxWidth="100vh"
              sx={{
                mr: 80,
                p: 2,
                display: "flex",

                alignItems: "center",
              }}
            >
              <Grid container spacing={1}>
                {/* Chart */}
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      display: "flex",

                      height: "100vh",
                      width: "80%",
                      pb: 10,
                      flexDirection: "column",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <div className="container-fluid">
                      <div className="row mb-5">
                        <Typography
                          sx={{
                            color: "#0285F1",
                            fontWeight: 600,
                            m: 1,
                            fontSize: 60,
                          }}
                          variant="h3"
                          gutterBottom
                        >
                          My List Model
                        </Typography>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          {data.map((item, index) => (
                            <>
                              <div className="row mb-4">
                                <Card
                                  sx={{
                                    maxWidth: 1500,
                                    Height: 200,
                                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                                    borderRadius: "10px",
                                  }}
                                  variant="outlined"
                                >
                                  <CardContent>
                                    <div className="container-fluid">
                                      <div className="row">
                                        <div className="col-6 mt-3">
                                          <Typography component="div">
                                            <span className="fw-bold me-1">
                                              {" "}
                                              Judul
                                              Model&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </span>{" "}
                                            :&nbsp;{item.title}
                                          </Typography>
                                          <Typography component="div">
                                            <span className="fw-bold me-1">
                                              {" "}
                                              Deskripsi
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </span>
                                            :&nbsp;{item.desc}
                                          </Typography>

                                          <Typography component="div">
                                            <span className="fw-bold me-1">
                                              Model Program&nbsp;&nbsp;&nbsp;{" "}
                                            </span>
                                            :&nbsp;tes model
                                          </Typography>
                                          <Typography component="div">
                                            <span className="fw-bold me-1">
                                              {" "}
                                              Vectorizer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                            </span>{" "}
                                            :&nbsp;tes vectorizer
                                          </Typography>
                                        </div>

                                        <div className="col-6 d-flex justify-content-end mt-4">
                                          {/* <button    onClick={() => download(item.id_anotasi)} type="button" class="btn btn-light  interactive-button "><Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16}}>Download .pickle</Box></button>
                                                                                    <Button href={`/detail-penelitian/`+item.id_anotasi} type="button" class="btn btn-light  interactive-button detail "><Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16,paddingTop:2 }}>Detail </Box></Button> */}
                                          <button
                                            type="button"
                                            class="  interactive-button "
                                          >
                                            <Box
                                              sx={{
                                                color: "#FFFFFF",
                                                fontWeight: 600,
                                                fontSize: 16,
                                                paddingLeft: 2,
                                                paddingRight: 2,
                                              }}
                                            >
                                              Download .pickle
                                            </Box>
                                          </button>
                                          {/* <button href={`#`} type="button" class=" interactive-button detail ms-4"><Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}><a className='detail' href={`/detail-penelitian/` + item.id_anotasi}>Detail</a> </Box></button> */}

                                          <button
                                            onClick={() =>
                                              openModel(
                                                item.title,
                                                item.desc,
                                                item.id
                                              )
                                            }
                                            href={`#`}
                                            type="button"
                                            class=" interactive-button detail ms-4"
                                          >
                                            <Box
                                              sx={{
                                                color: "#FFFFFF",
                                                fontWeight: 600,
                                                fontSize: 16,
                                              }}
                                            >
                                              <a className="detail" href="#">
                                                Edit
                                              </a>{" "}
                                            </Box>
                                          </button>
                                          {/* {role == '"peneliti"' ?<Button href={`/list-anotator/`+item.id_anotasi}  type="button" class="btn btn-light  interactive-button detail ">
                                                                                        <Box sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}>Pilih Anotator </Box></Button>:<></>} */}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
              <Modal
                open={isModelOpen}
                onClose={() => setIsModelOpen(false)}
                aria-labelledby="modal-title"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 700,
                    modal: 500,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  {}
                  <Typography id="modal-title" variant="h5" component="h2">
                    Edit Model
                  </Typography>
                  <Divider sx={{ bgcolor: "secondary.light" }} />

                  {/* Form */}

                  <div>
                    <TextField
                      sx={{
                        width: "95%",
                        marginBottom: 4,
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                        marginTop: 2,
                      }}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        style: {
                          marginTop: 5,
                          fontSize: "20px", // Adjust the font size as needed
                        },
                      }}
                      onChange={(e) => setModelTitle(e.target.value)}
                      id="standard-basic"
                      value={modelTitle}
                      label="Title"
                      variant="standard"
                    />
                  </div>

                  <div>
                    <TextField
                      sx={{
                        width: "95%",
                        marginBottom: 4,
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#000000",
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        style: {
                          marginTop: 5,
                          fontSize: "20px", // Adjust the font size as needed
                        },
                      }}
                      onChange={(e) => setDesc(e.target.value)}
                      value={desc}
                      id="standard-basic"
                      label="Deskripsi"
                      variant="standard"
                    />
                  </div>

                  <div className="row mt-3">
                    <Button
                      className="w-25 ms-1"
                      type="button"
                      variant="contained"
                      onClick={submitModelEdit}
                    >
                      Save
                    </Button>

                    <Button
                      className="w-25 ms-4"
                      color="error"
                      type="button"
                      variant="contained"
                      onClick={handleCloseModel}
                    >
                      Close
                    </Button>
                  </div>
                </Box>
              </Modal>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MyListmodel;
