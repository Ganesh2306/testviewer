import React, { useState } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Col,
  Row,
  Input,
  Alert 
} from "reactstrap"
import { AlertCircle } from "react-feather"

export const UpdateSuccessPopup = (props) => {

    const [success, setSuccess] = useState(false)

    return (
        <>
            <Modal isOpen={props.modal} toggle={props.toggle} className="modal-md">                
                <center >
                <AlertCircle color='orange' size={100} style={{marginTop:'20px', marginBottom:'5px'}} /> <br />
                    <h1>Your file has been deleted Successfully</h1>
                <br />
                 </center>
                <ModalBody>
                    <div className='float-right'>              
                            <Button color="danger" onClick={props.toggle}>
                            OK
                            </Button> 
                </div>           
          </ModalBody>
      </Modal>
        </>
    )
}