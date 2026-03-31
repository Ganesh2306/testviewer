import { useState, useRef } from 'react'

import { Button, Modal, DropdownItem, Form } from 'reactstrap'

import { Delete, Edit, Phone, Shield } from 'react-feather'

import ModalBodyDesignFeature from '../ModalBodyDesignFeature'

import ModalHeaderUI from '../../../../modal/ModalHeader'
import ModalFooterUI from '../../../../modal/ModalFooter'

// ! Add AddUser function 

const EditFeature = (props) => {
  //ToDo :- Temp Fix -- // Chnage it when have time 
  const saveBtnRef = useRef(null) 
  return (
    <>
          <Modal isOpen={props.isOpen1}  className='modal-lg'>
              <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Feature" />
    <Form onSubmit={(e) => {
      setis_open(false)
      e.preventDefault()
    }}>
                  <ModalBodyDesignFeature saveBtnRef={saveBtnRef} setis_open={props.setOpen1} selectedFeature={props.obj} bodyFor="Update" editName = "Update" editLabelName = "Design Feature Name" editLabelList ="Design Feature List" />
                  {/* <ModalFooterUI saveBtnRef={saveBtnRef} setis_open={props.isOpen1} FooterBtnName="Save" /> */}
    </Form>
  </Modal>   
  </>
  )
}

export default EditFeature

