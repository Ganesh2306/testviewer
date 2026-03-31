import axios from 'axios'
import { param } from 'jquery'
import { getCollectionList, getEditSeasonList, GetSeasonMastersList  } from '../../../MethodList'
// ** Get table Data
export const getData = params => {
  return async dispatch => {
    await axios.get('./api/datatables/data', params).then(response => {
      console.log(params)
      dispatch({
        type: 'GET_DATA',
        allData: response.data.allData,
        data: response.data.invoices,
        totalPages: response.data.total,
        params
      })
    })
  }
}
export const getSeasonDataSearch = params => {
  const obj = new Object()
  obj.searchString = params.searchvale
  obj.Start = params.page
  obj.End = params.perPage
  return async dispatch => {
      await axios.post('./Role/SearchRoles', obj).then(response => {
          console.log(params)
          dispatch({
              type: 'GET_DATA',
              data: response.data.allRolesList,
              totalPages: response.data.totalCount
          })
      })
  }
}


export const getEditSeason = season => {
    
    return (dispatch, getState) => {
        axios
        
             .post(`${getEditSeasonList}`, season)
            .then(response => {
                
                dispatch({
                    type: 'GET_SEASON',
                    selectedCustomer: response.data
                })

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
}

export const getdeleteSeason = season => {
  return (dispatch, getState) => {
      axios
          .post(`./Season/GetDeleteSeason`, season)
          .then(response => {
              dispatch(getData())
          })
          .then(() => {

          })
          .catch(err => console.log(err))
  }
}

export const getCollection = user => {
      return (dispatch, getState) => {
      axios
          .post(`${getCollectionList}`, user)
          .then(response => {
              
              dispatch({
                  type: 'GET_USER',
                  selectedCustomer: response.data
              })

          })
          .then(() => {

          })
          .catch(err => console.log(err))
  }
}

export const CollezioniGetSeasonMastersList = params => {
  const obj = new Object()
  obj.Start = params.page
  obj.End = params.perPage
  //obj.SupplierId = params.SupplierId
  //obj.OrganisationId = params.OrganisationId
  return async dispatch => {
      await axios.post(`./Seasonal/GetSeasonMastersList?Start=${obj.Start}&End=${obj.End}`, obj).then(response => {
          dispatch({
              type: 'get_CollezioniGetSeasonMastersList',
              data: response.data.seasonMastersList,
              totalPages: response.data.totalCount
          })
      })
  }
}


export const GetEditSeason = seasonMaster => {
  const obj = new Object()
  obj.season_Id = seasonMaster.sm_Season_Id
  return (dispatch, getState) => {
      axios
          .post(`./Seasonal/CollezioniGetSeasonMastersById?SeasonId=${obj.season_Id}`)
          .then(response => {
              
              dispatch({
                  type: 'GET_Season',
                  selectedseasonal: response.data.seasonMaster
              })

          })
          .then(() => {

          })
          .catch(err => console.log(err))
  }
}

export const CollezioniSearchSeasonMastersList = params => {
  const obj = new Object()
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
  return async dispatch => {
      await axios.post(`./Seasonal/CollezioniSearchSeasonMastersList?SearchString=${obj.searchString}&Start=${obj.Start}&End=${obj.End}`, obj).then(response => {
          dispatch({
              type: 'get_CollezioniGetSeasonMastersList',
              data: response.data.seasonMastersList,
              totalPages: response.data.totalCount
          })
      })
  }
}

export const GetCollectionListBySeasonId = params => {
  const obj = new Object()
    obj.SeasonID = params.SeasonID
    obj.Start = params.page
    obj.End = params.perPage
  return async dispatch => {
      await axios.post(`./Seasonal/GetCollectionListBySeasonId?SeasonID=${obj.SeasonID}&Start=${obj.Start}&End=${obj.End}`, obj).then(response => {
          dispatch({
              type: 'get_GetCollectionListBySeasonId',
              data: response.data.myCollection,
              totalPages: response.data.totalCount
          })
      })
  }
}

export const SearchCollectionListBySeasonId = params => {
  const obj = new Object()
    obj.SeasonID = params.SeasonID
    obj.searchString = params.searchvale
    obj.Start = params.page
    obj.End = params.perPage
  return async dispatch => {
      await axios.post(`./Seasonal/SearchCollectionListBySeasonId?SeasonID=${obj.SeasonID}&SearchString=${obj.searchString}&Start=${obj.Start}&End=${obj.End}`, obj).then(response => {

          dispatch({
              type: 'get_GetCollectionListBySeasonId',
              data: response.data.myCollection,
              totalPages: response.data.totalCount
          })
      })
  }
}

export const GetEditCollection = my_Collection => {
  const obj = new Object()
  obj.CollectionId = my_Collection.collection_Id
  return (dispatch, getState) => {
      axios
          /*.post(`./Seasonal/GetCollectionById?CollectionId=${obj.CollectionId}`)*/
          .get(`./Seasonal/GetCollectionById?CollectionId=${obj.CollectionId}`)
          .then(response => {
              
              dispatch({
                  type: 'GET_Collection',
                  selectedcollection: response.data.my_Collection
              })

          })
          .then(() => {

          })
          .catch(err => console.log(err))
  }
}