import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Button from '~/component/Button/Button'
import SlideProduct from '~/component/SliderProduct/SliderProduct'
import * as productServices from '~/services/productServices'
import formatPrice from '~/hooks/formatPrice'
import * as cartServices from '~/services/cartServices'
import styles from '../ProductDetail/ProductDetail.module.scss'

const cx = classNames.bind(styles)

function ProductDetail() {
    const [product, setProduct] = useState({})
    const { slug } = useParams()
    useEffect(() => {
        const fetchApi = async () => {
            const res = await productServices.getProductDetail(slug)
            console.log('res: ', res)
            if (res.status > 400) {
                setProduct(null)
            } else {
                setProduct(res.data)
            }
        }
        fetchApi()
    }, [slug])

    const handleAddToCart = async (event, productId) => {
        event.preventDefault()
        const res = await cartServices.addToCart(productId)
        if (res.status > 400) {
            console.log('error: ', res.data.message)
        } else {
            console.log('res: ', res)
        }
    }

    let description = product?.description ? product?.description.split('\n') : null
    console.log('description: ', description)

    return product ? (
        <div className={`row no-gutters ${cx('wrapper')}`}>
            <div className={`col l-7 m-12 c-12 ${cx('slider-image')}`}>
                <SlideProduct images={product?.images} />
            </div>
            <div className={`col l-5 m-12 c-12 ${cx('info')}`}>
                <h1 className={cx('name')}>{product.title}</h1>
                <div className={cx('price')}>{formatPrice(product.price)}</div>
                <div className={cx('action')}>
                    <input className={cx('quantity')} type="number" defaultValue={1} />
                    <Button
                        primary
                        large
                        className={cx('btn-add')}
                        onClick={(event) => handleAddToCart(event, product._id)}
                    >
                        Add to cart
                    </Button>
                </div>
                <div className={cx('buy')}>
                    <Button primary large className={cx('btn-buy')}>
                        Buy now
                    </Button>
                </div>
                <div className={cx('description')}>
                    {description && description.map((item, index) => <p key={index}>{item}</p>)}
                </div>
            </div>
        </div>
    ) : (
        <h1>Không có sản phẩm này</h1>
    )
}

export default ProductDetail
