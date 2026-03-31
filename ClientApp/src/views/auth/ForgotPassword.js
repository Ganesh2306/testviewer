import { Link } from 'react-router-dom'
import { ChevronLeft, Check} from 'react-feather'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

const ForgotPasswordV1 = () => {
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            
              <img className="Header-logo" src="../../textronic_logo.png" alt="Logo" />
              <h2 className='brand-text text-primary ml-1' style={{ padding: "15px" }}>Textronics</h2>
            </Link>
                      <CardTitle tag='h3' className='font-weight-bold mb-1 text-lg-left login-header'>
                          Forgot Password?
                      </CardTitle>
                      <CardText className='mb-2 text-lg-left'>
                          Enter Your registerd Email
                      </CardText>

                      <Form className='auth-forgot-password-form mt-2 mb-2' onSubmit={e => e.preventDefault()}>
                          <FormGroup className='text-lg-left'>
                              <div className="d-flex justify-content-between position-relative">
                                  <Input className='col-sm-12' type='email' id='' placeholder='Please enter email' autoFocus />
                                  <div className="checkcircle" style={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }}>

                                      <Check
                                          style={{ color: "#05cc30" }}
                                          fontSize="default"
                                      ></Check>
                                  </div>

                              </div>
                              <small className='msg-error mt-1'>Please enter a valid email address</small>
                          </FormGroup>
                          <Button.Ripple color='primary' block onClick={() => { props.setcview(3) }}>
                              Submit
                          </Button.Ripple>
                      </Form>
            {/*<Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>*/}
            {/*  <FormGroup>*/}
            {/*    <Label className='form-label' for='login-email'>*/}
            {/*      Email*/}
            {/*    </Label>*/}
            {/*    <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />*/}
            {/*  </FormGroup>*/}
            {/*  <Button.Ripple color='primary' block>*/}
            {/*    Send reset link*/}
            {/*  </Button.Ripple>*/}
            {/*</Form>*/}
            <p className='text-center mt-2'>
              <Link to='/login'>
                <ChevronLeft className='mr-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPasswordV1
