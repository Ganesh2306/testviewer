// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { Row, Col, CardText, DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem, Card} from 'reactstrap'
import { Menu, Search, MoreVertical } from 'react-feather'
/*import Accordion from './WishlistComponent/Accordion'*/
import WishlistHeader from './WishlistComponent/WishlistHeaderButton'
import AppCollapse from '../wishlist/WishlistComponent/WishlistCollapse'
import { WishlistNav } from '../wishlist/WishlistComponent/WishlistNav'
import '../wishlist/css/wishlistpage.css'
import { data } from '../wishlist/WishlistData/wishlistdata'

const Wishlist = (props) => {
  return (
      <Fragment> 
          <Row className='row_search'>
              <Col className='py-50 bg-light mysearch_head d-flex justify-content-between'>
                  <h5 className='m-0 py-50'>My Wishlist {'(4)'}</h5>                
                  <WishlistHeader />
              </Col>
         </Row>
         <AppCollapse data={data} >
         </AppCollapse>
      </Fragment>
  )
}

export default Wishlist
