import 'bootstrap/dist/css/bootstrap.css';
import './table.css'
import './tableAdmin.css'
import Button from '@mui/material/Button'
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useParams } from "react";
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
export default function TableAdmin({ theadData, tbodyData, flag }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [modelTitle, setModelTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [accfile, setAccfile] = useState()
    
    const [vectorizer, setVectorizer] = useState();
    const [filesToUpload, setFilesToUpload] = useState();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleChangeAcc = (e) => {
        setAccfile(e.target.files[0])
    };
    const handleFilesChange = (e) => {
        // Update chosen files
        console.log(e.target.files[0])
        setFilesToUpload(e.target.files[0])
    };
    const handleVectorizerChange = (e) => {
        // Update chosen files
        console.log(e.target.files[0])
        setVectorizer(e.target.files[0])
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (event) => {
        setRole(event.target.value);
    };
    useEffect(() => {

    }, [tbodyData]);
    const handlerdelete = async (id) => {
        var token = localStorage.getItem('tokenAccess')


        console.log("ini id", id)
        const response = await axios({
            method: "delete",
            url: `https://backend-ta.ndne.id/api/${flag}/${id}`,

            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);

        window.location.reload();

    }

    const openModal = (row) => {
        setTitle("Edit")
        setSelectedRow(row);
        console.log(row)
        setUsername(row.name); // Set the initial value of the username field
        setEmail(row.email);
        setRole(row.role.toUpperCase())
        setId(row.id)
        setIsModalOpen(true);
    };

    const openModel = (row) => {
        setTitle("Edit")
        setSelectedRow(row);

        setModelTitle(row.title)
        setDesc(row.desc)
        setId(row.id)
        setIsModelOpen(true);
    };
    const tambahModal = (row) => {


        setTitle("Tambah")

        setIsModalOpen(true);

    };

    // edit user
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem('tokenAccess')
        // Perform any necessary actions with the form data
        let formData = new FormData()

        formData.append("username", username)
        formData.append("email", email)
        if (password === "") {

        } else {
            formData.append("password", password)
        }

        formData.append("role", role)
        console.log('Username:', username);
        console.log('Email:', email);
        console.log(password)


        const response = await axios({
            method: "post",
            url: `https://backend-ta.ndne.id/api/update_user_admin/${id}`,
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);
        // Close the modal and reset the form fields
        setIsModalOpen(false);
        setUsername('');
        setEmail('');
        window.location.reload();
    };

    // tambah user
    const tambahFormSubmit = async (e) => {
        e.preventDefault();


        var token = localStorage.getItem('tokenAccess')
        // Perform any necessary actions with the form data
        let formData = new FormData()

        formData.append("username", username)
        formData.append("email", email)

        formData.append("password", password)
        formData.append("role", role)


        const response = await axios({
            method: "post",
            url: `https://backend-ta.ndne.id/api/add-user-in-admin`,
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);
        // Close the modal and reset the form fields
        setIsModalOpen(false);
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('');
        window.location.reload();
    };

    const submitModelEdit = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem('tokenAccess')
        // Perform any necessary actions with the form data
        let formData = new FormData()
        // const [accfile, setAccfile] = useState('')
    
        // const [vectorizer, setVectorizer] = useState();
        // const [filesToUpload, setFilesToUpload] = useState();
        formData.append("title_model", modelTitle)
        formData.append("desc", desc)
        
        formData.append("file_vectorizer", vectorizer)
        formData.append("file_accuracy", accfile)
        console.log(accfile)
        formData.append("file", filesToUpload)



        const response = await axios({
            method: "post",
            url: `https://backend-ta.ndne.id/api/update_model/${id}`,
            data: formData,
            headers: {
                "Authorization": `Bearer ${token}`,

            },
        }).then(data => data);
        // Close the modal and reset the form fields
        setIsModalOpen(false);
        // setUsername('');
        // setEmail('');
        // setPassword('');
        // setRole('');
        // window.location.reload();
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUsername('');
        setEmail('');
    };

    const handleCloseModel = () => {
        setIsModelOpen(false);
        setDesc('');
        setModelTitle('');
    };
    return (
        <>

            {flag === 'users' ? <Button onClick={() => tambahModal()} className="w-25 mb-4" type="button" variant="contained">Tambah User</Button>
                : flag === 'delete_penelitian' ? <> <Button href="/new-penelitian" className="w-25 mb-4" type="button" variant="contained">Tambah Penelitian</Button></>
                    : flag === 'delete_model' ? <> <Button href="/new-model" className="w-25 mb-4" type="button" variant="contained">Tambah Model</Button> </> :
                        <></>}


            <table className='fl-tableAdmin'>


                <thead>
                    <tr>
                        {theadData.map(heading => {

                            return <>
                                <th style={{ width: "20%" }} key={heading}>{heading}</th>
                            </>
                        })}
                        <th style={{ width: "10%" }} ></th>
                        <th style={{ width: "10%" }} ></th>
                    </tr>
                </thead>
                <tbody>
                    {tbodyData.map((row, index) => {
                        return <tr key={index}>
                            {theadData.map((key, index) => {
                                return <td className='ml-5' key={row[key]}>{row[key]}</td>
                            })}

                            <td>
                                {flag === 'users' ? <Button onClick={() => openModal(row)} >{"Edit"}</Button> : flag === 'delete_penelitian' ?
                                    <Button href={`/admin/editUser/${row.id_anotasi}`} >{"Edit"}</Button> : <>  <Button onClick={() => openModel(row)} >{"Edit"}</Button></>}

                            </td>
                            <td>
                                {flag === 'users' ? <Button onClick={() => handlerdelete(row.id)}><img src='/Trash.png' /></Button> : flag == 'delete_penelitian' ?
                                    <Button onClick={() => handlerdelete(row.id_anotasi)}><img src='/Trash.png' /></Button> : <> <Button onClick={() => handlerdelete(row.id)}><img src='/Trash.png' /></Button></>}

                            </td>
                        </tr>;
                    })}
                </tbody>
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="modal-title"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 700,
                            modal: 500,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >

                        { }
                        <Typography id="modal-title" variant="h5" component="h2">
                            {title} User
                        </Typography>
                        <Divider sx={{ bgcolor: "secondary.light" }} />

                        {/* Form */}

                        <div>

                            <TextField sx={{
                                width: '95%',
                                marginBottom: 4,
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                                marginTop: 2,
                            }}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    style: {
                                        marginTop: 5,
                                        fontSize: '20px', // Adjust the font size as needed
                                    },
                                }}
                                onChange={(e) => setUsername(e.target.value)} id="standard-basic" value={username} label='Username' variant="standard" />
                        </div>

                        <div>
                            <TextField value={email} sx={{
                                width: '95%',
                                marginBottom: 4,
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    style: {
                                        marginTop: 5,
                                        fontSize: '20px', // Adjust the font size as needed
                                    },
                                }}
                                onChange={(e) => setEmail(e.target.value)} id="standard-basic" label='Email' variant="standard" />
                        </div>
                        <div>
                            <TextField type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }

                                sx={{
                                    width: '95%',
                                    marginBottom: 4,
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#000000",
                                    }
                                }}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    style: {
                                        marginTop: 5,
                                        fontSize: '20px', // Adjust the font size as needed
                                    },
                                }}
                                onChange={(e) => setPassword(e.target.value)} id="standard-basic" label='Password' variant="standard" />
                        </div>

                        <div>


                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Role
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                sx={{

                                    width: 200,
                                    height: 40,
                                    marginTop: 1,
                                    marginBottom: 1
                                }}

                                onChange={handleChange}
                            >
                                <MenuItem value={"PENELITI"}>Peneliti</MenuItem>
                                <MenuItem value={"ANOTATOR"}>Anotator</MenuItem>

                            </Select>
                        </div>
                        <div className='row mt-3'>
                            {title === 'Tambah' ? <Button className="w-25 ms-1" type="button" variant="contained" onClick={tambahFormSubmit}>Save User</Button> : <Button className="w-25 ms-1" type="button" variant="contained" onClick={handleFormSubmit}>Save</Button>}

                            <Button className="w-25 ms-4" color="error" type="button" variant="contained" onClick={handleCloseModal}>Close</Button>
                        </div>


                    </Box>
                </Modal>

                {/* model editor */}
                <Modal
                    open={isModelOpen}
                    onClose={() => setIsModelOpen(false)}
                    aria-labelledby="modal-title"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 700,
                            modal: 500,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >

                        { }
                        <Typography id="modal-title" variant="h5" component="h2">
                            Edit Model
                        </Typography>
                        <Divider sx={{ bgcolor: "secondary.light" }} />

                        {/* Form */}

                        <div>

                            <TextField sx={{
                                width: '95%',
                                marginBottom: 4,
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                },
                                marginTop: 2,
                            }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { fontSize: '22px' }
                                }}
                                inputProps={{
                                    style: {
                                        marginTop: 5,
                                        fontSize: '20px', // Adjust the font size as needed
                                    },
                                }}
                                onChange={(e) => setModelTitle(e.target.value)} id="standard-basic" value={modelTitle} label='Title' variant="standard" />
                        </div>

                        <div>
                            <TextField sx={{
                                width: '95%',
                                marginBottom: 4,
                                "& .MuiInputBase-input.Mui-disabled": {
                                    WebkitTextFillColor: "#000000",
                                }
                            }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { fontSize: '22px' }
                                }}
                                inputProps={{
                                    style: {
                                        marginTop: 5,
                                        fontSize: '20px', // Adjust the font size as needed
                                    },
                                }}
                                onChange={(e) => setDesc(e.target.value)} value={desc} id="standard-basic" label='Deskripsi' variant="standard" />
                        </div>

                        <div>
                            <Box sx={{

                                marginTop: 1,
                                width: 900
                            }}>
                                <Typography sx={{

                                    fontWeight: 400, fontSize: 18
                                }} variant="h3" gutterBottom>
                                    Model Program
                                </Typography>

                                <input type="file" accept=".pkl" onChange={handleFilesChange} />

                            </Box>

                            <Box sx={{

                                marginTop: 1,
                                width: 900
                            }}>
                                <Typography sx={{

                                    fontWeight: 400, fontSize: 18
                                }} variant="h3" gutterBottom>
                                    Vectorizer
                                </Typography>
                                <input type="file" onChange={handleVectorizerChange} />

                            </Box>
                            <Box sx={{

                                marginTop: 1,
                                width: 900
                            }}>
                                <Typography sx={{

                                    fontWeight: 400, fontSize: 18
                                }} variant="h3" gutterBottom>
                                    Model Accuracy
                                </Typography>
                                <input type="file" onChange={handleChangeAcc} />

                            </Box>



                        </div>



                        <div className='row mt-5'>
                            <Button className="w-25 ms-1" type="button" variant="contained" onClick={submitModelEdit}>Save Model</Button>

                            <Button className="w-25 ms-4" color="error" type="button" variant="contained" onClick={handleCloseModel}>Close</Button>
                        </div>


                    </Box>
                </Modal>
            </table>
        </>

    );
}