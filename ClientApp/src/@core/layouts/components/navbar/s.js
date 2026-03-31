// ** React Imports
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../store/action'
// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

import { ModelPasswordChange } from '../NavbarPopup/ModalPasswordChange'
import { SuccessPasswordChange } from '../NavbarPopup/SuccessPasswordChange'
import { MyProfile } from '../NavbarPopup/MyProfile'
import { ProfileContext } from "./../../../../views/context/ProfileContext"


const UserDropdown = () => {
    //manisha added
    const [cpmOpen, setCpm] = useState(false)
    const [successPassword, setsuccessPassword] = useState(false)

    const [profileOpen, setprofileOpen] = useState(false)
      //manisha added ends
    // ** Store Vars
    const dispatch = useDispatch()

    // ** State
    const [userData, setUserData] = useState(null)
    const { ctxprofile, setctxProfile } = useContext(ProfileContext)

    //** ComponentDidMount
    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])


    //** Vars
    /*abhishek 14/02 start*/
    let userAvatar = ""
    if (userData !== null) {
        userAvatar = userData.org_userImg_url
    } else {
        userAvatar = defaultAvatar
    }
    //abhishek 14/02 end
   /*const userAvatar = (userData && userData.org_userimg_byte !== null ? `data:image/jpeg;base64,${userData.org_userimg_byte}` : defaultAvatar) || defaultAvatar*/
   //
    const onSubmit = data => {
        //
        
        const role = JSON.parse(localStorage.getItem('userData')).role
        localStorage.clear()
            logoutUser({ role })
                .then(res => {
                    if (res) {
                        //localStorage.setItem('userData', res)
                       
                        dispatch(handleLogout)
                        history.push('/dashboard')
                        
                    } 
                })
                .catch(err => console.log(err))
        
    }
    function getRoleByuserData() {
        let role = userData.role
        if (userData.role !== "PlatformAdmin") {
            switch (userData.org_type) {
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
            if (userData.is_administrator) {
                role = `${role} Admin`
            } else {
                role = `${role} User`
            }
            return role
        }
    }
   //abhishek for profile data
    let profileData = null
    if (localStorage.profile !== 'undefined' && localStorage.profile !== undefined && localStorage.profile !== null) {
        profileData = JSON.parse(localStorage.profile)
        userAvatar = (profileData.profile_image !== null ? `data:image/jpeg;base64,${profileData.profile_image}` : defaultAvatar) || defaultAvatar
    }
    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                <div class="vl"></div>
                <div className='abhilogin '>
                    <span >ABHISHEK</span>
                </div>
                <div>
                    <span className='user-name font-weight-bold'>{(userData && userData['userName']) || 'Default User'}</span>
                </div>
                <div className='user-nav d-sm-flex'>
                    <span className='user-name font-weight-bold'>{(userData && userData['userName']) || 'Default User'}</span>
                    <span className='user-status'>{(userData && getRoleByuserData()) || 'Admin'}</span>
                </div>
                <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
            </DropdownToggle>
            <DropdownMenu right style={{ width: '14rem' }}>
                {/*   <DropdownItem tag={Link} to='/profile' className='w-100'>
                    <User size={14} className='mr-75' />
                    <span className='align-middle'>Profile</span>
                </DropdownItem>
              
          <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
            <Mail size={14} className='mr-75' />
            <span className='align-middle'>Inbox</span>
          </DropdownItem>
          <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
            <CheckSquare size={14} className='mr-75' />
            <span className='align-middle'>Tasks</span>
          </DropdownItem>
          <DropdownItem tag={Link} to='#' onClick={e => e.preventDefault()}>
            <MessageSquare size={14} className='mr-75' />
            <span className='align-middle'>Chats</span>
          </DropdownItem>
        */}
                <DropdownItem onClick={() => setprofileOpen(true)} className='w-100'>
                    <CreditCard size={14} className='mr-75' />
                    <span className='align-middle'>My Profile</span>
                </DropdownItem>
                {/*<MyProfile profileOpen={profileOpen} setprofileOpen={setprofileOpen} />*/}
                <MyProfile profileOpen={profileOpen} setprofileOpen={setprofileOpen} profile={profileData} />
                <DropdownItem onClick={() => setCpm(true)} className='w-100'>
                    <HelpCircle size={14} className='mr-75' />
                    <span className='align-middle' >Change Password</span>
                </DropdownItem>
                <ModelPasswordChange cpmOpen={cpmOpen} setCpm={setCpm} setsuccessPassword={setsuccessPassword} />
                <SuccessPasswordChange successPassword={successPassword} setsuccessPassword={setsuccessPassword} />
                <DropdownItem tag={Link} to={(userData && userData.role) === 'Organization' ? '/login' : '/admin'} onClick={onSubmit}>{/* onClick={() => dispatch(handleLogout())}>*/}
                    <Power size={14} className='mr-75' />
                    <span className='align-middle'>Logout</span>
                  </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
