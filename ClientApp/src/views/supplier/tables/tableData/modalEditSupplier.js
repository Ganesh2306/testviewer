import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { getData, getSUData } from './../../store/actions'
import { Edit, Shield } from 'react-feather'
import { Button, Modal, Form } from 'reactstrap'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ModalBodyUIAddEditSupplier from './ModalBodySupplier'
import ModalBodyUIAddEditSupplierUser from './ModalBodySupplierUser'
import { useDispatch, useSelector } from 'react-redux'
import ModalHeaderUI from '../../../modal/ModalHeaderOld'
import { ModalFooterUISaveCancel, ModalFooterUI } from '../../../modal/ModalFooterOld'
import { AbilityContext } from '@src/utility/context/Can'

// ! Add EditSupplier function 
export const AddSupplier = (props) => {
    const Swal = require('sweetalert2')
    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    const ability = useContext(AbilityContext)
    const BtnAddSup = () => {
        return (
            ability.can('show', 'Button') && (
                <Button.Ripple size="sm" color="primary" className="ml-1" onClick={() => setis_open(true)} style={{ fontSize: '13px' }}>
                    Add Supplier
                </Button.Ripple>
            )
        )
    }

    const SignupSchema = yup.object().shape({
        supplier_id: yup.string().trim().notRequired(),
        user_id: yup.string().trim().notRequired(),
        sup_name: yup.string().trim().min(2, "Supplier Name must have at least 2 characters").max(20, "Supplier Name can have max 20 characters").required("Supplier Name required"),
        sup_code: yup.string().trim().min(2, "Supplier Code must have at least 2 characters").max(20, "Supplier Code can have max 20 characters").required("Supplier Code required"),
        sup_email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        sup_address: yup.string().trim().min(10, "Supplier Address must have at least 10 characters").max(150, "Address can have max 150 characters").required("Address is required"),
        sup_phone: yup.string().required("Phone number is required").matches(/^\d{10}$/, "Phone number must be valid"),
        sup_country: yup.string().required("Please select country"),
        sup_website: yup.string().required("Website is required").max(48, "Website Name can have max 48 characters").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),
        sup_state: yup.string().required("Please select state"),
        sup_isblocked: yup.boolean(),
        sup_city: yup.string().required('Please select city'),
        start_Date: yup.date().required('Please select date').typeError('Please select start date'),
        sup_pincode: yup.string().matches(/^[1-9][0-9]{5}$/, "Please enter valid pincode"),
        end_Date: yup.date().required('Please select date').typeError('Please select end date').min(
            yup.ref('start_Date'),
            "end date can't be before start date"
        ),
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname ").matches(/^\S*$/, "please Enter Valid First Name"),
        ur_email: yup.string().trim().required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        ur_last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32).required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname ").matches(/^\S*$/, "please Enter Valid last Name"),
        ur_mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32).required().matches(/^\S*$/, "please Enter Valid UserId"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required(),
        password_hash2: yup.string().oneOf([yup.ref('password_hash'), null], 'Passwords must match')

    })

    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const onSubmit = data => {

        data.state = 0
        const UserRequest = new Object()
        UserRequest.start_Date = new Date(new Date(data.start_Date - ((data.start_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]
        data.start_Date = UserRequest.start_Date
        UserRequest.end_Date = new Date(new Date(data.end_Date - ((data.end_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]
        data.end_Date = UserRequest.end_Date
        UserRequest.first_name = data.first_name
        UserRequest.last_name = data.ur_last_name
        UserRequest.email = data.ur_email
        UserRequest.mobile = data.ur_mobile
        UserRequest.login_id = data.login_id
        UserRequest.password_hash = data.password_hash
        UserRequest.is_blocked = eval(document.getElementById("C_status").value)
        UserRequest.is_administrator = true
        UserRequest.org_type = 2
        UserRequest.state = 0
        UserRequest.user_id = data.user_id
        UserRequest.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        data.UserRequest = UserRequest

        axios.post('./Supplier/SaveSupplier', data)
            .then(function (response) {
                

                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                const Icust = response.data === null ? null : JSON.parse(response.data).isSupplierExisted 
                const Icustuser = response.data === null ? null : JSON.parse(response.data).isUserExisted
                if (JSON.parse(response.data).message === null) {
                if (Icustuser && Icust) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id and Supplier Name Already Exist Please change login Id and Supplier Name!'
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
                        text: 'Supplier Name Already Exist Please change Name !'
                    })
                } else if (Isave !== null && Isave !== false) {
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    dispatch(getData(obj))
                    setis_open(false)
                    Swal.fire(
                        'Success!',
                        'Supplier added successfully!!',
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
                        title: 'Supplier',
                        text: JSON.parse(response.data).message
                    })
                }
            })
            .then(() => {

            })
            .catch(err => console.log(err))
    }
                return (
                    <div>
                        <div className='d-flex align-items-center'>
                            {props.hide ? '' : <BtnAddSup />}
                        </div>
                        <Modal backdrop={'static'} isOpen={props.isOpen1 === undefined ? is_open : props.isOpen1} toggle={() => { props.setOpen1 === undefined ? setis_open(false) : props.setOpen1(false) }} className='modal-lg'>
                            <ModalHeaderUI setis_open={props.setOpen1 === undefined ? setis_open : props.setOpen1} headerName="Add Supplier" />
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <ModalBodyUIAddEditSupplier bodyFor="add_sup" register={register} errors={errors} />
                                <ModalFooterUISaveCancel setis_open={props.setOpen1 === undefined ? setis_open : props.setOpen1} FirstBtnName="Save" SecondBtnName="Cancel" />
                            </Form>
                        </Modal>
                    </div>
                )
            }


export const AddSupplierUser = (btnName) => {
    const Swal = require('sweetalert2')
    const ability = useContext(AbilityContext)
    const SupplierUserSchema1 = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname ").matches(/^\S*$/, "please enter valid first Name"),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname ").matches(/^\S*$/, "please enter valid last Name"),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32).matches(/^\S*$/, "please enter valid UserId").required(),
        email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required("Password is required"),
        c_password: yup.string().oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        status: yup.string().notRequired(),
        user_id: yup.string().notRequired()
    })
    const dispatch = useDispatch()
    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SupplierUserSchema1) })
    const [is_open, setis_open] = useState(false)

    const AddSupplierOnsubmit = e => {
        const SupplierUserDto = new Object()
        SupplierUserDto.state = 0
        SupplierUserDto.login_id = e.login_id
        SupplierUserDto.first_name = e.first_name
        SupplierUserDto.last_name = e.last_name
        SupplierUserDto.email = e.email
        SupplierUserDto.mobile = e.mobile
        SupplierUserDto.password_hash = e.password_hash
        SupplierUserDto.org_type = 2
        SupplierUserDto.is_blocked = eval(document.getElementById("C_status").value)
        SupplierUserDto.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        SupplierUserDto.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
        axios.post('./Supplier/SaveSupplierUSer', SupplierUserDto)
            .then(response => {
                const Isexist = response.data === null ? null : JSON.parse(response.data).isUserExisted
                if (JSON.parse(response.data).message === null) {
                if (Isexist) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Exist',
                        text: 'Login Id Already Exist Please change login Id!'
                    })
                } else if (JSON.parse(response.data).isSave) {
                    const supUser = new Object()
                    supUser.page = 0
                    supUser.perPage = 7
                    if (document.getElementById('sort-select1')) {
                        supUser.SupplierId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                    } else {
                        supUser.SupplierId = 0
                    }
                   // supUser.SupplierId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                    dispatch(getSUData(supUser))
                    setis_open(false)
                    Swal.fire(
                        'Success!',
                        'Supplier User Saved Successfully!!',
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
                        title: 'Supplier User',
                        text: JSON.parse(response.data).message
                    })
                }
            }).catch(err => console.log(err))
        //dispatch(addUser(SupplierUserDto))   


        // e.p
        // e.preventDefault()
        //console.log(e)
    }
    //abhishek
    return (
        <div>
            {ability.can('show', 'Button') &&  <Button.Ripple color='primary' className='text-nowrap ml-1' onClick={() => {
                const obj = new Object()
                obj.Start = 0
                obj.End = 0
                axios.post(`./Supplier/Suppliers`, obj).then(response => {
                    const suppliers = response.data.supplierListDto
                    if (suppliers.length > 0) {
                        setis_open(true)

                    } else {
                        Swal.fire({
                            icon: 'info',
                            title: 'Supplier ',
                            text: 'ADD Supplier!'
                        })
                    }
                })
            }
            }>
            {/*<Button.Ripple color='primary' className='text-nowrap ml-1' onClick={() => setis_open(true)}>*/}
                Add New User
      </Button.Ripple> }
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Add Supplier User" />
                <Form onSubmit={handleSubmit(AddSupplierOnsubmit)} autocomplete="none">
                    <ModalBodyUIAddEditSupplierUser bodyFor="add_sup_user" register={register} errors={errors} />
                    <ModalFooterUISaveCancel setis_open={setis_open} FirstBtnName="Create" SecondBtnName="Close" />
                </Form>
            </Modal>
        </div>
    )
}

