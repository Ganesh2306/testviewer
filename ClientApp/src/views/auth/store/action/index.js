import axios from 'axios'
import { validateUser, login, logoutUser as _logoutUser } from './../../../MethodList'

export const validateLogin = async (param) => {

    try {
        const res = await axios.post(`${validateUser}`, param)
        
        if (res.data === "invalid user") {
            return false
        }
        return res.data
    } catch (err) {
        return "error"
    }
}

export const validateAdminLogin = async (param) => {

    try {
        const res = await axios.post(`${login}`, param)
        
        if (res.data === "invalid user") {
            return false
        }
        return res.data
    } catch (err) {
        return "error"
    }
}

export const logoutUser = async (param) => {
    try {
        const res = await axios.post(`${_logoutUser}`, param)

        if (res.data === "invalid user") {
            return false
        }
        return res.data
    } catch (err) {
        return "error"
    }
}