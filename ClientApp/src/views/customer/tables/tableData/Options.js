//OrgOption
import { useState } from 'react'
import { getData, getCustomerUsers, getEditCustomer, getShareCustomer, getEditCustomerUser, deleteCust as deleteCustomer, deleteCustUser as deleteCustomerUser } from './../../store/actions'
import { store } from '@store/storeConfig/store'
import EditCustmer from './OpenEditCustomer'
import EditCustmerUser from './OpenEditCustomerUser'
import ShairCust from './OpenShareCustomer'
import CloneCustomer from './CloneCustomer'
/*import Configuration from './OpenConfiguration'*/
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
import { saveCustomer } from '../../../MethodList'
import { MoreVertical, Trash2, Archive, Edit, Share2, Copy } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
export const CustomerOptions = (props) => {
    const dispatch = useDispatch()
    const [isOpen1, setOpen1] = useState(false)
    const [isOpen2, setOpen2] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [isOpenConfiGuration, setOpenConfiGuration] = useState(false)
    if (isOpen1) {
        return (
            <EditCustmer isdisabled="disabled" id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }
    if (isOpen2) {
        return (
            <ShairCust id={props.ID} isOpen2={isOpen2} setOpen2={setOpen2} buttonName='Shair' />
        )
    }
    if (isOpen) {
        return (
            <CloneCustomer id={props.ID} isOpen={isOpen} setOpen={setOpen} buttonName='Clone' />
        )
    }


    return (
        <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    className='w-100'
                    onClick={() => {
                        dispatch({
                            type: 'GET_USER',
                            selectedCustomer: null
                        })
                        const obj = new Object()
                        obj.customer_Id = props.ID
                        store.dispatch(getEditCustomer(obj))
                        setOpen1(true)
                    }}
                >
                    <Edit size={14} className='mr-50' />
                    <span className='align-middle'>Edit</span>
                </DropdownItem>

                <DropdownItem className='w-100' onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You want to delete this customer ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log(props)
                            const customer = new Object()
                            customer.customer_Id = props.ID
                            customer.customer_Name = props.cname
                            customer.login_id = props.lgn_id
                            customer.start_Date = props.sDate
                            customer.end_Date = props.end_Date
                            customer.created_On = props.created_On
                            customer.isDeleted = true
                            customer.isBlocked = false
                            customer.mobile = props.mobile
                            customer.email = props.email
                            customer.state = 3
                            customer.usersrequest = new Object()
                            customer.usersrequest.is_deleted = true
                            customer.usersrequest.state = 3
                            customer.usersrequest.org_type_id = props.ID
                            customer.usersrequest.user_id = props.userID
                            customer.usersrequest.login_id = props.lgn_id
                            //store.dispatch(deleteCustomer(customer))
                            axios.post(`${saveCustomer}`, customer)
                                .then(response => {
                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    if (JSON.parse(response.data).message === null) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Customer has been deleted.',
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
                        }
                    })
                }}>
                    <Trash2 size={14} className='mr-50' />
                    <span className='align-middle'>Delete</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={() => {
                        dispatch({
                            type: 'GET_USER',
                            selectedCustomer: null
                        })
                        const obj = new Object()
                        obj.customer_Id = props.ID
                        store.dispatch(getShareCustomer(obj))
                        setOpen2(true)
                    }}
                >
                    <Share2 size={14} className='mr-50' />
                    <span className='align-middle'>Share</span>
                </DropdownItem>
                <DropdownItem className='w-100'
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    <Copy size={14} className='mr-50' />
                    <span className='align-middle'>Clone</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You want to delete this customer ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log(props)

                            const CustomerId = props.ID
                            axios.post(`./Customer/DeleteCustomer?CustomerId=${CustomerId}`)
                                .then(response => {
                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data)
                                    if (Isave === true) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Customer has been deleted.',
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
                        }
                    })
                }}>
                    <Trash2 size={14} className='mr-50' />
                    <span className='align-middle'>Delete Whole Customer</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown >)
}


export const CustomerUserOptions = (props) => {
    const dispatch = useDispatch()
    const [isOpen1, setOpen1] = useState(false)
    const [isOpenConfiGuration, setOpenConfiGuration] = useState(false)
    if (isOpen1) {
        return (
            <EditCustmerUser id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }
    console.log(props.isAdmin)
    //if (isOpenConfiGuration) {
    //    return (
    //        <Configuration id={props.ID} isOpenConfiGuration={isOpenConfiGuration} setOpenConfiGuration={setOpenConfiGuration} buttonName='Update' />
    //    )
    //}


    return (
        <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    className='w-100'
                    onClick={() => {
                        dispatch({
                            type: 'GET_USER',
                            selectedCustomerUser: null
                        })
                        const obj = new Object()
                        obj.customer_Id = props.ID
                        obj.state = 3
                        //obj.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                        obj.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                        dispatch(getEditCustomerUser(obj))
                        setOpen1(true)
                    }}
                >
                    <Edit size={14} className='mr-50' />
                    <span className='align-middle'>Edit</span>
                </DropdownItem>


                {!props.isAdmin ? (<DropdownItem className='w-100' onClick={() => {

                    //store.dispatch(deleteCustomerUser(orgUser))

                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You want to delete this ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            const orgUser = new Object()
                            orgUser.user_id = props.ID
                            orgUser.is_deleted = true
                            orgUser.login_id = props.login_id
                            //orgUser.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                            orgUser.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                            orgUser.state = 3
                            axios.post(`./Customer/SaveCustomerUser`, orgUser)
                                .then(response => {

                                    const Isave = JSON.parse(response.data.data) === null ? null : JSON.parse(response.data.data).isSave
                                    if (Isave !== null && Isave !== false) {
                                        Swal.fire(
                                            'Deleted!',
                                            'Customeruser has been deleted.',
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
                                        obj.CustomerId = response.data.req.org_type_id
                                        dispatch(getCustomerUsers(obj))
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
                    })
                }}>
                    <Trash2 size={14} className='mr-50' />
                    <span className='align-middle'>Delete</span>
                </DropdownItem>) : <></>}

            </DropdownMenu>
        </UncontrolledDropdown >)
}