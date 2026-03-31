import { useContext, useState } from 'react'
import { getEditAgent, getEditAgentUser, getAgentUsers } from '../../store/actions'
import { store } from '@store/storeConfig/store'
// ** Third Party Components
import { stateContext } from '../../../context/stateContext'
import { MoreVertical, Trash2, Archive, Edit } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { SaveAgent } from '../../../MethodList'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getData } from '../../store/actions/index'
import Swal from 'sweetalert2'
import EditAgentUSer from './OpenEditAgentUser'
import EditAgent from './OpenEditAgent'
export const Options = (props) => {
    // const { isOpen, setOpen } = useContext(stateContext)
    //const Swal = require('sweetalert2')
    const [isOpen1, setOpen1] = useState(false)
    const dispatch = useDispatch()
    if (isOpen1) {
        return (
            <EditAgentUSer id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }
    return (
        <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    //tag={Link}
                    //to={`/EditAgentUser}`}
                    className='w-100'
                    onClick={() => {
                        store.dispatch({
                            type: 'GET_USER',
                            selectedUser: null
                        })
                        const obj = new Object()
                        
                        obj.page = 0
                        obj.perPage = 7
                        obj.AgentId = props.ID
                        obj.id = props.ID
                        /*obj.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0*/ //Abhishek
                        obj.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                        store.dispatch(getEditAgentUser(obj))
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
                            
                            const data = new Object()
                            data.state = 3
                            data.user_id = props.ID
                            data.is_deleted = true
                            data.login_id = props.login_id
                            /* data.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0*/ //Abhishek
                            data.org_type_id = document.getElementById('sort-select1') !== null ? (document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0) : 0
                            axios.post(`./Agent/SaveAgentUser`, data)
                                .then(response => {
                                    
                                    const Isave = JSON.parse(response.data.data) === null ? null : JSON.parse(response.data.data).isSave
                                    if (Isave !== null && Isave !== false) {
                                        Swal.fire(
                                            'Deleted!',
                                            'Your AgentUser has been deleted.',
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
                                        /* obj.AgentId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0*/
                                        if (document.getElementById('sort-select1')) {
                                            obj.AgentId = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                                        } else {
                                            obj.AgentId = 0
                                        }
                                        dispatch(getAgentUsers(obj))
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

export const AgentOptions = (props) => {
   // const Swal = require('sweetalert2')
    // const { isOpen, setOpen } = useContext(stateContext)
    const [isOpen1, setOpen1] = useState(false)
    const dispatch = useDispatch()
    if (isOpen1) {
        return (
            <EditAgent id={props.ID} isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
        )
    }
    return (
        <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    //tag={Link}
                    //to={`/EditAgentUser}`}
                    className='w-100'
                    onClick={() => {
                        store.dispatch({
                            type: 'GET_USER',
                            selectedUser: null
                        })
                        const obj = new Object()
                        obj.id = props.ID
                        store.dispatch(getEditAgent(obj))
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
                            const data = new Object()
                            data.state = 3
                            data.agt_isdeleted = true
                            data.agent_id = props.ID
                            data.userRequest = new Object()
                            data.userRequest.state = 3
                            data.userRequest.org_type_id = props.ID
                            data.userRequest.is_deleted = true
                            data.userRequest.login_id = props.login_id
                            axios.post(`${SaveAgent}`, data)
                                .then(response => {

                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    if (JSON.parse(response.data).message === null) {
                                    if (Isave !== null && Isave !== false) {
                                        Swal.fire(
                                            'Deleted!',
                                            'Your Agent has been deleted.',
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
                                            title: 'Agent',
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