import { useState } from 'react'
import { Coffee, ChevronLeft, CheckCircle, Check } from 'react-feather'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, FormFeedback, Button, Card, Alert } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import archivelogo from '../img/design_archive_logo.png'
import axios from 'axios'
import { setOTP_OBJ } from "./resendotp"
const Swal = require('sweetalert2')
const ConfirmEmail = (props) => {

    const ConfirmEmailSchema = yup.object().shape({
        username: yup.string().trim().min(2, "username Name must have at least 2 characters").max(50, "username Name can have max 50 characters").required("username Name is required"),
        EmailTo: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address ")
    })

    const [showError, setshowError] = useState(null)
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(ConfirmEmailSchema) })

    const onSubmit = e => {
        //console.log(e)
        //Loader start
        const tempobj = e 
        axios.post('./Login/SendEmail', e).then(e => {
            if (e.data.flag) {
                //ToDo : Loader End last 
                setshowError(null)
                setOTP_OBJ(tempobj)
                props.setshow(2)
            } else {    
                //Alert(e.data.msg)
                /* Swal.fire({
                    icon: 'error',
                    text: e.data.msg === null ? "something went wrong" : e.data.msg
                }) */
                setshowError(e.data.msg === undefined ? "something went wrong" : e.data.msg)
            }  
           /* let a =  {
                sent:false,
                msg:'Username and Email is not valid'
            } */
            
        }).catch(e => {

            //ToDo : Loader End last 
        })
        //props.setshow(2)
    }
    return (
        <div className='auth-wrapper auth-v1 px-2'>
        <div className='auth-inner py-2'>
        <div class="mb-0 card">
        <div class="card-body">
            <div className='align-items-center auth-bg auth-viewer'>
                <div className='mx-auto text-xl-center'>
                    <img class="login-logo-viewer text-lg-center mb-1" src={archivelogo} alt="Logo" />
                   <CardTitle tag='h3' className='font-weight-bold mb-1 text-lg-left login-header'>
                                    Forgot Password?
                    </CardTitle>
                      <CardText className='text-lg-left' style={{ marginTop: '-0.5rem' }}>
                                    Please Enter Your registerd Email
                       </CardText>
                    <Form className='auth-forgot-password-form mt-2 mb-2' onSubmit={handleSubmit(onSubmit)}>
                     <FormGroup className='text-lg-left'>
                                        <Label className='form-label login-norm-text' for='login-email'>
                                            Username
                                        </Label>
                                        <Input
                                            className='col-sm-12' name='username' type='Username'
                                            innerRef={register({ required: true })}
                                            invalid={errors.username && true} 
                                            placeholder='username' autoFocus
                                            defaultValue={props.username}
                                        />
                        {errors && errors.username && <FormFeedback>{errors.username.message}</FormFeedback>}
                     </FormGroup>
                        <FormGroup className='text-lg-left'>                           
                                <Label className='form-label login-norm-text' for='login-email'>
                                          Regitered Email
                                        </Label>
                                <Input className='col-sm-12' name='EmailTo' type='email'
                                onChange={() => {
                                    setshowError(null)  
                                }}
                                innerRef={register({ required: true })}
                                invalid={errors.EmailTo && true}
                                 placeholder='Please enter email' autoFocus />                                                           
                          {errors && errors.EmailTo && <FormFeedback>{errors.EmailTo.message}</FormFeedback>}
                          {showError && <span style={{color:'#ea5455', width:'100%', fontSize:'0.857rem'}}>{showError}</span>}
                            {/* <small className='msg-error mt-1'>Please enter a valid email address</small> */}
                        </FormGroup>                             
                        <Button.Ripple color='primary' block type='submit' 
                        //onClick={() => { props.setshow(2) }}
                        >
                            Submit
                        </Button.Ripple>
                    </Form>
                    <p className='text-center mt-2'>
                        <ChevronLeft className='mr-25' size={14} />
                        <span className='align-middle' onClick={() => { props.setshow(0) }}>Back to login</span>
                    </p>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}
export default ConfirmEmail