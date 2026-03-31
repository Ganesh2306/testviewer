const initialState = {
    allData: [],
    data: [],
    total: 1,
    params: {},
    selectedOrgnisation: null
}

export const Q3dProducts = (state = initialState, action) => {
    
    switch (action.type) {
        case 'GET_Pro_DATA':
            return { ...state,
                 allData: action.data,
                 data: action.data,
                 params: action.params
                }
        default:
            return { ...state }
    }
}
