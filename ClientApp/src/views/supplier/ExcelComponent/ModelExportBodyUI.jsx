import {React, useState, useRef} from 'react'
import { Input, Button, Label, Col, ModalBody, FormFeedback} from 'reactstrap'
import FormGroup from 'reactstrap/lib/FormGroup'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
const ModalExportExcelBodyUI = (props) => {

     // disable past dates
    const [select, setSelect, isLoader] = useState(null)
  return (
    <>
         <ModalBody> 
        {/*<Col className="row form-group">*/}
        {/*    <Label className="col-form-label col-sm-4 "> Product Group <span style={{ color: 'red' }}>*</span></Label>*/}
        {/*    <div  className="col-sm-8 px-0">*/}
        {/*    <FormGroup className='mb-0 py-0'>         */}
        {/*        <select*/}
        {/*            id="exporttpegroupid"*/}
        {/*            className=" form-control float-left"*/}
        {/*            value={select}*/}
        {/*            onChange={(e) => {*/}
        {/*                setSelect(e.target.value)                       */}
        {/*            }}*/}
        {/*        name="type_group"                   */}
          
        {/*        > */}
        {/*        </select>   */}
        {/*          <FormFeedback></FormFeedback>*/}
        {/*    </FormGroup>*/}
        {/*     </div>*/}
        {/*   <div >    */}
                
        {/*    </div>*/}
        {/*</Col>    */}
        {/*<Col className="row form-group">*/}
        {/*    <Label className="col-form-label col-sm-4 "> Start Date <span style={{ color: 'red' }}>*</span></Label>*/}
        {/*    <div  className="col-sm-8 px-0">*/}
        {/*    <FormGroup className='mb-0 py-0'>  */}
        {/*    <Input            */}
        {/*            name="start_Date"*/}
        {/*            type="date"*/}
        {/*            className="city"*/}
        {/*            id="start_Date1" />     */}
        {/*            <FormFeedback></FormFeedback>            */}
                   
        {/*    </FormGroup>*/}
        {/*     </div>*/}
        {/*   <div >    */}
                
        {/*    </div>*/}
        {/*</Col> */}
        {/*<Col className="row form-group">*/}
        {/*    <Label className="col-form-label col-sm-4 "> End Date <span style={{ color: 'red' }}>*</span></Label>*/}
        {/*    <div  className="col-sm-8 px-0">*/}
        {/*    <FormGroup className='mb-0 py-0'>*/}
        {/*    <Input */}
                   
        {/*            name="end_Date"*/}
        {/*            type='date'*/}
        {/*            className="city"*/}
        {/*            id='end_Date1' />*/}
        {/*              <FormFeedback></FormFeedback>            */}
                 
        {/*    </FormGroup>*/}
        {/*     </div>*/}
        {/*   <div >    */}
                
        {/*    </div>*/}
        {/*</Col> */}
              </ModalBody>
       
      </>
              )

}

export default ModalExportExcelBodyUI