import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import TippyHeadless from '@tippyjs/react/headless'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { UserContext } from '~/context/UserContext'
import { Wrapper as PopperWrapper } from '~/component/Popper/Popper'
import styles from './Header.module.scss'
import { CartIcon, SearchIcon } from '../Icons/Icons'
import Popup from '~/component/Popup/Popup'
import Button from '~/component/Button/Button'
import Image from '~/component/Image/Image'
import * as categoryServices from '~/services/categoryServices'

const cx = classNames.bind(styles)

function Header() {
    const { user, logout } = useContext(UserContext)
    const [categories, setCategories] = useState([])
    console.log('>>>> user: ', user)
    let navigate = useNavigate()

    useEffect(() => {
        const fetchApi = async () => {
            const res = await categoryServices.getListOfCategory()
            if (res?.status === 200) {
                let categories = res?.data
                categories.map((item) => {
                    return (item.path = `/collections/${item._id}`)
                })
                setCategories(categories)
            }
        }

        fetchApi()
    }, [])
    console.log('>>>categoryItems', categories)

    const handleLogout = async () => {
        logout()
        navigate('/')
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('container')}>
                    <div className={cx('logo')}>
                        <Link to={'/'}>
                            <img
                                className={cx('logo-img')}
                                src="https://heliosjewels.vn/cdn/shop/files/logo_500x.png?v=1652960279"
                                alt="Heliosjewels.vn"
                            />
                        </Link>
                    </div>
                    <div className={cx('action')}>
                        <Button to="/products" small leftIcon={<SearchIcon />} />
                        <Button to="/cart" small ml leftIcon={<CartIcon />} />
                        {user?.auth === true ? (
                            <>
                                <div className={cx('user-info')}>
                                    <span className={cx('user-name')}>{user && user.name}</span>
                                    <TippyHeadless
                                        placement="bottom"
                                        interactive
                                        delay={[200, 200]}
                                        render={(attrs) => (
                                            <div className={cx('user-menu')} tabIndex="-1" {...attrs}>
                                                <PopperWrapper>
                                                    {user?.isAdmin && (
                                                        <Button to="/admin" hover normal uppercase>
                                                            Admin
                                                        </Button>
                                                    )}
                                                    <Button hover normal uppercase onClick={handleLogout}>
                                                        Logout
                                                    </Button>
                                                </PopperWrapper>
                                            </div>
                                        )}
                                    >
                                        <Image
                                            className={cx('user-avatar')}
                                            fallback="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                            alt="Nguyễn Văn A"
                                            src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/121c8f1f720a8b9a8b6729457abe2d42~c5_100x100.jpeg?x-expires=1699794000&x-signature=Imt8muc%2ByI8bmY0s54n9xfuzuWc%"
                                        />
                                    </TippyHeadless>
                                </div>
                            </>
                        ) : (
                            <>
                                <Button to="/login" primary normal uppercase>
                                    Login
                                </Button>
                                <Button to="/register" primary normal uppercase>
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <ul className={cx('navbar')}>
                    <Link className={cx('navbar-item')} to={'/products'}>
                        Jewelry
                    </Link>
                    {categories.map((item) => (
                        <Link className={cx('navbar-item')} to={item.path}>
                            {item.title}
                        </Link>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header
