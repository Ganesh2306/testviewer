import { useState } from 'react'

import { Button, Modal, Form } from 'reactstrap'
import { Delete, Edit, Phone, Shield, Trash } from 'react-feather'
import { useDispatch} from 'react-redux'
import axios from 'axios'
import ModalBodyConfig from './ModalBodyConfig'
import { GetDesignTypes } from '../store/actions/index'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'

// ! Add AddUser function 
const AddDesignConfig = (props) => {
    const [is_open, setis_open] = useState(false)
    const [types, settypes] = useState([])
    const Swal = require('sweetalert2')
    const dispatch = useDispatch()
    const GetTYPEGroupFeature = () => {
       
        if (props.type === "config") {

            axios.get('./Management/GetDesignTypeByOrgId')
                .then(response => {
                    settypes(response.data)

                })
                .then(() => {

                })
                .catch(err => console.log(err))

        } else if (props.type === "Dtype") {
          
            axios.post('./Management/GetDesignGroupByOrgId', { TypeID: props.id })
                .then(response => {
                    settypes(response.data)

                })
                .then(() => {

                })
                .catch(err => console.log(err))

        } else {

            axios.post('./Management/GetDesignFeatureByOrgId', { GroupId: props.typeid, TypeID: props.id })
                .then(response => {
                    settypes(response.data)

                })
                .then(() => {

                })
                .catch(err => console.log(err))
        }
        setis_open(true)

    }

    const DeleteConfiguration = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this Configuartion ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

        const obj = new Object()
        const arr = []
        if (props.type === "Dtype") {
            obj.design_Type_Id = props.id
            obj.state = 3
            obj.design_Configuration_Id = props.pcid
            arr.push(obj)
            axios.post('./Management/SaveDesignConfiguartion', arr)
                .then(response => {
                    //abhishek start 10/03
                    if (JSON.parse(response.data).isSave) {
                        //setis_open(false)
                        dispatch(GetDesignTypes())

                        Swal.fire(
                            'Deleted!',
                            'Your Design Configuartion has been deleted.',
                            'success'
                        )
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Role',
                            text: JSON.parse(response.data).message
                        })
                    }
                })
                //abhishek end 10/03
                .then(() => {

                })
                .catch(err => console.log(err))
        } else if (props.type === "Dgroup") {
           
            obj.design_Type_Id = props.typeid
            obj.design_Group_Id = props.id
            obj.state = 3
            obj.design_Configuration_Id = props.pcid
            arr.push(obj)
            axios.post('./Management/SaveDesignConfiguartion', arr)
                .then(response => {
                   
                    //setis_open(false)
                    dispatch(GetDesignTypes())

                    Swal.fire(
                        'Deleted!',
                        'Your Design group has been deleted.',
                        'success'
                    )

                })
                .then(() => {

                })
                .catch(err => console.log(err))
        } else {
            obj.design_Type_Id = props.typeid
            obj.design_Group_Id = props.groupid
            obj.design_Feature_Id = props.id
            obj.state = 3
            obj.design_Configuration_Id = props.pcid
            arr.push(obj)
            axios.post('./Management/SaveDesignConfiguartion', arr)
                .then(response => {
                    if (JSON.parse(response.data).isSave) {
                        //setis_open(false)
                        dispatch(GetDesignTypes())

                        Swal.fire(
                            'Success',
                            'Your Design feature has been deleted.',
                            'success'
                        )
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Role',
                            text: JSON.parse(response.data).message
                        })
                    }

                })

                .then(() => {

                })
                .catch(err => console.log(err))
                }

            }
        })

    }
    
    let deletebtn
    if (props.type !== "config") {
        deletebtn = (<Trash onClick={DeleteConfiguration} size={15} role="button" ></Trash>)
    }
    let editbtn
    if (props.type === "Dgroup" || props.type === "Dtype" || props.type === "config") {
        
        editbtn = (<Edit size={15} onClick={GetTYPEGroupFeature} className="mr-2" role="button"></Edit>)
    }


    const SaveTypeConfiuration = () => {
      
        const lis = document.getElementById('listTypeGF').getElementsByTagName('li')
        const  arr = []
        for (let i = 0; i < lis.length; i++) {
            const obj = new Object()
            obj.design_Type_Id = Number(lis[i].id)
            if (lis[i].children[0].children[0].checked && lis[i].getAttribute("PCid") === "0") obj.design_Type_Id = Number(lis[i].id)

            else if (lis[i].children[0].children[0].checked && lis[i].getAttribute("PCid") !== "0") obj.state = 1

            else if (lis[i].children[0].children[0].checked === false && lis[i].getAttribute("PCid") !== "0") {
                obj.state = 3
                obj.design_Configuration_Id = lis[i].getAttribute("PCid")
            } else if (lis[i].children[0].children[0].checked === false && lis[i].getAttribute("PCid") === "0") continue
           
               
                arr.push(obj)
            }

        axios.post('./Management/SaveDesignConfiguartion', arr)
            .then(response => {         
                dispatch(GetDesignTypes())
                GetTYPEGroupFeature()
                setis_open(false)
                Swal.fire(
                    'Success',
                    'Type Configured successfully!!',
                    'success'
                )
                
            })
            .then(() => {

            })
            .catch(err => console.log(err))

    }
    const SaveGroupConfiuration = () => {
        
        const lis = document.getElementById('listTypeGF').getElementsByTagName('li')
        const arr = []
        for (let i = 0; i < lis.length; i++) {
            const obj = new Object()
            obj.design_Group_Id = Number(lis[i].id)
            obj.design_Type_Id = props.id
            if (lis[i].children[0].children[0].checked && lis[i].getAttribute("PCid") === "0") {
                obj.design_Group_Id = Number(lis[i].id)
                obj.design_Type_Id = props.id
            } else if (lis[i].children[0].children[0].checked && lis[i].getAttribute("PCid") !== "0") obj.state = 1

            else if (lis[i].children[0].children[0].checked === false && lis[i].getAttribute("PCid") !== "0") {
                obj.state = 3
                obj.design_Configuration_Id = lis[i].getAttribute("PCid")
            } else if (lis[i].children[0].children[0].checked === false && lis[i].getAttribute("PCid") === "0") continue


            arr.push(obj)
        }

        axios.post('./Management/SaveDesignConfiguartion', arr)
            .then(response => {
               
                //setis_open(false)
                dispatch(GetDesignTypes())
                GetTYPEGroupFeature()
                Swal.fire(
                    'Success',
                    'Group Configured successfully!!',
                    'success'
                )

            })
            .then(() => {

            })
            .catch(err => console.log(err))

    }
    const SaveFeatureConfiuration = () => {
        
        const lis = document.getElementById('listTypeGF').getElementsByTagName('li')
        const arr = []
        for (let i = 0; i < lis.length; i++) {
            const obj = new Object()
            obj.design_Feature_Id = Number(lis[i].id)
            obj.design_Type_Id = props.id
            obj.design_Group_Id = props.typeid
            if (lis[i].children[0].children[0].checked && lis[i].getAttribute("PCid") === "0") {
                obj.design_Feature_Id = Number(lis[i].id)
                obj.design_Type_Id = props.typeid
                obj.design_Group_Id = props.id
                
            } else if (lis[i].children[0].children[0].checked && lis[i].getAttribute("PCid") !== "0") obj.state = 1

            else if (lis[i].children[0].children[0].checked === false && lis[i].getAttribute("PCid") !== "0") {
                obj.state = 3
                obj.design_Configuration_Id = lis[i].getAttribute("PCid")
            } else if (lis[i].children[0].children[0].checked === false && lis[i].getAttribute("PCid") === "0") continue

            arr.push(obj)
        }

        axios.post('./Management/SaveDesignConfiguartion', arr)
            .then(response => {
                
                //setis_open(false)
                dispatch(GetDesignTypes())
                GetTYPEGroupFeature()
                Swal.fire(
                    'Success',
                    'Feature Configured successfully!!',
                    'success'
                )

            })
            .then(() => {

            })
            .catch(err => console.log(err))

    }


    return (
        <div className="position-absolute top-0 start-100 translate-middle" style={{ right: "16px", top: "8px", position: "absolute" }}>      
            {editbtn}
            {deletebtn}
            <Modal backdrop="static" isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm'>
                <ModalHeaderUI setis_open={setis_open} headerName={props.type === "config" ? "Design Type" : props.type === "Dtype" ? "Design Group" : "Design Feature"} />
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                    
                        if (props.type === "config") SaveTypeConfiuration()
                            
                        else if (props.type === "Dtype") SaveGroupConfiuration()
                        else SaveFeatureConfiuration()
                            

                    }} >
                   <ModalBodyConfig forWhat={props.type} types={types} bodyFor="AddDesign" />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    )
}

export default AddDesignConfig