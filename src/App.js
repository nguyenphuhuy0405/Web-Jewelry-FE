import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRoutes, adminPrivateRoutes } from './routes/routes'
import { Fragment } from 'react'

import './App.css'
import { DefaultLayout } from '~/layouts'
import AdminPrivateRoutes from './routes/AdminPrivateRoutes'
import PrivateRoutes from './routes/PrivateRoutes'

function App() {
    return (
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
