import React, { useState, useRef, useContext } from 'react'
import axios from 'axios'
import { getData } from '../../store/actions/index'
import { Button, Modal, Form } from 'reactstrap'
/*import { addCust } from '../../store/actions/index'*/
import ModalBodyUI from './ModalBody'
import * as yup from 'yup'
import "yup-phone"
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import { saveCustomer } from '../../../MethodList'
import { AbilityContext } from '@src/utility/context/Can'
// ! Add AddUser function 
const AddCustomer = (props) => {

    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    const ability = useContext(AbilityContext)
    /*const store = useSelector(state => state.customer)*/
    const childRef = useRef()

    const SignupSchema = yup.object().shape({
        customer_Name: yup.string().trim().min(2, "Customer Name must have at least 2 characters").max(50, "Customer Name can have max 50 characters").required("Customer Name is required"),
        customer_Code: yup.string().trim().min(2, "Customer Code must have at least 2 characters").max(20, "Customer Code can have max 20 characters").required("Customer Code is required"),
        address: yup.string().trim().min(10, "Address must have at least 10 characters").max(150, "Address Code can have max 150 characters").required("Address Code is required"),
        customerState: yup.string().required("Please select state"),
        pincode: yup.string().matches(/^[1-9][0-9]{5}$/, "Please enter valid pincode"),
        city: yup.string().required("Please select city"),
        country: yup.string().required("Please select country"),
        isBlocked: yup.boolean(),
        phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be valid"),
        email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        website: yup.string().required("Website is required").max(48, "Website Name can have max 48 characters").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),         
        start_Date: yup.date().required('Please select date').typeError('Please select start date'),
        end_Date: yup.date().required('Please select date').typeError('Please select end date').min(yup.ref('start_Date'), "end date can't be before start date"),
        u_email: yup.string().email().trim().required("Email is required"),
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First Name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname ").matches(/^\S*$/, "please enter valid first Name"),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required("Last Name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname ").matches(/^\S*$/, "please enter valid last Name"),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32, "User ID must be at most 32 characters").matches(/^\S*$/, "please enter valid UserId").required("Username is required")
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = Customer => {
        
        Customer.state = 0
        Customer.created_On = new Date().toISOString()
        Customer.usersrequest = new Object()
        Customer.usersrequest.state = 0
        Customer.usersrequest.org_type = 3
        Customer.usersrequest.created_on = new Date().toISOString()
        Customer.usersrequest.first_name = Customer.first_name
        Customer.usersrequest.email = Customer.u_email
        Customer.usersrequest.last_name = Customer.last_name
        Customer.usersrequest.mobile = Customer.mobile
        Customer.usersrequest.login_id = Customer.login_id
        Customer.usersrequest.password_hash = Customer.password_hash
        Customer.usersrequest.is_administrator = true
        Customer.usersrequest.is_blocked = eval(document.getElementById("C_status").value)
          Customer.start_Date = new Date(new Date(Customer.start_Date - ((Customer.start_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0] 
        //Customer.start_Date = new Date()
        Customer.end_Date = new Date(new Date(Customer.end_Date - ((Customer.end_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]
        //Customer.end_Date = new Date()
        Customer.usersrequest.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        axios.post(`${saveCustomer}`, Customer)
            .then(response => {

                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                const Icust = response.data === null ? null : JSON.parse(response.data).isCustomerExisted 
                const Icustuser = response.data === null ? null : JSON.parse(response.data).isUserExisted
                if (JSON.parse(response.data).message === null) {
                if (Icustuser && Icust) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id and Customer Name Already Exist Please change login Id and Customer Name!'
                    })
                } else if (Icustuser) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id Already Exist Please change login Id!'
                    })
                } else if (Icust) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Customer Name Already Exist Please change Name !'
                    })
                } else if (Isave !== null && Isave !== false) {
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    dispatch(getData(obj))
                    setis_open(false)
                    Swal.fire(
                        'Success!',
                        'Customer added successfully!!',
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
                        title: 'Customer',
                        text: JSON.parse(response.data).message
                    })
                }

            })
            .then(() => {

            })
            .catch(err => console.log(err))
       // console.log(Customer)
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
            {ability.can('show', 'Button') && (<Button.Ripple sm={4} color='primary' onClick={() => setis_open(true)} style={{ fontSize: '13px' }}>
                    Add Customer
                </Button.Ripple>)}
            </div>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-lg' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Add Customer" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUI isdisabled={""} ref={childRef} register={register} errors={errors} IsDisable="false" bodyFor="AddCustomer" />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    )
}

export default AddCustomer