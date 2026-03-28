import axios from 'axios'

import { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { accessContext } from '../../../../views/context/accessContext'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge, Media } from 'reactstrap'
import { Bell, Trello } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'

const OrderRequestMenu = (props) => {
  const [orderlist, setOrderlist] = useState([])
  const [total, setTotal] = useState(0)
  const { is_boarduser, selectedUser  } = useContext(accessContext)

  useEffect(() => {
    const fetchOrderNotifications = async () => {
      if (localStorage.userData) {
        const GetOrderNotificationRequest = {
          RequestType: "All",
          Status: "All"
        }

        if (JSON.parse(localStorage.userData).org_type === 2 &&  localStorage.selecteduser) {
          GetOrderNotificationRequest.customerId = JSON.parse(localStorage.selecteduser)?.value
        }
        if (JSON.parse(localStorage.userData).org_type === 3 &&  localStorage.selecteduser) {
          GetOrderNotificationRequest.SupplierId = JSON.parse(localStorage.selecteduser)?.value
        }

        try {
          const response = await axios.post('/Order/GetOrderNotification', GetOrderNotificationRequest)
          const result = JSON.parse(response.data)
          
          if (Object.keys(result).length >= 0) {
            const totalOrders = Object.values(result).reduce((sum, count) => sum + count, 0)
            setTotal(totalOrders)

            // const orderItems = Object.entries(result).map(([key, value]) => {
            //   console.log(key.trim() !== '', 'vbaibh')
            //   const nameAndId = key.split('-')
            //   return {
            //     avatarContent: 'MD',
            //     subtitle: 'Reference type',
            //     title: (
            //       <Media className='topIcon p-0'>
            //         <span>{nameAndId[0]}</span>
            //       </Media>
            //     ),
            //     requestCount: (
            //       <Badge pill color='success' className='badge-up'>
            //         {value}
            //       </Badge>
            //     )
            //   }
            // })
            const orderItems = (Object.keys(result).length === 0 || (Array.isArray(result) && result.length === 0)) ? [
              {
                avatarContent: 'MD',
                subtitle: 'No data available',
                title: (
                    <Media className='topIcon p-0'>
                        <span>{JSON.parse(localStorage.getItem('selecteduser')).label}</span>
                    </Media>
                ),
                requestCount: <Badge pill color='warning' className='badge-up'>0</Badge>
            }
          ] : Object.entries(result).map(([key, value]) => ({
                avatarContent: 'MD',
                subtitle: 'Reference type',
                title: (
                    <Media className='topIcon p-0'>
                        <span>{key.split('-')[0]}</span>
                    </Media>
                ),
                requestCount: <Badge pill color='success' className='badge-up'>{value}</Badge>
            }))
            setOrderlist(orderItems)
          }
        } catch (error) {
          console.error("Error fetching order notifications:", error)
        }
      }
    }
    
    fetchOrderNotifications()
  //  console.log(selectedUser.label, "vaibhavimore")
  }, [selectedUser.label])// Dependency added here

  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar component='li' className='media-list scrollable-container' options={{ wheelPropagation: false }}>
        {orderlist.map((item, index) => (
          <Media tag={Link} to='/ViewOrder' key={index}>
            <Fragment>
              <Media body>
                {item.title}
                {item.requestCount}
              </Media>
            </Fragment>
          </Media>
        ))}
      </PerfectScrollbar>
    )
  }

  return (
    <UncontrolledDropdown tag='li' className='nav-item text-dark'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link text-dark px-0' onClick={e => e.preventDefault()}>
        <Badge pill color='success' className='badge-up'>
          {total}
        </Badge>
        <Trello size={20} className='primary' />
      </DropdownToggle>
      <DropdownMenu tag='ul' right>
        <li className='dropdown-menu-header'></li>
        {renderNotificationItems()}
        <span><hr /></span>
        <DropdownItem tag={Link} to='/ViewOrder'>
          <span className='align-middle'>Show all Requests</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default OrderRequestMenu