import { lazy } from 'react'

const LoginRoutes = [
    // Customer
    {
        path: `/login`,
        component: lazy(() => import('../../views/auth/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/admin',
        component: lazy(() => import('../../views/auth/AdminLogin')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: `/forgotPassword`,
        component: lazy(() => import('../../views/auth/ForgotPassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: `/resetPassword`,
        component: lazy(() => import('../../views/auth/ResetPassword')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: `/error`,
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    }
]

export default LoginRoutes