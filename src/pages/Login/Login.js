import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'

import { UserContext } from '~/context/UserContext'
import * as userService from '~/services/userServices'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { login } = useContext(UserContext)
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        //Check validation
        if (email === '' && password === '') {
            setError('Please enter your email and password')
            return
        } else if (email === '') {
            setError('Please enter your email')
            return
        } else if (password === '') {
            setError('Please enter your password')
            return
        }

        const fetchApi = async () => {
            //Set loading true
            setLoading(true)

            const res = await userService.login(email, password)
            console.log('res: ', res)
            if (res && res.accessToken) {
                login(res.data.name, res.accessToken)
                setError('')
                navigate('/')
            } else {
                if (res && res.status === 400) {
                    console.log('error: ', res.data.message)
                    setError(`${res.data.message}`)
                }
            }

            //Set loading false
            setLoading(false)
        }
        fetchApi()
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-login')}>
                <h3>Login Here</h3>
                <label htmlFor="email" className={cx('label')}>
                    Email
                </label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className={cx('label')}>
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className={cx('input')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className={cx('error')}>{error}</p>
                <button type="submit" onClick={handleSubmit} className={cx('btn-submit')}>
                    {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}
                    Log In
                </button>
            </form>
        </div>
    )
}

export default Login
