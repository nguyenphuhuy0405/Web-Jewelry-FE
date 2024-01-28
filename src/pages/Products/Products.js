import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Grid from '@mui/material/Unstable_Grid2'

import styles from './Products.module.scss'
import CardProduct from '~/component/CardProduct/CardProduct'
import * as productServices from '~/services/productServices'
import Button from '~/component/Button/Button'
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
    console.log('>>>id: ', id)

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
                    <div className="row sm-gutter">
                        <div className={`col l-12 m-12 c-12`}>
                            <div className={cx('filter')}>
                                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                                <div className={cx('search')}>
                                    <input
                                        className={cx('searchInput')}
                                        placeholder="Nhập từ khoá..."
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button normal className={cx('searchBtn')} onClick={handleSearch}>
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {products.length > 0 ? (
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                {products.map((product) => (
                                    <Grid xs={6} sm={6} md={3} key={product._id}>
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
                            </Grid>
                        ) : (
                            <div>Chưa có sản phẩm</div>
                        )}
                    </div>

                    <Stack alignItems="center">
                        <Pagination
                            count={totalPage}
                            color="primary"
                            size="large"
                            shape="rounded"
                            page={currentPage}
                            onChange={handleChange}
                        />
                    </Stack>
                </div>
            )}
        </>
    )
}

export default Products
