// ** React Imports
import { Link, useHistory } from 'react-router-dom'
import { Fragment, useContext } from 'react'
import { Home, Users } from 'react-feather'
import { accessContext } from '../../../../views/context/accessContext'
// ** Custom Components
import {
    NavItem,
    NavLink
} from 'reactstrap'

import NavbarUser from './NavbarUser'
const ThemeNavbar = props => {
    const history = useHistory()
    const {orgtype, loginuser} = useContext(accessContext)
    // ** Props
    //loginuser : supplier list 
    //orgtype : type of user who logged in 
    const Who = localStorage.getItem("who")
    const { skin, setSkin } = props
    const supcount = localStorage.getItem('Supcount')
    const cuscount = localStorage.getItem('Custcount')
    
    return (
        <Fragment>
            <div className='bookmark-wrapper d-flex align-items-center'>
                <NavItem className='d-block d-lg-block cursor'>
                   {/* {((supcount <= 1) && (Who !== "Supplier User")) ? <NavLink tag='span' className="d-flex" onClick={() => history.push('/BrandingPage')}> */}
                   {((loginuser.length <= 1) && (orgtype === 3)) ? <NavLink tag='span' className="d-flex" onClick={() => history.push('/BrandingPage')}>
                       <Home size={21} width='21px' height='21px' className='mr-1' />
                        <span className='d-none d-lg-block align-middle pt-25'>Home</span>
                        </NavLink> : <NavLink tag='span' className="d-flex" onClick={() => history.push('/SupplierList')}>
                             <span className='d-flex flex-row'>
                                {/* <Home size={21} width='21px' height='21px' className='mr-50' /> */}
                                <Users size={21} width='21px' height='21px' className='mr-50'/>
                                {/* <div className='d-none d-lg-block pt-25'>Home</div> */}
                                <div className='d-none d-lg-block pt-25'>Select By Customer</div>
                            </span>
                        </NavLink>
                    }
                </NavItem>
            </div>
            <NavbarUser skin={skin} setSkin={setSkin} />
        </Fragment>
    )
}

export default ThemeNavbar
