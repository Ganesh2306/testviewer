// ** Initial State
// ** Initial State
const initialState = {
    allData: [],
    data: [],
    total: 1,
    params: {},
    selectedUser: null,
    IsSave:null  
}
export const users = (state = initialState, action) => {
   // 
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        case 'GET_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        case 'GET_USER':
            return { ...state, selectedUser: action.selectedUser }
        case 'ADD_USER':
            return { ...state, IsSave: action.data }
        case 'DELETE_USER':
            return { ...state }
        default:
            return { ...state }
    }
}
export const organization = (state = initialState, action) => {
   // 
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        case 'GET_ORG_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
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
export const orgRequest = (state = initialState, action) => {
    
    switch (action.type) {

        case 'GET_Req_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        default:
            return { ...state }
    }
}
