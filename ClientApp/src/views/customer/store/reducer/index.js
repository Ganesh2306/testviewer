// ** Initial State
// ** Initial State
const initialState = {
    allData: [],
    data: [],
    total: 1,
    params: {},
    selectedCustomer: null,
    selectedCustomerUser: null,
    CustomerUsers: [],
    totalCustUsers: 1
}

//const initialStateCustUsers = {
//    allData: [],
//    data: [],
//    total: 1,
//    params: {},
//    selectedUser: null,
    
//}
const customer = (state = initialState, action) => {
    //initialState.allData(state => [...state, action.data])
    
    switch (action.type) {
        case 'GET_ALL_DATA':
            return { ...state, allData: action.data }
        case 'GET_CUST_DATA':
            return {
                ...state,
                data: action.data,
                totalCustUsers: action.totalPages,
                allData: action.data
            }

        case 'GET_USER':
            return { ...state, selectedCustomer: action.selectedCustomer }
        case 'ADD_USER':
            return { ...state }
        case 'DELETE_USER':
            return { ...state }
        default:
            return { ...state }
    }
}

const Customerusers = (state = initialState, action) => {
    
    switch (action.type) {
       

        case 'GET_CUSTOMERUSERS':
            return {
                ...state,
                data: action.data,
                totalCustUsers: action.totalPages
                
            }
        case 'GET_USER':
            return { ...state, selectedCustomerUser: action.selectedCustomerUser }
        default:
            return { ...state }

    }
}
export { Customerusers, customer}

