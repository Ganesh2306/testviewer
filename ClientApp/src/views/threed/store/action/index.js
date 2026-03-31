import axios from 'axios'
import {GetQ3DProducts} from './../../../MethodList'
// ** Get roles Data
export const GetQ3DProductsdata = params => {
    const obj = new Object()
    obj.OrganisationId = params.OrganisationId
    return async dispatch => {
        await axios.post(`${GetQ3DProducts}?OrganisationId=${obj.OrganisationId}`, obj).then(response => {
            console.log(params)
            dispatch({
                type: 'GET_Pro_DATA',
                data: JSON.parse(response.data)?.value ? JSON.parse(response.data)?.value : ""
                //totalPages: response.data.totalCount
            })
        })
    }
}

export const getThreeDProductDataSearch = params => {
    const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post('', obj).then(response => {
            console.log(params)
            dispatch({
                type: 'GET_ROLE_DATA',
                data: response.data.allRolesList,
                totalPages: response.data.totalCount
            })
        })
    }
}

