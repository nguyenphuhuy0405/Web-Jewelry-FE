import classNames from 'classnames/bind'
import styles from './ChangePassword.module.scss'
import { Typography, Paper, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import Button from '~/component/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import * as userServices from '~/services/userServices'

const cx = classNames.bind(styles)

function ChangePassword() {
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSave = async () => {
        if (password === '' || newPassword === '' || confirmPassword === '') {
            setError('Không để trống mật khẩu')
            return
        }
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu không khớp')
            return
        }
        putChangePasswordApi(password, newPassword)
    }

    const putChangePasswordApi = async (password, newPassword) => {
        const res = await userServices.changePassword(password, newPassword)
        if (res?.status === 200) {
            navigate('/profile')
        } else {
            setError(res?.message)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">Thay đổi mật khẩu</Typography>
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
                                    <Typography variant="h8">Mật khẩu cũ:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Mật khẩu cũ"
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
                                    <Typography variant="h8">Mật khẩu mới:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Mật khẩu mới"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        type="password"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="h8">Nhập lại mật khẩu mới:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Nhập lại mật khẩu mới"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <Button primary normal to={'/profile'}>
                                        Quay lại
                                    </Button>
                                </td>
                                <td align="center">
                                    <Button primary normal onClick={handleSave}>
                                        Thay đổi mật khẩu
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

export default ChangePassword
