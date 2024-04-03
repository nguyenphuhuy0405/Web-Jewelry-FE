export const createPaymentLink = async (data) => {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': `${process.env.REACT_APP_CLIENT_ID_BANK}`,
                'x-api-key': `${process.env.REACT_APP_API_KEY_BANK}`,
            },
        }
        const res = await fetch(`https://api-merchant.payos.vn/v2/payment-requests`, options)
            .then((res) => res.json())
            .then((data) => data)
        console.log('res:', res)
        return res
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

export const getPaymentLinkInfo = async (id) => {
    try {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': `${process.env.REACT_APP_CLIENT_ID_BANK}`,
                'x-api-key': `${process.env.REACT_APP_API_KEY_BANK}`,
            },
        }
        const res = await fetch(`https://api-merchant.payos.vn/v2/payment-requests/${id}`, options)
            .then((res) => res.json())
            .then((data) => data)
        console.log('res:', res)
        return res
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

// export const getBankHistory = async () => {
//     try {
//         const taikhoanmb = 'huykebg2002'
//         const deviceIdCommon = 'xggxcm0c-mbib-0000-0000-2024040120465740'
//         const sessionId = '71f6d127-da01-4b03-9c6f-f7fc5230b613'
//         const sotaikhoanmb = '0969323160'

//         const currentDate = new Date()
//         const oneDayAgo = new Date(currentDate.getTime() - 60 * 60 * 24 * 1000)
//         const fromDate = `${oneDayAgo.getDate()}/${oneDayAgo.getMonth() + 1}/${oneDayAgo.getFullYear()}`

//         const toDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`

//         const data = {
//             accountNo: sotaikhoanmb,
//             deviceIdCommon: deviceIdCommon,
//             fromDate: fromDate,
//             historyNumber: '',
//             historyType: 'DATE_RANGE',
//             refNo: `${taikhoanmb}-${currentDate.toISOString()}00`,
//             sessionId: sessionId,
//             toDate: toDate,
//             type: 'ACCOUNT',
//         }

//         const url = 'https://online.mbbank.com.vn/retail_web/common/getTransactionHistory'

//         const options = {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json, text/plain, */*',
//                 'Accept-Encoding': 'gzip, deflate, br',
//                 'Accept-Language': 'vi-US,vi;q=0.9',
//                 Authorization: 'Basic QURNSU46QURNSU4=',
//                 Connection: 'keep-alive',
//                 Host: 'online.mbbank.com.vn',
//                 Origin: 'https://online.mbbank.com.vn',
//                 Referer: 'https://online.mbbank.com.vn/information-account/source-account',
//                 'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
//                 'sec-ch-ua-mobile': '?0',
//                 'sec-ch-ua-platform': '"Windows"',
//                 'Sec-Fetch-Dest': 'empty',
//                 'Sec-Fetch-Mode': 'cors',
//                 'Sec-Fetch-Site': 'same-origin',
//                 'User-Agent':
//                     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
//             },
//         }

//         const res = await fetch(url, options)
//             .then((res) => res.json())
//             .then((data) => data)
//         console.log('res:', res)
//         return res
//     } catch (error) {
//         let res = {}
//         if (error.response) {
//             res.data = error.response.data
//             res.status = error.response.status
//             res.headers = error.response.headers
//         } else if (error.request) {
//             res.request = error.request
//         } else {
//             res.message = error.message
//         }
//         return res
//     }
// }
