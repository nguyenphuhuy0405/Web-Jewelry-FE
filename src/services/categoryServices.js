import axios, { axiosPrivate } from '~/utils/axios'

export const getCategories = async () => {
    try {
        const res = await axios.get(`/api/category/`)
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

export const createCategory = async (data) => {
    try {
        const res = await axiosPrivate.post(`/api/category/`, {
            ...data,
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

export const updateCategory = async (id, data) => {
    try {
        const res = await axiosPrivate.put(`/api/category/${id}`, {
            ...data,
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

export const deleteCategory = async (id, data) => {
    try {
        const res = await axiosPrivate.delete(`/api/category/${id}`, {
            ...data,
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
