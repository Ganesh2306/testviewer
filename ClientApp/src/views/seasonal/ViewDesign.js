// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import ViewDesignContent from './tables/tableData/ViewDesignContent'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'


/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const ViewDesign = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Seasons' breadCrumbParent='Seasonal Collection' breadCrumbActive='Seasons' />
      <Col sm='12' className='px-0'>
        <ViewDesignContent/>
      </Col> 
    </Fragment>
  )
}

export default ViewDesign