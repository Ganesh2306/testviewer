import { lazy } from 'react'
//import { GenerateOrder } from '../../views/order/GenerateOrder'

// ** Document title
const TemplateTitle = '%s - Design Archive Admin Template'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
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
    //{
    //    path: '/forgotPassword',
    //    component: lazy(() => import('../../views/auth/ForgotPassword')),
    //    layout: 'BlankLayout',
    //    meta: {
    //        authRoute: true
    //    }
    //},
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
    // {
    //     path: '/design/:boardId?',
    //     className: 'ecommerce-application',
    //     component: lazy(() => import('../../views/design/Designs'))
    //     //layout: 'BlankLayout'
    // },

    {
        path: '/design',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/design/Designs'))
        //layout: 'BlankLayout'
    },
    {
        path: '/Boards/:boardId?',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/Board_Collection/Boards'))
        //layout: 'HeaderFixLayout'
    },
    {
        path: '/MyCollection/:boardId?',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/Board_Collection/MyCollection'))
        //layout: 'HeaderFixLayout'
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
        // layout: 'HeaderHomeLayout' manisha
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
    // {
    //     path: '/plan',
    //     meta: {
    //         publicRoute: true
    //     },
    //     component: lazy(() => import('../../views/plan/Plan'))
    //     //layout: 'BlankLayout'
    // },
    {
        path: '/designview',
        className: 'ecommerce-application',
        // component: lazy(() => import('../../views/FullDesignView/DesignView')),
        component: lazy(() => import('../../views/SeasonalCollections/CollezioniFullDesignView/DesignView')),
        layout: 'HeaderSeason'
    },
    {
        path: '/SeasonHome',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/SeasonalCollections/SeasonHome')),
        layout: 'HeaderFixLayout'
    },
    {
        path: '/SeasonBook',
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/SeasonalCollections/SeasonBook')),
        layout: 'HeaderSeason'
    },
    {
        path: '/CardLarge',
        className: 'email-application',
        component: lazy(() => import('../../views/SeasonalCollections/CardLargeView/CardLargeView')),
        layout: 'HeaderSeason'
    },
    // {
    //     path: '/BookThumbnails',
    //     className: 'ecommerce-application',
    //     component: lazy(() => import('../../views/SeasonalCollections/BookThumnails/BookThumbnailsxxx')),
    //     layout: 'HeaderSeason'
    // },
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
    //Added By : Vijay Pansande, Added On : 13 - 11 - 2023, Purpose : CreateOrderWindow in new url
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

export { DefaultRoute, TemplateTitle, Routes }
