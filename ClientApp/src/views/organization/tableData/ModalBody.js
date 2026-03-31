import './../../../customStyles/archivestyle.css'
import { useState, useContext, forwardRef, useImperativeHandle } from 'react'
import { Input, Label, Button, Col, ModalBody, FormFeedback } from 'reactstrap'
import "react-datepicker/dist/react-datepicker.css"
import * as validate from '../../validation/OrgValidationFunctions'
import FormGroup from 'reactstrap/lib/FormGroup'
import Avatar from "../../../Avatar/Avatar"
import { Edit } from 'react-feather'

// ! PopUpBody 
const ModalBodyUI = forwardRef((props, ref) => {

    const [img, setImg] = useState(null)
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    if (props.selectedUser !== undefined && props.selectedUser !== null) {

        let baseString = props.selectedUser.agt_imagebytebase !== null ? props.selectedUser.agt_imagebytebase : null
        if (baseString !== null && baseString !== undefined) {
            baseString = `data:image/jpeg;base64,${baseString}`
            if (img === null) setImg(baseString)

        }
    }
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
    function setStatus() {
        let status = []
        if (props.selectedUser !== undefined && props.selectedUser !== null) {
            status.push(<option selected value="false">Active</option>)
            if (props.selectedUser.is_blocked) {
                status = []
                status.push(<option selected value="true">Block</option>)
                status.push(<option value="false">Active</option>)
            } else {
                status.push(<option value="true">Block</option>)
            }

        } else {

            status.push(<option value="false">Active</option>)
            status.push(<option value="true">Block</option>)
        }
        return status
    }
    return (
        < ModalBody >
            <div className='col-sm-12'>
            <div className="row form-group">
                <Label className="col-form-label col-sm-5 pl-1">First Name <span style={{ color: 'red' }}>*</span></Label>
                <div className='col-sm-7'>
                    <FormGroup className='mb-0 py-0'>
                            <Input
                                name="user_id"
                                autoComplete="off"
                                type="hidden"
                                id="user_id"
                                autocomplete="none"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.user_id && true}
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "C_firstName" : props.selectedUser.user_id}
                            />

                <Input autoComplete="off" id={props.selectedUser === undefined || props.selectedUser === null ? "C_firstName" : props.selectedUser.user_id} key={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.org_id} defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.first_name} type="text" required className="form-control" placeholder="First Name" 
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.first_name && true}
                                name="first_name"
                            />
                            {props.errors && props.errors.first_name && <FormFeedback>{props.errors.first_name.message}</FormFeedback>}

                    </FormGroup>
                </div>
            </div>
            <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Last Name <span style={{ color: 'red' }}>*</span></Label>
                <div className='col-sm-7'>
                    <FormGroup className='mb-0 py-0'>
                <Input autoComplete="off" defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.last_name} type="text" className="form-control phone" id="C_lastName" placeholder="Last Name"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.last_name && true}
                                name="last_name"
                            />
                            {props.errors && props.errors.last_name && <FormFeedback>{props.errors.last_name.message}</FormFeedback>}

                    </FormGroup>
                </div>
            </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Email <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                <Input autocomplete="none" defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.email}  type="Myemail" className="form-control phone" id="C_email" placeholder="Email" autoComplete="off" 
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.email && true}
                                name="email"

                            />
                            {props.errors && props.errors.email && <FormFeedback>{props.errors.email.message}</FormFeedback>}

                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Mobile <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>

                            <Input autoComplete="off" defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.mobile} type="number" className="form-control phone" id="C_phoneNO" name='mobile' placeholder="Mobile" 
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.mobile && true}
                                name="mobile"
                            />
                            {props.errors && props.errors.mobile && <FormFeedback>{props.errors.mobile.message}</FormFeedback>}

                        </FormGroup>
                    </div>
                </div>

                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">User ID <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>

                <Input autoComplete="off" defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.login_id} type="text" className="form-control" id="C_userID" placeholder="User ID" autoComplete="off"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.login_id && true}
                                name="login_id"
                                disabled={(props.selectedUser !== undefined && props.selectedUser !== null) && props.selectedUser.user !== null ? props.selectedUser.login_id : "" && true}
                            />
                            {props.errors && props.errors.login_id && <FormFeedback>{props.errors.login_id.message}</FormFeedback>}

                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Department <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                <Input autoComplete="off" defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.department} type="text" className="form-control" id="C_userID" placeholder="Department" autoComplete="off"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.department && true}
                                name="department"

                            />
                            {props.errors && props.errors.department && <FormFeedback>{props.errors.department.message}</FormFeedback>}

                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Password
          {/*{bodyFor === 'add' &&*/}
                    <span style={{ color: 'red' }}> *</span>
                    {/*}*/}
                    </Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>

                <Input autocomplete="none" type="password" className="form-control phone" id="C_password" placeholder="Password" autoComplete="new-password" 

                                innerRef={props.register({ required: true })}
                                invalid={props.errors.password_hash && true}
                                name="password_hash"
                            />
                            {props.errors && props.errors.password_hash && <FormFeedback>{props.errors.password_hash.message}</FormFeedback>}

                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Confirm Password
          {/*{bodyFor === 'add' &&*/}
                    <span style={{ color: 'red' }}> *</span>
                    {/*}*/}
                    </Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>

                <Input autocomplete="none" type="password" className="form-control phone" id="C_confirmPassword" placeholder="Password" autoComplete="off" 
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.c_password && true}
                                name="c_password"
                            />
                            {props.errors && props.errors.c_password && <FormFeedback>{props.errors.c_password.message}</FormFeedback>}

                        </FormGroup>
                    </div>
                </div>

                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Status <span onLoad={() => {
                    setStatusvalid(true)
                    Flag()
                    }} style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>

                <Input autocomplete="none" type="select" name="state" className=" form-control" id="C_status"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.status && true}
                                name="status"

                            >
                                {setStatus()}
                            </Input>

                            {props.errors && props.errors.status && <FormFeedback>{props.errors.status.message}</FormFeedback>}

                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">

                    <Label className="col-form-label col-sm-5 pl-1">Profile Image </Label>
                    <div className="col-sm-7">
                        {renderUserAvatar()}
                        <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                            <span className='d-none d-sm-block'>Change</span>
                            <span className='d-block d-sm-none'>
                                <Edit size={14} />
                            </span>
                            <input data={img} name="agt_imagebyte" type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
                        </Button.Ripple>
                    </div>
                </div>
            </div>
        </ModalBody >
    )
})

export default ModalBodyUI
