import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Input, Button, Label, Col, ModalBody, FormFeedback } from 'reactstrap'
import { Country, State, City } from 'country-state-city'
import * as validate from './ValidationFunctions'
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import { Edit } from 'react-feather'

import Avatar from "../../../../Avatar/Avatar"
let password = ""
let confirmPassword = ""
// ! PopUpBody 
const ModalBodyUIAddEditSupplier = forwardRef((props, ref) => {
    // ! all state value
    //** Email */
    
    const { errors, register } = props
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
    //** Country Code*/
    const [CCode, SetCCode] = useState(null)
    const [uCCode, SetUCCode] = useState(null)
    //** State Code */
    const [SCode, SetSCode] = useState(null)
    const [uSCode, SetUSCode] = useState(null)

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
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
    const DateToMMDDYY = (d) => {
        
        if (d !== null) {
            const date = new Date(d)
            return `${date.getMonth() + 1} -${date.getDate()} -${date.getFullYear()}`
        }

    }

    const [img, setImg] = useState(null)
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    if (props.selectedSupplier !== undefined && props.selectedSupplier !== null) {

        let baseString = props.selectedSupplier.user.agt_imagebytebase !== null ? props.selectedSupplier.user.agt_imagebytebase : null
        
        if (baseString !== null && baseString !== undefined) {
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

    if (props.selectedSupplier !== undefined && props.selectedSupplier !== null) {
        //props.selectedSupplier !== undefined && props.selectedSupplier !== null ?

        console.log("statecity")
        
        const country = Country.getAllCountries().filter(obj => obj.name === props.selectedSupplier.sup_country)
        const stateOj = State.getAllStates().filter(obj => obj.name === props.selectedSupplier.sup_state)

        if (CCode === null) {
            SetCCode(country[0].isoCode)

        }
        if (SCode === null) SetSCode(stateOj[0].isoCode)


    }
    function setStatus() {
        let status = []
        if (props.selectedSupplier !== undefined && props.selectedSupplier !== null) {
            status.push(<option selected value="false">Active</option>)
            if (props.selectedSupplier.user.is_blocked) {
                status = []
                status.push(<option selected value="true">Block</option>)
                status.push(<option value="false">Active</option>)
            } else {
                status.push(<option value="true">Block</option>)
            }

        } else {

            status.push(<option value="false">Active</option>)
            status.push(<option value="true">Block</option>)
        }
        return status
    }
    function LoadCountry() {

        const country = Country.getAllCountries().reduce((country, team) => {
            const country1 = props.selectedSupplier === undefined || props.selectedSupplier === null ? "" : props.selectedSupplier.sup_country
            if (team.name === country1) country.push(<option selected CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else country.push(<option CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return country
        }, [])
        return country

    }

    //! Load State Using Country Code
    function setState(CCode) {

        const states = State.getStatesOfCountry(CCode).reduce((states, team) => {
            const state = props.selectedSupplier === undefined || props.selectedSupplier === null ? "" : props.selectedSupplier.sup_state
            if (team.name === state) states.push(<option selected CountryCode={team.countryCode} StateCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else states.push(<option CountryCode={team.countryCode} StateCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return states
        }, [])
        return states
    }
    //! Load City Using Country Code and State Code
    function setCity(SCode) {

        const city = City.getCitiesOfState(CCode, SCode).reduce((city, team) => {
            const city1 = props.selectedSupplier === undefined || props.selectedSupplier === null ? "" : props.selectedSupplier.sup_city
            if (team.name === city1) city.push(<option selected StateCode={team.stateCode} key={team.name} value={team.name}>{team.name}</option>)
            else city.push(<option StateCode={team.stateCode} key={team.name} value={team.name}>{team.name}</option>)


            return city
        }, [])
        return city
        // return City.getCitiesOfState(CCode, SCode).map((team) => <option StateCode={team.stateCode} key={team.name} value={team.name}>{team.name}</option>)

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


    //useEffect(() => {
    //    
    //    //if (props.selectedSupplier !== null && props.selectedSupplier !== undefined) {


    //    //    if ((document.getElementById('start_Date')) !== undefined && (document.getElementById('start_Date')) !== null) {
    //    //        document.getElementById('start_Date').value = formatDate(new Date(props.selectedSupplier.start_Date))
    //    //        //setStartDate(new Date(props.selectedSupplier.start_Date))
    //    //        setEndDate(new Date(props.selectedSupplier.end_Date))
    //    //    }
    //    //}
    //    // document.getElementById('start_Date').value = props !== null && props.selectedSupplier !== null && props.selectedSupplier !== undefined ? DateToMMDDYY(props.selectedSupplier.start_Date) : ""
    //    //    document.getElementById('end_Date').value = props !== null && props.selectedSupplier !== null && props.selectedSupplier !== undefined ? DateToMMDDYY(props.selectedSupplier.end_Date) : ""
    //}, [])
    console.log(new Date())
    const labelStyle = 'col-form-Label col-sm-12 col-md-4 col-lg-2'
    const divStyle = 'col-sm-12 col-md-8 col-lg-4 p-0'
    const controlStyle = 'form-control'
    const dividerStyle = 'd-lg-none col-sm-12 form-group mb-sm-1 mb-md-1'
    return (
            < ModalBody className = 'p-0 mt-1' >
            <div className="row form-group mx-0 col"><label className="control-label " style={{ fontWeight: 'bold' }}>Supplier Details:</label></div>
            <Col className="row form-group">
                <Label className={labelStyle}>Supplier Name<span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input autoComplete="off" type="hidden" id="supplier_id" innerRef={props.register({ required: true })}
                        invalid={props.errors.supplier_id && true} name="supplier_id" value={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.supplier_id : 0} />
                    {props.errors && props.errors.supplier_id && <FormFeedback>{props.errors.supplier_id.message}</FormFeedback>}
                    <Input autoComplete="off" defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_name : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_name && true} name='sup_name' type="text" className={controlStyle} id="C_customerName" placeholder="Supplier Name" 
                        //style={{ borderColor: (ounvalid === true) ? '#66DE93' : (ounvalid === null) ? '' : '#D83A56' }}
                        disabled={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_name : "" && true }
                        onChange={(e) => {
                            // setOUNvalid(validate.ValidateOUName(e.target.value))
                        }}
                    />
                    {props.errors && props.errors.sup_code && <FormFeedback>{props.errors.sup_code.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>Supplier Code <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_code : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_code && true} name="sup_code" type="text" className={controlStyle} id="C_code" placeholder="Supplier Code" autocomplete="off"
                        //style={{ borderColor: (oucvalid === true) ? '#66DE93' : (oucvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            // setOUCvalid(validate.ValidateOUCode(e.target.value))
                        }}
                    /> {props.errors && props.errors.sup_code && <FormFeedback>{props.errors.sup_code.message}</FormFeedback>}
                </div>

            </Col>
            <Col className="row form-group">
                <Label className={labelStyle}>Email <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_email : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_email && true} name="sup_email"
                        //style={{ borderColor: (evalid === true) ? '#66DE93' : (evalid === null) ? '' : '#D83A56' }}
                        type="email" className={controlStyle} id="C_email" placeholder="Email" autocomplete="off" onChange={
                            (e) => { setEvalid(validate.ValidateEmail(e.target.value)) }
                        } />
                    {props.errors && props.errors.sup_email && <FormFeedback>{props.errors.sup_email.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>Address<span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_address : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_address && true} name="sup_address" type="text" className={controlStyle} id="C_address" placeholder="Address Line" autocomplete="off"
                        //style={{ borderColor: (addressvalid === true) ? '#66DE93' : (addressvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setADDvalid(validate.ValidateAddress(e.target.value))
                        }}
                    />
                    {props.errors && props.errors.sup_address && <FormFeedback>{props.errors.sup_address.message}</FormFeedback>}
                </div>

            </Col>
            <Col className="row form-group">

                <Label className={labelStyle}>Phone <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_phone : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_phone && true} type="number" className={controlStyle} id="C_phoneNO" name='sup_phone' placeholder="Phone"  autocomplete="off" maxLength="11"
                        //style={{ borderColor: (pnvalid === true) ? '#66DE93' : (pnvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            // setPNvalid(validate.ValidatePhoneNumber(e.target.value))
                        }}
                    />
                    {props.errors && props.errors.sup_phone && <FormFeedback>{props.errors.sup_phone.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>Country <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_country && true} type='select' name="sup_country" className={controlStyle} subid="#C_stateId" id="C_countryId"
                        //style={{ borderColor: (countrydvalid === true) ? '#66DE93' : (countrydvalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                //  setCOUNTRYvalid(validate.validateCountry(e.target.value))
                                SetCCode(e.target.options[e.target.selectedIndex].getAttribute("CountryCode"))
                            }
                        }
                    >
                        <option value="">Select Country</option>
                        {
                            LoadCountry()
                        }
                    </Input>
                    {props.errors && props.errors.sup_country && <FormFeedback>{props.errors.sup_country.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className={labelStyle}>Website<span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_website : ""} name="sup_website" innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_website && true} type="text" className={controlStyle} id="C_website" placeholder="Website" autocomplete="off" />
                    {props.errors && props.errors.sup_website && <FormFeedback>{props.errors.sup_website.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>State <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_state && true} name="sup_state" type="select" className={controlStyle} parentid="#C_countryId" subid="#C_cityId" id="C_stateId"
                        //style={{ borderColor: (statevalid === true) ? '#66DE93' : (statevalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                //setSTATEvalid(validate.validateState(e.target.value))
                                SetSCode(e.target.options[e.target.selectedIndex].getAttribute("StateCode"))
                            }
                        }
                    >
                        <option value="">Select State</option>
                        {
                            setState(CCode)
                        }
                    </Input>
                    {props.errors && props.errors.sup_state && <FormFeedback>{props.errors.sup_state.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className={labelStyle}>Status <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? `${!props.selectedSupplier.sup_isblocked}` : "false"} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_isblocked && true} type="select" name="state" className={controlStyle} id="C_status"
                        ////style={{ borderColor: (statusvalid === true) ? '#66DE93' : (statusvalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                setStatusvalid(validate.validateStatus(e.target.value))
                            }
                        }
                    >

                        {setStatus()}
                    </Input>
                    {props.errors && props.errors.sup_isblocked && <FormFeedback>{props.errors.sup_isblocked.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>City <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_city : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_city && true} type="select" name="sup_city" className={controlStyle} id="C_cityId"
                        //style={{ borderColor: (cityvalid === true) ? '#66DE93' : (cityvalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                setCITYvalid(validate.validateCity(e.target.value))
                            }
                        }
                    >
                        <option value="">Select City</option>
                        {
                            setCity(SCode)
                        }
                    </Input>
                    {props.errors && props.errors.sup_city && <FormFeedback>{props.errors.sup_city.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label for='start_Date' className={labelStyle}>Start Date <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={formatDate(props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.start_Date : null)} id="start_Date" placeholder="dd-mm-yyyy" type="date" innerRef={props.register({ required: true })}
                        invalid={props.errors.start_Date && true} name="start_Date" className={controlStyle} />
                    {/*selected={props.input.value ? moment(props.input.value, 'DD-MM-YYYY') : moment()}*/}
                    {/*<DatePicker dateFormat="dd/MM/yyyy" selected={startDate} id="start_Date" name="start_Date" className="form-control w-100" innerRef={props.register({ required: true })} invalid={props.errors.start_Date && true}*/}
                    {/*    onChange={(date) => setStartDate(date)} />*/}
                    {props.errors && props.errors.start_Date && <FormFeedback>{props.errors.start_Date.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>Pincode <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.sup_pincode : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.sup_pincode && true} type="text" name="sup_pincode" className={controlStyle} id="C_zipcode" placeholder="Zipcode" autocomplete="off" maxLength="6"
                        //style={{ borderColor: (zipvalid === true) ? '#66DE93' : (zipvalid === null) ? '' : '#D83A56' }}
                        onChange={
                            (e) => {
                                setZIPvalid(validate.validateZip(e.target.value))
                            }
                        }
                    />
                    {props.errors && props.errors.sup_pincode && <FormFeedback>{props.errors.sup_pincode.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label for="C_toDate" id="end_Date" className={labelStyle}>End Date <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={formatDate(props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.end_Date : null)}  innerRef={props.register({ required: true })} placeholder="dd-mm-yyyy"
                        invalid={props.errors.end_Date && true} type='date' name='end_Date' className={controlStyle} id='end_Date' />
                    {/*<DatePicker defaultValue={formatDate(props.selectedSupplier !== undefined && props.selectedSupplier !== null ? props.selectedSupplier.end_Date : null)} id="end_Date" name="end_Date" className="form-control w-100" innerRef={props.register({ required: true })} invalid={props.errors.start_Date && true}*/}
                    {/*    onChange={(date) => setEndDate(date)} />*/}
                    {props.errors && props.errors.end_Date && <FormFeedback>{props.errors.end_Date.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className="col-sm-2">Profile</Label>
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
            <hr class="m-2" />
            <div className="row form-group mx-0 col"><label className="control-label " style={{ fontWeight: 'bold' }}>Admin User:</label></div>

            <Col className="row form-group">
                <Label className={labelStyle}>First Name <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input autoComplete="off" type="hidden" id="user_id" innerRef={props.register({ required: true })}
                        invalid={props.errors.user_id && true} name="user_id" value={props.selectedSupplier !== undefined && props.selectedSupplier !== null && props.selectedSupplier.user !== null ? props.selectedSupplier.user.user_id : 0} />
                    {props.errors && props.errors.user_id && <FormFeedback>{props.errors.user_id.message}</FormFeedback>}
                    <Input autoComplete="off" defaultValue={(props.selectedSupplier !== undefined && props.selectedSupplier !== null) && props.selectedSupplier.user !== null ? props.selectedSupplier.user.first_name : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.first_name && true} name="first_name" type="text" className={controlStyle} id="C_firstName" placeholder="First Name"
                        //style={{ borderColor: (fvalid === true) ? '#66DE93' : (fvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setFvalid(validate.ValidateFName(e.target.value))
                        }}
                    />
                    {props.errors && props.errors.first_name && <FormFeedback>{props.errors.first_name.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 ">Last Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 ">
                    <Input defaultValue={(props.selectedSupplier !== undefined && props.selectedSupplier !== null) && props.selectedSupplier.user !== null ? props.selectedSupplier.user.last_name : ""} innerRef={props.register({ required: true })} invalid={props.errors.ur_last_name && true} name="ur_last_name" type="text" className={controlStyle} id="C_lastName" placeholder="Last Name"
                        //style={{ borderColor: (lvalid === true) ? '#66DE93' : (lvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setLvalid(validate.ValidateLName(e.target.value))
                        }}
                    />  {props.errors && props.errors.ur_last_name && <FormFeedback>{props.errors.ur_last_name.message}</FormFeedback>}
                </div>

            </Col>
            <Col className="row form-group">
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>Email <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={(props.selectedSupplier !== undefined && props.selectedSupplier !== null) && props.selectedSupplier.user !== null ? props.selectedSupplier.user.email : ""} innerRef={props.register({ required: true })} invalid={props.errors.ur_email && true} name="ur_email"
                        //style={{ borderColor: (evalid === true) ? '#66DE93' : (evalid === null) ? '' : '#D83A56' }} 
                        type="text" className={controlStyle} id="C_email" placeholder="Email" autocomplete="off" onChange={
                            (e) => { setEvalid(validate.ValidateEmail(e.target.value)) }
                        } />
                    {props.errors && props.errors.ur_email && <FormFeedback>{props.errors.ur_email.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>Mobile <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={(props.selectedSupplier !== undefined && props.selectedSupplier !== null) && props.selectedSupplier.user !== null ? props.selectedSupplier.user.mobile : ""} type="number" className={controlStyle} id="C_phoneNO" innerRef={props.register({ required: true })} invalid={props.errors.ur_mobile && true} name='ur_mobile' placeholder="Mobile" autocomplete="off"
                        //style={{ borderColor: (pnvalid === true) ? '#66DE93' : (pnvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            setPNvalid(validate.ValidatePhoneNumber(e.target.value))
                        }}
                    />
                    {props.errors && props.errors.ur_mobile && <FormFeedback>{props.errors.ur_mobile.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className={labelStyle}>User ID <span style={{ color: 'red' }}>*</span></Label>
                <div className={divStyle}>
                    <Input defaultValue={(props.selectedSupplier !== undefined && props.selectedSupplier !== null) && props.selectedSupplier.user !== null ? props.selectedSupplier.user.login_id : ""} innerRef={props.register({ required: true })} invalid={props.errors.login_id && true} name='login_id' type="text" className={controlStyle} id="C_userID" placeholder="User ID" autocomplete="off"
                        //style={{ borderColor: (useridvalid === true) ? '#66DE93' : (useridvalid === null) ? '' : '#D83A56' }}
                        disabled={(props.selectedSupplier !== undefined && props.selectedSupplier !== null) && props.selectedSupplier.user !== null ? props.selectedSupplier.user.login_id : "" && true}
                        onChange={(e) => {
                            setUIDvalid(validate.ValidateUserid(e.target.value))
                        }}
                    />
                    {props.errors && props.errors.login_id && <FormFeedback>{props.errors.login_id.message}</FormFeedback>}
                </div>
                <div class={dividerStyle}></div>
                <Label className={labelStyle}>Password<span style={{ color: 'red' }}>*</span>
          {/*{bodyFor === 'add' &&*/}
                    {/*              <span style={{ color: 'red' }}> *</span>*/}
                    {/*          }*/}
                </Label>
                <div className={divStyle}>
                    <Input innerRef={props.register({ required: true })} invalid={props.errors.password_hash && true} name='password_hash' type="password" className={controlStyle} id="C_password" placeholder="Password" autocomplete="new-password"
                        //style={{ borderColor: (passwordvalid === true) ? '#66DE93' : (passwordvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            validatePassWord(e.target.value)
                        }}
                    />  {props.errors && props.errors.password_hash && <FormFeedback>{props.errors.password_hash.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className={labelStyle}>Confirm Password<span style={{ color: 'red' }}>*</span>
          {/*{bodyFor === 'add' &&*/}
                    {/*              <span style={{ color: 'red' }}> *</span>*/}
                    {/*          }*/}
                </Label>
                <div className={divStyle}>
                    <Input innerRef={props.register({ required: true })} invalid={props.errors.password_hash2 && true} name='password_hash2' type="password" className={controlStyle} id="C_confirmPassword" placeholder="Password" autocomplete="off"
                        //style={{ borderColor: (cpasswordvalid === true) ? '#66DE93' : (cpasswordvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            validateCPassWord(e.target.value)
                        }}
                    />  {props.errors && props.errors.password_hash2 && <FormFeedback>{props.errors.password_hash2.message}</FormFeedback>}
                </div>
            </Col>


        </ModalBody >
    )
})

export default ModalBodyUIAddEditSupplier
