import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import * as userServices from '~/services/userServices'

const UserContext = createContext({ name: '', auth: false })

function UserProvider({ children }) {
    const [user, setUser] = useState({ name: '', auth: false })

    //Get user info when refresh website
    useEffect(() => {
        const fetchApi = async () => {
            const res = await userServices.getUserInfo()
            console.log('>>>res: ', res)
            if (res && res?.data?.name) {
                setUser({
                    name: res.data.name,
                    auth: true,
                })
            } else if (res?.status >= 400) {
                logout()
            }
        }
        fetchApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUser])

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
