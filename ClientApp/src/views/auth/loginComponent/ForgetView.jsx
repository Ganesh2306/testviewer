import {  useState } from 'react'
import { Coffee, ChevronLeft } from 'react-feather'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, FormFeedback } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import archivelogo from '../img/design_archive_logo.png'
import {otp as resendOtp, resetOTP_OBJ} from "./resendotp"
import axios from 'axios'

const ForgetView = (props) => {
    const [showpwbox, setshowpwbox] = useState(true)
    const [OTP, setOTP] = useState('')
    const Swal = require('sweetalert2')
    //const [password_hash, setConfirmPassword] = useState('')
    //const [NewPassword, setNewPassword] = useState('')
    const resetpassword = yup.object().shape({
        password_hash: yup.string().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password_hash'), null], 'Passwords must match')
      })
      const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(resetpassword) })
      
     const onSubmit = async (e) => {
        // password_hash
            const res = await axios.post('./Login/UpdateUserPassword', e)
            if (res.data) {
             props.setshow(3)
             return
            }
             Swal.fire({
                 icon: 'error',
                 title: 'Email',
                 text: "Something Went Wrong......."
             })
      }

    return (
        <div className='auth-wrapper auth-v1 px-2'>
        <div className='auth-inner py-2'>
        <div class="mb-0 card">
        <div class="card-body">  
            <div className='align-items-center auth-bg auth-viewer'>
            <div className='mx-auto text-center'>
                <img class="login-logo-viewer text-lg-center mb-1" src={archivelogo} alt="Logo"/>
            
                   {/*  <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(handOnSubmit)}> */}
                        {showpwbox ? <Form className='auth-forgot-password-form mt-2'> <FormGroup className='text-lg-left'>
                            <CardTitle tag='h3' className='font-weight-bold mb-1 text-lg-left login-header'>
                                Forgot Password?
                            </CardTitle>
                            <CardText className='mb-2 text-lg-left'>
                                Single User Password sent to your registered Email (ma***@**il.com)
                            </CardText>
                                        <div className="d-flex justify-content-between mb-1">
                                <Label className='form-label error' for='login-email'>
                                    Single User Password
                                </Label>
                                  {<Input autoComplete='off'
                                    className='w-75'
                                    autoFocus
                                    type='text'
                                    value={OTP}
                                    id='-login-email'
                                    name='login-email'
                                    placeholder='otp'
                                    onChange={e => setOTP(e.target.value)}
                                    
                                /> }

                               {/* <small className='form-label msg-error'> Resend</small>  */}
                            <Button.Ripple color='success' className='btn-sm w-40' style={{width:'40%'}}
                                    onClick={ async() => {
                                               const res = await resendOtp()
                                               Swal.fire({
                                                icon: 'success',
                                                title: 'OTP',
                                                text: "OTP Send To Registered Email....."
                                                
                                            })
                                        
                                          }}>
                                    Resend
                                </Button.Ripple>           
                            </div>
                
                            <div className="d-flex justify-content-between">        
                                {/* <Input className='col-sm-8 mr-50' type='password' id='' placeholder='pasword' autoFocus /> */}
                                <Button.Ripple color='success' block
                                    onClick={ async() => {
                                            if (OTP !== "") {
                                             
                                              const obj = {
                                                OTP
                                              }
                                              const res = await axios.post('./Login/VarifyOTP', obj)
                                               
                                              if (res.data) {
                                                 
                                                setshowpwbox(!showpwbox)
                                                return
                                            } 
                          
                                            Swal.fire({
                                              icon: 'error',
                                              title: 'OTP',
                                              text: "OTP not matched...."
                                          })
                                          }
                                        
                                          }}>
                                    Verify
                                </Button.Ripple>
                            </div>
                            {/* <small className='msg-error mt-1'>You have entered a wrong code. Please try again</small> */}
                        </FormGroup> </Form> :  <Form 
                        className='auth-forgot-password-form mt-2' 
                        onSubmit={handleSubmit(onSubmit)}> 
                            <div>
                            <CardTitle tag='h3' className='font-weight-bold mb-1 text-lg-left login-header'>
                                Set New Password
                            </CardTitle>
                            <FormGroup className='text-lg-left'>
                                <div className="d-flex justify-content-between">
                                    <Label className='form-label error' for='login-email'>
                                        New Password
                                    </Label>
                                </div>
                               <Input autoComplete='off'       
                                    autoFocus
                                    type='text'
                                    //value={NewPassword}
                                    id='password_hash'
                                    name='password_hash'
                                    placeholder='NewPassword'
                                    innerRef={register({ required: true })}
                                    invalid={errors.password_hash && true}
                                    //onChange={e => setNewPassword(e.target.value)}
                                    
                                />
                                {errors && errors.password_hash && <FormFeedback>{errors.password_hash.message}</FormFeedback>}
                            </FormGroup>
                            <FormGroup className='text-lg-left'>
                                <div className="d-flex justify-content-between">
                                    <Label className='form-label error' for='login-email'>
                                        Confirm Password 
                                    </Label>

                                </div>
                               {/* <Input type='password' id='' placeholder='confirm pasword' autoFocus />*/}
                                {/* <small className='msg-error mt-1'>The Confirm Password confirmation does not match</small> */}
                                <Input autoComplete='off'       
                                    autoFocus
                                    type='text'
                                    innerRef={register({ required: true })}
                                    invalid={errors.passwordConfirmation && true}
                                    //value={password_hash}
                                    id='passwordConfirmation'
                                    name='passwordConfirmation'
                                    placeholder='ConfirmPassword'

                                    //onChange={e => setConfirmPassword(e.target.value)}
                                    
                                />
                                {errors && errors.passwordConfirmation && <FormFeedback>{errors.passwordConfirmation.message}</FormFeedback>}
                            </FormGroup>
                            <Button.Ripple color='primary' type="submit" block >  Submit  </Button.Ripple>
                        </div> 
                        </Form> 
                        }
                            
                {/* </Form> */}
                <p className='text-center mt-2'>              
                    <ChevronLeft className='mr-25' size={14} />
                        <a href=''><span className='align-middle' onClick={() => { props.setshow(0) }}>Back to login</span></a>
                </p>
            </div>
            
            </div>
        </div>
        </div> 
        </div> 
        </div>     
    )
  }
  export default ForgetView