import {
    HomePage,
    ProductsPage,
    GiftPage,
    SalePage,
    CartPage,
    CollectionsPage,
    LoginPage,
    RegisterPage,
    ProductDetailPage,
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
        path: '/gift',
        component: GiftPage,
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
        path: '/collections/:slug',
        component: ProductDetailPage,
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

export const privateRoutes = {}
