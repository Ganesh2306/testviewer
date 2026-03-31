import { lazy } from 'react'

const InventoryRoutes = [
    // Inventory
    {
        path: `/order`,
        component: lazy(() => import('../../views/report/Order')),
        meta: {
            action: 'list',
            resource: 'Order'
        }
    },
    {
        path: `/favourite`,
        component: lazy(() => import('../../views/report/Favourite')),
        meta: {
            action: 'list',
            resource: 'Favourite'
        }
    },
    {
        path: `/cart`,
        component: lazy(() => import('../../views/report/Cart')),
        meta: {
            action: 'list',
            resource: 'Cart'
        }
    }
]

export default InventoryRoutes