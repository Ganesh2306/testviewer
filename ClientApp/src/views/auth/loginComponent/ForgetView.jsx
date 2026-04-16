import {  useState } from 'react'
import { ChevronLeft } from 'react-feather'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CardTitle, CardText, Form, FormGroup, Label, Input,  Button, FormFeedback } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {otp as resendOtp} from "./resendotp"
import axios from 'axios'
import * as yup from 'yup'

const ForgetView = (props) => {
    const [showpwbox, setshowpwbox] = useState(true)
    const [OTP, setOTP] = useState('')
    const Swal = require('sweetalert2')
    const resetpassword = yup.object().shape({
        password_hash: yup.string().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password_hash'), null], 'Passwords must match')
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(resetpassword) })

    const onSubmit = async (e) => {
        const res = await axios.post('./Login/UpdateUserPassword', e)
        if (res.data) {
            props.setcview(4)
            return
        }
        Swal.fire({
            icon: 'error',
            title: 'Email',
            text: "Something Went Wrong......."
        })
    }

    return (
           <div class="mb-0 card">
                    <div class="card-body">
                        <div className='align-items-center auth-bg auth-viewer'>
                            <div className='mx-auto text-center'>
                                <img class="login-logo-viewer text-lg-center mb-1" src="https://d3bhyz9dg77mce.cloudfront.net/dam/archive/images/archive-logo.png"  alt="Logo" />
                                {showpwbox ? <Form className='auth-forgot-password-form mt-2'> <FormGroup className='text-lg-left'>
                                    <CardTitle tag='h3' className='font-weight-bold mb-1 text-lg-left login-header'>
                                        Forgot Password?
                                    </CardTitle>
                                    <CardText className='mb-2 text-lg-left'>
                                        OTP sent to your registered Email (ma***@**il.com)
                                    </CardText>
                                    <div className="d-flex justify-content-between mb-1">
                                        <Label className='form-label error' for='login-email'>
                                            OTP &nbsp;&nbsp;
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
                                        />}
                                        <Button.Ripple color='success' className='btn-sm w-40' style={{ width: '40%' }}
                                            onClick={async () => {
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
                                        <Button.Ripple color='success' block
                                            onClick={async () => {
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
                                </FormGroup> </Form> : <Form
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
                                                id='password_hash'
                                                name='password_hash'
                                                placeholder='NewPassword'
                                                innerRef={register({ required: true })}
                                                invalid={errors.password_hash && true}
                                            />
                                            {errors && errors.password_hash && <FormFeedback>{errors.password_hash.message}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup className='text-lg-left'>
                                            <div className="d-flex justify-content-between">
                                                <Label className='form-label error' for='login-email'>
                                                    Confirm Password
                                                </Label>

                                            </div>
                                            <Input autoComplete='off'
                                                autoFocus
                                                type='text'
                                                innerRef={register({ required: true })}
                                                invalid={errors.passwordConfirmation && true}
                                                id='passwordConfirmation'
                                                name='passwordConfirmation'
                                                placeholder='ConfirmPassword'
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
                                    <a className='text-primary' href='#'><span className='align-middle' onClick={() => { props.setcview(1) }}>Back to login</span></a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>   
    )
  }
  export default ForgetView