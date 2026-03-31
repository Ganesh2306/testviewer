import {  Mail, Home, Circle, Feather, User, Users  } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const supplierNavs = [
    {
        id: 'supplierPage',
        title: 'Supplier',
        icon: <User size={18} />,
        children: [
            {
                id: 'supplier',
                title: 'Supplier',
                icon: <User size={12} />,
                action: 'list',
                resource: 'Supplier',
                navLink: `${BasePath}/supplier`
            },
            {
                id: 'supplierUser',
                title: 'Supplier User',
                icon: <User size={12} />,
                action: 'list',
                resource: 'SupplierUser',
                navLink: `${BasePath}/supplieruser`
            },
            {
                id: 'supplierCustomer',
                title: 'Supplier Customer',
                icon: <Users size={12} />,
                action: 'list',
                resource: 'SupplierUser',
                navLink: `${BasePath}/suppliercustomer`
            }
        ]
    }
]
export default supplierNavs