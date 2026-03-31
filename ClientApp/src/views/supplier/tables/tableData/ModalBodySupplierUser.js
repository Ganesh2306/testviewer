/// <reference path="modalbodyaddsupplieruser.js" />
import { Input, Label, Button, ModalBody, FormFeedback } from 'reactstrap'
import FormGroup from 'reactstrap/lib/FormGroup'
import { Edit } from 'react-feather'
import Avatar from "../../../../Avatar/Avatar"
import { useState } from 'react'

// ! PopUpBody
const ModalBodyUIAddEditSupplierUser = (props) => {
    const [img, setImg] = useState(null)
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    if (props.selectedSupplierUser !== undefined && props.selectedSupplierUser !== null) {

        let baseString = props.selectedSupplierUser.agt_imagebytebase !== null ? props.selectedSupplierUser.agt_imagebytebase : null
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
        if (props.selectedSupplierUser !== undefined && props.selectedSupplierUser !== null) {
            status.push(<option selected value="false">Active</option>)
            if (props.selectedSupplierUser.is_blocked) {
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
        <Label  className="col-form-Label col-sm-4 pl-0">First Name <span style={{ color: 'red' }}>*</span></Label> 
        <div className='col-sm-8'>
        <FormGroup className='mb-0 py-0'>  
        <Input 
              name="user_id" 
              type="hidden" 
              id="user_id"      
             
              autocomplete="off"
              innerRef={props.register({ required: true })}                   
              invalid={props.errors.user_id && true }            
              defaultValue={props.selectedSupplierUser === undefined || props.selectedSupplierUser === null ? 0 : props.selectedSupplierUser.user_id}
                /* style={{ borderColor: (ounvalid === true) ? '#66DE93' : (ounvalid === null) ? '' : '#D83A56' }}
                onChange={(e) => {
                  setOUNvalid(validate.ValidateOUName(e.target.value))
                }} */
              />                 
              <Input 
              name="first_name" 
              type="text" 
              id="first_name" 
              placeholder="First Name" 
             
             /*  pattern="[A-Za-z]{2,15}" */
              autocomplete="none"
              innerRef={props.register({ required: true })}                   
              invalid={props.errors.first_name && true }            
              defaultValue={props.selectedSupplierUser === undefined || props.selectedSupplierUser === null ? "" : props.selectedSupplierUser.first_name}
                /* style={{ borderColor: (ounvalid === true) ? '#66DE93' : (ounvalid === null) ? '' : '#D83A56' }}
                onChange={(e) => {
                  setOUNvalid(validate.ValidateOUName(e.target.value))
                }} */
              />
              
                          {props.errors && props.errors.first_name && <FormFeedback>{props.errors.first_name.message}</FormFeedback> }
        </FormGroup>
        </div>
      </div>
      
      <div className="row form-group">         
        <Label for="last_name"className="col-form-Label col-sm-4 pl-0">Last Name <span style={{ color: 'red' }}>*</span></Label>
        <div className='col-sm-8'>
            <Input 
            name="last_name" 
            type="text" 
            id="last_name" 
            placeholder="Last Name" 
        
            /* pattern="[A-Za-z]{2,15}" */
            autocomplete="none"
            innerRef={props.register({ required: true })} 
            invalid={props.errors.last_name && true }
            defaultValue={props.selectedSupplierUser === undefined || props.selectedSupplierUser === null ? "" : props.selectedSupplierUser.last_name}
              /* style={{ borderColor: (fvalid === true) ? '#66DE93' : (fvalid === null) ? '' : '#D83A56' }}
              onChange={(e) => {
                setFvalid(validate.ValidateFName(e.target.value))
              }} */
            />
                      {props.errors && props.errors.last_name && <FormFeedback>{props.errors.last_name.message}</FormFeedback> }
            </div>      
      </div>
      <div className="row form-group">  
          <Label className="col-form-Label col-sm-4 pl-0">User ID <span style={{ color: 'red' }}>*</span></Label>
          <div className='col-sm-8'>
                      <Input 
                 name="login_id"               
                type="text"            
                id="login_id" 
                placeholder="User ID" 
                autocomplete="off"
                innerRef={props.register({ required: true })} 
                invalid={props.errors.login_id && true }
                          defaultValue={props.selectedSupplierUser === undefined || props.selectedSupplierUser === null ? "" : props.selectedSupplierUser.login_id}
                          disabled={props.selectedSupplierUser === undefined || props.selectedSupplierUser === null ? "" : props.selectedSupplierUser.login_id && true}
              /* style={{ borderColor: (useridvalid === true) ? '#66DE93' : (useridvalid === null) ? '' : '#D83A56' }}
              onChange={(e) => {
                setUIDvalid(validate.ValidateUserid(e.target.value))
              }} */
            />
                      {props.errors && props.errors.login_id && <FormFeedback>{props.errors.login_id.message}</FormFeedback> }
          </div>
              </div>

              <div className="row form-group">
                  <Label className="col-form-Label col-sm-4 pl-0">Email <span style={{ color: 'red' }}>*</span></Label>
                  <div className='col-sm-8'>
                      <Input
                          name="email"
                          id="email"
                          placeholder="Email"
                          autocomplete="none"
                          innerRef={props.register({ required: true })}
                          invalid={props.errors.email && true}
                          defaultValue={props.selectedSupplierUser === undefined || props.selectedSupplierUser === null ? "" : props.selectedSupplierUser.email}
                      /* style={{ borderColor: (evalid === true) ? '#66DE93' : (evalid === null) ? '' : '#D83A56' }}  onChange={
                        (e) => { setEvalid(validate.ValidateEmail(e.target.value)) }
                      } */
                      />
                      {props.errors && props.errors.email && <FormFeedback>{props.errors.email.message}</FormFeedback>}
                  </div>
              </div>

              <div className="row form-group">
                  <Label className="col-form-Label col-sm-4 pl-0">Mobile <span style={{ color: 'red' }}>*</span></Label>
                  <div className='col-sm-8'>
                      <Input
                          name="mobile"
                          type="number"
                          id="mobile"
                          placeholder="Mobile"
                          autocomplete="none"
                          /* maxLength="11" */
                          innerRef={props.register({ required: true })}
                          invalid={props.errors.mobile && true}
                          defaultValue={props.selectedSupplierUser === undefined || props.selectedSupplierUser === null ? "" : props.selectedSupplierUser.mobile}
                      /* style={{ borderColor: (pnvalid === true) ? '#66DE93' : (pnvalid === null) ? '' : '#D83A56' }}
                      onChange={(e) => {
                        setPNvalid(validate.ValidatePhoneNumber(e.target.value))
                      }}
                     */
                      />
                      {props.errors && props.errors.mobile && <FormFeedback>{'Enter valid mobile number'}</FormFeedback>}
                  </div>
              </div>

      <div className="row form-group"> 
      <Label className="col-form-Label col-sm-4 pl-0">Password<span style={{ color: 'red' }}> *</span> </Label>
      <div className='col-sm-8'>
      <Input 
            name="password_hash" 
            type="password" 
            id="password_hash" 
            placeholder="Password" 
            autocomplete="new-password" 
            innerRef={props.register({ required: true })}                   
            invalid={props.errors.password_hash && true }           
                /* style={{ borderColor: (passwordvalid === true) ? '#66DE93' : (passwordvalid === null) ? '' : '#D83A56' }}
                onChange={(e) => {
                  validatePassWord(e.target.value)
                }} */
              /> 
              
         {props.errors && props.errors.password_hash && <FormFeedback>{props.errors.password_hash.message}</FormFeedback> }
      </div>     
      </div>

      <div className="row form-group"> 
      <Label className="col-form-Label col-sm-4 pl-0">Confirm Password <span style={{ color: 'red' }}> *</span> </Label>
          <div className='col-sm-8'>
                <Input 
                name="c_password" 
                type="password"     
                id="C_confirmPassword" 
                placeholder="Password" 
                autocomplete="none" 
                innerRef={props.register({ required: true })}                   
                invalid={props.errors.c_password && true }
                
                  /*  style={{ borderColor: (cpasswordvalid === true) ? '#66DE93' : (cpasswordvalid === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                      validateCPassWord(e.target.value)
                    }} */
                  />
                 
            {props.errors && props.errors.c_password && <FormFeedback>{props.errors.c_password.message}</FormFeedback> }
          </div>     
      </div>

  
              <div className="row form-group">
                  <Label
                      className="col-form-label col-sm-4 pl-0">Status <span onLoad={() => {
                           setStatusvalid(true)

                      }} style={{ color: 'red' }}>*</span></Label>
                  <div className='col-sm-8'>
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
                  <Label className="col-form-label col-sm-5 pl-0">Profile Image </Label>
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

export default ModalBodyUIAddEditSupplierUser
