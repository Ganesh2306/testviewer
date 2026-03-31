import { Mail, Home, Circle, Feather } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const dashboardNavs = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Home size={18} />,
        navLink: `/dashboard`,
        action: 'display',
        resource: 'Common'
    }
]
export default dashboardNavs