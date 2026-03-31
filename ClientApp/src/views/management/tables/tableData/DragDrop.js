import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, ListGroupItem, Media } from 'reactstrap'

const array = {
  list1: [
    {
      id: '1',
      content: 'Deskloom Shirting'
    },
    {
      id: '2',
      content: 'Deskloom Shirting'
    },
    {
      id: '3',
      content: 'Deskloom Shirting'
    },
    {
      id: '4',
      content: 'Deskloom Shirting'
    },
    {
      id: '5',
      content: 'Deskloom Shirting'
    }
  ],
  list2: [
    {
      id: '6',
      content: 'Deskloom Shirting'
    },
    {
      id: '7',
      content: 'Deskloom Shirting'
    },
    {
      id: '8',
      content: 'Deskloom Shirting'
    },
    {
      id: '9',
      content: 'Deskloom Shirting'
    },
    {
      id: '10',
      content: 'Deskloom Shirting'
    }
  ]
}

const spanStyles = { 
    borderColor: "#000",
    borderWidth: 1,
    borderStyle:"solid",
    height:250,
    overflowY:"scroll"
  }

const DndMultiple = () => {
  const [listArr1, setListArr1] = useState(array.list1)
  const [listArr2, setListArr2] = useState(array.list2)

  return (
    <Card className="shadow-none">     
      <CardBody>        
        <Row>
          <Col md='6' sm='12' className="card">
            <h4 className='my-1'>Not Assigned</h4>
            <ReactSortable
              tag='ul'
              className='list-group list-group-flush sortable'
              group='shared-group'
              list={listArr1}
              setList={setListArr1}
              style={spanStyles} 
            >
              {listArr1.map(item => {
                return (
                  <ListGroupItem className='draggable' key={item.id}>
                    <Media>                    
                      <Media body>
                        <h5 className='mt-0'>{item.name}</h5>
                        {item.content}
                      </Media>
                    </Media>
                  </ListGroupItem>
                )
              })}
            </ReactSortable>
          </Col>
          <Col md='6' sm='12' className="Card">
            <h4 className='my-1'>Assigned</h4>
            <ReactSortable
              tag='ul'
              className='list-group list-group-flush sortable'
              group='shared-group'
              list={listArr2}
              setList={setListArr2}
              style={spanStyles} 
            >
              {listArr2.map(item => {
                return (
                  <ListGroupItem className='draggable' key={item.id}>
                    <Media>               
                      <Media body>
                        <h5 className='mt-0'>{item.name}</h5>
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

export default DndMultiple
