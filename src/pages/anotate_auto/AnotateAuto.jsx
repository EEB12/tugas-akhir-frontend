import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const mdTheme = createTheme();

const AnotateAuto = () => {
  const [open, setOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState();
  const [data, setData] = useState([]);
  const [table, setTable] = useState([]);
  const [age, setAge] = React.useState("");
  const [namefile, setNamefile] = useState("");
  const [modelid, setModelid] = useState("");
  const [preview, setPreview] = React.useState([]);
  const [detail, setDetail] = useState([]);
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

  const handleFilesChange = (e) => {
    // Update chosen files
    console.log(e.target.files[0]);
    setFilesToUpload(e.target.files[0]);
  };

  const handlename = (event) => {
    setNamefile(event.target.value);
  };
  const getHeadings = () => {
    return Object.keys(preview[0]).reverse();
  };

  const params = useParams();

  const download = async (id, name) => {
    var token = localStorage.getItem("tokenAccess");
    let formData = new FormData();

    formData.append("id_anotasi", id);
    const response = await axios({
      method: "get",
      url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${id}}`,

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((data) => data);

    console.log(response.data);
    const dataDownload = response.data[1];
    var headers = Object.keys(dataDownload[0]).reverse();
    console.log(headers);
    const dataToConvert = {
      data: dataDownload,
      filename: `${name}`,
      delimiter: ",",
      headers: headers,
    };
    // csvDownload(dataToConvert)
  };

  const handleSubmit = async () => {
    let formData = new FormData();

    formData.append("id_anotasi", params.id);
    formData.append("id_model", modelid);

    var token = localStorage.getItem("tokenAccess");

    const response = await axios({
      method: "post",
      url: "https://backend-ta.ndne.id/api/anotate_model",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((data) => data);

    const preview1 = response.data.data.slice(0, 5);

    setPreview(preview1);

    if (response.data) {
      swal("Success", "Model Uploaded", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        // console.log(response.data)
        window.location.href = `/mytable/${params.id}`;
      });
    } else {
      swal("Failed", "Model Upload Failed", "error");
    }
  };

  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");
    console.log(token);

    const handleSubmit = async (event) => {
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

    const handleDetail = async (event) => {
      handleToggle();
      const response = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${params.id}`,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data);

      // console.log(response.data)

      console.log(response?.data[0]);
      // setDesc(response?.data[0].desc)

      // setNamefile(response?.data[0].title)
      setDetail(response?.data[0]);
      handleClose();
    };

    handleDetail();
    handleSubmit();
  }, []);

  useEffect(() => {
    // Update the document title using the browser API
  }, [preview]);

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
              <div className="mb-4 d-flex justify-content-between">
                <h3>Anotasi Manual</h3>
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
                  Tutorial Anotasi Otomatis
                </button>
                <div
                  class="modal fade"
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
                            <li>Buka Dropdown Pilihan Model</li>
                            <li>Pilih Program Model yang ingin digunakan</li>
                            <li>Klik "Anotate"</li>
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
              </div>
            </div>
            <div className="container bg-white my-4 rounded-5 p-4 h-100">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-auto">
                  <h4>{detail.title}</h4>
                  <p className="text-title">Status : {detail.status}</p>
                </div>
              </div>
              <div className="border-line mb-4">
                <h5 className="mb-4">Detail Penelitian</h5>
                <div className="row">
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Tipe Anotasi</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <div className="d-flex justify-content-start gap-4">
                      <h6>:</h6>
                      <h6> {detail.type_anotasi}</h6>
                    </div>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Author</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <div className="d-flex justify-content-start gap-4">
                      <h6>:</h6>
                      <h6>{detail.author}</h6>
                    </div>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Anotator</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <div className="d-flex justify-content-start gap-4">
                      <h6>:</h6>
                      <h6>{detail.anotator}</h6>
                    </div>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Deskripsi</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    <div className="d-flex justify-content-start gap-4">
                      <h6>:</h6>
                      <h6>{detail.desc}</h6>
                    </div>
                  </div>
                  <div className="col-4 col-md-2">
                    <h6 className="fw-normal grey">Target</h6>
                  </div>
                  <div className="col-8 col-md-10">
                    {detail.target &&
                      detail.target.map((item, index) => (
                        <div className="d-flex justify-content-start gap-4">
                          <h6>:</h6>
                          <h6 key={index}>{item}</h6>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="border-line">
                <div className="d-flex justify-content-between">
                  <div className="">
                    <h5 className="pt-2">Pilih Model</h5>
                    <select
                      onChange={(e) => setModelid(e.target.value)}
                      class="form-select"
                      aria-label=" example"
                    >
                      <option selected>Program Model</option>
                      {data.map((option, idx) => (
                        <option value={option.id}>{option.desc}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      class="btn btn-outline-primary btn-xl shadow mt-4"
                      onClick={handleSubmit}
                    >
                      Anotate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default AnotateAuto;
