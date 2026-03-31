import axios from "axios"

let OTP_OBJ = {}

window.seeobj = ()  => OTP_OBJ

export const setOTP_OBJ = (param, cb = undefined) => {
    OTP_OBJ = param
    if (cb) {
        return  cb()
    }
}
export const resetOTP_OBJ = () => {
    OTP_OBJ = {}
}

export const otp = () => {
    const res =  axios.post('./Login/SendEmail', OTP_OBJ)
    //const d = await res.data
    return res
}