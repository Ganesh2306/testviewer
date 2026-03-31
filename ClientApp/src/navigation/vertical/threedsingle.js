import {Mail, Home, Tool, Circle, Feather, Image, Target} from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const ThreeDNavSingle = [
    {
        id: 'ThreeDImageSingle',
        title: '3D Images single',
        icon: <Image size={18} />,
        navLink: `${BasePath}/threed`,
        action: 'list',
        resource: 'threed1'
    }
]
export default ThreeDNavSingle

