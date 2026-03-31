import { useState, useEffect } from 'react'
import { Card, CardText, Button, Input, Label, Col, ModalBody } from 'reactstrap'
import ListGroupDesign from './ListGroupDesign'

// ! PopUpBody 
const ModalBodyDesignGroup = ({ editName, editLabelName }) => {
  return (
    < ModalBody >
      <Col className="row form-group">
        <Label className="col-form-Label col-sm-4">{ editLabelName }</Label>
        <Input type="text" className="form-control col-sm-5" id="" placeholder="Add Design Group" maxLength="15" pattern="[A-Za-z]{2,15}"
             />
        <div className="col-sm-3">
            <Button.Ripple color='primary'>
               {editName}  
            </Button.Ripple>
        </div>
      
      </Col>
      <Col className="row form-group">
        <Label className="control-Label col-sm-4">Design Group List</Label>     
        <Card title='Simple List Group' className="col-sm-8 p-0" >          
            <ListGroupDesign className="col-sm-12"/>
          </Card>
      </Col>
    </ModalBody >
  )
}
  
export default ModalBodyDesignGroup
