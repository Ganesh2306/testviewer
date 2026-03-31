//**React Imports */
import { Fragment } from 'react'

//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

//**Context  */
import StateProvider from '../context/stateContext'

// ** Tables
import ModelBodyDesignType from './tables/tableData/ModelBodyDesignType'

const DesignType = () => {
return (
    <Fragment>
        <Breadcrumbs breadCrumbTitle='Design Configuration' breadCrumbParent='Design Configuration' breadCrumbActive='Design Type' />
        <Row>
            <Col sm ='12'>
                <StateProvider>
                 <ModelBodyDesignType/>   
                </StateProvider>
            </Col>
        </Row>
    </Fragment>
)
}
export default DesignType