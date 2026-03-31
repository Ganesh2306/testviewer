import React, { useState, useRef } from 'react'
import { Button, Modal, Form } from 'reactstrap'
import ModalBodyUI from './CloneCustomerModalBody'
import { getData } from '../../store/actions/index'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import axios from 'axios'
import * as yup from 'yup'
import "yup-phone"
import { useDispatch} from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ! Add AddUser function 
const CloneCustomer = (props) => {
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
        first_name: yup.string().trim().min(2, "First Name must have at least 2 characters").max(32, "First Name can have max 32 characters").matches(/^\S*$/, "please enter valid first Name").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Last Name must have at least 2 characters").max(32, "Last Name can have max 32 characters").matches(/^\S*$/, "please enter valid last Name").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required')
    })
    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = data => {
       
        const obj = new Object()
        obj.CompanyName = data.Org_Name
        obj.FirstName = data.first_name
        obj.LastName = data.last_name
        obj.Phone = data.Org_Phone
        obj.Address = data.Org_Address
        obj.Country = data.Org_Country
        obj.Email = data.Org_Email
        obj.State = data.Org_State
        obj.Website = data.Org_Website
        obj.City = data.Org_City
        obj.Pincode = data.Org_Pincode
        obj.Password = data.password_hash
        obj.CustomerId = props.id
        obj.OrganisationId = JSON.parse(localStorage.userData).organisationId
        axios.post(`./Organization/SaveCloneCustomer`, obj)
            .then(response => {
                const Isave = response.data === null ? null : JSON.parse(response.data).Issave 
                if (Isave !== null && Isave !== false) {
                    Swal.fire(
                        'Success!',
                        'Customer Saved Successfully!!',
                        'success'
                    )
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    dispatch(getData(obj))
                    if (props.isOpen) props.setOpen(false)
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
    return (
        <div>
             <Modal backdrop={'static'} isOpen={props.isOpen} toggle={() => setis_open(props.setOpen)} className='modal-lg'>
            <ModalHeaderUI setis_open={props.setOpen}  headerName="Clone Customer" />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBodyUI register={register} errors={errors} bodyFor="Clone"/>
                <ModalFooterUI setis_open={props.setOpen} FooterBtnName="Clone" />
            </Form>
        </Modal>
        </div>
    )
}

export default CloneCustomer