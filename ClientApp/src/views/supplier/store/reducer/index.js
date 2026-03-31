// ** Initial State
const initialState = {
    allData: [],
    data: [],
    total: 1,
    params: {},
    selectedSupplier: null,
    selectedSupplierUser: null,
    selectedSupplierCustomer: null
}

export const suppliers = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        case 'GET_SUP_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        
        case 'GET_USER':
            return { ...state, selectedSupplier: action.selectedSupplier }
        case 'ADD_USER':
            return { ...state }
        case 'DELETE_USER':
            return { ...state }
        default:
            return { ...state }
    }
}


export const supplierusers = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        
        case 'GET_SU_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        case 'GET_USER':
            return { ...state, selectedSupplierUser: action.selectedSupplierUser }
        case 'ADD_USER':
            return { ...state }
        case 'DELETE_USER':
            return { ...state }
        default:
            return { ...state }
    }
}

export const SupplierCustomers = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        
        case 'get_configuredCustomer':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        case 'GET_USER':
            return { ...state, selectedSupplierCustomer: action.selectedSupplierCustomer }
        case 'ADD_USER':
            return { ...state }
        case 'DELETE_USER':
            return { ...state }
        default:
            return { ...state }
    }
}

export const ShareCollections = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COL_DATA':
            return { ...state, allData: action.data }
        case 'GET_COL_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        
        // case 'GET_USER':
        //     return { ...state, selectedSupplier: action.selectedSupplier }
        // case 'ADD_USER':
        //     return { ...state }
        // case 'DELETE_USER':
        //     return { ...state }
        default:
            return { ...state }
    }
}

export const ShareSeasonalCollection = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SEA_DATA':
            return { ...state, allData: action.data }
        case 'GET_SEA_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            }
        
        // case 'GET_USER':
        //     return { ...state, selectedSupplier: action.selectedSupplier }
        // case 'ADD_USER':
        //     return { ...state }
        // case 'DELETE_USER':
        //     return { ...state }
        default:
            return { ...state }
    }
}

export const sharedCustomerConfig = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_SHARE_CONFIG':
            return { ...state, allData: action.data }
         case 'GET_SEA_DATA':
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