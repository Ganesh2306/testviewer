// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../../store/action'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

import { ModelPasswordChange } from '../NavbarPopup/ModalPasswordChange'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = (props) => {

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    // ** Store Vars
    const dispatch = useDispatch()

    // ** State
    const [userData, setUserData] = useState(null)

    //** ComponentDidMount
    useEffect(() => {
        
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')))
        }
    }, [])

    const onSubmit = data => {
        //

        const role = JSON.parse(localStorage.getItem('userData')).role
        localStorage.clear()
        sessionStorage.clear()
        logoutUser({ role })
            .then(res => {
                if (res) {
                    //localStorage.setItem('userData', res)

                     dispatch(handleLogout)
                    //history.push('/dashboard')

                }
            })
            .catch(err => console.log(err))

    }
    //** Vars
   // const userAvatar = (userData && userData.avatar) || defaultAvatar
    const userAvatar = (userData && userData.org_userimg_byte !== null ? `data:image/jpeg;base64,${userData.org_userimg_byte}` : defaultAvatar) || defaultAvatar
   
    return (
        <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
            <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
                {/* <div className='user-nav d-sm-flex d-none'>
          <span className='user-name font-weight-bold'>{(userData && userData['username']) || 'John Doe'}</span>
          <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
        </div> */}
                <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
            </DropdownToggle>
            <DropdownMenu right>      
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='mr-75' />
          <span className='align-middle'>Setup Screen DPI</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
         </DropdownItem>
        <DropdownItem tag={Link} to='/pages/faq' >
                    <HelpCircle size={14} className='mr-75' />
                    <span className='align-middle'>Help</span>
         </DropdownItem>
       {/*<DropdownItem >*/}
       {/*   <HelpCircle size={14} className='mr-75' />*/}
       {/*             <span className='align-middle'>Change Password</span>*/}
       {/*         </DropdownItem>*/}
           {/*     <ModelPasswordChange changepassword="changepassword" />*/}
             {/*   <ModelPasswordChange modal={modal} toggle={toggle} />*/}
                <ModelPasswordChange changepassword ="changepassword" />
                <DropdownItem tag={Link} to='/login' onClick={onSubmit}>
                    <Power size={14} className='mr-75' />
                    <span className='align-middle'>Logout</span>
                </DropdownItem>

            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default UserDropdown
