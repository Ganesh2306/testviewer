import { useState, useContext, forwardRef, useEffect } from 'react'
import { Input, Label, Col, ModalBody, FormFeedback, Button } from 'reactstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import * as validate from '../../../validation/ValidationFunctions'
import { stateContext } from '../../../context/stateContext'
import Avatar from '@components/avatar'


// ! PopUpBody

const ModalBodyUI = forwardRef((props, ref) => {
     //** Season_name */
     const [useridvalid, setUIDvalid] = useState(null)
     // ** Status */
     const [statusvalid, setStatusvalid] = useState(true)
     const [img, setImg] = useState(null)
     const onChange = e => {
         const reader = new FileReader(),
             files = e.target.files
         reader.onload = function () {
             setImg(reader.result)
         }
         reader.readAsDataURL(files[0])
     }
     if (props.selectedseasonal !== undefined && props.selectedseasonal !== null) {
        let baseString = props.selectedseasonal.seasonIamge !== null ? props.selectedseasonal.seasonIamge : null
        
        if (baseString !== null && baseString !== undefined) {
            baseString = `data:image/jpeg;base64,${baseString}`
            if (img === null) setImg(baseString)
        }
    }

    function setStatus() {
        let status = []
        if (props.selectedseasonal !== undefined && props.selectedseasonal !== null) {
            status.push(<option selected value={0}>Block</option>)
            if (props.selectedseasonal.sm_State) {
                status = []
                status.push(<option selected value={1}>Active</option>)
                status.push(<option value={0}>Block</option>)
            } else {
                status.push(<option value={1}>Active</option>)
            }

        } else {

            status.push(<option value={1}>Active</option>)
            status.push(<option value={0}>Block</option>)
        }
        return status
    }

    const renderUserAvatar = () => {
        if (img === null) {
            const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]
            return (
                <Avatar
                    initials
                    color={color}
                    className='rounded mr-2 my-25'
                    content='profile image'
                    contentStyles={{
                        borderRadius: 0,
                        fontSize: 'calc(36px)',
                        width: '100%',
                        height: '100%'
                    }}
                    style={{
                        height: '90px',
                        width: '90px'
                    }}
                />
            )
        } else {
            return (
                <img
                    className='user-avatar rounded mr-2 my-25 cursor-pointer'
                    src={img}
                    alt='user profile avatar'
                    height='90'
                    width='90'
                />
            )
        }
    }
    
    return (
        < ModalBody >
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Season Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                    <Input
                     defaultValue={props.selectedseasonal !== undefined && props.selectedseasonal !== null ? props.selectedseasonal.sm_Season_Id : 0}
                     innerRef={props.register({ required: true })} 
                      autoComplete="off"
                       type="hidden"
                        id="season_ID" 
                        name="season_Id"
                    />
                    <Input 
                    defaultValue={props.selectedseasonal !== undefined && props.selectedseasonal !== null ? props.selectedseasonal.sm_Season_Name : ""} 
                    //disabled={props.selectedseasonal !== undefined && props.selectedseasonal !== null ? props.selectedseasonal.sm_Season_Name : ""}
                    innerRef={props.register({ required: true })} 
                    name="Season_Name" 
                    autocomplete="none"
                     type="text"
                     className="form-control" 
                     id="Season Name"
                    placeholder="Season Name"
                    invalid={props.errors.Season_Name && true}
                      />
                    {props.errors.Season_Name && <FormFeedback >{props.errors.Season_Name.message}</FormFeedback>}
                </div>
            </Col>
            {/* <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Description <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                    <Input  autoComplete="off" type="hidden" id="role_Id" 
                         name="Description_id"  />
                     <FormFeedback></FormFeedback>
                    <Input defaultValue={props.selectedseasonal !== undefined && props.selectedseasonal !== null ? props.selectedseasonal.sm_Season_Name : ""} innerRef={props.register({ required: true })}
                         name="Description" autoComplete="off" type="textarea" className="form-control" id="Description_id" placeholder="Description "
                    />
                    
                </div>
            </Col> */}
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">State <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                <Input 
                //defaultValue={props.selectedseasonal !== undefined && props.selectedseasonal !== null ? `${!props.selectedseasonal.sm_State}` : "false"}
                 type="select" name="state" className=" col-sm-12" parentid="#C_StoreType" subid="#C_StoreType" id="C_StoreType"
                    innerRef={props.register({ required: true })} 
                  >
                     {/* <option value="1" name="local">Active</option> 
                     <option value="0" name="local">Block</option>  */}
                     {setStatus()}
                  </Input>
                        
                   
                </div>
            </Col>
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Picture </Label>
                <div className="col-sm-6 p-0">
                     {renderUserAvatar()}
                    <Input data={img} innerRef={props.register({ required: true })} autoComplete="off" type="file"  onChange={onChange} style={{display:'Browse...'}} id="role_Id" 
                         name="profile_Image" placeholder="Description"  />
    
                     <FormFeedback></FormFeedback>
                    
                </div>
            </Col>
        </ModalBody >
    )
})

export default ModalBodyUI
