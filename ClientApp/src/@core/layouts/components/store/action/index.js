import axios from 'axios'
const serviceUrl = '.'
const _logoutUser = `${serviceUrl}/Login/Logout`

export const logoutUser = async (param) => {
    localStorage.clear()
    document.cookie = 'deviceData=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = 'shareData=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    document.cookie = "deviceData=;max-age=0"
    document.cookie = "shareData=;max-age=0"
    localStorage.removeItem("shareData")
    localStorage.removeItem("deviceData")
    try {
        const res = await axios.post(`${_logoutUser}`, param)
       
        if (res.data === "invalid user") {
            return false
        }
        sessionStorage.clear()
        return res.data
    } catch (err) {
        return "error"
    }
}