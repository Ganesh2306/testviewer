import { Link } from 'react-router-dom'

// ** Third Party Components
import { Bell } from 'react-feather'
import { Dropdown, DropdownToggle, Badge } from 'reactstrap'

const MsgNotification = () => {
    return (
        <Dropdown tag={Link} to="/order" className='dropdown-cart nav-item mr-25 text-dark'>
            <DropdownToggle tag='a' className='nav-link position-relative'>
                <Bell className='ficon' />
                <Badge pill color='primary' className='badge-up'>
                    5
                </Badge>
            </DropdownToggle>
        </Dropdown>
    )
}

export default MsgNotification
