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
import csvDownload from "json-to-csv-export";
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

const ListMypenelitian = () => {
  // const getHeadings = () => {
  //     return Object.keys(contoh[0]);
  // }
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [age, setAge] = React.useState("");

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
    csvDownload(dataToConvert);
  };
  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");

    console.log(token);

    var role = localStorage.getItem("role");
    setRole(role);
    const getPenelitian = async (event) => {
      if (role == '"peneliti"' || role == '"anotator"') {
        const response = await axios({
          method: "get",
          url: "https://backend-ta.ndne.id/api/my_list_penelitian",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((data) => data);

        console.log(response.data);
        setData(response.data);
      } else {
        const response = await axios({
          method: "get",
          url: "https://backend-ta.ndne.id/api/list_penelitian",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((data) => data);

        console.log(response.data);
        setData(response.data);
      }
    };

    getPenelitian();
  }, []);

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
                    <li>Tentukan Penelitian yang mana akan dilihat detailnya</li>
                    <li>
                      Pilih job dengan klik pada card yang sudah ada untuk melihat detail
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
            <div className="container bg-white my-4 rounded-5 p-4">
              <div className="mb-4 d-flex justify-content-between">
                <h3 style={{ color: "#0285F1" }}>My Penelitian</h3>
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
                            Data Penelitian Kosong{" "}
                          </h5>

                          <p class="card-text text-center">
                            Klik "Buat Penelitian" untuk membuat penelitian
                          </p>
                          <div className="w-100 d-flex justify-content-center">
                            <a
                              href="/new-penelitian"
                              type="button"
                              class="btn btn-primary w-25"
                            >
                              Buat Penelitian
                            </a>
                          </div>
                          <p className="mt-3 text-center text-danger">
                            ( Siapkan dataset penelitian sebelum
                            membuat penelitian )
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
                          <a href={`/detail-penelitian/` + item.id_anotasi}>
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
                                <h5 class="card-title text-title">
                                  {item.title}
                                </h5>
                                <div className="d-flex justify-content-start">
                                  <h5 class="card-text text-label">Status :</h5>
                                  <h5 class="card-text text-status">
                                    {item.status}
                                  </h5>
                                </div>
                                {item.desc.length > 10 ? (
                                  <>
                                    <p className="card-text text-desc fw-normal">
                                      {item.desc.slice(0, 40)}...
                                    </p>
                                  </>
                                ) : (
                                  <p className="card-text text-desc">
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

export default ListMypenelitian;
