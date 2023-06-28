import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import Paper from '@mui/material/Paper';
async function registerUser(credentials) {

    console.log(credentials)
    return fetch('https://backend-ta.ndne.id/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


const Register = () => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            username: data.get('username'),
        });


        var email = data.get('email')
        var password = data.get('password')
        var username = data.get('username')
        const response = await registerUser({
            "username": username,
            "email": email,
            "password": password
        });

        console.log(response.message)
        if (response.message == 'User registered successfully') {
            swal("Success", "User berhasil register", "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {

                    window.location.href = "/login";
                });
        } else {
            swal("Failed", "Model Upload Failed", "error");
        }
    };

    const defaultTheme = createTheme();
    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        md={5}
                        sx={{
                            backgroundImage: 'url(./loginregister.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',

                        }}
                    >
                        <Box sx={{
                            my: 12,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}>
                            <img src='./Logo-its.png'>

                            </img>
                            <Typography
                                color="common.white"
                                component="h1" variant="h5">
                                <Box sx={{ fontWeight: 500, m: 1, fontSize: 40 }}>Selamat Datang</Box>
                            </Typography>

                            <Typography color="common.white" variant="subtitle1" gutterBottom>
                                <Box sx={{ width: 350, textAlign: 'center', fontWeight: 400, m: 1, fontSize: 20 }}> Silahkan melakukan login setelah melakukan registrasi</Box>

                            </Typography>

                            <Button

                                type="submit"
                                fullWidth
                                variant="outlined"
                                href='/login'
                                sx={{border: 2 ,mt: 3,width:300, mb: 2,borderColor: 'common.white', borderRadius: '30px'  }}
                            >
                                <Box color="common.white" sx={{ textAlign: 'center', fontWeight: 400, m:1}}>
                                    Log in
                                </Box>

                            </Button>
                        </Box>


                    </Grid>
                    <Grid item xs={12} sm={12} md={7} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography
                                color="#02A9F1"
                                component="h1" variant="h5">
                                <Box sx={{ fontWeight: 1000, m: 1, fontSize: 48 }}>Create Account</Box>
                            </Typography>
                            <Typography color="#8F959D" variant="subtitle1" gutterBottom>
                                Use your email for registration
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>



                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    inputProps={{
                                        style: {
                                            height: 50,
                                            
                                        },
                                    }}
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputProps={{
                                        style: {
                                            height: 50,

                                        },
                                    }}
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    inputProps={{
                                        style: {
                                            height: 50,

                                        },
                                    }}
                                />
                               
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign up
                                </Button>
                                <Grid container>
                                    <Grid item xs>

                                    </Grid>
                                    <Grid item>

                                    </Grid>
                                </Grid>
                                {/* <Copyright sx={{ mt: 5 }} /> */}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default Register;
