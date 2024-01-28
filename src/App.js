import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes } from './routes/routes'
import { Fragment, useContext, useEffect, useState } from 'react'

import './App.css'
import { DefaultLayout } from '~/layouts'
import PrivateRoutes from './routes/PrivateRoutes'
import * as userServices from '~/services/userServices'
import { UserContext } from '~/context/UserContext'

function App() {
    const { setUser, logout } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    //Get user info when refresh website
    const getUserApi = async () => {
        setLoading(true)
        const res = await userServices.getUserInfo()
        if (res?.status === 200) {
            setUser({
                name: res.data.name,
                auth: true,
                isAdmin: res.data.role === 'admin' ? true : false,
                address: res.data.address,
                phoneNumber: res.data.phoneNumber,
            })
        } else {
            logout()
        }
        setLoading(false)
    }
    useEffect(() => {
        getUserApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUser])
    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="App">
                    <Routes>
                        {/* Public routes */}
                        {publicRoutes.map((route, index) => {
                            const Page = route.component

                            let Layout = DefaultLayout
                            if (route.layout) {
                                Layout = route.layout
                            } else if (route.layout === null) {
                                Layout = Fragment
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}

                        {/* Private routes */}
                        <Route element={<PrivateRoutes />}>
                            {privateRoutes.map((route, index) => {
                                const Page = route.component

                                let Layout = DefaultLayout
                                if (route.layout) {
                                    Layout = route.layout
                                } else if (route.layout === null) {
                                    Layout = Fragment
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                )
                            })}
                        </Route>
                    </Routes>
                </div>
            )}
        </>
    )
}

export default App
