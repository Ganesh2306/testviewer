// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './tableData/OrganizationTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Organization = () => {
    console.log("Parent")
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Organization' breadCrumbParent='Organization' breadCrumbActive='Organization List'/>
      <Row>
        <Col sm='12'>
          <TableServerSide />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Organization
