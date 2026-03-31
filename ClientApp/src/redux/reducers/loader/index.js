// ** Initial State
// ** Initial State
const initialState = {
    block: false
}


const Loader = (state = initialState, action) => {
  
    switch (action.type) {
        case 'SET_STATE':
            return { ...state, block: action.data }
        default:
            return { ...state }
    }
}


export { Loader}

