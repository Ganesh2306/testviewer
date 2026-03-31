import { lazy } from 'react'

const DashboardRoutes = [
    // Dashboard
    {
        path: `/dashboard`,
        component: lazy(() => import('../../views/dashboard/Dashboard')),
        meta: {
            action: 'display',
            resource: 'Common'
        }
    }
]

export default DashboardRoutes