
/*eslint-disable */
// ** React Imports
import { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from '../../store/action'
import { ProfileContext } from '../../../../views/context/profileContext'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { Book, ShoppingCart, Settings, CreditCard, HelpCircle, Power, Home, Layers, Feather, ShoppingBag, Image, Edit, Menu, Heart, ExternalLink, Trello } from 'react-feather'

import { ModelPasswordChange } from '../NavbarPopup/ModalPasswordChange'
import { SuccessPasswordChange } from '../NavbarPopup/SuccessPasswordChange'
import { ScreenDpi } from '../NavbarPopup/ScreenDpi'
import { MyProfile } from '../NavbarPopup/MyProfile'
import pdf from '../pdf/Archive_viewer_Manual.pdf'  
import { accessContext } from "../../../../views/context/accessContext"
import { BC_Menu } from '../../../../utility/_boardutils/utils'
// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { ModalStatusReport } from '../../../../views/popups/ModalStatusReport'

const MobileUserDropdown = (props) => {

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

    const [cpmOpen, setCpm] = useState(false)
    const [successPassword, setsuccessPassword] = useState(false)

    const [profileOpen, setprofileOpen] = useState(false)
    const [dpiOpen, setdpiOpen] = useState(false)
    const[reportopen, setreportopen] = useState(false)
 /*   const toggle = () => setModal(!modal)*/

    // ** Store Vars
    const dispatch = useDispatch()
    const history = useHistory()
    // ** State
    const [userData, setUserData] = useState(null)
    const { ctxprofile, setctxProfile } = useContext(ProfileContext)
    const { is_boarduser, selectedUser, access } = useContext(accessContext)

    //** ComponentDidMount
    useEffect(async () => {
        
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
            /* const response = await axios.get(`./Login/GetEditOrgUser`)
            setProfile(response.data) */
        }

    }, [])

    const onSubmit = data => {
        //
        try {
        const role = JSON.parse(localStorage.getItem('userData')).role
        localStorage.clear()
        logoutUser({ role })
            .then(res => {
                if (res) {
                    //localStorage.setItem('userData', res)
                     dispatch(handleLogout)
                    //history.push('/dashboard')
                }
            })
            .catch(err => console.log(err))   
        } catch (error) {
            
        }

    }
    let profileData = null
    let userAvatar = defaultAvatar
    if (localStorage.profile !== 'undefined' && localStorage.profile !== undefined && localStorage.profile !== null) {
        profileData = JSON.parse(localStorage.profile)
        userAvatar = (profileData.profile_image !== null ? `data:image/jpeg;base64,${profileData.profile_image}` : defaultAvatar) || defaultAvatar
    }

    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item mobile_Menu'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                    <div>
                    <Menu className='ficon'  />
                    </div>

                {/* <div className='user-nav d-sm-flex d-none'>
                    <span className='user-name font-weight-bold'>{profileData !== null ? profileData.login_id : ''}</span>
                    <span className='user-status'>{(localStorage.who)}</span>                    
                </div>  */}
             
            </DropdownToggle>
            <DropdownMenu right>
                <div className='avtaar_bg'>      
                    <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />                       
                    <div className='user-nav d-flex flex-column align-items-center'>
                        <span className='user-name font-weight-bold p-50'>{profileData !== null ? profileData.login_id : ''}</span> 
                        <span className='small' id='selecteduser pl-1'>   {!selectedUser ? profileData !== null ? profileData.login_id : '' : selectedUser.label}</span>
                        {/* <span className='user-status  p-50'>{(localStorage.who)}</span>                     */}
                </div> 
                </div>
                <DropdownItem tag={Link} to='/brandingpage'>
                    <Home size={14} className='mr-75' />
                    <span className='align-middle'>Home</span>
                </DropdownItem>
                <span><hr /></span>
                <DropdownItem tag={Link} to='/design'>
                    <Image size={14} className='mr-75' />
                    <span className='align-middle'>Designs</span>
                </DropdownItem>          
                <DropdownItem onClick={() => {                  
                BC_Menu.value = !is_boarduser
                history.push(`/Viewboards`)      
              }}>
                    <Layers size={14} className='mr-75' />
                    <span className='align-middle'>Collections</span>
                </DropdownItem>

                <DropdownItem tag={Link} to='/SeasonHome'>
                    <Feather size={14} className='mr-75' />
                    <span className='align-middle'>Seasonal</span>
                </DropdownItem>
                <span><hr /></span>
                <DropdownItem
                onClick={() => {
                    BC_Menu.value = true                
                }} 
                tag={Link} to='/Viewboards' >
                    <Heart size={14} className='mr-75' />
                    <span className='align-middle'>{selectedUser ? is_boarduser ? `Wishlist` : `Collections` : <></>} </span>
                </DropdownItem>
             
          {is_boarduser?   <> 
                    <DropdownItem tag={Link} to='/ViewOrder'>
                    <ShoppingCart size={14} className='mr-75' />
                            <span className='align-middle'>Requests</span>
             </DropdownItem>
       
             </> :''}
         <span><hr /></span>
          <DropdownItem onClick={() => 
            setDpiValue()
            /* setdpiOpen(true) */}>
             <Settings size={14} className='mr-75' />
            <span className='align-middle'>Setup Screen DPI</span>            
           </DropdownItem>           
                <ScreenDpi dpiOpen={dpiOpen} setdpiOpen={setdpiOpen} />
                <span><hr /></span>
                <DropdownItem >
                    <ExternalLink size={14} className='mr-75' />
                    <span className='align-middle' >  My Admin Panel
                    </span>
                  </DropdownItem> 
              <span><hr /></span>
                {/* <span className='align-middle' > */}
                <DropdownItem >
                    <HelpCircle size={14} className='mr-75' />
                    <span className='align-middle' >  <a href={pdf} target="_blank">Help</a> </span>
                  </DropdownItem> 
         <DropdownItem onClick={() => setprofileOpen(true)}>
                    <CreditCard size={14} className='mr-75' />
                    <span className='align-middle'>My Profile</span>
        </DropdownItem>
                <MyProfile profileOpen={profileOpen} setprofileOpen={setprofileOpen} profile={profileData} />

      
       <DropdownItem onClick={() => setCpm(true)}>
                    <Edit size={14} className='mr-75' />
                    <span className='align-middle' >Change Password</span>
         </DropdownItem>


         <DropdownItem onClick={() => setreportopen(true)}>
                    <Trello size={14} className='mr-75' />
                    <span className='align-middle'>Report</span>
                </DropdownItem>
      <ModalStatusReport reportopen={reportopen} setreportopen={setreportopen} />

                <ModelPasswordChange cpmOpen={cpmOpen} setCpm={setCpm} dispatch={dispatch} handleLogout={handleLogout} />
                <SuccessPasswordChange successPassword={successPassword} setsuccessPassword={setsuccessPassword} />
      
                <DropdownItem tag={Link} to='/login' onClick={onSubmit}>
                    <Power size={14} className='mr-75' />
                    <span className='align-middle'>Logout</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default MobileUserDropdown