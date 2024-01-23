import classNames from 'classnames/bind'
import Header from '~/component/Header/Header'

import styles from './AdminLayout.module.scss'

const cx = classNames.bind(styles)

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

export default AdminLayout
