import classnames from 'classnames'
import InputPasswordToggle from '@components/input-password-toggle'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

const LoginView = (props) => {
    const history = useHistory()
      const [username, setEmail] = useState()
      const [password, setPassword] = useState()
      const [isfocus, setisFocus] = useState()
  
    return (
      <>
           <section class="top-options__picker">
        <div class="top-options__text active_line">SIGN IN TEXTRONIC</div>
        <div class="top-options__text" style={{display: 'none'}}>REGISTER</div>
        </section>
        <div className='auth-bg auth-viewer text-center'>          
            {/* <CardTitle tag='h5' className='font-weight-bold mb-1 text-lg-center login-header'>
                Welcome to Design Archive!
              </CardTitle>          */}
           <Form className='auth-login-form' onSubmit={props.handleSubmit(props.onSubmit)}autoComplete="new-password">
              <FormGroup className={isfocus ? 'parentActive text-left' : 'parent text-left'} >
                <div className='form-label placeholder'>Username</div>
                <small className={classnames({ 'is-invalid': props.errors['login-email'] })} style ={{ display : props.errors['login-email'] ? 'inline' : 'none'}}>Please enter a valid email address</small>
                   <Input
                  tabIndex='1'  
                  autoComplete="new-password"
                  type='text'
                  value={props.email}
                  id='login-email'
                  name='login-email'
                   placeholder='Username'
                  onFocus ={() => setisFocus(true)}
                  onBlur ={() => setisFocus(false)}
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': props.errors['login-email'] })}
                  innerRef={props.register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup className={isfocus ? 'parentActive text-left' : 'parent text-left'}  >
                <div className='d-flex justify-content-between'>
                 <div className='form-label placeholder'>Password</div>                           
                </div>
                <small className={classnames({ 'is-invalid': props.errors['login-password'] })} style ={{ display : props.errors['login-email'] ? 'inline' : 'none'}}>Please enter your password</small>
                    <InputPasswordToggle
                   tabIndex='2'            
                  value={props.password}
                  id='login-password'
                  name='login-password'
                  placeholder='Password'          
                  onFocus ={() => setisFocus(true)}
                  onBlur ={() => setisFocus(false)}
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': props.errors['login-password'] })}
                  
                  innerRef={props.register({ required: true, validate: value => value !== '' })}
                />
                
              </FormGroup>
                <Button.Ripple disabled={props.disabled} type='submit' color='primary' block className='rounded-0 mt-2 mb-1' tabIndex='3'>
                 <h6 className='text-white mb-0'>SIGN IN</h6>
              </Button.Ripple>
            </Form>
                  
                  {/* <div className='my-2'>
                    <small className='login-forgotpass' onClick={() => props.setcview(2)}>Forgot your <a href ="#" className='text-primary'>username</a> or <a href ="#"  className='text-primary'>password</a>?</small>
                  </div> */}
            <p className='text-center mt-2'>
              <span className='mr-25' style={{display: 'none'}}>New To Design Archive ?</span>
              <Link to='plan'>
              <span style={{display: 'none'}} >Register Now!</span>
              </Link>              
            </p> 
        </div>
        </>
    )
  }

  export default LoginView