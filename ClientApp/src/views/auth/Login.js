
/*eslint-disable */
import { useState, useContext, Fragment, Suspense } from 'react'
import { useSkin } from '@hooks/useSkin'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { AbilityContext } from '@src/utility/context/Can'
import { loginContext } from '@src/utility/context/LoginUserData'
import { isObjEmpty } from '@utils'
import { validateLogin } from './store/action'
import Avatar from '@components/avatar'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { Coffee } from 'react-feather'
import { useHistory } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import '../../views/auth/login-style.css'
import ConfirmEmail from './loginComponent/ConfirmEmail'
import LoginView from './loginComponent/LoginView'
import ForgetView from './loginComponent/ForgetView'
import ThankuRecoverPw from './loginComponent/ThankuRecoverPw'
import axios from 'axios'
import DeviceDetector from "device-detector-js"
import { ProfileContext } from "../context/profileContext"
import { accessContext } from "../context/accessContext";
import { getCollectionList, sendrq } from "../../utility/_boardutils/utils"

export const LoginUserData = {
    who: null,
    data: null
}

export const info = {
    orgid: null
}

const SwitchingComponent = (props) => {

    if (props.showView === 1) {
        return <LoginView
            onSubmit={props.onSubmit}
            setDisabled={props.setDisabled}
            disabled={props.disabled}
            handleSubmit={props.handleSubmit}
            register={props.register}
            errors={props.errors}
            setcview={props.setcview}
        />
    } else if (props.showView === 2) {
        return <ConfirmEmail setemail={props.setemail} setcview={props.setcview} />
    } else if (props.showView === 3) {
        return <ForgetView setforget={props.setforget} setcview={props.setcview} />
    } else if (props.showView === 4) {
        return <ThankuRecoverPw setrecover={props.setrecover} setcview={props.setcview} />
    }
}

