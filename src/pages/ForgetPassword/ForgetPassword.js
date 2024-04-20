import classNames from 'classnames/bind'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress'

import styles from './ForgetPassword.module.scss'
import * as userService from '~/services/userServices'

const cx = classNames.bind(styles)

function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        postForgetPasswordApi(email)
    }

    const postForgetPasswordApi = async (email) => {
        setLoading(true)
        const res = await userService.forgetPassword(email)
        if (res?.status > 400) {
            setError(res?.data?.message)
        }
        setLoading(false)
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-login')}>
                <h3>Quên mật khẩu</h3>
                <label htmlFor="email" className={cx('label')}>
                    Vui lòng nhập email của bạn để đặt lại mật khẩu
                </label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p style={{ color: 'red' }}>{error}</p>
                <button type="submit" className={cx('btn-submit')} onClick={handleSubmit}>
                    {loading && <CircularProgress />}
                    <span>Gửi link reset mật khẩu</span>
                </button>
            </form>
        </div>
    )
}

export default ForgetPassword
