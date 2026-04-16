// ** Dropdowns Imports
import UserDropdown from './UserDropdown'
import BoardsMenu from './BoardsMenu'
import CollectionsMenu from './CollectionsMenu'
import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { accessContext } from '../../../../views/context/accessContext'

import { useSkin } from '@hooks/useSkin'
// ** Third Party Components
import { Sun, Moon, FileText } from 'react-feather'

import OrderRequestMenu from './OrderRequestMenu'
import Swal from 'sweetalert2'
const NavbarUser = props => {
    const {
        layout
    } = props
    const { is_boarduser, selectedUser } = useContext(accessContext)
    const [skin, setSkin] = useSkin()
    const [size, setSize] = useSkin()

    const ThemeToggler = () => {
        if (skin === 'dark') {
            return <Sun className='ficon' onClick={() => setSkin('bordered')} />
        } else {
            return <Moon className='ficon' onClick={() => setSkin('dark')} />
        }
    }
    const sizeToggler = () => {
        if (size === 'normal') {
            return <div className='ficon' onClick={() => setSize('normal')} >A</div>
        } else {
            return <div className='ficon' onClick={() => setSize('normalPlus')} >A+</div>
        }
    }
    const [designCount, setdesignCount] = useState(0)
    const history = useHistory()
    return (
        <>
        <sizeToggler/>
            <ul className='nav navbar-nav align-items-center ml-auto flex-row boardsmenu' id='boardsmenu'>

                {/* <div className='topIcon'><ThemeToggler className='topIcon' /></div> */}
                { !is_boarduser || (is_boarduser && selectedUser) ? <div className="position-relative topIcon customtooltip" onClick={() => {
                    if (!sessionStorage.designMaster || sessionStorage.designMaster === '[]') {  
                        Swal.fire({
                            icon: "warning",
                            title: "Your request is empty. Please add some items to proceed.",
                            showConfirmButton: true
                          })
                    } else history.push({ pathname: "/Cart" }) 
                    }}>
              <span className="tooltip">Request Form</span>   <FileText  size={20} className='primary' />
                    {/* <ShoppingCart size={18} className='primary' /> */}
                    {/* <Badge pill color='success' className='badge-up'>{value}</Badge> */}
                        <span class='circle'></span>
                    {/*  <Badge pill color='info' className='badge-up'>
                      {designCount}
                  </Badge>*/}

                </div> : <></>}
                <div id='notificationMenu' className='position-relative topIcon customtooltip' > <span className="tooltip">Request List</span><OrderRequestMenu /></div>
                {/* <div className='mx-50'><ShoppingCart/></div>     */}
                {!is_boarduser ? <BoardsMenu /> : <CollectionsMenu />}
                <UserDropdown />
            </ul >
        </>
    )
}
export default NavbarUser
