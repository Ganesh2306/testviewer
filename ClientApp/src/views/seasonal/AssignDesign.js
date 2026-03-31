// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Label, Input, Button, Table } from 'reactstrap'

// ** Tables
import AssignDesignContent from './tables/tableData/AssignDesignContent'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

//**component design */

import Design from '../design/Design'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const AssignDesign = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Assign Design' breadCrumbParent='Seasonal Collection' breadCrumbActive='Assign Design' />
      <Col sm='12' className='season_module_assign px-0' id='season_module_assign'>
              <AssignDesignContent />
      </Col>    
    </Fragment>
  )
}

export default AssignDesign