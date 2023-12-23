import React from 'react'
import classNames from 'classnames/bind'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import styles from './SliderImage.module.scss'
import images from '~/assets/images'

const cx = classNames.bind(styles)

function SliderImage() {
    return (
        <div className={cx('wrapper')}>
            <Swiper
                style={{
                    '--swiper-pagination-color': 'black',
                    '--swiper-pagination-bullet-inactive-color': 'white',
                    '--swiper-pagination-bullet-inactive-opacity': '1',
                    '--swiper-pagination-bullet-size': '12px',
                    '--swiper-pagination-bullet-horizontal-gap': '4px',
                }}
                lazy={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                className={cx('slider-image')}
            >
                {images.sliders.map((item, index) => (
                    <SwiperSlide>
                        <img key={index} src={item} alt={`slide-${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SliderImage
