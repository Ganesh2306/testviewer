import { icon } from 'leaflet'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "react-datepicker/dist/react-datepicker.css"
import { CheckSquare } from 'react-feather'
import { Col, Modal, Button, ModalHeader, ModalBody, ModalFooter, Row, Form, mark } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const MySwal = withReactContent(Swal)

export const SuccessPasswordChange = (props) => {
    const history = useHistory()
    return (
        <div>
            <Modal isOpen={props.successPassword} toggle={() => props.setsuccessPassword(false)} className='modal-sm modal-dialog-centered' backdrop='static' >               

                <ModalBody style={{ minHeight: '150px' }}>
                    <Form className='text-center my-2'>
                        <Row>

                            <Col sm='12' className='mb-1'>
                                <h4><CheckSquare className='mr-2' />Password changed Successfully!</h4>
                                <p className='mb-1'>Please login to your account</p>
                            </Col>
                            <Col sm='12'>
                                <Button color='primary' onClick={() => {
                                    props.setsuccessPassword(false)
                                    history.push('/login')
                                }} >
                                   OK
                                </Button>
                            </Col>
                        </Row>

                       
                    </Form>
                </ModalBody>
                
            </Modal>
        </div>
    )
}
