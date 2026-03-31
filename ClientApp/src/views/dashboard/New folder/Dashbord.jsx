// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'



// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const Dashbord = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Dashbord' breadCrumbParent='rol' breadCrumbActive='Role List' />
      {/* <Row>
        <Col sm='12'>
        <StateProvider>
          <TableServerSide />
          </StateProvider>
        </Col>
      </Row> */}
    </Fragment>
  )
}

export default Dashbord
