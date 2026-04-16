import { Home, Mail, Menu, Briefcase, Grid, Circle, Layers, Feather, Book, ShoppingCart, Settings, HelpCircle, CreditCard, Power, Edit } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={14} />,
    navLink: '/home'
  },
  {
    id: 'design',
    title: 'Designs',
    icon: <Grid size={14} />,
    navLink: '/design'
  },
  {
    id: 'collection',
    title: 'Collections',
    icon: <Layers size={14} />,
    navLink: '/collection'
    },
    {id: 'Seasonal',
    title: 'Seasonal',
    icon: <Feather size={14} />,
    navLink: '/SeasonHome'
    },
    {
        id: 'Viewboard',
        title: 'My Boards',
        icon: <Book size={14} />,
        navLink: '/Viewboards'
    },
    {
    id: 'cart_page',
    title: 'Cart',
    icon: <ShoppingCart size={14} />,
    navLink: '/cart'
    },
    {
        id: 'order_page',
        title: 'Orders',
        icon: <Briefcase size={14} />,
        navLink: '/order'
    },

    {
        header: 'Setup'
    },
    {
        id: 'screen_dpi',
        title: 'Setup Screen DPI',
        icon: <Settings size={14} />,
        navLink: '/screensetup'
    },  
    {
        header: 'Other'
    },
    {
        id: 'viewer_help',
        title: 'Help',
        icon: <HelpCircle size={14} />,
        navLink: '/help'
    },
    {
        id: 'profile_page',
        title: 'My Profile',
        icon: <CreditCard size={14} />,
        navLink: '/profile'
    },
    {
        id: 'ch_pass',
        title: 'Change Password',
        icon: <Edit size={14} />,
        navLink: '/passwordchange'
    },
    {
        id: 'logout',
        title: 'Logout',
        icon: <Power size={14} />,
        navLink: '/logout'
    }
]
