import * as userServices from '~/services/userServices'

const useRefreshToken = async () => {
    const res = await userServices.refreshToken()
    localStorage.setItem('accessToken', res.accessToken)
    console.log('>>>>res: ', res)
    return res.accessToken
}

export default useRefreshToken
