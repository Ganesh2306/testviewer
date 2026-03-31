import { useState } from 'react'
import { Input, Label, Col, ModalBody } from 'reactstrap'

import * as validate from './ValidationFunctions'

let password = ""
let confirmPassword = ""
// ! PopUpBody 
const ModalBodyUIEditSupplier = ({ bodyFor }) => {
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
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-2">First Name <span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control col-sm-4" id="C_firstName" placeholder="First Name" maxLength="15" pattern="[A-Za-z]{2,15}"
          style={{ borderColor: (fvalid === true) ? '#66DE93' : (fvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setFvalid(validate.ValidateFName(e.target.value))
          }}
        />
        <Label className="col-form-Label col-sm-2">Last Name <span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control phone col-sm-4" id="C_lastName" placeholder="Last Name" maxLength="15" pattern="[A-Za-z]{2,15}"
          style={{ borderColor: (lvalid === true) ? '#66DE93' : (lvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setLvalid(validate.ValidateLName(e.target.value))
          }}
        />
      </Col>
      <Col className="row form-group">
              <Label className="col-form-Label col-sm-2">Supplier Name<span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control col-sm-4" id="C_customerName" placeholder="Supplier Name" maxLength="15" pattern="[A-Za-z]{2,15}"
          style={{ borderColor: (ounvalid === true) ? '#66DE93' : (ounvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setOUNvalid(validate.ValidateOUName(e.target.value))
          }}
        />
        <Label className="col-form-Label col-sm-2">Email <span style={{ color: 'red' }}>*</span></Label>
        <Input style={{ borderColor: (evalid === true) ? '#66DE93' : (evalid === null) ? '' : '#D83A56' }} type="email" className="form-control phone col-sm-4" id="C_email" placeholder="Email" autocomplete="off" onChange={
          (e) => { setEvalid(validate.ValidateEmail(e.target.value)) }
        } />
      </Col>
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-2">Supplier Code <span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control col-sm-4" id="C_code" placeholder="Supplier Code" autocomplete="off" maxLength="10"
          style={{ borderColor: (oucvalid === true) ? '#66DE93' : (oucvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setOUCvalid(validate.ValidateOUCode(e.target.value))
          }}
        />

        <Label className="col-form-Label col-sm-2">Phone <span style={{ color: 'red' }}>*</span></Label>
        <Input type="number" className="form-control phone col-sm-4" id="C_phoneNO" name='phone' placeholder="Phone" pattern="[0-9]" autocomplete="off" maxLength="11"
          style={{ borderColor: (pnvalid === true) ? '#66DE93' : (pnvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setPNvalid(validate.ValidatePhoneNumber(e.target.value))
          }}
        />
      </Col>
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-2">Address Line <span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control col-sm-4" id="C_address" placeholder="Address Line" autocomplete="off"
          style={{ borderColor: (addressvalid === true) ? '#66DE93' : (addressvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setADDvalid(validate.ValidateAddress(e.target.value))
          }}
        />

        <Label className="col-form-Label col-sm-2">User ID <span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control col-sm-4" id="C_userID" placeholder="User ID" autocomplete="off"
          style={{ borderColor: (useridvalid === true) ? '#66DE93' : (useridvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setUIDvalid(validate.ValidateUserid(e.target.value))
          }}
        />
      </Col>
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-2">Website URL <span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control col-sm-4" id="C_website" placeholder="Website" autocomplete="off"
          style={{ borderColor: (urlvalid === true) ? '#66DE93' : (urlvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setURLvalid(validate.ValidateURL(e.target.value))
          }}
        />

        <Label className="col-form-Label col-sm-2">Password
          {bodyFor === 'add' &&
            <span style={{ color: 'red' }}> *</span>
          }
        </Label>
        <Input type="password" className="form-control phone col-sm-4" id="C_password" placeholder="Password" autocomplete="new-password" minLength="8" maxLength="20"
          style={{ borderColor: (passwordvalid === true) ? '#66DE93' : (passwordvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            validatePassWord(e.target.value)
          }}
        />
      </Col>
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-2">Country <span style={{ color: 'red' }}>*</span></Label>
        <Input type='select' name="country" className="form-control country col-sm-4" subid="#C_stateId" id="C_countryId"
          style={{ borderColor: (countrydvalid === true) ? '#66DE93' : (countrydvalid === null) ? '' : '#D83A56' }}
          onChange={
            (e) => {
              setCOUNTRYvalid(validate.validateCountry(e.target.value))
            }
          }
        >
          <option value="none">Select Country</option>
          <option value="AF" name="Afghanistan">Afghanistan</option>
          <option value="AL" name="Albania">Albania</option>
          <option value="DZ" name="Algeria">Algeria</option>
        </Input>

        <Label className="col-form-Label col-sm-2">Confirm Password
          {bodyFor === 'add' &&
            <span style={{ color: 'red' }}> *</span>
          }
        </Label>
        <Input type="password" className="form-control phone col-sm-4" id="C_confirmPassword" placeholder="Password" autocomplete="off" minLength="8" maxLength="20"
          style={{ borderColor: (cpasswordvalid === true) ? '#66DE93' : (cpasswordvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            validateCPassWord(e.target.value)
          }}
        />
      </Col>
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-2">State <span style={{ color: 'red' }}>*</span></Label>
        <Input type="select" name="state" className="states order-alpha form-control state col-sm-4" parentid="#C_countryId" subid="#C_cityId" id="C_stateId"
          style={{ borderColor: (statevalid === true) ? '#66DE93' : (statevalid === null) ? '' : '#D83A56' }}
          onChange={
            (e) => {
              setSTATEvalid(validate.validateState(e.target.value))
            }
          }
        >
          <option value="none">Select State</option>
        </Input>

        <Label className="col-form-Label col-sm-2">Status <span style={{ color: 'red' }}>*</span></Label>
        <Input type="select" name="state" className=" form-control col-sm-4" id="C_status"
          //style={{ borderColor: (statusvalid === true) ? '#66DE93' : (statusvalid === null) ? '' : '#D83A56' }}
          onChange={
            (e) => {
              setStatusvalid(validate.validateStatus(e.target.value))
            }
          }
        >
          <option value="Active">Active</option>
          <option value="Deactive">Deactive</option>
        </Input>
      </Col>
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-2">City <span style={{ color: 'red' }}>*</span></Label>
        <Input type="select" name="city" className="cities order-alpha form-control city col-sm-4" id="C_cityId"
          style={{ borderColor: (cityvalid === true) ? '#66DE93' : (cityvalid === null) ? '' : '#D83A56' }}
          onChange={
            (e) => {
              setCITYvalid(validate.validateCity(e.target.value))
            }
          }
        >
          <option value="none">Select City</option>
        </Input>
        <Label for='C_fromDate' className="col-form-Label col-sm-2">From Date <span style={{ color: 'red' }}>*</span></Label>
        <Input type="date" name="datetime" className="city col-sm-4" id="C_fromDate" />
      </Col>
      <Col className="row form-group">
        <Label className="control-Label col-sm-2">Zipcode <span style={{ color: 'red' }}>*</span></Label>
        <Input type="text" className="form-control col-sm-4" id="C_zipcode" placeholder="Zipcode" autocomplete="off" maxLength="6"
          style={{ borderColor: (zipvalid === true) ? '#66DE93' : (zipvalid === null) ? '' : '#D83A56' }}
          onChange={
            (e) => {
              setZIPvalid(validate.validateZip(e.target.value))
            }
          }
        />
        <Label for="C_toDate" className="col-form-Label col-sm-2">To Date <span style={{ color: 'red' }}>*</span></Label>
        <Input type='date' className="city col-sm-4" id='C_toDate' />
      </Col>
    </ModalBody >
  )
}

export default ModalBodyUIEditSupplier
