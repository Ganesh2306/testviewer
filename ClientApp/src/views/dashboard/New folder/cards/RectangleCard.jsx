import Chart from 'react-apexcharts'
import { Card, CardTitle, CardText, CardBody, Row, Col } from 'reactstrap'

import { Heart, MapPin, Eye, ShoppingCart, Layers } from 'react-feather'

import Avatar from '@components/avatar'

const RectangleCard = ({ success }) => {
  
  const style = {
    //margin:'10px 10px 10px 40px ',
   // padding: '0px 10px 0px 0px'
   
  }
   //const colval = 'rectangle-card col-3'
   const colval = 'rectangle-card col-4'
   
  return (
    <>
    <Card className={colval} style={style}>
      <CardBody>
        <Row>
        <Col xs='6'>
        <Avatar size='xl' colors='green' icon={<MapPin size={90} />} />
          </Col>
          <Col xs='6'>
            <CardTitle className='mb-1'>Location &nbsp;&nbsp;Visit</CardTitle>
            <div className='font-small-2'> Total Visit</div>
            
            <h5 className='mb-1'>&nbsp;&nbsp; 112</h5>
            
            </Col>
        </Row>
      </CardBody>
      
    </Card>

    <Card className={colval} style={style} >
      <CardBody>
        <Row>
        <Col xs='6'>
        <Avatar size='xl' icon={<Eye size={90} />} />

          </Col>
          <Col xs='6'>
            <CardTitle className='mb-1'>Design &nbsp;&nbsp;View</CardTitle>
            <div className='font-small-2'> Total View</div>
            <h5 className='mb-1'>&nbsp;&nbsp;1958</h5>
            </Col>
        </Row>
      </CardBody>
      
    </Card>

    <Card className={colval} style={style} >
      <CardBody>
        <Row>
        <Col xs='6'>
        <Avatar size='xl' icon={<Heart size={90} />} />

          </Col>
          <Col xs='6'>
            <CardTitle className='mb-1'>&nbsp;Design Favourite</CardTitle>
            <div className='font-small-2'> Total Favourite</div>
            <h5 className='mb-1'>&nbsp;&nbsp;12547</h5>
            </Col>
        </Row>
      </CardBody>
      
    </Card>

    <Card className={colval} style={style} >
      <CardBody>
        <Row>
        <Col xs='6'>
        <Avatar size='xl' icon={<ShoppingCart size={90} />} />

          </Col>
          <Col xs='6'>
            <CardTitle className='mb-1'>Design &nbsp; &nbsp;Cart</CardTitle>
            <div className='font-small-2'> Total Orders</div>
            <h5 className='mb-1'>&nbsp;&nbsp;5482</h5>
            </Col>
        </Row>
      </CardBody>
      
    </Card>

    <Card className={colval} style={style} >
      <CardBody>
        <Row>
        <Col xs='6'>
        <Avatar size='xl' icon={<Layers size={90} />} />

          </Col>
          <Col xs='6'>
            <CardTitle className='mb-1'>&nbsp;Design Quantity</CardTitle>
            <div className='font-small-2'> Total Order &nbsp;Quantity</div>
            <h5 className='mb-1'>&nbsp;&nbsp;124K</h5>
            </Col>
        </Row>
      </CardBody>
      
    </Card>

    </>
    
  )
}

export default RectangleCard
