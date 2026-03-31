import { useState} from 'react'
import { Input, Button, Label, Col, ModalBody, FormFeedback} from 'reactstrap'
import "react-datepicker/dist/react-datepicker.css"
import { Edit } from 'react-feather'
import { Country, State, City } from 'country-state-city'

// ! PopUpBody 
const ModalBodyUI = (props) => {
    const { errors, register} = props
    //** Country Code */
    const [CCode, SetCCode] = useState(null)
  
    //** State Code */
    const [SCode, SetSCode] = useState(null)
    const [img, setImg] = useState(null)
    
    if (props.selectedUser !== undefined && props.selectedUser !== null) {

        let baseString = props.selectedUser.users.agt_imagebytebase !== null ? props.selectedUser.users.agt_imagebytebase : null
        if (baseString !== null && baseString !== undefined) {
            baseString = `data:image/jpeg;base64,${baseString}`
            if (img === null) setImg(baseString)

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
           
return (

    <ModalBody>
        {/* <Col className="row form-group mx-0">
            <Label className="control-label "><b>Organization:</b></Label>
        </Col> */}
         <Col className="row form-group">
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">First Name <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                <Input 
                //defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.first_name}
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
                <Input 
                //defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.users.last_name}
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
            <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Company Name <span style={{ color: 'red' }}>*</span></Label>
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
                //defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Name} disabled={props.IsDisable === "true"}
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
            <Input
            // defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Phone}
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
                //defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Address}
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
            <Input
            // defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Country}
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
            <Input
            // defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Email}
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
            <Input
            // defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_State}
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
            <Input 
            //defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Website}
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
            <Input 
            //defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_City}
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
                <Input 
                //defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.organisation.org_Pincode}
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
        </Col>

         <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 mt-1">Fabric Upload Limit <span style={{ color: 'red' }}>*</span></Label>

                <div className="col-sm-12 col-md-8 col-lg-4 p-0 mt-1">
                    <Input
                        type="text"
                        autocomplete="none"
                        className="form-control"
                        id="fabric upload limit"
                        placeholder="fabric upload limit"
                        innerRef={register({ required: true })}
                        invalid={errors.fabric_upload_limit && true}
                        name="fabric_upload_limit"
                    />
                    {errors && errors.fabric_upload_limit && <FormFeedback>{errors.fabric_upload_limit.message}</FormFeedback>}
                </div>
            </Col>

    </ModalBody >
)
}

export default ModalBodyUI
