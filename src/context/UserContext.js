import { createContext, useState } from 'react'
import Cookies from 'js-cookie'

const UserContext = createContext({ name: '', auth: false })

function UserProvider({ children }) {
    const [user, setUser] = useState({ name: '', auth: false })

    const login = (name, token) => {
        setUser((user) => ({
            name: name,
            auth: true,
        }))
        localStorage.setItem('accessToken', token)
    }

    // Logout updates the user data to default
    const logout = () => {
        localStorage.removeItem('accessToken')
        Cookies.remove('refreshToken')
        setUser((user) => ({
            name: '',
            auth: false,
        }))
    }

    return <UserContext.Provider value={{ user, setUser, login, logout }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
