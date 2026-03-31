import { Mail, Home, Circle, Feather, User, Users  } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const customerNavs = [
    {
        id: 'customerPage',
        title: 'Customer',
        icon: <User size={20} />,
        children: [
            {
                id: 'customer',
                title: 'Customer',
                icon: <User size={12} />,
                action: 'list',
                resource: 'Customer',
                navLink: `/customer`
            },
            {
                id: 'customerUser',
                title: 'Customer User',
                icon: <Users size={12} />,
                action: 'list',
                resource: 'CustomerUser',
                navLink: `/customeruser`
            }
        ]
    }
]
export default customerNavs