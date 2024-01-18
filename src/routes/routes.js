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
} from '~/pages'

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
        path: '/cart',
        component: CartPage,
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

export const adminPrivateRoutes = [
    {
        path: '/admin',
        component: AdminPage,
        layout: null,
    },
]
