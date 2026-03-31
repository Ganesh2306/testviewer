import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Country, State, City } from 'country-state-city'
import { Input, Button, Label, Col, ModalBody, FormFeedback } from 'reactstrap'

import * as validate from './ValidationFunctions'
import { Edit } from 'react-feather'
import Avatar from "../../../../Avatar/Avatar"
let password = ""
let confirmPassword = ""
// ! PopUpBody 

const ModalBodyUI = forwardRef((props, ref) => {
    // ! all state value
    const { errors, register, selectedUser } = props
    //** mobile Number */
    const [mobnvalid, setMobileNvalid] = useState(null)
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

    const [CSCode, Cust_SetSCode] = useState(null)
    const [CCCode, Cust_SetCCode] = useState(null)
    //** ZIP */
    const [zipvalid, setZIPvalid] = useState(null)
    //** PassWord */
    const [passwordvalid, setPWvalid] = useState(null)
    //** User Id */
    const [urlvalid, setURLvalid] = useState(null)

    const [img, setImg] = useState(null)
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    if (props.selectedCustomer !== undefined && props.selectedCustomer !== null) {

        let baseString = props.selectedCustomer.customer.user.agt_imagebytebase !== null ? props.selectedCustomer.customer.user.agt_imagebytebase : null
        if (baseString !== null) {
            baseString = `data:image/jpeg;base64,${baseString}`
            if (img === null) setImg(baseString)

        }
    }
    const renderUserAvatar = () => {
        if (img === null) {
            const stateNum = Math.floor(Math.random() * 6),
                states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
                color = states[stateNum]
            return (
                <Avatar
                    initials
                    color={color}
                    className='rounded mr-2 my-25'
                    content='profile image'
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(36px)',
                        width: '100%',
                        height: '100%'
                    }}
                    style={{
                        height: '90px',
                        width: '90px'
                    }}
                />
            )
        } else {
            return (
                <img
                    className='user-avatar rounded mr-2 my-25 cursor-pointer'
                    src={img}
                    alt='user profile avatar'
                    height='90'
                    width='90'
                />
            )
        }
    }
    if (props.selectedCustomer !== undefined && props.selectedCustomer !== null) {
        console.log("statecity")

        const country = Country.getAllCountries().filter(obj => obj.name === props.selectedCustomer.customer.cus_country)
        const stateOj = State.getAllStates().filter(obj => obj.name === props.selectedCustomer.customer.cus_state)

        if (CCCode === null) {
            Cust_SetCCode(country[0].isoCode)

        }
        if (CSCode === null) Cust_SetSCode(stateOj[0].isoCode)


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
    //Country
    function LoadCountry() {

        const country = Country.getAllCountries().reduce((country, team) => {
            const country1 = props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_country
            if (team.name === country1) country.push(<option selected countrycode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else country.push(<option countrycode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return country
        }, [])
        return country

    }
    function setStatus() {
        let status = []
        if (props.selectedCustomer !== undefined && props.selectedCustomer !== null) {
            status.push(<option selected value="false">Active</option>)
            if (props.selectedCustomer.customer.user.is_blocked) {
                status = []
                status.push(<option selected value="true">Block</option>)
                status.push(<option value="false">Active</option>)
            } else {
                status.push(<option  value="true">Block</option>)
            }

        } else {

            status.push(<option value="false">Active</option>)
            status.push(<option value="true">Block</option>)
        }
        return status
            }
    //! Load State Using Country Code
    function setState(CCCode) {

        const states = State.getStatesOfCountry(CCCode).reduce((states, team) => {
            const state = props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_state
            if (team.name === state) states.push(<option selected countrycode={team.countrycode} statecode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else states.push(<option countrycode={team.countrycode} statecode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return states
        }, [])
        return states
    }
    //! Load City Using Country Code and State Code
    function setCity(CSCode) {

        const city = City.getCitiesOfState(CCCode, CSCode).reduce((city, team) => {
            const city1 = props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_city
            if (team.name === city1) city.push(<option selected statecode={team.statecode} key={team.name} value={team.name}>{team.name}</option>)
            else city.push(<option statecode={team.statecode} key={team.name} value={team.name}>{team.name}</option>)


            return city
        }, [])
        return city
        // return City.getCitiesOfState(CCode, SCode).map((team) => <option statecode={team.statecode} key={team.name} value={team.name}>{team.name}</option>)

    }

    function formatDate(date) {

        if (date === null) {
            return null
        }
        const d = new Date(date),
            year = d.getFullYear()
        let month = `${(d.getMonth() + 1)}`,
            day = `${d.getDate()}`


        if (month.length < 2) {
            month = `0${month}`
        }
        if (day.length < 2) {
            day = `0${day}`
        }

        return [year, month, day].join('-')
    }

    return (
        < ModalBody >
            {/*Customer*/}
            <div className="row form-group mx-0 col"><label className="control-label ">Customer Details:</label></div>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Customer Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input type="hidden" id="customer_Id" innerRef={props.register({ required: true })}
                        invalid={props.errors.customer_Id && true} name="customer_Id" value={props.selectedCustomer !== undefined && props.selectedCustomer !== null ? props.selectedCustomer.customer.customer_Id : 0} />
                    {props.errors && props.errors.customer_Id && <FormFeedback>{props.errors.customer_Id.message}</FormFeedback>}
                    <Input autoComplete = "off" id={props.selectedCustomer === undefined || props.selectedCustomer === null ? "C_customerName" : props.selectedCustomer.customer.customer_Id} key={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.customer_id} defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_name} type="text" className="form-control" placeholder="Customer Name"
                        innerRef={register({ required: true })}
                        invalid={errors.customer_Name && true}
                        name="customer_Name"
                        disabled = {props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_name && true }
                        onChange={(e) => {
                            setOUNvalid(validate.ValidateOUName(e.target.value))
                        }}
                    />  {errors && errors.customer_Name && <FormFeedback>{errors.customer_Name.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Customer Code <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_code} type="text" className="form-control" id="C_code" placeholder="Customer Code" autoComplete="off" innerRef={register({ required: true })}
                        invalid={errors.cus_code && true}
                        innerRef={register({ required: true })}
                        invalid={errors.customer_Code && true}
                        name="customer_Code"
                        onChange={(e) => {
                            setOUCvalid(validate.ValidateOUCode(e.target.value))
                        }}
                    />
                    {errors && errors.customer_Code && <FormFeedback>{errors.customer_Code.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Email <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input  defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_email} type="Myemail" className="form-control" id="C_email" placeholder="Email" autoComplete="off"
                        innerRef={register({ required: true })}
                        invalid={errors.email && true}
                        name="email"
                    />
                    {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Address <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })}
                        invalid={errors.address && true}
                        name="address" 
                        defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_address} type="text" className="form-control" id="C_address" placeholder="Address Line" autoComplete="off" />
                    {errors && errors.address && <FormFeedback>{errors.address.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Phone <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })}
                        invalid={errors.phone && true}
                        name="phone" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_phone} type="number" className="form-control phone" id="C_phoneNO" placeholder="Phone" autoComplete="off" /> 
                    {errors && errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Country <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.country && true} name="country" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_country} type='select' className="form-control country" subid="#C_stateId" id="C_countryId"
                        onChange={
                            (e) => {
                                //  setCOUNTRYvalid(validate.validateCountry(e.target.value))
                                Cust_SetCCode(e.target.options[e.target.selectedIndex].getAttribute("CountryCode"))
                            }
                        }
                    >
                        <option value="">Select Country</option>
                        {
                            LoadCountry()
                            // Country.getAllCountries().map((team) => <option countrycode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
                        }
                    </Input>
                    {errors && errors.country && <FormFeedback>{errors.country.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">URL <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.website && true} name="website" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_website} type="text" className="form-control" id="C_website" placeholder="Website" autoComplete="off" />
                    {errors && errors.website && <FormFeedback>{errors.website.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">State <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1" >
                    <Input innerRef={register({ required: true })} invalid={errors.customerState && true} name="customerState" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_state} type="select" className="states order-alpha form-control state" parentid="#C_countryId" subid="#C_cityId" id="C_stateId"
                        onChange={
                            (e) => {
                                //setSTATEvalid(validate.validateState(e.target.value))
                                Cust_SetSCode(e.target.options[e.target.selectedIndex].getAttribute("StateCode"))
                            }
                        }
                    >
                        <option value="">Select State</option>
                        {
                            setState(CCCode)
                        }
                    </Input>
                    {errors && errors.customerState && <FormFeedback>{errors.customerState.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">


                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Status <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.isBlocked && true} name="isBlocked" type="select" className=" form-control" id="C_status">
                        {setStatus()}
                    </Input>
                    {errors && errors.isBlocked && <FormFeedback>{errors.isBlocked.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">City <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.city && true} name="city" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_city} type="select" id="C_cityId" >
                        <option value="">Select City</option>
                        {
                            setCity(CSCode)
                        }
                    </Input>
                    {errors && errors.city && <FormFeedback>{errors.city.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">

                <Label for='C_fromDate' className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Start Date <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={formatDate(props.selectedCustomer !== undefined && props.selectedCustomer !== null ? props.selectedCustomer.customer.start_Date : null)} innerRef={register({ required: true })} invalid={errors.start_Date && true} name="start_Date" type="date" id="C_fromDate" />
                    {errors && errors.start_Date && <FormFeedback>{errors.start_Date.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Pincode <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.pincode && true} name="pincode" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.cus_pincode} type="text" className="form-control" id="C_zipcode" placeholder="Pincode" autoComplete="off" />
                    {errors && errors.pincode && <FormFeedback>{errors.pincode.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label for="C_toDate" className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">To Date <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={formatDate(props.selectedCustomer !== undefined && props.selectedCustomer !== null ? props.selectedCustomer.customer.end_Date : null)} innerRef={register({ required: true })} invalid={errors.end_Date && true} name="end_Date" type='date' id='C_toDate' />
                    {errors && errors.end_Date && <FormFeedback>{errors.end_Date.message}</FormFeedback>}
                </div>

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Profile </Label>
                <div>
                    {renderUserAvatar()}
                    <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                        <span className='d-none d-sm-block'>Change</span>
                        <span className='d-block d-sm-none'>
                            <Edit size={14} />
                        </span>
                        <input data={img} name="agt_imagebyte" type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
                    </Button.Ripple>
                </div>

            </Col>
            <hr className="m-2" />
            {/*Customer Admin*/}
            <div className="row form-group mx-0 col"><label className="control-label ">Admin User:</label></div>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">First Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input autoComplete="off" type="hidden" id="user_id" innerRef={props.register({ required: true })}
                        invalid={props.errors.user_id && true} name="user_id" value={props.selectedCustomer !== undefined && props.selectedCustomer !== null ? props.selectedCustomer.customer.user.user_id : 0} />
                    {props.errors && props.errors.user_id && <FormFeedback>{props.errors.user_id.message}</FormFeedback>}
                    <Input autoComplete="off" innerRef={register({ required: true })} invalid={errors.first_name && true} name="first_name" id={props.selectedCustomer !== null && props.selectedCustomer !== undefined && props.selectedCustomer.customer !== null && props.selectedCustomer.customer.user !== null ? props.selectedCustomer.customer.user.user_id : "C_firstName"} defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer === null || props.selectedCustomer.customer.user === null ? "" : props.selectedCustomer.customer.user.first_name} type="text" className="form-control" placeholder="First Name" />
                    {errors && errors.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Last Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.last_name && true} name="last_name" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.user === null ? "" : props.selectedCustomer.customer.user.last_name} type="text" className="form-control" id="C_lastName" placeholder="Last Name" />
                    {errors && errors.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
                </div>

            </Col>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1 ">Email <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1 ">
                    <Input innerRef={register({ required: true })} invalid={errors.u_email && true} name="u_email"
                        id={(props.selectedCustomer !== undefined && props.selectedCustomer !== null) && props.selectedCustomer.customer !== undefined && props.selectedCustomer.customer.user !== undefined ? props.selectedCustomer.customer.user.user_id : ""}
                        defaultValue={props.selectedCustomer !== undefined && props.selectedCustomer !== null && props.selectedCustomer.customer !== undefined && props.selectedCustomer.customer.user !== undefined ? props.selectedCustomer.customer.user.email : ""} type="text" className="form-control phone" id="Ca_Email" placeholder="Email" />
                         {errors && errors.u_email && <FormFeedback>{errors.u_email.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Mobile <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1"> <Input autoComplete="off" innerRef={register({ required: true })} invalid={errors.mobile && true} name="mobile" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.user === null ? "" : props.selectedCustomer.customer.user.mobile} type="number" className="form-control" id="Ca_mobile" placeholder="Mobile" />
                    {errors && errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">User ID <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.login_id && true} name="login_id" defaultValue={props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.user === null ? "" : props.selectedCustomer.customer.user.login_id}
                        disabled = {props.selectedCustomer === undefined || props.selectedCustomer === null ? "" : props.selectedCustomer.customer.user === null ? "" : props.selectedCustomer.customer.user.login_id && true }
                        type="text" className="form-control" id="C_userID" placeholder="User ID" autoComplete="off" />
                    {errors && errors.login_id && <FormFeedback>{errors.login_id.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Password <span style={{ color: 'red' }}>*</span>
                </Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.password_hash && true} name="password_hash" type="password" className="form-control phone" id="C_password" placeholder="Password" autoComplete="new-password" />
                    {errors && errors.password_hash && <FormFeedback>{errors.password_hash.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Confirm Password <span style={{ color: 'red' }}>*</span> </Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input innerRef={register({ required: true })} invalid={errors.passwordConfirmation && true} name="passwordConfirmation" type="password" className="form-control phone" id="C_confirmPassword" placeholder="Password" autoComplete="off" />
                    {errors && errors.passwordConfirmation && <FormFeedback>{errors.passwordConfirmation.message}</FormFeedback>}</div>
            </Col>


        </ModalBody >
    )
})

export default ModalBodyUI
