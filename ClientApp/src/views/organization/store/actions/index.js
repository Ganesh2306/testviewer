import axios from 'axios'
import { getOrganizationUsers, SearchOrganisationRequest, SearchOrganisation, SearchOrganisationUsers, getOrganizations, SaveOrganisation, GetEditOrg, GetEditOrgUser, saveOrganisationUsers, getOrganizationsRequest, GetConfigureOrg1} from '../../../MethodList'

//Get All Orgnisation
export const getOrgData = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post(`${getOrganizations}`, obj).then(response => {
            dispatch({
                type: 'GET_ORG_DATA',
                data: response.data.allOrgList,
                totalPages: response.data.totalRecords
            })
        })
    }
}
export const getOrgDataSearch = params => {
    const obj = new Object()

    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post(`${SearchOrganisation}`, obj).then(response => {
            dispatch({
                type: 'GET_ORG_DATA',
                data: response.data.allOrgList,
                totalPages: response.data.totalRecords
            })
        })
    }
}

// ** Add new Orgnisation
export const addOrg = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${SaveOrganisation}`, user)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    data: response.data
                })
                dispatch(getOrgData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get(`${getOrganizationUsers}`).then(response => {
      
      dispatch({
        type: 'GET_ALL_DATA',
          data: response.data.organisationUserListDto
      })
    })
  }
}

// ** Get data on page or row change
export const getDataSearch = params => {
    
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post(`${SearchOrganisationUsers}`, obj).then(response => {
      dispatch({
        type: 'GET_DATA',
          data: response.data.organisationUserListDto,
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
        await axios.post(`${getOrganizationUsers}`, obj).then(response => {
            dispatch({
                type: 'GET_DATA',
                data: response.data.organisationUserListDto,
                totalPages: response.data.totalRecords
            })
        })
    }
}
// ** Add Organiosation User
export const addOrgUser = orgUser => {
    
    return (dispatch, getState) => {
        axios
            .post(`${saveOrganisationUsers}`, orgUser)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    data: response.data
                })

                const obj = new Object()
                obj.page = 0
                obj.perPage = 7
                dispatch(getData(obj))

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}
// ** Add Organisation User


// ** Edit Org User
export const getEditOrgUser = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${GetEditOrgUser}`, user)
            .then(response => {
                dispatch({
                    type: 'GET_USER',
                    selectedUser: response.data
                })

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// **

// **
export const deleteOrgUser = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${saveOrganisationUsers}`, user)
            .then(response => {

                dispatch(getData())

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}
//**
export const getEditOrg = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${GetEditOrg}`, user)
            .then(response => {
                dispatch({
                    type: 'GET_USER',
                    selectedUser: response.data
                })

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
export const getConfigureOrg = user => {
    return (dispatch, getState) => {
        axios
            .post(`${GetConfigureOrg1}`, user)
            .then(response => {
                dispatch({
                    type: 'GET_USER',
                    selectedUser: response.data
                })
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
// ** Delete Orgnisation
export const DeleteOrg = user => {
    
    return (dispatch, getState) => {
        axios
            .post(`${ SaveOrganisation}`, user)
            .then(response => {

                dispatch(getOrgData())
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

// ** Org Request
export const getOrgRequest = params => {
    
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post(`${getOrganizationsRequest}`, obj).then(response => {
            dispatch({
                type: 'GET_Req_DATA',
                data: response.data.allRequestList,
                totalPages: response.data.totalCount
            })
        })
    }
}

export const getOrgRequestSearch = params => {
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post(`${SearchOrganisationRequest}`, obj).then(response => {
            dispatch({
                type: 'GET_Req_DATA',
                data: response.data.allRequestList,
                totalPages: response.data.totalCount
            })
        })
    }
}

