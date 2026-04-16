
import React, { Fragment } from "react"
// import { Fragment } from 'react'
import CartPage from '../cart/CartComponent/CartPage'
import { Col, Row } from 'reactstrap'
import OrderHeaderButton from './OrderComponent/OrderHeaderButton'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const OrderPage = (props) => {
  // const disabled = true
  
  return (
    <Fragment>
          <Row className='row_search'>
              <Col className='py-1 bg-light mysearch_head d-flex justify-content-between'>
                  <h5 className='m-0 py-50 w-100'>My Order {'(40)'}</h5>
                  <OrderHeaderButton/>
              </Col>
          </Row>          
   <CartPage NoThumb={true} comment={true} len={true} period={true} quantity={true}/>  
  </Fragment>  
  )
}

export default OrderPage
