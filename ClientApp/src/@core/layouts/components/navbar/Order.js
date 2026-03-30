import { Link } from 'react-router-dom'

// ** Third Party Components
import { ShoppingBag, X } from 'react-feather'
import { Dropdown, DropdownToggle } from 'reactstrap'

const Order = () => {
  return (
      <Dropdown tag={Link} to="/order" className='dropdown-cart nav-item mr-25 text-dark'>
      <DropdownToggle tag='a' className='nav-link position-relative'>
              <ShoppingBag size={18} className='ficon primary mr-50' />
              <span className='align-middle'>Requests</span>    
      </DropdownToggle>
    </Dropdown>
  )
}

export default Order
 
