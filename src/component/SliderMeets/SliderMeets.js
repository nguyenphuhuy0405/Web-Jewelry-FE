import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'

import images from '~/assets/images'
import classNames from 'classnames/bind'
import styles from './SliderMeets.module.scss'

const cx = classNames.bind(styles)

function SliderMeets() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('name')}>Helios Meets</h2>
            <Swiper
                spaceBetween={30}
                slidesPerView={3.2}
                className={cx('slider-meets')}
                navigation={true}
                scrollbar={true}
                modules={[Navigation, Scrollbar]}
            >
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[0]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x MODEL DƯƠNG HẠ VY</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[1]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x BLOGGER VỸ</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[2]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x BLOGGER SƠN HOÀNG</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[3]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x BLOGGER ĐỨC NAM</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[4]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x BLOGGER ERIC SAIN</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[5]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x BLOGGER CATTIA</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[6]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x BLOGGER TINI</div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={cx('item')}>
                        <div className={cx('wrapper-img')}>
                            <img className={cx('img')} src={images.meets[7]} alt="ring" />
                        </div>
                        <div className={cx('title')}>HELIOS x BLOGGER DƯƠNG ÁNH PHẠM</div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SliderMeets
