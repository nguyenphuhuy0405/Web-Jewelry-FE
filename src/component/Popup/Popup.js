import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Popup.module.scss'

const cx = classNames.bind(styles)

function Popup({ data }) {
    return (
        <ul className={cx('wrapper')}>
            {data.map((item, index) => (
                <Link key={index} to={item.path}>
                    <li className={cx('item')}>{item.title}</li>
                </Link>
            ))}
        </ul>
    )
}

export default Popup
