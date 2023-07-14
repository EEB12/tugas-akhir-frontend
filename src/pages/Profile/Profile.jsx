import React from "react";
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

import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import "./upload.css";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Navbar from "../Component/navbar";
import swal from "sweetalert";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
const mdTheme = createTheme();

const Profile = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [NIK, setNIK] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 200,
        height: 200,
        fontSize: 55,
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  const handlename = (event) => {
    setName(event.target.value);
  };
  const handlemail = (event) => {
    setEmail(event.target.value);
  };

  const handleNIK = (event) => {
    setNIK(event.target.value);
  };

  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");
    console.log(token);

    const handleSubmit = async (event) => {
      const response = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/profile`,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data);

      console.log(response.data);

      // console.log(response.data[0])
      setData(response.data);
      setName(response.data.username);
      setEmail(response.data.email);
    };

    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    // Create a form and post it to server
    let formData = new FormData();

    formData.append("username", name);
    formData.append("email", email);

    var token = localStorage.getItem("tokenAccess");
    console.log(token);
    try {
      handleToggle();
      const response = await axios({
        method: "post",
        url: "https://backend-ta.ndne.id/api/update_user",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((data) => data);

      console.log(response.data.data);

      swal("Success", "Profile Berhasil di update", "success", {
        buttons: false,
        timer: 6000,
      });
      window.location.href = `/list-penelitian`;
    } catch (error) {
      swal("Failed", error.response.data.message, "error");
      handleClose();
    }
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
            <div>

            </div>
            <div className="container bg-white my-4 rounded-5 p-4 w-75 h-50">
              <div className="mb-4 d-flex justify-content-between   profile-title ">
                <h3 style={{ color: "#0285F1" }}>Informasi Pengguna</h3>
                {/* <button type="button" class="btn btn-custom shadow">
                  <FontAwesomeIcon icon={faCircleQuestion} size="lg" className="pe-2" />
                  Tutorial
                </button> */}

              </div>
              <div className="row">
                <div className="col-6 ps-4 mt-4">
                  <div class="row mb-4">
                    <label for="nama" class="col-lg-4 col-form-label">Nama</label>
                    <div class="col-lg-8">
                      <input type="text" class="form-control" id="nama" value={name} onChange={handlename} />
                    </div>
                  </div>
                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">Email</label>
                    <div class="col-lg-8">
                      <input type="email" class="form-control" id="email" value={email} onChange={handlemail} />
                    </div>
                  </div>

                  <div class="row mb-4">
                    <label for="email" class="col-lg-4 col-form-label">NIK/NRP</label>
                    <div class="col-lg-8">
                      <input disabled type="email" class="form-control" id="email" value={data.nrp_nik} />
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="row mb-5 ">
                    <div className="col-12  d-flex justify-content-center">
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          {...stringAvatar(
                            `${data.username?.toUpperCase()}`
                          )}


                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleSubmit}
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

export default Profile;
