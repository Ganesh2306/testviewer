// ** React Imports
import { useHistory } from 'react-router-dom'
import { Fragment } from 'react'
import { ArrowLeft } from 'react-feather'
// ** Custom Components
import {
    NavItem,
    NavLink
} from 'reactstrap'

import { BC_Menu } from '../../../../utility/_boardutils/utils'
import UserDropdown from './UserDropdown'

const ThemeNavbar = props => {
    const history = useHistory()
    // ** Props
    const { skin, setSkin, setMenuVisibility } = props
    return (
        <>
        <Fragment>
            <div className='bookmark-wrapper d-flex align-items-center'>
                <NavItem className='d-block d-lg-block cursor'>
                    <NavLink tag='span' className="d-flex" onClick={() => {
                       BC_Menu.value = false
                      
                        if (localStorage.warehouse === 'seasonal') {
                            history.goBack()
                        } else {
                            history.goBack()
                        }

                        }}>
                            <ArrowLeft className='ficon mr-50' size={15} />
                            {/* Back manisha hided back*/}
                       {/* {!BC_Menu.value ? (!props.is_boarduser ? `Collections` : `Boards`) : (!props.is_boarduser ? `Boards` : `Collections`)}*/}
                   
                    </NavLink>
                </NavItem>                
            </div>
              {/* seasonHome Page Redirect added working Tanmay 17-04-2024 purpose :- redirect Home page (SupplierList) */}
            {/* <div className='navbar-header d-xl-block d-md-block' style={{display:'block'}}>
                        <ul className='nav navbar-nav'>
                            <NavItem>
                         
                                <a href='/SupplierList' className='navbar-brand'>
                                    <span className='brand-log tt'>
                                        <img src={themeConfig.app.appLogoImage} alt='logo' />
                                    </span>                                  
                                </a>
                            </NavItem>  
                        </ul>
            </div> 
                */}
            <ul className='nav navbar-nav align-items-center ml-auto flex-row' > <UserDropdown /></ul>
            </Fragment>        
                      
    </>
    )
}

export default ThemeNavbar
