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
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Table from "../Component/Table";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect, useParams } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
const mdTheme = createTheme();

const NewModel = () => {
  const [open, setOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState();
  const [data, setdata] = useState([]);

  const [age, setAge] = React.useState("");

  const [descfile, setDescfile] = useState("");
  const [accfile, setAccfile] = useState("");
  const [namefile, setNamefile] = useState("");
  const [vectorizer, setVectorizer] = useState();

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
  const handleChangedesc = (event) => {
    setDescfile(event.target.value);
  };

  const handleChangeAcc = (e) => {
    setAccfile(e.target.files[0]);
  };
  const handleFilesChange = (e) => {
    // Update chosen files
    console.log(e.target.files[0]);
    setFilesToUpload(e.target.files[0]);
  };
  const handleVectorizerChange = (e) => {
    // Update chosen files
    console.log(e.target.files[0]);
    setVectorizer(e.target.files[0]);
  };

  const handlename = (event) => {
    setNamefile(event.target.value);
  };
  const getHeadings = () => {
    return Object.keys(data[0]).reverse();
  };

  // const uploadFiles = async () => {
  //     // Create a form and post it to server
  //     let formData = new FormData()
  //     handleToggle()
  //     formData.append("file", filesToUpload)
  //     formData.append("title", namefile)
  //     formData.append("type_anotasi", age)
  //     // console.log(filesToUpload)
  //     // console.log(formData.get('file'))
  //     var token = localStorage.getItem('tokenAccess')
  //     console.log(token)
  //     const response = await axios({
  //         method: "post",
  //         url: "http://localhost:5000/api/upload_penelitian",
  //         data: formData,
  //         headers: {
  //             "Authorization": `Bearer ${token}`,
  //         },
  //     }).then(data => data);;

  //     console.log(response.data.data)

  //     const preview = response.data.data.slice(0, 5)

  //     setdata(preview)
  //     handleClose()
  //     if (response.data.message == 'Data created successfully') {
  //         swal("Success", "Data Penelitian berhasil diupload", "success", {
  //             buttons: false,
  //             timer: 2000,
  //         })
  //             .then((value) => {

  //             });
  //     } else {
  //         swal("Failed", "Model Upload Failed", "error");
  //     }

  // }
  const handleSubmit = async (event) => {
    event.preventDefault();

    handleToggle();

    let formData = new FormData();

    formData.append("file", filesToUpload);
    formData.append("file_vectorizer", vectorizer);
    formData.append("title", namefile);
    formData.append("desc", descfile);
    formData.append("accuracy", accfile);

    console.log("ini model", filesToUpload);
    console.log("ini vectorizer", vectorizer);
    var token = localStorage.getItem("tokenAccess");
    console.log(token);

    const response = await axios({
      method: "post",
      url: "https://backend-ta.ndne.id/api/upload_model",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);

    console.log(response);
    if (response.data.message == "Data created successfully") {
      swal("Success", "Model Uploaded", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        window.location.href = "/list-job";
      });
    } else {
      swal("Failed", "Model Upload Failed", "error");
      handleClose();
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
  }, [data]);

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
            <div className="container bg-white my-4 rounded-5 p-4 w-75 h-50">
              <div className="mb-4 d-flex justify-content-between   profile-title ">
                <h3 style={{ color: "#0285F1" }}>Buat Penelitian</h3>
                {/* <button type="button" class="btn btn-custom shadow">
                  <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="pe-2" />
                  Tutorial
                </button> */}

              </div>
              <div className="row">
                <div className="col-6 ps-4 mt-4">
                  <div class="row mb-4">
                    <label for="nama" class="col-lg-4 col-form-label">Judul Model</label>
                    <div class="col-lg-8">
                      <input type="text" class="form-control" id="nama" onChange={handleChangeTitle} />
                    </div>
                  </div>
                  

                  

                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">Model</label>
                    <div class="col-lg-8">
                      <input
                        type="file"
                        onChange={handleFilesChange}
                      />
                    </div>
                  </div>
                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">Vectorizer</label>
                    <div class="col-lg-8">
                      <input
                        type="file"
                        onChange={handleFilesChange}
                      />
                    </div>
                  </div>

                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">Akurasi Model</label>
                    <div class="col-lg-8">
                      <input
                        type="file"
                        onChange={handleChangeAcc}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <label for="exampleFormControlTextarea1" class="form-label">Deskripsi Model Penggunaan</label>
                  <textarea class="form-control" onChange={handleChangedesc} id="exampleFormControlTextarea1" rows="10"></textarea>
                </div>
              </div>

              <div className="row">

              </div>

              <div className="row">
                <Button
                  type="button"
                  variant="contained"

                  className="ms-2 mt-3 w-25"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </>
  );
};

export default NewModel;
