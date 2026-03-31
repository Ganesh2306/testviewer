import { Mail, Home, Circle, Feather, Codesandbox, GitCommit, Box } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const managementNavs = [
    {
        id: 'managementPage',
        title: 'Design Configuration',
        icon: <Codesandbox size={18} />,
        children: [
            {
                id: 'designtype',
                title: 'Design Type',
                icon: <GitCommit size={12} />,
                action: 'list',
                resource: 'DesignType',
                navLink: `/designtype`
            },
            {
                id: 'designgroup',
                title: 'Design Group',
                icon: <GitCommit size={12} />,
                action: 'list',
                resource: 'DesignGroup',
                navLink: `/designgroup`
            },
            {
                id: 'designfeature',
                title: 'Design Feature',
                icon: <GitCommit size={12} />,
                action: 'list',
                resource: 'DesignFeature',
                navLink: `/designfeature`
            },
            {
                id: 'designconfiguration',
                title: 'Configuration',
                icon: <Box size={12} />,
                action: 'list',
                resource: 'DesignConfiguration',
                navLink: `/designconfiguration`
            }
        ]
    }
]
export default managementNavs