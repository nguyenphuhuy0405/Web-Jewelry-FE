import axios from '~/utils/axios'
import { axiosPrivate } from '~/utils/axios'

let accessToken = localStorage.getItem('accessToken')

export const getListOfProduct = async (page) => {
    try {
        const res = await axios.get(`/api/product/?page=${page}`)
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
