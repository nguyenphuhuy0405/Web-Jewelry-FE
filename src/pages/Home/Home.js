import classNames from 'classnames/bind'
import SliderImage from '~/component/SliderImage/SliderImage'
import SliderCategory from '~/component/SliderCategory/SliderCategory'
import Collections from '~/component/Collections/Collection'
import SliderMeets from '~/component/SliderMeets/SliderMeets'

import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return (
        <div className={cx('wrapper')}>
            <SliderImage />
            <SliderCategory />
            <Collections />
            <SliderMeets />
        </div>
    )
}

export default Home
