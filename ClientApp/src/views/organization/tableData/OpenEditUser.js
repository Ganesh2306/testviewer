import { useRef } from 'react'
import { Modal, Form, Button } from 'reactstrap'

import { Edit, Shield } from 'react-feather'
import { useForm } from 'react-hook-form'
import ModalBodyUI from './ModalBody'
//import { addOrgUser } from '../store/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
//import * as Form from '@uppy/form'
import axios from 'axios'
import { getData } from '../store/actions/index'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ! Edit user function 
const EditUser = (props) => {
    const Swal = require('sweetalert2')
    const dispatch = useDispatch()
    const store = useSelector(state => state.users)
    const childRef = useRef()
    const CustUserAddSchema = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32).notRequired(),
        email: yup.string().trim().min(2, "Email must have at least 2 characters").max(150, "Email can have max 150 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required("Password is required"),
        c_password: yup.string().trim().oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        department: yup.string().trim().min(2, "Department must have at least 2 characters").max(32, "Department can have max 32 characters").required(),
        status: yup.string().notRequired(),
        profile_Image: yup.string().notRequired(),
        user_id: yup.string().notRequired()

    })

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(CustUserAddSchema) })

    const UpdateUser = e => {

        const orgUser = new Object()
        orgUser.first_name = e.first_name
        orgUser.last_name = e.last_name
        orgUser.email = e.email
        orgUser.mobile = e.mobile
        orgUser.login_id = store.selectedUser.login_id 
        orgUser.department = e.department
        orgUser.password_hash = e.password_hash
        orgUser.is_blocked = eval(document.getElementById("C_status").value)
        orgUser.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        orgUser.is_administrator = false
        orgUser.org_type = 1
        orgUser.state = 2
        orgUser.user_id = e.user_id
        
        axios.post(`./Organization/SaveOrganisationUser`, orgUser)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    data: response.data
                })
                props.setOpen1(false)    //abhishek 01-03
                Swal.fire(
                    'Success!',
                    'Organization user Updated Successfully!!',
                    'success'
                )
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
                dispatch(getData(obj))

            })
    }

    return (
        <div>
            <Modal backdrop="static" isOpen={props.isOpen1} toggle={() => props.setOpen1(false)} className='modal-md'>
                <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit User" />
                <Form onSubmit={handleSubmit(UpdateUser)} autocomplete="none" >
                    <ModalBodyUI register={register} errors={errors} selectedUser={store.selectedUser} ref={childRef} bodyFor="edit" />
                    <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Edit User" />
                </Form>
            </Modal>
        </div>
    )
}

export default EditUser