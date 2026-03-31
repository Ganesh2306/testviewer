import axios from 'axios'

// ** Get roles Data
export const getRolesData = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post('./Role/Roles', obj).then(response => {
            console.log(params)
            dispatch({
                type: 'GET_ROLE_DATA',
                data: response.data.allRolesList,
                totalPages: response.data.totalCount
            })
        })
    }
}

export const getRolesDataSearch = params => {
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post('./Role/SearchRoles', obj).then(response => {
            console.log(params)
            dispatch({
                type: 'GET_ROLE_DATA',
                data: response.data.allRolesList,
                totalPages: response.data.totalCount
            })
        })
    }
}

export const getEditRoleData = role => {

    return (dispatch, getState) => {
        axios
            .post(`./Role/GetEditRole`, role)
            .then(response => {
                
                dispatch({
                    type: 'GET_ROLE',
                    selectedRole: response.data.roles
                })
                
              //  console.log(`State : ${getState().roles.selectedRole.role_Name}`)
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}


export const deleteRole = role => {

    return (dispatch, getState) => {
        axios
            .post(`./Role/SaveRole`, role)
            .then(response => {
                dispatch(getRolesData())
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

export const GetRoleTasks = id => {
    return async dispatch => {
        await axios.get(`./Role/GetRoleTasks?roleId=${id}`).then(response => {
            dispatch({
                type: 'GET_ROLE_TASKS',
                data: response.data
            })
        })
    }
}