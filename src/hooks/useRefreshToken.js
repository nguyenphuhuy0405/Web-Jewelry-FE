import { useContext } from 'react'

import { UserContext } from '~/context/UserContext'
import * as userServices from '~/services/userServices'

const useRefreshToken = async () => {
    const res = await userServices.refreshToken()
    console.log('>>>>res: ', res)
    return res.accessToken
}

export default useRefreshToken
