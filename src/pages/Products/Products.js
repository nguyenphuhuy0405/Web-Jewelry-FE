import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import styles from './Products.module.scss'
import CardProduct from '~/component/CardProduct/CardProduct'
import * as productServices from '~/services/productServices'
import Button from '~/component/Button/Button'

const cx = classNames.bind(styles)
function Products() {
    const [products, setProducts] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState(null)
    const [search, setSearch] = useState(null)
    const [searchValue, setSearchValue] = useState(null)

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
        // Thay thế khoảng trắng bằng dấu "-" và biến thành viết thường
        const formatSearch = search.toLowerCase().replace(/\s+/g, '-')
        setSearchValue(formatSearch)
    }

    useEffect(() => {
        let fetchApi = async () => {
            let res = await productServices.getListOfProduct(currentPage, filter, searchValue)
            console.log('res: ', res)
            if (res?.data) {
                setProducts(res.data)
                setTotalPage(res.totalPage)
            }
        }
        fetchApi()
    }, [currentPage, filter, searchValue])

    return (
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
                    products.map((product) => (
                        <div className="col l-3 m-4 c-6" key={product._id}>
                            <CardProduct
                                id={product._id}
                                slug={product.slug}
                                title={product.title}
                                price={product.price}
                                img1={product.images[0]}
                                img2={product.images[1]}
                            />
                        </div>
                    ))
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

            {/* <div className={cx('pagination')}>
                {pages.length > 1 ? (
                    <>
                        <Button small primary onClick={() => setCurrentPage(1)}>
                            &lt;&lt;
                        </Button>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                small
                                primary
                                disabled={page === currentPage}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button small primary onClick={() => setCurrentPage(totalPage)}>
                            &gt;&gt;
                        </Button>
                    </>
                ) : (
                    <></>
                )}
            </div> */}
        </div>
    )
}

export default Products
