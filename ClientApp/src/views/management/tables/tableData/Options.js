import {useState } from 'react'
import { getDesignFeautre } from '../store/actions/index'
import { store } from '@store/storeConfig/store'

import { MoreVertical, Trash2, Archive } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import EditFeature from './edit/EditFeature'
export const Options = (props) => {
    // const { isOpen, setOpen } = useContext(stateContext)
    const Swal = require('sweetalert2')
    const [isOpen1, setOpen1] = useState(false)
    const dispatch = useDispatch()
    if (isOpen1) {
        return (
            <EditFeature obj={props.obj} isOpen1={isOpen1} setOpen1={setOpen1} />
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
                      
                        setOpen1(true)
                    }}
                >
                    <Archive size={14} className='mr-50' />
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
                            const features = []
                            const data = new Object()
                            const root = new Object()
                            data.state = 3
                            data.design_Feature_Id = props.obj.design_Feature_Id
                           // data.is_deleted = true
                           // root.saveFeatureRequestDto = data
                            features.push(data)
                            axios.post('./Management/SaveFeature', features)
                                .then(response => {
                                    //abhishek start 10/03
                                    if (JSON.parse(response.data).isSave) {
                                        const result = response.data === null ? null : JSON.parse(response.data)
                                        if (result.isSave !== null && result.isSave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Your design feature has been deleted.',
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
                                            dispatch(getDesignFeautre(obj))
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
                                //abhishek start 10/03
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

