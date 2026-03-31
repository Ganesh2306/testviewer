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

//** organization User Name */
export const ValidateOUName = (OUN) => {
  if (OUN === "") {
    return false
  } else if (typeof OUN === "string" && OUN.length <= 35) {
    return true
  } else {
    return false
  }
}

//** organization User Code */
export const ValidateOUCode = (OUC) => {
  if (OUC === "") {
    return false
  } else if (OUC.length <= 15) {
    return true
  } else {
    return false
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
export const ValidateMobileNumber = (num) => {
    if (num === "") {
        return false
    } else if (num.length >= 10 && num.length <= 13) {
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

//** User ID */
export const ValidateUserid = (str) => {
  if (str === "") {
    return false
  } else if (str.length > 0) {
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
  if (st === "Active") {
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
