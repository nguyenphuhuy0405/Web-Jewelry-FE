import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import styles from './AdminOrder.module.scss'
import * as orderServices from '~/services/orderServices'
import formatPrice from '~/hooks/formatPrice'

const cx = classNames.bind(styles)

const stylesPending = {
    bgcolor: 'gray',
    fontSize: '14px',
    color: 'white',
}

const stylesSuccess = {
    bgcolor: 'green',
    fontSize: '14px',
    color: 'white',
}

const stylesError = {
    bgcolor: 'red',
    fontSize: '14px',
    color: 'white',
}

const columns = [
    { id: '_id', label: 'Id', minWidth: 30 },
    { id: 'name', label: 'Tên người đặt', minWidth: 70 },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại',
        minWidth: 40,
        align: 'right',
    },
    {
        id: 'status',
        label: 'Trạng thái',
        minWidth: 40,
        align: 'right',
    },
    {
        id: 'payment',
        label: 'Phương thức thanh toán',
        minWidth: 40,
        align: 'right',
    },
    {
        id: 'totalPrice',
        label: 'Tổng tiền',
        minWidth: 50,
        typeof: 'number',
        align: 'right',
        price: true,
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

function AdminOrder() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const { _id, name, phoneNumber, address, status, shipping, shippingPrice, payment, products, totalPrice, notes } =
        selectedRow || {}
    console.log('>>>selectedRow: ', selectedRow)

    //Modal Detail
    const handleOpen = (id) => {
        setSelectedRow(rows.find((order) => order._id === id))
        setOpen(true)
    }
    const handleClose = () => {
        setSelectedRow(null)
        setOpen(false)
    }

    const handleConfirm = (id) => {
        confirmOrderApi(id)
    }

    const handleCancel = (id) => {
        cancelOrderApi(id)
    }

    //Table
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    useEffect(() => {
        getOrderApi()
    }, [])

    // Call API
    const getOrderApi = async () => {
        setLoading(true)
        const res = await orderServices.getOrders()
        if (res?.status === 200) {
            setRows(res?.data)
        }
        setLoading(false)
    }

    const confirmOrderApi = async (id) => {
        const res = await orderServices.confirmOrder(id)
        if (res?.status === 200) {
            setRows(
                rows.map((order) => {
                    if (order?._id === id) {
                        return { ...order, status: 'Đã giao hàng' }
                    } else {
                        return order
                    }
                }),
            )
        }
    }

    const cancelOrderApi = async (id) => {
        const res = await orderServices.cancelOrder(id)
        if (res?.status === 200) {
            setRows(
                rows.map((order) => {
                    if (order?._id === id) {
                        return { ...order, status: 'Đã huỷ' }
                    } else {
                        return order
                    }
                }),
            )
        }
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* Modal Detail */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h8" component="h8">
                                Thông tin đơn hàng
                            </Typography>
                            <Grid
                                container
                                rowSpacing={2}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                sx={{ marginTop: '8px' }}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Mã đơn hàng: {_id}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Tên: {name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Số điện thoại: {phoneNumber}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Địa chỉ: {address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Trang thái: {status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Giao hàng: {shipping}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Phí ship: {shippingPrice}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Phương thức thanh toán: {payment}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Sản phẩm:
                                    </Typography>
                                    <table style={{ width: '100%', fontSize: '14px' }}>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                        </tr>
                                        {products &&
                                            products.map((product) => (
                                                <tr>
                                                    <td>{product?.productId?.title}</td>
                                                    <td>{product?.quantity}</td>
                                                </tr>
                                            ))}
                                    </table>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Tổng tiền: {totalPrice}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h8" component="h8">
                                        Ghi chú: {notes}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: 'gray' }}
                                        onClick={handleClose}
                                    >
                                        Đóng
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>

                    {/* Table */}
                    <div className={cx('wrapper')}>
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
                                                        let stylesStatus
                                                        if (row['status'] === 'Đang xử lý') {
                                                            stylesStatus = stylesPending
                                                        } else if (row['status'] === 'Đã giao hàng') {
                                                            stylesStatus = stylesSuccess
                                                        } else if (row['status'] === 'Đã huỷ') {
                                                            stylesStatus = stylesError
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
                                                                        onClick={() => handleOpen(row._id)}
                                                                    >
                                                                        Chi tiết
                                                                    </Button>
                                                                    <Button
                                                                        disabled={row['status'] !== 'Đang xử lý'}
                                                                        variant="contained"
                                                                        color="success"
                                                                        sx={{ marginLeft: '10px' }}
                                                                        onClick={() => handleConfirm(row._id)}
                                                                    >
                                                                        Xác nhận
                                                                    </Button>
                                                                    <Button
                                                                        disabled={row['status'] !== 'Đang xử lý'}
                                                                        variant="contained"
                                                                        color="error"
                                                                        sx={{ marginLeft: '10px' }}
                                                                        onClick={() => handleCancel(row._id)}
                                                                    >
                                                                        Huỷ
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
                                                                    {typeof value === 'number'
                                                                        ? formatPrice(value)
                                                                        : value}
                                                                </TableCell>
                                                            )
                                                        }

                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                sx={stylesStatus}
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
                    </div>
                </>
            )}
        </>
    )
}

export default AdminOrder
