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
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

async function loginUser(credentials) {

    console.log(credentials)
    return fetch('https://backend-ta.ndne.id/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const defaultTheme = createTheme();
    const handleSubmit = async (event) => {
        handleToggle()
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data)
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        var email = data.get('email')
        var password = data.get('password')
        const response = await loginUser({
            "email": email,
            "password": password
        });


        if ('tokenAccess' in response) {
            swal("Success", "Logged in", "success", {
                buttons: false,
                timer: 2000,
            })
                .then((value) => {
                    handleClose()
                    localStorage.setItem('tokenAccess', response['tokenAccess']);
                    localStorage.setItem('username', JSON.stringify(response['username']));
                    localStorage.setItem('role', JSON.stringify(response['role']));
                    window.location.href = "/list-penelitian";
                });
        } else {
            swal("Failed", "Log in failed", "error");
            handleClose()
        }


    };

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
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
                                <Box sx={{ width: 500,textAlign: 'center',fontWeight: 1000, m: 1, fontSize: 48 }}>Sign In to Annotation Website</Box>
                            </Typography>
                            <Typography color="#8F959D" variant="subtitle1" gutterBottom>
                                Use your email for registration
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                
                                <TextField
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
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                {/* <Copyright sx={{ mt: 5 }} /> */}
                            </Box>
                        </Box>
                    </Grid>
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
                                <Box sx={{ fontWeight: 500, m: 1, fontSize: 40 }}>Halo, Mahasiswa</Box>
                            </Typography>

                            <Typography color="common.white" variant="subtitle1" gutterBottom>
                                <Box sx={{ width: 330, textAlign: 'center', fontWeight: 400, m: 1, fontSize: 20 }}> Buat Akun Baru untuk memulai penelitian. Lakukan registrasi terlebih dahulu </Box>

                            </Typography>
                        </Box>


                    </Grid>
                   
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default Login;


{/* <Backdrop
sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
open={open}

>
<CircularProgress color="inherit" />
</Backdrop> */}