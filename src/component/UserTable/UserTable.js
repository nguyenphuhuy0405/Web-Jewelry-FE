import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect } from 'react'

import * as userServices from '~/services/userServices'

const columns = [
    { id: 'id', label: 'Id', minWidth: 70 },
    { id: 'name', label: 'Name', minWidth: 200 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 300,
        align: 'right',
    },
    {
        id: 'phoneNumber',
        label: 'PhoneNumber',
        minWidth: 170,
        align: 'right',
    },
]

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [rows, setRows] = React.useState([])

    useEffect(() => {
        getUserApi()
    }, [])

    const getUserApi = async () => {
        const res = await userServices.getListOfUser()
        if (res?.status === 200) {
            console.log('>>>res: ', res?.data)
            setRows(res?.data)
        }
    }

    const deleteUserApi = async (id) => {
        const res = await userServices.deleteUser(id)
        if (res?.status === 200) {
            setRows(rows.filter((user) => user.id !== id))
        }
    }

    const handleEdit = (id) => {
        console.log('>>>Editing...', id)
    }

    const handleRemove = (id) => {
        console.log('>>>Removing...', id)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell key={index} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell align="left">
                                        <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
                                            <EditIcon style={{ color: 'blue', cursor: 'pointer', fontSize: '20px' }} />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleRemove(row.id)}>
                                            <DeleteIcon style={{ color: 'red', cursor: 'pointer', fontSize: '20px' }} />
                                        </IconButton>
                                    </TableCell>
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
    )
}
