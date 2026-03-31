import React, { useState, useEffect } from 'react'
import { Edit } from 'react-feather'
import "react-datepicker/dist/react-datepicker.css"
import Avatar from '@components/avatar'
import { FormGroup, Input, Label, Col, Button, ModalBody, Form, FormFeedback } from 'reactstrap'

const ModalBodyUIProfile = (props) => {
    const [img, setImg] = useState(null)
    const onChange = e => {
        if ((e.target.files[0].size / 1024 / 1024) < 0.2510) {
            const reader = new FileReader(),
                files = e.target.files
            reader.onload = function () {
                setImg(reader.result)
            }
            reader.readAsDataURL(files[0])
        } else {
            const Swal = require('sweetalert2')
            Swal.fire({
                icon: 'info',
                title: 'Image Size...',
                text: 'The Uploaded image is too large!  The max image size  (250KB or less) '
            })
        }

    }
    const EnterKeyPress = (event) => {
        if (event.keyCode === 13) {
         console.log(event.keyCode)
         if (props.pbtnRef && props.pbtnRef.current) props.pbtnRef.current.click()
        }
     
     } 

    useEffect(() => {
        if (props.profile !== undefined && props.profile !== null) {

            let baseString = props.profile.profile_image !== null ? props.profile.profile_image : null

            if (baseString !== null && baseString !== undefined) {
                baseString = `data:image/jpeg;base64,${baseString}`
                setImg(baseString)
            }
        }
        return () => {
            setImg(null)
        }
    }, [props.profile])

    useEffect(() => {
       
        if (props.pbtnRef && props.pbtnRef.current) {
           
            document.addEventListener('keydown', EnterKeyPress)
    }
    
      return () => {
        if (props.pbtnRef && props.pbtnRef.current) {
            document.removeEventListener('keydown', EnterKeyPress)
        } 
      }
    }, [])


    const renderUserAvatar = () => {
        if (img === null) {
            const stateNum = Math.floor(Math.random() * 6),
                states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
                color = states[stateNum]
            return (
                <Avatar
                    initials
                    color={color}
                    className='rounded mr-2 my-25'
                    content='profile image'
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(36px)',
                        width: '100%',
                        height: '100%'
                    }}
                    style={{
                        height: '90px',
                        width: '90px'
                    }}
                />
            )
        } else {
            return (
                <img
                    className='user-avatar rounded mr-2 my-25 cursor-pointer'
                    src={img}
                    alt='user profile avatar'
                    height='90'
                    width='90'
                />
            )
        }
    }


    return (
        <ModalBody>
            <FormGroup row>
                <Label sm='4' for='name'>
                    First Name <span style={{color: 'red'}}>*</span>
                </Label>
                <Col sm='8'>
                    <Input defaultValue={props.profile === undefined || props.profile === null ? "" : props.profile.user_id}
                        type="hidden"
                        id='user_id'
                        placeholder='First Name'
                        innerRef={props.register({ required: true })}
                        invalid={props.errors.user_id && true}
                        name="user_id" />
                    {props.errors && props.errors.user_id && <FormFeedback>{props.errors.user_id.message}</FormFeedback>}
                    <Input defaultValue={props.profile === undefined || props.profile === null ? "" : props.profile.first_name}
                        type='text'
                        id='first_name'
                        placeholder='First Name'
                        innerRef={props.register({ required: true })}
                        invalid={props.errors.first_name && true}
                        name="first_name" />
                    {props.errors && props.errors.first_name && <FormFeedback>{props.errors.first_name.message}</FormFeedback>}
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm='4' for='lastname'>
                    Last Name <span style={{ color: 'red' }}>*</span>
                </Label>
                <Col sm='8'>
                    <Input defaultValue={props.profile === undefined || props.profile === null ? "" : props.profile.last_name}
                        type='text'
                        id='last_name'
                        placeholder='Last Name'
                        innerRef={props.register({ required: true })}
                        invalid={props.errors.last_name && true}
                        name="last_name" />
                    {props.errors && props.errors.last_name && <FormFeedback>{props.errors.last_name.message}</FormFeedback>}
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm='4' for='Userid'>
                    User Id <span style={{ color: 'red' }}>*</span>
                </Label>
                <Col sm='8'>
                    <Input defaultValue={props.profile === undefined || props.profile === null ? "" : props.profile.login_id}
                        type='text'
                        name='login_id'
                        id='login_id'
                        readOnly={true}
                        placeholder='User ID'
                        innerRef={props.register({ required: true })}
                        invalid={props.errors.login_id && true}
                    />
                    {props.errors && props.errors.login_id && <FormFeedback>{props.errors.login_id.message}</FormFeedback>}
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm='4' for='Email'>
                    Email <span style={{ color: 'red' }}>*</span>
                </Label>
                <Col sm='8'>
                    <Input defaultValue={props.profile === undefined || props.profile === null ? "" : props.profile.email}
                        type='email'
                        id='email'
                        placeholder='Email'
                        innerRef={props.register({ required: true })}
                        invalid={props.errors.email && true}
                        name="email" />
                    {props.errors && props.errors.email && <FormFeedback>{props.errors.email.message}</FormFeedback>}
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label sm='4' for='mobile'>
                    Mobile <span style={{ color: 'red' }}>*</span>
                </Label>
                <Col sm='8'>
                    <Input autoComplete="off" defaultValue={props.profile === undefined || props.profile === null ? "" : props.profile.mobile}
                        type='number'
                        name='mobile'
                        id='mobile'
                        placeholder='Mobile'
                        innerRef={props.register({ required: true })}
                        invalid={props.errors.mobile && true} />
                    {props.errors && props.errors.mobile && <FormFeedback>{props.errors.mobile.message}</FormFeedback>}
                </Col>
            </FormGroup>

            <FormGroup row>
                {/* <Label sm='4' for='profile'>
                                Profile Picture <span style={{color:'red'}}>*</span>
                            </Label>
                            <Col sm='8'>
                                <Avatar color='light-primary rounded-0' content='Peter Ingraham' initials size={180} style={{ width: '80px', height: '80px' }} />
                                <Button color='primary' className="ml-2" >
                                    Change
                                </Button>
                            </Col> */}
                <Label className="col-sm-4" for='mobile'> Profile</Label>
                <Col sm='8'>
                    {renderUserAvatar()}
                    <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                        <span className='d-none d-sm-block'>Change</span>
                        <span className='d-block d-sm-none'>
                            <Edit size={14} />
                        </span>
                        <input data={img}
                            name="profile_Image"
                            type='file' hidden
                            ref={props.fileRef}
                            id='profile_Image'  
                            onChange={onChange}
                            accept='image/*'
                        />
                        {/* innerRef={props.register({ required: true })}
                        invalid={props.errors.profile_Image && true}/> */}
                        {/* props.errors && props.errors.profile_Image && <FormFeedback>{props.errors.profile_Image.message}</FormFeedback> */}

                    </Button.Ripple>
                </Col>
            </FormGroup>

        </ModalBody>
    )

}
export default ModalBodyUIProfile