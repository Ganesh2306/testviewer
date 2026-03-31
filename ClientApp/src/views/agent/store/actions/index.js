import axios from 'axios'
import { GetAgentById, SearchAgentUser, SearchAgent, getAgents, getAgentUsers as getAgentusers, saveAgentUsers, EditAgentUser } from '../../../MethodList'

// ** Get all Data
export const getAllData = () => {
    return async dispatch => {
        await axios.get('').then(response => {
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
        await axios.post(`${getAgents}`, obj).then(response => {
            
            dispatch({
                type: 'GET_AGENT_DATA',
                data: response.data.agentListDto,
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
        await axios.post(`${SearchAgent}`, obj).then(response => {

            dispatch({
                type: 'GET_AGENT_DATA',
                data: response.data.agentListDto,
                totalPages: response.data.totalRecords

            })
        })
    }
}

//get customer user data
export const getAgentUsers = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    obj.AgentId = params.AgentId
    return async dispatch => {
        await axios.post(`${getAgentusers}`, obj).then(response => {
            dispatch({
                type: 'GET_AGENTUSERS',
                data: response.data.agentUserListDto,
                totalPages: response.data.totalRecords
            })
        })
    }
}
export const SearchAgentUsers = params => {
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    obj.AgentId = params.AgentId
    return async dispatch => {
        await axios.post(`${SearchAgentUser}`, obj).then(response => {
            dispatch({
                type: 'GET_AGENTUSERS',
                data: response.data.agentUserListDto,
                totalPages: response.data.totalRecords
            })
        })
    }
}


export const getUser = id => {

    return async dispatch => {
        await axios.get(`${EditAgentUser}`).then(response => {
            dispatch({
                type: 'GET_USER',
                selectedUser: response.data

            })
        })
    }

}

export const getEditAgentUser = obj => {

    return async dispatch => {
        await axios.post(`${EditAgentUser}`, obj).then(response => {
            dispatch({
                type: 'GET_USER',
                selectedUser: response.data
            })
        })
    }
}


export const getEditAgent = obj => {

    return async dispatch => {
        await axios.post(`${GetAgentById}`, obj).then(response => {
            dispatch({
                type: 'GET_USER',
                selectedUser: response.data

            })
        })
    }
}

// ** Add new  Agent user
export const addAgentUser = user => {
    return (dispatch, getState) => {
        axios
            .post(`${saveAgentUsers}`, user)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    data: response.data.data
                })
                //dispatch(getData(getState().users.params))
                //dispatch(getAllData())
                const agtuser = new Object()
                agtuser.id = response.data.req.org_type_id
                dispatch(getAgentUsers(agtuser))
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
