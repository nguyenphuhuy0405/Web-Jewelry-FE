import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/routes'
import { Fragment } from 'react'
import { useContext, useEffect } from 'react'

import './App.css'
import { DefaultLayout } from '~/layouts'
import * as userServices from '~/services/userServices'
import { UserContext } from '~/context/UserContext'

function App() {
    const { setUser } = useContext(UserContext)

    //Get user info when refresh website
    useEffect(() => {
        const fetchApi = async () => {
            const accessToken = localStorage.getItem('accessToken')
            if (accessToken) {
                const res = await userServices.getUserInfo(accessToken)
                if (res && res.data.name) {
                    setUser({
                        name: res.data.name,
                        auth: true,
                    })
                }
            }
        }
        fetchApi()
    }, [])

    return (
        <div className="App">
            <Routes>
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
            </Routes>
        </div>
    )
}

export default App
