// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import UploadDesignContent from './tables/tableData/UploadDesignContent'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const UploadDesign = () => {
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Seasons' breadCrumbParent='Seasonal Collection' breadCrumbActive='Seasons' />
      <Col sm='12' className='px-0 Upload_View_Seasons' id='Upload_View_Seasons'>
        <UploadDesignContent/>
      </Col>   
    </Fragment>
  )
}

export default UploadDesign