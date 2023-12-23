import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes/routes'
import { Fragment } from 'react'
import { useEffect, useContext } from 'react'

import { UserContext } from '~/context/UserContext'
import './App.css'
import { DefaultLayout } from '~/layouts'
import * as userServices from '~/services/userServices'

function App() {
    const { setUser } = useContext(UserContext)

    //Get user info when refresh website
    useEffect(() => {
        const fetchApi = async () => {
            const res = await userServices.getUserInfo()
            console.log('>>>res: ', res)
            if (res && res.data.name) {
                setUser({
                    name: res.data.name,
                    auth: true,
                })
            } else if (res?.status >= 400) {
                setUser({
                    name: '',
                    auth: false,
                })
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
