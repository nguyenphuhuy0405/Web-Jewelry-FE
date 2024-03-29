import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from '~/context/UserContext'

function PrivateRoutes() {
    const { user } = useContext(UserContext)
    return user.isAdmin ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes
