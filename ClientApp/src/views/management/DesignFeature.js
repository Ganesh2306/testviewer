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
import DesignFeatureTable from './tables/tableData/DesignFeatureTable'


const DesignFeature = () => {
return (
    <Fragment>
        <Breadcrumbs breadCrumbTitle='Design Configuration' breadCrumbParent='Design Configuration' breadCrumbActive='Design Feature' />
        <Row>
            <Col sm ='12'>
                <StateProvider>
                 <DesignFeatureTable/>   
                </StateProvider>
            </Col>
        </Row>
    </Fragment>
)
}
export default DesignFeature