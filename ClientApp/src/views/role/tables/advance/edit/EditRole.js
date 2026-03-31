import * as yup from 'yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, DropdownItem, Form } from 'reactstrap'
import Swal from 'sweetalert2'
import { Edit, Phone, Shield } from 'react-feather'

import ModalBodyUI from '../ModalBody'

import ModalHeaderUI from '../../../../modal/ModalHeader'
import ModalFooterUI from '../../../../modal/ModalFooter'
import { getRolesData } from './../../../store/actions'
// ! Add AddUser function 

export const EditRole = (props) => {
    const [isOpen, setis_open] = useState(false)
    const dispatch = useDispatch()
    const store = useSelector(state => state.roles)
    /*const { register, errors, handleSubmit } = useForm()*/
    
    const RoleSchema = yup.object().shape({
        role_Id: yup.string().notRequired(),
        role_Name: yup.string().min(2, "Rolename must be at least 2 characters long").max(15, "Rolename can be max 15 characters long ").required(),
        role_Description: yup.string().notRequired(),
        role_Type: yup.number().typeError('Please select role type').required('Please select role type'),
        is_Blocked: yup.bool().typeError('Please select status').required("Please select status")
    })

    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(RoleSchema) })

    const onSubmit = data => {
        
        data.state = 2
        axios.post('./Role/SaveRole', data)
            .then(function (response) {
                 //abhishek start 03/03
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
                    const pageno = Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1
                    const entries = Number(document.getElementById("sort-select").value)
                    if (pageno === 0) {
                        obj.page = 0
                        obj.perPage = entries
                    } else {
                        obj.page = pageno * entries
                        obj.perPage = entries
                    }
                    dispatch(getRolesData(obj))
                    props.setOpen1(false)
                    Swal.fire(
                        'Success!',
                        'Role has been updated.',
                        'success'
                    )
                }
                console.log(response)
            })
               //abhishek start 03/03
        console.log(data)
    }
    return (
        <>
           
            <Modal isOpen={props.isOpen1} toggle={() => setis_open(props.setOpen1)} className='modal-sm-12' backdrop={'static'}>
                <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Role" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUI bodyFor="Update" register={register} errors={errors} selectedRole={store.selectedRole} />
                    <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Update" />
                </Form>
            </Modal>
        </>
    )
}
