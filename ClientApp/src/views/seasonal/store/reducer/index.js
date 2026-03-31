// ** Initial State
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedRole: null,
    selectedseasonal : null,
    selectedcollection : null
}

export const roles = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
            break
        case 'GET_SEASON':
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

export const Seasonal = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        
        case 'get_CollezioniGetSeasonMastersList':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        case 'GET_Season':
            return { ...state, selectedseasonal: action.selectedseasonal }
        case 'ADD_Season':
            return { ...state }
        case 'DELETE_Season':
            return { ...state }
        default:
            return { ...state }     
    }
}

export const Collection = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        
        case 'get_GetCollectionListBySeasonId':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        case 'GET_Collection':
            return { ...state, selectedcollection: action.selectedcollection }
        case 'ADD_collection':
            return { ...state }
        case 'DELETE_collection':
            return { ...state }
        default:
            return { ...state }
    }
}

