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
export default function TableAdmin({ theadData, tbodyData, flag }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');
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
        setSelectedRow(row);
        console.log(row)
        setUsername(row.name); // Set the initial value of the username field
        setEmail(row.email);
        setId(row.id) 
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem('tokenAccess')
        // Perform any necessary actions with the form data
        let formData = new FormData()

        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)
        console.log('Username:', username);
        console.log('Email:', email);


        const response = await axios({
            method: "post",
            url: `https://backend-ta.ndne.id/api/update_user_admin/15`,

            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data);
        // Close the modal and reset the form fields
        setIsModalOpen(false);
        setUsername('');
        setEmail('');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setUsername('');
        setEmail('');
      };
    return (
        <table className='fl-tableAdmin'>

            {/* 
            <colgroup>
                <col span="1" style={{width: "20%"}} />
                <col span="1"style={{width: "50%"}} />
                <col span="1" style={{width: "10%"}} />
                <col span="1" style={{width: "10%"}} />
            </colgroup> */}
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
                            {flag === 'users' ? <Button onClick={() => openModal(row)} >{"Edit"}</Button> : 
                            <Button href={`/admin/editUser/${row.id_anotasi}`} >{"Edit"}</Button>}

                        </td>
                        <td>

                            <Button onClick={() => handlerdelete(row.id_anotasi)}><img src='/Trash.png' /></Button>
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
                        modal:500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="modal-title" variant="h5" component="h2">
                        Edit Modal
                    </Typography>
                    <Divider sx={{ bgcolor: "secondary.light" }} />

                    {/* Form */}
                    <form className='mt-4' onSubmit={handleFormSubmit}>
                        <div>
                            {/* <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                required
                            /> */}

                            <TextField sx={{
                                

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
                                onChange={(e) => setUsername(e.target.value)}id="standard-basic"  value={username} label='Username' variant="standard"  />
                        </div>

                        <div>
                            {/* <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                required
                            /> */}

                            <TextField sx={{
                                

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
                                onChange={(e) => setEmail(e.target.value)}id="standard-basic" label='Email' variant="standard"  />
                        </div>


                        <div>
                            {/* <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                required
                            /> */}

                            <TextField sx={{
                                

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
                                onChange={(e) => setPassword(e.target.value)}id="standard-basic" label='Password' variant="standard"  />
                        </div>
                        
                        <Button type="submit">Save</Button>
                        <Button onClick={handleCloseModal}>Close</Button> 
                    </form>
                </Box>
            </Modal>
        </table>
    );
}