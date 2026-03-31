// ** Initial State
const initialState = {
    data: [],
    total: 1,
    params: {},
    allData: [],
    Types: []
}

const DesignFeature = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DESIGNFEAUTRE':
            return {
                ...state,
                data: action.data,
                allData: action.data,
                total: action.totalPages
            }
        case 'GET_DESIGNFETYPESBYROLE':
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

const DesignType = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DESIGNCONFIGUARTION':
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

const DesignTypeList = (state = initialState, action) => {
   
    switch (action.type) {
        case 'GET_DESIGNTYPESLIST':
            return {
                // ...state,
                Types: action.data
            }


        default:
            return { ...state }
    }
}

const RoleDesignConfig = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_ROLE_DESIGNCONFIGUARTION':
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
export { DesignFeature, DesignType, DesignTypeList, RoleDesignConfig }
