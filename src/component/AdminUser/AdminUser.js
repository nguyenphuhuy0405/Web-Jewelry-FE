import classNames from 'classnames/bind'
import UserTable from '~/component/UserTable/UserTable'

import styles from './AdminUser.module.scss'

const cx = classNames.bind(styles)

function AdminUser() {
    return (
        <div className={cx('wrapper')}>
            <UserTable />
        </div>
    )
}

export default AdminUser
