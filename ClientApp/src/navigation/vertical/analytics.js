import { BarChart2, Home, Circle, Feather, PieChart, Menu, Layers  } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const analyticsNavs = [
    {
        id: 'analyticsPage',
        title: 'Analytics',
        icon: <BarChart2 size={18} />,
        children: [
            {
                id: 'activityLogs',
                title: 'Activity Logs',
                icon: <BarChart2 size={12} />,
                navLink: `/activityLogs`,
                action: 'list',
                resource: 'ActivityLogs'
            },
            {
                id: 'designProperty',
                title: 'Design Property',
                icon: <Menu size={12} />,
                navLink: `/designProperty`,
                action: 'list',
                resource: 'DesignProperty'
            },
            {
                id: 'designStatastics',
                title: 'Design Statastic',
                icon: <Layers size={12} />,
                navLink: `/designStatastic`,
                action: 'list',
                resource: 'DesignStatastic'
            }
        ]
    }
]
export default analyticsNavs