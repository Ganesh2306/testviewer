import AgentRoutes from './agent'
import AnalyticsRoutes from './analytics'
import CustomerRoutes from './customer'
import DashboardRoutes from './dashboard'
import DesignRoutes from './design'
import InventoryRoutes from './inventory'
import LoginRoutes from './login'
import ManagementRoutes from './management'
import OrganizationRoutes from './organisation'
import RoleRoutes from './role'
import SupplierRoutes from './supplier'
import ThreeDImageRoutes from './threed'
import ProfileRoutes from './profile'
import Seasonal from './seasonal'
import ThreeDImageSingleRoutes from './threedSingle'


// ** Document title
const TemplateTitle = '%s - Design Archive Admin Template'

// ** Default Route
const DefaultRoute = `/${process.env.REACT_APP_NUSE_ADMIN ? process.env.REACT_APP_LANDING_PAGE : 'login'}`
const BasePath = ''
//const role = JSON.parse(localStorage.getItem('userData')).role
// ** Merge Routes
const Routes = [
    ...DashboardRoutes,
    ...DesignRoutes,
    ...LoginRoutes,
    ...OrganizationRoutes,
    ...CustomerRoutes,
    ...SupplierRoutes,
    ...RoleRoutes,
    ...AgentRoutes,
    ...AnalyticsRoutes,
    ...InventoryRoutes,
    ...ManagementRoutes,
    ...ThreeDImageRoutes,
    ...ThreeDImageSingleRoutes,
    ...ProfileRoutes,
    ...Seasonal
]
const MobileRoutes = [
    ...LoginRoutes,
    ...DashboardRoutes,
    ...DesignRoutes,
    ...InventoryRoutes,
    ...AnalyticsRoutes
]

export { DefaultRoute, TemplateTitle, Routes, MobileRoutes }

