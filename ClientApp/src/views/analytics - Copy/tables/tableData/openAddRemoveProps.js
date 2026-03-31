import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { DualList } from './DualList'
const AddOrRemoveProperties = (props) => {
  

  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Button color="danger"  className="text-nowrap" onClick={toggle}>Add/Remove Design Properties</Button>
      <Modal isOpen={modal} toggle={toggle} className='modal-sm' style={{"min-height":"350px"}}>
        <ModalHeader toggle={toggle}>Add/Remove Properties</ModalHeader>
        <ModalBody >
         <DualList style={{"min-height":"350px"}}/>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>OK</Button>{' '}
          <Button color="danger" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AddOrRemoveProperties