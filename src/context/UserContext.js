import { createContext, useState } from 'react'
// import Cookies from 'js-cookie'
import * as userServices from '../services/userServices'

const UserContext = createContext({ name: '', auth: false, isAdmin: false })

function UserProvider({ children }) {
    const [user, setUser] = useState({ name: '', auth: false, isAdmin: false, address: '', phoneNumber: '' })
    console.log('>>>user: ', user)

    const login = (name, token, isAdmin, address, phoneNumber) => {
        setUser((user) => ({
            name: name,
            auth: true,
            isAdmin: isAdmin,
            address: address,
            phoneNumber: phoneNumber,
        }))
        localStorage.setItem('accessToken', token)
    }

    // Logout updates the user data to default
    const logout = async () => {
        const res = await userServices.logout()
        if (res.status === 200) {
            localStorage.removeItem('accessToken')
            // Cookies.remove('refreshToken')
            setUser((user) => ({
                name: '',
                auth: false,
                isAdmin: false,
                address: '',
                phoneNumber: '',
            }))
        }
    }

    return <UserContext.Provider value={{ user, setUser, login, logout }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
