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

import * as inventoryServices from '~/services/inventoryServices'
import * as productServices from '~/services/productServices'

const columns = [
    { id: '_id', label: 'Id', minWidth: 50 },
    { id: 'id', label: 'Mã sản phẩm', minWidth: 50 },
    {
        id: 'images',
        label: 'Ảnh sản phẩm',
        minWidth: 100,
        image: true,
    },
    {
        id: 'title',
        label: 'Tên sản phẩm',
        minWidth: 100,
    },
    {
        id: 'quantity',
        label: 'Số lượng còn',
        minWidth: 50,
    },
    {
        id: 'action',
        label: 'Thao tác',
        minWidth: 200,
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

function AdminInventory() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])
    const [selectedRow, setSelectedRow] = useState(null)
    const [loading, setLoading] = useState(true)

    //State Modal Add
    const [products, setProducts] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [data, setData] = useState({
        productId: '',
        quantity: '1',
    })
    const [error, setError] = useState('')

    //State Modal Quantity - Decrease
    const [openQuantity, setOpenQuantity] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [errorQuantity, setErrorQuantity] = useState('')

    //State Modal Delete
    const [openDelete, setOpenDelete] = useState(false)
    // console.log('rows', rows)
    // console.log('products', products)
    // console.log('data', data)
    console.log('selectedRow', selectedRow)

    //Modal Add
    const handleOpenAdd = () => setOpenAdd(true)
    const handleCloseAdd = () => setOpenAdd(false)
    const handleAdd = () => {
        console.log('>>>data: ', data)
        createInventoryApi()
    }

    //Modal Quantity
    const handleOpenQuantity = (id) => {
        setSelectedRow(rows.find((item) => item._id === id))
        setOpenQuantity(true)
    }
    const handleCloseQuantity = () => {
        setSelectedRow(null)
        setQuantity(1)
        setOpenQuantity(false)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleIncrease = () => {
        let updateQuantity = Number.parseInt(selectedRow?.quantity) + Number.parseInt(quantity)
        console.log('>>>quantity: ', quantity)
        console.log('>>>updateQuantity: ', updateQuantity)
        updateInventoryApi(selectedRow?._id, updateQuantity)
    }

    const handleDecrease = () => {
        let updateQuantity = Number.parseInt(selectedRow?.quantity) - Number.parseInt(quantity)
        console.log('>>>quantity: ', quantity)
        console.log('>>>updateQuantity: ', updateQuantity)
        updateInventoryApi(selectedRow?._id, updateQuantity)
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
        deleteInventoryApi(selectedRow?._id)
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
        Promise.all([getProductsApi(), getInventoriesApi()])
            .then((res) => {})
            .catch((error) => console.log(`Error in promises ${error}`))
        setLoading(false)
    }, [])

    // Call API
    const getProductsApi = async () => {
        const res = await productServices.getProducts()
        console.log('>>>res: ', res)
        if (res?.status === 200) {
            setProducts(res?.data)
        }
    }
    const getInventoriesApi = async () => {
        const res = await inventoryServices.getInventories()
        if (res?.status === 200) {
            let rows = res?.data.map((item) => {
                return {
                    ...item,
                    id: item?.productId?._id,
                    title: item?.productId?.title,
                    images: item?.productId?.images,
                }
            })
            console.log('>>>rows: ', rows)
            setRows(rows)
        }
    }

    const createInventoryApi = async () => {
        const res = await inventoryServices.createInventories(data.productId, data.quantity)
        console.log('>>>res: ', res)
        if (res?.status === 200) {
            setData({
                productId: '',
                quantity: '',
            })
            getInventoriesApi()
            handleCloseAdd()
        } else {
            setError(res?.data?.message)
        }
    }

    const updateInventoryApi = async (id, quantity) => {
        const res = await inventoryServices.updateInventory(id, quantity)
        if (res?.status === 200) {
            setRows(rows.map((item) => (item._id === id ? { ...item, quantity } : item)))
            handleCloseQuantity()
        } else {
            setErrorQuantity(res?.data?.message)
        }
    }

    const deleteInventoryApi = async (id) => {
        const res = await inventoryServices.deleteInventory(id)
        if (res?.status === 200) {
            setRows(rows.filter((item) => item._id !== id))
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
                                <Typography id="modal-modal-title" variant="h6" component="h6">
                                    Tạo kho
                                </Typography>
                                <Grid
                                    container
                                    rowSpacing={2}
                                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                    sx={{ marginTop: '8px' }}
                                >
                                    <Grid item xs={12}>
                                        <TextField
                                            name="productId"
                                            select
                                            label="Mã sản phẩm"
                                            sx={{ width: '100%' }}
                                            onChange={handleChange}
                                        >
                                            {products.map((product) => (
                                                <MenuItem key={product._id} value={product._id}>
                                                    {product.title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="quantity"
                                            label="Số lượng"
                                            type="number"
                                            variant="outlined"
                                            sx={{ width: '100%' }}
                                            inputProps={{ min: 1 }}
                                            required
                                            value={data.quantity}
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

                    {/* Modal Quantity */}
                    <Modal open={openQuantity} onClose={handleCloseQuantity}>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h6">
                                Chỉnh số lượng
                            </Typography>
                            <Grid
                                container
                                rowSpacing={2}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                sx={{ marginTop: '8px' }}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        name="quantity"
                                        label="Số lượng"
                                        type="number"
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                        inputProps={{ min: 1 }}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color="error" variant="h8" component="h8">
                                        {errorQuantity}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: 'gray' }}
                                        onClick={handleCloseQuantity}
                                    >
                                        Huỷ
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={handleDecrease}
                                        sx={{ marginLeft: '16px' }}
                                    >
                                        Giảm
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        sx={{ marginLeft: '16px' }}
                                        onClick={handleIncrease}
                                    >
                                        Tăng
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>

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
                                                                    onClick={() => handleOpenQuantity(row._id)}
                                                                >
                                                                    Số lượng
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

export default AdminInventory
