import './../../../../customStyles/archivestyle.css'
import { useState, useContext, forwardRef, useImperativeHandle } from 'react'
import { Input, Label, Button, ModalBody, FormFeedback } from 'reactstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import * as validate from '../../../validation/OrgValidationFunctions'
import { stateContext } from '../../../context/stateContext'
import FormGroup from 'reactstrap/lib/FormGroup'
import { Edit } from 'react-feather'
import Avatar from "../../../../Avatar/Avatar"

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
                                type="hidden"
                                id="user_id"
                                autoComplete="off"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.user_id && true}
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "C_firstName" : props.selectedUser.user_id}
                            />
                            <Input
                                id={props.selectedUser === undefined || props.selectedUser === null ? "C_firstName" : props.selectedUser.user_id}
                                key={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.org_id}
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.first_name}
                                type="text"
                                className="form-control "
                                placeholder="First Name"
                                autoComplete="off"
                                name="first_name"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.first_name && true}
                            />
                            {props.errors && props.errors.first_name && <FormFeedback>{props.errors.first_name.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Last Name <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.last_name}
                                type="text"
                                className="form-control phone "
                                id="C_lastName"
                                placeholder="Last Name"
                                autoComplete="off"
                                name="last_name"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.last_name && true}
                            />
                            {props.errors && props.errors.last_name && <FormFeedback>{props.errors.last_name.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Email <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.email}
                                name="email"
                                type="Myemail"
                                id="email"
                                placeholder="Email"
                                autoComplete="off"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.email && true}
                            />
                            {props.errors && props.errors.email && <FormFeedback>{props.errors.email.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Mobile <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.mobile}
                                type="number"
                                className="form-control phone"
                                id="C_phoneNO"
                                name='mobile'
                                placeholder="Mobile"
                                autoComplete="off"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.mobile && true}
                            />
                            {props.errors && props.errors.mobile && <FormFeedback>{props.errors.mobile.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Department <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.department}
                                type="text"
                                className="form-control"
                                id="C_Department"
                                placeholder="Department"
                                autoComplete="off"
                                name="department"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.department && true}
                            />
                            {props.errors && props.errors.department && <FormFeedback>{props.errors.department.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">User ID <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.login_id}
                                disabled={(props.selectedUser !== undefined && props.selectedUser !== null) && props.selectedUser.user !== null ? props.selectedUser.login_id : "" && true} //nirbhay
                                type="text"
                                className="form-control"
                                id="login_id"
                                placeholder="User ID"
                                autoComplete="off"
                                name="login_id"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.login_id && true}
                            />
                            {props.errors && props.errors.login_id && <FormFeedback>{props.errors.login_id.message}</FormFeedback>}
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
                            <Input
                                name="password_hash"
                                type="password"
                                id="password_hash"
                                placeholder="Password"
                                autoComplete="new-password"
                                innerRef={props.register({ required: true })}
                                invalid={props.errors.password_hash && true}
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
                        <Input
                            name="c_password"
                            type="password"
                            id="C_confirmPassword"
                            placeholder="Password"
                            autoComplete="off"
                            innerRef={props.register({ required: true })}
                            invalid={props.errors.c_password && true}
                        />
                        {props.errors && props.errors.c_password && <FormFeedback>{props.errors.c_password.message}</FormFeedback>}
                    </div>
                </div>
                <div className="row form-group">
                    <Label
                        className="col-form-label col-sm-5 pl-1">Status <span onLoad={() => {
                            // setStatusvalid(true)

                        }} style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <Input
                            type="select"
                            name="state"
                            className=" form-control "
                            id="C_status"
                            innerRef={props.register({ required: true })}
                            invalid={props.errors.state && true}
                        >
                            {setStatus()}

                        </Input>
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
