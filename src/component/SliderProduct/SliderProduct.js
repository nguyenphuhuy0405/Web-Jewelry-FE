import React from 'react'
import classNames from 'classnames/bind'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import styles from './SliderProduct.module.scss'

const cx = classNames.bind(styles)

function SlideProduct({ images }) {
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
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                slidesPerView={1}
                className={cx('slider-image')}
            >
                {images ? (
                    images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img src={process.env.REACT_APP_BASE_URL + item} alt={`slide-${index}`} />
                        </SwiperSlide>
                    ))
                ) : (
                    <></>
                )}
            </Swiper>
        </div>
    )
}

export default SlideProduct
