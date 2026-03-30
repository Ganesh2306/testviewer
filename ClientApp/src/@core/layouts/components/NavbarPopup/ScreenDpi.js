import React, { useState } from 'react'

import { Modal, Button, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'

export const ScreenDpi = (props) => {
    /*    const [cpmOpen, setCpm] = useState(false)*/
    return (
        <div>

            <Modal isOpen={props.dpiOpen} toggle={() => props.setdpiOpen(false)} className='modal-md modal-dialog-centered' backdrop='static' >
                <ModalHeader toggle={() => props.setdpiOpen(false)}> Setup Screen DPI</ModalHeader>

                <ModalBody style={{ minHeight: '250px' }}>
                    <Form>
                        
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={() => props.setdpiOpen(false)}>
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}