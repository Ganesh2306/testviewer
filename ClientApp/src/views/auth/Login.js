/*eslint-disable */
// <reference path="../../utility/context/can.js" />
// import { Link } from 'react-router-dom'
import { useState, useContext, useEffect, Fragment, useRef } from 'react'
import { AbilityContext } from '@src/utility/context/Can'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import { validateLogin } from './store/action'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import Avatar from '@components/avatar'
import { toast, Slide } from 'react-toastify'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, Coffee } from 'react-feather'
import { ShowLoader } from '../../redux/actions/loader/index'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { N_Loader, R_Loader } from '../../views/loader/loader'   
import ThankuRecoverPw from './loginComponent/ThankuRecoverPw'
import ConfirmEmail from './loginComponent/ConfirmEmail'
import ForgetView from './loginComponent/ForgetView'
import archivelogo from './img/design_archive_logo.png'
import axios from 'axios'
import { ProfileContext } from "../context/ProfileContext"
import DeviceDetector from "device-detector-js"

const LoginV1 = ({ setshow, setUserName }) => {
    const [skin, setSkin] = useSkin()
    const LoginCookieName = 'Login'
    // ** Create Context
    //const AbilityContext = createContext()

    // ** Init Can Context
    // const Can = createContextualCan(AbilityContext.Consumer)
    const { ctxprofile, setctxProfile } = useContext(ProfileContext)
    const ability = useContext(AbilityContext)
    const dispatch = useDispatch()
    const history = useHistory()
    const [userName, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoader, setLoader] = useState(false)  /* abhishek new*/
    const Swal = require('sweetalert2')
    const { register, errors, handleSubmit } = useForm()
    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    const loaderRef = useRef(null)
    const logindiv = useRef(null)
    const [saastoken, setsaastoken] = useState(null)
    const [issaasuser, setsaasuser] = useState(0)
    const ToastContent = ({ name, role }) => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
                    <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
                </div>
            </div>
            <div className='toastify-body'>
                <span>You have successfully logged in as an {role} to Design Archive. Now you can start to explore. Enjoy!</span>
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
        //dispatch(ShowLoader(true))
        const deviceDetector = new DeviceDetector()
        const userAgent = navigator.userAgent
        const device = deviceDetector.parse(userAgent)


        setLoader(true)      //abhishek new
        if (isObjEmpty(errors)) {
            showloader()
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

            validateLogin(_LoginUsersDto)
                .then(async res => {
                    hideloader()
                    if (res.isLogin) {
                        //if (res !== null && res.message !== null && res.message !== undefined && res.message === "") {
                        document.cookie = 'shareData=' + JSON.stringify(res)
                        document.cookie = 'deviceData=' + JSON.stringify(res.dd)

                        localStorage.setItem('shareData', JSON.stringify(res));
                        localStorage.setItem('deviceData', JSON.stringify(res.dd))

                        await axios.post(`./Login/GetEditOrgUser`).then(res => {
                            localStorage.setItem("profile", JSON.stringify(res.data))
                            setctxProfile(res.data)
                        })
                        //    localStorage.setItem('userData', res)
                        //saas working
                        //if(user_type === 0)=> not_saas_user
                        //if(user_type === 1)=> saas_org
                        //if(user_type === 2)=> saas_trial_user
                        if (JSON.parse(localStorage.profile).user_type !== 0) {
                            let saasApiUrl = "http://CheckAppSeeting"
                            try {
                                const res = await axios.get("./Login/Getsaasapi")
                                if (res?.data) {
                                    saasApiUrl = res.data
                                    localStorage.setItem("saasapi", res.data)
                                }
                            } catch (err) {
                                console.error("Error fetching SaaS API URL:", err)
                            }
                            try {
                                const saasobj = {
                                    //email: JSON.parse(localStorage.profile).org_email,
                                    organisation_id: String(JSON.parse(localStorage.profile).org_id)
                                }
                                if (JSON.parse(localStorage.profile).user_type === 1) {
                                    saasobj.email = JSON.parse(localStorage.profile).org_email
                                } else {
                                    saasobj.email = JSON.parse(localStorage.profile).login_id
                                }
                                const getsaastoken = await axios.post(`${saasApiUrl}get-token`, saasobj, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                })
                                console.log(getsaastoken.data.api_token)
                                if (getsaastoken.data.api_token) {
                                    setsaastoken(getsaastoken.data.api_token)
                                    saasobj.api_token = getsaastoken.data.api_token
                                    const getcredits = await axios.post(`${saasApiUrl}check-subscription`, saasobj, {
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    })
                                    if (getcredits.data !== null) {
                                        setsaasuser(getcredits.data.status)
                                        localStorage.setItem("saasuser", (getcredits.data.status))
                                    }
                                } else {
                                    setsaastoken(null)
                                }
                            } catch (error) {
                                console.error("Error fetching SaaS token:", error)
                                setsaastoken(null)
                            }
                        }

                        //end saas working
                        if (localStorage?.saasuser === 'active') {
                            sessionStorage.setItem("login", "true")
                            let role = res.role
                            if (res.role !== "PlatformAdmin") {
                                switch (res.org_type) {
                                    case 1:
                                        role = 'Organisation'
                                        break
                                    case 2:
                                        role = 'Supplier'
                                        break
                                    case 3:
                                        role = 'Customer'
                                        break
                                    case 4:
                                        role = 'Agent'
                                        break
                                    default:
                                        break
                                }
                                if (res.is_administrator) {

                                    role = `${role} Admin`
                                } else {
                                    role = `${role} User`
                                }
                            }
                            dispatch(handleLogin(res))
                            ability.update(res.ability)
                            //if (["Organisation Admin", "PlatformAdmin", "Organisation User"].includes(role)){   // for login page 03-05-2023
                            if (["Organisation Admin", "PlatformAdmin"].includes(role)) {
                                history.push('/threed')
                                // history.push('/dashboard')
                            } else {
                                history.push('/design')
                            }
                            toast.success(
                                <ToastContent name={res.userName} role={role || 'admin'} />,
                                { transition: Slide, hideProgressBar: true, autoClose: 2000 })
                        } else if (localStorage?.saasuser === 'inactive') {
                            Swal.fire({
                                icon: 'Error',
                                text: 'Subscription expired , please renew & activate.',
                                allowOutsideClick: false,
                                backdrop: true
                            })
                        } else {
                            sessionStorage.setItem("login", "true")
                            let role = res.role
                            if (res.role !== "PlatformAdmin") {
                                switch (res.org_type) {
                                    case 1:
                                        role = 'Organisation'
                                        break
                                    case 2:
                                        role = 'Supplier'
                                        break
                                    case 3:
                                        role = 'Customer'
                                        break
                                    case 4:
                                        role = 'Agent'
                                        break
                                    default:
                                        break
                                }
                                if (res.is_administrator) {

                                    role = `${role} Admin`
                                } else {
                                    role = `${role} User`
                                }
                            }
                            dispatch(handleLogin(res))
                            ability.update(res.ability)
                            //if (["Organisation Admin", "PlatformAdmin", "Organisation User"].includes(role)){   // for login page 03-05-2023
                            if (["Organisation Admin", "PlatformAdmin"].includes(role)) {
                                history.push('/threed')
                                // history.push('/dashboard')
                            } else {
                                history.push('/design')
                            }
                            toast.success(
                                <ToastContent name={res.userName} role={role || 'admin'} />,
                                { transition: Slide, hideProgressBar: true, autoClose: 2000 })
                        }
                    } else {
                        if (res === null) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Login',
                                text: "Fail to login, please check server connectivity"
                            })
                        } else if (res.message !== null) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Login',
                                text: res ? res.message : "some thing went wrong"
                            })
                        } else if (res.loginMessage !== undefined) {
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
                                    axios.get(`./Login/LogOutOtherUser`).then(e => {
                                        validateLogin(_LoginUsersDto).then(async res => {
                                            document.cookie = 'shareData=' + JSON.stringify(res);
                                            document.cookie = 'deviceData=' + JSON.stringify(res.dd);

                                            localStorage.setItem('shareData', JSON.stringify(res));
                                            localStorage.setItem('deviceData', JSON.stringify(res.dd));

                                            await axios.post(`./Login/GetEditOrgUser`).then(res => {
                                                localStorage.setItem("profile", JSON.stringify(res.data))
                                                setctxProfile(res.data)
                                            })
                                            //    localStorage.setItem('userData', res)
                                            //saas working
                                            if (JSON.parse(localStorage.profile).user_type !== 0) {
                                                try {
                                                    let saasApiUrl = "http://CheckAppSeeting"
                                                    try {
                                                        const res = await axios.get("./Login/Getsaasapi")
                                                        if (res?.data) {
                                                            saasApiUrl = res.data
                                                            localStorage.setItem("saasapi", res.data)
                                                        }
                                                    } catch (err) {
                                                        console.error("Error fetching SaaS API URL:", err)
                                                    }
                                                    const saasobj = {
                                                        //email: JSON.parse(localStorage.profile).org_email,
                                                        organisation_id: String(JSON.parse(localStorage.profile).org_id)
                                                    }
                                                    if (JSON.parse(localStorage.profile).user_type === 1) {
                                                        saasobj.email = JSON.parse(localStorage.profile).org_email
                                                    } else {
                                                        saasobj.email = JSON.parse(localStorage.profile).login_id
                                                    }
                                                    const getsaastoken = await axios.post(`${saasApiUrl}get-token`, saasobj, {
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        }
                                                    })
                                                    console.log(getsaastoken.data.api_token)
                                                    if (getsaastoken.data.api_token) {
                                                        setsaastoken(getsaastoken.data.api_token)
                                                        saasobj.api_token = getsaastoken.data.api_token
                                                        const getcredits = await axios.post(`${saasApiUrl}check-subscription`, saasobj, {
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            }
                                                        })
                                                        if (getcredits.data !== null) {
                                                            setsaasuser(getcredits.data.status)
                                                            localStorage.setItem("saasuser", (getcredits.data.status))
                                                        }
                                                    } else {
                                                        setsaastoken(null)
                                                    }
                                                } catch (error) {
                                                    console.error("Error fetching SaaS token:", error)
                                                    setsaastoken(null)
                                                }
                                            }

                                            //end saas working
                                            if (localStorage.saasuser === 'active') {
                                                sessionStorage.setItem("login", "true")
                                                let role = res.role
                                                if (res.role !== "PlatformAdmin") {
                                                    switch (res.org_type) {
                                                        case 1:
                                                            role = 'Organisation'
                                                            break
                                                        case 2:
                                                            role = 'Supplier'
                                                            break
                                                        case 3:
                                                            role = 'Customer'
                                                            break
                                                        case 4:
                                                            role = 'Agent'
                                                            break
                                                        default:
                                                            break
                                                    }
                                                    if (res.is_administrator) {

                                                        role = `${role} Admin`
                                                    } else {
                                                        role = `${role} User`
                                                    }
                                                }
                                                dispatch(handleLogin(res))
                                                ability.update(res.ability)
                                                // if (["Organisation Admin", "PlatformAdmin", "Organisation User"].includes(role)){   // for login page 03-05-2023 // Updated
                                                if (["Organisation Admin", "PlatformAdmin"].includes(role)) {
                                                    history.push('/threed')
                                                    // history.push('/dashboard')
                                                } else {
                                                    history.push('/design')
                                                }
                                                toast.success(
                                                    <ToastContent name={res.userName} role={role || 'admin'} />,
                                                    { transition: Slide, hideProgressBar: true, autoClose: 2000 })
                                            } else if (localStorage.saasuser === 'inactive') {
                                                Swal.fire({
                                                    icon: 'Error',
                                                    text: 'Subscription expired , please renew & activate.',
                                                    allowOutsideClick: false,
                                                    backdrop: true
                                                })
                                            } else {
                                                sessionStorage.setItem("login", "true")
                                                let role = res.role
                                                if (res.role !== "PlatformAdmin") {
                                                    switch (res.org_type) {
                                                        case 1:
                                                            role = 'Organisation'
                                                            break
                                                        case 2:
                                                            role = 'Supplier'
                                                            break
                                                        case 3:
                                                            role = 'Customer'
                                                            break
                                                        case 4:
                                                            role = 'Agent'
                                                            break
                                                        default:
                                                            break
                                                    }
                                                    if (res.is_administrator) {

                                                        role = `${role} Admin`
                                                    } else {
                                                        role = `${role} User`
                                                    }
                                                }
                                                dispatch(handleLogin(res))
                                                ability.update(res.ability)
                                                //if (["Organisation Admin", "PlatformAdmin", "Organisation User"].includes(role)){   // for login page 03-05-2023
                                                if (["Organisation Admin", "PlatformAdmin"].includes(role)) {
                                                    history.push('/threed')
                                                    // history.push('/dashboard')
                                                } else {
                                                    history.push('/design')
                                                }
                                                toast.success(
                                                    <ToastContent name={res.userName} role={role || 'admin'} />,
                                                    { transition: Slide, hideProgressBar: true, autoClose: 2000 })
                                            }
                                        })

                                        /*Swal.fire(JSON.parse(e.data).message, '', 'success')*/
                                    })


                                } else if (result.isDenied) {

                                }
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Login',
                                text: "Something went Wrong... Please Check API Connection .."
                            })
                        }
                    }
                    //setLoader(false)  //abhishek 21/03
                })
                .catch(err => {
                    console.log(err)
                    hideloader()
                })
        }
    }
    return (
        <>
            <R_Loader loaderRef={loaderRef} />

            <div className='auth-wrapper auth-v1 px-2' ref={logindiv} >
                <div className='auth-inner py-2'>
                    <Card className='mb-0'>
                        <CardBody>
                            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                                <img className="Header-logo" src={archivelogo} alt="Logo" />

                            </Link>
                            <CardTitle tag='h4' className='mb-1'>
                                Welcome to Design Archive! 👋
                            </CardTitle>
                            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
                            <Form className='auth-login-form mt-2' autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                    <Label className='form-label' for='login-email'>
                                        User Name
                                    </Label>
                                    <Input autoComplete='off'       // abhishek 14 02
                                        autoFocus
                                        tabindex='1'
                                        type='text'
                                        value={userName}
                                        id='login-email'
                                        name='login-email'
                                        placeholder='username'
                                        onChange={e => {
                                            setEmail(e.target.value)
                                            setUserName(e.target.value)
                                        }}
                                        className={classnames({ 'is-invalid': errors['login-email'] })}
                                        innerRef={register({ required: true, validate: value => value !== '' })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <div className='d-flex justify-content-between'>
                                        <Label className='form-label' for='login-password' >
                                            Password
                                        </Label>
                                        <Link>
                                            <small onClick={() => setshow(1)}>Forgot Password?</small>
                                        </Link>
                                    </div>
                                    <InputPasswordToggle
                                        value={password}
                                        tabindex='2'
                                        id='login-password'
                                        name='login-password'
                                        className='input-group-merge'
                                        autocomplete="off"
                                        onChange={e => setPassword(e.target.value)}
                                        //className={classnames({ 'is-invalid': errors['login-password'] })}
                                        innerRef={register({ required: true, validate: value => value !== '' })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    {/* <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' tabindex='3' defaultChecked={getCookie(LoginCookieName) ? true : false} /> */}
                                </FormGroup>
                                <Button.Ripple type='submit' color='primary' block>
                                    Sign in
                                </Button.Ripple>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    )
}

const Switch = () => {
    const [show, setshow] = useState(0)
    const [username, setUserName] = useState(null)
    if (show === 0) {
        return <LoginV1 setshow={setshow} setUserName={setUserName} />
    } else if (show === 1) {
        return <ConfirmEmail username={username} setshow={setshow} />
    } else if (show === 2) {
        return <ForgetView setshow={setshow} />
    } else if (show === 3) {
        return <ThankuRecoverPw setshow={setshow} />
    }
}

export default Switch