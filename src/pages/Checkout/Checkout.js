import classNames from 'classnames/bind'
import { useContext, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router'

import { Link, useNavigate } from 'react-router-dom'
import styles from './Checkout.module.scss'
import formatPrice from '~/hooks/formatPrice'
import * as cartServices from '~/services/cartServices'
import * as orderServices from '~/services/orderServices'
import { UserContext } from '~/context/UserContext'
import Image from '~/component/Image/Image'
import * as bankServices from '~/services/bankServices'
import CircularProgress from '@mui/material/CircularProgress'

const cx = classNames.bind(styles)

// async function checkPaid() {
//     try {
//         const linkCheckPaid =
//             'https://script.googleusercontent.com/macros/echo?user_content_key=cKC_C5bSISlcwV_4VqPi1sB8i0ThXqHVu8eMHJL-GpPtIJTc9moz0j0fZfYjZnJpgjmFuYPqv9vV8bP9NybWEa7S3lSDgD0Mm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO3xgyfgskHfrXCIybr0uv54ZFIe94pKOeAmFcWONRD53i4UFGj8UWJyLp0dU3ksNiPUUgU5AXB9vMFY2uNHBijjoDoz4vgX4Q&lib=MNBI0t6MGSSIW-YA-mt_hYo6SYQlYNf57'
//     } catch {
//         console.log('Loi')
//     }
// }
async function isPaid(amount, description) {
    try {
        let today = new Date()
        let yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)
        // Hàm để định dạng số một chữ số thành hai chữ số bằng cách thêm "0" vào trước
        const formatNumber = (num) => (num < 10 ? `0${num}` : num)
        // Lấy thông tin ngày, tháng, năm của ngày hôm qua
        const year = yesterday.getFullYear()
        const month = formatNumber(yesterday.getMonth() + 1)
        const day = formatNumber(yesterday.getDate())
        const formattedYesterday = `${year}-${month}-${day}`

        const res = await bankServices.getTransactions(formattedYesterday)

        const results = res.records
        console.log('results: ', results)

        const findResult = results.find((item) => {
            return item.amount >= amount && item.description.includes(description)
        })
        console.log('findResult: ', findResult)

        if (findResult) {
            return true
        } else {
            return false
        }
    } catch {
        console.log('Loi')
        return false
    }
}

function Checkout() {
    //Const
    const selectedCashPayment = 'Thanh toán khi nhận hàng'
    const selectedOnlinePayment = 'Thanh toán trước'

    const MY_BANK_INFO = {
        BANK_ID: process.env.REACT_APP_MY_BANK_ID,
        ACCOUNT_NO: process.env.REACT_APP_MY_BANK_ACCOUNT_NO,
    }

    const navigate = useNavigate()
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
    const [loadingPaid, setLoadingPaid] = useState(false)
    const { payment, name, address, phoneNumber, notes } = data

    const totalPrice = useMemo(() => {
        return (
            products.length > 0 &&
            products.reduce((acc, product) => {
                return acc + product.productId.price * product.quantity
            }, 0)
        )
    }, [products])

    //Tạo ID cho giao dịch
    const transactionId = useMemo(() => {
        // Tạo timestamp cho thời điểm hiện tại
        const timestamp = new Date().getTime()

        // Tạo số ngẫu nhiên (ví dụ: từ 1000 đến 9999)
        const randomNum = Math.floor(Math.random() * 9000) + 1000

        // Kết hợp timestamp và số ngẫu nhiên để tạo ID
        const transactionId = `${timestamp}${randomNum}`

        return transactionId
    }, [])

    // Sử dụng hàm để tạo thong tin cho giao dịch thanh toán
    const transactionInfo = `DONHANG${transactionId}`

    const qrCode = `https://img.vietqr.io/image/${MY_BANK_INFO.BANK_ID}-${MY_BANK_INFO.ACCOUNT_NO}-qr_only.png?amount=${totalPrice}&addInfo=${transactionInfo}`

    console.log('>>>payment: ', payment)

    useEffect(() => {
        getCartApi()
    }, [])

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
                orderFromCartApi()
                break
            case selectedOnlinePayment:
                setLoadingPaid(true)
                if (await isPaid(totalPrice, transactionInfo)) {
                    orderFromCartApi()
                } else {
                    alert('Thanh toán thất bại. Vui lý nhận lai sau')
                }
                setLoadingPaid(false)
                break
            default:
                setError('Please choose payment method')
                break
        }
    }

    const orderFromCartApi = async () => {
        if (name === '' || address === '' || phoneNumber === '') {
            setError('Please enter your information')
        } else {
            const res = await orderServices.orderFromCart(
                data.cartId,
                data.payment,
                data.name,
                data.address,
                data.phoneNumber,
                data.notes,
            )
            console.log('res: ', res)
            if (res?.status === 200) {
                navigate(`/bill/${res.data._id}`)
            } else {
                setError(res?.data?.message)
            }
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
                                                                Thanh toán khi nhận hàng
                                                            </div>
                                                            <div>
                                                                <input
                                                                    type="radio"
                                                                    name="payment"
                                                                    value={selectedOnlinePayment}
                                                                    onChange={handleChange}
                                                                />
                                                                Thanh toán trước
                                                            </div>
                                                            {payment === selectedOnlinePayment && (
                                                                <div>
                                                                    <Image src={qrCode} width="200px" height="200px" />
                                                                    <p>
                                                                        Số tiền chuyển khoản: {formatPrice(totalPrice)}
                                                                    </p>
                                                                    <p>Nội dung chuyển khoản: {transactionInfo}</p>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <button className={cx('btn-pay')} type="submit" onClick={handleCheckout}>
                                                {payment === selectedCashPayment ? (
                                                    <span>Đặt hàng</span>
                                                ) : (
                                                    <span className={cx('span-center')}>
                                                        {loadingPaid && <CircularProgress color="inherit" size={20} />}
                                                        Xác nhận tôi đã thanh toán
                                                    </span>
                                                )}
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
