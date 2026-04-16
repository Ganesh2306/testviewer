import { lazy, Suspense } from 'react'

// ** Document title
const TemplateTitle = '%s - Design Archive Admin Template'

// ** Default Route
const DefaultRoute = '/login'

// ** Loading Component (you can customize this as needed)
const Loading = () => <div>Loading...</div>

// ** Merge Routes with Suspense wrapping
const Routes = [
    {
        path: '/home',
        component: lazy(() => import('../../views/home/Home'))
    },
    {
        path: '/second-page',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/SecondPage'))
    },
    {
        path: '/login',
        component: lazy(() => import('../../views/auth/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/resetPassword',
        component: lazy(() => import('../../views/auth/ResetPassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    },
    {
        path: '/design',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/design/Designs'))
    },
    {
        path: '/Boards/:boardId?',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/Board_Collection/Boards'))
    },
    {
        path: '/MyCollection/:boardId?',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/Board_Collection/MyCollection'))
    },
    {
        path: '/collection',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/collection/Collection')),
        layout: 'HeaderHomeLayout'
    },
    {
        path: '/ViewOrder',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/OrderPage/ViewOrderList')),
        layout: 'HeaderFixLayout'
    },
    {
        path: '/wishlist',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/wishlist/Wishlist')),
        layout: 'HeaderFixLayout'
    },
    {
        path: '/brandingpage',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/BrandingPage/BrandingPage')),
        layout: 'HeaderHomeLayout'
    },
    {
        path: '/supplierlist',
        component: lazy(() => import('../../views/SupplierList/SupplierList')),
        layout: 'BlankLayout'
    },
    {
        path: '/plan',
        meta: {
            publicRoute: true
        },
        component: lazy(() => import('../../views/plan/Plan'))
    },
    {
        path: '/Boards',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/Boards/Board')),
        layout: 'HeaderFixLayout'
    },
    {
        path: '/Viewboards',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/viewboards/Viewboards')),
        layout: 'HeaderFixLayout'
    },
    {
        path: '/Cart',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/order/GenerateOrder')),
        layout: 'HeaderFixLayout'
    },
    {
        path: '/FullView',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/FullViewPlugin/FullView')),
        layout: 'HeaderFixLayout'
    }
]

// Wrap each route in a Suspense component to handle loading states
const SuspendedRoutes = Routes.map((route, index) => ({
    ...route,
    component: (
        <Suspense fallback={<Loading />}>
            {route.component}
        </Suspense>
    )
}))

export { DefaultRoute, TemplateTitle, Routes } // Keep Routes as is here