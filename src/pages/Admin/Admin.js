import { useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import ReceiptIcon from '@mui/icons-material/Receipt'
import InventoryIcon from '@mui/icons-material/Inventory'
import AppsIcon from '@mui/icons-material/Apps'
import ListIcon from '@mui/icons-material/List'
import classNames from 'classnames/bind'

import styles from './Admin.module.scss'
import AdminUser from '~/component/AdminUser/AdminUser'
import AdminOrder from '~/component/AdminOrder/AdminOrder'

const cx = classNames.bind(styles)

function Admin() {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const renderPage = (selectedIndex) => {
        switch (selectedIndex) {
            case 0:
                return <AdminUser />
            case 1:
                return <AdminOrder />
        }
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav')}>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Người dùng" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 1}
                            onClick={(event) => handleListItemClick(event, 1)}
                        >
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Đơn hàng" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemIcon>
                                <InventoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Kho" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 3}
                            onClick={(event) => handleListItemClick(event, 3)}
                        >
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sản phẩm" />
                        </ListItemButton>
                        <ListItemButton
                            selected={selectedIndex === 4}
                            onClick={(event) => handleListItemClick(event, 4)}
                        >
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText primary="Loại sản phẩm" />
                        </ListItemButton>
                    </List>
                </Box>
            </div>
            <div className={cx('container')}>{renderPage(selectedIndex)}</div>
        </div>
    )
}

export default Admin
