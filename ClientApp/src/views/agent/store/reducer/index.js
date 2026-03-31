// ** Initial State
// ** Initial State
const initialState = {
    allData: [],
    data: [],
    total: 1,
    params: {},
    selectedUser: null,
    CustomerUsers: [],
    totalCustUsers: 1
}


const Agent = (state = initialState, action) => {
 
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        case 'GET_AGENT_DATA':
            return {
                ...state,
                data: action.data,
                totalCustUsers: action.totalPages,
                params: action.params
            }

        case 'GET_USER':
            return { ...state, selectedUser: action.selectedUser }
        case 'ADD_USER':
            return { ...state }
        case 'DELETE_USER':
            return { ...state }
        default:
            return { ...state }
    }
}

const Agentusers = (state = initialState, action) => {
    
    switch (action.type) {


        case 'GET_AGENTUSERS':
            return {
                ...state,
                data: action.data,
                totalCustUsers: action.totalPages
                
            }
        default:
            return { ...state }

    }
}
export { Agentusers, Agent }

