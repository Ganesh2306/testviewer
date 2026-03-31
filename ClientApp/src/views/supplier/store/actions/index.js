import axios from 'axios'
import { getSupplierCustomers, SearchSupplierCustomers, getCustomers, SearchSupplier, SearchSupplierUsers, getSuppliers, getSupplierUsers, saveSupplierCustomerConfiguration, getconfiguredCustomerlist, saveSupplier, saveSupplierUser, getEditSupplier as geteditSupplier, getEditSupplierUser as getEditSupplieruser, GetCollectionList, GetSeasonalCollectionList, SaveCustomerShareConfiguration, GetCustomerShareConfigurationById } from './../../../MethodList'

// ** Get all Data
export const getAllData = () => {
    return async dispatch => {
        await axios.get(`${getSupplierUsers}`).then(response => {
            dispatch({
                type: 'GET_ALL_DATA',
                data: response.data
            })
        })
    }
}

//Get Configured Customer List
export const getconfigureCustomer = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    obj.SupplierId = params.SupplierId
    //obj.OrganisationId = params.OrganisationId
    return async dispatch => {
        await axios.post(`${getconfiguredCustomerlist}?SupplierID=${obj.SupplierId}&Start=${obj.Start}&End=${obj.End}`, obj).then(response => {
        //await axios.get(`${getconfiguredCustomerlist}?SupplierID=${obj.SupplierId}`).then(response => {
            dispatch({
                type: 'get_configuredCustomer',
                data: response.data.customerListDto,
                totalPages: response.data.totalRecords
            })
        })
    }
}

export const SearchConfiguredCustomersList = params => {
    const obj = new Object()
    obj.SupplierId = params.SupplierId
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    //obj.OrganisationId = params.OrganisationId
    return async dispatch => {
        await axios.post(`/Supplier/SearchConfiguredCustomersList?SupplierID=${obj.SupplierId}&SearchString=${obj.searchString}&Start=${obj.Start}&End=${obj.End}`, obj).then(response => {
            dispatch({
                type: 'get_configuredCustomer',
                data: response.data.customerListDto,
                totalPages: response.data.totalRecords
            })
        })
    }
}

//get customer  data
export const getCustomerUsers = params => {

    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    obj.CustomerId = params.CustomerId
     return async dispatch => {
         await axios.post(`${getCustomers}`, obj).then(response => {
             
            dispatch({
                type: 'GET_CUSTOMERUSERS',
                data: response.data.getCustomerUserList,
                totalPages: response.data.totalRecords
            })
        })
    }
}

// ** Get data on page or row change
export const getSUData = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    obj.SupplierId = params.SupplierId
    return async dispatch => {
        await axios.post(`${getSupplierUsers}`, obj).then(response => {
            dispatch({
                type: 'GET_SU_DATA',
                data: response.data.supplierUserListDto,
                totalPages: response.data.totalRecords

            })
        })
    }
}
export const getSUDataSearch = params => {
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    obj.SupplierId = params.SupplierId
    return async dispatch => {
        await axios.post(`${SearchSupplierUsers}`, obj).then(response => {
            dispatch({
                type: 'GET_SU_DATA',
                data: response.data.supplierUserListDto,
                totalPages: response.data.totalRecords

            })
        })
    }
}
// 
// ** Get data on page or row change
export const getSUCData = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    obj.SupplierId = params.SupplierId
    return async dispatch => {
        await axios.post(`${getSupplierCustomers}`, obj).then(response => {
            dispatch({
                type: 'GET_SU_DATA',
                data: response.data.supplierUserListDto,
                totalPages: response.data.totalRecords

            })
        })
    }
}
export const getSUCDataSearch = params => {
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    obj.SupplierId = params.SupplierId
    return async dispatch => {
        await axios.post(`${SearchSupplierCustomers}`, obj).then(response => {
            dispatch({
                type: 'GET_SU_DATA',
                data: response.data.supplierUserListDto,
                totalPages: response.data.totalRecords

            })
        })
    }
}
export const getData = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post(`${getSuppliers}`, obj).then(response => {
            dispatch({
                type: 'GET_SUP_DATA',
                data: response.data.supplierListDto,
                totalPages: response.data.totalRecords 

            })
        })
    }
}

