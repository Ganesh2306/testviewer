// ** Initial State
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedRole: null
}

export const roles = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_ROLE_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
            break
        case 'GET_ROLE':
            return { ...state, selectedRole: action.selectedRole }
            break
        
        default:
            return state
    }
}

export const RoleTasks = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_ROLE_TASKS':
            return {
                ...state,
                data: action.data,
                allData: action.data,
                total: action.totalPages
            }


        default:
            return { ...state }
    }
}

