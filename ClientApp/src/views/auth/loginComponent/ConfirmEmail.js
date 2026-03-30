import { useState } from 'react'
import { ChevronLeft} from 'react-feather'
import { CardTitle, Form, FormGroup, Input, FormFeedback, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { setOTP_OBJ } from './resendotp'
import axios from 'axios'

const ConfirmEmail = (props) => {
    const ConfirmEmailSchema = yup.object().shape({
        username: yup.string().trim().min(2, "username Name must have at least 2 characters").max(50, "username Name can have max 50 characters").required("username Name is required"),
        EmailTo: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address ")
    })

    const [showError, setshowError] = useState(null)
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(ConfirmEmailSchema) })
    const [isfocus, setisFocus] = useState()
    
    const onSubmit = e => {
        const tempobj = e
        axios.post('./Login/SendEmail', e).then(e => {
            if (e.data.flag) {
                setshowError(null)
                setOTP_OBJ(tempobj)
                props.setcview(3)
            } else {
                setshowError(e.data.msg === undefined ? "something went wrong" : e.data.msg)
            }

        }).catch(e => {
        })
    }
    return (
        <div class="mb-0 card">
            <div class="card-body">
                <div className='align-items-center auth-bg auth-viewer'>
                    <div className='mx-auto text-xl-center'>
                        <CardTitle tag='h3' className='font-weight-bold mb-1 text-center login-header'>
                            Forgot Password?
                        </CardTitle>
                        <Form className='auth-forgot-password-form mt-2 mb-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup className={isfocus ? 'parentActive text-left' : 'parent text-left'}>
                            <div className='form-label placeholder'>Username</div>
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
                                <Input className='col-sm-12' name='EmailTo' type='email'
                                    onChange={() => {
                                        setshowError(null)
                                    }}
                                    innerRef={register({ required: true })}
                                    invalid={errors.EmailTo && true}
                                    placeholder='email' autoFocus />
                                {errors && errors.EmailTo && <FormFeedback>{errors.EmailTo.message}</FormFeedback>}
                                {showError && <span style={{ color: '#ea5455', width: '100%', fontSize: '0.857rem' }}>{showError}</span>}
                            </FormGroup>
                            <Button.Ripple color='primary' block type='submit' className ='mt-2'>
                                Submit
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>                         
                            <a className='text-primary' href='#'>   <ChevronLeft className='mr-25' size={14} /><span className='align-middle' onClick={() => props.setcview(1) }>Back to login</span></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ConfirmEmail