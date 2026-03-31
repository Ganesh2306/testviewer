import { useState} from 'react'
import { Input, Button, Label, Col, ModalBody, FormFeedback} from 'reactstrap'
import "react-datepicker/dist/react-datepicker.css"
import { Edit } from 'react-feather'
import Avatar from "../../../Avatar/Avatar"
import { Country, State, City } from 'country-state-city'

// ! PopUpBody 
const ModalBodyUI = (props) => {
    const { errors, register} = props

    console.log(props.selectedUser)
    //** Country Code */
    const [CCode, SetCCode] = useState(null)
  
    //** State Code */
    const [SCode, SetSCode] = useState(null)
        //** base64String */
    //const [img, setImg] = useState(null)
    //** CDN */

    //** User Id */
    // useEffect(() => {
    const [img, setImg] = useState(null)
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    
    if (props.selectedUser !== undefined && props.selectedUser !== null) {

        let baseString = props.selectedUser.users.agt_imagebytebase !== null ? props.selectedUser.users.agt_imagebytebase : null
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

    if (props.selectedUser !== undefined && props.selectedUser !== null) {
       
        console.log("statecity")
        const country = Country.getAllCountries().filter(obj => obj.name === props.selectedUser.organisation.org_Country)
        const stateOj = State.getAllStates().filter(obj => obj.name === props.selectedUser.organisation.org_State)

        if (CCode === null) {
            SetCCode(country[0].isoCode)

        }
        //if (SCode === null) SetSCode(stateOj[0].isoCode)
            if (stateOj.length > 0) {
                if (SCode === null) SetSCode(stateOj[0].isoCode)
              } else {
                console.error(`State not found: ${props.selectedUser.organisation.org_State}`)
              }
            }
    
     function LoadCountry() {

        const country = Country.getAllCountries().reduce((country, team) => {
            const country1 = props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Country
            if (team.name === country1) country.push(<option selected CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else country.push(<option CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return country
        }, [])
        return country

    }

    //! Load State Using Country Code
    function setState(CCode) {

        const states = State.getStatesOfCountry(CCode).reduce((states, team) => {
            const state = props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_State
            if (team.name === state) states.push(<option selected CountryCode={team.countryCode} StateCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else states.push(<option CountryCode={team.countryCode} StateCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return states
        }, [])
        return states
    }
    //! Load City Using Country Code and State Code
    function setCity(SCode) {

        const city = City.getCitiesOfState(CCode, SCode).reduce((city, team) => {
            const city1 = props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_City
            if (team.name === city1) city.push(<option selected StateCode={team.stateCode} key={team.name} value={team.name}>{team.name}</option>)
            else city.push(<option StateCode={team.stateCode} key={team.name} value={team.name}>{team.name}</option>)


            return city
        }, [])
        return city
        // return City.getCitiesOfState(CCode, SCode).map((team) => <option StateCode={team.stateCode} key={team.name} value={team.name}>{team.name}</option>)

    }

    function orgType() {

        if (props.selectedUser !== undefined && props.selectedUser !== null) {

            switch (props.selectedUser.organisation.org_Type) {

                case 0:
                    return "Enterprise"
                    break
                case 1:
                    return "Organisation"
                    break
                case 2:
                    return "Supllier"
                    break
                case 3:
                    return "Customer"
                    break
                case 4:
                    return "Agent"
                    break

                default:
                    break
            }

        }
    }
    function setStatus() {
        let status = []
        if (props.selectedUser !== undefined && props.selectedUser !== null) {
            status.push(<option selected value="false">Active</option>)
            if (props.selectedUser.users.is_blocked) {
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
           
return (

    <ModalBody>
        <Col className="row form-group mx-0">
            <Label className="control-label "><b>Organization:</b></Label>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Organization Name <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input
                Dlimit={props.obj === undefined ? 0 : props.obj.rOrg_Design_Limit}
                Supplierlimit={props.obj === undefined ? 0 : props.obj.rOrg_Supplier_Limit}
                Userlimit={props.obj === undefined ? 0 : props.obj.rOrg_User_Limit}
                Agentlimit={props.obj === undefined ? 0 : props.obj.rOrg_Agent_Limit}
                Customerlimit={props.obj === undefined ? 0 : props.obj.rOrg_Customer_Limit}
                orgId={props.obj === undefined ? 0 : props.obj.rOrg_Organisation_Id}
                reqID={props.reqId === undefined ? 0 : props.reqId}
                organisationid={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.organisation_Id}
                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Name} disabled={props.IsDisable === "true"}
                    type="text"
                    autocomplete="none"
                className="form-control"
                id="C_OrganizationName"
                placeholder="Organization Name"
                innerRef={register({ required: true })}
                    invalid={errors.Org_Name && true}
                    name="Org_Name"
               
            />
                {errors && errors.Org_Name && <FormFeedback>{errors.Org_Name.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Phone <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Phone}
                    type="number"
                    autocomplete="none"
                className="form-control phone"
                id="C_phoneNO"
                //name='phone'
                placeholder="Phone"
                              innerRef={register({ required: true })}
                    invalid={errors.Org_Phone && true}
                    name='Org_Phone'
                   
               
            />
                {errors && errors.Org_Phone && <FormFeedback>{errors.Org_Phone.message}</FormFeedback>}
            </div>
        </Col>

        <Col className="row form-group">
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Address <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input
                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Address}
                    type="text"
                    autocomplete="none"
                    className="form-control"
                    id="C_address"
                    placeholder="Address Line"
                    innerRef={register({ required: true })}
                    invalid={errors.Org_Address && true}
                    name="Org_Address"
            />
                {errors && errors.Org_Address && <FormFeedback>{errors.Org_Address.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Country <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Country}
                    type='select'
                    autocomplete="none"
                    className="form-control country"
                    subid="#C_stateId"
                    id="C_countryId"
                    innerRef={register({ required: true })}
                    invalid={errors.Org_Country && true}
                    name="Org_Country"
                onChange={
                    (e) => {

                        SetCCode(e.target.options[e.target.selectedIndex].getAttribute("CountryCode"))
                        //setState()
                    }
                }
            >
                    <option value="">Select Country</option>    {/* abhishek 08*/}
                {
                    LoadCountry()
                    // Country.getAllCountries().map((team) => <option CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
                }
                </Input>
                {errors && errors.Org_Country && <FormFeedback>{errors.Org_Country.message}</FormFeedback>}
            </div>
        </Col>
        <Col className="row form-group">


            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Email <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Email}
                    type="email"
                    autocomplete="none"
                    className="form-control phone"
                    id="C_email"
                    placeholder="Email"
                    innerRef={register({ required: true })}
                    invalid={errors.Org_Email && true}
                    name="Org_Email"
             />
                {errors && errors.Org_Email && <FormFeedback>{errors.Org_Email.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">State <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_State}
                type="select"
                className="states order-alpha form-control state"
                parentid="#C_countryId"
                subid="#C_cityId"
                    id="C_stateId"
                    autocomplete="none"
                    innerRef={register({ required: true })}
                    invalid={errors.Org_State && true}
                    name="Org_State"
                onChange={
                    (e) => {
                        SetSCode(e.target.options[e.target.selectedIndex].getAttribute("StateCode"))
                    }
                }
            >
                 <option value="">Select State</option>    {/*abhishek 08*/}
                {
                    setState(CCode)
                }
                </Input>
                {errors && errors.Org_State && <FormFeedback>{errors.Org_State.message}</FormFeedback>}
            </div>
        </Col>
        <Col className="row form-group">


            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Website URL<span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Website}
                type="text"
                autocomplete="none"
                className="form-control"
                id="C_website"
                placeholder="Website"
                innerRef={register({ required: true })}
                invalid={errors.Org_Website && true}
                name="Org_Website"
                />
                {errors && errors.Org_Website && <FormFeedback>{errors.Org_Website.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">City <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_City}
                    type="select"
                    className="cities order-alpha form-control city"
                    id="C_cityId"
                    autocomplete="none"
                    innerRef={register({ required: true })}
                    invalid={errors.Org_City && true}
                    name="Org_City"
            >
                 <option value="">Select City</option>  {/*abhishek 08*/}
                {
                    setCity(SCode)
                }
                </Input>
                {errors && errors.Org_City && <FormFeedback>{errors.Org_City.message}</FormFeedback>}
            </div>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Zipcode <span style={{ color: 'red' }}>*</span></Label>

            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Pincode}
                    type="text"
                    autocomplete="none"
                    className="form-control"
                    id="Org_Pincode"
                    placeholder="Zipcode"
                    innerRef={register({ required: true })}
                    invalid={errors.Org_Pincode && true}
                    name="Org_Pincode"
                />
                {errors && errors.Org_Pincode && <FormFeedback>{errors.Org_Pincode.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Organization Type <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : orgType()}
                    type="select"
                    className="states order-alpha form-control state"
                    parentid="#C_countryId"
                    subid="#C_cityId"
                    autocomplete="none"
                    id="C_stateId"
                    innerRef={register({ required: true })}
                    invalid={errors.Org_Type && true}
                    name="Org_Type"
                >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Organisation">Organization</option>
                    <option value="Supllier">Supllier</option>
                    <option value="Customer">Customer</option>
                    <option value="Agent">Agent</option>

                </Input>
                {errors && errors.Org_Type && <FormFeedback>{errors.Org_Type.message}</FormFeedback>}
            </div>
            {/*<Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Company Logo </Label>*/}
            {/*<Input type="file" className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1" id="" placeholder="Company logo" autoComplete="off"*/}
               
            {/*    onChange={onChange}*/}
            {/*/>*/}
           
        </Col>
        <Col className="row form-group">
       
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Status <span style={{ color: 'red' }}>*</span></Label>
            <Input
                type="select"
                name="orgstatus"
                className="states order-alpha form-control state col-sm-12 col-md-8 col-lg-4 mt-1 p-0 px-1"
                id="C_status"
               
            >
                {setStatus()}

            </Input>

            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Profile </Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
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
            <Label className="control-label "><b>Organization Admin:</b></Label>
        </Col>

        <Col className="row form-group">

            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">First Name <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.first_name}
                    type="text"
                    autoComplete="none"
                    className="form-control"
                    id="C_firstName"
                    placeholder="First Name" 
                    innerRef={register({ required: true })}
                    invalid={errors.first_name && true}
                    name="first_name"
                   

                />
                {errors && errors.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Last Name <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.last_name}
                    type="text"
                    autoComplete="none"
                    className="form-control phone"
                    id="C_lastName"
                    placeholder="Last Name"
                    innerRef={register({ required: true })}
                    invalid={errors.last_name && true}
                    name="last_name"
            />
                {errors && errors.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
            </div>
        </Col>

        <Col className="row form-group">
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Email <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.email}
                    type="Myemail"
                    autoComplete="none"
                    className="form-control phone"
                    id="C_email" placeholder="Email"
                    innerRef={register({ required: true })}
                    invalid={errors.email && true}
                    name="email"
             />
                {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Mobile <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input autoComplete="off" defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.mobile}
                    type="number"
                    autocomplete="off"
                    className="form-control phone"
                    id="C_MobileNO"
                    placeholder="Mobile"
                    innerRef={register({ required: true })}
                    invalid={errors.mobile && true}
                    name="mobile"
                
                />
                {errors && errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
            </div>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">User ID<span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input user_id={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.user_id}
                    defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.login_id} disabled={props.IsDisable === "true"}  //nirbhay
                    type="text"
                    autocomplete="none"
                    className="form-control phone"
                    id="C_OrganizationAdminID"
                    placeholder="Organization Admin ID"
                    innerRef={register({ required: true })}
                    invalid={errors.login_id && true}
                    name="login_id"
                />
                {errors && errors.login_id && <FormFeedback>{errors.login_id.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Department<span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.department}
                    type="text"
                    autoComplete="none"
                    className="form-control"
                    id="C_Department"
                    placeholder="Department" 
                    innerRef={register({ required: true })}
                    invalid={errors.department && true}
                    name="department"
                />
                {errors && errors.department && <FormFeedback>{errors.department.message}</FormFeedback>}
            </div>
        </Col>
        <Col className="row form-group">

            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Password
                    {props.bodyFor === 'add' &&
                    <span style={{ color: 'red' }}> *</span>
                }
            </Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
            <Input  type="password"
                className="form-control phone"
                id="C_password" placeholder="Password"
                autoComplete="new-password" minLength="8" maxLength="20"
                innerRef={register({ required: true })}
                invalid={errors.password_hash && true}
                name="password_hash"                   
                />
                {errors && errors.password_hash && <FormFeedback>{errors.password_hash.message}</FormFeedback>}
            </div>
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Confirm Password
                        {props.bodyFor === 'add' &&
                    <span style={{ color: 'red' }}> *</span>
                }
            </Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input type="password"
                    autoComplete="none"
                    className="form-control phone"
                    id="C_confirmPassword" placeholder="Password"
                    innerRef={register({ required: true })}
                    invalid={errors.passwordConfirmation && true}
                    name="passwordConfirmation"
               
                />
                {errors && errors.passwordConfirmation && <FormFeedback>{errors.passwordConfirmation.message}</FormFeedback>}
            </div>


        </Col>

    </ModalBody >
)
}

export default ModalBodyUI