export const getDataSearch = params => {
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage

    return async dispatch => {
        await axios.post(`${SearchSupplier}`, obj).then(response => {
            dispatch({
                type: 'GET_SUP_DATA',
                data: response.data.supplierListDto,
                totalPages: response.data.totalRecords

            })
        })
    }
}
export const getUser = id => {
    return async dispatch => {
        dispatch({
            type: 'GET_USER',
            selectedUser: id
        })

    }
}

// ** Add new user
export const addUser = user => {
    return (dispatch, getState) => {
        axios
            .post('https://localhost:44389/Login/SaveUser', user)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    user
                })
                dispatch(getData(getState().users.params))
                dispatch(getAllData())
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}


// ** Add new user
export const EditUSer = user => {
    return (dispatch, getState) => {
        axios
            .post('https://localhost:44389/Login/EditUSer', user)
            .then(response => {
                dispatch({
                    type: 'EDIT_USER',
                    user
                })
                //dispatch(getData(getState().users.params))
                //dispatch(getAllData())
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Delete user
export const deleteUser = id => {
    return (dispatch, getState) => {
        dispatch({
            type: 'DELETE_USER',
            selectedUser: id
        })
    }
}

// ** Add Supplier
export const addSupplier = supplier => {

    return (dispatch, getState) => {
        axios
            .post(`${saveSupplier}`, supplier)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    data: response.data
                })
                dispatch(getData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Delete Supplier 
export const deleteSupplier = supplier => {

    return (dispatch, getState) => {
        axios
            .post(`${saveSupplier}`, supplier)
            .then(response => {

                dispatch(getData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Get Single Supplier User
export const getEditSupplier = supplier => {
    return (dispatch, getState) => {
        axios
            .post(`${geteditSupplier}`, supplier)
            .then(response => {
                
                dispatch({
                    type: 'GET_USER',
                    selectedSupplier: response.data.supplier
                })

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}


// ** Add Supplier User
export const addSupUser = supUser => {

    return (dispatch, getState) => {
        axios
            .post(`${saveSupplierUser}`, supUser)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    data: response.data
                })
                dispatch(getSUData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Delete Supplier User
export const deleteSupplierUser = supUser => {

    return (dispatch, getState) => {
        axios
            .post(`${saveSupplierUser}`, supUser)
            .then(response => {

                dispatch(getSUData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Delete Supplier Customer configuration
export const deleteSupplierCustomer = supCustomer => {

    return (dispatch, getState) => {
        axios
            .post(`${saveSupplierCustomerConfiguration}`, supCustomer)
            .then(response => {

                dispatch(getSUData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Get Single Supplier User
export const getEditSupplierUser = supUser => {

    return (dispatch, getState) => {
        axios
            .post(`${getEditSupplieruser}`, supUser)
            .then(response => {
                dispatch({
                    type: 'GET_USER',
                    selectedSupplierUser: response.data
                })

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}
export const GetCollectionsList = params => {
    const obj = new Object()
    obj.SupplierId = params.SupplierId
    return async dispatch => {
        await axios.post(`${GetCollectionList}`, obj).then(response => {
            dispatch({
                type: 'GET_COL_DATA',
                data: JSON.parse(response.data).collections
                //totalPages: response.data

            })
        })
    }
}
export const GetSeasonalCollectionsList = params => {
    const obj = new Object()
    obj.SupplierId = params.SupplierId
    return async dispatch => {
        await axios.post(`${GetSeasonalCollectionList}`, obj).then(response => {
            dispatch({
                type: 'GET_SEA_DATA',
                data: JSON.parse(response.data).seasonalCollectionList 
                //totalPages: response.data

            })
        })
    }
}

export const _SaveCustomerShareConfiguration = async(params) => {
    const obj = new Object(params)
   return await axios.post(`${SaveCustomerShareConfiguration}`, obj)

}

export const _getCustomerShareConfiguration =  async(params) => {
    const obj = new Object(params)
    //return  async dispatch => {
    return  await axios.post(`${GetCustomerShareConfigurationById}`, obj)
    //.then((response) => {
        // dispatch({
        //     type: 'GET_SHARE_CONFIG',
        //     data: JSON.parse(response.data)
        //     })
        // })
  //  }
}