const FilterData = (data) => {

    let b = {}
    data.forEach((e) => {
        let f = {}
        e.getOperationIdOperationNameRoleTaskIdResponseDtos.forEach((t) => {
            f[t.operation_Id] = true

        })
        b[e.task_Id] = f
    })
    return b
}
const LoginV2 = () => {
    const ability = useContext(AbilityContext)
    const { setloginData } = useContext(loginContext)
    const { setctxProfile } = useContext(ProfileContext)
    const { setaccess, setboard, setis_boarduser, setlgnuser, setorgtype, setlgncust, setSelectesUser, setSelectesUseraccess, access } = useContext(accessContext)

    const dispatch = useDispatch()
    const history = useHistory()

    const [recover, setrecover] = useState(true)
    const [forget, setforget] = useState(true)
    const [email, setemail] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const Swal = require('sweetalert2')
    const { register, errors, handleSubmit } = useForm()
    const [skin, setSkin] = useSkin()

    const [cview, setcview] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

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

    const onSubmit = (data) => {

        setDisabled(true)
        setIsLoading(true)

        const deviceDetector = new DeviceDetector()
        const userAgent = navigator.userAgent
        const device = deviceDetector.parse(userAgent)

        if (isObjEmpty(errors)) {
            const _LoginUsersDto = new Object()
            const DeviceDeatils = new Object()
            const DPIDetailsDto = new Object()
            const username = data['login-email']
            const password = data['login-password']
             const GoogleToken = '0'
            const product = 'archive'
            _LoginUsersDto.username = username
            _LoginUsersDto.password = password
            _LoginUsersDto.googletoken = GoogleToken
            _LoginUsersDto.product = product
            DeviceDeatils.Device_Login_Id = get()
            DeviceDeatils.Device_Browser = device.client.name
            DeviceDeatils.Device_Type = device.device.type
            DeviceDeatils.Os_Name = device.os.name
            DPIDetailsDto.Screen_X_Resolution = screen.width
            DPIDetailsDto.Screen_Y_Resolution = screen.height
            DPIDetailsDto.Screen_X_DPI = 100
            DPIDetailsDto.Screen_Y_DPI = 100

            DPIDetailsDto.Device_Fingure_Print_Id = DeviceDeatils.Device_Login_Id

            _LoginUsersDto.fingureprint = DeviceDeatils
            _LoginUsersDto.saveDeviceDetailsRequestDto = DPIDetailsDto
            let rl = null
            validateLogin(_LoginUsersDto)
                .then(async res => {
                    setDisabled(false)
                    setIsLoading(true)
                    setlgnuser(res.supplier?.supplierListDto ? res.supplier?.supplierListDto : "")
                    setlgncust(res.customerList?.customerListDto ? res.customerList?.customerListDto : "")
                    setorgtype(res.org_type)
                    if (res !== null && res.message === "") {
                        let isRedirectBrandPg = res.supplier && !(res.supplier?.supplierListDto[0]?.customer_Name) && res.supplier?.totalRecords <= 1
                        axios.get(`./Login/GetEditOrgUser`).then(e => {
                            axios.get(`./DesignSearch/RoleAccessToElement`).then(async eee => {
                                const ft = FilterData(JSON.parse(eee.data).allDetails)
                                localStorage.setItem("accessinfo", JSON.stringify(ft)) 
                                setaccess(ft)
                                sessionStorage.setItem("login", "true")
                                if (!res.is_otherlogin) {
                                    let role = res.role
                                    localStorage.setItem('DeviceDetailsDto', JSON.stringify(res.dd))
                                    const pattern1 = /Supplier/g
                                    if (res.role !== "PlatformAdmin") {
                                        switch (res.org_type) {
                                            case 1:
                                                role = 'Organisation'
                                                break
                                            case 2:
                                                role = 'Supplier'
                                                rl = [`customerList`, `customerListDto`]
                                                setis_boarduser(pattern1.test(role))
                                                await getCollectionList(setboard)
                                                break
                                            case 3:
                                                role = 'Customer'
                                                rl = [`supplier`, `supplierListDto`]

                                                setis_boarduser(pattern1.test(role))
                                                await sendrq(setboard, res)
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

                                    try {
                                        const userData = res[rl[0]][rl[1]][0]
                                        const id = userData.customer_id === undefined ? userData.supplier_id : userData.customer_id
                                        const name = userData.customer_Name === undefined ? userData.sup_name : userData.customer_Name
                                        localStorage.setItem('loginuserdata', JSON.stringify(res[rl[0]][rl[1]]))
                                        localStorage.setItem('who', role)
                                        localStorage.setItem('id', id)
                                        localStorage.setItem('name', name)
                                        localStorage.setItem("userName", res.userName)
                                        localStorage.setItem("orgtype", res.org_type)
                                        if (role === "Customer Admin" || role === "Customer User") {
                                            localStorage.setItem('Supcount', res.supplier.totalRecords)
                                        } else if (role === 'Supplier Admin') {
                                            localStorage.setItem('Supcount', res.customerList.totalRecords + 1)
                                        }                                      
                                        const obj = {
                                            value: userData.supplier_id ? userData.supplier_id : userData.customer_id,
                                            label: userData.sup_name ? userData.sup_name : userData.customer_Name,
                                            role: userData.roleid ? userData.roleid : userData.role_Id,
                                            user_id: userData.user_id ? userData.user_id : userData.user_id,
                                            cus_orgtypeId: res.org_type_id ? res.org_type_id : 0,
                                            cus_supplierId: userData.supplier_id ? userData.supplier_id : userData.customer_id
                                        }
                                        localStorage.setItem('selecteduser', JSON.stringify(obj))
                                        const RoleId = obj.role
                                        if (RoleId !== 0 && RoleId !== undefined && RoleId !== null) {
                                            const accessResponse = await axios.get(`./DesignSearch/RoleAccessToElement?RoleId=${RoleId}`)
                                            const ft = FilterData(JSON.parse(accessResponse.data).allDetails)
                                            localStorage.setItem("selecteduseraccessinfo", JSON.stringify(ft))
                                            // localStorage.setItem('warehouse', 'All')
                                               localStorage.setItem('warehouse', "All,Stock,Noos,Sample")
                                            setSelectesUseraccess(ft)
                                        }

                                        setSelectesUser(obj);
                                        const newAccess = JSON.parse(localStorage.getItem('accessinfo'))
                                        if (typeof newAccess !== undefined && typeof newAccess !== null) {
                                            if (newAccess[111119][244449] || access[111119][244449]) {
                                                history.push('/design')
                                            } else {
                                                history.push('/SupplierList')
                                            }
                                        } else {

                                            JSON.parse(localStorage.userData).customerList.customerListDto.length === 0 ?  history.push('/design') :  history.push('/SupplierList')
                                            localStorage.setItem('warehouse', "All,Stock,Noos,Sample")
                                        }
                                    } catch (error) {
                                      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
                                      const customerList = userData.customerList
                                     !customerList || !Array.isArray(customerList.customerListDto) || customerList.customerListDto.length === 0 ?  history.push('/design') :  history.push('/SupplierList')
                                      localStorage.setItem('warehouse', "All,Stock,Noos,Sample")
                                    }

                                    toast.success(
                                        <ToastContent name={res.userName} role={role || 'admin'} />,
                                        { transition: Slide, hideProgressBar: true, autoClose: 2000 })
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Login',
                                        text: "Only Customer and Supplier Can login.."
                                    })
                                }
                            })
                            localStorage.setItem("profile", JSON.stringify(e.data))
                            setctxProfile(e.data)

                        })

                    } else {
                        if (res === null) {

                            Swal.fire({
                                icon: 'error',
                                title: 'Login',
                                text: "Fail to login, please check server connectivity"
                            })
                        } else if (res.message !== null && res.message !== "User is already logged into another device. Do you want to log out that user ?") {
                            setIsLoading(false)
                            Swal.fire({
                                icon: 'error',
                                title: 'Login',
                                text: res ? res.message : "something went wrong"
                            })
                        }
                        else if (res.loginMessage !== undefined) {
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
                                            setDisabled(false)
                                            setIsLoading(true)
                                            setlgnuser(res.supplier?.supplierListDto ? res.supplier?.supplierListDto : "")
                                            setlgncust(res.customerList?.customerListDto ? res.customerList?.customerListDto : "")
                                            setorgtype(res.org_type)
                                            if (res !== null && res.message === "") {
                                                let isRedirectBrandPg = res.supplier && !(res.supplier?.supplierListDto[0]?.customer_Name) && res.supplier?.totalRecords <= 1 
                                                axios.get(`./Login/GetEditOrgUser`).then(async e => {
                                                    await axios.get(`./DesignSearch/RoleAccessToElement`).then(eee => {
                                                        const ft = FilterData(JSON.parse(eee.data).allDetails)
                                                        localStorage.setItem("accessinfo", JSON.stringify(ft)) 
                                                        setaccess(ft)
                                                        isRedirectBrandPg && history.push(`/BrandingPage`) 
                                                    })

                                                    localStorage.setItem("profile", JSON.stringify(e.data))
                                                    setctxProfile(e.data)
                                                })
                                                sessionStorage.setItem("login", "true")
                                                if (!res.is_otherlogin) {
                                                    let role = res.role
                                                    localStorage.setItem('DeviceDetailsDto', JSON.stringify(res.dd))
                                                    const pattern1 = /Supplier/g
                                                    if (res.role !== "PlatformAdmin") {
                                                        switch (res.org_type) {
                                                            case 1:
                                                                role = 'Organisation'
                                                                break
                                                            case 2:
                                                                role = 'Supplier'
                                                                rl = [`customerList`, `customerListDto`]
                                                                setis_boarduser(pattern1.test(role))
                                                                await getCollectionList(setboard)
                                                                break
                                                            case 3:
                                                                role = 'Customer'
                                                                rl = [`supplier`, `supplierListDto`]
                
                                                                setis_boarduser(pattern1.test(role))
                                                                await sendrq(setboard, res)
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
                
                                                    try {
                                                        const userData = res[rl[0]][rl[1]][0]
                                                        const id = userData.customer_id === undefined ? userData.supplier_id : userData.customer_id
                                                        const name = userData.customer_Name === undefined ? userData.sup_name : userData.customer_Name
                                                        localStorage.setItem('loginuserdata', JSON.stringify(res[rl[0]][rl[1]]))
                                                        localStorage.setItem('who', role)
                                                        localStorage.setItem('id', id)
                                                        localStorage.setItem('name', name)
                                                        localStorage.setItem("userName", res.userName)
                                                        localStorage.setItem("orgtype", res.org_type) 
                                                        if (role === "Customer Admin" || role === "Customer User") {
                                                            localStorage.setItem('Supcount', res.supplier.totalRecords)
                                                        } else if (role === 'Supplier Admin') {
                                                            localStorage.setItem('Supcount', res.customerList.totalRecords + 1)
                                                        }
                                                        const obj = {
                                                            value: userData.supplier_id ? userData.supplier_id : res.org_type_id,
                                                            label: userData.sup_name ? userData.sup_name : userData.customer_Name,
                                                            role: userData.roleid ? userData.roleid : userData.role_Id,
                                                            user_id: userData.user_id ? userData.user_id : userData.user_id,
                                                            cus_orgtypeId: res.org_type_id ? res.org_type_id : 0,
                                                            cus_supplierId: userData.supplier_id ? userData.supplier_id : userData.customer_id
                                                        }
                
                                                        localStorage.setItem('selecteduser', JSON.stringify(obj))
                                                        const RoleId = obj.role
                                                        if (RoleId !== 0 && RoleId !== undefined && RoleId !== null) {
                                                            const accessResponse = await axios.get(`./DesignSearch/RoleAccessToElement?RoleId=${RoleId}`)
                                                            const ft = FilterData(JSON.parse(accessResponse.data).allDetails)
                                                            localStorage.setItem("selecteduseraccessinfo", JSON.stringify(ft))
                                                            localStorage.setItem('warehouse', 'All')
                                                            setSelectesUseraccess(ft)
                                                        }
                
                                                        setSelectesUser(obj);
                                                        const newAccess = JSON.parse(localStorage.getItem('accessinfo'))
                                                        if (typeof newAccess !== undefined && typeof newAccess !== null) {
                                                            if (newAccess[111119][244449]) {
                                                                history.push('/design')
                                                            } else {
                                                                history.push('/SupplierList')
                                                            }
                                                        } else {
                
                                                            history.push('/SupplierList')
                
                                                        }
                                                    } catch (error) {
                                                        history.push('/design')
                                                    }
                
                                                    toast.success(
                                                        <ToastContent name={res.userName} role={role || 'admin'} />,
                                                        { transition: Slide, hideProgressBar: true, autoClose: 2000 })
                                                }  else {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Login',
                                                        text: "Only Customer and Supplier Can login.."
                                                    })
                                                }
                                            }
                                        })
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
                })
                .catch(err => {
                    setDisabled(false)
                    setIsLoading(false)
                    console.log(err)
                })
        }
    }
    return (
        <Suspense fallback={<div>Loading login...</div>}>
        <>    
            <div className='auth-wrapperMain'>
                <div className='left-banner'>
                    <img className="login-logo-viewer text-lg-center mb-1 hidden-xs hidden-sm" src="https://d3bhyz9dg77mce.cloudfront.net/dam/archive/images/archive-logo.png" alt="Logo" />
                    <div className='heroImage'>
                        <div className='image_cover'>
                        <img src='https://d3bhyz9dg77mce.cloudfront.net/dam/archive/images/login.svg'></img>
                        </div>                       
                    </div>

                </div>
                <div className='auth-wrapper auth-v1' >
                    <div className='mobile_logo'>
                        <img className="d-md-none d-sm-block" src="https://d3bhyz9dg77mce.cloudfront.net/dam/archive/images/archive-logo.png" alt="Logo" /></div>
                    <div className='auth-inner'>
                        <Card className='mb-0 rounded-0'>
                            <CardBody className="m-0 p-0">
                                <SwitchingComponent showView={cview} setcview={setcview}
                                    onSubmit={onSubmit} handleSubmit={handleSubmit}
                                    register={register} errors={errors}
                                    email={email} setemail={setemail}
                                    forget={forget} setforget={setforget}
                                    recover={recover} setrecover={setrecover}
                                    disabled={disabled} setDisabled={setDisabled}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div >

            </div>

        </>
        </Suspense>
    )
}
export default LoginV2