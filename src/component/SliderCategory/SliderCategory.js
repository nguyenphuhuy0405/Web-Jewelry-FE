import React from 'react'
import { Link } from 'react-router-dom'
import config from '~/config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

import images from '~/assets/images'
import classNames from 'classnames/bind'
import styles from './SliderCategory.module.scss'

const cx = classNames.bind(styles)

function SliderCategory() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('name')}>Danh mục sản phẩm</h2>
            <Swiper
                lazy={true}
                spaceBetween={30}
                slidesPerView={3.2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className={cx('slider-category')}
                navigation={true}
                scrollbar={true}
                modules={[Navigation, Scrollbar]}
            >
                <SwiperSlide>
                    <Link className={cx('item')} to={config.routes.categories.ring}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[0]} alt="ring" />
                        </div>
                        <div className={cx('title')}>Nhẫn</div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className={cx('item')} to={config.routes.categories.ring}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[1]} alt="ring" />
                        </div>
                        <div className={cx('title')}>Dây chuyền</div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className={cx('item')} to={config.routes.categories.ring}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[2]} alt="ring" />
                        </div>
                        <div className={cx('title')}>Khuyên tai</div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className={cx('item')} to={config.routes.categories.ring}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[3]} alt="ring" />
                        </div>
                        <div className={cx('title')}>Vòng tay</div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SliderCategory
