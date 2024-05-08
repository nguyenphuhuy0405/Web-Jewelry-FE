import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import { Paper, Typography, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

import Button from '~/component/Button/Button'
import * as userService from '~/services/userServices'
import styles from './Register.module.scss'

const cx = classNames.bind(styles)

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        const fetchApi = async () => {
            setLoading(true)
            if (name === '' && email === '' && password === '' && address === '' && phone === '') {
                setError('Please enter your information')
                setLoading(false)
                return
            }
            const res = await userService.register(name, email, password, address, phone)
            console.log('res: ', res)
            if (res?.status === 200) {
                navigate('/login')
            } else {
                setError(res?.data?.message)
            }
            setLoading(false)
        }
        fetchApi()
    }

    return (
        <div className={cx('wrapper')}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">Đăng ký ở đây</Typography>
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
                        <table className={cx('table')}>
                            <tr>
                                <td>
                                    <Typography variant="h8">Họ và tên:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Họ và tên"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        type="name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="h8">Tên đăng nhập:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="h8">Mật khẩu:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Mật khẩu"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="h8">Địa chỉ:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Địa chỉ"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        type="address"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="h8">Số điện thoại:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Số điện thoại"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        type="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="right">
                                    <Link to={'/login'}>
                                        <p style={{ color: 'blue' }}>Đã có tài khoản?</p>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <Button
                                        primary
                                        normal
                                        onClick={handleRegister}
                                        leftIcon={loading && <CircularProgress />}
                                    >
                                        Đăng ký
                                    </Button>
                                </td>
                            </tr>
                            <p style={{ color: 'red' }} value={error}></p>
                        </table>
                    </Grid2>
                </Grid2>
            </Paper>
        </div>
    )
}

export default Register
