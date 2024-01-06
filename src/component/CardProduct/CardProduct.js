import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './CardProduct.module.scss'
import Button from '~/component/Button/Button'
import formatPrice from '~/hooks/formatPrice'

const cx = classNames.bind(styles)

function CardProduct({ slug, title, price, img1, img2 }) {
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
                    <Button large primary className={cx('btn')}>
                        Add to cart
                    </Button>
                </div>
            </Link>
        </div>
    )
}

export default CardProduct
