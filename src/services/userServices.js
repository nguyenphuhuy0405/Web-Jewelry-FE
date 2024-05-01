import axios, { axiosPrivate } from '~/utils/axios'

export const login = async (email, password) => {
    try {
        const res = await axios.post(
            '/api/auth/login',
            {
                email,
                password,
            },
            {
                withCredentials: true,
            },
        )
        res.data.status = res.status
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
        res.data.status = res.status
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

export const logout = async () => {
    try {
        const res = await axios.get('/api/auth/logout', {
            withCredentials: true,
        })
        res.data.status = res.status
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

export const getUser = async () => {
    try {
        const res = await axiosPrivate.get('/api/user/info')
        res.data.status = res.status
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

export const refreshToken = async () => {
    try {
        const res = await axios.get('/api/auth/refresh', {
            withCredentials: true,
        })
        res.data.status = res.status
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

export const getUsers = async () => {
    try {
        const res = await axiosPrivate.get('/api/user')
        res.data.status = res.status
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

export const updateUser = async (id, name, address) => {
    try {
        const res = await axiosPrivate.put(`/api/user/${id}`, {
            name,
            address,
        })
        res.data.status = res.status
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

export const deleteUser = async (id) => {
    try {
        const res = await axiosPrivate.delete(`/api/user/${id}`)
        res.data.status = res.status
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

export const getUserInfo = async () => {
    try {
        const res = await axiosPrivate.get(`/api/user/info`)
        res.data.status = res.status
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

export const updateUserInfo = async (data) => {
    try {
        const res = await axiosPrivate.put(`/api/user/`, {
            name: data?.name,
            address: data?.address,
        })
        res.data.status = res.status
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

export const changePassword = async (password, newPassword) => {
    try {
        const res = await axiosPrivate.put(`/api/user/change-password`, {
            password: password,
            newPassword: newPassword,
        })
        res.data.status = res.status
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

export const forgetPassword = async (email) => {
    try {
        const res = await axios.post('/api/auth/password-reset', {
            email: email,
        })
        res.data.status = res.status
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

export const resetPassword = async (token, password) => {
    try {
        const res = await axios.post(`/api/auth/password-reset/${token}`, {
            password: password,
        })
        res.data.status = res.status
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
