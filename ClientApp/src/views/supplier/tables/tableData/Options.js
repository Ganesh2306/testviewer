//OrgOption
import { useState } from 'react'
import { getEditSupplier, getEditSupplierUser, deleteSupplier, deleteSupplierUser, getData, getSUData, getconfigureCustomer, GetCollectionsList } from './../../store/actions'
import { store } from '@store/storeConfig/store'
import { saveSupplier, saveSupplierUser, saveSupplierCustomerConfiguration } from '../../../MethodList'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { EditSupplier, EditSupplierUser } from './modalEditSupplier'
import ShareCust from './OpenShareCustomer'
import CloneSupplier from './CloneSupplier'
/*import Configuration from './OpenConfiguration'*/
import { MoreVertical, Trash2, Archive, Edit, Share2, Copy } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export const SupplierOptions = (props) => {
    const Swal = require('sweetalert2')
    const [isOpen1, setOpen1] = useState(false)
    const [isOpen2, setOpen2] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [isOpenConfiGuration, setOpenConfiGuration] = useState(false)
    const dispatch = useDispatch()
    if (isOpen1) {
        return (
            <EditSupplier isdisabled="disabled" id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }
    if (isOpen2) {
        return (
            <ShareCust id={props.ID} isOpen2={isOpen2} setOpen2={setOpen2} buttonName='Shair' />
        )
    }
    if (isOpen) {
        return (
            <CloneSupplier id={props.ID} isOpen={isOpen} setOpen={setOpen} buttonName='Clone' />
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
                            selectedSupplier: null
                        })
                        const obj = new Object()
                        obj.supplier_Id = props.ID
                        store.dispatch(getEditSupplier(obj))
                        setOpen1(true)
                    }}
                >
                    <Edit size={14} className='mr-50' />
                    <span className='align-middle'>Edit</span>
                </DropdownItem>

                <DropdownItem className='w-100' onClick={() => {

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

                            const supplier = new Object()
                            supplier.supplier_Id = props.ID
                            supplier.sup_isdeleted = true
                            supplier.sup_isblocked = false
                            supplier.state = 3
                            supplier.UserRequest = new Object()
                            supplier.UserRequest.is_deleted = true
                            supplier.UserRequest.state = 3
                            supplier.UserRequest.org_type_id = props.ID
                            supplier.UserRequest.user_id = props.ADMIN_ID
                            supplier.login_id = props.login_id
                            supplier.UserRequest.login_id = props.login_id
                            axios
                                .post(`${saveSupplier}`, supplier)
                                .then(response => {

                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    if (JSON.parse(response.data).message === null) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Your Supplier has been deleted.',
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
                                            title: 'Supplier',
                                            text: JSON.parse(response.data).message
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
                        text: "You want to delete this ?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {


                            const SupplierId = props.ID
                            axios.get(`./Supplier/DeleteSupplier?SupplierId=${SupplierId}`).then(response => {
                                const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data)
                                if (Isave === true) {
                                    if (Isave !== null && Isave !== false) {
                                        Swal.fire(
                                            'Deleted!',
                                            'Your Supplier has been deleted.',
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
                                        title: 'Supplier',
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
                    <span className='align-middle'>Delete Whole Supplier</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown >)
}

export const SupplierUserOptions = (props) => {
    const Swal = require('sweetalert2')
    const [isOpen1, setOpen1] = useState(false)
    const [isOpenConfiGuration, setOpenConfiGuration] = useState(false)
    if (isOpen1) {
        return (
            <EditSupplierUser id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
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
                        store.dispatch({
                            type: 'GET_USER',
                            selectedSupplierUser: null
                        })
                        const supplierUser = new Object()
                        supplierUser.user_id = props.ID
                        //supplierUser.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                        supplierUser.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                        store.dispatch(getEditSupplierUser(supplierUser))
                        setOpen1(true)
                    }}
                >
                    <Edit size={14} className='mr-50' />
                    <span className='align-middle'>Edit</span>
                </DropdownItem>


                {!props.isAdmin ? (<DropdownItem className='w-100' onClick={() => {


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

                            const supplierUser = new Object()
                            supplierUser.user_id = props.ID
                            supplierUser.is_deleted = true
                            supplierUser.state = 3
                            supplierUser.login_id = props.login_id
                            //supplierUser.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                            supplierUser.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                            axios
                                .post(`${saveSupplierUser}`, supplierUser)
                                .then(response => {

                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    if (Isave !== null && Isave !== false) {
                                        Swal.fire(
                                            'Deleted!',
                                            'Your Supplier User has been deleted.',
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
                                        // obj.SupplierId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                                        obj.SupplierId = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                                        store.dispatch(getSUData(obj))

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

export const SupplierCustomerOptions = (props) => {
    const Swal = require('sweetalert2')
    const [isOpen1, setOpen1] = useState(false)
    const [isOpen2, setOpen2] = useState(false)
    const [isOpenConfiGuration, setOpenConfiGuration] = useState(false)
    if (isOpen1) {
        return (
            <EditSupplierUser id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }
    if (isOpen2) {
        const dropdown = document.getElementById('sort-select1_Supplier')
        const selectedOption = dropdown.options[dropdown.selectedIndex]
        const SupplierId = parseInt(selectedOption.id)
        //store.dispatch(GetCollectionsList(SupplierId))
        return (
            <ShareCust id={props.CID} isOpen2={isOpen2} setOpen2={setOpen2} SupplierId={SupplierId} buttonName='Shair' />
        )
    }
    console.log(props.isAdmin)
    return (
        <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
                {!props.isAdmin ? (<DropdownItem className='w-100' onClick={() => {
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
                            const OBJ = {
                                Supplier_Customer_ConfigurationId: props.ID,
                                State: 3,
                                Customer_Id: props.CID,
                                Customer_Role_Id: props.Crd
                            }
                            //suppliercustomer.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                            //suppliercustomer.org_type_id  = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                            axios.post(`./Supplier/SaveSupplierCustomerConfiguration`, OBJ).then(response => {

                                const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                if (Isave !== null && Isave !== false) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Your Configured Customer has been deleted.',
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
                                    // obj.SupplierId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                                    obj.SupplierId = parseInt(document.getElementById('sort-select1_Supplier') !== null ? (document.getElementById('sort-select1_Supplier').selectedOptions.length > 0 ? document.getElementById('sort-select1_Supplier').selectedOptions[0].id : 0) : 0)
                                    store.dispatch(getconfigureCustomer(obj))


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
                <DropdownItem
                    className='w-100'
                    onClick={() => {
                        // dispatch({
                        //     type: 'GET_USER',
                        //     selectedCustomer: null
                        // })
                        // const obj = new Object()
                        // obj.customer_Id = props.ID
                        // store.dispatch(getShareCustomer(obj))
                        setOpen2(true)
                    }}
                >
                    <Share2 size={14} className='mr-50' />
                    <span className='align-middle'>Share</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown >)
}