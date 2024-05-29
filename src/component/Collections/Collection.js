import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Collections.module.scss'
import images from '~/assets/images'
import Grid from '@mui/material/Unstable_Grid2'

const cx = classNames.bind(styles)

function Collections() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('name')}>Bộ sưu tập</h2>
            <ul className={cx('list')}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid xs={12} sm={6} md={6}>
                        <li className={cx('item')}>
                            <Link to="/">
                                <img className={cx('item-img')} src={images.collections[0]} alt="collection" />
                            </Link>
                            <h3 className={cx('item-title')}>SUNFLOWER COLLECTION</h3>
                        </li>
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                        <li className={cx('item')}>
                            <Link to="/">
                                <img className={cx('item-img')} src={images.collections[1]} alt="collection" />
                            </Link>
                            <h3 className={cx('item-title')}>LOTUS COLLECTION</h3>
                        </li>
                    </Grid>
                </Grid>
            </ul>
        </div>
    )
}

export default Collections
