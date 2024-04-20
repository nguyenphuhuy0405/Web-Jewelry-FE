import classNames from 'classnames/bind'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import CircularProgress from '@mui/material/CircularProgress'

import styles from './ResetPassword.module.scss'
import * as userService from '~/services/userServices'

const cx = classNames.bind(styles)

function ResetPassword() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { token } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        postResetPasswordApi(password)
    }

    const postResetPasswordApi = async (password) => {
        setLoading(true)
        const res = await userService.resetPassword(token, password)
        if (res?.status === 200) {
            navigate('/login')
        } else {
            setError(res?.data?.message)
        }
        setLoading(false)
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-login')}>
                <h3>Cài lại mật khẩu</h3>
                <label htmlFor="email" className={cx('label')}>
                    Nhập mật khẩu mới
                </label>
                <input
                    className={cx('input')}
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p style={{ color: 'red' }}>{error}</p>
                <button type="submit" className={cx('btn-submit')} onClick={handleSubmit}>
                    {loading && <CircularProgress />}
                    <span>Xác nhận</span>
                </button>
            </form>
        </div>
    )
}

export default ResetPassword
