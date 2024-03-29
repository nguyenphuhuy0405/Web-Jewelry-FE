import React from 'react'
import { Link } from 'react-router-dom'
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
                spaceBetween={30}
                slidesPerView={3.2}
                className={cx('slider-category')}
                navigation={true}
                scrollbar={true}
                modules={[Navigation, Scrollbar]}
            >
                <SwiperSlide>
                    <Link className={cx('item')} to={'/collections/nhan'}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[0]} alt="ring" />
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className={cx('item')} to={'/collections/day-chuyen'}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[1]} alt="ring" />
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className={cx('item')} to={'/collections/khuyen-tai'}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[2]} alt="ring" />
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link className={cx('item')} to={'/collections/vong-tay'}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.categories[3]} alt="ring" />
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SliderCategory
