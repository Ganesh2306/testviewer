//OrgOption
import { useState } from 'react'
import { getEditOrg, getEditOrgUser, DeleteOrg, addOrgUser, getConfigureOrg, getOrgData, getConfigredEmailSetting } from '../store/actions'
import { store } from '@store/storeConfig/store'
import EditUser from './OpenEditUser'
import EditOraganization from './OpenEditOrganization'
import Configuration from './OpenConfiguration'
import EditEmail from './OpenEmailConfig'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { MoreVertical, Trash2, Archive, Edit, Settings, Mail, Copy, Trash } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import CloneOrganization from './CloneOrganization'
export const OrgOptions = (props) => {
    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    const [isOpen, setOpen] = useState(false)
    const [isOpen1, setOpen1] = useState(false)
    const [isOpenConfiGuration, setOpenConfiGuration] = useState(false)
    const [isEmailOpen1, setEmailOpen1] = useState(false)
    const [emailData, setEmailData] = useState(null)
    if (isOpen1) {
        return (
            <EditOraganization id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }

    if (isOpenConfiGuration) {
        return (
            <Configuration id={props.ID} isOpenConfiGuration={isOpenConfiGuration} setOpenConfiGuration={setOpenConfiGuration} buttonName='Update' />
        )
    }

    if (isEmailOpen1) {
        return (
            <EditEmail id={props.ID} isEmailOpen1={isEmailOpen1} setEmailOpen1={setEmailOpen1} buttonName='Save' emailData={emailData} />
        )
    }
    if (isOpen) {
        return (
            <CloneOrganization id={props.ID} isOpen={isOpen} setOpen={setOpen} buttonName='Clone' />
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
                            selectedUser: null
                        })
                        const obj = new Object()
                        obj.id = props.ID
                        store.dispatch(getEditOrg(obj))
                        setOpen1(true)
                    }}
                >
                    <Edit size={14} className='mr-50' />
                    <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={() => {

                        dispatch({
                            type: 'GET_USER',
                            selectedUser: null
                        })

                        const obj = new Object()
                        obj.id = props.ID
                        store.dispatch(getConfigureOrg(obj))
                        setOpenConfiGuration(true)
                    }}
                >
                    <Settings size={14} className='mr-50' />
                    <span className='align-middle'>Configuartion</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={async () => {
                        const obj = new Object()
                        obj.id = props.ID
                        const response = await axios.post(`./Organization/getEmailConfigurationsById`, obj)
                        setEmailData(response.data)

                        setEmailOpen1(true)
                    }}
                >
                    <Mail size={14} className='mr-50' />
                    <span className='align-middle'>Mail Configuartion</span>
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

                            const org = new Object()
                            const orgUser = new Object()
                            const orgData = new Object()
                            const root = new Object()
                            org.Organisation_Id = props.ID
                            org.Org_IsDeleted = true
                            org.Org_IsBlocked = false
                            org.state = 3
                            orgData.Organisation_Id = props.ID
                            orgData.state = 3
                            orgUser.is_deleted = true
                            orgUser.state = 3
                            orgUser.login_id = props.login_id
                            root.Organisation = org
                            root.Users = orgUser
                            root.OrgDanisationData = orgData

                            axios.post(`./Organization/SaveOrganisation`, root)
                                .then(response => {
                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    const msg = JSON.parse(response.data) === null ? "fail" : JSON.parse(response.data).message
                                    if (msg === null) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Your Organization has been deleted.',
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
                                            dispatch(getOrgData(obj))
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
                                            title: 'Organization',
                                            text: JSON.parse(response.data).message
                                        })
                                    }

                                })
                                .then(() => {

                                })
                                .catch(err => console.log(err))

                        }
                    })
                    store.dispatch(DeleteOrg(root))

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
                            const Organisation_Id = props.ID
                            axios.get(`./Organization/DeleteOrganisation?OrganisationId=${Organisation_Id}`)
                                .then(response => {
                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data)
                                    if (Isave === true) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Your Organization has been deleted.',
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
                                            dispatch(getOrgData(obj))
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
                                            title: 'Organization',
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
                    <span className='align-middle'>Delete Whole Organisation</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown >)
}
export const UserOptions = (props) => {
    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    const [isOpen1, setOpen1] = useState(false)
    const [isOpenConfiGuration, setOpenConfiGuration] = useState(false)
    if (isOpen1) {
        return (
            <EditUser id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }

    if (isOpenConfiGuration) {
        return (
            <Configuration id={props.ID} isOpenConfiGuration={isOpenConfiGuration} setOpenConfiGuration={setOpenConfiGuration} buttonName='Update' />
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
                            selectedUser: null
                        })
                        const obj = new Object()
                        obj.id = props.ID
                        store.dispatch(getEditOrgUser(obj))
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

                            const orgUser = new Object()
                            orgUser.user_id = props.ID
                            orgUser.is_deleted = true
                            orgUser.state = 3
                            orgUser.login_id = props.login_id
                            store.dispatch(addOrgUser(orgUser))
                            root.Users = orgUser
                            axios.post(`./Organization/SaveOrganisationUser`, orgUser)
                                .then(response => {
                                    const Isave = response.data === null ? null : response.data.isSave
                                    if (Isave !== null && Isave !== false) {
                                        Swal.fire(
                                            'Deleted!',
                                            'Your Organization has been deleted.',
                                            'success'
                                        )
                                        const obj = new Object()
                                        const pageno = Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1
                                        const entries = Number(document.getElementById("sort-select").value)
                                        if (pageno === 0) {
                                            obj.page = 0
                                            obj.perPage = entries
                                        } else {
                                            obj.page = entries
                                            obj.perPage = pageno * entries
                                        }
                                        //dispatch(getData(obj))
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
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown >)
}