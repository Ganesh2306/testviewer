import { Fragment } from 'react'
import CartPage from './CartComponent/CartPage'
import { Col, Row } from 'reactstrap'

import CartHeaderButton from './CartComponent/CartHeaderButton'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Cart = () => { 
  return (
      <Fragment>
          <Row className='row_search'>
              <Col className='py-1 bg-light mysearch_head d-flex justify-content-between'>
                  <h5 className='m-0 py-50 w-100'>My Cart {'(40)'}</h5>
                  <CartHeaderButton />
              </Col>
          </Row>  
          <div className='py-1 d-flex flex-row selected_status'>
                    <div><span>5 </span>designs selected</div>
                    <div className='px-50'> | </div>
                    <div>Deselect</div>
          </div>    
     <CartPage/>  
    </Fragment>
  )
}
export default Cart
