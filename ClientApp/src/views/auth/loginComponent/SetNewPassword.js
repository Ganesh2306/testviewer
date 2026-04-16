
import { ChevronLeft } from 'react-feather'

import { CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

const SetNewPassword = (props) => {
    return (
        <div className='d-flex align-items-center auth-bg auth-viewer'>
            <div className='mx-auto text-xl-center'>
                <img className="login-logo-viewer text-lg-center mb-1"  src="https://d3bhyz9dg77mce.cloudfront.net/dam/archive/images/archive-logo.png"  alt="Logo" />
                <CardTitle tag='h3' className='font-weight-bold mb-1 text-lg-left login-header'>
                    Forgot Password?
                </CardTitle>
                <CardText className='mb-2 text-lg-left'>
                     Enter the Single Time Password sent to your registered Email
                </CardText>
                <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
                    <FormGroup className='text-lg-left'>
                        <div className="d-flex justify-content-between">
                            <Label className='form-label error' for='login-email'>
                                Enter OTP
                            </Label>                         
                        </div>
                        <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />
                        <small className='msg-error mt-1'>You have entered a wrong code. Please try again</small>
                    </FormGroup>
                    <Button.Ripple color='primary' block onClick={() => { props.setcview(4) }}>
                        Submit
                    </Button.Ripple>
                </Form>
                <p className='text-center mt-2'>
                    <ChevronLeft className='mr-25' size={14} />
                    <span className='align-middle' onClick={() => { props.setcview(1) }}>Back to login</span>
                </p>
            </div>
        </div>
    )
}
export default SetNewPassword