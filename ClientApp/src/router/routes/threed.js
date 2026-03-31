import { lazy } from 'react'

const ThreeDImageRoutes = [
    // Customer
    {
        path: `/threed`,
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/threed/ThreeDImages')),
        meta: {
            action: 'list',
            resource: 'threed'
        }
    },
    {
        path: `/ThreedOperation`,
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/threed/ThreedOperation')),
        meta: {
            action: 'list',
            resource: 'threedOperation'
        }
    },
    {
        path: `/ThreedConfiguration`,
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/threed/Threedconfiguration')),
        meta: {
            action: 'list',
            resource: 'threedProduct'
        }
    }
]

export default ThreeDImageRoutes