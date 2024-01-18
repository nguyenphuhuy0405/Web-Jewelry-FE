import { Routes, Route } from 'react-router-dom'
import { publicRoutes, adminPrivateRoutes } from './routes/routes'
import { Fragment } from 'react'

import './App.css'
import { DefaultLayout } from '~/layouts'
import AdminPrivateRoutes from './routes/AdminPrivateRoutes'

function App() {
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

                {/* Admin private routes */}
                <Route element={<AdminPrivateRoutes />}>
                    {adminPrivateRoutes.map((route, index) => {
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
    )
}

export default App
