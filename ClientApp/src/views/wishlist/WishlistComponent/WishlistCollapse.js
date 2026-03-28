import { Card, CardHeader, CardBody, Col } from 'reactstrap'
import Wishmenu from './Wishmenu'

const AppCollapse = props => {
  // ** Props
  const { data, titleKey, contentKey} = props

  // ** Function to render collapse
  const renderData = () => {
    return data.map((item, index) => {
      const title = titleKey ? item[titleKey] : item.title,
        content = contentKey ? item[contentKey] : item.content
        return (
            <Col md={12} className='p-0'>
                <Card className='border-0'    
                  key={index}
                        >
                    <CardHeader className='px-0 py-1 d-flex justify-content-between'>
                        <h4 className='text-black'
                                        >{title}<small> {'(20 Designs)'} </small>
                        </h4>
                        <div className='d-flex'>                          
                            <Wishmenu></Wishmenu>
                        </div>
                          
                       </CardHeader>
                
                      <CardBody className='px-0'>{content}</CardBody>       
                </Card>
            </Col>
      )
    })
  }

  return (
    <div >
      {renderData()}
    </div>
  )
}
export default AppCollapse
