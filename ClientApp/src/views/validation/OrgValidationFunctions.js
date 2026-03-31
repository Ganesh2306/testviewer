
//!flag for all validation
// eslint-disable-next-line no-use-before-define
export const setValide = { isAllfield: false }

export const date = new Date()

//reset code 
// ! it may not be required only for Status 
// ToDo: Do it if required
export const ReSetData = () => {
}

//p start
//** Organization Name */
export const ValidateOrgName = (orgname) => {

    if (orgname === "") {
        return false
    } else if (typeof orgname === "string" && orgname.length <= 15) {
        return true
    } else {
        return false
    }
}
//** Organization Admin Id */
export const ValidateOrgAdminId = (orgAid) => {

    if (orgAid === "") {
        return false
    } else if (typeof orgAid === "string" && orgAid.length <= 15) {
        return true
    } else {
        return false
    }
}
//** Organization Department */
export const ValidateDepartmentName = (depart) => {

    if (depart === "") {
        return false
    } else if (typeof depart === "string" && depart.length <= 15) {
        return true
    } else {
        return false
    }
}
//** Fax number */
export const ValidateFax = (fax) => {
    if (fax === "") {
        return false
    } else if (fax.length >= 10 && fax.length <= 13) {
        return true
    } else {
        return false
    }
}
//p end
//** Email */
export const ValidateEmail = (mail) => {
    if (mail === "") {
        return false
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) || mail === "") {
        return true
    } else {
        return false
    }
}

//** first Name */
export const ValidateFName = (fname) => {
    if (fname === "") {
        return false
    } else if (typeof fname === "string" && fname.length <= 15) {
        return true
    } else {
        return false
    }
}

//** Last Name */
export const ValidateLName = (Lname) => {
    if (Lname === "") {
        return false
    } else if (typeof Lname === "string" && Lname.length <= 15) {
        return true
    } else {
        return false
    }
}
//ftp
export const Validatehost = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

export const Validatepass = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}
export const ValidatePort = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}
export const ValidateUrl = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

//cdn
export const ValidateCpath = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

export const ValidateCname = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}
export const ValidateCsecret = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}
export const ValidateCkey = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

//aws
export const ValidateAwsURL = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

export const ValidateAwsUSerID = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}
export const ValidatePortAwsPass = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

//azure
//aws
export const ValidateAzsURL = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

export const ValidateAzsUSerID = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}
export const ValidatePortAzsPass = (Lname) => {
    if (Lname === "") {
        return false
    } else {
        return true
    }
}

//** User Phone Number */
export const ValidatePhoneNumber = (num) => {
    if (num === "") {
        return false
    } else if (num.length >= 10 && num.length <= 13) {
        return true
    } else {
        return false
    }
}

//** User mobile Number */
export const ValidateMobileNumber = (mobnum) => {
    if (mobnum === "") {
        return false
    } else if (mobnum.length >= 10 && mobnum.length <= 13) {
        return true
    } else {
        return false
    }
}

//** Address */
export const ValidateAddress = (str) => {
    if (str === "") {
        return false
    } else if (str.length >= 5 && str.length <= 40) {
        return true
    } else {
        return false
    }
}


//**URL */

export const ValidateURL = (url) => {
    const expression =
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)
    if (url === "") {
        return false
    } else if (url.match(regex)) {
        return true
    } else {
        return false
    }
}

//** Country  */
//const [countrydvalid, setCOUNTRYvalid] = useState(false)
export const validateCountry = (contry) => {
    if (contry === "none") {
        return false
    } else if (contry.length > 0) {
        return true
    } else {
        return false
    }
}

//** Status */
export const validateStatus = (st) => {
    if (st !== "" || st !== false) {
        return true
    } else {
        return false
    }
}

//** City  */
//const [countrydvalid, setCOUNTRYvalid] = useState(false)
export const validateCity = (city) => {
    if (city === "none") {
        return false
    } else if (city.length > 0) {
        return true
    } else {
        return false
    }
}

export const validateState = (state) => {
    if (state === "none") {
        return false
    } else if (state.length > 0) {
        return true
    } else {
        return false
    }
}

export const validateZip = (zip) => {
    if (zip === "") {
        return false
    } else if (zip.length > 0) {
        return true
    } else {
        return false
    }
}

//Configuration Validation
export const DrivePath = (path) => {
    if (path === "none") {
        return false
    } else if (path.length > 0) {
        return true
    } else {
        return false
    }
}

export const Host = (fname) => {
    if (fname === "") {
        return false
    }
    return true
}
export const Port = (fname) => {
    if (fname === "") {
        return false
    }
    return true
}
export const UrlId = (fname) => {
    if (fname === "") {
        return false
    }
    return true
}

export const UrlPass = (fname) => {
    if (fname === "") {
        return false
    }
    return true
}