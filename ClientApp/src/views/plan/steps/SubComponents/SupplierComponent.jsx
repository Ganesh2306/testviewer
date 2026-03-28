import {   
    Input,   
    Label,
    FormGroup,  
    Col,
    FormFeedback   
  } from 'reactstrap'

  const SupplierComponent = (props) => {

    return   (          
        <>
     <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='Srorg_customer_limit'>Customers Limit</Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"                      
                    name='Srorg_customer_limit'
                    id= 'Srorg_customer_limit'
                    placeholder='20 Licenses'                      
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.Srorg_customer_limit && true }
                />
                {props.errors && props.errors.Srorg_customer_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col> 
      
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='Srorg_user_limit'>Total Users Limit</Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"                      
                    name='Srorg_user_limit'
                    id= 'Srorg_user_limit'
                    placeholder='100'
                    innerRef={props.register({ required: true })}
                    invalid={props.errors.Srorg_user_limit && true }
                />
                {props.errors && props.errors.Srorg_user_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col>
     
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='Srorg_agent_limit'>Agent Limit </Label>
                <Input
                    type='number'
                    autocomplete="off"
                    pattern="[0-9]"                      
                    name='Srorg_agent_limit'
                    id= 'Srorg_agent_limit'
                    placeholder='5 Licenses'
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.Srorg_agent_limit && true }
                />
                {props.errors && props.errors.Srorg_agent_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col>  
      <Col md='6' sm='12'>
          <FormGroup className='mb-2'>
            <Label for='Srorg_design_limit'>Design Limit </Label>
                <Input
                    type="number"
                    autocomplete="off"
                    pattern="[0-9]"                      
                    name='Srorg_design_limit'
                    id= 'Srorg_design_limit'
                    placeholder='50,000'
                    innerRef={props.register({ required: true })}                   
                    invalid={props.errors.Srorg_design_limit && true }
                />
                {props.errors && props.errors.Srorg_design_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
          </FormGroup>      
      </Col>         
      </>             
      )
  }
  export default SupplierComponent