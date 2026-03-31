import React, { useState, useRef } from 'react'
import { Button, Modal, Form } from 'reactstrap'
import ModalBodyUI from './OrganizationModalBody'
import { addOrg, getOrgData } from '../store/actions/index'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
import axios from 'axios'
import * as yup from 'yup'
import "yup-phone"
import { useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ! Add AddUser function 
const OpenAddOrganization = (props) => {
    const [is_open, setis_open] = useState(false)
    const Swal = require('sweetalert2')
    const dispatch = useDispatch()
    const SignupSchema = yup.object().shape({
        Org_Name: yup.string().trim().min(2, "Organisation Name must have at least 2 characters").max(50, "Organisation Name can have max 50 characters").required("Organisation Name is required"),
        Org_Address: yup.string().trim().min(10, "Address must have at least 10 characters").max(150, "Address Code can have max 150 characters").required("Address Code is required"),
        Org_State: yup.string().required("Please select state"),
        Org_Pincode: yup.string().required("Zipcode is required").matches(/(^\d{6}$)|(^\d{6}-\d{4}$)/, "Please enter valid zipcode"),
        Org_City: yup.string().required("Please select city"),
        Org_Country: yup.string().required("Please select country"),
        Org_Phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be valid"),
        Org_Email: yup.string().trim().required('Email is required').max(48, "Email can have max 48 characters").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        Org_Website: yup.string().max(48, "Website  Name can have max 48 characters").required("Website is required").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),
        Org_Type: yup.string().required("Please select Organisation Type"),
        email: yup.string().email().trim().required('Email is required').max(48, "Email can have max 48 characters").matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        first_name: yup.string().trim().min(2, "First Name must have at least 2 characters").max(32, "First Name can have max 32 characters").matches(/^\S*$/, "please enter valid first Name").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Last Name must have at least 2 characters").max(32, "Last Name can have max 32 characters").matches(/^\S*$/, "please enter valid last Name").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        department: yup.string().trim().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Department"),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        login_id: yup.string().trim().min(2, "User ID must have at least 2 characters").max(32, "User ID can have max 32 characters").matches(/^\S*$/, "please enter valid UserId").required("UserID is required")
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = data => {
       
        dispatch({
            type: 'ADD_USER',
            data: null
        })

        const rootObj = new Object()
        const orgUser = new Object()
        const obj = new Object()
        const orgDatabase = new Object()

        orgDatabase.Organisation_Id = document.getElementsByName("Org_Name")[0].getAttribute("orgId")

        orgDatabase.User_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Userlimit")

        orgDatabase.Supllier_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Supplierlimit")

        orgDatabase.Customer_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Customerlimit")

        orgDatabase.Agent_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Agentlimit")


        orgDatabase.Design_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Dlimit")

        obj.Req_Registration_Id = document.getElementsByName("Org_Name")[0].getAttribute("reqID")
        obj.Org_Name = data.Org_Name
        obj.Org_Phone = data.Org_Phone
        obj.Org_Address = data.Org_Address
        // obj.faxno = e.target.elements[3].value
        obj.Org_Country = data.Org_Country
        obj.Org_Email = data.Org_Email
        obj.Org_State = data.Org_State
        obj.Org_Website = data.Org_Website
        obj.Org_City = data.Org_City
        obj.Org_Pincode = data.Org_Pincode
        obj.Org_IsBlocked = document.getElementsByName("orgstatus")[0].value === "true"
        obj.Org_IsDeleted = false
        obj.Org_Type = 1
        orgUser.first_name = data.first_name
        orgUser.last_name = data.last_name
        orgUser.email = data.email
        orgUser.mobile = data.mobile
        orgUser.login_id = data.login_id
        orgUser.department = data.department
        orgUser.password_hash = data.password_hash
        orgUser.is_administrator = true
        orgUser.org_type = 1
        orgUser.is_deleted = false
        orgUser.is_blocked = eval(document.getElementById("C_status").value)
        orgUser.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        rootObj.OrgDanisationData = orgDatabase
        rootObj.Users = orgUser
        rootObj.Organisation = obj
        axios
            .post(`./Organization/SaveOrganisation`, rootObj)
            .then(response => {
                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                const Iorg = response.data === null ? null : JSON.parse(response.data).isOrganisationExisted
                const Iorguser = response.data === null ? null : JSON.parse(response.data).isUserExisted
                if (Iorguser && Iorg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id and Organization Name Already Exist Please change login Id and Organization Name!'   /*abhishek 13-02*/
                    })
                } else if (Iorguser) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id Already Exist Please change login Id!'
                    })
                } else if (Iorg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Organization Name Already Exist Please change Name !'                       /*abhishek 13-02*/
                    })
                } else if (Isave !== null && Isave !== false) {
                    Swal.fire(
                        'Success!',
                        'Organization Saved Successfully!!',
                        'success'
                    )
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    dispatch(getOrgData(obj))
                    if (props.IsOpen) props.setOpen1(false)
                    else setis_open(false)
                       
                   
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

    const Btn = () => {
        return (
            <Button.Ripple sm={4} color='primary' onClick={() => setis_open(true)} style={{ fontSize: '13px' }}>
                Add New Organization
            </Button.Ripple>)
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                {props.hide ? '' : <Btn />}
            </div>
            <Modal backdrop="static" isOpen={props.isOpen1 === undefined ? is_open : props.isOpen1} toggle={() => { props.setOpen1 === undefined ? setis_open(false) : props.setOpen1(false) }}
             //backdrop={'static'}
             className='modal-lg'>
                <ModalHeaderUI setis_open={props.setOpen1 === undefined ? setis_open : props.setOpen1} headerName="Create Organization" />
                <Form onSubmit={handleSubmit(onSubmit)} autocomplete="none" >
                    <ModalBodyUI selectedUser={props.selectedUser} register={register} errors={errors} obj={props.obj} reqId={props.reqId} IsDisable="false" bodyFor="add" />
                    <ModalFooterUI setis_open={props.setOpen1 === undefined ? setis_open : props.setOpen1} FooterBtnName="Create" />
                </Form>
            </Modal>
        </div>
    )
}

export default OpenAddOrganization