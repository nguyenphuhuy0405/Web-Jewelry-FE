import classNames from 'classnames/bind'
import styles from './AdminLayout.module.scss'
import * as React from 'react'

const cx = classNames.bind(styles)

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}></div>
            <div className={cx('container')}>{children}</div>
        </div>
    )
}

export default AdminLayout
