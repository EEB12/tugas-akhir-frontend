import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./upload.css";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Navbar from "../Component/navbar";
import swal from "sweetalert";

const mdTheme = createTheme();

const ListAnotator = () => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [myValue, setMyValue] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const params = useParams();
  const uploadFiles = async () => {
    let formData = new FormData();
    handleToggle();
    formData.append("id_user", myValue);
    formData.append("id_anotasi", params.id);

    var token = localStorage.getItem("tokenAccess");
    var role = localStorage.getItem("role");
    const response = await axios({
      method: "post",
      url: "https://backend-ta.ndne.id/api/add-anotator",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((data) => data);

    console.log(response.data.data);

    handleClose();
    if (response.data.message == "Anotator created successfully") {
      swal("Success", "Anotator berhasil diassign", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
     
        if(role=='"admin"'){
          window.location.href = "/admin/list-penelitian";
        }else{
          window.location.href = "/list-penelitian";
        }
        // "/admin/list-penelitian"
      });
    } else {
      swal("Failed", "Anotator gagal diassign", "error");
    }
  };

  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");
    var role = localStorage.getItem("role");
    console.log(role);
    console.log(token);

    const handleSubmit = async (event) => {
      const response = await axios({
        method: "get",
        url: "https://backend-ta.ndne.id/api/anotators",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data);

      console.log(response.data);
      setData(response.data);
    };

    handleSubmit();
  }, []);

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
                    <label for="nama" class="col-lg-4 col-form-label">Pilih Anotator</label>
                    <div class="col-lg-8">
                      <select onChange={(e) => setMyValue(e.target.value)} value={myValue} className="form-select  " >
                        <option selected>Open this select menu</option>
                        {data.map((option, idx) => (
                          <option value={option.id_anotator}>{option.username}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-6">

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
      </ThemeProvider>
    </>
  );
};

export default ListAnotator;
