import { Mail, Home, Circle, Feather, Image } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const designNavs = [
    {
        id: 'design',
        title: 'Design',
        icon: <Image size={18} />,
        navLink: `${BasePath}/design`,
        action: 'list',
        resource: 'Design'
    }
]
export default designNavs