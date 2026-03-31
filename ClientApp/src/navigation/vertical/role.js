import {  Mail, Home, Circle, Feather, Command, UserPlus, Tool, List, Target } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const roleNavs = [
    {
        id: 'rolePage',
        title: 'Role',
        icon: <Command size={18} />,
        /*  navLink: `${BasePath}/role`,*/
        children: [
            {
                id: 'role',
                title: 'Role',
                icon: <UserPlus size={12} />,
                action: 'list',
                resource: 'Role',
                navLink: '/role'
            },
            {
                id: 'roleConfiguration',
                title: 'Role Configuration',
                icon: <Tool size={12} />,
                action: 'list',
                resource: 'RoleConfiguration',
                navLink: '/roleConfiguration'
            },
            {
                id: 'roleDesignAccess',
                title: 'Role Design Access',
                icon: <List size={12} />,
                action: 'list',
                resource: 'RoleDesignAccess',
                navLink: '/roleDesignAccess'
            },
            {
                id: 'roleOperations',
                title: 'Role Operations',
                icon: <Target size={12} />,
                action: 'list',
                resource: 'RoleDesignAccess',
                navLink: '/roleOperations'
            }
        ]
    }
]
export default roleNavs