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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as userService from '~/services/userServices'

const defaultTheme = createTheme()

export default function SignIn() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const registerApi = async () => {
            if (name === '' && email === '' && password === '' && address === '' && phone === '') {
                setError('Please enter your information')
                return
            }
            const res = await userService.register(name, email, password, address, phone)
            console.log('res: ', res)
            if (res?.status === 200) {
                navigate('/login')
            } else {
                setError(res?.data?.message)
            }
        }
        registerApi()
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
                        Đăng ký
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Tên người dùng "
                            type="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Địa chỉ"
                            id="address"
                            type="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Số điện thoại"
                            autoComplete="phone"
                            id="phone"
                            type="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng ký
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to={'/login'}>
                                    <p style={{ color: 'blue' }}>Bạn đã có tài khoản?</p>
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
