import { Grid, Home, Circle, Feather } from 'react-feather'
const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const SeasonalNavs = [
    {
        id: 'seasonal11',
        title: 'Seasonal Collections...',
        icon: <Grid size={18} />,
        navLink: `${BasePath}/seasonal`,
        action: 'list',
        resource: "seasonal",

        children: [
            {
                id: 'seasons',
                title: 'Seasons',
                icon: <Circle size={12} />,
                action: 'list',
                resource: 'seasonal',
                navLink: `${BasePath}/seasonal`
            },
            {
                id: 'collections',
                title: 'Collections',
                icon: <Circle size={12} />,
                action: 'list',
                resource: 'seasonal',
                navLink: `${BasePath}/collection`
            },
            {
                id: 'assigndesigns',
                title: 'Assign Designs',
                icon: <Circle size={12} />,
                action: 'list',
                resource: 'seasonal',
                navLink: `${BasePath}/AssignDesign`
            },
            {
                id: 'upldesigns',
                title: 'Upload / View Designs',
                icon: <Circle size={12} />,
                action: 'list',
                resource: 'seasonal',
                navLink: `${BasePath}/UploadDesign`
            }
         
        ]

    }
]
export default SeasonalNavs