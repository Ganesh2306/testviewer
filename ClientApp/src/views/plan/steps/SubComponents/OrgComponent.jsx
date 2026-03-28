import {   
    Input,   
    Label,
    FormGroup,  
    Col,
    FormFeedback   
  } from 'reactstrap'

const OrgComponent = (props) => {

    return  (          
        <>
      <Col md='6' sm='12'>
      <FormGroup className='mb-2'>
      <Label for='rorg_supplier_limit'>Suppliers Limit</Label>
      <Input
          type="number"
          autocomplete="off"
          pattern="[0-9]"         
          name='rorg_supplier_limit'
          id= 'rorg_supplier_limit'
          placeholder='10 Licenses'
          innerRef={props.register({ required: true })}
          invalid={props.errors.rorg_supplier_limit && true }
      />
      {props.errors && props.errors.rorg_supplier_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
      </FormGroup>      
      </Col> 

      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='rorg_user_limit'>Total Users Limit</Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"                    
                    name='rorg_user_limit'
                    id= 'rorg_user_limit'
                    placeholder='100'
                    innerRef={props.register({ required: true })} 
                    invalid={props.errors.rorg_user_limit && true }                  
                />
                 {props.errors && props.errors.rorg_user_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col>
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='rorg_customer_limit'>Customers Limit</Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"
                    name='rorg_customer_limit'
                    id= 'rorg_customer_limit'
                    placeholder='20 Licenses'
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.rorg_customer_limit && true }                  
                />
                 {props.errors && props.errors.rorg_customer_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col> 

      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='rorg_design_limit'>Design Limit </Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"
                    name='rorg_design_limit'
                    id= 'rorg_design_limit'
                    placeholder='50,000'
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.rorg_design_limit && true }
                />
                {props.errors && props.errors.rorg_design_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999999'}</FormFeedback> }
          </FormGroup>      
      </Col> 
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='rorg_agent_limit'>Agent Limit </Label>
                <Input
                    type='number'
                    autocomplete="off"
                    pattern="[0-9]"                    
                    name='rorg_agent_limit'
                    id= 'rorg_agent_limit'
                    placeholder='5 Licenses'
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.rorg_agent_limit && true }
                />
                 {props.errors && props.errors.rorg_agent_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col>     
      </>             
      )

}
export default OrgComponent