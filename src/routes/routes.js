import {
    HomePage,
    ProductsPage,
    SalePage,
    CartPage,
    CollectionsPage,
    LoginPage,
    RegisterPage,
    ProductDetailPage,
    AdminPage,
    CheckoutPage,
    BillPage,
} from '~/pages'
import AdminLayout from '~/layouts/AdminLayout/AdminLayout'

export const publicRoutes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/products',
        component: ProductsPage,
    },
    {
        path: '/products/:slug',
        component: ProductDetailPage,
    },
    {
        path: '/collections/:id',
        component: ProductsPage,
    },
    {
        path: '/sale',
        component: SalePage,
    },
    {
        path: '/collections',
        component: CollectionsPage,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
]

export const privateRoutes = [
    {
        path: '/cart',
        component: CartPage,
    },
    {
        path: '/checkout/:id',
        component: CheckoutPage,
    },
    {
        path: '/bill/:id',
        component: BillPage,
    },
]

export const adminPrivateRoutes = [
    {
        path: '/admin',
        component: AdminPage,
        layout: AdminLayout,
    },
]
