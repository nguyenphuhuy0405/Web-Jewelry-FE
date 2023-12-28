import Button from '~/component/Button/Button'
import classNames from 'classnames/bind'

import styles from './CardProduct.module.scss'

const cx = classNames.bind(styles)

function ProductCard({ title, price, img }) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-wrapper')}>
                <img src={img} alt="img" className={cx('img')} />
            </div>
            <div className={cx('info')}>
                <div className={cx('name')}>{title}</div>
                <div className={cx('price')}>{VND.format(price)}</div>
                <Button large primary className={cx('btn')}>
                    Add to cart
                </Button>
            </div>
        </div>
    )
}

export default ProductCard
