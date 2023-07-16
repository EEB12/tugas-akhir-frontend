import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

import { faFilter } from '@fortawesome/free-solid-svg-icons';
const mdTheme = createTheme();

const Listjob = () => {
  // const getHeadings = () => {
  //     return Object.keys(contoh[0]);
  // }
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  const [filteredData, setFilteredData] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [typeFilters, setTypeFilters] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tokenAccess");
      const response = await axios.get(
        "https://backend-ta.ndne.id/api/list_job_penelitian",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;
      setData(responseData);
      setFilteredData(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setStatusFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setStatusFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTypeFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setTypeFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  useEffect(() => {
    applyFilters();
  }, [statusFilters, typeFilters]);


  const applyFilters = () => {
    let filtered = data.filter((item) => {
      if (
        statusFilters.length === 0 ||
        statusFilters.includes(item.status.toLowerCase())
      ) {
        if (
          typeFilters.length === 0 ||
          typeFilters.includes(item.type_anotasi.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
    setFilteredData(filtered);
  };


  useEffect(() => {
    // Calculate the height based on the number of cards
    const calculateHeight = () => {
      const cardHeight = 200; // Height of each card in pixels
      const cardCount = data.length; // Number of cards
      const extraHeight = 5; // Additional height in pixels

      const colHeight = cardHeight * cardCount + extraHeight;
      document.documentElement.style.setProperty(
        "--col-height",
        `${colHeight}px`
      );
    };

    calculateHeight();

    // Recalculate the height whenever the data changes
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [data]);

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
                    <li>Tentukan Job mana yang akan dianoatasi</li>
                    <li>
                      Pilih job dengan klik pada card yang sudah untuk melakukan anotasi
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
            <div className="container bg-white my-4 rounded-5 p-4 h-100">
              <div className="mb-4 d-flex justify-content-between">
                <h3 style={{ color: "#0285F1" }}>My Job</h3>
                <div>
                  <button type="button" class="btn btn-custom shadow me-4 " id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <FontAwesomeIcon icon={faFilter} size="lg" className="pe-2 " />
                    Filter
                  </button>
                  <div class="dropdown-menu menu-filter " aria-labelledby="dropdownMenuButton1">
                    <div className="filter-title  p-2 mb-2">
                      Status
                    </div>

                    <div class="filter-content">
                      <div class="card-body p-2">
                        <form>
                          <label class="form-check">
                            <input class="form-check-input" type="checkbox" value="finished" onChange={handleStatusChange} />
                            <span class="form-check-label">
                              Finished
                            </span>
                          </label>
                          <label class="form-check">
                            <input class="form-check-input" type="checkbox" value="progress" onChange={handleStatusChange} />
                            <span class="form-check-label">
                              Progress
                            </span>
                          </label>

                        </form>

                      </div>
                    </div>

                    <div className="filter-title border-bottom-2 p-2">
                      Type
                    </div>

                    <div class="filter-content">
                      <div class="card-body p-2">
                        <form>
                          <label class="form-check">
                            <input class="form-check-input" type="checkbox" value="auto" onChange={handleTypeChange} />
                            <span class="form-check-label">
                              Auto
                            </span>
                          </label>
                          <label class="form-check">
                            <input class="form-check-input" type="checkbox" value="manual" onChange={handleTypeChange} />
                            <span class="form-check-label">
                              Manual
                            </span>
                          </label>

                        </form>

                      </div>
                    </div>

                  </div>
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
                              <li>Memilih dropdown pada kolom result</li>
                              <li>
                                Melakukan save edit pada row untuk konfirmasi
                                perubahan pada row tersebut
                              </li>
                              <li>
                                Klik "Save Dataset" untuk menyimpan perubahan pada
                                tabel
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
                </div>

              </div>
              <div className="row">
                {console.log(data.length)}

                {filteredData.length == 0 ? (
                  <>
                    <div className="col-12 d-flex justify-content-center">
                      <div class="card empty" style={{ width: "80%" }}>
                        <div class="card-body" style={{ width: "100%" }}>
                          <h5 class="card-title text-center">
                            Data Penelitian Kosong{" "}
                          </h5>

                          <p class="card-text text-center">
                            Harap peneliti untuk memberikan pekerjaan kepada anda
                          </p>
                          <div className="w-100 d-flex justify-content-center">
                            {/* <a
                              href="/new-penelitian"
                              type="button"
                              class="btn btn-primary w-25"
                            >
                              Buat Penelitian
                            </a> */}
                          </div>
                          {/* <p className="mt-3 text-center text-danger">
                            ( Siapkan dataset penelitian sebelum
                            membuat penelitian )
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {filteredData.map((item, index) => (
                      <>
                        <div className="col-4 mb-4">
                          <a href={item.type_anotasi == 'manual' ? `/mytable/ ${item.id_anotasi}` : `/anotate-auto/${item.id_anotasi}`}>
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
                                style={{ height: "150px" }}
                              >
                                <h5 class="card-title text-title">
                                  {item.title}
                                </h5>

                                <div className="d-flex justify-content-start">
                                  <h5 class="card-text text-label">Tipe&nbsp;&nbsp;&nbsp;&nbsp;:</h5>
                                  <h5 class="card-text text-status">
                                    {item.type_anotasi}
                                  </h5>
                                </div>

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

export default Listjob;
