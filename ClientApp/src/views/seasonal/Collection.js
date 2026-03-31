// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableCollection from './tables/tableData/TableCollection'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const Collection = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Collections' breadCrumbParent='Seasonal Collection' breadCrumbActive='Collections' />
      <Row>
        <Col sm='12'>
        <StateProvider>
          <TableCollection />
          </StateProvider>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Collection