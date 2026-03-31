import React, { useState, useRef, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"
import { FormGroup, Input, Label, Col, Modal, Button, ModalHeader, ModalBody, ModalFooter, Row, DropdownItem, Form, FormFeedback } from 'reactstrap'
//import InputPasswordToggle from '@components/input-password-toggle'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../store/action'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const Swal = require('sweetalert2')
export const ModelPasswordChange = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const ChangePassword = yup.object().shape({
        oldpassword: yup.string().required('Old-Password is required'),
        newpassword: yup.string().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        retypenewpassword: yup.string()
            .oneOf([yup.ref('newpassword'), null], 'Passwords must match').required('Password is required')
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(ChangePassword) })
    //const fileRef = useRef()

    const onSubmit = data => {
        const _Organisation = new Object()
        _Organisation.oldpassword = data.oldpassword
        _Organisation.newpassword = data.newpassword
        axios
            .post('./Login/ChangePassword', _Organisation)
            .then(response => {
                const Isave = response.data.isaveNotMAth
                if (!Isave) {
                    Swal.fire(
                        'warning',
                        'old password not match',
                        'warning'
                    )
                } else if (JSON.parse(response.data.result).isSave) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Password Updated Successfully!!',
                        icon: 'Success',
                        timer: '3000',
                        button: 'mood-btn'
                    }).then(() => {
                        const role = JSON.parse(localStorage.getItem('userData')).role
                        localStorage.clear()
                        logoutUser({ role })
                            .then(() => {
                                dispatch(handleLogout)
                                history.push('/dashboard')
                            })
                    })
                }

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
    const cpbtn = useRef(null)

    const ExternalClickEvent = (event) => {
        if (cpbtn.current !== null && event.keyCode === 13) {
            cpbtn.current.click()
        }
    }

    useEffect(() => {
       
        if (props.cpmOpen) {
            document.addEventListener('keydown', ExternalClickEvent)
        } else {
            document.removeEventListener('keydown', ExternalClickEvent)
        }


      return () => {   

      }
    }, [props.cpmOpen])


    return (
        <div>
            <Modal isOpen={props.cpmOpen} toggle={() => props.setCpm(false)} className='modal-sm modal-dialog-centered' backdrop='static' >
                <ModalHeader toggle={() => props.setCpm(false)}> Change Password</ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody style={{ minHeight: '250px' }}>

                        <Row>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label>Old Password</Label>
                                    <Input
                                        label='Old Password'
                                        htmlFor='oldpassword'
                                        name='oldpassword'
                                        type='password'
                                        innerRef={register({ required: true })}
                                        invalid={errors.oldpassword && true}
                                    />
                                    {errors && errors.oldpassword && <FormFeedback>{errors.oldpassword.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label>New Password</Label>
                                    <Input
                                        label='New Password'
                                        htmlFor='newpassword'
                                        name='newpassword'
                                        type='password'
                                        innerRef={register({ required: true })}
                                        invalid={errors.newpassword && true}
                                    />
                                    {errors && errors.newpassword && <FormFeedback>{errors.newpassword.message}</FormFeedback>}
                                </FormGroup>
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <Label>Retype New Password</Label>
                                    <Input
                                        label='Retype New Password'
                                        htmlFor='retypenewpassword'
                                        type='password'
                                        name='retypenewpassword'
                                        innerRef={register({ required: true })}
                                        invalid={errors.retypenewpassword && true}
                                    />
                                    {errors && errors.retypenewpassword && <FormFeedback>{errors.retypenewpassword.message}</FormFeedback>}

                                </FormGroup>
                            </Col>
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        <Button innerRef={cpbtn} color='primary' type="submit" onClick={() => {          
                        }}>
                            Save
                        </Button>
                        {/* <button type="button" onClick={*/}
                        {/*    async () => {*/}
                        {/*       */}
                        {/*        const pass = await axios.post("./Login/ChangePassword", {})*/}
                        {/*        console.log(pass)*/}
                        {/*    }*/}
                        {/*}>click Me</button>*/}
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
/*props.setCpm(false)*/