import { Link } from 'react-router-dom'

// ** Third Party Components
import { Heart } from 'react-feather'
import { Dropdown, DropdownToggle, Badge } from 'reactstrap'

const Myboards = () => {
  return (
    <Dropdown tag={Link} to="/wishlist" className='dropdown-cart nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link'>
        <Heart size={21} />
        <Badge pill color='danger' className='badge-up'>
          1
        </Badge>
      </DropdownToggle>
    </Dropdown>
  )
}

export default Myboards
