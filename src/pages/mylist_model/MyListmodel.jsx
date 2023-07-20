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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
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
        <div
          class="modal"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <Toolbar />
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style={{ color: "#02a9f1" }}>
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  size="lg"
                  className="pe-2"
                />
                <h5 class="modal-title" id="exampleModalLabel">
                  Tutorial
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="px-2">
                  <ol>
                    <li>Tentukan Model mana yang akan dilihat detail atau dilakukan perubahan pada model</li>
                    <li>
                      Pilih Model dengan klik pada card yang sudah untuk melihat detail atau untuk melakukan perubahan pada model
                    </li>

                  </ol>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
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
            <div className="container bg-white my-4 rounded-5 p-4 ">
              <div className="mb-4 d-flex justify-content-between">
                <h3 style={{ color: "#0285F1" }}>My List Model</h3>
                <button
                  type="button"
                  class="btn btn-light shadow"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    size="lg"
                    className="pe-2"
                  />
                  Tutorial
                </button>
              </div>
              <div className="row">
                {console.log(data.length)}

                {data.length == 0 ? (
                  <>
                    <div className="col-12 d-flex justify-content-center">
                      <div class="card empty" style={{ width: "80%" }}>
                        <div class="card-body" style={{ width: "100%" }}>
                          <h5 class="card-title text-center">
                            Model Kosong{" "}
                          </h5>

                          <p class="card-text text-center">
                            Klik "Buat Model" untuk membuat Model
                          </p>
                          <div className="w-100 d-flex justify-content-center">
                            <a
                              href="/new-model"
                              type="button"
                              class="btn btn-primary w-25"
                            >
                              Buat Model
                            </a>
                          </div>
                          <p className="mt-3 text-center text-danger">
                            ( Siapkan Data Program Model  sebelum
                            membuat Model )
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {data.map((item, index) => (
                      <>
                        <div className="col-4 mb-4">
                          <a href={`/detail-model/` + item.id}>
                            <div class="card card-penelitian">
                              <img
                                src="/loginregister.jpg"
                                style={{
                                  maxHeight: "80px",
                                  width: "100%",
                                  objectFit: "cover",
                                }}
                                class="card-img-top"
                                alt="..."
                              />
                              <div
                                class="card-body"
                                style={{ height: "120px" }}
                              >
                                <h5 class="card-title text-title  ">
                                  {item.title}
                                </h5>

                                {item.desc.length > 10 ? (
                                  <>
                                    <p className="card-text text-desc fw-normal d-block text-start">
                                      {item.desc.slice(0, 40)}...
                                    </p>
                                  </>
                                ) : (
                                  <p className="card-text text-desc fw-normal d-block text-start">
                                    {item.desc}
                                  </p>
                                )}
                              </div>
                            </div>
                          </a>
                        </div>
                      </>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MyListmodel;
