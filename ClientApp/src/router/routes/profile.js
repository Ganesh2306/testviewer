import { lazy } from 'react'

const ProfileRoutes = [
    /* abhishek add new page */
    {
        path: `/profile`,
        className: 'ecommerce-application',
        component: lazy(() => import('../../views/profile/Profile')),
        meta: {
            action: 'list',
            resource: 'RoleDesignAccess'
        }
    }
]

export default ProfileRoutes