import React, { useState } from "react"
import {
    Button,
    Modal,
    ModalBody
} from "reactstrap"
import { AlertCircle } from "react-feather"

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

export const DeleteDesigns = (props) => {
    const [Success, setSuccess] = useState(false)
    return (
        <>
            <Modal isOpen={props.deletewishmodal} toggle={props.deletewish} className="modal-md">

                <center >
                    <AlertCircle color='orange' size={100} style={{ marginTop: '20px', marginBottom: '5px' }} /> <br />
                    <h1>Are You Sure?</h1>
                    <br />
                    <h5>Designs of this User will be permanently deleted!</h5>
                </center>
                <ModalBody>
                    <div className='float-right'>
                        <Button color="primary" onClick={props.deletetoggle}>
                            Cancel
                        </Button>
                        <Button color="light" className='m-1' onClick={() => {
                            setSuccess(true)
                            props.deletetoggle()
                        }}>
                            Yes, delete it!
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <SuccessDeletePopup Success={Success} SuccessToogle={() => {
                setSuccess(false)
            }} />
        </>
    )
}
