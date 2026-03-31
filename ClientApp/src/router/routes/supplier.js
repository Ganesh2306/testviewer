import { lazy } from 'react'

const SupplierRoutes = [
    // Supplier
    {
        path: `/supplier`,
        component: lazy(() => import('../../views/supplier/Supplier')),
        meta: {
            action: 'list',
            resource: 'Supplier'
        }
    },
    {
        path: `/supplieruser`,
        component: lazy(() => import('../../views/supplier/SupplierUser')),
        meta: {
            action: 'list',
            resource: 'SupplierUser'
        }
    },
    {
        path: `/suppliercustomer`,
        component: lazy(() => import('../../views/supplier/SupplierCustomer')),
        meta: {
            action: 'list',
            resource: 'SupplierUser'
        }
    }
]

export default SupplierRoutes