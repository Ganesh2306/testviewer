import { lazy } from 'react'

const RoleRoutes = [
    // Role
    {
        path: `/role`,
        component: lazy(() => import('../../views/role/Role')),
        meta: {
            action: 'list',
            resource: 'Role'
        }
    },
    {
        path: '/RoleConfiguration',
        component: lazy(() => import('../../views/role/RoleConfiguration')),
        meta: {
            action: 'list',
            resource: 'RoleConfiguration'
        }
    },
    {
        path: '/RoleDesignAccess',
        component: lazy(() => import('../../views/role/RoleDesignAccess')),
        meta: {
            action: 'list',
            resource: 'RoleDesignAccess'
        }
    },
    {
        path: '/RoleOperations',
        component: lazy(() => import('../../views/role/RoleOperations')),
        meta: {
            action: 'list',
            resource: 'RoleDesignAccess'
        }
    }
]

export default RoleRoutes