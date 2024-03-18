export const getTransactions = async (fromDate) => {
    try {
        const page = 1
        const pageSize = 20
        const sort = 'DESC'
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Apikey ${process.env.REACT_APP_API_KEY_BANK}`,
            },
        }
        const res = await fetch(
            `https://oauth.casso.vn/v2/transactions?fromDate=${fromDate}&page=${page}&pageSize=${pageSize}&sort=${sort}`,
            options,
        )
            .then((res) => res.json())
            .then((data) => data)
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
