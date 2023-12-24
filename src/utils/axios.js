import axios from 'axios'
import useRefreshToken from '~/hooks/useRefreshToken'

let accessToken = localStorage.getItem('accessToken')

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { ['Authorization']: `Bearer ${accessToken}` },
    withCredentials: true,
})

axiosPrivate.interceptors.request.use(
    async (config) => {
        if (!accessToken) {
            accessToken = localStorage.getItem('accessToken')
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true
            //Get new access token
            const newAccessToken = await useRefreshToken()
            console.log('newAccessToken: ', newAccessToken)
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
    },
)
