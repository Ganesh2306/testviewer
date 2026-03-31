import React, { useState, useEffect, useRef } from 'react'
import { Card, CardText, Button, Input, Label, Col, ModalBody, ListGroup, ListGroupItem, FormFeedback, FormGroup } from 'reactstrap'
import ListGroupDesign from './ListGroupDesign'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getDesignFeautre } from '../store/actions/index'
import { SearchCollectionListBySeasonId } from '../../../seasonal/store/actions'
// ! PopUpBody 
const ModalBodyDesignFeature = (props) => {
    //for add list text 
    const dispatch = useDispatch()
    const [IsExist, setExist] = useState(false)
    const Swal = require('sweetalert2')
    const { errors, register, editName, editLabelName, editLabelList, saveBtnRef } = props
    const [data, setdata] = useState([])
    //const data =[]
    const [print, setprint] = useState(false)
    const [featureNAme, setfeatureNAme] = useState(null)
    const Updatebtn = useRef(null)
    const ValidateFgName = (orgname, Ref) => {
        //saveBtnRef
       
        if (orgname === "") {
           
            if (Ref && Ref.current) {
                Ref.current.disabled = true
                Updatebtn.current.disabled = true
            //console.log(Ref.current)
            }
            return false
        } else {
            if (Ref && Ref.current) {
                Ref.current.disabled = false
                Updatebtn.current.disabled = false
            //console.log(Ref.current)
            }
            return true
        }
    }
    const CheckDesignFeature = (e) => {
        
        const types = []
        const obj = new Object()
        obj.Feature_Name = e.target.value
        types.push(obj)

        axios.post('./Management/CheckDesignFeature', types).then(response => {
            if (JSON.parse(response.data).designFeatureIsExisting) {
                e.target.nextElementSibling.classList.add("d-block")
                setExist(true)
                setfeatureNAme(false)
            } else {
                setExist(false)
                e.target.nextElementSibling.classList.remove("d-block")
                setfeatureNAme(true)
            }
        })
    }
    const RemoveElement = (e) => {
        
        e.target.parentElement.remove()
    }
    const AddToList = () => {
        let Ispresent = false
        for (let i = 0; i < document.getElementsByName("listfeature11")[0].children.length; i++) {
           
            if (document.getElementById("design_Feature_name").value === document.getElementsByName("listfeature11")[0].children[i].innerText) Ispresent = true
           
        }
        if (Ispresent) {
            Swal.fire({
                icon: 'error',
                title: 'Exist...',
                text: 'Design feature already exist in list !'
            })
            return
        }

        if (IsExist) {
            Swal.fire({
                icon: 'error',
                title: 'Exist...',
                text: 'Design feature already exist in database !'
            })
            return
        }
        setfeatureNAme(ValidateFgName(document.getElementById("design_Feature_name").value))
        if (ValidateFgName(document.getElementById("design_Feature_name").value)) {

            setdata(obj => [...obj, <ListGroupItem key={new Date()} >{document.getElementById("design_Feature_name").value}<i onClick={(e) => { RemoveElement(e) } } className="fa fa-trash" aria-hidden="true" role='button' style={{ position: 'absolute', right: '8px', fontSize: "12px" }}></i></ListGroupItem>])
        }
        document.getElementById("design_Feature_name").value = ""
        setfeatureNAme(null)
    }
 
    const UpdateFeature = (e, option) => {

        const features = []
        
            const obj = new Object()
            const root = new Object()
            obj.state = 2
            obj.design_Feature_Id = document.getElementsByName("design_Feature_name")[0].getAttribute("fid")
            obj.organisation_Id = document.getElementsByName("design_Feature_name")[0].getAttribute("orgid")
            obj.design_Feature_name = document.getElementsByName("design_Feature_name")[0].value
            obj.filter_Control = document.getElementsByName("controlType")[0].value
        if (document.getElementsByName("controlType")[0].value === "8" || document.getElementsByName("controlType")[0].value === "7") {
                obj.range_Start = document.getElementById("start").value
                obj.range_End = document.getElementById("end").value
                obj.range_Difference = document.getElementById("diff").value
            }
            features.push(obj)     
        
        axios.post('./Management/SaveFeature', features)
            .then(response => {
                const result = response.data === null ? null : JSON.parse(response.data)
                if (result.isSave !== null && result.isSave !== false) {
                    const obj = new Object()
                    const pageno = Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1
                    const entries = Number(document.getElementById("sort-select").value)
                    if (pageno === 0) {
                        obj.page = 0
                        obj.perPage = entries
                    } else {
                        obj.page = pageno * entries
                        obj.perPage = entries
                    }
                    dispatch(getDesignFeautre(obj))
                    props.setis_open(false)
                    Swal.fire(
                        'Success!',
                        'Feature Updated successfully!!',
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                }

            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
    
    const getData = (e) => {
        console.log(e.target.value)
        setdata(e.target.value)
    }

    //for show hide range below 
    // const [state, setState] = React.useState({
    //     showElement: false
    // })
    const [showrange, setshowrange] = useState(false)
    useEffect(() => {
        if (document.getElementsByName("controlType")[0].selectedIndex  === 8 || document.getElementsByName("controlType")[0].selectedIndex  === 7) {
            setshowrange(true)
        } else {
            setshowrange(false)
        }
        return () => {
        }
      }, [])
    const handleChange = (e) => {
        console.log(e.target.value)
        if (e.target.value === '8' || e.target.value === '7') {
            setshowrange(true)
        } else {
            setshowrange(false)
        }
    }

    const handleClick = (event, index) => {
        console.log(event.target.dataset.value)
        //What do I need to do?
    }

    const store = {
        start:'',
        end:'',
        diff:''
    }

    const ValidationChnage = (e, context) => {
        const num = parseInt(e.target.value) ? "" : parseInt(e.target.value)

        switch (context.toLocaleLowerCase()) {
            case "start":
                /*if ((num > 0 || num === "") || (num < store.end))*/
                if (num !== 0 && (num > store.end || num === "")) {
                    store.start = e.target.value
                } else {
                    e.target.value = store.start
                }
              break
            case "end":
                if (num > 0 && store.start  < num) {
                    store.end = num
                } else {                 
                    e.target.value = ""
                    store.end = ""
                }
              break
            case "diff":
                if (num > 0 && store.start < num && store.end > num) {
                    store.diff = num
                } else {
                    e.target.value = ""
                    store.diff = ""
                }               
             break
          }
    }

    useEffect(() => {
      if (props.selectedFeature === null || props.selectedFeature === undefined || props.selectedFeature.design_Feature_Name === '') {
        if (saveBtnRef) {
            saveBtnRef.current.disabled = true
            Updatebtn.current.disabled = true
        }
      }
    
      return () => {
        //saveBtnRef.current.disabled = false
      }
    }, [])
    

    return (
        < ModalBody >
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-4">Select Control Type</Label>
                <Input defaultValue={props.selectedFeature === null ? "" : props.selectedFeature.filter_Control} type="select" 
                name="controlType" 
                className="form-control col-sm-5 ml-1" id="" onChange={handleChange}
                >
                    <option value="0">Editbox</option>
                    <option value="1">Text Dropdown</option>
                    <option value="2">Multiselect Textdropdown</option>
                    <option value="3">Color Dropdown</option>
                    <option value="4">Color Multiselect Dropdown</option>
                    <option value="5">Color TextDropdown</option>
                    <option value="6" >Color Multiselect textdropdown</option>
                    <option value="7" >Range Combobox</option>
                    <option value="8">Range</option>
                </Input>
            </Col>
            <Col className="row form-group">
                <Label className="col-form-Label col-sm-4">{editLabelName}</Label>
                <div className='col-sm-5'>
                    <FormGroup className='mb-0 py-0'>
                        <Input type="text"
                            className="form-control"
                            id="design_Feature_name" placeholder="Add Feature"
                            defaultValue={props.selectedFeature === null ? "" : props.selectedFeature.design_Feature_Name}
                            orgid={props.selectedFeature === null ? "" : props.selectedFeature.organisation_Id}
                            fid={props.selectedFeature === null ? "" : props.selectedFeature.design_Feature_Id}
                            name="design_Feature_name"
                            style={{ borderColor: (featureNAme === true) ? '#2778c4' : (featureNAme === null) ? '' : '#D83A56' }}
                            onChange={(e) => {
                                CheckDesignFeature(e)
                                setfeatureNAme(ValidateFgName(e.target.value.trim(), saveBtnRef))
                            }}
                        />
                        <span className="invalid-feedback">Design feature already exist in database! </span>
                        <FormFeedback style={{ display: `${featureNAme}` }} >Feature Name Required*</FormFeedback>
                    </FormGroup>
                </div>
                <div className="col-sm-3">
                    <Button.Ripple color='primary' innerRef={Updatebtn} onClick={(e) => { 
                        editName === 'Update' ? UpdateFeature(e) : AddToList() 
                        }}>
                        {editName}
                    </Button.Ripple>
                </div>
            </Col>
            <Col className="row form-group">
                <Label className="control-Label col-sm-4">{editLabelList}</Label>
                <div className='col-sm-7'>
                    <FormGroup className='mb-0 py-0'>
                        <Card title='Simple List Group' style={{ border: "1px solid #d8d6de" }}>
                            <ListGroup
                                name="listfeature11"
                                flush className="spanStyles"
                                style={{ borderColor: '#0000', height: '200px', overflowY: "scroll", position: "relative" }}
                                handleClick={handleClick}
                               >
                                {data}
                            </ListGroup>

                       </Card>
                    </FormGroup>
                </div>
            </Col>
            <Col className="row form-group" id="range_row" style={{ display: showrange ? 'flex' : 'none' }}>
                <Label className="col-form-Label col-sm-4">Range</Label>
                <div className="col-sm-8 p-0 d-flex p-0">
                    <Col className="col-sm-4 d-flex ">
                        <Label className="col-form-Label col-sm-5 p-0">Start</Label>
                        <Input defaultValue={props.selectedFeature === null ? "" : props.selectedFeature.range_Start} 
                        type="number" className="form-control col-sm-6 p-0" id="start" placeholder="" maxLength="15"
                            onBlur={(e) => {
                                //ValidationChnage(e, 'start')
                                const num = parseInt(e.target.value) ? parseInt(e.target.value) : ""
                                if (num !== 0 && (num > store.end || num === "")) {
                                    store.start = e.target.value
                                } else {
                                    e.target.value = store.start
                                }
                            }}
                                
                        />
                    </Col>
                    <Col className="col-sm-4 d-flex">
                        <Label className="col-form-Label col-sm-5 p-0" >End</Label>
                        <Input defaultValue={props.selectedFeature === null ? "" : props.selectedFeature.range_End}
                            type="number" className="form-control col-sm-6 p-0" id="end" placeholder="" maxLength="15"
                            onBlur={(e) => {
                                //ValidationChnage(e, 'end')
                                const num = parseInt(e.target.value) ? parseInt(e.target.value) : ""
                                if (num !== 0 && (num > store.start)) {
                                    store.end = e.target.value
                                } else {
                                    e.target.value = store.end
                                }
                            }}
                        />
                    </Col>
                    <Col className="col-sm-4 d-flex">
                        <Label className="col-form-Label col-sm-7 p-0" >Difference</Label>
                        <Input defaultValue={props.selectedFeature === null ? "" : props.selectedFeature.range_Difference}
                            type="number" className="form-control col-sm-6 p-0" id="diff" placeholder="" maxLength="15"
                            onBlur={(e) => {

                                //ValidationChnage(e, 'diff')
                                const num = parseInt(e.target.value) ? parseInt(e.target.value) : ""
                                if ((num > store.start && num < store.end) && (num !== 0)) {
                                    store.diff = e.target.value
                                } else {
                                    e.target.value = store.diff
                                }
                            }}
                        />
                    </Col>

                </div>
            </Col>
            {/* <Col className="row form-group">
        <Label className="col-form-Label col-sm-4">Description</Label>        
        <Input type="textarea" className="form-control col-sm-8" id="" placeholder="Description" maxLength="15" 
             />
      </Col> */}
        </ModalBody >
    )
}

export default ModalBodyDesignFeature
