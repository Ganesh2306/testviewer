import { useState, useContext, forwardRef, useEffect } from 'react'
import { Input, Label, Col, ModalBody, FormFeedback } from 'reactstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import * as validate from '../../../validation/ValidationFunctions'
import { stateContext } from '../../../context/stateContext'

//let f1 = ""
//let f2 = ""
//let flag = true
// ! PopUpBody
const ModalBodyUI = forwardRef((props, ref) => {
    //f1 = ""
    //f2 = ""
    //flag = true
    //const { errors, register } = props


    //// ! all state value
    ////** First Name */
    //const [rnvalid, setRNvalid] = useState(null)
    ////** Organization Name */
    //const [sdlvalid, setSDLvalid] = useState(null)
    ////** cnf Country */
    //const [rolevalid, setROLEvalid] = useState(null)
    ////** State*/
    //const [statusvalid, setSTATUSvalid] = useState(null)


    //const { isValide, setIsValide, isEmpty, setisEmpty } = useContext(stateContext)
    //const [selectedOption, setSelectedOption] = useState('')
    //const [selectedStatusOption, setselectedStatusOption] = useState('')
    ////  const [selectedOption, setSelectedOption] = useState(props.selectedRole !== null && props.selectedRole !== undefined ? `"${props.selectedRole.role_Type}"` : "")
    //const Flag = () => {
    //    if (rnvalid === true && sdlvalid === true &&
    //        rolevalid === true &&
    //        statusvalid === true) {

    //        //** Then SET Flag to true */
    //        validate.setValide.isAllfield = true
    //        setIsValide(true)

    //    } else {
    //        validate.setValide.isAllfield = false
    //    }
    //}

    //// const setRole = page => {
    //if (props.selectedRole !== null && props.selectedRole !== undefined) {
    //    //setSelectedOption(props.selectedRole.role_Type)
    //    f1 = props.selectedRole.role_Type
    //    f2 = props.selectedRole.is_Blocked === false ? 0 : 1
    //    //return props.selectedRole.role_Type
    //} //else {
    ////        return ""
    ////    }
    ////}

    ////const setStatus = page => {
    ////    if (props.selectedRole !== null && props.selectedRole !== undefined) {
    ////        setSelectedOption(props.selectedRole.is_Blocked === false ? 0 : 1)

    ////        return props.selectedRole.is_Blocked === false ? 0 : 1
    ////    } else {
    ////        return ""
    ////    }
    ////}

    //useEffect(() => {
    //    if (flag) {
    //        setSelectedOption(f1)
    //        setselectedStatusOption(f2)
    //    }
       
    //    // if (props.selectedRole !== null && props.selectedRole !== undefined) {
    //    //setSelectedOption(props.selectedRole.role_Type)
    //    // f1 = props.selectedRole.role_Type
    //    // f2 = props.selectedRole.is_Blocked
    //    //return props.selectedRole.role_Type
    //    //}
    //    //console.log(setRole())
    //    //setSelectedOption(setRole())
    //    //console.log(setStatus())
    //    //  setselectedStatusOption(setStatus())
    //})

    //const handelRolChange = (e) => {
    //    flag = false
    //    setSelectedOption(e.target.value)
    //}

    //const handelStatusChange = (e) => {
    //    flag = false
    //    setselectedStatusOption(e.target.value)
    //}
    const setOrgType = [
        'Organization',
        'Supplier',
        'Customer',
        'Agent'
    ]

    const status = [
        'Active',
        'Blocked'
    ]
    function setRole() {
       
        const oTYpes = []
        if (props.selectedRole !== null && props.selectedRole !== undefined) {
           
            switch (props.selectedRole.role_Type) {
                case 0: {
                    for (let i = 0; i < setOrgType.length; i++) {
                        if (i === 0) oTYpes.push(<option selected value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                        else oTYpes.push(<option value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                    }
                    return oTYpes
                }
                case 1: {
                    for (let i = 0; i < setOrgType.length; i++) {
                        if (i === 1) oTYpes.push(<option selected value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                        else oTYpes.push(<option value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                    }
                    return oTYpes
                }
                case 2: {
                    for (let i = 0; i < setOrgType.length; i++) {
                        if (i === 2) oTYpes.push(<option selected value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                        else oTYpes.push(<option value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                    }
                    return oTYpes
                }
                case 3: {
                    for (let i = 0; i < setOrgType.length; i++) {
                        if (i === 3) oTYpes.push(<option selected value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                        else oTYpes.push(<option value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
                    }
                    return oTYpes
                }
                    break
                default:
            }
        } else {
            for (let i = 0; i < setOrgType.length; i++) {
                oTYpes.push(<option value={i} name={setOrgType[i]}>{setOrgType[i]}</option>)
            }
            return oTYpes
        }
    }

    function setStatus() {
        const statusArr = []
        if (props.selectedRole !== null && props.selectedRole !== undefined) {
            for (let i = 0; i < status.length; i++) {
                if (i === 0 && !props.selectedRole.is_Blocked) statusArr.push(<option selected value={i} name={status[i]}>{status[i]}</option>)
                else if (i === 1 && props.selectedRole.is_Blocked) statusArr.push(<option selected value={i} name={status[i]}>{status[i]}</option>)
                else statusArr.push(<option value={i} name={status[i]}>{status[i]}</option>)
            }
        } else {
            for (let i = 0; i < status.length; i++) {
                statusArr.push(<option value={i} name={status[i]}>{status[i]}</option>)
            }
        }
        return statusArr
    }

    return (
        < ModalBody >
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Role Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                    <Input autoComplete="off" type="hidden" id="role_Id" innerRef={props.register({ required: true })}
                        invalid={props.errors.role_Id && true} name="role_Id" value={props.selectedRole !== undefined && props.selectedRole !== null ? props.selectedRole.role_Id : 0} />
                    {props.errors && props.errors.role_Id && <FormFeedback>{props.errors.supplier_id.message}</FormFeedback>}
                    <Input defaultValue={props.selectedRole !== null && props.selectedRole !== undefined ? props.selectedRole.role_Name : ""} innerRef={props.register({ required: true })}
                        invalid={props.errors.role_Name && true} name="role_Name" autoComplete="off" type="text" className="form-control" id="role_Name" placeholder="Role Name"
                        // style={{ borderColor: (rnvalid === true) ? '#66DE93' : (rnvalid === null) ? '' : '#D83A56' }}
                        onChange={(e) => {
                            // setRNvalid(validate.ValidateFName(e.target.value))
                            // Flag()

                        }}
                    />
                    {props.errors && props.errors.role_Name && <FormFeedback>{props.errors.role_Name.message}</FormFeedback>}
                </div>
            </Col>

            {/*<Col className="row form-group">*/}

            {/*    <Label className="col-form-label col-sm-6 ">Save Design Limit  <span style={{ color: 'red' }}>*</span></Label>*/}
            {/*    <div className="col-sm-6 p-0"> <Input innerRef={props.register({ required: true })}*/}
            {/*        invalid={props.errors.role_Description && true} name="role_Description" type="text" className="form-control" id="role_Description" placeholder="Save Design Limit"*/}
            {/*        //style={{ borderColor: (sdlvalid === true) ? '#66DE93' : (sdlvalid === null) ? '' : '#D83A56' }}*/}
            {/*        onChange={(e) => {*/}
            {/*            // setSDLvalid(validate.ValidateOUName(e.target.value))*/}
            {/*            // Flag()*/}
            {/*        }}*/}
            {/*    /> {props.errors && props.errors.role_Description && <FormFeedback>{props.errors.role_Description.message}</FormFeedback>}*/}
            {/*    </div>*/}
            {/*</Col>*/}


            <Col className="row form-group">
                <Label className="col-form-label col-sm-6">Role  <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                    <Input
                        ///*value={selectedOption}*/
                        //  defaultValue={ "1" }//{props.selectedRole !== null && props.selectedRole !== undefined ? `"${props.selectedRole.role_Type}"` : ""}
                       // onChange={handelRolChange}
                        innerRef={props.register({ required: true })}
                        invalid={props.errors.role_Type && true} name="role_Type" type='select' className="form-control" id="role_Type">
                        <option value="">Select Role </option>
                        {
                            setRole()
                        }
                    </Input>
                    {props.errors && props.errors.role_Type && <FormFeedback>{props.errors.role_Type.message}</FormFeedback>}
                </div>
            </Col>

            <Col className="row form-group">
                <Label className="col-form-label col-sm-6">Status <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                    <Input
                        //value={selectedStatusOption}
                       // onChange={handelStatusChange}
                        // defaultValue={props.selectedRole !== null && props.selectedRole !== undefined ? (props.selectedRole.is_Blocked === false ? 0 : 1) : ""}
                        type="select" name="is_Blocked" className="form-control" innerRef={props.register({ required: true })}
                        invalid={props.errors.is_Blocked && true} id="is_Blocked">
                        <option value="">Status </option>
                        {
                            setStatus()
                        }
                    </Input>
                    {props.errors && props.errors.is_Blocked && <FormFeedback>{props.errors.is_Blocked.message}</FormFeedback>}
                </div>
            </Col>

        </ModalBody >
    )
})

export default ModalBodyUI
