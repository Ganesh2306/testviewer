import axios from 'axios'
import { updateCustomer, SearchCustomerUSers, getSearchCustomers, getCustomers, getEditCustomer as getEditCust, getShareCustomer as getShareCust, getEditCustomerUser as getEditCustUser, getCustomerUsers as getCustomerusers, saveCustomer, deleteCustomer, saveCustomerUser, deleteCustomerUser } from '../../../MethodList'

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get(`${getOrganizationUsers}`).then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
  
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
  return async dispatch => {
      await axios.post(`${getCustomers}`, obj).then(response => {
          
      dispatch({
          type: 'GET_CUST_DATA',
          data: response.data.customerListDto,
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
        await axios.post(`${getSearchCustomers}`, obj).then(response => {

            dispatch({
                type: 'GET_CUST_DATA',
                data: response.data.customerListDto,
                totalPages: response.data.totalRecords

            })
        })
    }
}
export const getShareCustomer = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${getShareCust}`, user)
            .then(response => {
                
                dispatch({
                    type: 'GET_USER',
                    selectedCustomer: response.data
                })

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

//get customer user data
export const getCustomerUsers = params => {

    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    obj.CustomerId = params.CustomerId
     return async dispatch => {
         await axios.post(`${getCustomerusers}`, obj).then(response => {
             
            dispatch({
                type: 'GET_CUSTOMERUSERS',
                data: response.data.getCustomerUserList,
                totalPages: response.data.totalRecords
            })
        })
    }
}
export const SearchCustomerUsers = params => {

    const obj = new Object()
    obj.searchString = params.searchvale
    obj.CustomerId = params.CustomerId
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post(`${SearchCustomerUSers}`, obj).then(response => {

            dispatch({
                type: 'GET_CUSTOMERUSERS',
                data: response.data.getCustomerUserList,
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


export const getEditCustomer = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${getEditCust}`, user)
            .then(response => {
                
                dispatch({
                    type: 'GET_USER',
                    selectedCustomer: response.data
                })

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Add Customer
export const addCust = _Customer => {
    
    return (dispatch, getState) => {
        axios
            .post(`${saveCustomer}`, _Customer)
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

// ** Modify Customer
export const updateCust = _Customer => {
    
    return (dispatch, getState) => {
        axios
            .post(`${updateCustomer}`, _Customer)
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


// ** Delete Customer
export const deleteCust = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${saveCustomer}`, user)
            .then(response => {

                dispatch(getData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}


// ** Add Customer User
export const addCustUser = customer => {
    
    return (dispatch, getState) => {
        axios
            .post(`${saveCustomerUser}`, customer)
            .then(response => {
                
                dispatch({
                    type: 'ADD_USER',
                    data: response.data.data
                })
                const custuser = new Object()
                custuser.customer_Id = response.data.req.org_type_id
                dispatch(getCustomerUsers(custuser))

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Delete Customer User
export const deleteCustUser = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${saveCustomerUser}`, user)
            .then(response => {
                const custuser = new Object()
                custuser.customer_Id = response.data.req.org_type_id
                dispatch(getCustomerUsers(custuser))

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Get Single Customer User
export const getEditCustomerUser = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${getEditCustUser}`, user)
            .then(response => {
                dispatch({
                    type: 'GET_USER',
                    selectedCustomerUser: response.data
                })

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

