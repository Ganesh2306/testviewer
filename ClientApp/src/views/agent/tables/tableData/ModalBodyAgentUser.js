import { Input, Label, Col, ModalBody, Button, FormFeedback, FormGroup } from 'reactstrap'
import Avatar from "../../../../Avatar/Avatar"
import { Edit } from 'react-feather'
import { useState } from 'react'
// ! PopUpBody 
const ModalBodyUI = (props) => {

    const { errors, register, selectedUser } = props
    // ! all state value

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

                            <Input id={props.selectedUser === undefined || props.selectedUser === null ? "C_firstName" : props.selectedUser.user_id}
                                key={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.org_id}
                                defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.first_name}
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                innerRef={register({ required: true })}
                                invalid={errors.first_name && true}
                                name="first_name"
                                autoComplete = "off"
                           
                            />
                            {errors && errors.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Last Name <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.last_name}
                                type="text"
                                className="form-control phone"
                                id="C_lastName"
                                placeholder="Last Name"
                                innerRef={register({ required: true })}
                                invalid={errors.last_name && true}
                                name="last_name"
                                autoComplete = "off"
                            />
                            {errors && errors.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Email <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.email} type="Myemail"
                                className="form-control phone"
                                id="C_email"
                                placeholder="Email"
                                autoComplete="off"
                                innerRef={register({ required: true })}
                                invalid={errors.email && true}
                                name="email"
                            />
                            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">Mobile <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.mobile}
                                type="number" className="form-control phone"
                                id="C_phoneNO"
                                innerRef={register({ required: true })}
                                invalid={errors.mobile && true}
                                name="mobile"
                                placeholder="Mobile"
                                autoComplete="off"

                            />
                            {errors && errors.mobile && <FormFeedback>{errors.mobile.message}</FormFeedback>}
                        </FormGroup>
                    </div>
                </div>
               
                <div className="row form-group">
                    <Label className="col-form-label col-sm-5 pl-1">User ID <span style={{ color: 'red' }}>*</span></Label>
                    <div className='col-sm-7'>
                        <FormGroup className='mb-0 py-0'>
                            <Input defaultValue={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.login_id}
                                disabled={props.selectedUser === undefined || props.selectedUser === null ? "" : props.selectedUser.login_id && true}
                                type="text"
                                className="form-control"
                                id="login_id"
                                placeholder="User ID"
                                autoComplete="off"
                                innerRef={register({ required: true })}
                                invalid={errors.login_id && true}
                                name="login_id"

                            />
                            {errors && errors.login_id && <FormFeedback>{errors.login_id.message}</FormFeedback>}
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
                                type="password"
                                className="form-control phone"
                                id="password_hash" placeholder="Password"
                                autoComplete="new-password"
                                innerRef={register({ required: true })}
                                invalid={errors.password_hash && true}
                                name="password_hash"

                            />
                            {errors && errors.password_hash && <FormFeedback>{errors.password_hash.message}</FormFeedback>}
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
                            type="password"
                            className="form-control phone"
                            id="C_confirmPassword"
                            placeholder="Password"
                            autoComplete="off"
                            innerRef={register({ required: true })}
                            invalid={errors.password_hash2 && true}
                            name="password_hash2"

                        />
                        {errors && errors.password_hash2 && <FormFeedback>{errors.password_hash2.message}</FormFeedback>}
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
                            name="status"
                            className=" form-control "
                            id="C_status"
                            innerRef={props.register({ required: true })}
                            invalid={props.errors.status && true}
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
}

export default ModalBodyUI