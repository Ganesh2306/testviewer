import { File, Home, Circle, Feather, ShoppingBag, Heart, Twitch} from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const inventoryNavs = [
    {
        id: 'reportPage',
        title: 'Report',
        icon: <File size={18} />,
        children: [
            {
                id: 'order',
                title: 'Order',
                icon: <Twitch size={12} />,
                action: 'list',
                resource: 'Order',
                navLink: `/order`
            },
            {
                id: 'favourite',
                title: 'Favourite',
                icon: <Heart size={12} />,
                action: 'list',
                resource: 'Favourite',
                navLink: `/favourite`
            },
            {
                id: 'cart',
                title: 'Cart',
                icon: <ShoppingBag size={12} />,
                action: 'list',
                resource: 'Cart',
                navLink: `/cart`
            }
        ]
    }
]
export default inventoryNavs