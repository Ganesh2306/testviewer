import { Link } from 'react-router-dom'

// ** Third Party Components
import { FileText, ShoppingCart } from 'react-feather'
import { Dropdown, DropdownToggle } from 'reactstrap'

const Cart = () => {
  return (
    <Dropdown tag={Link} to="/cart" className='dropdown-cart nav-item mr-25 text-dark'>
      <DropdownToggle tag='a' className='nav-link position-relative'>
             
                <FileText  className='ficon mr-50'/>                
              <ShoppingCart size={18} className='ficon mr-50' />
              <span className='align-middle'>Request</span>
        {/*<Badge pill color='primary' className='badge-up'>*/}
        {/*  2*/}
        {/*</Badge>*/}
      </DropdownToggle>
    </Dropdown>
  )
}

export default Cart
