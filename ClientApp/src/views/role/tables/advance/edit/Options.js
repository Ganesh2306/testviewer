//OrgOption
import axios from 'axios'
import { useState } from 'react'
import { getEditRoleData, getRolesData } from './../../../store/actions'
import { store } from '@store/storeConfig/store'
import { EditRole } from './EditRole'
import Swal from 'sweetalert2'
/*import Configuration from './OpenConfiguration'*/
import { MoreVertical, Trash2, Archive, Edit } from 'react-feather'
import { useDispatch } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
export const RoleOptions = (props) => {
    const dispatch = useDispatch()
    const [isOpen1, setOpen1] = useState(false)
    if (isOpen1) {
        return (
            <EditRole isdisabled="disabled" id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
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
                            type: 'GET_ROLE',
                            selectedRole: null
                        })
                        setOpen1(true)
                        const obj = new Object()
                        obj.role_Id = props.ID

                        store.dispatch(getEditRoleData(obj))

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

                            const role = new Object()
                            role.role_Id = props.ID
                            role.state = 3
                            role.is_Deleted = true
                            axios.post(`./Role/SaveRole`, role)
                                .then(response => {
                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    if (JSON.parse(response.data).message === null) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Role has been deleted.',
                                                'success'
                                            )
                                            const obj = new Object()
                                            const pageno = 0 //Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1 //abhishek 03/03
                                            const entries = Number(document.getElementById("sort-select").value)
                                            if (pageno === 0) {
                                                obj.page = 0
                                                obj.perPage = entries
                                            } else {
                                                obj.page =  entries
                                                obj.perPage = pageno * entries
                                            }
                                            dispatch(getRolesData(obj))
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
                                            title: 'Role',
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
            </DropdownMenu>
        </UncontrolledDropdown >)
}