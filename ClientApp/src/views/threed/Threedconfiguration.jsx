import { Card, Col, Row } from 'reactstrap'
import { Fragment } from 'react'
//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'
// import TableThreedConfiguration from './tables/tableData/TableThreedConfiguration'
import TableConfiguration from './tables/tableData/TableConfiguration'

const ThreedConfiguration = () => {
    return (
         <>
            <Fragment>
             <Breadcrumbs breadCrumbTitle='3D' breadCrumbParent='3D' breadCrumbActive='Threed Product Order' />  
                 <Row>
                   <Col>
                      <Card title='ProductConfigurations'>
                       <TableConfiguration/>
                      </Card>
                   </Col>
               </Row>
            </Fragment>  
         </>
    ) 
  }
  export default ThreedConfiguration