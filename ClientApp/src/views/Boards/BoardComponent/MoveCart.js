import React, { useState } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from "reactstrap"
import { AlertCircle } from "react-feather"

const MovedtoCart = (props) => {
    return (
        <Modal isOpen={props.Success} toggle={props.SuccessToogle} className="modal-md mt-4">
            <center ><h1 style={{ marginTop: '20px', marginBottom: '5px' }} >Successfully Added to Cart</h1>
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

export const MoveallCart = (props) => {
    const [Success, setSuccess] = useState(false)
    return (
        <>
            <Modal isOpen={props.movemodal} toggle={props.movecancel} className="modal-md">

                <center >
                    <AlertCircle color='orange' size={100} style={{ marginTop: '20px', marginBottom: '5px' }} /> <br />
                    <h1>Are You Sure?</h1>
                    <br />
                    <h5>Do you want to Move Designs Add to Cart?</h5>
                </center>
                <ModalBody>
                    <div className='float-right'>
                        <Button color="light" onClick={props.movecancel}>
                            Cancel
                        </Button>
                   
                        <Button color="primary" className='m-1' onClick={() => {
                            setSuccess(true)
                            props.movecancel()
                        }}>
                          Yes, Move to Cart
                        </Button>
                    </div>
                </ModalBody>
            </Modal>

            <MovedtoCart Success={Success} SuccessToogle={() => {
                setSuccess(false)
            }} />
        </>
    )
}
