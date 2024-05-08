import React, { useState, useContext } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Paper, Typography, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Link } from 'react-router-dom'

import { UserContext } from '~/context/UserContext'
import * as userService from '~/services/userServices'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
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
            //Set loading true
            setLoading(true)

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

            //Set loading false
            setLoading(false)
        }
        loginApi()
    }

    return (
        <div className={cx('wrapper')}>
            <Grid2 container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid2
                    item
                    xs={12}
                    sm={8}
                    md={4}
                    xsOffset={0}
                    smOffset={2}
                    mdOffset={4}
                    justify="center"
                    alignItems="center"
                >
                    <Paper
                        style={{
                            padding: '20px',
                            textAlign: 'center',
                            margin: '20px auto',
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Typography variant="h4">Đăng nhập ở đây</Typography>
                        <table className={cx('table')}>
                            <tr>
                                <td align="center">
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        sx={{ minWidth: '300px', fontSize: '18px' }}
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <TextField
                                        label="Mật khẩu"
                                        variant="outlined"
                                        sx={{ minWidth: '300px', fontSize: '18px' }}
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td align="right">
                                    <Link to={'/forget-password'}>
                                        <p style={{ color: 'blue' }}>Quên mật khẩu?</p>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <Button
                                        variant="contained"
                                        startIcon={loading && <CircularProgress />}
                                        onClick={handleSubmit}
                                        size="large"
                                    >
                                        Đăng nhập
                                    </Button>
                                </td>
                            </tr>
                            <p style={{ color: 'red' }} value={error}></p>
                        </table>
                    </Paper>
                </Grid2>
            </Grid2>
        </div>
    )
}

export default Login
