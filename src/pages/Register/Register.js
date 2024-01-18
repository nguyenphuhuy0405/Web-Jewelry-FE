import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'

import * as userService from '~/services/userServices'
import styles from './Register.module.scss'

const cx = classNames.bind(styles)

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    let navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        const fetchApi = async () => {
            if (name === '' && email === '' && password === '' && address === '' && phone === '') {
                setError('Please enter your information')
                return
            }
            const res = await userService.register(name, email, password, address, phone)
            console.log('res: ', res)
            if (res?.status === 200) {
                navigate('/login')
            }
        }
        fetchApi()
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-register')}>
                <h3>Register Here</h3>
                <label htmlFor="name" className={cx('label')}>
                    Name
                </label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Name..."
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email" className={cx('label')}>
                    Email
                </label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Email..."
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className={cx('label')}>
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Password..."
                    id="password"
                    className={cx('input')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="address" className={cx('label')}>
                    Address
                </label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Address..."
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor="phone" className={cx('label')}>
                    Phone
                </label>
                <input
                    className={cx('input')}
                    type="text"
                    placeholder="Phone..."
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <p className={cx('error')}>{error}</p>

                <button type="submit" onClick={handleRegister} className={cx('btn-submit')}>
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
