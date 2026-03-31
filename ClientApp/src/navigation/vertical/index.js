import { Mail, Home, Circle, Feather } from 'react-feather'
import analyticsNavs from './analytics'
import agentNavs from './agent'
import customerNavs from './customer'
import dashboardNavs from './dashboard'
import designNavs from './design'
import ThreeDNavSingle from './threedsingle'
import inventoryNavs from './inventory'
import managementNavs from './management'
import organizationNavs from './organization'
import roleNavs from './role'
import supplierNavs from './supplier'
import ThreeDNavs from './threed'
import SeasonalNavs from './seasonal'
import { isMobile, MobileView  } from 'react-device-detect'

const BasePath = ''
//const org_type = JSON.parse(localStorage.getItem('userData')).org_type

const allRoutes = !MobileView ? [
    //...dashboardNavs, //hided link as per requirement manisha
    ...designNavs,
    ...organizationNavs,
    ...roleNavs,
    ...managementNavs,
    ...customerNavs,
    ...agentNavs,
    ...supplierNavs,
    // ...SeasonalNavs,
    // ...inventoryNavs,
    // ...analyticsNavs,
   //    ...ThreeDNavSingle, 
    ...ThreeDNavs

 ] : isMobile ? [
 ...dashboardNavs,
...designNavs
// ...inventoryNavs,
// ...analyticsNavs 
] : [
    //...dashboardNavs,
    ...designNavs,
    ...organizationNavs,
    ...roleNavs,
    ...managementNavs,
    ...customerNavs,
    ...agentNavs,
    ...supplierNavs,
    // ...SeasonalNavs,
    // ...inventoryNavs,
    // ...analyticsNavs,
    // ...ThreeDNavSingle,
    ...ThreeDNavs 
   
]
 export default allRoutes