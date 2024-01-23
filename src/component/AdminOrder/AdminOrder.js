import classNames from 'classnames/bind'

import styles from './AdminOrder.module.scss'

const cx = classNames.bind(styles)

function AdminOrder() {
    return <div className={cx('wrapper')}>Quản lý đơn hàng</div>
}

export default AdminOrder
