import { useState, useContext } from 'react'
import { Input, Label, Col, ModalBody } from 'reactstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import * as validate from '../../validation/OrgValidationFunctions'
import { stateContext } from '../../context/stateContext'
let password = ""
let confirmPassword = ""
// ! PopUpBody 
const OrganizationEditModalBody = ({ bodyFor }) => {
    // ! all state value
    //** Organization Name */
    const [orgnvalid, setOrgNvalid] = useState(null)
    //** Organization Admin ID */
    const [oAidvalid, setOrgAIdvalid] = useState(null)
    //** First Name */
    const [fvalid, setFvalid] = useState(null)
    //** Last Name */
    const [lvalid, setLvalid] = useState(null)
    //** Email */
    const [evalid, setEvalid] = useState(null)
    //** Address */
    const [addressvalid, setADDvalid] = useState(null)
    //** cnf Country */
    const [countrydvalid, setCOUNTRYvalid] = useState(null)
    //** State*/
    const [statevalid, setSTATEvalid] = useState(null)
    //** CITY */
    const [cityvalid, setCITYvalid] = useState(null)
    //** Phone Number */
    const [pnvalid, setPNvalid] = useState(null)
    //** mobile Number */
    const [mobnvalid, setMobileNvalid] = useState(null)
    //** ZIP */
    const [zipvalid, setZIPvalid] = useState(null)
    //** Department */
    const [departvalid, setDepartmentvalid] = useState(null)
    //** Fax */
    const [faxvalid, setFaxvalid] = useState(null)
    //** cnf password */
    const [cpasswordvalid, setCPWvalid] = useState(null)
    //** PassWord */
    const [passwordvalid, setPWvalid] = useState(null)
    //** Website URL */
    const [urlvalid, setURLvalid] = useState(null)

   // const { isValide, setIsValide, isEmpty, setisEmpty } = useContext(stateContext)

    const Flag = () => {
       
        if (orgnvalid === true && oAidvalid === true && mobnvalid === true && fvalid === true && lvalid === true && evalid === true &&
            addressvalid === true && countrydvalid === true && statevalid === true && cityvalid === true && pnvalid === true && mobnvalid === true
            && zipvalid === true && departvalid === true && faxvalid === true && cpasswordvalid === true && passwordvalid === true && urlvalid === true) {

            //** Then SET Flag to true */
            validate.setValide.isAllfield = true
          //  setIsValide(true)

        } else {
            validate.setValide.isAllfield = false
        }

        // console.log(`hello 1 ${fvalid}  2${lvalid} 3${evalid} 4${ounvalid}
        // 5${oucvalid} 6${pnvalid} 7${addressvalid} 8${useridvalid} 9${statusvalid} 
        // 10${cpasswordvalid} 11${countrydvalid} 12${statevalid} 13${cityvalid} 14${zipvalid} 
        // 15${passwordvalid} 16${urlvalid} 17${FromDate} 18${ToDate}`)
        // console.log('check')
        // console.log(validate.setValide.isAllfield)
        // console.log(validate.data)
    }

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
                    <Label className="col-form-label col-sm-2">Organization Name <span style={{ color: 'red' }}>*</span></Label>
                <Input autoComplete="off" type="text" required className="form-control col-sm-4" id="C_OrganizationName" placeholder="Organization Name" maxLength="15" pattern="[A-Za-z]{2,15}"
                        style={{ borderColor: (orgnvalid === true) ? '#66DE93' : (orgnvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setOrgNvalid(validate.ValidateOrgName(e.target.value))               
                        }}
                    />
                
                    <Label className="col-form-label col-sm-2">Organization Admin ID <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" required className="form-control phone col-sm-4" id="C_OrganizationAdminID" placeholder="Organization Admin ID" maxLength="15" pattern="[A-Za-z]{2,15}"
                        style={{ borderColor: (oAidvalid === true) ? '#66DE93' : (oAidvalid === null) ? '' : '#D83A56' }}
                            onChange={(e) => {
                            setOrgAIdvalid(validate.ValidateOrgAdminId(e.target.value))
                        }}
                    />
                </Col>
            
                <Col className="row form-group">
                    <Label className="col-form-label col-sm-2">Address Line <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" required className="form-control col-sm-4" id="C_address" placeholder="Address Line" autoComplete="off"
                        style={{ borderColor: (addressvalid === true) ? '#66DE93' : (addressvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setADDvalid(validate.ValidateAddress(e.target.value))
                        }}
                    />
                
                    <Label className="col-form-label col-sm-2">First Name <span style={{ color: 'red' }}>*</span></Label>
                <Input autoComplete="off" type="text" required className="form-control col-sm-4" id="C_firstName" placeholder="First Name" maxLength="15" pattern="[A-Za-z]{2,15}"
                        style={{ borderColor: (fvalid === true) ? '#66DE93' : (fvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setFvalid(validate.ValidateFName(e.target.value))
                        }}
                    />
                </Col>
                <Col className="row form-group">
                    <Label className="col-form-label col-sm-2">Country <span style={{ color: 'red' }}>*</span></Label>
                    <Input type='select' name="country" className="form-control country col-sm-4" subid="#C_stateId" id="C_countryId"
                        style={{ borderColor: (countrydvalid === true) ? '#66DE93' : (countrydvalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                setCOUNTRYvalid(validate.validateCountry(e.target.value))
                            }
                        }
                    >
                        <option value="">Select Country</option>     {/* abhishek 08*/}
                        <option value="AF" name="Afghanistan">Afghanistan</option>
                        <option value="AL" name="Albania">Albania</option>
                        <option value="DZ" name="Algeria">Algeria</option>
                    </Input>
                
                    <Label className="col-form-label col-sm-2">Last Name <span style={{ color: 'red' }}>*</span></Label>
                <Input autoComplete="off" required type="text" className="form-control phone col-sm-4" id="C_lastName" placeholder="Last Name" maxLength="15" pattern="[A-Za-z]{2,15}"
                        style={{ borderColor: (lvalid === true) ? '#66DE93' : (lvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setLvalid(validate.ValidateLName(e.target.value))
                        }}
                    />
                </Col>
                <Col className="row form-group">
                    <Label className="col-form-label col-sm-2">State <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="select" name="state" className="states order-alpha form-control state col-sm-4" parentid="#C_countryId" subid="#C_cityId" id="C_stateId"
                        style={{ borderColor: (statevalid === true) ? '#66DE93' : (statevalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                setSTATEvalid(validate.validateState(e.target.value))
                            }
                        }
                    >
                        <option value="">Select State</option>             {/* abhishek 08*/}
                        <option value="AF" name="Afghanistan">Afghanistan</option>
                        <option value="AL" name="Albania">Albania</option>
                    </Input>
                
                    <Label className="col-form-label col-sm-2">Email <span style={{ color: 'red' }}>*</span></Label>
                    <Input required style={{ borderColor: (evalid === true) ? '#66DE93' : (evalid === null) ? '' : '#D83A56' }} type="Myemail" className="form-control phone col-sm-4" id="C_email" placeholder="Email" autoComplete="off" onChange={
                        (e) => {
                            setEvalid(validate.ValidateEmail(e.target.value))
                           // validate.data.Email = e.target.value
                            Flag()
                        }
                    } />
                </Col>
                <Col className="row form-group">
                    <Label className="col-form-label col-sm-2">City <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="select" required name="city" className="cities order-alpha form-control city col-sm-4" id="C_cityId"
                        style={{ borderColor: (cityvalid === true) ? '#66DE93' : (cityvalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                setCITYvalid(validate.validateCity(e.target.value))
                            }
                        }
                    >
                        <option value="">Select City</option>    {/*   abhishek 08*/}
                        <option value="AF" name="Afghanistan">Afghanistan</option>
                        <option value="AL" name="Albania">Albania</option>
                    </Input>
                    <Label className="control-Label col-sm-2">Zipcode <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" required className="form-control col-sm-4" id="C_zipcode" placeholder="Zipcode" autocomplete="off" maxLength="6"
                        style={{ borderColor: (zipvalid === true) ? '#66DE93' : (zipvalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                setZIPvalid(validate.validateZip(e.target.value))
                               // validate.data.Zip = e.target.value
                                Flag()

                                console.log(statusvalid)
                            }
                        }
                    />
                    
                    </Col>
                    <Col className="row form-group">
                    
                    <Label className="col-form-label col-sm-2">Mobile <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" className="form-control phone col-sm-4" id="C_MobileNO" name='Mobile' placeholder="Mobile" pattern="[0-9]" autoComplete="off" maxLength="11"
                        style={{ borderColor: (mobnvalid === true) ? '#66DE93' : (mobnvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setMobileNvalid(validate.ValidateMobileNumber(e.target.value))
                        }}
                    />
                    <Label className="col-form-label col-sm-2">Phone <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" className="form-control phone col-sm-4" id="C_phoneNO" name='phone' placeholder="Phone" pattern="[0-9]" autoComplete="off" maxLength="11"
                        style={{ borderColor: (pnvalid === true) ? '#66DE93' : (pnvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            //setPNvalid(validate.ValidatePhoneNumber(e.target.value))
                        }}
                    />
                </Col>
                <Col className="row form-group">
                    
                    <Label className="col-form-label col-sm-2">Department <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" required className="form-control col-sm-4" id="C_Department" placeholder="Department" maxLength="15" pattern="[A-Za-z]{2,15}"
                        style={{ borderColor: (departvalid === true) ? '#66DE93' : (departvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setDepartmentvalid(validate.ValidateDepartmentName(e.target.value))
                        }}
                    />
                    <Label className="col-form-label col-sm-2">Fax <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" required 
                        className="form-control col-sm-4" 
                        id="C_Fax" placeholder="Fax" 
                        maxLength="15" 
                        pattern="[A-Za-z]{2,15}"
                        style={{ borderColor: (faxvalid === true) ? '#66DE93' : (faxvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setFaxvalid(validate.ValidateFax(e.target.value))
                        }}
                    />
                </Col>
                <Col className="row form-group">
                
                    <Label className="col-form-label col-sm-2">Password 
                    {bodyFor === 'add' &&
                            <span style={{ color: 'red' }}> *</span>
                        }
                    </Label>

                    <Input type="password" 
                        className="form-control phone col-sm-4" 
                        id="C_password" placeholder="Password" 
                        autocomplete="new-password" minLength="8" maxLength="20"
                        style={{ borderColor: (passwordvalid === true) ? '#66DE93' : (passwordvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => { 
                            validatePassWord(e.target.value)
                           // validate.data.PassWord = e.target.value
                            Flag()
                        }}
                    />
                    <Label className="col-form-label col-sm-2">Website URL <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" className="form-control col-sm-4" id="C_website" placeholder="Website" autocomplete="off"
                        style={{ borderColor: (urlvalid === true) ? '#66DE93' : (urlvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setURLvalid(validate.ValidateURL(e.target.value))
                        }}
                    />
                </Col>

                <Col className="row form-group">
                    
                    <Label className="col-form-label col-sm-2">Confirm Password
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
                    <Label className="control-label col-sm-2">Company Logo <span>*</span></Label>
                    <Input type="file" className="form-control col-sm-4" id="" placeholder="Company logo" autocomplete="off"
                        style={{ borderColor: (urlvalid === true) ? '#66DE93' : (urlvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {

                        }}
                    />
                </Col>
           

            <hr className="m-2" />

            <Col className="row form-group">
                <Label className="control-label ">Database:</Label>
            </Col>

            <Col className="row form-group">
                <Label className="control-label col-sm-2">SQL Server Name/Ip <span>*</span></Label>
                <Input type="text" className="form-control col-sm-4" id="C_serverIP" autocomplete="off" onkeyup="IsEmpty(this)" />
            
                    <Label className="control-label col-sm-2">SQL Server User ID <span>*</span></Label>
                    <Input type="text" className="form-control col-sm-4" id="C_ServerUserID" autocomplete="off" onkeyup="IsEmpty(this)" />
            </Col>

            <Col className="row form-group">
                <Label className="control-label col-sm-2">SQL Server Password  <span>*</span></Label>
                <Input type="text" className="form-control col-sm-4" id="C_serverPass" autocomplete="off" onkeyup="IsEmpty(this)" />
                </Col>

            <hr className="m-2" />
            <Col className="row form-group">
                <label class="control-label ">Folder Structure:</label>
            </Col>
        <Col className="row form-group" >
                
                    <Col className ='row' >
                        <Col  sm={2} style={{marginLeft:'20px'}}>
                            <Input id="checkbox3"  type="checkbox"  />
                            <Label for="checkbox3"  >Local server path</Label>
                        </Col>
                        <Col sm={2} style={{marginLeft:'20px'}}>
                            <Input id="checkbox4" type="checkbox" />
                            <Label for="checkbox4">FTP store</Label>
                        </Col>
                        <Col sm={2} style={{marginLeft:'20px'}}>
                            <Input id="checkbox5" type="checkbox" />
                            <Label for="checkbox5">CDN</Label>
                        </Col>
                        <Col sm={2} style={{marginLeft:'20px'}}>
                            <Input id="checkbox6" type="checkbox" />
                            <Label for="checkbox6">Bucket AWS</Label>
                        </Col>
                        <Col sm={2} style={{marginLeft:'20px'}}>
                            <Input id="checkbox7" type="checkbox" />
                            <Label for="checkbox7">Bucket AZURE</Label>
                        </Col>
                    </Col>
                        
</Col>
                        <Col className="row form-group">
                            <Label className="col-form-label col-sm-2">Database drive path <span style={{ color: 'red' }}>*</span></Label>
                            <Input type="select" name="dbdrivepath" className="states order-alpha form-control state col-sm-4" parentid="#C_countryId" subid="#C_cityId" id="C_drive"
                                    style={{ borderColor: (statevalid === true) ? '#66DE93' : (statevalid === null) ? '' : '#D83A56' }}
                                    onChange={
                                            (e) => {
                                        // setSTATEvalid(validate.validateState(e.target.value))
                                    }
                                }
                                >
                        <option value="none">Select</option>
                        <option value="AF" name="C">C</option>
                        <option value="AL" name="D">D</option>
                        <option value="AF" name="E">E</option>
                        <option value="AL" name="F">F</option>
                    </Input>
                </Col>

                <Col className="row form-group">
                    <Label className="col-form-label col-sm-2">Access URL <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" className="form-control phone col-sm-8" id="C_accessURL" placeholder="Access URL"
                        style={{ borderColor: (lvalid === true) ? '#66DE93' : (lvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            // setLvalid(validate.ValidateLName(e.target.value))
                        }}
                    />
                </Col>

                <Col className="row form-group">
                    <Label className="col-form-label col-sm-2">URL access user ID <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" className="form-control phone col-sm-8" id="C_URLaccessUserID" placeholder="URL access user ID"
                        style={{ borderColor: (lvalid === true) ? '#66DE93' : (lvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            // setLvalid(validate.ValidateLName(e.target.value))
                        }}
                    />
                </Col>
                <Col className="row form-group">
                    <Label className="col-form-label col-sm-2">URL access password <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="text" className="form-control phone col-sm-8" id="C_URLaccesspasswordL" placeholder="password"
                        style={{ borderColor: (lvalid === true) ? '#66DE93' : (lvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            //  setLvalid(validate.ValidateLName(e.target.value))
                        }}
                    />
                </Col>

        </ModalBody >
    )
}

export default OrganizationEditModalBody
