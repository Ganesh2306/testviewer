// ** React Imports
import { Link } from 'react-router-dom'
import React, { useState } from "react"

// ** Third Party Components

import { CardBody, Col, Input } from 'reactstrap'

import '../css/cart.css'

const CartInfo = (props) => {  

    return (
        <CardBody>
            { console.log(props.comment) }
            <div className='item-name'>
              <h6 className='mb-2'>Design Properties:</h6>
                <Col className='p-0 mt-xl-0 mt-2 d-flex' lg='12'>           
                  <table className="w-50" style={{fontSize:'0.857rem'}}>
                    <tbody>
                      <tr>
                        <td className='pr-4'>Qty:</td>
                        <td>
                          <span className=''>200</span>
                        </td>
                      </tr>
                      <tr>
                        <td className='pr-6'>pattern:</td>
                        <td>Checks</td>
                      </tr>
                      <tr>
                        <td className='pr-6'>Composition:</td>
                        <td>sdfsdf</td>
                      </tr>
                      <tr>
                        <td className='pr-6'>Finish:</td>
                        <td>dfsdf</td>
                      </tr>
                      <tr>
                        <td className='pr-1'>Gsm:</td>
                        <td>sfdsfds</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="w-50" style={{fontSize:'0.857rem'}}>
                    <tbody>
                      <tr>
                        <td className='pr-4'>Qty:</td>
                        <td>
                          <span className=''>200</span>
                        </td>
                      </tr>
                      <tr>
                        <td className='pr-6'>pattern:</td>
                        <td>Checks</td>
                      </tr>
                      <tr>
                        <td className='pr-6'>Composition:</td>
                        <td>sdfsdf</td>
                      </tr>
                      <tr>
                        <td className='pr-6'>Finish:</td>
                        <td>dfsdf</td>
                      </tr>
                      <tr>
                        <td className='pr-1'>Gsm:</td>
                        <td>sfdsfds</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <div className='item-name mt-2'>
                  <h6 className='mb-2'>Comments:</h6>   
                  <Col className="p-0">
                    <Input type='textarea' className='rounded-0' name='text' id='exampleText' rows='3' placeholder='Textarea'  disabled={props.comment ? props.comment : false}/>  
                  </Col> 
                </div>          
            </div>
        </CardBody>
    )
}

export default CartInfo