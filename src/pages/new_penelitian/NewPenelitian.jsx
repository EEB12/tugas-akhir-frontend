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
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import csvDownload from 'json-to-csv-export'
const mdTheme = createTheme();

const NewPenelitian = () => {


  const [open, setOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState();
  const [data, setdata] = useState([]);
  const [age, setAge] = React.useState("AUTO");
  const [lang, setLang] = React.useState("english");
  const [namefile, setNamefile] = useState("");
  const [desc, setDesc] = useState("");
  const [target, setTarget] = useState("");
  const [inputValue, setInputValue] = useState("");
  const download = async (id, name) => {
    var token = localStorage.getItem('tokenAccess')
    let formData = new FormData()
    formData.append("id_anotasi", id)
    const response = await axios({
      method: "get",
      url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${id}}`,

      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(data => data);
    const dataDownload = response.data[1]
    var headers = Object.keys(dataDownload[0])
    const dataToConvert = {
      data: dataDownload,
      filename: `${name}`,
      delimiter: ',',
      headers: headers
    }
    csvDownload(dataToConvert)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleLang = (event) => {
    setLang(event.target.value);
  };

  const handleChangeTitle = (event) => {
    setNamefile(event.target.value);
  };
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleFilesChange = (e) => {
    // Update chosen files
    console.log(e.target.files[0]);
    setFilesToUpload(e.target.files[0]);
  };
  // const handleFilesChange = (files) => {
  //     // Update chosen files
  //     setFilesToUpload(files[0])
  // };
  const handlename = (event) => {
    setNamefile(event.target.value);
  };

  const handletarget = (event) => {
    setInputValue(event.target.value);
  };
  const handleTargetDelete = () => {
    setTarget("")
};
  const handleTargetButton = () => {

    // if(inputValue=""){
    //   return
    // }
    if (target == "") {
      const merged = `${target}`
      console.log(merged)
      setTarget(inputValue);

      setInputValue("")
    }
    else {
      const merged = `${inputValue},${target}`
      setTarget(merged);
      setInputValue("")
    }



  };
  const getHeadings = () => {
    return Object.keys(data[0]).reverse();
  };


  const uploadFiles = async () => {
    // Create a form and post it to server
    handleToggle()
    let formData = new FormData();
    handleToggle();
    formData.append("file", filesToUpload);
    formData.append("title", namefile);
    formData.append("type_anotasi", age);
    formData.append("desc", desc);
    formData.append("language", lang);
    formData.append("target", target);
    // console.log(filesToUpload)
    // console.log(formData.get('file'))
    var token = localStorage.getItem("tokenAccess");
    console.log(token);
    try {
      const response = await axios({
        method: "post",
        url: "https://backend-ta.ndne.id/api/upload_penelitian",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data);

      const preview = response.data.data.slice(0, 5);
      setdata(preview);
      handleClose();
      if (response.data.message == "Data created successfully") {
        swal("Success", "Data Penelitian berhasil diupload", "success", {
          buttons: false,
          timer: 2000,
        }).then((value) => {
          handleClose();
          window.location.href = `/list-anotator/${response.data.id_anotasi}`;
        });
      } else {
        swal("Failed", response.data.message, "error");
        handleClose();
      }
    } catch (error) {
      swal("Failed", error.response.data.error, "error");
      handleClose();
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
  }, [data]);

  useEffect(() => {
    // Update the document title using the browser API
  }, [age]);

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
            <div className="container bg-white my-4 rounded-5 p-4  ">
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
                    <label for="nama" class="col-lg-4 col-form-label">Judul Penelitian</label>
                    <div class="col-lg-8">
                      <input type="text" class="form-control" id="nama" onChange={handleChangeTitle} />
                    </div>
                  </div>
                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">Type Anotasi</label>
                    <div class="col-lg-8">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        sx={{
                          height: "38px",
                          width: 200,

                        }}
                        onChange={handleChange}
                      >
                        <MenuItem value={"AUTO"}>Auto</MenuItem>
                        <MenuItem value={"MANUAL"}>Manual</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">Bahasa</label>
                    <div class="col-lg-8">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={lang}
                        sx={{
                          height: "38px",
                          width: 200,

                        }}
                        onChange={handleLang}
                      >
                        <MenuItem value={"english"}>Inggris</MenuItem>
                        <MenuItem value={"indonesian"}>Indonesia</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <label for="nama" class="col-lg-4 col-form-label">Target Penelitian</label>
                    <div class="col-lg-5">
                      <input disabled value={target} type="text" class="form-control " id="nama" />
                    </div>
                    <div className="col-lg-3">
                      <button type="button" class="btn btn-danger w-100" onClick={handleTargetDelete}>Hapus</button>
                    </div>
                  </div>

                  <div class="row mb-4">
                    <label for="nama" class="col-lg-4 col-form-label"></label>
                    <div class="col-lg-5">
                      <input type="text" class="form-control " value={inputValue} onChange={handletarget} id="nama" />
                    </div>
                    <div className="col-lg-3">
                      <button type="button" class="btn btn-primary w-100" onClick={handleTargetButton}>Tambah</button>
                    </div>
                  </div>

                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">Dataset</label>
                    <div class="col-lg-8">
                      <input
                        type="file"
                        onChange={handleFilesChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <label for="exampleFormControlTextarea1" class="form-label">Deskripsi</label>
                  <textarea class="form-control" onChange={handleDesc} id="exampleFormControlTextarea1" rows="9"></textarea>
                </div>
              </div>

              <div className="row">

              </div>

              <div className="row mt-5">
                <Button
                  type="button"
                  variant="contained"
                  onClick={uploadFiles}
                  className="ms-2 mt-3 w-25"
                >
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}

        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    </>
  );
};

export default NewPenelitian;