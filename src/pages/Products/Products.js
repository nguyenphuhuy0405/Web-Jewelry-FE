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
import fuseSearch from '~/hooks/fuseSearch'

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
    const [searchProducts, setSearchProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    console.log('>>>search', search)
    console.log('>>>products', products)
    console.log('>>>searchProducts', searchProducts)

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

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        if (e.target.value === '') {
            setSearchProducts(products)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.length > 0) {
            const options = {
                keys: ['title'],
            }
            const items = fuseSearch(products, options, search)
            setSearchProducts(items)
        } else {
            setSearchProducts(products)
        }
    }

    useEffect(() => {
        getProductsApi()
    }, [currentPage, filter, id])

    const getProductsApi = async () => {
        setLoading(true)
        let res = await productServices.getProducts(currentPage, filter, id)
        console.log('res: ', res)
        if (res?.data) {
            setProducts(res.data)
            setSearchProducts(res.data)
            setTotalPage(res.totalPage)
        }
        setLoading(false)
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={cx('wrapper')}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid xs={12} sm={12} md={12}>
                            <div className={cx('filter')}>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                    <InputLabel>Sắp xếp theo</InputLabel>
                                    <Select value={filter} label="Age" onChange={handleChangeFilter}>
                                        <MenuItem value="">
                                            <em>Gốc</em>
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
                                    size="small"
                                    value={search}
                                    onChange={handleChangeSearch}
                                />
                                <Button
                                    type="submit"
                                    onClick={handleSearch}
                                    variant="contained"
                                    sx={{ marginLeft: '8px' }}
                                >
                                    Tìm kiếm
                                </Button>
                            </div>
                        </Grid>

                        {searchProducts.length > 0 ? (
                            <>
                                {searchProducts.map((product) => (
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