export const EditSupplier = (props) => {
    const Swal = require('sweetalert2')
    const DateToMMDDYY = (d) => {
        
        if (d !== null) {
            const date = new Date(d)
            return `${date.getMonth() + 1} -${date.getDate()} -${date.getFullYear()}`
        }

    }
   

    const [is_open, setis_open] = useState(false)
    const dispatch = useDispatch()
    const store = useSelector(state => state.suppliers)
    console.log(store)
    
    const SignupSchema = yup.object().shape({
        supplier_id: yup.string().notRequired(),
        user_id: yup.string().notRequired(),
        sup_name: yup.string().trim().min(2, "Supplier Name must have at least 2 characters").max(32, "Supplier Name can have max 32 characters"),
        sup_code: yup.string().trim().min(2, "Supplier Code must have at least 2 characters").max(20, "Supplier Code can have max 20 characters").required(),
        sup_email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        sup_address: yup.string().trim().min(10, "Supplier Address must have at least 10 characters").max(150, "Supplier Address have limit of 150 characters").required(),
        sup_phone: yup.string().required('Phone number is required').matches(/^\d{10}$/, "Phone number must be valid"),
        sup_country: yup.string().required('Please select country'),
        sup_website: yup.string().required("Website is required").max(48, "Website Name can have max 48 characters").matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g, "Please enter valid website"),
        sup_state: yup.string().required('Please select state'),
        sup_isblocked: yup.boolean(),
        sup_city: yup.string().required('Please select city'),
        start_Date: yup.date().required('Please select date').typeError('Please select start date'),
        // start_Date: yup.date().nullable().required('Start Date is required')
        //  .min(new Date(), 'Start Date must be later than today'),
        sup_pincode: yup.string().matches(/^[1-9][0-9]{5}$/, "Please enter valid pincode"),
        end_Date: yup.date().required('Please select date').typeError('Please select end date').min(yup.ref('start_Date'), "end date can't be before start date"),
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        ur_email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        ur_last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(15, "Last Name can have max 15 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        ur_mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        login_id: yup.string().trim().min(2, "Username must have at least 2 characters").max(32),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15, "Password can be upto 15 characters").required('Password is required'),
        password_hash2: yup.string().oneOf([yup.ref('password_hash'), null], 'Passwords must match')

    })

    const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onSubmit = data => {

        data.state = 2
        const UserRequest = new Object()
        UserRequest.start_Date = new Date(new Date(data.start_Date - ((data.start_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]
        data.start_Date = UserRequest.start_Date
        UserRequest.end_Date = new Date(new Date(data.end_Date - ((data.end_Date).getTimezoneOffset() * 60 * 1000))).toISOString().split('T')[0]
        data.end_Date = UserRequest.end_Date
        data.login_id = store.selectedSupplier.user.login_id 
        UserRequest.sup_name = document.getElementsByName("sup_name")[0].value
        UserRequest.first_name = data.first_name
        UserRequest.last_name = data.ur_last_name
        UserRequest.email = data.ur_email
        UserRequest.mobile = data.ur_mobile
        UserRequest.login_id = store.selectedSupplier.user.login_id 
        UserRequest.password_hash = data.password_hash
        UserRequest.is_administrator = true
        UserRequest.org_type = 2
        UserRequest.state = 2
        UserRequest.is_blocked = eval(document.getElementById("C_status").value)
        UserRequest.user_id = data.user_id//document.getElementsByName("user_id")[0].value  //data.user_id  //(document.getElementsByName("user_id")[0].value)
        UserRequest.org_type_id = store.selectedSupplier.user.org_type_id
        UserRequest.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        data.UserRequest = UserRequest
        axios.post('./Supplier/SaveSupplier', data)
            .then(function (response) {

                props.setOpen1(false)
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
                Swal.fire(
                    'Success!',
                    'Supplier Updated Successfully!!',
                    'success'
                )
                console.log(response)
            })
    }
    
    return (
        <div>
            {/*    <Button.Ripple color='primary' className='btn-sm' onClick={() => setis_open(props.isOpen1)}>*/}
            {/* Edit Suplier */}
            {/*<Edit size={16} />*/}
            {/*</Button.Ripple>*/}
            <Modal backdrop={'static'} isOpen={props.isOpen1} toggle={() => setis_open(props.setOpen1)} className='modal-lg'>
                <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Supplier" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUIAddEditSupplier selectedSupplier={store.selectedSupplier} bodyFor="edit_sup" register={register} errors={errors} />
                    <ModalFooterUISaveCancel setis_open={props.setOpen1} FirstBtnName="Update" SecondBtnName="Cancel" />
                </Form>
            </Modal>
        </div>
    )
}


export const EditSupplierUser = (props) => {
    const Swal = require('sweetalert2')
    const dispatch = useDispatch()
    const store = useSelector(state => state.supplierusers)

    const SupplierUserEditSchema = yup.object().shape({
        first_name: yup.string().trim().min(2, "Firstname must have at least 2 characters").max(32, "First Name can have max 32 characters").required("First name is required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Firstname "),
        last_name: yup.string().trim().min(2, "Lastname must have at least 2 characters").max(32, "Last Name can have max 32 characters").required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for Lastname "),
        login_id: yup.string().notRequired(),
        email: yup.string().trim().max(48, "Email can have max 48 characters").required('Email is required').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter valid email address "),
        mobile: yup.string().required('Mobile number is required').matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        password_hash: yup.string().trim().min(8, "Password must be at least 8 characters").max(15).required("Password is required"),
        c_password: yup.string().oneOf([yup.ref('password_hash'), null], 'Passwords must match'),
        status: yup.string().notRequired(),
        user_id: yup.string().notRequired()
    })

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SupplierUserEditSchema) })

    //const [is_open, setis_open] = useState(false)
    const EditSupplierOnsubmit = e => {
        const SupplierUserDto = new Object()
        SupplierUserDto.state = 2
        SupplierUserDto.login_id = e.login_id
        SupplierUserDto.first_name = e.first_name
        SupplierUserDto.last_name = e.last_name
        SupplierUserDto.email = e.email
        SupplierUserDto.mobile = e.mobile
        SupplierUserDto.user_id = e.user_id
        SupplierUserDto.login_id = store.selectedSupplierUser.login_id 
        SupplierUserDto.org_type = 2
        SupplierUserDto.agt_imagebytebase = document.getElementsByName("agt_imagebyte")[0].getAttribute("data") === null ? null : document.getElementsByName("agt_imagebyte")[0].getAttribute("data").split(",")[1]
        SupplierUserDto.password_hash = e.password_hash
        SupplierUserDto.is_blocked = eval(document.getElementById("C_status").value)
        //SupplierUserDto.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
        SupplierUserDto.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
        axios.post('./Supplier/SaveSupplierUSer', SupplierUserDto)
            .then(response => {

                if (JSON.parse(response.data).isSave) {
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
                    //obj.SupplierId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                    obj.SupplierId = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                    dispatch(getSUData(obj))
                    props.setOpen1(false)
                    Swal.fire(
                        'Success!',
                        'Supplier User Updated Successfully!!',
                        'success'
                    )
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                    props.setOpen1(false)
                }
            }).catch(err => console.log(err))
    }
        return (
            <div>
                {/* <Button.Ripple color='primary' className='btn-sm' onClick={() => setis_open(true)}>   
      <Edit size={16} />
      </Button.Ripple> */}
                <Modal isOpen={props.isOpen1} toggle={() => props.setOpen1(false)} className='modal-md' backdrop={'static'} key={props.id} >
                    <ModalHeaderUI setis_open={props.setOpen1} headerName="Edit Supplier User" />
                    <Form onSubmit={handleSubmit(EditSupplierOnsubmit)} autocomplete="none">
                        <ModalBodyUIAddEditSupplierUser
                            selectedSupplierUser={store.selectedSupplierUser}
                            bodyFor="edit_sup_user"
                            register={register}
                            errors={errors} />
                        <ModalFooterUISaveCancel setis_open={props.setOpen1} FirstBtnName="Update" SecondBtnName="Cancel" />
                    </Form>
                </Modal>
            </div>
        )
    
}
