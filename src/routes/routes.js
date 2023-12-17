import config from '~/config'
import {
    HomePage,
    ProductsPage,
    GiftPage,
    SalePage,
    AccessoriesPage,
    CollectionsPage,
    LoginPage,
    RegisterPage,
} from '~/pages'

export const publicRoutes = [
    {
        path: config.routes.home,
        component: HomePage,
    },
    {
        path: config.routes.products,
        component: ProductsPage,
    },
    {
        path: config.routes.gift,
        component: GiftPage,
    },
    {
        path: config.routes.sale,
        component: SalePage,
    },
    {
        path: config.routes.collections,
        component: CollectionsPage,
    },
    {
        path: config.routes.accessories,
        component: AccessoriesPage,
    },
    {
        path: config.routes.login,
        component: LoginPage,
    },
    {
        path: config.routes.register,
        component: RegisterPage,
    },
]

export const privateRoutes = {}
