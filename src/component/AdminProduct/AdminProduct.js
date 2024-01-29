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
import MenuItem from '@mui/material/MenuItem'

import formatPrice from '~/hooks/formatPrice'
import * as productServices from '~/services/productServices'
import * as categoryServices from '~/services/categoryServices'

const columns = [
    { id: '_id', label: 'Id', minWidth: 50 },
    {
        id: 'images',
        label: 'Ảnh sản phẩm',
        minWidth: 70,
        image: true,
    },
    {
        id: 'title',
        label: 'Tên sản phẩm',
        minWidth: 100,
    },
    {
        id: 'price',
        label: 'Giá bán',
        minWidth: 50,
        align: 'right',
        price: true,
    },
    {
        id: 'categoryId',
        label: 'Loại sản phẩm',
        minWidth: 50,
        align: 'right',
        category: true,
    },
    {
        id: 'action',
        label: 'Thao tác',
        minWidth: 100,
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

function AdminProduct() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedRow, setSelectedRow] = useState(null)
    const [loading, setLoading] = useState(true)

    // State Modal Add
    const [openAdd, setOpenAdd] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        brandId: '',
    })
    const [images, setImages] = useState([])

    console.log('categories: ', categories)
    console.log('data: ', data)
    console.log('images: ', images)

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files)
        setImages((prevImages) => [...prevImages, ...selectedImages])
    }

    const handleAdd = () => {
        createProductsApi()
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleOpenAdd = () => setOpenAdd(true)
    const handleCloseAdd = () => {
        setData({
            title: '',
            description: '',
            price: '',
            categoryId: '',
            brandId: '',
        })
        setError('')
        setOpenAdd(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        Promise.all([getCategoriesApi(), getProductsApi()])
            .then((res) => {
                setLoading(false)
            })
            .catch((error) => console.log(`Error in promises ${error}`))
    }, [])

    const getCategoriesApi = async () => {
        const res = await categoryServices.getCategories()
        if (res?.status === 200) {
            setCategories(res?.data)
        }
    }

    const getProductsApi = async () => {
        const res = await productServices.getProducts()
        if (res?.status === 200) {
            console.log('>>>products: ', res?.data)
            setRows(res?.data)
        }
    }

    const createProductsApi = async () => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('categoryId', data.categoryId)
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
        console.log('formData: ', formData)
        const res = await productServices.createProduct(formData)
        if (res?.status === 200) {
            setRows([...rows, res?.data])
            handleCloseAdd()
        } else {
            setError(res?.data?.message)
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
                                <Typography id="modal-modal-title" variant="h4" component="h4">
                                    Thêm sản phẩm
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
                                        <TextField
                                            name="description"
                                            label="Mô tả"
                                            variant="outlined"
                                            sx={{ width: '100%' }}
                                            multiline
                                            minRows={4}
                                            maxRows={4}
                                            value={data.description}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" component="label">
                                            Tải ảnh lên
                                            <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                multiple
                                                type="file"
                                                onChange={handleImageChange}
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="price"
                                            label="Giá bán"
                                            variant="outlined"
                                            required
                                            sx={{ width: '100%' }}
                                            value={data.price}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="categoryId"
                                            required
                                            select
                                            label="Danh mục"
                                            sx={{ width: '100%' }}
                                            onChange={handleChange}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category._id} value={category._id}>
                                                    {category.title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography color="error" variant="h6" component="h6">
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

                    {/* Table */}
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
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

                                                    if (column.image) {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                sx={{ fontSize: '14px' }}
                                                            >
                                                                <img
                                                                    src={process.env.REACT_APP_BASE_URL + value[0]}
                                                                    alt="item"
                                                                    width="70px"
                                                                />
                                                            </TableCell>
                                                        )
                                                    }

                                                    if (column.category) {
                                                        const category = categories.find((item) => item?._id === value)

                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                sx={{ fontSize: '14px' }}
                                                            >
                                                                {category.title}
                                                            </TableCell>
                                                        )
                                                    }

                                                    if (column.action) {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                sx={{ fontSize: '14px' }}
                                                            >
                                                                <Button variant="contained" color="primary">
                                                                    Sửa
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    sx={{ marginLeft: '10px' }}
                                                                >
                                                                    Xoá
                                                                </Button>
                                                            </TableCell>
                                                        )
                                                    }

                                                    if (column.price) {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                sx={{ fontSize: '14px' }}
                                                            >
                                                                {typeof value === 'number' ? formatPrice(value) : value}
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

export default AdminProduct
