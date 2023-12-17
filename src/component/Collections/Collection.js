import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Collections.module.scss'
import images from '~/assets/images'
import Button from '../Button/Button'

const cx = classNames.bind(styles)

function Collections() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('name')}>Sản phẩm nổi bật</h2>
            <ul className={cx('list')}>
                <li className={cx('item')}>
                    <Link to="/">
                        <img className={cx('item-img')} src={images.collections[0]} alt="collection" />
                    </Link>
                    <h3 className={cx('item-title')}>SUNFLOWER COLLECTION</h3>
                    <Button className={cx('item-btn')} primary large uppercase to={'/collections/sunflower'}>
                        View Collection
                    </Button>
                </li>
                <li className={cx('item')}>
                    <Link to="/">
                        <img className={cx('item-img')} src={images.collections[1]} alt="collection" />
                    </Link>
                    <h3 className={cx('item-title')}>LOTUS COLLECTION</h3>
                    <Button className={cx('item-btn')} primary large uppercase to={'/collections/lotus'}>
                        View Collection
                    </Button>
                </li>
            </ul>
        </div>
    )
}

export default Collections
