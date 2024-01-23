import { axiosPrivate } from '~/utils/axios'

export const getOrder = async (id) => {
    try {
        const res = await axiosPrivate.get(`/api/order/${id}`)
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

export const orderFromCart = async (cartId, payment, name, address, phoneNumber, notes) => {
    try {
        const res = await axiosPrivate.post(`/api/order/order-from-cart`, {
            cartId,
            payment,
            name,
            address,
            phoneNumber,
            notes,
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
