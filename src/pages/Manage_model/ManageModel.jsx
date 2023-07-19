import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

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

import Table from "../Component/Table";
import TableAdmin from "../Component/TableAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
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
import csvDownload from "json-to-csv-export";
const mdTheme = createTheme();

const ManageModel = () => {
  // const getHeadings = () => {
  //     return Object.keys(contoh[0]);
  // }
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);

  const [role, setRole] = useState("");
  const [age, setAge] = React.useState("");

  const download = async (id) => {
    var token = localStorage.getItem("tokenAccess");
    let formData = new FormData();

    formData.append("id_anotasi", id);
    const response = await axios({
      method: "post",
      url: "hhttps://backend-ta.ndne.id/api/get-data",
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

  const getHeadings = (header) => {
    return Object.keys(header).reverse();
  };
  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");

    console.log(token);

    var role = localStorage.getItem("role");
    setRole(role);
    const getPenelitian = async (event) => {
      const response = await axios({
        method: "get",
        url: "https://backend-ta.ndne.id/api/list_model",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => data);
      console.log("ini respon", response.data[0]);
      console.log(Object.keys(response?.data[0]));
      console.log(delete response.data.model);
      console.log(delete response.data.vectorizer);
      console.log(delete response.data.detail);
      console.log(response.data);

      const modifiedData = [...response.data];

      // Remove the 'detail' key from each object in the data array
      modifiedData.forEach((item) => {
        delete item.detail;
        delete item.model;
        delete item.vectorizer;
      });
      const reorderedData = response.data.map((item) => {
        const { id, title, desc, ...rest } = item;

        return {
          id,
          title,
          desc,
          ...rest,
        };
      });

      console.log(reorderedData);

      // console.log(response.data)
      // // var test = getHeadings(response?.data)
      // // console.log(test)

      // const keysObject = {};

      console.log(Object.keys(reorderedData[0]));
      // console.log(reorderedData)
      setData(reorderedData);
      // console.log(keysObject);
      setHeader(Object.keys(reorderedData[0]));
    };

    console.log(header);
    getPenelitian();
  }, []);

  useEffect(() => {}, [data]);

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
                    <li>Tekan tombol edit untuk melakukan perubahan pada Model</li>
                    <li>
                      Tekan tombol delete untuk menghapus Model
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
            <div className="container mt-4">
              <div className="mb-4 d-flex justify-content-between">
                <h3>Daftar Program Model</h3>
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
            </div>
            <div className="container">
              <div className="card my-4 h-100 bg-white rounded-5 p-4">
                <div className="card-body">
                  <TableAdmin
                    theadData={header}
                    tbodyData={data}
                    flag="delete_model"
                  ></TableAdmin>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default ManageModel;
