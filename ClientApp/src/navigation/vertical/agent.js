import {Mail, Home, Circle, Feather, User, Users } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const agentNavs = [
    {
        id: 'agentPage',
        title: 'Agent',
        icon: <User size={18} />,
        children: [
            {
                id: 'agent',
                title: 'Agent',
                icon: <User size={12} />,
                action: 'list',
                resource: 'Agent',
                navLink: `/agent`
            },
            {
                id: 'agentUser',
                title: 'Agent User',
                icon: <Users size={12} />,
                action: 'list',
                resource: 'AgentUser',
                navLink: `/agentuser`
            }
        ]
    }
]
export default agentNavs