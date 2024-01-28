import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import * as userServices from '~/services/userServices'
import EditForm from './EditForm'
import DeleteForm from './DeleteForm'
import AddForm from './AddForm'

const columns = [
    { id: '_id', label: 'Id', minWidth: 70 },
    { id: 'name', label: 'Tên người dùng', minWidth: 130 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 130,
        align: 'right',
    },
    {
        id: 'address',
        label: 'Địa chỉ',
        minWidth: 250,
        align: 'right',
    },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại',
        minWidth: 130,
        align: 'right',
    },
    {
        id: 'action',
        label: 'Thao tác',
        minWidth: 130,
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

export default function AdminUser() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const handleOpenAdd = () => setOpenAdd(true)
    const handleCloseAdd = () => setOpenAdd(false)

    console.log('>>>selectedRow: ', selectedRow)
    const handleOpenEdit = (id) => {
        setSelectedRow(rows.find((user) => user._id === id))
        setOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setSelectedRow(null)
        setOpenEdit(false)
    }

    const handleOpenDelete = (id) => {
        setSelectedRow(rows.find((user) => user._id === id))
        setOpenDelete(true)
    }
    const handleCloseDelete = () => setOpenDelete(false)

    useEffect(() => {
        getUserApi()
    }, [])

    const getUserApi = async () => {
        setLoading(true)
        const res = await userServices.getUsers()
        if (res?.status === 200) {
            console.log('>>>res: ', res?.data)
            setRows(res?.data)
        }
        setLoading(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {/* Modal Add */}
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
                            <AddForm closeEvent={handleCloseAdd} getUserApi={getUserApi} />
                        </Box>
                    </Modal>

                    {/* Modal Edit */}
                    <Modal open={openEdit} onClose={handleCloseEdit}>
                        <Box sx={style}>
                            <EditForm closeEvent={handleCloseEdit} data={selectedRow} getUserApi={getUserApi} />
                        </Box>
                    </Modal>

                    {/* Modal Delete */}
                    <Modal open={openDelete} onClose={handleCloseDelete}>
                        <Box sx={style}>
                            <DeleteForm closeEvent={handleCloseDelete} data={selectedRow} getUserApi={getUserApi} />
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
                                                                    startIcon={<EditIcon />}
                                                                    onClick={() => handleOpenEdit(row?._id)}
                                                                >
                                                                    Sửa
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    startIcon={<DeleteIcon />}
                                                                    onClick={() => handleOpenDelete(row?._id)}
                                                                    sx={{ marginLeft: '10px' }}
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
