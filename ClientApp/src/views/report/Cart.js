// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import DataTableCart from './tables/advance/DataTableCart'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const Cart = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Cart Report' breadCrumbParent='Report' breadCrumbActive='Cart' />
      <Row>
        <Col sm='12'>
          <StateProvider> 
           <DataTableCart/>
          </StateProvider>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Cart
