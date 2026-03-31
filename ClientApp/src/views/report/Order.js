// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './tables/advance/TableServerSide'
import OrderPreview from './tables/advance/OrderPreview'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'
import OrderDetails from './tables/advance/OrderDetails'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const Order = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Order Report' breadCrumbParent='Report' breadCrumbActive='Order' className='d-lg-block d-sm-none'/> 
      <Row>
        <Col sm='12'>
          <StateProvider> 
           <TableServerSide />
          </StateProvider>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Order
