import { lazy } from 'react'

const AnalyticsRoutes = [
    // Analytics
    {
        path: `/activityLogs`,
        component: lazy(() => import('../../views/analytics/ActivityLogs')),
        meta: {
            action: 'list',
            resource: 'ActivityLogs'
        }
    },
    {
        path: `/designProperty`,
        component: lazy(() => import('../../views/analytics/DesignProperty')),
        meta: {
            action: 'list',
            resource: 'DesignProperty'
        }
    },
    {
        path: `/designStatastic`,
        component: lazy(() => import('../../views/analytics/DesignStatastic')),
        meta: {
            action: 'list',
            resource: 'DesignStatastic'
        }
    }
]

export default AnalyticsRoutes