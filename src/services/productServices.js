import axios from '~/utils/axios'

export const getListOfProduct = async (page, filter, search) => {
    try {
        let query = ''
        if (page) {
            query += `page=${page}`
        }
        if (filter) {
            query += `&_sort=&field=${filter.name}&type=${filter.value}`
        }
        if (search) {
            query += `&q=${search}`
        }
        const res = await axios.get(`/api/product/?${query}`)
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

export const getProductDetail = async (slug) => {
    try {
        const res = await axios.get(`/api/product/${slug}`)
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
