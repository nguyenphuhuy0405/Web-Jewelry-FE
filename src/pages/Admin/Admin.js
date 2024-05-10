import { useState } from 'react'
import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import ReceiptIcon from '@mui/icons-material/Receipt'
import InventoryIcon from '@mui/icons-material/Inventory'
import AppsIcon from '@mui/icons-material/Apps'
import ListIcon from '@mui/icons-material/List'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import classNames from 'classnames/bind'

import styles from './Admin.module.scss'
import AdminUser from '~/component/AdminUser/AdminUser'
import AdminOrder from '~/component/AdminOrder/AdminOrder'
import AdminInventory from '~/component/AdminInventory/AdminInventory'
import AdminProduct from '~/component/AdminProduct/AdminProduct'
import AdminAnalyze from '~/component/AdminAnalyze/AdminAnalyze'
import HomeIcon from '@mui/icons-material/Home'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import { useNavigate } from 'react-router-dom'
import AdminCategory from '~/component/AdminCategory/AdminCategory'

const cx = classNames.bind(styles)

const drawerWidth = 240

const ADMIN_ANALYZE_INDEX = 0
const ADMIN_USER_INDEX = 1
const ADMIN_ORDER_INDEX = 2
const ADMIN_INVENTORY_INDEX = 3
const ADMIN_PRODUCT_INDEX = 4
const ADMIN_CATEGORY_INDEX = 5

function Admin(props) {
    const [selectedIndex, setSelectedIndex] = useState(ADMIN_ANALYZE_INDEX)
    const { window } = props
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [isClosing, setIsClosing] = React.useState(false)

    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
    }

    const handleDrawerClose = () => {
        setIsClosing(true)
        setMobileOpen(false)
    }

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false)
    }

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen)
        }
    }

    const drawer = (
        <div>
            <List component="nav" aria-label="main mailbox folders">
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <ListItemButton onClick={handleBack}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trang Chủ" />
                    </ListItemButton>
                </Toolbar>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === ADMIN_ANALYZE_INDEX}
                    onClick={(event) => handleListItemClick(event, ADMIN_ANALYZE_INDEX)}
                >
                    <ListItemIcon>
                        <LeaderboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thống kê" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === ADMIN_USER_INDEX}
                    onClick={(event) => handleListItemClick(event, ADMIN_USER_INDEX)}
                >
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Người dùng" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === ADMIN_ORDER_INDEX}
                    onClick={(event) => handleListItemClick(event, ADMIN_ORDER_INDEX)}
                >
                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === ADMIN_INVENTORY_INDEX}
                    onClick={(event) => handleListItemClick(event, ADMIN_INVENTORY_INDEX)}
                >
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Kho" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === ADMIN_PRODUCT_INDEX}
                    onClick={(event) => handleListItemClick(event, ADMIN_PRODUCT_INDEX)}
                >
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sản phẩm" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === ADMIN_CATEGORY_INDEX}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Loại sản phẩm" />
                </ListItemButton>
            </List>
        </div>
    )

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined

    const renderPage = (selectedIndex) => {
        switch (selectedIndex) {
            case ADMIN_ANALYZE_INDEX:
                return <AdminAnalyze />
            case ADMIN_USER_INDEX:
                return <AdminUser />
            case ADMIN_ORDER_INDEX:
                return <AdminOrder />
            case ADMIN_INVENTORY_INDEX:
                return <AdminInventory />
            case ADMIN_PRODUCT_INDEX:
                return <AdminProduct />
            case ADMIN_CATEGORY_INDEX:
                return <AdminCategory />
            default:
                return <></>
        }
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    return (
        <div className={cx('wrapper')}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Quản trị hệ thống
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    {renderPage(selectedIndex)}
                </Box>
            </Box>
        </div>
    )
}

export default Admin
