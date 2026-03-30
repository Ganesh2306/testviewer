import React, {useState} from 'react'
import { Edit, Plus } from 'react-feather'
import { FormGroup, Input, Label, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const ModalCreateCollection = (props) => {
    const [is_open, setis_open] = useState(false)
    const Btn1 = () => {
      return (
        <Button.Ripple color='' className='btn-sm' onClick={() => setis_open(true)} >
            Create Collection
         <Edit size={16} />
         </Button.Ripple>
      )
    }

    const Btn2 = () => {
      return (
        <Button.Ripple color='primary' className='mt-0 btn-sm'  onClick={() => setis_open(true)} >
            <Plus size={14} />
            <span className='align-middle ml-25'>Create Collection</span>
         
        </Button.Ripple>
      )
    }
    return (
        <>      
          <Modal isOpen={props.is_createopen} toggle={() => props.setis_createopen(false)}className='modal-sm modal-dialog-centered'>
           <ModalHeader toggle={() => props.setis_createopen(false)}> Create Collection</ModalHeader>           
           <ModalBody >
            <FormGroup>
                <Label for='nameVertical'>Collection Name</Label>
                <Input type='text' name='col_name' id='nameVertical' placeholder='Collection Name' />
              </FormGroup>
    </ModalBody>


    <ModalFooter>
   <Button color='primary' onClick={() => props.setis_createopen(false)}>
       Save
    </Button>
    </ModalFooter>
         </Modal>
       </>
    )
}
