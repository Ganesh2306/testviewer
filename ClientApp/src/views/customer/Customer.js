// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './tables/tableData/CustomerTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Organization = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Customer' breadCrumbParent='Customer' breadCrumbActive='Customer List' />
      <Row>
        <Col sm='12'>
          <TableServerSide />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Organization
