import {Mail, Home, Tool, Circle, Feather, Image, Target} from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const ThreeDNavs = [
    {
        id: 'ThreeDImages',
        title: '3D ',
        icon: <Image size={18} />,
        // navLink: `${BasePath}/threed`,
        // action: 'list',
        // resource: 'threed',
    children: [
        {
            id: 'ThreeDImages',
            title: '3D Images',
            icon: <Image size={12} />,
            navLink: `${BasePath}/threed`,
            action: 'list',
            resource: 'threed'
        },
        {
            id: 'ThreedOperation',
            title: '3D Operations',
            icon: <Target size={12} />,
            navLink: `${BasePath}/ThreedOperation`,
            action: 'list',
            resource: 'threedOperation'
        },
        {
            id: 'ThreedConfiguration',
            title: '3D Products',
            icon: <Tool size={12} />,
            navLink: `${BasePath}/ThreedConfiguration`,
            action: 'list',
            resource: 'threedProduct'
        }
    ]
    }
]
export default ThreeDNavs