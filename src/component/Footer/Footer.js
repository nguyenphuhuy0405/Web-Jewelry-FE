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
                            <ul className={cx('social')}>
                                <li>
                                    <a href="https://www.facebook.com/Heliosjewels.vn?ref=ggads1">
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            className="icon icon-facebook"
                                            viewBox="2 2 16 16"
                                            width="24px"
                                            height="24px"
                                        >
                                            <path
                                                fill="white"
                                                d="M18 10.049C18 5.603 14.419 2 10 2c-4.419 0-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951Z"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/@heliosjewels">
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 48 34"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                        >
                                            <title>Youtube</title>
                                            <defs />
                                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g transform="translate(-567.000000, -302.000000)" fill="white">
                                                    <path d="M586.044,325.269916 L586.0425,311.687742 L599.0115,318.502244 L586.044,325.269916 Z M614.52,309.334163 C614.52,309.334163 614.0505,306.003199 612.612,304.536366 C610.7865,302.610299 608.7405,302.601235 607.803,302.489448 C601.086,302 591.0105,302 591.0105,302 L590.9895,302 C590.9895,302 580.914,302 574.197,302.489448 C573.258,302.601235 571.2135,302.610299 569.3865,304.536366 C567.948,306.003199 567.48,309.334163 567.48,309.334163 C567.48,309.334163 567,313.246723 567,317.157773 L567,320.82561 C567,324.73817 567.48,328.64922 567.48,328.64922 C567.48,328.64922 567.948,331.980184 569.3865,333.447016 C571.2135,335.373084 573.612,335.312658 574.68,335.513574 C578.52,335.885191 591,336 591,336 C591,336 601.086,335.984894 607.803,335.495446 C608.7405,335.382148 610.7865,335.373084 612.612,333.447016 C614.0505,331.980184 614.52,328.64922 614.52,328.64922 C614.52,328.64922 615,324.73817 615,320.82561 L615,317.157773 C615,313.246723 614.52,309.334163 614.52,309.334163 L614.52,309.334163 Z" />
                                                </g>
                                                <g transform="translate(-1659.000000, -479.000000)" />
                                            </g>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        aria-label="Instagram"
                                        href="https://www.instagram.com/heliosjewels.vn/?ref=ggads1"
                                    >
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 48 48"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                        >
                                            <title>Instagram</title>
                                            <defs />
                                            <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                <g transform="translate(-642.000000, -295.000000)" fill="white">
                                                    <path d="M666.000048,295 C659.481991,295 658.664686,295.027628 656.104831,295.144427 C653.550311,295.260939 651.805665,295.666687 650.279088,296.260017 C648.700876,296.873258 647.362454,297.693897 646.028128,299.028128 C644.693897,300.362454 643.873258,301.700876 643.260017,303.279088 C642.666687,304.805665 642.260939,306.550311 642.144427,309.104831 C642.027628,311.664686 642,312.481991 642,319.000048 C642,325.518009 642.027628,326.335314 642.144427,328.895169 C642.260939,331.449689 642.666687,333.194335 643.260017,334.720912 C643.873258,336.299124 644.693897,337.637546 646.028128,338.971872 C647.362454,340.306103 648.700876,341.126742 650.279088,341.740079 C651.805665,342.333313 653.550311,342.739061 656.104831,342.855573 C658.664686,342.972372 659.481991,343 666.000048,343 C672.518009,343 673.335314,342.972372 675.895169,342.855573 C678.449689,342.739061 680.194335,342.333313 681.720912,341.740079 C683.299124,341.126742 684.637546,340.306103 685.971872,338.971872 C687.306103,337.637546 688.126742,336.299124 688.740079,334.720912 C689.333313,333.194335 689.739061,331.449689 689.855573,328.895169 C689.972372,326.335314 690,325.518009 690,319.000048 C690,312.481991 689.972372,311.664686 689.855573,309.104831 C689.739061,306.550311 689.333313,304.805665 688.740079,303.279088 C688.126742,301.700876 687.306103,300.362454 685.971872,299.028128 C684.637546,297.693897 683.299124,296.873258 681.720912,296.260017 C680.194335,295.666687 678.449689,295.260939 675.895169,295.144427 C673.335314,295.027628 672.518009,295 666.000048,295 Z M666.000048,299.324317 C672.40826,299.324317 673.167356,299.348801 675.69806,299.464266 C678.038036,299.570966 679.308818,299.961946 680.154513,300.290621 C681.274771,300.725997 682.074262,301.246066 682.91405,302.08595 C683.753934,302.925738 684.274003,303.725229 684.709379,304.845487 C685.038054,305.691182 685.429034,306.961964 685.535734,309.30194 C685.651199,311.832644 685.675683,312.59174 685.675683,319.000048 C685.675683,325.40826 685.651199,326.167356 685.535734,328.69806 C685.429034,331.038036 685.038054,332.308818 684.709379,333.154513 C684.274003,334.274771 683.753934,335.074262 682.91405,335.91405 C682.074262,336.753934 681.274771,337.274003 680.154513,337.709379 C679.308818,338.038054 678.038036,338.429034 675.69806,338.535734 C673.167737,338.651199 672.408736,338.675683 666.000048,338.675683 C659.591264,338.675683 658.832358,338.651199 656.30194,338.535734 C653.961964,338.429034 652.691182,338.038054 651.845487,337.709379 C650.725229,337.274003 649.925738,336.753934 649.08595,335.91405 C648.246161,335.074262 647.725997,334.274771 647.290621,333.154513 C646.961946,332.308818 646.570966,331.038036 646.464266,328.69806 C646.348801,326.167356 646.324317,325.40826 646.324317,319.000048 C646.324317,312.59174 646.348801,311.832644 646.464266,309.30194 C646.570966,306.961964 646.961946,305.691182 647.290621,304.845487 C647.725997,303.725229 648.246066,302.925738 649.08595,302.08595 C649.925738,301.246066 650.725229,300.725997 651.845487,300.290621 C652.691182,299.961946 653.961964,299.570966 656.30194,299.464266 C658.832644,299.348801 659.59174,299.324317 666.000048,299.324317 Z M666.000048,306.675683 C659.193424,306.675683 653.675683,312.193424 653.675683,319.000048 C653.675683,325.806576 659.193424,331.324317 666.000048,331.324317 C672.806576,331.324317 678.324317,325.806576 678.324317,319.000048 C678.324317,312.193424 672.806576,306.675683 666.000048,306.675683 Z M666.000048,327 C661.581701,327 658,323.418299 658,319.000048 C658,314.581701 661.581701,311 666.000048,311 C670.418299,311 674,314.581701 674,319.000048 C674,323.418299 670.418299,327 666.000048,327 Z M681.691284,306.188768 C681.691284,307.779365 680.401829,309.068724 678.811232,309.068724 C677.22073,309.068724 675.931276,307.779365 675.931276,306.188768 C675.931276,304.598171 677.22073,303.308716 678.811232,303.308716 C680.401829,303.308716 681.691284,304.598171 681.691284,306.188768 Z" />
                                                </g>
                                                <g transform="translate(-1734.000000, -472.000000)" />
                                            </g>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a aria-label="Tiktok" href="https://tiktok.com/@heliosjewels?ref=ggads1">
                                        <svg
                                            width="24px"
                                            height="24px"
                                            viewBox="0 0 15 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="white"
                                                d="M7.63849 0.0133333C8.51182 0 9.37849 0.00666667 10.2452 0C10.2985 1.02 10.6652 2.06 11.4118 2.78C12.1585 3.52 13.2118 3.86 14.2385 3.97333V6.66C13.2785 6.62667 12.3118 6.42667 11.4385 6.01333C11.0585 5.84 10.7052 5.62 10.3585 5.39333C10.3518 7.34 10.3652 9.28667 10.3452 11.2267C10.2918 12.16 9.98516 13.0867 9.44516 13.8533C8.57183 15.1333 7.05849 15.9667 5.50516 15.9933C4.55183 16.0467 3.59849 15.7867 2.78516 15.3067C1.43849 14.5133 0.491825 13.06 0.351825 11.5C0.338492 11.1667 0.331825 10.8333 0.345158 10.5067C0.465158 9.24 1.09183 8.02667 2.06516 7.2C3.17183 6.24 4.71849 5.78 6.16516 6.05333C6.17849 7.04 6.13849 8.02667 6.13849 9.01333C5.47849 8.8 4.70516 8.86 4.12516 9.26C3.70516 9.53333 3.38516 9.95333 3.21849 10.4267C3.07849 10.7667 3.11849 11.14 3.12516 11.5C3.28516 12.5933 4.33849 13.5133 5.45849 13.4133C6.20516 13.4067 6.91849 12.9733 7.30516 12.34C7.43182 12.12 7.57182 11.8933 7.57849 11.6333C7.64516 10.44 7.61849 9.25333 7.62516 8.06C7.63182 5.37333 7.61849 2.69333 7.63849 0.0133333Z"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
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
