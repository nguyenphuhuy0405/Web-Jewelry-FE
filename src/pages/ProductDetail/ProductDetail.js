import classNames from 'classnames/bind'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Rating from '@mui/material/Rating'

import { UserContext } from '~/context/UserContext'
import Button from '~/component/Button/Button'
import SlideProduct from '~/component/SliderProduct/SliderProduct'
import * as productServices from '~/services/productServices'
import * as inventoryServices from '~/services/inventoryServices'
import formatPrice from '~/hooks/formatPrice'
import * as cartServices from '~/services/cartServices'
import styles from '../ProductDetail/ProductDetail.module.scss'
import formatTime from '~/hooks/formatTime'

const cx = classNames.bind(styles)

function ProductDetail() {
    const { user } = useContext(UserContext)
    const [product, setProduct] = useState({})
    const [stock, setStock] = useState(0)
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    let description = product?.description ? product?.description.split('\n') : null
    const [data, setData] = useState({
        star: 5,
        content: '',
        productId: '',
    })
    const { star, content } = data
    console.log('product: ', product)
    console.log('data: ', data)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleAddToCart = async (event, productId) => {
        event.preventDefault()
        const res = await cartServices.addToCart(productId)
        if (res.status === 200) {
            console.log('res: ', res)
            navigate('/cart')
        } else {
            console.log('error: ', res.data.message)
        }
    }

    const handleComment = async () => {
        postCommentApi(data)
    }

    useEffect(() => {
        setLoading(true)
        getProductApi(slug)
        setLoading(false)
    }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

    const getProductApi = async (slug) => {
        const res = await productServices.getProduct(slug)
        console.log('res: ', res)
        if (res.status > 400) {
            setProduct(null)
        } else {
            setProduct(res?.data)
            setData({ ...data, productId: res?.data?._id })
        }
        getInventoryApi(res?.data?._id)
    }

    const getInventoryApi = async (productId) => {
        const res = await inventoryServices.getInventory(productId)
        console.log('res: ', res)
        if (res?.status === 200) {
            console.log('quantity: ', res?.data?.quantity)
            setStock(res?.data?.quantity)
        }
    }

    const postCommentApi = async (data) => {
        const res = await productServices.comment(data)
        if (res?.status === 200) {
            const updateProduct = {
                ...product,
                comments: [...product?.comments, res?.data],
            }
            setProduct(updateProduct)
            setData({ ...data, content: '' })
        } else {
            console.log('error: ', res.data.message)
        }
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : product ? (
                <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12} sm={12} md={7}>
                                <div className={cx('slider-image')}>
                                    <SlideProduct images={product?.images} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={5}>
                                <div className={cx('info')}>
                                    <h1 className={cx('name')}>{product.title}</h1>
                                    <div className={cx('price')}>{formatPrice(product.price)}</div>
                                    <div className={cx('stock')}>{stock > 0 ? `${stock} có sẵn` : 'Hết hàng'}</div>
                                    <div className={cx('action')}>
                                        <input className={cx('quantity')} type="number" defaultValue={1} min="1" />
                                        <Button
                                            primary
                                            large
                                            className={cx('btn-add')}
                                            onClick={(event) => handleAddToCart(event, product._id)}
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                    </div>
                                    <div className={cx('description')}>
                                        <div className={cx('title')}>Mô tả:</div>
                                        <div className={cx('content')}>
                                            {description && description.map((item, index) => <p key={index}>{item}</p>)}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <Grid item xs={12} sm={12} md={12}>
                        <div className={cx('comment')}>
                            <h1>Comments</h1>
                            <Paper style={{ padding: '40px 20px' }}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={
                                                'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theverge.com%2Ftldr%2F2018%2F10%2F29%2F18039884%2Fjames-cameron-avatar-sequels-papyrus-font-logo-rip&psig=AOvVaw3-Knx3msJDw79O24qwHF8l&ust=1713453955668000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCB7ZzHyYUDFQAAAAAdAAAAABAE'
                                            }
                                        />
                                    </Grid>
                                    <Grid justifyContent="left" item xs zeroMinWidth>
                                        <h4 style={{ margin: 0, textAlign: 'left' }}>{user?.name}</h4>
                                        <Rating name="star" value={star} size="large" onChange={handleChange} />
                                        <TextField
                                            name="content"
                                            value={content}
                                            label="Bình luận"
                                            placeholder="Nhập bình luận"
                                            style={{ padding: '10px 0', width: '100%' }}
                                            multiline
                                            onChange={handleChange}
                                        />
                                        <Button primary large onClick={handleComment}>
                                            Đăng bình luận
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider variant="fullWidth" style={{ margin: '30px 0' }} />

                                {product?.comments && product?.comments.length > 0 ? (
                                    product?.comments.map((item, index) => (
                                        <>
                                            <Grid container wrap="nowrap" spacing={2}>
                                                <Grid item>
                                                    <Avatar
                                                        alt="Remy Sharp"
                                                        src={
                                                            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theverge.com%2Ftldr%2F2018%2F10%2F29%2F18039884%2Fjames-cameron-avatar-sequels-papyrus-font-logo-rip&psig=AOvVaw3-Knx3msJDw79O24qwHF8l&ust=1713453955668000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCB7ZzHyYUDFQAAAAAdAAAAABAE'
                                                        }
                                                    />
                                                </Grid>
                                                <Grid justifyContent="left" item xs zeroMinWidth>
                                                    <h4 style={{ margin: 0, textAlign: 'left' }}>
                                                        {item?.userId?.name || 'Tên'}
                                                    </h4>
                                                    <Rating name="read-only" value={item?.star || 0} readOnly />
                                                    <p style={{ textAlign: 'left' }}>
                                                        {item?.content || 'Thời gian bình luận'}
                                                    </p>
                                                    <p style={{ textAlign: 'left', color: 'gray' }}>
                                                        {formatTime(item?.createdAt) || 'Thời gian bình luận'}
                                                    </p>
                                                </Grid>
                                            </Grid>
                                            <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
                                        </>
                                    ))
                                ) : (
                                    <h2>Không có bình luận</h2>
                                )}
                            </Paper>
                        </div>
                    </Grid>
                </div>
            ) : (
                <h1>Không có sản phẩm này</h1>
            )}
        </>
    )
}

export default ProductDetail
