// import React, { useState } from 'react';
import { useTable } from "react-table";
import EasyEdit, { Types } from "react-easy-edit";
import { useState, useEffect } from "react";
import { event } from "jquery";
import axios from "axios";
import Papa from "papaparse";
import Pagination from "@mui/material/Pagination";
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
import "./upload.css";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Navbar from "../Component/navbar";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const mdTheme = createTheme();

const MyTable = () => {
  const [jsonData, setJsonData] = useState([
    { name: "John", age: 25 }, // data buat nampilin tabel jadi pake pagination
    { name: "Alice", age: 30 },
    { name: "Bob", age: 35 },
  ]);
  const [data, setData] = useState([]); // data besar
  const [dataResult, setDataResult] = useState([]); // data buat nampung result data
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [detail, setDetail] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const getHeadings = () => {
    return Object.keys(jsonData[0]);
  };
  const params = useParams();

  const updateData = (index, newName) => {
    setJsonData((prevData) => {
      const newData = [...prevData]; // Create a copy of the state array
      newData[index] = { ...newData[index], result: newName }; // Create a new object with updated value
      return newData; // Return the updated array as the new state
    });
  };

  const handlePageChange = (event, page) => {
    setDataResult([...dataResult, ...jsonData]);
    setCurrentPage(page);

    // Perform data fetching or update based on the new page
    // For example, fetch data from API with the new page number
  };

  const save = (value, index) => {
    updateData(index, value);
    //    console.log(value,index)
    // console.log(value)
  };

  const convertToCSV = (data) => {
    const csv = Papa.unparse(data);
    return csv;
  };

  const buttonhandler = async () => {
    const array2 = jsonData;
    const array1 = dataResult;
    const appendedArray = [...array1, ...array2];
    console.log(appendedArray);
    console.log(data);
    var token = localStorage.getItem("tokenAccess");
    if (currentPage == 1) {
      setDataResult(jsonData);
      const updatedJsonData = data.map((obj) => {
        const matchingData = jsonData.find((d) => {
          const firstKey = Object.keys(d)[0]; // Retrieve the first key dynamically
          return d[firstKey] === obj[firstKey];
        });

        if (matchingData) {
          return {
            ...obj,
            result: matchingData.result,
          };
        }
        return obj;
      });

      console.log("dah gabung sama result", updatedJsonData);
      setData(updatedJsonData); // Update the data state first
      const csvData = convertToCSV(updatedJsonData); // Convert the updated data to CSV
      const csvBlob = new Blob([csvData], { type: "text/csv" });
      const formData = new FormData();
      formData.append("file", csvBlob, "data_result_testing_auto123.csv");
      formData.append("id_anotasi", params.id);

      try {
        const response = await axios.post(
          "https://backend-ta.ndne.id/api/manual_anotate",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("berhasil");
        swal("Berhasil", "Data berhasil diupdate", "success");
      } catch (error) {
        swal("Error", "Ada kesalahan pada server", "error");
      }
    } else {
      const updatedJsonData = data.map((obj) => {
        const matchingData = jsonData.find((d) => {
          const firstKey = Object.keys(d)[0]; // Retrieve the first key dynamically
          return d[firstKey] === obj[firstKey];
        });
        if (matchingData) {
          return {
            ...obj,
            result: matchingData.result,
          };
        }
        return obj;
      });

      setData(updatedJsonData); // Update the data state first
      const csvData = convertToCSV(updatedJsonData); // Convert the updated data to CSV
      const csvBlob = new Blob([csvData], { type: "text/csv" });
      const formData = new FormData();
      formData.append("file", csvBlob, "data_result_testing_auto.csv");
      formData.append("id_anotasi", params.id);

      try {
        const response = await axios.post(
          "https://backend-ta.ndne.id/api/manual_anotate",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        swal("Berhasil", "Data berhasil diupdate", "success");
      } catch (error) {
        swal("Error", "Ada kesalahan pada proses anotasi", "error");
      }
    }

    // // Handle the response
    // console.log(response);
  };

  const updateStatus = async () => {
    const id = params.id;
    let formData = new FormData();

    formData.append("id_anotasi", id);
    formData.append("status", "finished");

    var token = localStorage.getItem("tokenAccess");
    console.log(token);

    const response = await axios({
      method: "post",
      url: "https://backend-ta.ndne.id/api/update_status_anotate",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  };

  const cancel = () => { };

  function Table({ theadData, tbodyData }) {
    console.log(tbodyData);
    console.log(theadData);

    

    return (
      <div className="table-container">
        <table className="table table-hover table-striped ">
          <thead>
            <tr>
              {theadData?.map((heading) => (
                <th className="table-secondary" style={{ width: "30%" }} key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbodyData?.map((row, indexL) => (
              <tr key={indexL}>
                {theadData?.map((key, index) => {
                  if (key === "result") {
                    return (
                      <td className="ml-5" key={row[key]}>
                        <EasyEdit
                          value={row[key]}
                          type="select"
                          onSave={(value) => save(value, indexL)}
                          options={options.map((option) => ({
                            label: option,
                            value: option,
                          }))}
                          onCancel={cancel}
                          saveButtonLabel="Save Edit"
                          cancelButtonLabel="Cancel Edit"
                          attributes={{ name: "awesome-input", id: 1 }}
                        />
                      </td>
                    );
                  } else {
                    return <td className="ml-5" key={row[key]}>{row[key]}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
  }

  // useEffect(() => {
  //     console.log("data berubah")
  // }, [jsonData]);

  function sortObjects(data) {
    return data?.map((obj) => {
      const { result, ...rest } = obj;
      return { ...rest, result };
    });
  }

  useEffect(() => {
    console.log(jsonData);
  }, [jsonData]);

  // data getter
  useEffect(() => {
    console.log(currentPage, "berubah pagenya");
    var token = localStorage.getItem("tokenAccess");
    const dataRetriever = async (event) => {
      const response = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get-data-progress-pagination/${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: currentPage,
          per_page: 10,
          id_anotasi: params.id,
        },
      }).then((data) => data);

      setJsonData(sortObjects(response.data.data));
      console.log(response.data.data);
      // setDataResult([...dataResult, ...jsonData]);
    };
    dataRetriever();
  }, [currentPage]);

  useEffect(() => {
    console.log(dataResult);
  }, [dataResult]);
  useEffect(() => {
    var token = localStorage.getItem("tokenAccess");
    // console.log(token)
    const handleSubmit = async (event) => {
      const response = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get-data-progress-pagination/${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          page: 1,
          per_page: 10,
          id_anotasi: params.id,
        },
      }).then((data) => data);
      
      console.log("tes",response.data.total_pages)
      setTotalPage(response.data.total_pages)
      // setJsonData(response.data)

      // console.log(response.data.data)
      setHeaders(Object.keys(response?.data.data[0]).reverse());
      const preview1 = response?.data?.data.slice(0, 10);
      console.log(preview1);
      const responseBaseData = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get-data-progress/${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((data) => data);

      const responsedetail = await axios({
        method: "get",
        url: `https://backend-ta.ndne.id/api/get_detail_penelitian/${params.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((data) => data);
      setDetail(responsedetail.data[0]);
      console.log(responsedetail.data[0]);
      console.log(responseBaseData);
      console.log(sortObjects(responseBaseData?.data[0]));

      setOptions(response.data.target);
      setJsonData(sortObjects(preview1));
      // setDataResult(sortObjects(preview1));
      setData(sortObjects(responseBaseData?.data[0]));
      console.log(headers);
    };

    handleSubmit();

    // setDataResult([...dataResult, ...jsonData]);
  }, []);
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
                  Tutorial Anotasi Manual
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
                  <h5 className="pt-2">Edit Dataset</h5>
                  <button
                    type="button"
                    class="btn btn-light shadow"
                    onClick={() => buttonhandler()}
                  >
                    Save Dataset
                  </button>
                </div>
                <div className="row mt-4">
                  <Table theadData={getHeadings()} tbodyData={jsonData}></Table>
                  {/* <button onClick={() => buttonhandler()}>upload</button> */}

                  <Pagination
                    count={totalPage} // Total number of pages
                    page={currentPage} // Current active page
                    onChange={handlePageChange} // Callback function for page change
                  />
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default MyTable;
