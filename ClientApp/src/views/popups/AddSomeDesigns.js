import React, { useState } from "react"
import {
    Button,
    Modal,
    ModalBody
} from "reactstrap"
import { AlertCircle, AlertTriangle } from "react-feather"

const SuccessDeletePopup = (props) => {
    return (
        <Modal isOpen={props.Success} toggle={props.SuccessToogle} className="modal-md mt-4">
            <center >
                <h1 style={{ marginTop: '20px', marginBottom: '5px' }} >Success</h1>
                <br />
                <h5>Designs of this User will be permanently deleted!</h5>
            </center>
            <ModalBody>
                <center>
                    <Button color="primary" onClick={props.SuccessToogle}>
                        OK
                    </Button>
                </center>
            </ModalBody>

        </Modal>
    )
}

export const AddSomeDesigns = (props) => {
    
    return (
        <>
            <Modal isOpen={props.addSome} toggle={props.toggleaddSome} className="modal-md mt-4">
            <center >
                <h1 style={{ marginTop: '20px', marginBottom: '5px' }} ><AlertTriangle size={24}/> Error</h1>
                <br />
                <h5> Please make sure you have applied filter category</h5>
            </center>
            <ModalBody>
                <center>
                    <Button color="primary" onClick={props.toggleaddSome}>
                        OK
                    </Button>
                </center>
            </ModalBody>

          </Modal>
        </>
    )
}
