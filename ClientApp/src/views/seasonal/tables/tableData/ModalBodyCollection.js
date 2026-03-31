import { useState, useContext, forwardRef, useEffect } from 'react'
import { Input, Label, Col, ModalBody, FormFeedback, Button } from 'reactstrap'
import "react-datepicker/dist/react-datepicker.css"
import { EditableSelect } from '../../FormComponent/SelectOption'
import './../../seasons.css'
import Avatar from '@components/avatar'

// ! PopUpBody

const ModalBodyCollection = forwardRef((props, ref) => {
    const [CustomerName, SetCustomerName] = useState()
    const [selectedSeson, setSelectedSeason] = useState()
    const Seaslist = props.Seaslist
    const Customer = props.setCustomer
    const Selseas = props.Selseas
    const [articleValue, setArticleValue] = useState('')
    const SelectCustomerName = (e) => {
        const CustomerId = e.currentTarget.value !== "" ? e.currentTarget.value : 0
        if (props.SetCustomerId) {
            props.SetCustomerId(CustomerId)
        }  
        SetCustomerName(CustomerId)
        //props.selectedcollection.collection_Customer_Id = e.currentTarget.value
    }
    const onChangeArticleName = (e) => {
        setArticleValue(e.target.value)
    }
    useEffect(() => {
        if (props.selectedcollection) {
            const key = Object.keys(Seaslist).find(key => Seaslist[key].sm_Season_Id === props.selectedcollection.sm_Season_Id) 
            setSelectedSeason(Seaslist[key].sm_Season_Name)
        }
    })
    
    
     //** Season_name */
     const [season, setSeasonName] = useState(null)
     const [collection, setcollectionName] = useState(null)
     const [collectionType, setCollectiontype] = useState(null)
     const [customer, setcustomer] = useState(null)

     // ** Status */
     const [statusvalid, setStatusvalid] = useState(true)
     const [CCode, SetCCode] = useState(null)
     const [uCCode, SetUCCode] = useState(null)
     //** State Code *//
     function setStatus() {
        let status = []
        if (props.selectedcollection !== undefined && props.selectedcollection !== null) {
            status.push(<option selected value="false">Active</option>)
            if (props.selectedcollection.sm_State) {
                status = []
                status.push(<option selected value="true">Block</option>)
                status.push(<option value="false">Active</option>)
            } else {
                status.push(<option value="true">Block</option>)
            }

        } else {

            status.push(<option value="false">Active</option>)
            status.push(<option value="true">Block</option>)
        }
        return status
    }

    const [img, setImg] = useState(null)
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    }
    if (props.selectedcollection !== undefined && props.selectedcollection !== null) {
       //seasonIamge
       let baseString = props.selectedcollection.collectionIamge !== null ? props.selectedcollection.collectionIamge : null
       console.log(baseString)
       if (baseString !== null && baseString !== undefined) {
           baseString = `data:image/jpeg;base64,${baseString}`
           if (img === null) setImg(baseString)
       }
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
                    //type="select" 
                    //value={props.SeasonId ? props.SeasonId : (props.selectedcollection !== undefined && props.selectedcollection !== null ? props.selectedcollection.sm_Season_Id : "")} 
                    name="Select_Season"
                    className=" col-sm-12"
                    //placeholder="Select Season"
                    parentid="#C_StoreType" subid="#C_StoreType" id="C_StoreType" 
                    defaultValue={props.SeasonName ? props.SeasonName : (props.selectedcollection !== undefined && props.selectedcollection !== null ? selectedSeson : "")}
                    disabled = {props.SeasonName ? props.SeasonName : (props.selectedcollection !== undefined && props.selectedcollection !== null ? selectedSeson : "")}
                    innerRef={props.register({ required: true })} 
                >
                     {/* {
                        Seaslist && Seaslist.map((e, k) => {
                            return <option value={e.sm_Season_Id}>{e.sm_Season_Name}</option>
                             })
                     }  */}
                </Input>
                 
                </div>
            </Col>
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Collection Name <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                    
                    <Input  
                         name="Collection_Name" autoComplete="off" type="text" className="form-control" id="role_Name" placeholder="Collection Name"
                         defaultValue={props.selectedcollection !== undefined && props.selectedcollection !== null ? props.selectedcollection.collection_Name : ""}
                         innerRef={props.register({ required: true })} 
                         invalid={props.errors.Collection_Name && true}
                    />
                     {props.errors && props.errors.Collection_Name && <FormFeedback >{props.errors.Collection_Name.message}</FormFeedback>}
                    
                </div>
            </Col>
            {/* <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Collection Type <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                <Input type="select" name="Collection_Type" className=" col-sm-12" placeholder="Select Season" 
                parentid="#C_StoreType" subid="#C_StoreType" id="C_StoreType"
                defaultValue={props.selectedcollection !== undefined && props.selectedcollection !== null ? props.selectedcollection.season_name : ""}
                innerRef={props.register}      
                >
                     <option value="local" name="local">Production</option> 
                     <option value="local" name="local">Development</option> 
                </Input>
                 
                </div>
            </Col> */}
            {/* <Col className="row form-group article_section">

                <Label className="col-form-label col-sm-6">Article <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                  
                <EditableSelect onChangeArticle={onChangeArticleName} onFocusOut={onChangeArticleName} value={articleValue} />
              
                </div>
            </Col> */}
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Customer </Label>
                <div className="col-sm-6 p-0">
                <Input type="select" value={CustomerName ? CustomerName : (props.selectedcollection !== undefined && props.selectedcollection !== null ? props.selectedcollection.collection_Customer_Id : "")} onChange={(event) => SelectCustomerName(event)} name="Customer_Name" className=" col-sm-12" placeholder="Select Season"
                parentid="#C_StoreType" subid="#C_StoreType" id="C_StoreType"
                //defaultValue={props.selectedcollection === undefined && props.selectedcollection === null ? "" : props.selectedcollection.customer_Name}
                innerRef={props.register({ required: true })} 
                >
                    <option value="0">Select Customer</option>
                    {
                        Customer && Customer.map((e, k) => {
                            return <option id={e.customer_id}  value={e.customer_id}>{e.customer_Name}</option>
                             })
                    } 
                </Input>
                 
                </div>
            </Col>
            {/* <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">State <span style={{ color: 'red' }}>*</span></Label>
                <div className="col-sm-6 p-0">
                <Input type="select"  name="Status" className=" col-sm-12" parentid="#C_StoreType" 
                subid="#C_StoreType" id="C_StoreType"
                innerRef={props.register}  >
                     <option value="1" name="local">Active</option>
                     <option value="0" name="local">Block</option>
                  </Input>         
                </div>
            </Col> */}
            <Col className="row form-group ">

                <Label className="col-form-label col-sm-6">Picture <span style={{ color: 'red' }}></span></Label>
                <div className="col-sm-6 p-0">
                {renderUserAvatar()}
                    <Input data={img} innerRef={props.register({ required: true })}  onChange={onChange} autoComplete="off" type="file"  style={{display:'Browse...'}} id="role_Id" 
                         name="profile_Image" placeholder="Description" />
                     <FormFeedback></FormFeedback>
                    
                </div>
            </Col>
    
        </ModalBody >
    )
})

export default ModalBodyCollection
