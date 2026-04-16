
/*eslint-disable */
// ** React Imports
import { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'
import { bcMenuContext } from '../../../../views/context/bcMenuContext'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../../store/action'
import { ProfileContext } from './../../../../views/context/profileContext'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { Settings, CreditCard, HelpCircle, Power, Home, Layers, Feather, Image, Edit, Trello } from 'react-feather'

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

const UserDropdown = (props) => {
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

const { bcMenudata } = useContext(bcMenuContext)
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
    //    localStorage.clear()
        logoutUser({ role })
            .then(res => {
                localStorage.clear()
                if (res) {
                    localStorage.clear()
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
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item desktop_dropdown ml-75'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link px-0' onClick={e => e.preventDefault()}>
                <div className='user-nav d-sm-flex d-none'>
                    <span className='user-name font-weight-bold'>{profileData !== null ? profileData.login_id : ''}</span> 
                    {/* <span className='user-status'>{(localStorage.who)}</span>     */}
                    <span className='small' id='selecteduser'>   {!selectedUser ? profileData !== null ? profileData.login_id : '' : selectedUser.label}</span>
                </div> 
                <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem tag={Link} to='/brandingpage' style={{ display: access && access[111119] && access[111119][244449] ? 'none' : 'flex' }}>
                    <Home size={14} className='mr-75' />
                    <span className='align-middle'>Home</span>
                </DropdownItem>
                {/* <span><hr /></span> */}
                <DropdownItem tag={Link} to='/design'>
                    <Image size={14} className='mr-75'/>
                    <span className='align-middle'>Designs</span>
                </DropdownItem>          
                {  !(is_boarduser && access["333339"] && !access["333339"]["248889"]) && 
                <DropdownItem  style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : 'flex' }} onClick={() => {     
                // BC_Menu.value = !is_boarduser
                {!BC_Menu.value ? !is_boarduser : selectedUser}
                history.push(`/Viewboards`)      
              }}>
                    <Layers size={14} className='mr-75' />
                    <span className='align-middle notvisible'>{!is_boarduser ? `Wishlist` : `Collections`}</span>
                </DropdownItem>}

               { (access["333339"] && access["333339"]["258889"]) &&  <DropdownItem tag={Link} to='/SeasonHome'>
                    <Feather size={14} className='mr-75' />
                    <span className='align-middle'>Seasonal</span>
                </DropdownItem>}
                {/* <span><hr /></span> */}
             
                {/* {(access["333339"] && access["333339"]["248889"]) && selectedUser ? is_boarduser ? 
                 <DropdownItem onClick={() => { 
                    BC_Menu.value = true
                    history.push(`/Viewboards`)      
                  }}> <Heart size={14} className='' /> Wishlist</DropdownItem> :<DropdownItem><Layers size={14} className='mr-75' /> Collections</DropdownItem> :''
                }     */}
                   {
                    (access["333339"] && access["333339"]["248889"] && selectedUser) && (
                        <DropdownItem onClick={() => {     
                            BC_Menu.value = true
                            history.push(`/Viewboards`)  
                        }}>
                            <Layers size={14} className='mr-75' />
                            <span className='align-middle notvisible'>
                                {is_boarduser ? "Wishlist" : "Collections"}
                            </span>
                        </DropdownItem>
                    )
                }
               <DropdownItem tag={Link} to='/ViewOrder'>           
                    <Trello size={14} className='mr-75' />
                            <span className='align-middle'>Requests</span>
              </DropdownItem>       
{/*            
         <span><hr /></span> */}
          <DropdownItem onClick={() => 
            setDpiValue()}>
             <Settings size={14} className='mr-75' />
            <span className='align-middle'>Setup Screen DPI</span>            
           </DropdownItem>           
                <ScreenDpi dpiOpen={dpiOpen} setdpiOpen={setdpiOpen} />
                {/* <span><hr /></span> */}
                {/* <DropdownItem tag={Link} target="_blank"  style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : 'flex' }}>
                   <a href='https://admin.dam3d.in/login' target="_blank">
                        <ExternalLink size={14} className='mr-75' />
                        <span className='align-middle' >  My Admin Panel
                        </span>
                    </a>
                  </DropdownItem>  */}
{/*            
              <span><hr /></span> */}
               {JSON.parse(localStorage.userData).organisationId === 757782875 ? null : (
                <DropdownItem >
                <HelpCircle size={14} className='mr-75' />
                <span className='align-middle' >  <a href={pdf} target="_blank">Help</a>  </span>
              </DropdownItem>
               )}

         {/* <DropdownItem onClick={() => setprofileOpen(true)}  style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : 'flex' }}>
                    <CreditCard size={14} className='mr-75' />
                    <span className='align-middle'>My Profile</span>
        </DropdownItem> */}

            {JSON.parse(localStorage.userData).organisationId === 757782875 ? null : (
            <DropdownItem onClick={() => setprofileOpen(true)}>
                <CreditCard size={14} className="mr-75" />
                <span className="align-middle">My Profile</span>
            </DropdownItem>
            )}

   
        
                <MyProfile profileOpen={profileOpen} setprofileOpen={setprofileOpen} profile={profileData} />
                {JSON.parse(localStorage.userData).organisationId === 757782875 ? null : (
                    <DropdownItem onClick={() => setCpm(true)}>
                    <Edit size={14} className='mr-75' />
                    <span className='align-middle' >Change Password</span>
         </DropdownItem>
                ) }
       

                <ModelPasswordChange cpmOpen={cpmOpen} setCpm={setCpm} dispatch={dispatch} handleLogout={handleLogout} />
                <SuccessPasswordChange successPassword={successPassword} setsuccessPassword={setsuccessPassword} />

                <DropdownItem onClick={() => setreportopen(true)} style={{ display: 'none'}}>
                    <Trello size={14} className='mr-75' />
                    <span className='align-middle'>Report</span>
                </DropdownItem>
            
                <ModalStatusReport reportopen={reportopen} setreportopen={setreportopen} />
      
                <DropdownItem tag={Link} to='/login' onClick={onSubmit}>
                    <Power size={14} className='mr-75' />
                    <span className='align-middle'>Logout</span>
                </DropdownItem>

                
               
            
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown