import axios from '~/utils/axios'

export const login = async (email, password) => {
    try {
        const res = await axios.post('/api/auth/login', {
            email,
            password,
        })
        console.log('data:', res.data)
        return res.data
    } catch (error) {
        let res = {}
        if (error.response) {
            res.data = error.response.data
            res.status = error.response.status
            res.headers = error.response.headers
        } else if (error.request) {
            res.request = error.request
        } else {
            res.message = error.message
        }
        return res
    }
}

export const register = async (name, email, password, address, phoneNumber) => {
    try {
        const res = await axios.post('/api/auth/register', {
            name,
            email,
            password,
            address,
            phoneNumber,
        })
        console.log('data:', res.data)
        return res.data
    } catch (error) {
        let res = {}
        if (error.response) {
            res.data = error.response.data
            res.status = error.response.status
            res.headers = error.response.headers
        } else if (error.request) {
            res.request = error.request
        } else {
            res.message = error.message
        }
        return res
    }
}

export const getUserInfo = async (accessToken) => {
    try {
        const res = await axios.get('/api/user/info', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
        console.log('data:', res.data)
        return res.data
    } catch (error) {
        let res = {}
        if (error.response) {
            res.data = error.response.data
            res.status = error.response.status
            res.headers = error.response.headers
        } else if (error.request) {
            res.request = error.request
        } else {
            res.message = error.message
        }
        return res
    }
}
