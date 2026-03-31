import { useState } from 'react'

import { Button, Modal, DropdownItem, Form } from 'reactstrap'

import { Edit, Phone, Shield } from 'react-feather'

import ModalBodyDesignType from '../ModelBodyDesignType'
import EditButtonName from '../../../../modal/EditButtonName'
import ModalHeaderUI from '../../../../modal/ModalHeader'
import ModalFooterUI from '../../../../modal/ModalFooter'

// ! Add AddUser function 

const EditDesign = (props) => {
  const [isOpen, setis_open] = useState(false)

  return (
    <>
     <div className="dropdown-item"  onClick={ () => setis_open(true)}>
      <Edit size={15} className="mr-1"/>Edit
    </div>
  {/* <Edit size={15} onClick={ () => setis_open(true)}/> */}
    <Modal isOpen={isOpen} toggle={() => setis_open(false)} className='modal-md'>
    <ModalHeaderUI setis_open={setis_open} headerName="Edit Design" />    
     <Form onSubmit={(e) => {
      //if(ValidateEmail()===true&&Phone()==true)
      setis_open(false)
      e.preventDefault()
      console.log(props.id)
    }}>  
     <ModalBodyDesignType bodyFor="Update" editName = "Update" editLabelName="Edit Design Type" />
     <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
    
    </Form>
  </Modal>   
  </>
  )
}

export default EditDesign

