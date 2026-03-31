// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableServerSide from './tables/tableData/DesignStatasticTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Supplier = () => {
  return (
    <Fragment>
     <Breadcrumbs breadCrumbTitle='Analytics' breadCrumbParent='Analytics' breadCrumbActive='Design Statastic' />
      <Row>
        <Col sm='12'>
          <TableServerSide />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Supplier
