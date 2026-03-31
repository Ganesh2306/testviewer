//**React Imports */
import { Fragment } from 'react'

//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, CardText } from 'reactstrap'
import Card from '@components/card-snippet'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/drag-and-drop/drag-and-drop.scss'

//**Context  */
import StateProvider from '../context/stateContext'

// ** Tables
import AccordionList from './tables/tableData/AccordionList'
import "./tables/tableData/accordion.css"

const DesignConfiguration = () => {
return (
    <Fragment>
        <Breadcrumbs breadCrumbTitle='Design Configuration' breadCrumbParent='Design Configuration' breadCrumbActive='Design Configuration' />
        <Row>
            <Col sm ='12'> 
            <Card title='Design Configuration'>                    
                <AccordionList/>                          
             </Card>
            </Col>
        </Row>      
    </Fragment>
)
}
export default DesignConfiguration