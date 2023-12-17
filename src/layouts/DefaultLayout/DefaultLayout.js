import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import Header from '../../component/Header/Header'
import Footer from '~/component/Footer/Footer'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    )
}

export default DefaultLayout
