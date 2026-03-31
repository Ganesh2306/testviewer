import { lazy } from 'react'

const ThreeDImageSingleRoutes = [
    // Customer
    {
        path: `/threed`,
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/threed/ThreeDImages')),
        meta: {
            action: 'list',
            resource: 'threed1'
        }
    }
]

export default ThreeDImageSingleRoutes