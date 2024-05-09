import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { UserContext } from '~/context/UserContext'
import * as userService from '~/services/userServices'

const defaultTheme = createTheme()

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useContext(UserContext)
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        //Check validation
        if (email === '' && password === '') {
            setError('Please enter your email and password')
            return
        } else if (email === '') {
            setError('Please enter your email')
            return
        } else if (password === '') {
            setError('Please enter your password')
            return
        }

        const loginApi = async () => {
            const res = await userService.login(email, password)
            console.log('res: ', res)
            if (res?.status === 200) {
                login(
                    res.data.name,
                    res.accessToken,
                    res.data.role === 'admin' ? true : false,
                    res.data.address,
                    res.data.phoneNumber,
                )
                setError('')
                navigate('/')
            } else {
                setError(res?.data?.message)
            }
        }
        loginApi()
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Địa chỉ email "
                            autoComplete="email"
                            autoFocus
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            id="password"
                            autoComplete="current-password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to={'/forget-password'}>
                                    <p style={{ color: 'blue' }}>Quên mật khẩu?</p>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to={'/register'}>
                                    <p style={{ color: 'blue' }}>Bạn chưa có tài khoản?</p>
                                </Link>
                            </Grid>
                        </Grid>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
