// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import DataTableFavourite from './tables/advance/DataTableFavourite'
import TableServerSide from './tables/advance/TableServerSide'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const Favourite = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Favourite Report' breadCrumbParent='Report' breadCrumbActive='Favourite' />
      <Row>
        <Col sm='12'>
          <StateProvider> 
           <DataTableFavourite/>
          </StateProvider>
        </Col>
      </Row>
    </Fragment>
  )
}

export default Favourite
