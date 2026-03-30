import React, {useState} from 'react'
import { Copy } from 'react-feather'

import { FormGroup, Input, Label, Modal, Button, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap'
import MultiSelectCollection from './multiselect/MultiSelectCollection'
import MultiSelectClient from './multiselect/MultiSelectClient'

export const ModalAssignCollection = (props) => {
  const ranges = [
    {
      label: 'Now',
      value: new Date()
    }
  ]
    //const [is_open, setis_open] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    return (
        <div style={{position:'absolute', zIndex:'999'}}> 
         <Modal isOpen={props.is_open} toggle={() => props.setis_open(false)} className='modal-sm modal-dialog-centered' backdrop="static" >
           <ModalHeader toggle={() => props.setis_open(false)}> Assign Collection</ModalHeader>
           
           <ModalBody style={{minHeight:'300px'}}>
         
                 <FormGroup>
                   <Label for='nameVertical'>Collection Name</Label>
                   <MultiSelectCollection/>
                 </FormGroup>
         
                 <FormGroup>
                 <Label for="assignedTo">Assigned To</Label>
                  <MultiSelectClient/>
                 </FormGroup>
                 <FormGroup>
                   <Label for='assigneeVertical'>Assignee</Label>
                   <select  className="form-control" id="assigneeVertical" name="assignee" >
                  <option value="Ashwini">Ashwini</option>
                  <option value="Asmita">Asmita</option>
                  <option value="Jagruti">Jagruti</option>
                  <option value="Laxman">Laxman</option>
              </select>
                 </FormGroup>
              <FormGroup>  
                <Label for="div_accDate">Enable From</Label>        
                <Row className="form-group col-sm-12">
                <Input type='date' className="city col-sm-5" id='acc_fromDate' />
                 <Input type='date' dateFormat="dd/MM/yyyy" className="city col-sm-5 offset-sm-1" id='acc_toDate' />
                </Row>
              </FormGroup> 
              <FormGroup className="mb-0">  
              <Row className="form-group mb-0">
                <FormGroup className="city col-sm-5">
                   <Label for='sTime'>Start Time</Label>
                   {/* <Input type='text' name='col_name' id='sTime' placeholder='Start Time' /> */}
                   {/* <DatePicker id="sTime" className="form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="h:mm aa"
                    showTimeInput
                    showTimeSelectOnly
    /> */}
                   </FormGroup>
                 <FormGroup className="city col-sm-5">
                   <Label for='eTime'>End Time</Label>
                   {/* <DatePicker id="eTime" className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="h:mm aa"
                    showTimeInput
                    showTimeSelectOnly
    /> */}
                 </FormGroup>
                </Row>
              </FormGroup> 
              <FormGroup className="mb-0">
                <Label for="description">Allow people to view a read-only Collection by sending this link:</Label>
             <div className='d-flex '>  
              <Input type="text" name="text" id="linkcollection"/>    
              <Copy className='m-50 cursor text-primary'/>
            </div>
    
      </FormGroup>
      </ModalBody>

    <ModalFooter>
    <Button color='primary' onClick={() => props.setis_open(false)}>
      Share
    </Button>
    </ModalFooter>
         </Modal>
       </div>
    )
}
