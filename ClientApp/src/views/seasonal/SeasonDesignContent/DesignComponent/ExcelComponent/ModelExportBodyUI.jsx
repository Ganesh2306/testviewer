import {React, useState} from 'react'
import { Input, Label, Col, ModalBody, FormFeedback} from 'reactstrap'
import FormGroup from 'reactstrap/lib/FormGroup'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { N_Loader } from '../../../../loader/loader'

const ModalExportExcelBodyUI = (props) => {
    const [select, setSelect, isLoader] = useState(null)
     let f = false
const Loop = (props) => {
    if (props.rollData !== null) {
     return  (props.rollData.allDesignTypesByRoles.map((e, k) => { 
        return  (e.getDesignGroupsByRoleListDto.map((a, b) => {
          if (f) {        
            f = false
          }  
          return (<option
            designtypeid= {e.design_type_id}
            designgroupid={a.design_groups_id}
            value={`${e.design_type_id} - ${a.design_groups_id}`}      
           name={`${e.design_type_name}-${a.design_groups_name}`}
           d_conf_i={`d_conf${e.design_Configuration_Id}`}
        >
          {`${e.design_type_name}-${a.design_groups_name}`}
          </option>)
          }))
        }))
      } else {
      return <></>
    }
  }
  const yesterday = moment().subtract(1, 'day')
  const [startDate, setStartDate] = useState([null])
   
  return (
    <>
          <N_Loader show={isLoader}>
         <ModalBody>       
       
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Product Group <span style={{ color: 'red' }}>*</span></Label>
            <div  className="col-sm-8 px-0">
            <FormGroup className='mb-0 py-0'>         
                <select
                    id="exporttpegroupid"
                    className=" form-control float-left"
                    value={select}
                    onChange={(e) => {
                        setSelect(e.target.value)                       
                    }}
                name="type_group"                   
                innerRef={props.register({ required: true })}
                invalid={props.errors.type_group && true}  
                > 
                <Loop rollData={props.rollData} />
                </select>   
             
                 {props.errors && props.errors.type_group && <FormFeedback>{props.errors.type_group.message}</FormFeedback>}
            </FormGroup>
             </div>
           <div >    
                
            </div>
        </Col>    
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> Start Date <span style={{ color: 'red' }}>*</span></Label>
            <div  className="col-sm-8 px-0">
            <FormGroup className='mb-0 py-0'>  
            <Input 
                    innerRef={props.register({ required: true })}
                    invalid={props.errors.start_Date  && true}
                    name="start_Date"
                    type="date"
                    className="city"
                    id="start_Date1" />                 
                    {props.errors && props.errors.start_Date && <FormFeedback>{props.errors.start_Date.message}</FormFeedback>}
            </FormGroup>
             </div>
           <div >    
                
            </div>
        </Col> 
        <Col className="row form-group">
            <Label className="col-form-label col-sm-4 "> End Date <span style={{ color: 'red' }}>*</span></Label>
            <div  className="col-sm-8 px-0">
            <FormGroup className='mb-0 py-0'>
            <Input 
                    innerRef={props.register({ required: true })}
                    invalid={props.errors.end_Date  && true}
                    name="end_Date"
                    type='date'
                    className="city"
                    id='end_Date1' />
                    {props.errors && props.errors.end_Date && <FormFeedback>{props.errors.end_Date.message}</FormFeedback>}
            </FormGroup>
             </div>
           <div >    
                
            </div>
        </Col> 
       
              </ModalBody>
          </ N_Loader>
      </>
              )

}

export default ModalExportExcelBodyUI