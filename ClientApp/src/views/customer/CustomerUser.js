// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './tables/tableData/CustomerUserTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const OrganizationUser = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Customer' breadCrumbParent='Customer' breadCrumbActive='Customer User List' />
      <Row>
        <Col sm='12'>
          <TableServerSide />
        </Col>
      </Row>
    </Fragment>
  )
}

export default OrganizationUser
