import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css"

import './../../../../customStyles/archivestyle.css'
import { Input, Label, Col, ModalBody } from 'reactstrap'
import DatePicker from 'react-datepicker'
import * as validate from './ValidationFunctions'


const ModalBodyUI = ({ bodyFor, customerData, setRole }) => {
   
    // const [dateRange, setDateRange] = useState([null])
    //  const [startDate, endDate] = dateRange
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    // ! all state value

    //** Last Name */
    const [lvalid, setLvalid] = useState(null)

    //** State*/
    const [statevalid, setSTATEvalid] = useState(null)

    function formatDate(date) {

        if (date === null) {
            return null
        }
        const d = new Date(date),
            year = d.getFullYear()
        let month = `${(d.getMonth() + 1)}`,
            day = `${d.getDate()}`


        if (month.length < 2) {
            month = `0${month}`
        }
        if (day.length < 2) {
            day = `0${day}`
        }

        return [year, month, day].join('-')
    }

    return (
        < ModalBody >
            <Col className="row form-group" style={{ display: 'none' }}>
                <Label className="col-form-Label col-sm-5" >Organisation Name <span style={{ color: 'red' }}>*</span></Label>
                <Input type="text" className="form-control phone col-sm-7" id="CAC_orgName" placeholder="Organisation Name" autocomplete="off" minLength="8" maxLength="20" 
                    //   style={{ borderColor: (OUN === true) ? '#66DE93' : (OUN === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        validate.ValidateOUName(e.target.value)
                    }}
                />
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-5">Customer Name <span style={{ color: 'red' }}>*</span></Label>
                <Input type="text" uid={customerData.user_id} defaultValue={customerData.customer_Name} className="form-control phone col-sm-7" id="CAC_custName" placeholder="Customer Name" autocomplete="off" minLength="8" maxLength="20" readOnly={true}
                    //   style={{ borderColor: (OUN === true) ? '#66DE93' : (OUN === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        validate.ValidateOUName(e.target.value)
                    }}
                />{/* abhishek 02-03 readonly*/}
            </Col>
            <Col className="row form-group">

                <Label className="col-form-Label col-sm-5">Customer Code <span style={{ color: 'red' }}>*</span></Label>
                <Input type="text" defaultValue={customerData.customer_Code} className="form-control phone col-sm-7" id="CAC_custCode" placeholder="Customer Code" readOnly={true}
                    style={{ borderColor: (lvalid === true) ? '#66DE93' : (lvalid === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        setLvalid(validate.ValidateLName(e.target.value))
                    }}
                />{/* abhishek 02-03 readonly*/}
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-5">Access Role <span style={{ color: 'red' }}>*</span></Label>
                <Input type="select" name="state" className="states order-alpha form-control state col-sm-7" id="CAC_accessRole"
                    style={{ borderColor: (statevalid === true) ? '#66DE93' : (statevalid === null) ? '' : '#D83A56' }}
                    onChange={
                        (e) => {
                            setSTATEvalid(validate.validateState(e.target.value))
                        }
                    }
                >
                    {
                        setRole()
                    }
                </Input>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-5">Status <span style={{ color: 'red' }}>*</span></Label>
                <Input type="select" name="state" className="states order-alpha form-control state col-sm-7" id="CAC_status"
                    style={{ borderColor: (statevalid === true) ? '#66DE93' : (statevalid === null) ? '' : '#D83A56' }}
                    onChange={
                        (e) => {
                            setSTATEvalid(validate.validateState(e.target.value))
                        }
                    }
                >
                    <option value="Requested">Requested</option>
                    <option value="Accepted">Accepted</option>
                   {/* <option value="Rejected">Rejected</option>*/}
                    <option value="Blocked">Blocked</option>
                   {/* <option value="Deleted">Deleted</option>*/}
                </Input>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-5">From Date</Label>
                <div className="col-sm-7" style={{ padding: 0 }}>
                    <Input id="CAC_startDt" className="form-control" readOnly={true}
                        type="date"
                        //placeholderText="Select date range"
                        defaultValue={formatDate(customerData.start_Date)}
                    //selected={startDate} onChange={(date) => setStartDate(date)}
                    //minDate={new Date()}
                    //dateFormat='dd/MM/yyyy'
                    /> </div> {/* abhishek 02-03 readonly*/}
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-5">To Date</Label>
                <div className="col-sm-7" style={{ padding: 0 }}>
                    <Input id="CAC_endDt" className="form-control" readOnly={true}
                        type="date"
                        //placeholderText="Select date range"
                        defaultValue={formatDate(customerData.end_Date)}
                    //selected={endDate} onChange={(date) => setEndDate(date)}
                    //minDate={new Date()}
                    //dateFormat='dd/MM/yyyy'
                    /> </div> {/* abhishek 02-03 readonly*/}
            </Col>

        </ModalBody >
    )
}

export default ModalBodyUI
