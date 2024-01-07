import classNames from 'classnames/bind'

import styles from './Products.module.scss'
import CardProduct from '~/component/CardProduct/CardProduct'
import { useEffect, useState } from 'react'
import * as productServices from '~/services/productServices'
import Button from '~/component/Button/Button'

const cx = classNames.bind(styles)
function Products() {
    const [products, setProducts] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState(null)
    const [search, setSearch] = useState(null)
    const [searchValue, setSearchValue] = useState(null)

    useEffect(() => {
        for (let i = 1; i <= totalPage; i++) {
            setPages((pages) => [...pages, i])
        }
    }, [totalPage])

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
                break
        }
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
                        <select className={cx('filterSelect')} onChange={handleChangeFilter}>
                            <option value={''} hidden>
                                Sắp xếp theo
                            </option>
                            <option value={'nameAsc'}>Sắp xếp theo tên từ a - z</option>
                            <option value={'nameDesc'}>Sắp xếp theo tên từ z - a</option>
                            <option value={'priceAsc'}>Sắp xếp theo giá từ thấp đến cao</option>
                            <option value={'priceDesc'}>Sắp xếp theo giá từ cao đến thấp</option>
                        </select>
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

            <div className={cx('pagination')}>
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
            </div>
        </div>
    )
}

export default Products
