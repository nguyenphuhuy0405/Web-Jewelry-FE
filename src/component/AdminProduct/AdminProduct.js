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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Skeleton from '@mui/material/Skeleton'

import formatPrice from '~/hooks/formatPrice'
import fuseSearch from '~/hooks/fuseSearch'
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

function AdminProduct() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [initRows, setInitRows] = useState([])
    const [rows, setRows] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedRow, setSelectedRow] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(null)

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
    const [previews, setPreviews] = useState([])

    // State Modal Edit
    const [openEdit, setOpenEdit] = useState(false)
    const [errorEdit, setErrorEdit] = useState('')
    const [selectedImage, setSelectedImage] = useState(1)

    // State Modal Delete
    const [openDelete, setOpenDelete] = useState(false)

    // Const
    const selectedOldImages = 1
    const selectedNewImages = 2

    // console.log('>>>rows: ', rows)
    // console.log('>>>selectedRow: ', selectedRow)
    // console.log('>>>data: ', data)
    console.log('>>>images: ', images)
    // // console.log('>>>selectedImage: ', typeof selectedImage, selectedImage)
    console.log('>>>previews: ', previews)

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files)
        setImages((prevImages) => [...prevImages, ...selectedImages])
    }

    // Modal Add
    const handleAdd = () => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('categoryId', data.categoryId)
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }
        console.log('formData: ', formData)
        createProductApi(formData)
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
        setImages([])
        setPreviews([])
        setError('')
        setOpenAdd(false)
    }

    // Modal Edit
    const handleOpenEdit = (id) => {
        let row = rows.find((product) => product._id === id)
        setSelectedRow(row)
        setData({
            title: row?.title,
            description: row?.description,
            price: row?.price,
            categoryId: row?.categoryId,
        })
        setImages(row?.images)
        setOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setData({
            title: '',
            description: '',
            price: '',
            categoryId: '',
            brandId: '',
        })
        setImages([])
        setPreviews([])
        setSelectedImage(1)
        setErrorEdit('')
        setOpenEdit(false)
    }

    const handleEdit = () => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('categoryId', data.categoryId)
        console.log('selectedImage: ', selectedImage)
        switch (selectedImage) {
            case selectedOldImages:
                console.log('Để ảnh cũ')
                break
            case selectedNewImages:
                console.log('Tải ảnh mới')
                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i])
                }
                break
            default:
                console.log('Không có lựa chọn này')
                break
        }
        console.log('formData: ', formData)
        updateProductApi(selectedRow._id, formData)
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
        deleteProductApi(selectedRow?._id)
    }

    //Table
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    //Search handle
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        if (e.target.value === '') {
            setRows(initRows)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.length > 0) {
            const options = {
                keys: ['_id', 'title'],
            }
            const items = fuseSearch(rows, options, search)
            setRows(items)
        } else {
            setRows(initRows)
        }
    }

    //Tạo Object URLs
    useEffect(() => {
        // Create an array to store Object URLs
        const objectUrls = []

        // Generate Object URLs for each image in the 'images' array
        if (images && images.length > 0) {
            const newPreviews = images.map((image) => {
                if (image instanceof Blob || image instanceof File) {
                    const objectUrl = URL.createObjectURL(image)
                    objectUrls.push(objectUrl)
                    return objectUrl
                }
                return null
            })

            console.log('newPreviews: ', newPreviews)

            // Update the state with the new previews
            setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews.filter((url) => url !== null)])
        }

        // Clean up
        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [images])

    useEffect(() => {
        Promise.all([getCategoriesApi(), getProductsApi()])
            .then((res) => {
                setLoading(false)
            })
            .catch((error) => console.log(`Error in promises ${error}`))
    }, [])

    //Call API
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
            setInitRows(res?.data)
            setRows(res?.data)
        }
    }

    const createProductApi = async (formData) => {
        const res = await productServices.createProduct(formData)
        if (res?.status === 200) {
            setRows([...rows, res?.data])
            handleCloseAdd()
        } else {
            setError(res?.data?.message)
        }
    }

    const updateProductApi = async (id, formData) => {
        const res = await productServices.updateProduct(id, formData)
        if (res?.status === 200) {
            setRows(rows.map((row) => (row._id === id ? res?.data : row)))
            handleCloseEdit()
        } else {
            setError(res?.data?.message)
        }
    }

    const deleteProductApi = async (id) => {
        const res = await productServices.deleteProduct(id)
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
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                label="Nhập tên sản phẩm hoặc mã sản phẩm"
                                type="search"
                                value={search}
                                onChange={handleChangeSearch}
                                size="small"
                            />
                            <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: '8px' }}>
                                Tìm kiếm
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleOpenAdd}
                                sx={{ marginBottom: '16px' }}
                            >
                                Thêm mới
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
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
                                            {rows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {
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
                                                                                src={
                                                                                    value &&
                                                                                    process.env.REACT_APP_BASE_URL +
                                                                                        value[0]
                                                                                }
                                                                                alt="item"
                                                                                width="70px"
                                                                            />
                                                                        </TableCell>
                                                                    )
                                                                }

                                                                if (column.category) {
                                                                    const category = categories.find(
                                                                        (item) => item?._id === value,
                                                                    )

                                                                    return (
                                                                        <TableCell
                                                                            key={column.id}
                                                                            align={column.align}
                                                                            sx={{ fontSize: '14px' }}
                                                                        >
                                                                            {category?.title}
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
                                                                                onClick={() => handleOpenEdit(row._id)}
                                                                            >
                                                                                Sửa
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                color="error"
                                                                                sx={{ marginLeft: '10px' }}
                                                                                onClick={() =>
                                                                                    handleOpenDelete(row._id)
                                                                                }
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
                        </Grid>
                    </Grid>
                    {/* Modal Add */}
                    <Modal open={openAdd} onClose={handleCloseAdd}>
                        <Box sx={style}>
                            <Typography variant="h6" component="h6">
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
                                <Grid item xs={6}>
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
                                <Grid item xs={6}>
                                    <ImageList sx={{ width: 100, height: 100 }} cols={1} rowHeight={100}>
                                        {previews && previews.length > 0 ? (
                                            previews.map((previewUrl, index) => (
                                                <ImageListItem key={index}>
                                                    <img
                                                        srcSet={previewUrl}
                                                        src={previewUrl}
                                                        alt={`Preview ${index}`}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            ))
                                        ) : (
                                            <Skeleton variant="rectangular" width={100} height={100} />
                                        )}
                                    </ImageList>
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
                                        {categories &&
                                            categories.length > 0 &&
                                            categories.map((category) => (
                                                <MenuItem key={category._id} value={category._id}>
                                                    {category.title}
                                                </MenuItem>
                                            ))}
                                    </TextField>
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
                                    <Grid item xs={6}>
                                        <FormControl>
                                            <FormLabel>Ảnh</FormLabel>
                                            <RadioGroup
                                                defaultValue={1}
                                                name="radio-buttons-images"
                                                value={selectedImage}
                                                onChange={(e) => setSelectedImage(Number.parseInt(e.target.value))}
                                            >
                                                <FormControlLabel
                                                    value={selectedOldImages}
                                                    control={<Radio />}
                                                    label="Để ảnh cũ"
                                                />
                                                <FormControlLabel
                                                    value={selectedNewImages}
                                                    control={<Radio />}
                                                    label="Tải ảnh mới"
                                                />
                                                {selectedImage === selectedNewImages && (
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
                                                )}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ImageList sx={{ width: 100, height: 100 }} cols={1} rowHeight={100}>
                                            {selectedImage === selectedOldImages && images && images.length > 0 ? (
                                                images.map((image, index) => (
                                                    <ImageListItem key={index}>
                                                        <img
                                                            srcSet={
                                                                process.env.REACT_APP_BASE_URL +
                                                                `${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`
                                                            }
                                                            src={
                                                                process.env.REACT_APP_BASE_URL +
                                                                `${image}?w=164&h=164&fit=crop&auto=format`
                                                            }
                                                            alt={`Preview ${index}`}
                                                            loading="lazy"
                                                        />
                                                    </ImageListItem>
                                                ))
                                            ) : selectedImage === selectedNewImages &&
                                              previews &&
                                              previews.length > 0 ? (
                                                previews.map((previewUrl, index) => (
                                                    <ImageListItem key={index}>
                                                        <img
                                                            srcSet={previewUrl}
                                                            src={previewUrl}
                                                            alt={`Preview ${index}`}
                                                            loading="lazy"
                                                        />
                                                    </ImageListItem>
                                                ))
                                            ) : (
                                                <Skeleton variant="rectangular" width={100} height={100} />
                                            )}
                                        </ImageList>
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
                                            value={data.categoryId}
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
                </>
            )}
        </>
    )
}

export default AdminProduct
