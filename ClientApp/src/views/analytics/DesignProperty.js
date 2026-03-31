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
import TableProperty from "./tables/tableData/TableProperty"

const AnalyticDesignProperty = () => {

    return (
        <Fragment>
        <Breadcrumbs breadCrumbTitle='Analytic' breadCrumbParent='Analytic' breadCrumbActive='Design Property' />
        <Row> 
            <Col sm ='12'>
                <StateProvider>
                 <TableProperty/>   
                </StateProvider>
            </Col>
        </Row>
    </Fragment>
    )
}

export default AnalyticDesignProperty