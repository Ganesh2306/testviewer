// ** React Imports
import Select from 'react-select'
import React, { useEffect, useRef, useState } from "react"

// ** Third Party Components
import { selectThemeColors } from '@utils'
import { Form, Row, Col, Label, Input} from 'reactstrap'

import '../css/order.css'
import OrderPage from './OrderPage'

const colourOptions = [
  { value: 'CAD', label: 'CAD' },
  { value: 'Noos', label: 'Noos' },
  { value: 'Yardage', label: 'Yardage'},
  { value: 'Sample', label: 'Sample' }
]
const CategoryOptions = [
  { value: 'CAD', label: 'CAD' },
  { value: 'Sample', label: 'Sample' },
  { value: 'Yardage', label: 'Yardage'},
  { value: 'Stock', label: 'Stock' },
  { value: 'ocean', label: 'Noos' }
]

const Orderform = (props) => {
  const {orderDataRef, odrequestRef, counter, RequestOptions, comment, quantity, requestType, update, setupdate, selectedDesign} = props
  //code for validate Order Quantity
  const v = props.selectedDesign
  // console.log(v, "vvvvvvvvvvvvvvvvvvvv")
  const [inputValue, setInputValue] = useState('')
  const OrderQuantityRef = useRef(null)
  const OrderQuantityErrorRef = useRef(null)
    const [testQuantity, settestQuantity] = useState(quantity)
   const [selectedvalue, setselectedValue] = useState(selectedDesign[counter].myrequest)
   const [comment1, setComment] = useState(selectedDesign[counter].comment)
    window.gt = setselectedValue

  const handleInputChange = (e) => {
    //const value = event.target.value
    const value = OrderQuantityRef.current.value
    const regex = /^[0-9]*\.?[0-9]*$/
    if (value === '' || value.match(regex)) {
      //setInputValue(value)
      OrderQuantityErrorRef.current.textContent = ''
    } else {
      OrderQuantityErrorRef.current.textContent = 'Request quantity must have digits and a single decimal point'
    }
  }

  const ChangeEvent = (e) => {
    
    orderDataRef[counter].RequestType = (e)
    setselectedValue(e)
 }

  useEffect(() => {
    if (requestType) {
      if (!orderDataRef.current) { 
        orderDataRef.map(e => {
        e.RequestType = props.requestType
        return e
      })
    }
      setselectedValue(RequestOptions.filter((e) => {
        return e.value === props.requestType
        })[0])
    }
  }, [props.requestType])
    return (  
      <>
      <div className="item-options text-center">
        <Form className="text-left">
          <Row>

            <Col className='mb-1' md='12' sm='12'>
              <Label for='EmailVerticalIcons'>Request Type</Label>
              <Select 
              theme={selectThemeColors}
              className='react-select custom_RequestType_imp'
              classNamePrefix='select'
              //defaultValue = {selectedvalue} 
              value={selectedvalue} //Abhishek
              options={RequestOptions}
              isClearable={false}
              //isDisabled={props.period ? props.period : false}
              isDisabled={props.disabled} 
              onChange={e => { 
                ChangeEvent(e)              
                //setselectedValue(e.value)
                //orderDataRef[counter].RequestType = (e.value)
            }}  
            />
            </Col>
            <Col className='mb-1' md='12' sm='12'>
              <Label for='IconsMobile'>Request Quantity</Label>
              <Input 
              type='text' 
              className='rounded-0' 
              name='text' 
              id='exampleText'
              disabled={props.disabled}
              value={testQuantity}
              //value={inputValue} 
              innerRef={OrderQuantityRef}
               onChange = {(e) => {
                handleInputChange(e) 
              //  orderDataRef.current[counter].Order = (e.target.value)
                   orderDataRef[counter].Order = (e.target.value)
                   settestQuantity(e.target.value)
               }}
               onKeyPress={(e) => {
                const regex = /^[0-9.]$/ // Allow only digits and decimal point
                if (!regex.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                    e.preventDefault()// Prevent default behavior for invalid keys
                    OrderQuantityErrorRef.current.textContent = 'Request quantity must have digits and a single decimal point' // Show error message
                } else {
                    OrderQuantityErrorRef.current.textContent = '' // Clear error message if valid key
                }
            }}
              ></Input>  
              <div style={{ color: 'red' }} className="error-message" ref={OrderQuantityErrorRef}></div>
           </Col>            
            <Col className='mb-1' md='12' sm='12'>
            <Label for='IconsMobile'>Comments</Label>
                            <Input type='textarea' className='rounded-0' name='text' id='exampleTexta' rows='1'
                                style={{
                                    height: '4rem', // Fixed height
                                    resize: 'none'  // Disable resizing
                                }}
                            maxlength="200"
              placeholder='Enter the comments' 
              disabled={props.disabled}
              defaultValue={comment1}
              //disabled={props.comment ? props.comment : false}
              //ref={props.formdata}
              onChange={e => {
                //console.log(counter, orderDataRef.current)
                //orderDataRef.current[counter].comment = (e.target.value)
                orderDataRef[counter].comment = (e.target.value)
            }
          }
              />  
            </Col>
          </Row>
        </Form>    
      </div>
      {/* <OrderPage comment={props.comment}/> */}
    </>
    )
}

export default Orderform