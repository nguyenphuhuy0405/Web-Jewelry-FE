import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './CardProduct.module.scss'
import Button from '~/component/Button/Button'
import formatPrice from '~/hooks/formatPrice'
import * as cartServices from '~/services/cartServices'

const cx = classNames.bind(styles)

function CardProduct({ id, slug, title, price, img1, img2 }) {
    const handleAddToCart = async (event, productId) => {
        event.preventDefault()
        const res = await cartServices.addToCart(productId)
        if (res.status > 400) {
            console.log('error: ', res.data.message)
        } else {
            console.log('res: ', res)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Link to={`/products/${slug}`}>
                <div className={cx('img-wrapper')}>
                    <img src={process.env.REACT_APP_BASE_URL + img1} alt="img" className={cx('img', 'img1')} />
                    <img src={process.env.REACT_APP_BASE_URL + img2} alt="img" className={cx('img', 'img2')} />
                </div>
                <div className={cx('info')}>
                    <div className={cx('name')}>{title}</div>
                    <div className={cx('price')}>{formatPrice(price)}</div>
                    <div className={cx('action')}>
                        <Button large primary onClick={(e) => handleAddToCart(e, id)}>
                            Add to cart
                        </Button>
                        <Button large primary ml>
                            Buy now
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardProduct
