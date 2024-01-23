import classNames from 'classnames/bind'
import DataTable from '~/component/DataTable/DataTable'

import styles from './AdminUser.module.scss'

const cx = classNames.bind(styles)

function AdminUser() {
    return (
        <div className={cx('wrapper')}>
            <DataTable />
        </div>
    )
}

export default AdminUser
