import React, { useState, useRef, useEffect } from 'react'

import { FormGroup, Input, Label, Col, Modal, Button, ModalHeader, ModalBody, ModalFooter, Row, DropdownItem, Form, FormFeedback, InputGroupAddon, InputGroupText } from 'reactstrap'
//import InputPasswordToggle from '@components/input-password-toggle'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { handleLogout } from '@store/actions/auth'
import { logoutUser } from './../../store/action'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Eye, EyeOff } from 'react-feather'
import { keyCodes } from 'reactstrap/lib/utils'

const Swal = require('sweetalert2')
export const ModelPasswordChange = (props) => {
    /*    const [successPassword, setsuccessPassword] = useState(false)*/
    
    // ** State
    const [inputVisibility, setInputVisibility] = useState(false)
    const [inputVisibilityB, setInputVisibilityB] = useState(false)
    const [inputVisibilityC, setInputVisibilityC] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()
    const changepassword = yup.object().shape({
        newpassword: yup.string().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        oldpassword: yup.string(),
        retypenewpassword: yup.string()
            .oneOf([yup.ref('newpassword'), null], 'Passwords must match')
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(changepassword) })
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
                            history.push('/login')
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
    
    // ** Renders Icon Based On Visibility
    const renderIcon = (isVisible) => {
        return isVisible ? <Eye size={14} /> : <EyeOff size={14} />      
    }
    const errorPositionStyle = errors.newpassword ? { top: '50%' } : {}

    const errorPositionStyleB = errors.retypenewpassword ? { top: '50%' } : {}

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
                                    <div className="passwordContainer">
                                        <Input
                                            label='Old Password'
                                            htmlFor='oldpassword'
                                            name='oldpassword'
                                            type={inputVisibilityC === false ? 'password' : 'text'}
                                            innerRef={register({ required: true })}
                                            invalid={errors.newpassword && true}
                                        />
                                        <InputGroupAddon addonType='append' onClick={() => setInputVisibilityC(!inputVisibilityC)} style={{top :'50%'}}>
                                            <InputGroupText className='cursor-pointer passwordContainerInner'>{renderIcon(inputVisibilityC)}</InputGroupText>
                                        </InputGroupAddon>
                                    </div>
                                   
                                   <div>
                                      {/* <small className='msg-error mt-1'>The old Password you entered does not match your current password</small>*/}
                                    </div>
                                    
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <FormGroup>
                                    <div className="passwordContainer">
                                    <Label>New Password</Label>
                              
                                    <Input
                                        label='New Password'
                                        htmlFor='newpassword'
                                        name='newpassword'                      
                                        type={inputVisibility === false ? 'password' : 'text'}
                                        innerRef={register({ required: true })}
                                        invalid={errors.newpassword && true}
                                        />
                                  
                                        <InputGroupAddon addonType='append' onClick={() => setInputVisibility(!inputVisibility)} style={errorPositionStyle}>
                                            <InputGroupText className='cursor-pointer passwordContainerInner'>{renderIcon(inputVisibility)}</InputGroupText>
                                        </InputGroupAddon>
                                        {errors && errors.newpassword && <FormFeedback>{errors.newpassword.message}</FormFeedback>}
                                    </div>
                                  
                                </FormGroup>
                               
                            </Col>
                            <Col sm='12'>
                                <FormGroup>
                                    <div className="passwordContainer">
                                    <Label>Retype New Password</Label>                                   
                                    <Input
                                        label='Retype New Password'
                                        htmlFor='retypenewpassword'
                                        type={inputVisibilityB === false ? 'password' : 'text'}
                                        name='retypenewpassword' 
                                        innerRef={register({ required: true })}
                                        invalid={errors.retypenewpassword && true}
                                        />
                                        <InputGroupAddon addonType='append' onClick={() => setInputVisibilityB(!inputVisibilityB)} style={errorPositionStyleB}>
                                            <InputGroupText className='cursor-pointer passwordContainerInner'>{renderIcon(inputVisibilityB)}</InputGroupText>
                                        </InputGroupAddon>
                                        {errors && errors.retypenewpassword && <FormFeedback>{errors.retypenewpassword.message}</FormFeedback>}
                                    </div>
                                   
                                </FormGroup>
                               
                            </Col>                           
                        </Row>
                    
                </ModalBody>
                <ModalFooter>
                    <Button innerRef={cpbtn} color='primary' type="submit" onClick={() => {

                    }}>
                        Save
                    </Button> 
                    </ModalFooter>
                    </Form>
            </Modal>
            </div>

    )
}
/*props.setCpm(false)*/