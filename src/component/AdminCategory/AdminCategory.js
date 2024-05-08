import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import * as categoryServices from '~/services/categoryServices'

const columns = [
    { id: '_id', label: 'Id', minWidth: 50 },
    {
        id: 'title',
        label: 'Tên danh mục',
        minWidth: 300,
    },
    {
        id: 'action',
        label: 'Thao tác',
        minWidth: 150,
        align: 'center',
        action: true,
    },
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    p: 4,
}

function AdminCategory() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])
    const [selectedRow, setSelectedRow] = useState(null)
    const [loading, setLoading] = useState(false)
    console.log('>>>selectedRow: ', selectedRow)

    // State Modal Add
    const [openAdd, setOpenAdd] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState({
        title: '',
    })

    // State Modal Edit
    const [openEdit, setOpenEdit] = useState(false)
    const [errorEdit, setErrorEdit] = useState('')

    // State Modal Delete
    const [openDelete, setOpenDelete] = useState(false)

    //Modal Add
    const handleAdd = () => {
        createCategoryApi(data)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleOpenAdd = () => setOpenAdd(true)
    const handleCloseAdd = () => {
        setData({
            title: '',
        })
        setError('')
        setOpenAdd(false)
    }

    // Modal Edit
    const handleOpenEdit = (id) => {
        let row = rows.find((product) => product._id === id)
        setSelectedRow(row)
        setData({
            title: row?.title,
        })
        setOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setData({
            title: '',
        })
        setSelectedRow(null)
        setErrorEdit('')
        setOpenEdit(false)
    }

    const handleEdit = () => {
        updateCategoryApi(selectedRow?._id, data)
    }

    //Modal Delete
    const handleOpenDelete = (id) => {
        setSelectedRow(rows.find((item) => item._id === id))
        setOpenDelete(true)
    }
    const handleCloseDelete = () => {
        setSelectedRow(null)
        setOpenDelete(false)
    }

    const handleDelete = () => {
        deleteCategoryApi(selectedRow?._id)
    }

    //Table
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        getCategoriesApi()
    }, [])

    //Call API
    const getCategoriesApi = async () => {
        setLoading(true)
        const res = await categoryServices.getCategories()
        if (res?.status === 200) {
            setRows(res?.data)
        }
        setLoading(false)
    }

    const createCategoryApi = async (data) => {
        const res = await categoryServices.createCategory(data)
        if (res?.status === 200) {
            setRows([...rows, res?.data])
            handleCloseAdd()
        } else {
            setError(res?.data?.message)
        }
    }

    const updateCategoryApi = async (id, data) => {
        const res = await categoryServices.updateCategory(id, data)
        if (res?.status === 200) {
            setRows(rows.map((row) => (row._id === id ? res?.data : row)))
            handleCloseEdit()
        } else {
            setErrorEdit(res?.data?.message)
        }
    }

    const deleteCategoryApi = async (id) => {
        const res = await categoryServices.deleteCategory(id)
        if (res?.status === 200) {
            setRows(rows.filter((row) => row._id !== id))
            handleCloseDelete()
        }
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* Modal Add */}
                    <>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAdd}
                            sx={{ marginBottom: '16px' }}
                        >
                            Thêm mới
                        </Button>
                        <Modal open={openAdd} onClose={handleCloseAdd}>
                            <Box sx={style}>
                                <Typography variant="h6" component="h6">
                                    Thêm danh mục
                                </Typography>
                                <Grid
                                    container
                                    rowSpacing={2}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                    sx={{ marginTop: '8px' }}
                                >
                                    <Grid item xs={12}>
                                        <TextField
                                            name="title"
                                            label="Tên sản phẩm"
                                            variant="outlined"
                                            sx={{ width: '100%' }}
                                            required
                                            value={data.title}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="error" variant="h8" component="h8">
                                            {error}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: 'gray' }}
                                            onClick={handleCloseAdd}
                                        >
                                            Huỷ
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ marginLeft: '16px' }}
                                            onClick={handleAdd}
                                        >
                                            Thêm
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Modal>
                    </>

                    {/* Modal Edit */}
                    <>
                        <Modal open={openEdit} onClose={handleCloseEdit}>
                            <Box sx={style}>
                                <Typography variant="h6" component="h6">
                                    Sửa thông tin sản phẩm
                                </Typography>
                                <Grid
                                    container
                                    rowSpacing={2}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                    sx={{ marginTop: '8px' }}
                                >
                                    <Grid item xs={12}>
                                        <TextField
                                            name="title"
                                            label="Tên sản phẩm"
                                            variant="outlined"
                                            sx={{ width: '100%' }}
                                            required
                                            value={data.title}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="error" variant="h8" component="h8">
                                            {errorEdit}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: 'gray' }}
                                            onClick={handleCloseEdit}
                                        >
                                            Huỷ
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ marginLeft: '16px' }}
                                            onClick={handleEdit}
                                        >
                                            Lưu
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Modal>
                    </>

                    {/* Modal Delete */}
                    <Modal open={openDelete} onClose={handleCloseDelete}>
                        <Box sx={style}>
                            <Typography variant="h6" component="h6">
                                Bạn có chắc chắc muốn xoá?
                            </Typography>
                            <Grid
                                container
                                rowSpacing={2}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                sx={{ marginTop: '8px' }}
                            >
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: 'gray' }}
                                        onClick={handleCloseDelete}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ marginLeft: '16px' }}
                                        onClick={handleDelete}
                                    >
                                        Xoá
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>

                    {/* Table */}
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440, width: '100%' }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column, index) => (
                                            <TableCell
                                                key={index}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, fontSize: '14px' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row?._id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id]

                                                    if (column.action) {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                sx={{ fontSize: '14px' }}
                                                            >
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    onClick={() => handleOpenEdit(row._id)}
                                                                >
                                                                    Sửa
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    sx={{ marginLeft: '10px' }}
                                                                    onClick={() => handleOpenDelete(row._id)}
                                                                >
                                                                    Xoá
                                                                </Button>
                                                            </TableCell>
                                                        )
                                                    }

                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            sx={{ fontSize: '14px' }}
                                                        >
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </>
            )}
        </>
    )
}

export default AdminCategory
