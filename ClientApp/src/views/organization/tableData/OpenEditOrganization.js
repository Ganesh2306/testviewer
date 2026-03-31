
import {Modal, Form} from 'reactstrap'
import ModalBodyUI from './OrganizationModalBody'

import { useDispatch, useSelector } from 'react-redux'
import { addOrg, getOrgData } from '../store/actions/index'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
import axios from 'axios'
import * as yup from 'yup'
import "yup-phone"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// ! Edit Oraganization function 
const EditOraganization = (props) => {
    const Swal = require('sweetalert2')
    
    const dispatch = useDispatch()
    const store = useSelector(state => state.users)
    const SignupSchema = yup.object().shape({
        Org_Address: yup.string().trim().min(10, "Address must have at least 10 characters").max(150, "Address Code can have max 150 characters").required("Address Code is required"),
        Org_State: yup.string().required("Please select state"),
        Org_Pincode: yup.string().required("Zipcode is required").matches(/(^\d{6}$)|(^\d{6}-\d{4}$)/, "Please enter valid zipcode"),
        Org_City: yup.string().required("Please select city"),
        Org_Country: yup.string().required("Please select country"),
        Org_Phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be valid"),
        Org_Email: yup.string().trim().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        Org_Website: yup.string().max(48, "Website  Name can have max 48 characters").required("Website is required").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),
        Org_Type: yup.string().required("Please select Organisation Type"),
        email: yup.string().email().trim().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        first_name: yup.string().trim().min(2, "First Name must have at least 2 characters").max(15, "First Name can have max 15 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Last Name must have at least 2 characters").max(15, "Last Name can have max 15 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        department: yup.string().trim().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Department"),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        login_id: yup.string().trim().min(2, "User Name must have at least 2 characters").max(10, "User Name can have max 10 characters").notRequired() //nirbhay
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
        orgUser.user_id = document.getElementsByName("login_id")[0].getAttribute("user_id")
        orgUser.org_id = document.getElementsByName("Org_Name")[0].getAttribute("organisationid")
        obj.state = 2
        orgDatabase.Organisation_Id = document.getElementsByName("Org_Name")[0].getAttribute("orgId")

        orgDatabase.User_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Userlimit")

        orgDatabase.Supllier_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Supplierlimit")

        orgDatabase.Customer_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Customerlimit")

        orgDatabase.Agent_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Agentlimit")

        orgDatabase.Design_Limit = document.getElementsByName("Org_Name")[0].getAttribute("Dlimit")
        orgDatabase.state = 2
        obj.Req_Registration_Id = document.getElementsByName("Org_Name")[0].getAttribute("reqID")
        obj.Org_Name = document.getElementsByName("Org_Name")[0].value
        obj.Organisation_Id = document.getElementsByName("Org_Name")[0].getAttribute("organisationid")
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
        orgUser.login_id = store.selectedUser.users.login_id 
        orgUser.department = data.department
        orgUser.password_hash = data.password_hash
        orgUser.is_administrator = true
        orgUser.state = 2
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
                const Isave = response.data === null ? null : response.data.isSave
                if (Isave !== null && Isave !== false) {
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
                    dispatch(getOrgData(obj))
                    props.setOpen1(false)
                    Swal.fire(
                        'Success',
                        'Organization Updated Successfully!!',
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

    return (
        <div>
            <Modal backdrop="static" isOpen={props.isOpen1} toggle={() => props.setOpen1(false)} className='modal-lg'>
                <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Organization" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUI register={register} errors={errors} selectedUser={store.selectedUser}  IsDisable="true" bodyFor="edit" />
                    <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    ) 
}

export default EditOraganization