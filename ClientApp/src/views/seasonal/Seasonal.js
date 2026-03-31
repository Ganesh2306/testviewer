// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Tables
import TableSeason from './tables/tableData/TableSeason'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { selection } from '../design/DesignComponent/Utility/selection'

//**Context  */
import StateProvider from '../context/stateContext'
/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
//const [Seasonlist, setSeasonlist] = useState(false)
const Seasonal = () => {
  useEffect(() => {
    return () => {
      selection.reMoveAll()
    }
  }, [])
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Seasons' breadCrumbParent='Seasonal Collection' breadCrumbActive='Seasons' />
      <Row>
        <Col sm='12'>
        <StateProvider>
          <TableSeason />
          </StateProvider>
        </Col>
      </Row>
    </Fragment>
  )
}
  
export default Seasonal