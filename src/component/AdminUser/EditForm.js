import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import * as userServices from '~/services/userServices'
import { useState } from 'react'

function EditForm({ closeEvent, data, getUserApi }) {
    const { _id, email, name, address, phoneNumber } = data
    const [editName, setEditName] = useState(name)
    const [editAddress, setEditAddress] = useState(address)
    const [error, setError] = useState('')

    const updateUserApi = async (id, name, address) => {
        const res = await userServices.updateUser(id, name, address)
        if (res?.status === 200) {
            getUserApi()
            closeEvent()
        } else {
            setError(res?.data?.message)
        }
    }

    const handleSave = async (id) => {
        updateUserApi(id, editName, editAddress)
    }
    return (
        <Box>
            <Typography id="modal-modal-title" variant="h6" component="h6">
                Sửa thông tin người dùng
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '8px' }}>
                <Grid item xs={12}>
                    <TextField disabled label="id" variant="outlined" sx={{ width: '100%' }} defaultValue={_id} />
                </Grid>
                <Grid item xs={12}>
                    <TextField disabled label="Email" variant="outlined" sx={{ width: '100%' }} defaultValue={email} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled
                        label="Số điện thoại"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        defaultValue={phoneNumber}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Tên người dùng"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        defaultValue={name}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Địa chỉ"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        defaultValue={address}
                        onChange={(e) => setEditAddress(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography color="error" variant="h8" component="h8">
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
                        onClick={() => handleSave(_id)}
                    >
                        Lưu
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EditForm
