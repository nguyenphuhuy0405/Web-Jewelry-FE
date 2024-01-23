import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import Grid from '@mui/material/Unstable_Grid2'

const cx = classNames.bind(styles)

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6} sm={6} md={3}>
                    <div className={cx('item')}>
                        <div className={cx('title')}>Kết nối với chúng tôi</div>
                        <div className={cx('content')}>
                            <p>
                                Helios là brand phụ kiện thành lập bởi những người có niềm đam mê với trang sức, yêu
                                thích các chế tác được tạo ra từ đôi bàn tay thuần Việt, mong muốn đưa các tác phẩm vươn
                                tầm thế giới.
                            </p>
                            <p>CÔNG TY TNHH SUNROCK</p>
                            <p>
                                Địa chỉ: Số 4, ngõ 104 Lê Thanh Nghị, Phường Bách Khoa, Quận Hai Bà Trưng, Thành phố Hà
                                Nội, Việt Nam
                            </p>
                            <p>Mã số thuế: 0109889605</p>
                            <p>Hotline hỗ trợ: </p>
                            <p>- Hà Nội: 0964.302.899</p>
                            <p>- Hồ Chí Minh: 0794.302.899</p>
                            <p>Phản Ánh Chất Lượng Dịch Vụ : 0981.956.116</p>
                            <p>Email: support@heliosjewels.vn</p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} sm={6} md={3}>
                    <div className={cx('item')}>
                        <div className={cx('title')}>Chăm sóc khách hàng</div>
                        <ul className={cx('content')}>
                            <li className={cx('item')}>Hướng dẫn thanh toán</li>
                            <li className={cx('item')}>Giao hàng</li>
                            <li className={cx('item')}>Chính sách bảo hành</li>
                            <li className={cx('item')}>Chính sách bảo mật</li>
                        </ul>
                    </div>
                </Grid>
                <Grid xs={6} sm={6} md={3}>
                    <div className={cx('item')}>
                        <div className={cx('title')}>Về chúng tôi</div>
                        <ul className={cx('content')}>
                            <li className={cx('item')}>Câu chuyện của Helios</li>
                            <li className={cx('item')}>Hệ thống cửa hàng</li>
                            <li className={cx('item')}>Tuyển dụng</li>
                            <li className={cx('item')}>Membership by Helios</li>
                        </ul>
                    </div>
                </Grid>
                <Grid xs={6} sm={6} md={3}>
                    <div className={cx('item')}>
                        <div className={cx('title')}>Dành cho khách hàng</div>
                        <ul className={cx('content')}>
                            <li className={cx('item')}>Tin tức</li>
                            <li className={cx('item')}>Kiến thức thời trang</li>
                            <li className={cx('item')}>Hướng dẫn và quy định</li>
                            <li className={cx('item')}>Hướng dẫn bảo quản sản phẩm</li>
                        </ul>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
