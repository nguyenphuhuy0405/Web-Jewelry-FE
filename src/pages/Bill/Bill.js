import classNames from 'classnames/bind'
import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router'

import { Link } from 'react-router-dom'
import styles from './Bill.module.scss'
import formatPrice from '~/hooks/formatPrice'
import * as orderServices from '~/services/orderServices'
import Button from '~/component/Button/Button'

const cx = classNames.bind(styles)

function Bill() {
    const { id } = useParams()
    const [products, setProducts] = useState([])
    const [data, setData] = useState({
        payment: '',
        name: '',
        address: '',
        phoneNumber: '',
        notes: '',
    })
    const [loading, setLoading] = useState(false)
    const { payment, name, address, phoneNumber, notes } = data
    console.log('products: ', products)

    useEffect(() => {
        getOrderApi()
        // eslint-disable-next-line
    }, [])

    const getOrderApi = async () => {
        setLoading(true)
        const res = await orderServices.getOrder(id)
        console.log('cart res: ', res)
        if (res?.status === 200) {
            setProducts(res?.data?.products)
            setData({
                payment: res?.data?.payment,
                name: res?.data?.name,
                address: res?.data?.address,
                phoneNumber: res?.data?.phoneNumber,
                notes: res?.data?.notes,
            })
        }
        setLoading(false)
    }

    const totalPrice = useMemo(() => {
        return (
            products.length > 0 &&
            products.reduce((acc, product) => {
                return acc + product.productId.price * product.quantity
            }, 0)
        )
    }, [products])

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className={cx('wrapper')}>
                    {products.length > 0 ? (
                        <div className={cx('container')}>
                            <div className={cx('information')}>
                                <h3 className={cx('header')}>THÔNG TIN ĐẶT HÀNG</h3>
                                <table className={cx('table')}>
                                    <tbody>
                                        <tr>
                                            <td className={cx('primary')}>Họ tên</td>
                                            <td className={cx('bold')}>{name}</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('primary')}>Địa chỉ</td>
                                            <td className={cx('bold')}>{address}</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('primary')}>Số điện thoại</td>
                                            <td className={cx('bold')}>{phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className={cx('primary')}>Ghi chú</td>
                                            <td className={cx('bold')}>{notes}</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: 'green' }}>
                                                Bạn đã đặt hàng thành công vui lòng đợi hàng giao đến trong ít ngày
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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
                                                            Phương thức giao hàng: {payment}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Button normal to={'/'}>
                                                Quay về cửa hàng
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('empty')}>
                            <p className={cx('text-empty')}>Đặt hàng thất bại</p>
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
export default Bill
