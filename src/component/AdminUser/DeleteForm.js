import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import * as userServices from '~/services/userServices'

function DeleteForm({ closeEvent, data, getUserApi }) {
    const { _id } = data

    const deleteUserApi = async (id) => {
        const res = await userServices.deleteUser(id)
        if (res?.status === 200) {
            getUserApi()
            closeEvent()
        }
    }

    const handleDelete = async () => {
        deleteUserApi(_id)
    }
    return (
        <Box>
            <Typography variant="h6" component="h6">
                Bạn có chắc chắc muốn xoá?
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '8px' }}>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={closeEvent}>
                        Huỷ
                    </Button>
                    <Button variant="contained" color="error" sx={{ marginLeft: '16px' }} onClick={handleDelete}>
                        Xoá
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DeleteForm
