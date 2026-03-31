//OrgOption
import { useState } from 'react'
import { getEditSeason, getCollectionList } from '../../store/actions'
import { useDispatch } from 'react-redux'
import { MoreVertical, Trash2, Archive } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import OpenCollectionList from './OpenCollectionList'
import axios from 'axios'
export const SeasonalOptions = (props) => {
    const dispatch = useDispatch()
    const [isOpen1, setOpen1] = useState(false)
    const [isCollectionlist, setCollectionlist] = useState(true)
    // if (isOpen1) {
    //     return (
    //         <EditCustmer isdisabled="disabled"  isOpen1={isOpen1} setOpen1={setOpen1} buttonName='Edit' />
    //         )
    // }
    if (isCollectionlist) {
        return (
            <OpenCollectionList id={props.ID} isCollectionlist={isCollectionlist} setCollectionlist={setCollectionlist} buttonName='Shair' />
        )
     }
 }
<UncontrolledDropdown>
<DropdownToggle tag='div' className='btn btn-sm'>
        <MoreVertical size={14} className='cursor-pointer' />
    </DropdownToggle>
    <DropdownMenu right>
          {/* <DropdownItem               
                    className='w-100'
                    onClick={() => {
                        store.dispatch({
                            type: 'GET_USER',
                            selectedUser: null
                        })
                        const obj = new Object()                        
                        obj.page = 0
                        obj.perPage = 7
                        obj.SeasonId = props.ID
                        obj.id = props.ID
                        obj.org_type_id = document.getElementById('sort-select1').selectedOptions.length > 0 ? document.getElementById('sort-select1').selectedOptions[0].id : 0
                        store.dispatch(getEditSeason(obj))
                        setOpen1(true)
                    }}
                >
                    <Archive size={14} className='mr-50' />
                    <span className='align-middle'>Edit</span>
                </DropdownItem> */}


                <DropdownItem 
                              className='w-100'
                              onClick={() => {
                                  dispatch({
                                      type: 'GET_USER',
                                      selectedCustomer: null
                                  })
                                  const obj = new Object()
                                  obj.customer_Id = props.ID
                                  store.dispatch(getCollectionList(obj))
                                  setCollectionlist(true)
                              }}
                >
                    
                    <Archive size={14} className='mr-50' />
                    <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem className='w-100' >
                    <Trash2 size={14} className='mr-50' />
                    <span className='align-middle'>Delete</span>
                </DropdownItem>
                <DropdownItem className='w-100' >
                    <Archive size={14} className='mr-50' />
                    <span className='align-middle'>Share</span>
                </DropdownItem>
    </DropdownMenu>
</UncontrolledDropdown>