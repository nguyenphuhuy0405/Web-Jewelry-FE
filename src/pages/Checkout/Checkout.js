import classNames from 'classnames/bind'
import { useContext, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router'

import { Link, useNavigate } from 'react-router-dom'
import styles from './Checkout.module.scss'
import formatPrice from '~/hooks/formatPrice'
import * as cartServices from '~/services/cartServices'
import * as orderServices from '~/services/orderServices'
import { UserContext } from '~/context/UserContext'
import * as bankServices from '~/services/bankServices'
import { useLocation } from 'react-router-dom'
import crypto from 'crypto-browserify'

const cx = classNames.bind(styles)

function generateSignature(data) {
    const { amount, cancelUrl, description, orderCode, returnUrl } = data
    const formattedData = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`
    const sortedData = formattedData.split('&').sort().join('&')

    // Tạo chữ ký HMAC_SHA256
    const signature = crypto
        .createHmac('sha256', process.env.REACT_APP_CHECKSUM_KEY_BANK)
        .update(sortedData)
        .digest('hex')

    console.log('signature: ', signature)
    return signature
}

function Checkout() {
    //Const
    const selectedCashPayment = 'Thanh toán khi nhận hàng'
    const selectedOnlinePayment = 'Thanh toán trước'
    const navigate = useNavigate()

    //Get currentUrl
    const currentUrl = window.location.href
    const currentUrlWithoutQuery = currentUrl.split('?')[0]
    console.log('currentPathWithoutQuery: ', currentUrlWithoutQuery)

    //Get queryParams
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idParam = queryParams.get('id') || null
    const statusParam = queryParams.get('status') || null
    console.log('idParam: ', idParam)
    console.log('statusParam: ', statusParam)

    //State
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const [data, setData] = useState({
        cartId: id,
        payment: selectedCashPayment,
        name: user.name,
        address: user.address,
        phoneNumber: user.phoneNumber,
        notes: '',
    })
    const [loading, setLoading] = useState(false)
    const { payment, name, address, phoneNumber, notes } = data

    const totalPrice = useMemo(() => {
        return (
            products.length > 0 &&
            products.reduce((acc, product) => {
                return acc + product.productId.price * product.quantity
            }, 0)
        )
    }, [products])

    //Tạo mã đơn hàng cho giao dịch
    const orderCode = useMemo(() => {
        const timestamp = Date.now().toString() // Lấy thời gian hiện tại dưới dạng chuỗi
        const randomNum = Math.floor(Math.random() * 1000000000) // Tạo số ngẫu nhiên từ 0 đến 999999999
        const uniqueId = timestamp + randomNum // Kết hợp thời gian và số ngẫu nhiên
        return parseInt(uniqueId.substring(0, 10)) // Lấy 10 số cuối
    }, [])
    console.log('>>>orderCode: ', orderCode)

    // Tạo nội dung đơn hàng cho giao dịch
    const orderDescription = `DONHANG${orderCode}`

    console.log('>>>payment: ', payment)

    useEffect(() => {
        getCartApi()
    }, [])

    useEffect(() => {
        console.log('get payment link info: ', idParam, statusParam)
        if (idParam && statusParam === 'PAID') {
            getPaymentLinkInfoApi(idParam)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idParam, statusParam])

    const getCartApi = async () => {
        setLoading(true)
        const res = await cartServices.getCart()
        console.log('cart res: ', res)
        if (res.status === 200) {
            setProducts(res?.data?.products)
        }
        setLoading(false)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleCheckout = async (e) => {
        e.preventDefault()
        switch (payment) {
            case selectedCashPayment:
                if (name === '' || address === '' || phoneNumber === '') {
                    setError('Please enter your information')
                } else {
                    orderFromCartApi(data)
                }
                break
            case selectedOnlinePayment:
                createPaymentLinkApi()
                break
            default:
                setError('Please choose payment method')
                break
        }
    }

    const orderFromCartApi = async (data) => {
        const res = await orderServices.orderFromCart(data)
        console.log('res: ', res)
        if (res?.status === 200) {
            navigate(`/bill/${res.data._id}`)
        } else {
            setError(res?.data?.message)
        }
    }

    const createPaymentLinkApi = async () => {
        const dataPayment = {
            orderCode,
            amount: totalPrice,
            description: orderDescription,
            buyerName: name,
            buyerPhone: phoneNumber,
            items: [],
            cancelUrl: `${currentUrlWithoutQuery}`,
            returnUrl: `${currentUrlWithoutQuery}`,
        }
        //Thêm chữ ký HMAC_SHA256
        dataPayment.signature = generateSignature(dataPayment)
        console.log('dataPayment: ', dataPayment)
        const res = await bankServices.createPaymentLink(dataPayment)
        console.log('createPaymentLink res: ', res)
        if (res?.data?.checkoutUrl) {
            console.log('createPaymentLink res.data.checkoutUrl: ', res?.data?.checkoutUrl)
            window.location.href = res?.data?.checkoutUrl
        }
    }

    const getPaymentLinkInfoApi = async () => {
        const res = await bankServices.getPaymentLinkInfo(idParam)
        console.log('api getPaymentLinkInfo data: ', res.data)
        if (res?.data?.amountPaid >= totalPrice && res?.data?.status === 'PAID') {
            console.log('orderFromCartApi: ')
            orderFromCartApi({
                ...data,
                payment: selectedOnlinePayment,
            })
        }
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={cx('wrapper')}>
                    {products.length > 0 ? (
                        <div className={cx('container')}>
                            <div className={cx('information')}>
                                <h3 className={cx('header')}>THÔNG TIN THANH TOÁN</h3>
                                <div className={cx('form')}>
                                    <div className={cx('box')}>
                                        <p className={cx('text')}>Họ và tên</p>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            value={name}
                                            name="name"
                                            onChange={handleChange}
                                            placeholder="Họ và tên"
                                        />
                                    </div>
                                    <div className={cx('box')}>
                                        <p className={cx('text')}>Địa chỉ</p>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            value={address}
                                            name="address"
                                            onChange={handleChange}
                                            placeholder="Địa chỉ"
                                        />
                                    </div>
                                    <div className={cx('box')}>
                                        <p className={cx('text')}>Số điện thoại</p>
                                        <input
                                            className={cx('input')}
                                            type="text"
                                            value={phoneNumber}
                                            name="phoneNumber"
                                            onChange={handleChange}
                                            placeholder="Số điện thoại"
                                        />
                                    </div>

                                    <div className={cx('box')}>
                                        <p className={cx('text')}>Ghi chú đơn hàng (tuỳ chọn)</p>
                                        <textarea
                                            rows="5"
                                            className={cx('input', 'input-are')}
                                            value={notes}
                                            name="notes"
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                        />
                                    </div>
                                    <p className={cx('error')} style={{ color: 'red' }}>
                                        {error}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('bill')}>
                                <div className={cx('wrapper-bill')}>
                                    <div className={cx('bill-info')}>
                                        <div className={cx('data-table')}>
                                            <h3>ĐƠN HÀNG CỦA BẠN</h3>
                                            <table className={cx('table')}>
                                                <thead>
                                                    <tr className={cx('boder-bold', 'primary')}>
                                                        <th>SẢN PHẨM</th>
                                                        <th>TỔNG</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map((product, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className={cx('product-item')}>
                                                                    <p className={cx('product-title')}>
                                                                        {product?.productId?.title}
                                                                    </p>
                                                                    <div
                                                                        className={cx('quantity')}
                                                                    >{` × ${product?.quantity}`}</div>
                                                                </td>
                                                                <td className={cx('bold')}>
                                                                    {formatPrice(
                                                                        product.productId.price * product.quantity,
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    <tr>
                                                        <td className={cx('primary')}>Tổng phụ</td>
                                                        <td className={cx('bold')}>{formatPrice(totalPrice)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className={cx('bold', 'not-back')}>Giao hàng</td>
                                                        <td>Giao hàng miễn phí</td>
                                                    </tr>
                                                    <tr className={cx('boder-bold', 'primary')}>
                                                        <td>Tổng</td>
                                                        <td className={cx('bold')}>{formatPrice(totalPrice)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} className={cx('bold')}>
                                                            Phương thức giao hàng
                                                            <div>
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    checked={payment === selectedCashPayment}
                                                                    value={selectedCashPayment}
                                                                    onChange={handleChange}
                                                                />
                                                                {selectedCashPayment}
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    value={selectedOnlinePayment}
                                                                    onChange={handleChange}
                                                                />
                                                                Thanh toán trước qua mã QR
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button className={cx('btn-pay')} type="submit" onClick={handleCheckout}>
                                                <span>Đặt hàng</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('empty')}>
                            <p className={cx('text-empty')}>
                                Không thể thanh toán khi không có sản phẩm nào trong giỏ hàng.
                            </p>
                            <Link to="/">
                                <button className={cx('btn-back')}>Quay về cửa hàng</button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
export default Checkout
