import axios from 'axios'
const serviceUrl = '.'
const _logoutUser = `${serviceUrl}/Login/Logout`

export const logoutUser = async (param) => {
    const keyRemove = ['DeviceDetailsDto', 'who', 'refreshToken', 'id', 'profile', 'loginuserdata', 'accessToken', 'ForAllSearch', 'accessinfo', 'name', 'board', 'userName', 'userData']

    keyRemove.forEach(key => {
    localStorage.removeItem(key)
    })
    

    try {
        const res = await axios.post(`${_logoutUser}`, param)
        localStorage.clear()
        sessionStorage.clear()
       
        if (res.data === "invalid user") {
            return false
        }
        return res.data
    } catch (err) {
        return "error"
    }
}
//manisha addded below for navbar search
// ** Get Bookmarks Array from @fakeDB
export const getBookmarks = () => {
    return dispatch => {
        return axios.get('./api/bookmarks/data').then(response => {
            dispatch({
                type: 'GET_BOOKMARKS',
                data: response.data.suggestions,
                bookmarks: response.data.bookmarks
            })
        })
    }
}

// ** Update & Get Updated Bookmarks Array
export const updateBookmarked = id => {
    return dispatch => {
        return axios.post('./api/bookmarks/update', { id }).then(() => {
            dispatch({ type: 'UPDATE_BOOKMARKED', id })
        })
    }
}

// ** Handle Bookmarks & Main Search Queries
export const handleSearchQuery = val => dispatch => dispatch({ type: 'HANDLE_SEARCH_QUERY', val })