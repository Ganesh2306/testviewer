//OrgOption
import { useState } from 'react'
import { getEditSeason, getCollectionList } from '../../store/actions'
import { store } from '@store/storeConfig/store'
import { useDispatch } from 'react-redux'
import { MoreVertical, Trash2, Archive } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import OpenCollectionList from './OpenCollectionList'

export const SeasonalOptions = (props) => {
    const dispatch = useDispatch()
    const [isOpen1, setOpen1] = useState(false)
    const [isOpen2, setOpen2] = useState(false)
    const [isCollectionlist, setCollectionlist] = useState(false)   
    if (isOpen2) {
        return (
            <OpenCollectionList id={props.ID} isOpen2={isOpen2} setOpen2={setOpen2} buttonName='Assign' />
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
                                //  onClick={() => {
                                //     dispatch({
                                //         type: 'GET_USER',
                                //         selectedCustomer: null
                                //     })
                                //     const obj = new Object()
                                //     obj.customer_Id = props.ID
                                //     store.dispatch(getCollectionList(obj))
                                //     setOpen2(true)
                                // }}
                    >
                        
                        <Archive size={14} className='mr-50' />
                        <span className='align-middle'>Assign</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' >
                        <Trash2 size={14} className='mr-50' />
                        <span className='align-middle'>Delete</span>
                    </DropdownItem>
                    <DropdownItem className='w-100' buttonName='Assign'>
                        <Archive size={14} className='mr-50' />
                        <span className='align-middle' Selseas = {Selseas}>Edit</span>                      
                    </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
    )
 }
