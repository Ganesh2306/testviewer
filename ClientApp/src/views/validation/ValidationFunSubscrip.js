//!ADD USER DATA 
export const data = {
  Fname:'',
  Lname:'',
  Email:'',
  OrganisationUserName:'',
  OrganisationUserCode:'',
  Phone:'',
  Address:'',
  UserId:'',
  WebSiteURL:'',
  PassWord:'',
  Country:'',
  State:'',
  City:'',
  Status:'Active',
  FromeDate:'',
  ToDate:'',
  Zip:''
}

//!flag for all validation
// eslint-disable-next-line no-use-before-define
export const setValide = {isAllfield:false}

export const date = new Date()

//reset code 
// ! it may not be required only for Status 
// ToDo: Do it if required
export const ReSetData = () => {
}

//** Supplier limit */
export const supplierValid = (limit) => {
  if (limit.length === 0) {
    return false
  } else if (typeof limit === "string" && limit.length <= 4) {
    //console.log(limit)
    return true
  } else {
    return false
  }
}
//** User limit */
export const userValid = (limit) => {
  if (limit === "") {
    return false
  } else if (typeof limit === "string" && limit.length <= 4) {
    return true
  } else {
    return null
  }
}
//** customer limit */
export const customerValid = (limit) => {
  if (limit === "") {
    return null
  } else if (typeof limit === "string" && limit.length <= 4) {
    return true
  } else {
    return null
  }
}
//** design limit */
export const designValid = (limit) => {
  if (limit === "") {
    return null
  } else if (typeof limit === "string" && limit.length <= 4) {
    return true
  } else {
    return null
  }
}
//** design limit */
export const agentValid = (limit) => {
  if (limit === "") {
    return null
  } else if (typeof limit === "string" && limit.length <= 4) {
    return true
  } else {
    return null
  }
}


//** first Name */
export const ValidateFName = (fname) => {
  if (fname === "") {
      return null
  } else if (typeof fname === "string" && fname.length <= 15) {
      return true
  } else {
      return false
  }
}

//** Last Name */
export const ValidateLName = (Lname) => {
  if (Lname === "") {
      return null
  } else if (typeof Lname === "string" && Lname.length <= 15) {
      return true
  } else {
      return false
  }
}

//** personal mobile Number */
export const ValidateMobileNumber = (mobnum) => {
  if (mobnum === "") {
      return null
  } else if (mobnum.length >= 10 && mobnum.length <= 13) {
      return true
  } else {
      return false
  }
}

//** Email */
export const ValidateEmail = (mail) => {
  if (mail === "") {
      return null
  } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) || mail === "") {
      return true
  } else {
      return false
  }
}

//** Organization Name */
export const ValidateOrgName = (orgname) => {

  if (orgname === "") {
      return null
  } else if (typeof orgname === "string" && orgname.length <= 15) {
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
      return null
  } else if (url.match(regex)) {
      return true
  } else {
      return false
  }
}

//** Address */
export const ValidateAddress = (str) => {
  if (str === "") {
      return null
  } else if (str.length >= 5 && str.length <= 40) {
      return true
  } else {
      return false
  }
}

//** Country  */
//const [countrydvalid, setCOUNTRYvalid] = useState(null)
export const validateCountry = (contry) => {
  if (contry === "none") {
      return null
  } else if (contry.length > 0) {
      return true
  } else {
      return false
  }
}

//** State  */
export const validateState = (state) => {
  if (state === "none") {
      return null
  } else if (state.length > 0) {
      return true
  } else {
      return false
  }
}

//** City  */
export const validateCity = (city) => {
  if (city === "none") {
      return null
  } else if (city.length > 0) {
      return true
  } else {
      return false
  }
}

//** Zipcode  */
export const validateZip = (zip) => {
  if (zip === "") {
      return null
  } else if (zip.length > 0) {
      return true
  } else {
      return false
  }
}

//** first Name */
export const ValidateDescription = (fname) => {
  if (fname === "") {
      return null
  } else if (typeof fname === "string" && fname.length <= 200) {
      return true
  } else {
      return false
  }
}
