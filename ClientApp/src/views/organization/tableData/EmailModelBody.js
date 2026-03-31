import React from 'react'
import { Input, Button, Label, Col, ModalBody, FormFeedback} from 'reactstrap'
import FormGroup from 'reactstrap/lib/FormGroup'

const ModalEmailBodyUI = (props) => {
   
  return (
    
         <ModalBody>
             <Col className="row form-group mx-0">
            <Label className="control-label ">Mail Configuration Details:</Label>
        </Col>
        <hr/>
        <Col className="row form-group mx-0">
            <Label className="control-label ">Accounts Details</Label>
        </Col>
        
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Name <span style={{ color: 'red' }}>*</span></Label>
            <div  className="col-sm-8 px-0">
            <FormGroup className='mb-0 py-0'>
            <Input 
            type="text"
            defaultValue={props.emailData === undefined || props.emailData === null ? 0 : props.emailData.em_Configuration_Id}
            type="hidden" 
            autocomplete="none"
            className="form-control w-100"
            id="em_Configuration_Id"
            placeholder="Name"
            name="em_Configuration_Id"                   
            innerRef={props.register({ required: true })}
            invalid={props.errors.em_Configuration_Id && true}        
            />
            <Input 
            type="text"
            defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_User}
            autocomplete="none"
            className="form-control w-100"
            id="ac_name"
            placeholder="Name"
            name="ac_name"                   
            innerRef={props.register({ required: true })}
            invalid={props.errors.ac_name && true}        
            />
            {props.errors && props.errors.ac_name && <FormFeedback>{props.errors.ac_name.message}</FormFeedback>}
            </FormGroup>
             </div>
           <div >    
                
            </div>
        </Col>
       
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Email <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-8 px-0" >
            <FormGroup className='mb-0 py-0'>
            <Input
                type="email"
                defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_Address}
                autocomplete="none"
                className="form-control w-100"
                id="email_id"
                placeholder="Email"
                name="email_id"
                innerRef={props.register({ required: true })}
                invalid={props.errors.email_id && true}    
               />
               {props.errors && props.errors.email_id && <FormFeedback>{props.errors.email_id.message}</FormFeedback>}
               </FormGroup>
             </div>
           <div>       
                
            </div>
        </Col>
        
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Password <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-8 px-0">
            <FormGroup className='mb-0 py-0'>
            <Input
             type="Password" //abhishek 01-03
             defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_Password}
             autocomplete="none"
             className="form-control w-100"
             id="password"
             placeholder="Password"
             name="password"    
             innerRef={props.register({ required: true })}
             invalid={props.errors.password && true}       
            />
            {props.errors && props.errors.password && <FormFeedback>{props.errors.password.message}</FormFeedback>}
            </FormGroup>
             </div>
           <div>              
            </div>
        </Col>
        <hr/>
        <Col className="row form-group mx-0">
            <Label className="control-label ">Server Details:</Label>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Account Type <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-8 px-0" >
            <FormGroup className='mb-0 py-0'>
            <Input 
            type="select" 
            defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_Account_Type}
            name="accounttype" 
            className="col-sm-12" 
            parentid="#C_StoreType"
            subid="#C_StoreType" 
            id="accounttype"
            innerRef={props.register({ required: true })}
             invalid={props.errors.accounttype && true}       
            >
                   <option value="POP3" name="POP3">POP3</option> 
            </Input>
            {props.errors && props.errors.accounttype && <FormFeedback>{props.errors.accounttype.message}</FormFeedback>}
            </FormGroup>
             </div>
           <div>            
            </div>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Mail Server(SMTP) <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-8 px-0">
            <FormGroup className='mb-0 py-0'>   
            <Input
             type="text"
             defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_SMTP}
             autocomplete="none"
             className="form-control w-100"
             id="mailServer_id"
             placeholder="Mail Server"
             name="mailServer_id"
             innerRef={props.register({ required: true })}
             invalid={props.errors.mailServer_id && true}           
            />
             {props.errors && props.errors.mailServer_id && <FormFeedback>{props.errors.mailServer_id.message}</FormFeedback>}
             </FormGroup>
             </div>
           <div>               
           </div>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Port <span style={{ color: 'red' }}>*</span></Label>
            <div className="col-sm-8 px-0" >
            <FormGroup className='mb-0 py-0'>
            <Input
            type="text"
            defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_SMTP_Port}
            autocomplete="none"
            className="form-control w-100"
            id="port_id"
            placeholder="Port"
            name="port_id"
            innerRef={props.register({ required: true })}
            invalid={props.errors.port_id && true}           
            />
             {props.errors && props.errors.port_id && <FormFeedback>{props.errors.port_id.message}</FormFeedback>}
             </FormGroup>
             </div>
           <div >              
            </div>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Mail BCC <span style={{ color: 'red' }}></span></Label>
            <div className="col-sm-8 px-0" >
            <FormGroup className='mb-0 py-0'>
            <Input
            type="textarea"
            defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_bcc}
            autocomplete="none"
            id="mailbbc_id"
            name="mailbbc_id"
            placeholder="some1@gmail.com,some2@gmail.com..."
            innerRef={props.register({ required: true })}
            invalid={props.errors.mailbbc_id && true}            
            />
             {props.errors && props.errors.mailbbc_id && <FormFeedback>{props.errors.mailbbc_id.message}</FormFeedback>}
             </FormGroup>
             </div>
           <div>              
            </div>
        </Col>
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Mail CC <span style={{ color: 'red' }}></span></Label>
            <div className="col-sm-8 px-0">
            <FormGroup className='mb-0 py-0'>
            <Input
            type="textarea"
            defaultValue={props.emailData === undefined || props.emailData === null ? "" : props.emailData.em_CC}
            autocomplete="none"
            name="mailcc_id"
            id="mailcc_id"
            placeholder="some1@gmail.com,some2@gmail.com..."
            innerRef={props.register({ required: true })}
            invalid={props.errors.mailcc_id && true}     
            />
             {props.errors && props.errors.mailcc_id && <FormFeedback>{props.errors.mailcc_id.message}</FormFeedback>}
             </FormGroup>
             </div>
           <div>               
           </div>
        </Col>
         </ModalBody>
  )
}

export default ModalEmailBodyUI