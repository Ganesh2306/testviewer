import { lazy } from 'react'

const AgentRoutes = [
    // Agent
    {
        path: `/agent`,
        component: lazy(() => import('../../views/agent/agent')),
        meta: {
            action: 'list',
            resource: 'Agent'
        }
    },
    {
        path: `/agentuser`,
        component: lazy(() => import('../../views/agent/agentUser')),
        meta: {
            action: 'list',
            resource: 'AgentUser'
        }
    }
]

export default AgentRoutes