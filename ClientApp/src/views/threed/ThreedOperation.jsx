import { Card, Col, Row } from 'reactstrap'
import { Fragment } from 'react'
//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'
import ConfigurationCheck from './configuration/ConfigurationCheck'

const ThreedOperation = () => {
  return (
       <>
          <Fragment>
           <Breadcrumbs breadCrumbTitle='3D' breadCrumbParent='3D' breadCrumbActive='3D Operations' />  
               <Row>
                 <Col>
                    <Card title='ConfigurationCheck'>
                       <ConfigurationCheck/>         
                    </Card>
                 </Col>
             </Row>
          </Fragment>  
       </>
  ) 
}
export default ThreedOperation