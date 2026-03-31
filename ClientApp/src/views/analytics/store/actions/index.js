import axios from 'axios'
import {getActivityLogs, getDesignProperty, getDesignStatastic } from './../../../MethodList'

// ** Get all Data
export const getActivityData = () => {
    return async dispatch => {
        await axios.get(`${getActivityLogs}`).then(response => {
            
            dispatch({
                type: 'GET_ACTIVITYDATA',
                data: response.data
            })
        })
    }
}

export const getDesignPropertyData = () => {
    return async dispatch => {
        await axios.get(`${getDesignProperty}`).then(response => {
            
            dispatch({
                type: 'GET_DESIGNDATA',
                data: response.data
            })
        })
    }
}


export const getDesignStatasticData = () => {
    return async dispatch => {
        await axios.get(`${getDesignStatastic}`).then(response => {
            
            dispatch({
                type: 'GET_DESIGNSTASTICDATA',
                data: response.data
            })
        })
    }
}
