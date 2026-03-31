import { Edit } from 'react-feather'
import Avatar from "../../../../Avatar/Avatar"
import { useState } from 'react'
import { Input, Button, Label, Col, ModalBody, FormFeedback } from 'reactstrap'
import { Country, State, City } from 'country-state-city'
// ! PopUpBody 
const ModalBodyUI = (props) => {
   
    const { errors, register, selectedUser} = props
    
    //** Country Code */
    const [CCode, SetCCode] = useState(null)
   
    //** State Code */
    const [SCode, SetSCode] = useState(null)

    //const today = moment().format(selectedUser.start_Date)
    //console.log(today)

    if (selectedUser !== undefined && selectedUser !== null) {
        console.log("statecity")
        const country = Country.getAllCountries().filter(obj => obj.name === selectedUser.agt_country)
        const stateOj = State.getAllStates().filter(obj => obj.name === selectedUser.agt_state)

        if (CCode === null) {
            SetCCode(country[0].isoCode)

        }
        if (SCode === null) SetSCode(stateOj[0].isoCode)


    }
    function setStatus() {
        
        let status = []
        if (selectedUser !== undefined && selectedUser !== null) {
            status.push(<option selected value="false">Active</option>)
            if (selectedUser.userRequest.is_blocked) {
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
            const country1 = selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_country
            if (team.name === country1) country.push(<option selected CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else country.push(<option CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return country
        }, [])
        return country

    }
    const DateToMMDDYY = (d) => {
        const date = new Date(d)
        return `${ date.getMonth() + 1 } -${ date.getDate() } -${ date.getFullYear() }`
    }

    //! Load State Using Country Code
    function setState(CCode) {

        const states = State.getStatesOfCountry(CCode).reduce((states, team) => {
            const state = selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_state
            if (team.name === state) states.push(<option selected CountryCode={team.countryCode} StateCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else states.push(<option CountryCode={team.countryCode} StateCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return states
        }, [])
        return states
    }
    //! Load City Using Country Code and State Code
    function setCity(SCode) {

        const city = City.getCitiesOfState(CCode, SCode).reduce((city, team) => {
            const city1 = selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_city
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

    const [img, setImg] = useState(null)
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    if (selectedUser !== undefined && selectedUser !== null) {

        let baseString = props.selectedUser.userRequest.agt_imagebytebase !== null ? props.selectedUser.userRequest.agt_imagebytebase : null
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
    return (
        < ModalBody >
            <Col className="row form-group mx-0">
                <Label className="control-label ">Agent Details:</Label>
            </Col>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1"> Agent Name<span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input agentID={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agent_id} defaultValue={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_name}
                        disabled={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_name && true}
                        innerRef={register({ required: true })}
                        invalid={errors.agt_name && true}
                        type="text" className="form-control"
                        id="agt_name"
                        name="agt_name"
                        placeholder="Agent Name"

                    />
                    {errors && errors.agt_name && <FormFeedback>{errors.agt_name.message}</FormFeedback>}
                </div>
                
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Agent Code <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_code}
                        type="text" 
                        className="form-control"
                        id="agt_code"
                        innerRef={register({ required: true })}
                        invalid={errors.agt_code && true}
                        name="agt_code"
                        placeholder="Agent Code"
                        autoComplete="off"
                    />
                    {errors && errors.agt_code && <FormFeedback>{errors.agt_code.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Email <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_email }
                        innerRef={register({ required: true })}
                    invalid={errors.agt_email && true}
                    name="agt_email"
                    type="Myemail"
                    className="form-control"
                    id="agt_email"
                    placeholder="Email"
                    autoComplete="off"
                />

                    {errors && errors.agt_email && <FormFeedback>{errors.agt_email.message}</FormFeedback>}
                    </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Address <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_address}
                        innerRef={register({ required: true })}
                    invalid={errors.agt_address  && true}
                    name="agt_address"
                    type="text"
                    className="form-control"
                    id="agt_address "
                    placeholder="Address"
                    autoComplete="off"

                />
                    {errors && errors.agt_address && <FormFeedback>{errors.agt_address.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">


                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Phone <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_phone }
                        innerRef={register({ required: true })}
                    invalid={errors.agt_phone  && true}
                    name="agt_phone" type="number"
                    className="form-control"
                    id="agt_phone"
                    placeholder="Phone"
                    autoComplete="off" 
                />
                {console.log(errors.agt_phone)}
                    {errors && errors.agt_phone && <FormFeedback>{errors.agt_phone.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Country <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input  innerRef={register({ required: true })}
                    invalid={errors.agt_country  && true}
                    name="agt_country" type='select'
                    className="form-control country"
                    subid="#C_stateId"
                    id="agt_country "
                        onChange={
                            (e) => {
                                SetCCode(e.target.options[e.target.selectedIndex].getAttribute("CountryCode"))
                                
                            }
                        }
                   
                >
                    <option value="">Select Country</option>
                        {
                            LoadCountry()
                        }
                </Input>
                    {errors && errors.agt_country && <FormFeedback>{errors.agt_country.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">URL<span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_website}
                        innerRef={register({ required: true })}
                    invalid={errors.agt_website  && true}
                    name="agt_website"
                    type="text"
                    className="form-control"
                    id="agt_website"
                    placeholder="Website"
                    autoComplete="off"
                   
                />
                    {errors && errors.agt_website && <FormFeedback>{errors.agt_website.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">State <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input innerRef={register({ required: true })}
                    invalid={errors.agt_state  && true}
                    name="agt_state"
                    type="select"
                    className="states order-alpha form-control state"
                    parentid="#C_countryId"
                    subid="#C_cityId"
                    id="agt_state "
                    onChange={
                        (e) => {
                            SetSCode(e.target.options[e.target.selectedIndex].getAttribute("StateCode"))
                        }
                    }
                >
                        <option value="">Select State</option>
                        {
                            setState(CCode)
                        }
                </Input>
                    {errors && errors.agt_state && <FormFeedback>{errors.agt_state.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Status <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={selectedUser === undefined || selectedUser === null ? "" : (selectedUser.agt_isblocked ? "Deactive" : "Active") }
                        type="select"
                        name="state"
                        className=" form-control"
                        id="C_status"
                    
                >
                        {setStatus()}
                    </Input>
                    </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">City <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input
                    innerRef={register({ required: true })}
                    invalid={errors.agt_city  && true}
                    name="agt_city"
                    type="select"
                    className="cities order-alpha form-control city"
                    id="agt_city"
                  
                >
                        <option value="">Select City</option>
                        {
                            setCity(SCode)
                        }
                </Input>
                    {errors && errors.agt_city && <FormFeedback>{errors.agt_city.message}</FormFeedback>}
                    </div>
            </Col>
            <Col className="row form-group">
                <Label for='C_fromDate' className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Start Date <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={formatDate(props.selectedUser === undefined || props.selectedUser === null ? null : props.selectedUser.start_Date)}
                        innerRef={register({ required: true })}
                    invalid={errors.start_Date  && true}
                    name="start_Date"
                    type="date"
                    className="city"
                    id="start_Date " />
                    {errors && errors.start_Date && <FormFeedback>{errors.start_Date.message}</FormFeedback>}
                    </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Pincode <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={selectedUser === undefined || selectedUser === null ? "" : selectedUser.agt_pincode }
                        innerRef={register({ required: true })}
                    invalid={errors.agt_pincode  && true}
                    name="agt_pincode"
                    type="text"
                    className="form-control"
                    id="agt_pincode "
                    placeholder="Pincode"
                    autoComplete="off"
                    
                    />
                    
               
                    {errors && errors.agt_pincode && <FormFeedback>{errors.agt_pincode.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label for="C_toDate" className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">End Date <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={formatDate(props.selectedUser === undefined || props.selectedUser === null ? null : props.selectedUser.end_Date)}
                    innerRef={register({ required: true })}
                    invalid={errors.end_Date  && true}
                    name="end_Date"
                    type='date'
                    className="city"
                    id='end_Date' />
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

            <Col className="row form-group mx-0">
                <Label className="control-label ">Admin User:</Label>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">First Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input  userId={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.userRequest.user_id }
                        defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.userRequest.first_name}
                        innerRef={register({ required: true })}
                    invalid={errors.first_name  && true}
                    name="first_name"
                    type="text"
                    autoComplete="off"
                    className="form-control"
                    id="first_name"
                    placeholder="First Name"
                  
                />
                    {errors && errors.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Last Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.userRequest.last_name}
                        innerRef={register({ required: true })}
                    invalid={errors.last_name && true}
                    name="last_name"
                    type="text"
                    className="form-control phone"
                    id="last_name  "
                    autoComplete="off"
                    placeholder="Last Name" 
                />
                    {errors && errors.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
                </div>
                
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Email <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.userRequest.email}
                        innerRef={register({ required: true })}
                    invalid={errors.email  && true}
                    name="email"
                    type="Myemail"
                    className="form-control phone"
                    id="email "
                    placeholder="Email"
                    autoComplete="off"

                />
                    {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Mobile <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.userRequest.mobile}
                    innerRef={register({ required: true })}
                    invalid={errors.mobile && true}
                    name="mobile"
                    type="number"
                    className="form-control phone"
                    id="mobile "
                    placeholder="Mobile"
                    autoComplete="off"
                   
                />
                    {errors && errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">User ID <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.userRequest.login_id}
                        disabled={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.userRequest.login_id && true}
                        innerRef={register({ required: true })}
                        invalid={errors.login_id  && true}
                        name="login_id"
                        type="text"
                        className="form-control"
                        id="login_id "
                        placeholder="User ID"
                        autoComplete="off"
                   
                />
                    {errors && errors.login_id && <FormFeedback>{errors.login_id.message}</FormFeedback>}
                </div>
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Password
                        <span style={{ color: 'red' }}> *</span>
                </Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input innerRef={register({ required: true })}
                    invalid={errors.password && true}
                    name="password"
                    type="password"
                    className="form-control phone"
                    id="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    
                />
                    {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                </div>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Confirm Password
                        <span style={{ color: 'red' }}> *</span>
                </Label>
                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input
                    innerRef={register({ required: true })}
                    invalid={errors.passwordConfirmation && true}
                    name="passwordConfirmation"
                    type="password"
                    className="form-control phone"
                    id="passwordConfirmation"
                    placeholder="Password"
                    autoComplete="off" 
                    
                />
                    {errors && errors.passwordConfirmation && <FormFeedback>{errors.passwordConfirmation.message}</FormFeedback>}
                </div>
            </Col>
        </ModalBody >
    )
}

export default ModalBodyUI
