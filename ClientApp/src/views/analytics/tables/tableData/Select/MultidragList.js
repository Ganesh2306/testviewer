import { useState } from 'react'
import { ReactSortable, Sortable, MultiDrag } from 'react-sortablejs'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, ListGroupItem, Media } from 'reactstrap'

const array = {
  list1: [
    {
      id: '1', 
      name: 'Mary S. Navarre'
  
    },
    {
      id: '2',  
      name: 'Samuel M. Ellis'
  
    },
    {
      id: '3',  
      name: 'Sandra C. Toney'
 
    },
    {
      id: '4',     
      name: 'Cleveland C. Goins'      
    },
    {
      id: '5', 
      name: 'Linda M. English'  
    }
  ],
  list2: [
    {
      id: '6',     
      name: 'Alexandria I. Smelser'
    
    },
    {
      id: '7', 
      name: 'Oscar N. Pool'
  
    },
    {
      id: '8', 
      name: 'Kathy A. Alvarado'
    },
    {
      id: '9',
      name: 'James E. White'
     
    },
    {
      id: '10',     
      name: 'Roberta R. Babin'
    }
  ]
}

// Sortable.mount(new MultiDrag())
const MultidragList = () => {
  const [listArr1, setListArr1] = useState(array.list1)
  const [listArr2, setListArr2] = useState(array.list2)

  return (
    <Card className="shadow-none">    
      <CardBody  className='m-0 px-0'>   
        <Row className='m-0'>
          <Col md='6' sm='12' className='pl-0'>         
            <ReactSortable
              tag='ul'
              multiDrag
              className='list-group list-group-flush sortable '
              group='shared-multi-drag-group'
              list={listArr1}
              setList={setListArr1}
              style={{border:'1px solid rgba(34, 41, 47, 0.125)', height:'320px', overflowY:'auto'}}
            >
              {listArr1.map(item => {
                return (
                  <ListGroupItem className='draggable' key={item.id} >
                    <Media>                    
                      <Media body>
                        <h6 className='mt-0'>{item.name}</h6>
                        {item.content}
                      </Media>
                    </Media>
                  </ListGroupItem>
                )
              })}
            </ReactSortable>
          </Col>
          <Col md='6' sm='12' className='pr-0'>         
            <ReactSortable
              tag='ul'
              className='list-group list-group-flush sortable'
              group='shared-multi-drag-group'
              list={listArr2}
              setList={setListArr2}
              style={{border:'1px solid rgba(34, 41, 47, 0.125)', height:'320px'}}
            >
              {listArr2.map(item => {
                return (
                  <ListGroupItem className='draggable' key={item.id} >
                    <Media>           
                      <Media body>
                        <h6 className='mt-0'>{item.name}</h6>
                        {item.content}
                      </Media>
                    </Media>
                  </ListGroupItem>
                )
              })}
            </ReactSortable>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default MultidragList
