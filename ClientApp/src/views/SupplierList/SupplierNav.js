/*eslint-disable */
import { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom"
// ** Custom Components
import Avatar from '@components/avatar'
// ** Configs
// import themeConfig from '@configs/themeConfig'
import { ModelPasswordChange } from '../../@core/layouts/components/NavbarPopup/ModalPasswordChange'
import { SuccessPasswordChange } from '../../@core/layouts/components/NavbarPopup//SuccessPasswordChange'
import { ScreenDpi } from '../../@core/layouts/components/NavbarPopup/ScreenDpi'
import { MyProfile } from '../../@core/layouts/components/NavbarPopup/MyProfile'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Navbar, NavLink } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'
// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../auth/store/action'
import pdf from '@src/assets/pdf/manual_b.pdf'
import { ProfileContext } from "../context/profileContext"
// ** Third Party Components
import { Sun, Moon, Bell } from 'react-feather'
import { accessContext } from '../../../src/views/context/accessContext'

// ** Configs
import themeConfig from '@configs/themeConfig'
import { useSkin } from '@hooks/useSkin'

export const SupplierNav = (props) => {
    const { is_boarduser } = useContext(accessContext)
    const [skin, setSkin] = useSkin()
    const [cpmOpen, setCpm] = useState(false)
    const [successPassword, setsuccessPassword] = useState(false)

    const [profileOpen, setprofileOpen] = useState(false)
    const [dpiOpen, setdpiOpen] = useState(false)
    const dispatch = useDispatch()
    const { ctxprofile } = useContext(ProfileContext)

    const onSubmit = data => {
    const role = JSON.parse(localStorage.getItem('userData')).role
    const keyToRemove = ['DeviceDetailsDto', 'who', 'refreshToken', 'id', 'profile', 'loginuserdata', 'accessToken', 'ForAllSearch', 'accessinfo', 'name', 'board', 'userName', 'userData']

    keyToRemove.forEach(key => {
    localStorage.removeItem(key)
    })
   // localStorage.clear()
    logoutUser({ role })
        .then(res => {
            if (res) {
                dispatch(handleLogout)
            }
        })
        .catch(err => console.log(err))

}
const ThemeToggler = () => {
  if (skin === 'dark') {
    return <Sun className='ficon' onClick={() => setSkin('bordered')} />
  } else {
    return <Moon className='ficon' onClick={() => setSkin('dark')} />
  }
}

const setDpiValue = () => {
   
    $("#setDPI").trigger('click')
    var DDto = JSON.parse(localStorage.getItem('DeviceDetailsDto'));
    DDto.screen_X_DPI = (DDto.screen_X_DPI == undefined || DDto.screen_X_DPI == 0) ? 100 : DDto.screen_X_DPI
    DDto.screen_Y_DPI = (DDto.screen_Y_DPI == undefined || DDto.screen_Y_DPI == 0) ? 100 : DDto.screen_Y_DPI

    if (DDto.Screen_X_DPI != DDto.screen_Y_DPI)
        $("#aspect_ratio").prop('checked', false);
    $('.screen_size input[type="radio"]').first().click()
    $('#vDensity').val(DDto.screen_Y_DPI).trigger('keyup')
    $('#hDensity').val(DDto.screen_X_DPI).trigger('keyup')
    }
    //let profileData = null
    let userAvatar = defaultAvatar

    //if (localStorage.profile !== 'undefined' && localStorage.profile !== undefined && localStorage.profile !== null) {
        //profileData = JSON.parse(localStorage.profile)
        userAvatar = (ctxprofile && ctxprofile.profile_image !== null ? `data:image/jpeg;base64,${ctxprofile && ctxprofile.profile_image}` : defaultAvatar) || defaultAvatar
    //}

    let profileData = null
    if (localStorage.profile !== 'undefined' && localStorage.profile !== undefined && localStorage.profile !== null) {
        profileData = JSON.parse(localStorage.profile)
        userAvatar = (profileData.profile_image !== null ? `data:image/jpeg;base64,${profileData.profile_image}` : defaultAvatar) || defaultAvatar
    }
    return (      
            <a>
            <Navbar expand='lg' className='header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center'>
            
                    <div className='navbar-container d-flex justify-content-between p-0'>
                            <NavLink to='/' className="d-flex" >
                            <span className='brand-logo'>
                                <img src={themeConfig.parentapp.parentLogoImage} alt='logo' style={{ width: '45px', position: 'relative' }} />
                            </span>
                                <span className='logo_brand_text'>
                                Textronics
                                </span>
                         </NavLink>
                            <div className="text-right text-white float-right d-flex">
                               
                                     
                                <ul className='nav navbar-nav align-items-center ml-auto'>
                                <div className='mr-50'><ThemeToggler/></div> 
                                  {/* <div id='notificationMenuB'><OrderRequestMenu/></div>     */}
                                    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
                                
                                        <DropdownToggle href='#' tag='a' className='nav-link dropdown-user-link d-flex'>     
                                            <div className='user-nav d-sm-flex d-none'>
                                                <span className='user-name font-weight-bold'>{profileData !== null ? profileData.login_id : ''}</span>
                                                <span className='user-status pt-0'>{(localStorage.who)}</span>     
                                            </div>           
                                            <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
                                        
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem onClick={() => 
                                                setDpiValue()
                                                /* setdpiOpen(true) */}>
                                                <Settings size={14} className='mr-75' />
                                                <span className='align-middle'>Setup Screen DPI</span>
                                            </DropdownItem>
                                            <ScreenDpi dpiOpen={dpiOpen} setdpiOpen={setdpiOpen} />
                                            <span><hr /></span>
                                            <DropdownItem>
                                            <CreditCard size={14} className='mr-75' />
                                                <span className='align-middle' onClick={() => setprofileOpen(true)}>Profile</span>
                                            </DropdownItem>
                                            <DropdownItem>
                                                        <HelpCircle size={14} className='mr-75' />
                                                <span className='align-middle'><a href={pdf} target="_blank">Help</a></span>
                                            </DropdownItem>
                                            <MyProfile profileOpen={profileOpen} setprofileOpen={setprofileOpen} profile={ctxprofile} />
                                            <DropdownItem >
                                            <HelpCircle size={14} className='mr-75' />
                                                <span className='align-middle' onClick={() => setCpm(true)}>Change Password</span>
                                            </DropdownItem>
                                            <ModelPasswordChange cpmOpen={cpmOpen} setCpm={setCpm} setsuccessPassword={setsuccessPassword}/>
                                            <SuccessPasswordChange successPassword={successPassword} setsuccessPassword={setsuccessPassword} />

                                            <DropdownItem tag={Link} to='/login' onClick={onSubmit}>
                                                <Power size={14} className='mr-75' />
                                                <span className='align-middle' >Logout</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </ul>
                            </div>
                    </div>
                </Navbar>
            </a>
      
    )
}