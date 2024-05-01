import classNames from 'classnames/bind'
import styles from './Profile.module.scss'
import { Typography, Paper, TextField } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import Button from '~/component/Button/Button'
import { useEffect, useState } from 'react'

import * as userServices from '~/services/userServices'

const cx = classNames.bind(styles)

function Profile() {
    const [data, setData] = useState({
        name: '',
        address: '',
    })
    const { name, address } = data

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        updateUserInfoApi(data)
    }

    useEffect(() => {
        getUserInfoApi()
    }, [])

    const updateUserInfoApi = async (data) => {
        const res = await userServices.updateUserInfo(data)
        if (res?.status === 200) {
            setData({
                ...data,
                name: res?.data?.name,
                address: res?.data?.address,
            })
        }
    }

    const getUserInfoApi = async () => {
        const res = await userServices.getUserInfo()
        if (res?.status === 200) {
            setData({
                ...data,
                name: res?.data?.name,
                address: res?.data?.address,
            })
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4">Thông tin cá nhân</Typography>
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
                                    <Typography variant="h5">Tên hiển thị:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Tên hiển thị"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        name="name"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="h5">Địa chỉ:</Typography>
                                </td>
                                <td>
                                    <TextField
                                        label="Địa chỉ"
                                        variant="outlined"
                                        sx={{ minWidth: '250px' }}
                                        name="address"
                                        value={address}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography variant="h5">Mật khẩu:</Typography>
                                </td>
                                <td>
                                    <Button primary normal to={'/change-password'} style={{ maxWidth: '250px' }}>
                                        Thay đổi mật khẩu
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} align="center">
                                    <Button primary normal onClick={handleSave}>
                                        Thay đổi
                                    </Button>
                                </td>
                            </tr>
                        </table>
                    </Grid2>
                </Grid2>
            </Paper>
        </div>
    )
}

export default Profile
