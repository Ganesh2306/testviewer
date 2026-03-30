import {   
    Input,   
    Label,
    FormGroup,  
    Col,
    FormFeedback   
  } from 'reactstrap'

import { useState } from 'react'

  const CustomerComponent = (props) => {
    const [forSupp, setforSupp] = useState(null)
  const [forUser, setforUser] = useState(null)
  const [forCustomer, setforCustomer] = useState(null)
  const [forDesign, setforDesign] = useState(null)
  const [forAgent, setforAgent] = useState(null)
    return (
        <>
        <Col md='6' sm='12'>
      <FormGroup className='mb-2'>
        <Label for='Crorg_user_limit'>Total Users Limit</Label>
            <Input
                type="number"
                autocomplete="off"
                pattern="[0-9]"
                name='Crorg_user_limit'
                id= 'Crorg_user_limit'
                placeholder='100'
                innerRef={props.register({ required: true })}
                /* className={classnames({ 'is-invalid': errors[props.errormsg ? props.errormsg : 'checkout-number'] })} */
                invalid={props.errors.Crorg_user_limit && true }                  
                   /*  style={{ borderColor: (!props.errors.Crorg_user_limit && forUser) ? '#66DE93' : '' }}
                              onChange={(e) => {
                                //props.setUserValid(props.validate.userValid(e.target.value))
                                if (e.target.value.length > 0) {
                                  setforUser(true)
                                } else {
                                  setforUser(false)
                                }
                              }} */
            />
            {props.errors && props.errors.Crorg_user_limit && <FormFeedback>{'Please enter Numeric value between 1 to 999'}</FormFeedback> }
      </FormGroup>      
  </Col>
        </>
      )
    }
    export default CustomerComponent