const serviceUrl = '.'

const validateUser = `${serviceUrl}/Login/ValidateUser`

const Q3durl = `${serviceUrl}/Login/Q3durl`

const login = `${serviceUrl}/Login/LoginAdmin`

const logoutUser = `${serviceUrl}/Login/Logout`

const getOrganizations = `${serviceUrl}/Organization/Organization`
const SearchOrganisation = `${serviceUrl}/Organization/SearchOrganisation`
const SearchOrganisationUsers = `${serviceUrl}/Organization/SearchOrganisationUsers`

const SaveOrganisation = `${serviceUrl}/Organization/SaveOrganisation`
const DatabaseMigration = `${serviceUrl}/Organization/DatabaseMigration`
const getOrganizationUsers = `${serviceUrl}/Organization/OrganizationUser`

const GetEditOrg = `${serviceUrl}/Organization/GetEditOrg`

const saveOrganisationUsers = `${serviceUrl}/Organization/SaveOrganisationUser`

const GetConfigureOrg1 = `${serviceUrl}/Organization/GetConfigureOrg`

const getOrganizationsRequest = `${serviceUrl}/Organization/OrganizationRequest`
const SearchOrganisationRequest = `${serviceUrl}/Organization/SearchOrganisationRequest`

const GetEditOrgUser = `${serviceUrl}/Organization/GetEditOrgUser`

const getSuppliers = `${serviceUrl}/Supplier/Suppliers`
const SearchSupplier = `${serviceUrl}/Supplier/SearchSupplier`
const getEditSupplier = `${serviceUrl}/Supplier/GetEditSupplier`

const saveSupplier = `${serviceUrl}/Supplier/SaveSupplier`
const saveSupplierCustomerConfiguration = `${serviceUrl}/Supplier/SaveSupplierCustomerConfiguration`
const getconfiguredSupplierlist = `${serviceUrl}/Design/GetSupplierList`
const getconfiguredCustomerlist = `${serviceUrl}/Supplier/GetConfiguredCustomerList`

const getSupplierUsers = `${serviceUrl}/Supplier/SupplierUsers`
const SearchSupplierUsers = `${serviceUrl}/Supplier/SearchSupplierUsers`

const getEditSupplierUser = `${serviceUrl}/Supplier/GetEditSupplierUser`

const saveSupplierUser = `${serviceUrl}/Supplier/SaveSupplierUser`

const getSupplierCustomers = `${serviceUrl}/Supplier/SupplierCustomers`

const SearchSupplierCustomers = `${serviceUrl}/Supplier/SearchSupplierCustomers`

const getAgents = `${serviceUrl}/Agent/Agents`
const SearchAgent = `${serviceUrl}/Agent/SearchAgent`

const GetAgentById = `${serviceUrl}/Agent/GetAgentById`

const SaveAgent = `${serviceUrl}/Agent/SaveAgent`

const getCustomers = `${serviceUrl}/Customer/Customers`
const getSearchCustomers = `${serviceUrl}/Customer/SearchCustomers`
const getShareCustomer = `${serviceUrl}/Customer/GetShareCustomer`
const getCollectionList = `${serviceUrl}/Seasonal/getCollectionList`
const getEditSeasonList = `${serviceUrl}/Seasonal/getEditSeasonList`

const getEditCustomer = `${serviceUrl}/Customer/GetEditCustomer`

const saveCustomer = `${serviceUrl}/Customer/SaveCustomer`

const updateCustomer = `${serviceUrl}/Customer/UpdateCustomer`

const getCustomerUsers = `${serviceUrl}/Customer/CustomerUsers`
const SearchCustomerUSers = `${serviceUrl}/Customer/SearchCustomerUSers`

const getEditCustomerUser = `${serviceUrl}/Customer/GetEditCustomerUser`

const deleteCustomerUser = `${serviceUrl}/Customer/DeleteCustomer`

const saveCustomerUser = `${serviceUrl}/Customer/SaveCustomerUser`

const getAgentUsers = `${serviceUrl}/Agent/AgentUsers`
const SearchAgentUser = `${serviceUrl}/Agent/SearchAgentUsers`

const saveAgentUsers = `${serviceUrl}/Agent/SaveAgentUSer`

const EditAgentUser = `${serviceUrl}/Agent/getEditAgentUSer`

const getActivityLogs = `${serviceUrl}/Analytics/ActivityLogs`

const getDesignProperty = `${serviceUrl}/Analytics/DesignProperty`

const getDesignStatastic = `${serviceUrl}/Analytics/DesignStatastic`

const RejectRequest = `${serviceUrl}/Organization/RejectRequest`

const getRoleByRoleType = `${serviceUrl}/Role/getRoleByRoleType`

const getDesignTypesByRole = `${serviceUrl}/Role/getDesignTypesByRole`

const getDesignGroupsByRole = `${serviceUrl}/Role/getDesignGroupsByRole`

const getDesignFeaturesByRole = `${serviceUrl}/Role/getDesignFeaturesByRole`

const getEmailConfigurationsById = `${serviceUrl}/Organization/getEmailConfigurationsById`

const GetSeasonMastersList = `${serviceUrl}/Seasonal/GetSeasonMastersList`
const searchSeason = `${serviceUrl}/Seasonal/CollezioniSearchSeasonMastersList`
const GetQ3DProducts = `${serviceUrl}/ThreeD/GetQ3DProducts`
const GetCollectionList = `${serviceUrl}/Supplier/GetCollectionList`
const GetSeasonalCollectionList = `${serviceUrl}/Supplier/GetSeasonalCollectionList`
const SaveCustomerShareConfiguration = `${serviceUrl}/Supplier/SaveCustomerShareConfiguration` // shubham Added purpose: save share customer configurations
const GetCustomerShareConfigurationById = `${serviceUrl}/Supplier/GetCustomerShareConfigurationById`
export {
     DatabaseMigration, SearchOrganisation, SearchOrganisationRequest, SearchOrganisationUsers, SearchSupplierUsers, SearchSupplier,
     SearchSupplierCustomers, SearchAgentUser, SearchAgent, SearchCustomerUSers, getRoleByRoleType, getSearchCustomers, getDesignTypesByRole,
     getDesignGroupsByRole, getDesignFeaturesByRole, GetAgentById, SaveAgent, getEditSupplier, getEditSupplierUser, saveSupplier, saveSupplierUser,
     updateCustomer, GetConfigureOrg1, RejectRequest, validateUser, logoutUser, getOrganizationsRequest, getEditCustomerUser, deleteCustomerUser,
     saveCustomerUser, saveCustomer, getEditCustomer, GetEditOrg, GetEditOrgUser, SaveOrganisation, login, getOrganizations, getOrganizationUsers,
     saveOrganisationUsers, getSuppliers, getSupplierUsers, getSupplierCustomers, getCustomers, getCustomerUsers, getAgents, getAgentUsers,
     saveAgentUsers, EditAgentUser, getActivityLogs, getDesignProperty, getDesignStatastic, getEmailConfigurationsById, getShareCustomer,
     getCollectionList, Q3durl, getEditSeasonList, getconfiguredSupplierlist, getconfiguredCustomerlist, saveSupplierCustomerConfiguration,
     GetSeasonMastersList, searchSeason, GetQ3DProducts, GetCollectionList, GetSeasonalCollectionList, SaveCustomerShareConfiguration, GetCustomerShareConfigurationById
}