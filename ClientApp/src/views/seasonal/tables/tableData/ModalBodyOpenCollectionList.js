import { useState } from 'react'
import { Input, Label, Col, ModalBody } from 'reactstrap'

// import "./share.css"

let password = ""
let confirmPassword = ""
// ! PopUpBody 
const ModalBodyOpenCollectionList = ({ bodyFor }) => {
  // ! all state value
  //** Email */
  const [evalid, setEvalid] = useState(null)
  //** First Name */
  const [fvalid, setFvalid] = useState(null)
  //** Last Name */
  const [lvalid, setLvalid] = useState(null)
  //** Organization Name */
  const [ounvalid, setOUNvalid] = useState(null)
  //** Organization user Code */
  const [oucvalid, setOUCvalid] = useState(null)
  //** Phone Number */
  const [pnvalid, setPNvalid] = useState(null)
  //** Address */
  const [addressvalid, setADDvalid] = useState(null)
  //** User Id */
  const [useridvalid, setUIDvalid] = useState(null)
  // ** Status */
  const [statusvalid, setStatusvalid] = useState(true)
  //** cnf password */
  const [cpasswordvalid, setCPWvalid] = useState(null)
  //** cnf Country */
  const [countrydvalid, setCOUNTRYvalid] = useState(null)
  //** State*/
  const [statevalid, setSTATEvalid] = useState(null)
  //** CITY */
  const [cityvalid, setCITYvalid] = useState(null)
  //** ZIP */
  const [zipvalid, setZIPvalid] = useState(null)
  //** PassWord */
  const [passwordvalid, setPWvalid] = useState(null)
  //** User Id */
  const [urlvalid, setURLvalid] = useState(null)

  //** User Id */

  const validateCPassWord = (cp) => {
    confirmPassword = cp
    if (cp === "") {
      setCPWvalid(null)
    } else if (cp.length > 5 && cp === password) {
      setCPWvalid(true)
    } else {
      setCPWvalid(false)
    }
  }

  //! ForPasword and Cnf validation only
  const validatePassWord = (p) => {
    password = p
    if (p === "") {
      setPWvalid(null)
    } else if (p.length > 5) {
      validateCPassWord(confirmPassword)
      setPWvalid(true)
    } else {
      setPWvalid(false)
    }

  }

  return (
    < ModalBody >
      This is modal body
    </ModalBody >
  )
}

export default ModalBodyOpenCollectionList
