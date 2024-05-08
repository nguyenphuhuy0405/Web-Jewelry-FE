import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Unstable_Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import styles from './Products.module.scss'
import CardProduct from '~/component/CardProduct/CardProduct'
import * as productServices from '~/services/productServices'
import { useParams } from 'react-router'

const cx = classNames.bind(styles)
function Products() {
    const [products, setProducts] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState(null)
    const [search, setSearch] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    console.log('>>>products', products)

    const handleChangeFilter = (e) => {
        switch (e.target.value) {
            case 'nameAsc':
                setFilter({ name: 'title', value: 'asc' })
                break
            case 'nameDesc':
                setFilter({ name: 'title', value: 'desc' })
                break
            case 'priceAsc':
                setFilter({ name: 'price', value: 'asc' })
                break
            case 'priceDesc':
                setFilter({ name: 'price', value: 'desc' })
                break
            default:
                setFilter(null)
                break
        }
    }

    const handleChange = (e, value) => {
        setCurrentPage(value)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const formatSearch = search
            .toLowerCase() //Thay viết hoa thành viết thường
            .replace(/\s+/g, '-') //Thay thế khoảng trắng bằng dấu "-"
            .replace(/[\u0300-\u036f]/g, '') //Thay có dấu tiếng việt thành không dấu
        setSearchValue(formatSearch)
    }

    useEffect(() => {
        const getProductsApi = async () => {
            setLoading(true)
            let res = await productServices.getProducts(currentPage, filter, searchValue, id)
            console.log('res: ', res)
            if (res?.data) {
                setProducts(res.data)
                setTotalPage(res.totalPage)
            }
            setLoading(false)
        }
        getProductsApi()
    }, [currentPage, filter, searchValue, id])

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={cx('wrapper')}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid xs={12} sm={12} md={12}>
                            <div className={cx('filter')}>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                                    <InputLabel>Sắp xếp theo</InputLabel>
                                    <Select value={filter} label="Age" onChange={handleChangeFilter}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'nameAsc'}>Sắp xếp theo tên từ a - z</MenuItem>
                                        <MenuItem value={'nameDesc'}>Sắp xếp theo tên từ z - a</MenuItem>
                                        <MenuItem value={'priceAsc'}>Sắp xếp theo giá từ thấp đến cao</MenuItem>
                                        <MenuItem value={'priceDesc'}>Sắp xếp theo giá từ cao đến thấp</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Nhập từ khoá tìm kiếm"
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button type="submit" onClick={handleSearch} variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Tìm kiếm
                                </Button>
                            </div>
                        </Grid>

                        {products.length > 0 ? (
                            <>
                                {products.map((product) => (
                                    <Grid xs={6} sm={4} md={3} key={product._id}>
                                        <CardProduct
                                            id={product._id}
                                            slug={product.slug}
                                            title={product.title}
                                            price={product.price}
                                            img1={product.images[0]}
                                            img2={product.images[1]}
                                        />
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            <div>Chưa có sản phẩm</div>
                        )}

                        <Grid xs={12} sm={12} md={12}>
                            <Stack alignItems="center" sx={{ width: '100%' }}>
                                <Pagination
                                    count={totalPage}
                                    color="primary"
                                    size="large"
                                    shape="rounded"
                                    page={currentPage}
                                    onChange={handleChange}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    )
}

export default Products
