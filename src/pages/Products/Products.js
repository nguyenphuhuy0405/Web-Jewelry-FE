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
    console.log('pages: ', pages)

    useEffect(() => {
        for (let i = 1; i <= totalPage; i++) {
            setPages((pages) => [...pages, i])
        }
    }, [totalPage])

    useEffect(() => {
        let fetchApi = async () => {
            let res = await productServices.getListOfProduct(currentPage)
            console.log('res: ', res)
            if (res?.data) {
                setProducts(res.data)
                setTotalPage(res.totalPage)
            }
        }
        fetchApi()
    }, [currentPage])

    return (
        <div className={cx('wrapper')}>
            <div className="row sm-gutter">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="col l-3 m-4 c-6" key={product._id}>
                            <CardProduct
                                title={product.title}
                                price={product.price}
                                img={process.env.REACT_APP_BASE_URL + product.images[0]}
                            />
                        </div>
                    ))
                ) : (
                    <div>Chưa có sản phẩm</div>
                )}
            </div>

            <div className={cx('pagination')}>
                {pages.length > 1 ? (
                    pages.map((page, index) => (
                        <Button
                            key={index}
                            small
                            primary
                            disabled={page === currentPage}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Products
