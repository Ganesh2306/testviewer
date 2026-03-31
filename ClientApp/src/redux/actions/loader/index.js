////import {useDispatch} from 'react-redux'

////export const ShowLoader = (val) => {
////    const dispatch = useDispatch()

////    dispatch({
////        type: 'SET_STATE',
////        data: val
////    })
////}


export const ShowLoader = val => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_STATE',
            data: val
        })
    }
}