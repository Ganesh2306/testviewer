import React, { useState } from "react"
import {
    Button,
    Modal,  
    ModalBody
} from "reactstrap"
import { AlertCircle } from "react-feather"

const SuccessMovedBoard = (props) => {
    return (
        <Modal isOpen={props.Success} toggle={props.SuccessToogle} className="modal-md mt-4">
            <center >
                <h1 style={{ marginTop: '20px', marginBottom: '5px' }} >Success</h1>
                <br />
                <h5>Designs of this Board are copied to Board!</h5>
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

export const DesignsCopyBoard = (props) => {
    const [Success, setSuccess] = useState(false)
    return (
        <>
            <Modal isOpen={props.Copydesignmodal} toggle={props.designcanceltoggle} className="modal-md">

                <center >
                    <AlertCircle color='orange' size={100} style={{ marginTop: '20px', marginBottom: '5px' }} /> <br />
                    <h1>Are You Sure?</h1>
                    <br />
                    <h5>Do you want to Copy Designs to Board?</h5>
                </center>
                <ModalBody>
                    <div className='float-right'>
                        <Button color="primary" onClick={props.designcanceltoggle}>
                            Cancel
                        </Button>
                        <Button color="light" className='m-1' onClick={() => {
                            setSuccess(true)
                            props.designcanceltoggle()
                        }}>
                            Yes, Copy it!
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <SuccessMovedBoard Success={Success} SuccessToogle={() => {
                setSuccess(false)
            }} />
        </>
    )
}
