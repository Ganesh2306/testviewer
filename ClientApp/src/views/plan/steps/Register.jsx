// ** Yup Validation 
import * as yup from 'yup'
import "yup-phone"
import { yupResolver } from '@hookform/resolvers/yup'
// ** Utils
import { isObjEmpty } from '@utils'
import { useContext, useState } from 'react'
import { rollContext } from '../../context/rollContext'
// ** Third Party Components
import axios from 'axios'
import { Country, State, City } from 'country-state-city'
import { useForm } from 'react-hook-form'
import {
  Form,
  Input,
  Card,
  Label,
  FormGroup,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Row,
  Col,
  FormFeedback
} from 'reactstrap'
import { setObj } from './LicenceDetails'
import { User, ArrowLeft, MapPin } from 'react-feather'
import Finish from './Finish'

//** Var */
let errorTitle = null
let errorMessage = null

const SendDataToServer = async (toSend, setisFinesh, setDisabledModal) => {

    await axios.post('./RequestManagement/SaveRequest', toSend).then(response => {
        //console.log(response)
        if (response.data === true) {
            errorTitle = null
            errorMessage = null
        } else {
            errorTitle = "Something Went Wrong"
            errorMessage = "Please Try Again"
        }
        document.getElementById('Main-Plan-div').style.display = 'none'
        setisFinesh(true)
        setDisabledModal(true)
    })

}

