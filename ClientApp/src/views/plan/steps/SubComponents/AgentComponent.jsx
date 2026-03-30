import {   
    Input,   
    Label,
    FormGroup,  
    Col,
    FormFeedback   
  } from 'reactstrap'

  const AgentComponent = (props) => {

    return  (          
        <>
      <Col md='6' sm='12'>
      <FormGroup className='mb-2'>
      <Label for='Arorg_supplier_limit'>Suppliers Limit</Label>
      <Input
          type="number"
          autocomplete="off"
          pattern="[0-9]"
          name='Arorg_supplier_limit'
          id= 'Arorg_supplier_limit'
          placeholder='10 Licenses'
          innerRef={props.register({ required: true })}
          invalid={props.errors.Arorg_supplier_limit && true }
         
      />
      {props.errors && props.errors.Arorg_supplier_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
      </FormGroup>      
      </Col> 
      
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='Arorg_user_limit'>Total Users Limit</Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"
                    name='Arorg_user_limit'
                    id= 'Arorg_user_limit'
                    placeholder='100'
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.Arorg_user_limit && true }                  
                   
                />
                {props.errors && props.errors.Arorg_user_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col>
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='Arorg_customer_limit'>Customers Limit</Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"
                    name='Arorg_customer_limit'
                    id= 'Arorg_customer_limit'
                    placeholder='20 Licenses'
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.Arorg_customer_limit && true }                  
                />
                 {props.errors && props.errors.Arorg_customer_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col> 
      
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='Arorg_design_limit'>Design Limit </Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"
                    name='Arorg_design_limit'
                    id= 'Arorg_design_limit'
                    placeholder='50,000'
                    innerRef={props.register({ required: true })}
                    invalid={props.errors.Arorg_design_limit && true }                  
                />
                {props.errors && props.errors.Arorg_design_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col> 
      
      </>             
      )     
  }
  export default AgentComponent