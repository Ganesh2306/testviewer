// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import { Loader } from './loader'
import { users, organization, orgRequest} from '@src/views/organization/store/reducer'
import { suppliers, supplierusers, SupplierCustomers, ShareCollections, ShareSeasonalCollection } from '@src/views/supplier/store/reducer'
import { Q3dProducts } from '../../views/threed/store/reducer'
import { customer, Customerusers } from '@src/views/customer/store/reducer'
import { Agent, Agentusers } from '@src/views/agent/store/reducer'
import { roles, RoleTasks } from '@src/views/role/store/reducer'
import { activityLogs, designProperty, designStatastic } from '@src/views/analytics/store/reducer'
import { DesignFeature, DesignType, RoleDesignConfig } from '@src/views/management/tables/store/reducer'
import { Seasonal, Collection } from '../../views/seasonal/store/reducer'
import UploadFile from '../../views/design/DesignComponent/redux/uploadFile/uploadFile.reducer'

const rootReducer = combineReducers({
  //  Loader,
    auth,
    navbar,
    layout,
    users,
    organization,
    orgRequest,
    roles,
    RoleTasks,
    Seasonal,
    Collection,
    DesignFeature,
    DesignType,
    RoleDesignConfig,
    suppliers,
    supplierusers,
    SupplierCustomers,
    ShareCollections,
    ShareSeasonalCollection,
    Q3dProducts,
    customer,
    Customerusers,
    Agent,
    Agentusers,
    activityLogs,
    designProperty,
    designStatastic,
    UploadFile    
})

export default rootReducer
