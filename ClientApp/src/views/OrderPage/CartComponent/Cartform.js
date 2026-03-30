// ** React Imports
import Select from 'react-select'
import React, { useState } from "react"

// ** Third Party Components
import { selectThemeColors } from '@utils'
import { Form, Row, Col, Label, FormGroup, Button} from 'reactstrap'

import '../css/cart.css'

const colourOptions = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' }
]
const Cartform = (props) => {

    return (  
      <div className="item-options text-center">
        <Form className="text-left">
          <Row>
            <Col className='mb-1' md='12' sm='12'>
              <Label for='nameVerticalIcons'>Unicode Length</Label>    
              <Select 
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}            
              isDisabled={props.len ? props.len : false}                
            />
            </Col>
            <Col className='mb-1' md='12' sm='12'>
              <Label for='EmailVerticalIcons'>Delivery Period</Label>
              <Select 
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              isDisabled={props.period ? props.period : false}  
            />
            </Col>
            <Col className='mb-1' md='12' sm='12'>
              <Label for='IconsMobile'>Request Booking Quantity</Label>
              <Select 
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
              isDisabled={props.quantity ? props.quantity : false}  
            />
           </Col>            
            <Col className='mb-1' md='12' sm='12'>
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1 ' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Apply
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </Form>    
      </div>
    )
}

export default Cartform