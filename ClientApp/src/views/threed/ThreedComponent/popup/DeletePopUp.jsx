import React, { useState } from "react"
import {
    Button,
    Modal,
    ModalBody
} from "reactstrap"
import { AlertCircle } from "react-feather"
import axios from 'axios'
import Swal from "sweetalert2"


const CanCelPopUp = (props) => {
    return (
        <Modal isOpen={props.Cancel} toggle={props.CancelToogle} className="modal-md mt-4">
            <center ><h1 style={{ marginTop: '20px', marginBottom: '5px' }} >Your Design is Safe</h1>
            </center>
            <ModalBody>
                <center>
                    <Button color="success" onClick={props.CancelToogle}>
                        OK
                    </Button>
                </center>


            </ModalBody>

        </Modal>
    )
}


export const DeletePopUp = (props) => {

    const [Cancel, setCancel] = useState(false)
    const [delmsg, setdelmsg] = useState("")
    return (
        <>
            <Modal isOpen={props.modal} toggle={props.toggle} className="modal-md" id="deletepopup">

                <center >
                    <AlertCircle color='orange' size={100} style={{ marginTop: '20px', marginBottom: '5px' }} /> <br />
                    <h1>Are You Sure?</h1>
                    <br />
                    <h5>You want to delete this ?</h5>
                </center>
                <ModalBody>
                    <div className='float-right'>
                        <Button color="success" className='m-1' onClick={() => {
                            axios.post(`./ThreeD/TdSaveImageConfigurations`, props.delobj).then(res => {
                                const result = JSON.parse(res.data)
                                const popmsg = result.message ? result.message : "3D Image has been Deleted"
                                setCancel(true)
                                props.toggle()
                                Swal.fire({
                                    position: 'center',
                                    icon: 'info',
                                    title: popmsg
                                })
                                props.forceRerender()

                            })
                        }}>
                            Yes, delete it!
                        </Button>

                        <Button color="danger" onClick={() => {
                            props.toggle()
                            // Swal.fire({
                            //     position: 'center',
                            //     icon: 'info',
                            //     title: 'Your Design is Safe'
                            // })
                        }}>
                            Cancel
                        </Button>

                    </div>
                </ModalBody>

            </Modal>

            {/* <CanCelPopUp Cancel={ Cancel } CancelToogle={ () => {
          setCancel(false)
      }} /> */}

        </>
    )
}