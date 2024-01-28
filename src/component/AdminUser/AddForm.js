import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import * as userServices from '~/services/userServices'
import { useState } from 'react'

function AddForm({ closeEvent, getUserApi }) {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
    })
    const [error, setError] = useState('')
    const { name, email, password, address, phoneNumber } = data

    const addUserApi = async () => {
        const res = await userServices.register(name, email, password, phoneNumber, address)
        if (res?.status === 200) {
            getUserApi()
            closeEvent()
        } else {
            setError(res?.data?.message)
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        addUserApi()
    }

    return (
        <Box>
            <Typography id="modal-modal-title" variant="h4" component="h4">
                Thêm thông tin người dùng
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '8px' }}>
                <Grid item xs={12}>
                    <TextField
                        name="name"
                        label="Tên người dùng"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={password}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="phoneNumber"
                        label="Số điện thoại"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={phoneNumber}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="address"
                        label="Địa chỉ"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        value={address}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography color="error" variant="h6" component="h6">
                        {error}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" style={{ backgroundColor: 'gray' }} onClick={closeEvent}>
                        Huỷ
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginLeft: '16px' }}
                        onClick={() => handleSave()}
                    >
                        Thêm
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddForm
