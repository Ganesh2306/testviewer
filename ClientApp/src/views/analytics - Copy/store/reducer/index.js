// ** Initial State
const initialState = {
    allData: [],
    data: [],
    total: 1,
    params: {},
    selectedUser: null
}

export const activityLogs = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_ACTIVITYDATA':
            return { ...state, allData: action.data }
        default:
            return { ...state }
    }
}

export const designProperty = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_DESIGNDATA':
            return { ...state, allData: action.data }
        default:
            return { ...state }
    }
}

export const designStatastic = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_DESIGNSTASTICDATA':
            return { ...state, allData: action.data }
        default:
            return { ...state }
    }
}