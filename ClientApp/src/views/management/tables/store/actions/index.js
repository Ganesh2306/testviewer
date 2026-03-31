import axios from 'axios'

// ** Get table Data
export const getDesignFeautre = params => {
    
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    return async dispatch => {
        await axios.post('./Management/GetDesignFeatures', obj).then(response => {
         
          dispatch({
              type: 'GET_DESIGNFEAUTRE',
              data: response.data.getDesignFeatureList,
              totalPages: response.data.totalCount
          })
    })
  }
}
export const DesignFeautreSearch = params => {
    const obj = new Object()
    obj.Start = params.page
    obj.End = params.perPage
    obj.searchString = params.searchvale
    return async dispatch => {
        await axios.post('./Management/DesignFeautreSearch', obj).then(response => {

            dispatch({
                type: 'GET_DESIGNFEAUTRE',
                data: response.data.getDesignFeatureList,
                totalPages: response.data.totalCount
            })
        })
    }
}

export const GetDesignTypes = params => {
   
    return async dispatch => {
        await axios.get('./Management/GetDesignConfigurationByOrganisationID').then(response => {
           
            dispatch({
                type: 'GET_DESIGNCONFIGUARTION',
                data: response.data,
                totalPages: 50
            })
        })
    }
}

export const getData = params => {
   
    return async dispatch => {
        await axios.get('./Management/GetDesignFeatures').then(response => {
           
            dispatch({
                type: 'GET_DESIGNFEAUTRE',
                data: response.data,
                totalPages: 50
            })
        })
    }
}


//export const GetDesignTypeList = params => {

//    return async dispatch => {
//        await axios.get('/Management/GetDesignTypeList').then(response => {

//            dispatch({
//                type: 'GET_DESIGNTYPES',
//                data: response.data//,
//                //totalPages: 50
//            })
//        })
//    }
//}

export const GetDesignTypeList = id => {

    return async dispatch => {
        await axios.get(`./Management/GetDesignTypeList`).then(response => {
            dispatch({
                type: 'GET_DESIGNTYPESLIST',
                data: response.data
            })
        })
    }

}

export const GetRoleDesignConfigurtions = id => {

    return async dispatch => {
        await axios.get(`./Role/GetRoleDesignConfigurationByRole?RoleId=${id}`).then(response => {
            dispatch({
                type: 'GET_ROLE_DESIGNCONFIGUARTION',
                data: response.data
            })
        })
    }

}
