// import { Link } from 'react-router-dom'
/*eslint-disable */
import { useState, useContext, Fragment, useRef } from 'react'
import { AbilityContext } from '@src/utility/context/Can'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import { validateAdminLogin, validateLogin } from './store/action'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import Avatar from '@components/avatar'
import { toast, Slide } from 'react-toastify'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, Coffee } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import DeviceDetector from "device-detector-js"
import axios from 'axios'
import { N_Loader, R_Loader } from '../../views/loader/loader'   /*abhishek new */

import {storedata, delete_cookie, setCookie, getCookie} from './utility'

const LoginV1 = () => {
  const LoginCookieName = 'padmin'
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
    const [userName, setEmail] = useState('')
  const [password, setPassword] = useState('')

  window.rem = useRef(null)
    const Swal = require('sweetalert2')
    const { register, errors, handleSubmit } = useForm()
    const [isLoader, setLoader] = useState(false)
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    const [disabled, setDisabled] = useState(false)
    const loaderRef = useRef(null)
    const logindiv = useRef(null)

  const ToastContent = ({ name, role }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
          <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>You have successfully logged in as an {role} user to Design Archive. Now you can start to explore. Enjoy!</span>
      </div>
    </Fragment>
  )
    const get = () => {
        var e = document.createElement("canvas"),
            t = e.getContext("2d"),
            r = "Textronic Design System";
        (t.textBaseline = "top"),
            (t.font = "14px 'Arial'"),
            (t.textBaseline = "alphabetic"),
            (t.fillStyle = "#f60"),
            t.fillRect(125, 1, 62, 20),
            (t.fillStyle = "#069"),
            t.fillText(r, 2, 15),
            (t.fillStyle = "rgba(102, 204, 0, 0.7)"),
            t.fillText(r, 4, 17);
        var n = e.toDataURL().replace("data:image/png;base64,", "");
        return (function (e) {
            for (var t, r = [], n = 0; n < 256; n++) {
                t = n;
                for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
                r[n] = t;
            }
            for (var o = -1, a = 0; a < e.length; a++) o = (o >>> 8) ^ r[255 & (o ^ e.charCodeAt(a))];
            return (-1 ^ o) >>> 0;
        })(atob(n).slice(-16, -12))
            .toString(16)
            .toUpperCase();
    }
    const showloader = () => {
      loaderRef.current.style.display = 'block'
      //logindiv.current.style.display = 'none'
  }


    const hideloader = () => {
      loaderRef.current.style.display = 'none'
      logindiv.current.style.display = ''
    }
    const onSubmit = data => {
        const deviceDetector = new DeviceDetector()
        const userAgent = navigator.userAgent
        const device = deviceDetector.parse(userAgent)

        const _LoginUsersDto = new Object()
        const DeviceDeatils = new Object()
        const DPIDetailsDto = new Object()
        const username = data['login-email']
        const password = data['login-password']
        _LoginUsersDto.username = username
        _LoginUsersDto.password = password
        DeviceDeatils.Device_Login_Id = get()
        DeviceDeatils.Device_Browser = device.client.name
        DeviceDeatils.Device_Type = device.device.type
        DeviceDeatils.Os_Name = device.os.name
        DeviceDeatils.user_id = 0
        //device details 
        DPIDetailsDto.Screen_X_Resolution = screen.width
        DPIDetailsDto.Screen_Y_Resolution = screen.height
        DPIDetailsDto.Screen_X_DPI = 100
        DPIDetailsDto.Screen_Y_DPI = 100

        DPIDetailsDto.Device_Fingure_Print_Id = DeviceDeatils.Device_Login_Id

        _LoginUsersDto.fingureprint = DeviceDeatils
        _LoginUsersDto.saveDeviceDetailsRequestDto = DPIDetailsDto


        setLoader(true)     
        // setDisabled(true)
        if (isObjEmpty(errors)) {
            showloader() 
            validateAdminLogin(_LoginUsersDto).then(res => {             
            if(res.isLogin){
              sessionStorage.setItem("login", "true")
                ability.update(res.ability)
              dispatch(handleLogin(res))

              if (rem.current?.checked) {
                storedata(userName, password, LoginCookieName)
              }
              toast.success(
                <ToastContent name={res.userName} role={res.role || 'admin'} />,
                 {transition: Slide,
                  hideProgressBar: true,
                  autoClose: 2000})

                  // history.push('/dashboard')
                  history.push('/threed')
                 
            } else if (res.loginMessage) {
                    Swal.fire({
                        title: 'User is already login,Do you want to continue?',
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: 'Yes',
                        denyButtonText: 'No',
                        customClass: {
                            actions: 'my-actions',
                            cancelButton: 'order-1 right-gap',
                            confirmButton: 'order-2',
                            denyButton: 'order-3',
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.get(`./Login/LogOutOtherUserAdmin`).then(e => {
                               //JSON.parse(e.data).message
                              //Swal.fire(JSON.parse(e.data).message, '', 'success')
                            
                              validateAdminLogin(_LoginUsersDto).then(res => {
                                hideloader()
                                sessionStorage.setItem("login", "true")
                                ability.update(res.ability)
                                dispatch(handleLogin(res))
                  
                                toast.success(
                                  <ToastContent name={res.userName} role={res.role || 'admin'} />,
                                   {transition: Slide,
                                    hideProgressBar: true,
                                    autoClose: 2000})
                  
                                    // history.push('/dashboard')
                                    history.push('/threed')
                              })
                            })
                        } else if (result.isDenied) { 
                          //! Do nothing 
                        }
                    })
                  }else if (res.message) {
                    Swal.fire({
                     // icon: 'error',
                      title: 'Login',
                      text: res.message
                  })
                  hideloader()
              } else {
                Swal.fire({
                        icon: 'error',
                        title: 'Login',
                        text: "Something went Wrong... Please Check API Connection .."
                    })
                }
                // setDisabled(false)
                // setLoader(false)     
        })
            .catch(err => {
                console.log(err)
                // setDisabled(false)
                // setLoader(false)
                hideloader()
            })
    }
  }
    return (
        <>
            {/*<N_Loader show={isLoader}>
            </ N_Loader> */}
                <R_Loader loaderRef={loaderRef}  />
    <div className='auth-wrapper auth-v1 px-2' ref={logindiv}>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img className="Header-logo" src="../../textronic_logo.png" alt="Logo" />
              <h2 className='brand-text text-primary ml-1' style={{ padding: "15px" }}>Textronics</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Welcome to Design Archive! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  User Name
                </Label>
                <Input 
                  autoFocus
                  type='text'
                  value={userName}
                  id='login-email'
                  tabindex='1'
                  name='login-email'
                  placeholder='username'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  
                    {/* <Link to='/forgotPassword'>
                      <small>Forgot Password?</small>
                    </Link> */}
                  
                </div>
                <InputPasswordToggle
                  value={password}
                  tabindex='2'
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                 // className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                {/* <CustomInput innerRef={rem} type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' defaultChecked={getCookie(LoginCookieName) ? true : false} /> */}
                      </FormGroup>
                                <Button.Ripple disabled={disabled} type='submit' color='primary' block> Sign in </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
            </div>
        
        </>
  )
}

export default LoginV1