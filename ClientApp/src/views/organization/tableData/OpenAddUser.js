import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form } from 'reactstrap'

import ModalBodyUI from './ModalBody'
import axios from 'axios'
import { stateContext } from "../../context/stateContext"
import { useForm } from 'react-hook-form'
import { getData } from '../store/actions/index'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ! Add AddUser function 
const AddUser = (props) => {
    const Swal = require('sweetalert2')
    const [is_open, setis_open] = useState(false)

    const { isValide, setIsValide, isEmpty, setisEmpty } = React.useContext(stateContext)
    const store = useSelector(state => state.users)
    const dispatch = useDispatch()
    const childRef = useRef()
    const CustUserAddSchema = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname ").matches(/^\S*$/, "please Enter Valid First Name"),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname ").matches(/^\S*$/, "please Enter Valid last Name"),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32, "User Name can have max 32 characters").matches(/^\S*$/, "please Enter Valid UserId").required().matches(),
        email: yup.string().trim().min(2, "Email must have at least 2 characters").max(150, "Email can have max 150 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required("Password is required"),
        c_password: yup.string().trim().oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        department: yup.string().trim().min(2, "Department must have at least 2 characters").max(32, "Department can have max 32 characters").required(),
        status: yup.string().notRequired(),
        profile_Image: yup.string().notRequired()
    })

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(CustUserAddSchema) })

    const AddNewUser = e => {

        dispatch({
            type: 'ADD_USER',
            data: null
        })
        const orgUser = new Object()
        orgUser.first_name = e.first_name
        orgUser.last_name = e.last_name
        orgUser.email = e.email
        orgUser.mobile = e.mobile
        orgUser.login_id = e.login_id
        orgUser.department = e.department
        orgUser.password_hash = e.password_hash
        orgUser.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        orgUser.is_blocked = eval(document.getElementById("C_status").value)
        orgUser.is_administrator = false
        orgUser.org_type = 1
        axios.post(`./Organization/SaveOrganisationUser`, orgUser)
            .then(response => {
                dispatch({
                    type: 'ADD_USER',
                    data: response.data
                })
                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                const Isexist = response.data === null ? null : JSON.parse(response.data).isUserExisted
                if (JSON.parse(response.data).message === null) {
                    if (Isexist) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Exist',
                            text: 'Login Id Already Exist Please change login Id!'
                        })
                    } else if (Isave) {
                        const obj = new Object()
                        obj.page = 0
                        obj.perPage = 7
                        dispatch(getData(obj))
                        setis_open(false)    //abhishek 01-03   
                        Swal.fire(
                            'Success!',
                            'Organization user Saved Successfully!!',
                            'success'
                        )
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Organisation User',
                        text: JSON.parse(response.data).message
                    })
                }


            })
    }

    return (
        <div>
            <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Add New User
            </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Add New User" />
                <Form onSubmit={handleSubmit(AddNewUser)} autocomplete="none" >
                    <ModalBodyUI bodyFor="add" register={register} errors={errors} ref={childRef} />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    )
}

export default AddUser