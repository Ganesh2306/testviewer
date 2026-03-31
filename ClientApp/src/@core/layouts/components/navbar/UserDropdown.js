// ** React Imports
import { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../store/action'
// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Spinner } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power, Archive, Key } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { R_Loader } from '../../../../views/loader/loader'
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
    const loaderRef = useRef(null)
    const logindiv = useRef(null)
    const [loading, setLoading] = useState(false)
    //** ComponentDidMount
    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])

    const showloader = () => {
        loaderRef.current.style.display = 'block'
        //logindiv.current.style.display = 'none'
    }

    const hideloader = () => {
        loaderRef.current.style.display = 'none'
        logindiv.current.style.display = ''
      }
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
        loaderRef.current.style.display = 'block'
        const role = JSON.parse(localStorage.getItem('userData')).role
        localStorage.clear()
            logoutUser({ role })
                .then(res => {
                    if (res) {
                        //localStorage.setItem('userData', res)
                       
                        dispatch(handleLogout)
                        history.push('/dashboard')
                        // hideloader()
                        
                    } 
                    loaderRef.current.style.display = 'none' 
                })
                .catch(err => console.log(err))
                // .finally(() => { })
        
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

   //abhishek for profile data OrganisationName
    let profileData = null
    if (localStorage.profile !== 'undefined' && localStorage.profile !== undefined && localStorage.profile !== null) {
        profileData = JSON.parse(localStorage.profile)
        userAvatar = (profileData.profile_image !== null ? `data:image/jpeg;base64,${profileData.profile_image}` : defaultAvatar) || defaultAvatar
    }
    return (
        <>  
          <R_Loader loaderRef={loaderRef}  /> 
        <div className='login'>
        <span >{(userData && userData['organisationName'])}</span>
        </div>
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
         
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                <div class="vl"></div>
               
                <div className='user-nav d-sm-flex'>
                    <span className='user-name font-weight-bold' style={{ textTransform: 'none' }}>{(userData && userData['userName']) || 'Default User'}</span>
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
                {/* <DropdownItem onClick={() => setprofileOpen(true)} className='w-100'>
                    <User size={14} className='mr-75' />
                    <span className='align-middle'>My Profile</span>
                </DropdownItem> */}
                {/*<MyProfile profileOpen={profileOpen} setprofileOpen={setprofileOpen} />*/}
                {/* <hr style={{marginTop:'0.5rem', marginBottom:'0.5rem'}}/> */}
                    {/* <DropdownItem className='w-100  d-none d-lg-block'>
                        <a href="https://archive.dam3d.in/" target="_blank">
                    <Archive size={14} className='mr-75' />
                            <span className='align-middle' >Go to Archive Viewer</span>
                        </a>
                </DropdownItem> */}
                {/* <hr className="d-none d-lg-block" style={{marginTop:'0.5rem', marginBottom:'0.5rem'}}/> */}
                {/* <MyProfile profileOpen={profileOpen} setprofileOpen={setprofileOpen} profile={profileData} /> */}
                {/* <DropdownItem onClick={() => setCpm(true)} className='w-100'>
                    <Key size={14} className='mr-75' />
                    <span className='align-middle' >Change Password</span>
                </DropdownItem> */}
                {/* <ModelPasswordChange cpmOpen={cpmOpen} setCpm={setCpm} setsuccessPassword={setsuccessPassword} />
                <SuccessPasswordChange successPassword={successPassword} setsuccessPassword={setsuccessPassword} /> */}
                <DropdownItem tag={Link} to={(userData && userData.role) === 'Organization' ? '/login' : process.env.REACT_APP_LANDING_PAGE } onClick={onSubmit}>{/* onClick={() => dispatch(handleLogout())}>*/}
                {loading ? <Spinner size="sm" color="light" /> : null}
                    <Power size={14} className='mr-75' />
                    <span className='align-middle'>Logout</span>
                  </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
        <R_Loader loaderRef={loaderRef}  />  
        </>
    )
}

export default UserDropdown
