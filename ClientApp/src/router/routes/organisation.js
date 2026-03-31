import { lazy } from 'react'

const OrganizationRoutes = [
    // Customer
    {
        path: `/organization`,
        component: lazy(() => import('../../views/organization/Organization')),
        meta: {
            action: 'list',
            resource: 'Organisation'
        }
    },
    {
        path: `/organizationuser`,
        component: lazy(() => import('../../views/organization/OrganizationUser')),
        meta: {
            action: 'list',
            resource: 'OrganisationUser'
        }
    },
    {
        path: '/organizationRequests',
        component: lazy(() => import('../../views/organization/organizationRequests')),
        meta: {
            action: 'list',
            resource: 'OrganisationRequest'
        }
    }
]

export default OrganizationRoutes