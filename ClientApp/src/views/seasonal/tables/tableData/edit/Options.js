//OrgOption
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getEditSeason, getCollectionList, CollezioniGetSeasonMastersList, GetEditSeason, GetCollectionListBySeasonId, GetEditCollection } from '../../../store/actions'
import { store } from '@store/storeConfig/store'
import { useDispatch } from 'react-redux'
import { MoreVertical, Trash2, Archive } from 'react-feather'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import Swal from 'sweetalert2'
import EditSeason from './EditSeason'
import EditCollection from './EditCollection'

export const SeasonalOptions = (props) => {
    const dispatch = useDispatch()
    const [isShow, setShow] = useState(false)
    const [isShow2, setShow2] = useState(false)   
    if (isShow) {
        return (
            <EditSeason isdisabled="disabled" id={props.ID} isShow={isShow} setShow={setShow}  buttonName='Edit' />
        )
     } 
    return (
    <UncontrolledDropdown>
    <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
                    <DropdownItem  
                    //buttonName='Edit'
                                 className='w-100'
                                 onClick={() => {
                                     dispatch({
                                         type: 'GET_Season',
                                         selectedseasonal: null
                                     })
                                     const obj = new Object()
                                     obj.sm_Season_Id = props.ID
                                     store.dispatch(GetEditSeason(obj))
                                     setShow(true)
             
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
                            const obj = {
                                State: 3,
                                sm_Season_Id: props.ID
                            }
                            axios.post(`./Seasonal/CollezioniSaveSeasonMasters`, obj)
                                .then(response => {
                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    if (JSON.parse(response.data).message === null) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Season has been deleted.',
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
                                            store.dispatch(CollezioniGetSeasonMastersList(obj))
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
                                            title: 'season',
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
    </UncontrolledDropdown>
    )
 }
export const CollectionOptions = (props) => {
    const dispatch = useDispatch()
    const [isShow, setShow] = useState(false)
    const [isShow2, setShow2] = useState(false)

    const [Seaslist, sslist] = useState(null)
    const [setCustomer, Customer] = useState(null)

    //ToDo: add axios call
    useEffect(async () => {
        const obj = {
            OrganisationId: 0,
            SupplierId: 0,
            start: 0,
            end: 0
        }
      const res = await axios.post("./Seasonal/GetSeasonMastersList", obj)
      sslist(res.data.seasonMastersList)
      const list = await axios.post("./Seasonal/GetConfiguredCustomerList")
      Customer(list.data.customerListDto)
    }, [])
    
    if (isShow2) {
        return (
            <EditCollection Seaslist={Seaslist} setCustomer={setCustomer} disabled="disabled" id={props.ID} isShow2={isShow2} setShow2={setShow2}  buttonName='Edit' />
        )
     } 

    return (
    <UncontrolledDropdown>
    <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
                    <DropdownItem  buttonName='Edit'
                                 className='w-100'
                                 onClick={() => {
                                     dispatch({
                                         type: 'GET_Collection',
                                         selectedcollection: null
                                     })
                                     const obj = new Object()
                                     obj.collection_Id = props.ID
                                    store.dispatch(GetEditCollection(obj))
                                    setShow2(true)
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
                            const obj = {
                                State: 3,
                                Collection_Id: props.ID
                            }
                            axios.post(`./Seasonal/SaveCollectionBySeasonId`, obj)
                                .then(response => {
                                    const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
                                    if (JSON.parse(response.data).message === null) {
                                        if (Isave !== null && Isave !== false) {
                                            Swal.fire(
                                                'Deleted!',
                                                'Collection has been deleted.',
                                                'success'
                                            )
                                            const obj = new Object()
                                            const pageno = 0 //Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1 //abhishek 03/03
                                            const entries = Number(document.getElementById("sort-select").value)
                                            obj.SeasonID = props.collectionData.sm_Season_Id
                                            if (pageno === 0) {
                                                obj.page = 0
                                                obj.perPage = entries
                                            } else {
                                                obj.page =  entries
                                                obj.perPage = pageno * entries
                                            }
                                            dispatch(GetCollectionListBySeasonId(obj))
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
                                            title: 'Collection',
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
    </UncontrolledDropdown>
    )
 }
