import React, { useState, useRef, useContext } from 'react'
import { addCustUser, getCustomerUsers } from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Form } from 'reactstrap'
import { useForm } from 'react-hook-form'
import ModalBodyUI from './ModalBodyCustUser'
import axios from 'axios'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import { AbilityContext } from '@src/utility/context/Can'
// ! Add AddUser function 
const AddUser = (btnName) => {
    const ability = useContext(AbilityContext)
    const CustUserAddSchema = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname ").matches(/^\S*$/, "please enter valid first Name"),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname ").matches(/^\S*$/, "Please enter valid last Name"),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32, "UserID Must have at most 32 characters").matches(/^\S*$/, "please enter valid UserId").required("UserID Must be required"),
        email: yup.string().trim().max(150, "Email can have max 150 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required("Password is required"),
        c_password: yup.string().trim().oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        department: yup.string().trim().min(2, "Department must have at least 2 characters").max(15, "Department can have max 15 characters").required(),
        status: yup.string().notRequired(),
        profile_Image: yup.string().notRequired()
    })

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(CustUserAddSchema) })

    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    const childRef = useRef()
    const AddCustUser = e => {
        
        // e.preventDefault()   

        const custuser = new Object()
        custuser.first_name = e.first_name
        custuser.last_name = e.last_name
        custuser.email = e.email
        custuser.mobile = e.mobile
        custuser.login_id = e.login_id
        custuser.department = e.department
        custuser.password_hash = e.password_hash
        custuser.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        custuser.is_blocked = eval(document.getElementById("C_status").value)
       // custuser.isBlocked = e.state === "Active" ? 0 : 1
        custuser.is_administrator = false
        custuser.org_type = 3
        //custuser.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
        custuser.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
        //dispatch(addCustUser(custuser))
        axios.post(`./Customer/SaveCustomerUser`, custuser)
            .then(response => {
                const Isave = response.data.data === null ? null : JSON.parse(response.data.data).isSave
                const Isexist = response.data.data === null ? null : JSON.parse(response.data.data).isUserExisted
                if (JSON.parse(response.data.data).message === null) {
                if (Isexist) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id Already Exist Please change login Id!'
                    })
                } else if (Isave !== null && Isave !== false) {
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    obj.CustomerId = response.data.req.org_type_id
                    dispatch(getCustomerUsers(obj))
                    //dispatch(getData())
                   // setis_open(false)
                    Swal.fire(
                        'Success!',
                        'Customeruser added successfully!!',
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
                        title: 'Customer User',
                        text: JSON.parse(response.data.data).message
                    })
                }

            })
            .then(() => {
            })
            .catch(err => console.log(err))

        setis_open(false)
    }
   // abhishekk
    return (
        <div>
            {ability.can('show', 'Button') &&  <Button.Ripple color='primary' onClick={() => {
                const obj = new Object()
                obj.Start = 0
                obj.End = 0
                axios.post(`./Customer/Customers`, obj).then(response => {
                    const customers = response.data.customerListDto
                    if (customers.length > 0) {
                        setis_open(true)
                    } else {
                        Swal.fire({
                            icon: 'info',
                            title: 'Customer ',
                            text: 'ADD Customer!'
                        })
                    }
                })
            }
            }>

           {/* <Button.Ripple color='primary' onClick={() => setis_open(true)}>*/}
                Add New User
      </Button.Ripple>}

            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Add Customer User" />
                {/* <Form onSubmit={(e) => {
                  
                  //if(ValidateEmail()===true&&Phone()==true)
                  setis_open(false)
                  e.preventDefault()
                 // console.log(props.id)
              }}> */}
                <Form onSubmit={handleSubmit(AddCustUser)} autocomplete="none">
                    <ModalBodyUI
                        bodyFor="add"
                        register={register}
                        errors={errors}
                    />
                    <ModalFooterUI IsCustUser='true' setis_open={setis_open} FooterBtnName="Create" />

                </Form>
            </Modal>
        </div>
    )
}

export default AddUser