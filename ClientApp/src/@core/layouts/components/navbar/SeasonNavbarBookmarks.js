// ** React Imports
import { Fragment, useState, useContext, useRef } from 'react'

// ** Third Party Components
import * as Icon from 'react-feather'
import CollectionsMenu from './CollectionsMenu'
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import BoardsMenu from './BoardsMenu'
import { accessContext } from '../../../../views/context/accessContext'
import { Link, useHistory } from 'react-router-dom'
import { BC_Menu } from '../../../../utility/_boardutils/utils'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { searchTemplate } from '../../../../views/design/designview/Sidebar'

export const NaveBtn =  {
  NavHome:null,
  NavBack:null
}

const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props

  // ** State
  const [value, setValue] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const { is_boarduser } = useContext(accessContext)

  // ** Ref
  const NavHome = useRef(null)
  const NavBack = useRef(null)
  NaveBtn.NavHome = NavHome
  NaveBtn.NavBack = NavBack

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.navbar)
  const history = useHistory()

  // ** ComponentDidMount

  // ** If user has more than 10 bookmarks then add the extra Bookmarks to a dropdown
  const renderExtraBookmarksDropdown = () => {
    if (store.bookmarks.length && store.bookmarks.length >= 11) {
      return (
        <NavItem className='d-none d-lg-block'>     
          <div>
            <UncontrolledDropdown>
              <DropdownToggle tag='span'>
                <Icon.ChevronDown className='ficon' />
              </DropdownToggle>
              <DropdownMenu right>
                {store.bookmarks
                  .map(item => {
                    const IconTag = Icon[item.icon]
                    return (
                      <DropdownItem tag={Link} to={item.link} key={item.id}>
                        <IconTag className='mr-50' size={14} />
                        <span className='align-middle'>{item.title}</span>
                      </DropdownItem>
                    )
                  })
                  .slice(10)}
              </DropdownMenu>
            </UncontrolledDropdown>
            </div>
          {/* </NavLink> */}
        </NavItem>
      )
    } else {
      return null
    }
  }

  // ** Removes query in store
  // const handleClearQueryInStore = () => dispatch(handleSearchQuery(''))

  // ** Loops through Bookmarks Array to return Bookmarks
  const onKeyDown = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setOpenSearch(false)
        handleClearQueryInStore()
      }, 1)
    }
  }

  // ** Function to toggle Bookmarks
  // const handleBookmarkUpdate = id => dispatch(updateBookmarked(id))

  // ** Function to handle Bookmarks visibility
  const handleBookmarkVisibility = () => {
    setOpenSearch(!openSearch)
    setValue('')
    handleClearQueryInStore()
  }

  // ** Function to handle Input change
  const handleInputChange = e => {
    setValue(e.target.value)
    // dispatch(handleSearchQuery(e.target.value))
  }

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (openSearch === true) {
      setOpenSearch(false)
      handleClearQueryInStore()
    }
  }

  // ** Function to clear input value
  const handleClearInput = setUserInput => {
    if (!openSearch) {
      setUserInput('')
      handleClearQueryInStore()
    }
  }

  const spamStyle = {
    margin: '0px 0px'
  }
  const spamLeftStyle = {
    marginLeft: '0px'
  }

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none snackmenu'>
        <NavItem className='mobile-menu mr-auto'>
        
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' style={spamStyle} />
          </NavLink>
        </NavItem>
       
        
      </ul>
      <ul className='nav navbar-nav bookmark-icons'> 
          <NavItem key="collection" className='d-none d-lg-block'>          
                  <NavLink tag={Link} to="/brandingpage" id="brand-in-page">
                  <span> 
                    <Icon.Home width='16px' height='16px' className='ficon' />
                  </span>
                    {/* <Icon.Home width='16px' height='16px' className='ficon' />
                      <span onLoad={() => {
                        NavHome.current.style.display = 'block'
                        NavBack.current.style.display = 'none'
                      }} style={spamStyle}>
                          <Icon.Home width='16px' height='16px' className='ficon' />
                         
                      </span> */}
                  </NavLink>            
              </NavItem>
              <NavItem><NavLink tag={Link}  to="/SeasonHome" id="">View Seasons</NavLink></NavItem>           
              
      </ul>
      <ul className='nav navbar-nav align-items-center ml-auto flex-row' onClick={() => {
              BC_Menu.value = !is_boarduser
              searchTemplate.designName = ""
                history.push(`/Viewboards`)
                      
              }} >
              {is_boarduser ? <BoardsMenu/> : <CollectionsMenu /> }
      </ul>
    </Fragment >
  )
}

export default NavbarBookmarks
