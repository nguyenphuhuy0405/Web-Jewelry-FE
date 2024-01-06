import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import Button from '~/component/Button/Button'
import SlideProduct from '~/component/SliderProduct/SliderProduct'
import * as productServices from '~/services/productServices'
import formatPrice from '~/hooks/formatPrice'
import styles from '../ProductDetail/ProductDetail.module.scss'

const cx = classNames.bind(styles)

function ProductDetail() {
    const [product, setProduct] = useState({})
    const { slug } = useParams()
    useEffect(() => {
        const fetchApi = async () => {
            const res = await productServices.getProductDetail(slug)
            console.log('res: ', res)
            setProduct(res.data)
        }
        fetchApi()
    }, [slug])
    return (
        <div className={`row no-gutters ${cx('wrapper')}`}>
            <div className={`col l-7 m-7 c-12 ${cx('slider-image')}`}>
                <SlideProduct images={product?.images} />
            </div>
            <div className={`col l-5 m-5 c-12 ${cx('info')}`}>
                <h1 className={cx('name')}>{product.title}</h1>
                <div className={cx('price')}>{formatPrice(product.price)}</div>
                <div className={cx('action')}>
                    <input className={cx('quantity')} type="number" defaultValue={1} />
                    <Button primary large className={cx('btn-add')}>
                        Add to cart
                    </Button>
                </div>
                <div className={cx('buy')}>
                    <Button primary large className={cx('btn-buy')}>
                        Buy now
                    </Button>
                </div>
                <div className={cx('description')}>{product.description}</div>
            </div>
        </div>
    )
}

export default ProductDetail
