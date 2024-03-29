import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary,
    danger,
    hover,
    small,
    normal,
    large,
    uppercase,
    disabled,
    ml,
    leftIcon,
    rightIcon,
    onClick,
    children,
    className,
    ...passProps
}) {
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        danger,
        hover,
        small,
        normal,
        large,
        uppercase,
        disabled,
        ml,
    })
    let props = {
        onClick,
        ...passProps,
    }
    let Component = 'button'
    if (to) {
        Component = Link
        props.to = to
    } else if (href) {
        Component = 'a'
        props.href = href
    }

    //Remove event if disable
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') || typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {children && <span className={cx('title')}>{children}</span>}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    )
}

export default Button
