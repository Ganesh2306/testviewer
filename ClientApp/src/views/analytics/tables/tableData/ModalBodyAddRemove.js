import { useState, useEffect } from 'react'
import { Card, CardText, Button, Input, Label, Col, ModalBody } from 'reactstrap'
import MultidragList from './Select/MultidragList'

// ! PopUpBody 
const ModalBodyAddRemove = ({ editName, editLabelName  }) => {
  const [isOpen, setis_open] = useState(false)

  return (
    < ModalBody >  
      <Col className="row form-group m-0">      
        <Card title='Simple List Group' className="col-sm-12 p-0 shadow-none" >          
        <MultidragList />
          </Card>
      </Col>
    </ModalBody >
  )
}

export default ModalBodyAddRemove
