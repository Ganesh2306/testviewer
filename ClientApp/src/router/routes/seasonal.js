import { lazy } from 'react'

const Seasonal = [
    // Seasonal
    {
        path: `/Seasonal`,
        component: lazy(() => import('../../views/seasonal/Seasonal')), 
        meta: {
            action: 'display',
            resource: 'Common'
        }
    },
    {
        path: `/Collection`,
        component: lazy(() => import('../../views/seasonal/Collection')), 
        meta: {
            action: 'display',
            resource: 'Common'
        }
    },
    {
        path: `/AssignDesign`,
        component: lazy(() => import('../../views/seasonal/AssignDesign')), 
        meta: {
            action: 'display',
            resource: 'Common'
        }
    },
    {
        path: `/UploadDesign`,
        component: lazy(() => import('../../views/seasonal/UploadDesign')), 
        meta: {
            action: 'display',
            resource: 'Common'
        }
    },
    {
        path: `/ViewDesign`,
        component: lazy(() => import('../../views/seasonal/ViewDesign')), 
        meta: {
            action: 'display',
            resource: 'Common'
        }
    }
]

export default Seasonal