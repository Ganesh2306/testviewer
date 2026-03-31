import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'reactstrap'
import { saveCustomer } from '../../../MethodList'
import { Edit } from 'react-feather'
import ModalBodyUI from './ModalBody'
import { getData } from '../../store/actions/index'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import "yup-phone"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
// ! Add AddUser function 
const EditUser = (props) => {
    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    const store = useSelector(state => state.customer)
    const childRef = useRef()
   // console.log(store.selectedCustomer)
    const SignupSchema = yup.object().shape({
        customer_Id: yup.string().notRequired(),
        customer_Name: yup.string().trim().notRequired(), //yup.string().min(2, "Customer Name must have at least 2 characters").max(15, "Customer Name can have max 15 characters").required("Customer Name is required"),
        customer_Code: yup.string().trim().min(2, "Customer Code must have at least 2 characters").max(20, "Customer Code can have max 20 characters").required("Customer Code is required"),
        address: yup.string().trim().min(10, "Address must have at least 10 characters").max(150, "Address Code can have max 150 characters").required("Address is required"),
        customerState: yup.string().required("Please select state"),
        pincode: yup.string().matches(/^[1-9][0-9]{5}$/, "Please enter valid pincode"),
        city: yup.string().required("Please select city"),
        country: yup.string().required("Please select country"),
        isBlocked: yup.boolean(),
        phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be valid"),
        email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        website: yup.string().max(48, "Website Name can have max 48 characters").required("Website is required").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),
        start_Date: yup.date().required('Please select date').typeError('Please select start date'),
        end_Date: yup.date().required('Please select date').typeError('Please select end date').min(
            yup.ref('start_Date'),
            "end date can't be before start date"
        ),
        u_email: yup.string().email().trim().required("Email is required"),
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First Name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required("Last Name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        login_id: yup.string().notRequired() //yup.string().min(2, "Username must have at least 2 characters").max(32, "Username can have max 32 characters").required("Username is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Username ")
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = Customer => {
        
        setis_open(false)
        Customer.state = 2
        Customer.customer_Name = store.selectedCustomer.customer.cus_name
        Customer.login_id = store.selectedCustomer.customer.user.login_id 
        Customer.start_Date = new Date(new Date(Customer.start_Date - ((Customer.start_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]      /*abhishek 09*/
        Customer.end_Date = new Date(new Date(Customer.end_Date - ((Customer.end_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]          /*abhishek 09*/
        Customer.created_On = new Date().toISOString()
        Customer.usersrequest = new Object()
        Customer.usersrequest.state = 2
        Customer.usersrequest.org_type = 3
        Customer.usersrequest.created_on = new Date().toISOString()
        Customer.usersrequest.first_name = Customer.first_name
        Customer.usersrequest.email = Customer.u_email
        Customer.usersrequest.last_name = Customer.last_name
        Customer.usersrequest.mobile = Customer.mobile
        Customer.usersrequest.login_id = Customer.login_id
        Customer.usersrequest.password_hash = Customer.password_hash
        Customer.usersrequest.is_administrator = true
        Customer.usersrequest.org_type_id = Customer.customer_Id
        Customer.usersrequest.user_id = Customer.user_id
        Customer.usersrequest.is_blocked = eval(document.getElementById("C_status").value)
        Customer.usersrequest.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        axios.post(`${saveCustomer}`, Customer)
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
                    dispatch(getData(obj))
                    props.setOpen1(false)
                    Swal.fire(
                        'Success!',
                        'Customer updated successfully!!',
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
        <Modal backdrop={'static'} isOpen={props.isOpen1} toggle={() => setis_open(props.setOpen1)} className='modal-lg'>
            <ModalHeaderUI setis_open={props.setOpen1}  headerName="Edit Customer" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBodyUI isdisabled={props.isdisabled} register={register} errors={errors} selectedCustomer={store.selectedCustomer} ref={childRef} bodyFor="edit"/>
                <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Edit Customer" />
            </Form>
        </Modal>
    </div>
)
}

export default EditUser