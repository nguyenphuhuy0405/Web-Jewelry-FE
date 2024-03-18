import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import Grid from '@mui/material/Grid'

import Button from '~/component/Button/Button'
import SlideProduct from '~/component/SliderProduct/SliderProduct'
import * as productServices from '~/services/productServices'
import formatPrice from '~/hooks/formatPrice'
import * as cartServices from '~/services/cartServices'
import styles from '../ProductDetail/ProductDetail.module.scss'

const cx = classNames.bind(styles)

function ProductDetail() {
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getProductDetailApi(slug)
    }, [slug])

    const getProductDetailApi = async (slug) => {
        setLoading(true)
        const res = await productServices.getProductDetail(slug)
        console.log('res: ', res)
        if (res.status > 400) {
            setProduct(null)
        } else {
            setProduct(res.data)
        }
        setLoading(false)
    }

    const handleAddToCart = async (event, productId) => {
        event.preventDefault()
        const res = await cartServices.addToCart(productId)
        if (res.status === 200) {
            console.log('res: ', res)
            navigate('/cart')
        } else {
            console.log('error: ', res.data.message)
        }
    }

    let description = product?.description ? product?.description.split('\n') : null
    console.log('description: ', description)

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : product ? (
                <div className={cx('wrapper')}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={12} md={7}>
                            <div className={cx('slider-image')}>
                                <SlideProduct images={product?.images} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <div className={cx('info')}>
                                <h1 className={cx('name')}>{product.title}</h1>
                                <div className={cx('price')}>{formatPrice(product.price)}</div>
                                <div className={cx('action')}>
                                    <input className={cx('quantity')} type="number" defaultValue={1} min="1" />
                                    <Button
                                        primary
                                        large
                                        className={cx('btn-add')}
                                        onClick={(event) => handleAddToCart(event, product._id)}
                                    >
                                        Add to cart
                                    </Button>
                                </div>
                                <div className={cx('description')}>
                                    {description && description.map((item, index) => <p key={index}>{item}</p>)}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <h1>Không có sản phẩm này</h1>
            )}
        </>
    )
}

export default ProductDetail