const Register = props => {

    const [disabledModal, setDisabledModal] = useState(false)
    // ** Country State City
    const [CCode, SetCCode] = useState(null)
    const [SCode, SetSCode] = useState(null)
    // ** Props
    // ** useContext 
    const { setisFinesh } = useContext(rollContext)
    //const { stepper } = props
    // ** Vars
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const URL = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/
    const SignupSchema = yup.object().shape({
        //rUsr_First_Name: yup.string().min(3).max(10).matches(/^[a-zA-Z]*$/, "Only alphabets are allowed for this field ").required(),
        //rUsr_Last_Name: yup.string().min(3).max(10).matches(/^[a-zA-Z]*$/, "Only alphabets are allowed for this field ").required(),
        //rOrg_Phone: yup.string().phone().required(),
        //rUsr_Mobile: yup.string().phone().required(),
        //rOrg_Pincode: yup.string().min(6).max(6).required(),
        //rOrg_Email: yup.string().email().required(),
        //rUsr_Email: yup.string().email().required(),
        //rOrg_Name: yup.string().min(3).required().matches(/^[a-zA-Z]*$/, "Only alphabets are allowed for this field ").required(),
        //rOrg_Website: yup.string().required().matches(URL, 'error'),
        //rOrg_Address: yup.string().min(10).required(),
        //rOrg_Desciption: yup.string().min(10).required(),
        //rOrg_Country: yup.string().required(),
        //rOrg_State: yup.string().required(),
        //rOrg_City: yup.string().required()
    })
    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    //** SCountery State City  */
    const LoadCountry = () => {
        const country = Country.getAllCountries().reduce((country, team) => {
            //For Default Country
            const country1 = 'IN'
            if (team.name === country1) country.push(<option selected CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            else country.push(<option CountryCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return country
        }, [])
        return country
    }

    const setState = (CCode) => {
        const states = State.getStatesOfCountry(CCode).reduce((states, team) => {
            states.push(<option CountryCode={team.countryCode} StateCode={team.isoCode} key={team.name} value={team.name}>{team.name}</option>)
            return states
        }, [])
        return states
    }

    const setCity = (SCode) => {
        const city = City.getCitiesOfState(CCode, SCode).reduce((city, team) => {
            city.push(<option StateCode={team.stateCode} key={team.name} value={team.name}>{team.name}</option>)
            return city
        }, [])
        return city
    }

    // ** On form submit if there are no errors then go to next step
    const onSubmit = (Data) => {

        if (isObjEmpty(errors)) {
            const z = Object.assign(Data, setObj)
            SendDataToServer(z, setisFinesh, setDisabledModal)

        }
    }

        return (
            <Form className='list-view product-checkout' onSubmit={handleSubmit(onSubmit)} autocomplete="off">
                <Card className='shadow-none'>
                    <CardHeader className='flex-column align-items-start'>
                        <Row>
                            &nbsp;&nbsp;&nbsp;
         <User size={20} />
                            <CardTitle tag='h4' >&nbsp; Personal Information :</CardTitle>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rUsr_First_Name'>First Name <span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        type='text'
                                        name='rUsr_First_Name'
                                        id='rUsr_First_Name'
                                        placeholder='First Name'
                                        maxLength="15"
                                        autocomplete="off"
                                        innerRef={register({ required: true })}
                                        invalid={errors.rUsr_First_Name && true}
                                    />
                                    {errors && errors.rUsr_First_Name && <FormFeedback>{'First Name must be at least 3 characters'}</FormFeedback>}
                                </FormGroup>
                            </Col>

                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rUsr_Last_Name'>Last Name<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='text'
                                        name='rUsr_Last_Name'
                                        id='rUsr_Last_Name'
                                        placeholder='Last Name'
                                        maxLength="15"
                                        autocomplete="off"
                                        invalid={errors.rUsr_Last_Name && true}
                                        innerRef={register({ required: true })}
                                    />
                                    {errors && errors.rUsr_Last_Name && <FormFeedback>{'Last Name must be at least 3 characters'}</FormFeedback>}
                                </FormGroup>
                            </Col>

                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rUsr_Email'>Email<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='email'
                                        name={`rUsr_Email`}
                                        id={`rUsr_Email`}
                                        placeholder='Email'
                                        autocomplete="off"
                                        innerRef={register({ required: true })}
                                        invalid={errors.rUsr_Email && true}
                                    />
                                    {errors && errors.rUsr_Email && <FormFeedback>{'Please enter valid email'}</FormFeedback>}
                                </FormGroup>
                            </Col>

                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rUsr_Mobile'>Mobile<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='number'
                                        id='rUsr_Mobile'
                                        name='rUsr_Mobile'
                                        placeholder='Mobile'
                                        pattern="[0-9]"
                                        autocomplete="off"
                                        innerRef={register({ required: true })}
                                        invalid={errors.rUsr_Mobile && true}
                                    />
                                    {errors && errors.rUsr_Mobile && <FormFeedback>{'Mobile Number must be 10 digit long '}</FormFeedback>}
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row className='mt-2'>
                            &nbsp;&nbsp;&nbsp;
                <MapPin size={20} />
                            <CardTitle tag='h4' >&nbsp; Organization Information :</CardTitle>
                        </Row>
                        <Row>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rOrg_Name'>Organization Name <span style={{ color: 'red' }}>*</span></Label>
                                    <Input
                                        type='text'
                                        name='rOrg_Name'
                                        id='rOrg_Name'
                                        placeholder='Organization Name'
                                        maxLength="15"
                                        //pattern="[A-Za-z]{2,15}"
                                        autocomplete="off"
                                        invalid={errors.rOrg_Name && true}
                                        innerRef={register({ required: true })}
                                    />
                                    {errors && errors.rOrg_Name && <FormFeedback>{'Organization name must be at least 3 characters'}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rOrg_Website'>Website<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='text'
                                        name='rOrg_Website'
                                        id='rOrg_Website'
                                        placeholder='www'
                                        invalid={errors.rOrg_Website && true}
                                        innerRef={register({ required: true })}
                                        autocomplete="off"

                                    />
                                    {errors && errors.rOrg_Website && <FormFeedback>{'Please enter valid website'}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rOrg_Address'>Address<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='text'
                                        name='rOrg_Address'
                                        id='rOrg_Address'
                                        placeholder='Address'
                                        invalid={errors.rOrg_Address && true}
                                        innerRef={register({ required: true })}
                                        autocomplete="off"
                                    />
                                    {errors && errors.rOrg_Address && <FormFeedback>{'Address Must be atleast 10 characters '}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            {
                                //!Do It Before Valadation 
                                //ToDo: State City ..etc
                            }
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='checkout-apt-number'>Country<span style={{ color: 'red' }}> *</span></Label>
                                    <Input type='select' name="rOrg_Country" subid="#C_countryId" id="rOrg_Country"
                                        invalid={errors.rOrg_Country && true}
                                        innerRef={register({ required: true })}
                                        onChange={
                                            (e) => {
                                                SetCCode(e.target.options[e.target.selectedIndex].getAttribute("CountryCode"))
                                            }}
                                    >
                                        <option value="" >Select Country</option>
                                        {LoadCountry()}
                                    </Input>
                                    {errors && errors.rOrg_Country && <FormFeedback>{'Please your country'}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='checkout-apt-number'>State<span style={{ color: 'red' }}> *</span></Label>
                                    <Input type='select' name="rOrg_State" subid="#C_stateId" id="rOrg_State"
                                        invalid={errors.rOrg_State && true}
                                        innerRef={register({ required: true })}
                                        onChange={
                                            (e) => {
                                                SetSCode(e.target.options[e.target.selectedIndex].getAttribute("StateCode"))
                                            }

                                        }
                                    >
                                        <option value="">Select State</option>
                                        {setState(CCode)}
                                    </Input>
                                    {errors && errors.rOrg_State && <FormFeedback>{'Please your state'}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='checkout-apt-number'>City<span style={{ color: 'red' }}> *</span></Label>
                                    <Input type='select' name="rOrg_City" id="rOrg_City"
                                        invalid={errors.rOrg_City && true}
                                        innerRef={register({ required: true })}
                                    >
                                        <option value="" >Select City</option>
                                        {setCity(SCode)}
                                    </Input>
                                    {errors && errors.rOrg_City && <FormFeedback>{'Please your city'}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rOrg_Pincode'>Zipcode<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='number'
                                        name='rOrg_Pincode'
                                        id='rOrg_Pincode'
                                        placeholder='Zipcode'
                                        innerRef={register({ required: true })}
                                        invalid={errors.rOrg_Pincode && true}
                                        autocomplete="off"
                                        maxLength="6"
                                    />
                                    {errors && errors.rOrg_Pincode && <FormFeedback>{'please enter valid zipcode'}</FormFeedback>}
                                </FormGroup>
                            </Col>

                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rOrg_Phone'>Phone No.<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='number'
                                        name='rOrg_Phone'
                                        id='rOrg_Phone'
                                        placeholder='Phone No'
                                        innerRef={register({ required: true })}
                                        invalid={errors.rOrg_Phone && true}
                                        autocomplete="off"
                                        maxLength="11"
                                    />
                                    {errors && errors.rOrg_Phone && <FormFeedback>{'Phone Number Must be 10 digit'}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='3' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rOrg_Email'>Email<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='email'
                                        name={`rOrg_Email`}
                                        id={`rOrg_Email`}
                                        placeholder='Email'
                                        innerRef={register({ required: true })}
                                        invalid={errors.rOrg_Email && true}
                                        autocomplete="off"
                                    />
                                    {errors && errors.rOrg_Email && <FormFeedback>{'Please enter valid email'}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col md='6' sm='12'>
                                <FormGroup className='mb-2'>
                                    <Label for='rOrg_Desciption'>Description<span style={{ color: 'red' }}> *</span></Label>
                                    <Input
                                        type='text'
                                        name='rOrg_Desciption'
                                        id='rOrg_Desciption'
                                        placeholder='Type description'
                                        innerRef={register({ required: true })}
                                        autocomplete="off"
                                        invalid={errors.rOrg_Desciption && true}
                                    />
                                    {errors && errors.rOrg_Desciption && <FormFeedback>{'Description must be atleast 10 characters'}</FormFeedback>}
                                </FormGroup>
                            </Col>

                        </Row>

                        <Finish disabledModal={disabledModal} setDisabledModal={setDisabledModal} errorTitle={errorTitle} errorMessage={errorMessage} />
                    </CardBody>
                </Card>
                <div className='footer'>
                    <div className='divider'><div className='divider-text'></div></div>
                    <div className='d-flex justify-content-between'>
                        <Button.Ripple color='primary' className='btn-prev rounded-0' onClick={() => props.stepper.previous()}>
                            <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                        </Button.Ripple>
                        <Button.Ripple type='submit' color='success' className='btn-submit rounded-0'>
                            Submit
              </Button.Ripple>
                    </div>
                </div>
            </Form>
        )
    
}
export default Register
