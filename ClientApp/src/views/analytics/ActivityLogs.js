import { Fragment } from "react"

//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, Label, Input, Button } from 'reactstrap'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

// ** Tables
import TableAnalytic from './tables/tableData/TableAnalytic'

const AnalyticLogs = () => {

    return (
     <Fragment>
        <Breadcrumbs breadCrumbTitle='Analytic' breadCrumbParent='Analytic' breadCrumbActive='Activity Logs' />
        <Row> 
            <Col sm ='12'>
                <StateProvider>
                 <TableAnalytic/>   
                </StateProvider>
            </Col>
        </Row>
    </Fragment>
    )
}

export default AnalyticLogs