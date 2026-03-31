import { lazy } from 'react'

const DesignRoutes = [
    // Customer
    {
        path: `/design`,
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/design/Design')),
        meta: {
            action: 'list',
            resource: 'Design'
        }
    }
]

export default DesignRoutes