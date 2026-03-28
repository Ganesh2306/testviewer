import { Mail, Menu, Briefcase, Grid, Circle } from 'react-feather'

export default [
  {
    id: 'home',
    title: '',
    icon: <Menu size={20} />,
    navLink: '/home'
    },
    {
        id: 'category',
        title: 'category',
        icon: <Grid size={20} />,
        navLink: '/brandingpage'
    },
  {
    id: 'design',
    title: 'Designss',
    icon: <Grid size={20} />,
    navLink: '/design'
  },
  {
    id: 'collection',
    title: 'Collection',
    icon: <Briefcase size={20} />,
    navLink: '/collection'
  }
]
