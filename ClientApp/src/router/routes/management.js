import { lazy } from 'react'

const ManagementRoutes = [
    // Management
    {
        path: '/DesignType',
        component: lazy(() => import('../../views/management/DesignType')),
        meta: {
            action: 'list',
            resource: 'DesignType'
        }
    },
    {
        path: '/DesignGroup',
        component: lazy(() => import('../../views/management/DesignGroup')),
        meta: {
            action: 'list',
            resource: 'DesignGroup'
        }
    },
    {
        path: '/DesignFeature',
        component: lazy(() => import('../../views/management/DesignFeature')),
        meta: {
            action: 'list',
            resource: 'DesignFeature'
        }
    },
    {
        path: '/DesignConfiguration',
        component: lazy(() => import('../../views/management/DesignConfiguration')),
        meta: {
            action: 'list',
            resource: 'DesignConfiguration'
        }
    }
]

export default ManagementRoutes