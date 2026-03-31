import { useState } from 'react'

import { Button, Modal, Form } from 'reactstrap'
import axios from 'axios'
import { getDesignFeautre } from '../store/actions/index'
import ModalBodyDesignFeature from './ModalBodyDesignFeature'
import { useDispatch, useSelector } from 'react-redux'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object } from 'yup/lib/locale'
// ! Add AddUser function 
const AddDesignFeature = (btnName) => {
    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    const SignupSchema = yup.object().shape({
        design_Feature_name: yup.string().trim().min(2, " Design Feature Name must have at least 2 characters").max(15).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Feature Name "),
        listfeature: yup.string().required("At least One Feature Name Required")

    })

    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const SaveFeature = e => {
       
    }
    return (
        <div>
            <Button.Ripple color='primary' onClick={() => {  setis_open(true) }}>
                Add Design Feature
           </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md' backdrop="static" >
                <ModalHeaderUI setis_open={setis_open} headerName="Add Design Feature" />
                <Form onSubmit={(e) => {                   
                    e.preventDefault()

                    const features = []
                    for (let i = 0; i < document.getElementsByName("listfeature11")[0].children.length; i++) {
                        const obj = new Object()
                        const root = new Object()
                        obj.design_Feature_name = document.getElementsByName("listfeature11")[0].children[i].innerText
                        obj.filter_Control = document.getElementsByName("controlType")[0].value
                        if (document.getElementsByName("controlType")[0].value === "8" || document.getElementsByName("controlType")[0].value === "7") {
                            obj.range_Start = document.getElementById("start").value
                            obj.range_End = document.getElementById("end").value
                            obj.range_Difference = document.getElementById("diff").value
                        }
                        features.push(obj)
                    }
                    if (features.length > 0) {
                        axios.post('./Management/SaveFeature', features)
                            .then(response => {
                                const result = response.data === null ? null : JSON.parse(response.data)

                                if (result.isSave !== null && result.isSave !== false) {
                                    const obj = new Object()
                                    obj.page = 0
                                    obj.perPage = 7
                                    dispatch(getDesignFeautre(obj))
                                    setis_open(false)
                                    Swal.fire(
                                        'Success',
                                        'Feature saved successfully!!',
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
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Blank...',
                            text: 'Pleaser Add feature to save !'
                        })
                    }

                }}>
                    <ModalBodyDesignFeature selectedFeature={null}  bodyFor="AddDesign" editName="Add" editLabelName="Design Feature Name" editLabelList="Design Feature List" />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    )
}

export default AddDesignFeature