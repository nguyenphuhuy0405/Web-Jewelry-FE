import { useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { PieChart } from '@mui/x-charts/PieChart'
import * as orderServices from '~/services/orderServices'
import { useEffect } from 'react'
import formatPrice from '~/hooks/formatPrice'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

function AdminAnalyze() {
    const [index, setIndex] = useState(1)
    const [date, setDate] = useState('')
    const [query, setQuery] = useState('')
    const [data, setData] = useState()
    const [rows, setRows] = useState([])
    console.log('date', date)
    console.log('query', query)
    console.log('rows', rows)

    const handleChangeIndex = (event, index) => {
        setDate('')
        setIndex(event.target.value)
    }

    const handleChangeDate = (event) => {
        setDate(event.target.value)
        setQuery(`${event.target.name}=${event.target.value}`)
    }

    const renderType = (index) => {
        switch (index) {
            case 1:
                return (
                    <>
                        <label for="start">Ngày cần tìm:</label>
                        <input type="date" id="day" name="day" value={date} onChange={handleChangeDate} />
                    </>
                )
            case 2:
                return (
                    <>
                        <label for="start">Tháng cần tìm:</label>
                        <input type="month" id="month" name="month" value={date} onChange={handleChangeDate} />
                    </>
                )
            case 3:
                return (
                    <>
                        <label for="start">Năm cần tìm:</label>
                        <input type="year" id="year" name="year" value={date} onChange={handleChangeDate} />
                    </>
                )
        }
    }

    useEffect(() => {
        getOrdersApi()
    }, [query])

    useEffect(() => {
        getAnalyzeApi(query)
    }, [query])

    const getOrdersApi = async () => {
        const res = await orderServices.getOrders()
        if (res?.status === 200) {
            setRows(res?.data)
        }
    }

    const getAnalyzeApi = async (query) => {
        const res = await orderServices.getAnalyze(query)
        if (res?.status === 200) {
            setData(res?.data)
        }
    }

    return (
        <Container maxWidth sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 140,
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Lọc theo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={index}
                                label="Lọc theo"
                                onChange={handleChangeIndex}
                            >
                                <MenuItem value={1}>Ngày</MenuItem>
                                <MenuItem value={2}>Tháng</MenuItem>
                                <MenuItem value={3}>Năm</MenuItem>
                            </Select>
                        </FormControl>
                        {renderType(index)}
                    </Paper>
                </Grid>

                {/* Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Tổng số đơn hàng
                        </Typography>
                        <Typography component="p" variant="h4">
                            {data?.totalOrders || 0}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            {date || 'Thời gian tìm'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card */}
                <Grid item xs={12} md={6} lg={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Tổng doanh thu
                        </Typography>
                        <Typography component="p" variant="h4">
                            {data?.totalSales ? formatPrice(data?.totalSales) : 0}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            {date || 'Thời gian tìm'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 140,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Đơn hàng đã hoàn thành
                        </Typography>
                        <Typography component="p" variant="h4" color="primary">
                            {data?.totalOrderFinish || 0}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            {date || 'Thời gian tìm'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <Typography component="h2" variant="h6" sx={{ color: 'green' }} color="primary" gutterBottom>
                            Đơn hàng đã giao
                        </Typography>
                        <Typography component="p" variant="h4" color="green">
                            {data?.totalOrderConfirm || 0}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            {date || 'Thời gian tìm'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Đơn hàng đang xử lý
                        </Typography>
                        <Typography component="p" variant="h4">
                            {data?.totalOrderNotConfirm || 0}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            {date || 'Thời gian tìm'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Card */}
                <Grid item xs={12} md={6} lg={3}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <Typography component="h2" variant="h6" sx={{ color: 'red' }} gutterBottom>
                            Đơn hàng bị huỷ
                        </Typography>
                        <Typography component="p" variant="h4" sx={{ color: 'red' }}>
                            {data?.totalOrderCancel || 0}
                        </Typography>
                        <Typography color="text.secondary" sx={{ flex: 1 }}>
                            {date || 'Thời gian tìm'}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Pie Chart */}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Biểu đồ tròn trạng thái đơn hàng
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: data?.totalOrderConfirm, label: 'Đã giao', color: 'green' },
                                        {
                                            id: 1,
                                            value: data?.totalOrderNotConfirm,
                                            label: 'Đang xử lý',
                                            color: 'gray',
                                        },
                                        { id: 2, value: data?.totalOrderCancel, label: 'Bị huỷ', color: 'red' },
                                        { id: 3, value: data?.totalOrderFinish, label: 'Đã hoàn thành', color: 'blue' },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Paper>
                </Grid>

                {/* Recent Orders */}
                <Grid item xs={12} md={12} lg={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Các đơn hàng gần đây
                        </Typography>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ngày</TableCell>
                                    <TableCell>Tên khách hàng</TableCell>
                                    <TableCell>Địa chỉ</TableCell>
                                    <TableCell>Phương thức thanh toán</TableCell>
                                    <TableCell align="right">Tổng tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row?.id}>
                                        <TableCell>{row?.createdAt ? row?.createdAt.slice(0, 10) : ''}</TableCell>
                                        <TableCell>{row?.name}</TableCell>
                                        <TableCell>{row?.address}</TableCell>
                                        <TableCell>{row?.payment}</TableCell>
                                        <TableCell align="right">{formatPrice(row?.totalPrice)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AdminAnalyze
