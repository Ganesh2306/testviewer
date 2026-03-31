import { lazy } from 'react'

const CustomerRoutes = [
    // Customer
    {
        path: `/customer`,
        component: lazy(() => import('../../views/customer/Customer')),
        meta: {
            action: 'list',
            resource: 'Customer'
        }
    },
    {
        path: `/customeruser`,
        component: lazy(() => import('../../views/customer/CustomerUser')),
        meta: {
            action: 'list',
            resource: 'CustomerUser'
        }
    }
]

export default CustomerRoutes