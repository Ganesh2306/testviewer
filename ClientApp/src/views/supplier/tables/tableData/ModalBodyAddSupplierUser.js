import { Input, Label, Col, ModalBody, FormFeedback } from 'reactstrap'
import FormGroup from 'reactstrap/lib/FormGroup'

// ! PopUpBody 
const ModalBodyUIAddSupplierUser = (props) => { 

  return (
    < ModalBody >
    <div className='col-sm-12'>  
       <div className="row form-group">  
        <Label for='first_name' className="col-form-Label col-sm-4 pl-0">First Name <span style={{ color: 'red' }}>*</span></Label> 
        <div className='col-sm-8'>
        <FormGroup className='mb-0 py-0'>                   
              <Input 
              name="first_name" 
              type="text" 
              id="first_name" 
              placeholder="First Name" 
              maxLength="15" 
             /*  pattern="[A-Za-z]{2,15}" */
               autoComplete="off"
              innerRef={props.register({ required: true })}                   
              invalid={props.errors.first_name && true }
                /* style={{ borderColor: (ounvalid === true) ? '#66DE93' : (ounvalid === null) ? '' : '#D83A56' }}
                onChange={(e) => {
                  setOUNvalid(validate.ValidateOUName(e.target.value))
                }} */
              />
        {props.errors && props.errors.first_name && <FormFeedback>{'Please enter valid first name'}</FormFeedback> }
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
            maxLength="15" 
            /* pattern="[A-Za-z]{2,15}" */
            autoComplete="off"
            innerRef={props.register({ required: true })}                   
            invalid={props.errors.last_name && true }
              /* style={{ borderColor: (fvalid === true) ? '#66DE93' : (fvalid === null) ? '' : '#D83A56' }}
              onChange={(e) => {
                setFvalid(validate.ValidateFName(e.target.value))
              }} */
            />
            {props.errors && props.errors.last_name && <FormFeedback>{'Please enter valid last name'}</FormFeedback> }  
            </div>      
      </div>
      <div className="row form-group">  
          <Label className="col-form-Label col-sm-4 pl-0">User ID <span style={{ color: 'red' }}>*</span></Label>
          <div className='col-sm-8'>
              <Input name="user_id" 
                name="login_id"
                type="text"            
                id="login_id" 
                placeholder="User ID" 
                autoComplete="off"
                innerRef={props.register({ required: true })}                   
                invalid={props.errors.login_id && true }
              /* style={{ borderColor: (useridvalid === true) ? '#66DE93' : (useridvalid === null) ? '' : '#D83A56' }}
              onChange={(e) => {
                setUIDvalid(validate.ValidateUserid(e.target.value))
              }} */
            />
            {props.errors && props.errors.login_id && <FormFeedback>{'Please enter valid user ID'}</FormFeedback> }
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
            minlength="8" 
            maxLength="20"
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
                autoComplete="off" 
                minlength="8" 
                maxLength="20"
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
      <Label className="col-form-Label col-sm-4 pl-0">Email <span style={{ color: 'red' }}>*</span></Label> 
          <div className='col-sm-8'>         
                <Input 
                name="email" 
                type="myemail" 
                id="email" 
                placeholder="Email" 
                autoComplete="off"               
                innerRef={props.register({ required: true })}                   
                invalid={props.errors.email && true }
                /* style={{ borderColor: (evalid === true) ? '#66DE93' : (evalid === null) ? '' : '#D83A56' }}  onChange={
                  (e) => { setEvalid(validate.ValidateEmail(e.target.value)) }
                } */ 
                />
            {props.errors && props.errors.email && <FormFeedback>{'Email must be a valid email'}</FormFeedback> }
          </div>   
      </div>

      <div className="row form-group"> 
      <Label className="col-form-Label col-sm-4 pl-0">Mobile <span style={{ color: 'red' }}>*</span></Label> 
          <div className='col-sm-8'>         
          <Input 
          name="mobile" 
          type="text" 
          id="mobile" 
          name='mobile' 
          placeholder="Mobile" 
          pattern="[0-9]" 
          autocomplete="none" 
          /* maxLength="11" */
          innerRef={props.register({ required: true })}                   
          invalid={props.errors.mobile && true }
          /* style={{ borderColor: (pnvalid === true) ? '#66DE93' : (pnvalid === null) ? '' : '#D83A56' }}
          onChange={(e) => {
            setPNvalid(validate.ValidatePhoneNumber(e.target.value))
          }}
         */
          />
            {props.errors && props.errors.mobile && <FormFeedback>{'Enter valid mobile number'}</FormFeedback> }
          </div>   
      </div>
     </div>  
    </ModalBody >
  )
}

export default ModalBodyUIAddSupplierUser
