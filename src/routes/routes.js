import {
    HomePage,
    ProductsPage,
    NotFoundPage,
    CartPage,
    CollectionsPage,
    LoginPage,
    RegisterPage,
    ProductDetailPage,
    AdminPage,
    CheckoutPage,
    BillPage,
    ForgetPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    ChangePasswordPage,
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
    {
        path: '*',
        component: <NotFoundPage />,
    },
    {
        path: '/checkout/:id',
        component: CheckoutPage,
    },
    {
        path: '/cart',
        component: CartPage,
    },
    {
        path: '/bill/:id',
        component: BillPage,
    },
    {
        path: '/forget-password',
        component: ForgetPasswordPage,
    },
    {
        path: '/reset-password/:token',
        component: ResetPasswordPage,
    },
    {
        path: '/profile',
        component: ProfilePage,
    },
    {
        path: '/change-password',
        component: ChangePasswordPage,
    },
]

export const privateRoutes = [
    {
        path: '/admin',
        component: AdminPage,
        layout: null,
    },
]
