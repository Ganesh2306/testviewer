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
import ModelBodyDesignGroup from './tables/tableData/ModelBodyDesignGroup'

const DesignGroup = () => {
return (
    <Fragment>
        <Breadcrumbs breadCrumbTitle='Design Configuration' breadCrumbParent='Design Configuration' breadCrumbActive='Design Group' />
        <Row>
            <Col sm ='12'>
                <StateProvider>
                 <ModelBodyDesignGroup/>   
                </StateProvider>
            </Col>
        </Row>
    </Fragment>
)
}
export default DesignGroup