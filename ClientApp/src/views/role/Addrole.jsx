import React, { useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Modal, Form } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ModalBodyUI from './tables/advance/ModalBody'
import Swal from 'sweetalert2'
import { stateContext } from "../context/stateContext"

import ModalHeaderUI from './../modal/ModalHeader'
import ModalFooterUI from './../modal/ModalFooter'
import { getRolesData } from './store/actions'
// ! Add AddUser function 
const Addrole = (btnName) => {
    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    /*const { register, errors, handleSubmit } = useForm()*/
    const { isValide, setIsValide, isEmpty, setisEmpty } = React.useContext(stateContext)
    

    const SignupSchema = yup.object().shape({
        role_Id: yup.string().notRequired(),
        role_Name: yup.string().trim().min(2, "Rolename must be at least 2 characters long").max(48, "Rolename can be max 48 characters long ").required(),
        role_Description: yup.string().notRequired(),
        role_Type: yup.number().typeError('Please select role type').required('Please select role type'),
        is_Blocked: yup.bool().typeError('Please select status').required("Please select status")
    })

    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = data => {

        
        axios.post('./Role/SaveRole', data)
            .then(function (response) {
                const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                const IsExisted = JSON.parse(response.data).isExisted
                if (IsExisted) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Role Name Already Exist Please change Name !'
                    })
                } else if (Isave !== null && Isave !== false) {
                    const obj = new Object()
                    const pageno = document.getElementsByClassName("pagination").length === 0 ? 0 : Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1
                    const entries = Number(document.getElementById("sort-select").value)
                    if (pageno === 0) {
                        obj.page = 0
                        obj.perPage = entries
                    } else {
                        obj.page = pageno * entries
                        obj.perPage = entries
                    }
                    dispatch(getRolesData(obj))
                    setis_open(false)
                    Swal.fire(
                        'Success!',
                        'Role has been added.',
                        'success'
                    )
                }
               
               // console.log(response)
            })

      //  console.log(data)
    }

    return (
        <div>
            <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Add Role
      </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm-12' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Add Role" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUI bodyFor="add" register={register} errors={errors} />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    )
}

export default Addrole