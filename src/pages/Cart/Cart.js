import CloseIcon from '@mui/icons-material/Close'
import classNames from 'classnames/bind'
import { useEffect, useState, useMemo, useContext } from 'react'

import { UserContext } from '~/context/UserContext'
import * as cartServices from '~/services/cartServices'
import Button from '~/component/Button/Button'
import styles from './Cart.module.scss'
import formatPrice from '~/hooks/formatPrice'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

function Cart() {
    const [products, setProducts] = useState([])
    const [cartId, setCartId] = useState('')
    const { user } = useContext(UserContext)
    const totalPrice = useMemo(() => {
        return (
            products.length > 0 &&
            products.reduce((acc, product) => {
                return acc + product.productId.price * product.quantity
            }, 0)
        )
    }, [products])

    console.log('products', products)
    const getCartApi = async () => {
        const res = await cartServices.getCart()
        console.log('cart res: ', res)
        if (res.status === 200) {
            setProducts(res?.data?.products)
            setCartId(res?.data?._id)
        }
    }

    useEffect(() => {
        getCartApi()
    }, [])

    const handleChangeQuantity = async (productId, quantity) => {
        products.find((product) => {
            if (product.productId._id === productId) {
                console.log('quantity: ', quantity)
                product.quantity = quantity
            }
        })
    }

    const handleUpdate = async (event, productId, quantity) => {
        event.preventDefault()
        const res = await cartServices.updateCart(productId, quantity)
        if (res.status === 200) {
            await getCartApi()
        }
    }

    const handleRemove = async (event, productId) => {
        event.preventDefault()
        const res = await cartServices.removeToCart(productId)
        if (res.status === 200) {
            await getCartApi()
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h1>Giỏ hàng</h1>
            {user?.auth ? (
                products.length > 0 ? (
                    <table className={cx('table')}>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                            <th></th>
                        </tr>
                        {products &&
                            products.map((product) => (
                                <tr key={product?.productId?._id}>
                                    <td>
                                        <div className={cx('item')}>
                                            <img
                                                width={100}
                                                src={process.env.REACT_APP_BASE_URL + product?.productId?.images[0]}
                                                alt="img"
                                            />
                                            <p>{product?.productId?.title}</p>
                                        </div>
                                    </td>
                                    <td>{formatPrice(product?.productId?.price)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            defaultValue={product?.quantity}
                                            min={1}
                                            onChange={(event) =>
                                                handleChangeQuantity(
                                                    product?.productId?._id,
                                                    parseInt(event.target.value),
                                                )
                                            }
                                            style={{ width: '50px' }}
                                        />
                                    </td>
                                    <td>{formatPrice(product?.productId?.price * product?.quantity)}</td>
                                    <td>
                                        <div className={cx('item')}>
                                            <Button
                                                primary
                                                normal
                                                onClick={(event) =>
                                                    handleUpdate(event, product?.productId?._id, product?.quantity)
                                                }
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button
                                                danger
                                                normal
                                                ml
                                                leftIcon={<CloseIcon />}
                                                onClick={(event) => handleRemove(event, product?.productId?._id)}
                                            >
                                                Xoá
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        <tr>
                            <td colSpan={1}>
                                <div className={cx('item')}>
                                    <h2>Tổng tiền: {formatPrice(totalPrice)}</h2>
                                </div>
                            </td>
                            <td colSpan={4} align="center">
                                <Button primary normal to={'/checkout/' + cartId}>
                                    Thanh toán
                                </Button>
                            </td>
                        </tr>
                    </table>
                ) : (
                    <h1>Chưa có sản phẩm nào</h1>
                )
            ) : (
                <h2>
                    Vui lòng đăng nhập{' '}
                    <Link to={'/login'} style={{ color: 'blue' }}>
                        tại đây
                    </Link>
                </h2>
            )}
            <Button to="/products" primary large>
                Tiếp tục mua hàng
            </Button>
        </div>
    )
}

export default Cart
