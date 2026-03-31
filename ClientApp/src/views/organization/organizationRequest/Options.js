//OrgOption
import { useState } from 'react'
import axios from 'axios'
import { getOrgRequest } from '../store/actions'
import { store } from '@store/storeConfig/store'
import OpenAddOrganization from '../tableData/OpenAddOrganization'
import { RejectRequest } from '../../MethodList'
import { MoreVertical, Trash2, Archive } from 'react-feather'
import { useDispatch } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
export const OrgReqOptions = (props) => {
    const dispatch = useDispatch()
    const [isOpen1, setOpen1] = useState(false)
    if (isOpen1) {
        console.log(props.obj)
        const obj1 = new Object()
        const organisation = new Object()
       
        const users = new Object()
        organisation.org_Address = props.obj.rOrg_Address
        organisation.org_City = props.obj.rOrg_City
        organisation.org_Country = props.obj.rOrg_Country
        organisation.org_Email = props.obj.rOrg_Email
        organisation.org_IsBlocked = false
        organisation.org_IsDeleted = false
        organisation.org_Name = props.obj.rOrg_Name
        organisation.org_Phone = props.obj.rOrg_Phone
        organisation.org_Pincode = props.obj.rOrg_Pincode
        organisation.org_State = props.obj.rOrg_State
        organisation.org_Type = 1
        organisation.org_Website = props.obj.rOrg_Website
        organisation.organisation_Id = 0
        organisation.req_Registration_Id = 0

        users.agt_imagebytebase = null

        users.department = ""
        users.email = props.obj.rUsr_Email
        users.first_name = props.obj.rUsr_First_Name
            users.is_administrator = true
        users.is_blocked = false
        users.is_deleted = false
        users.is_logged_in = false
        users.last_name = props.obj.rUsr_Last_Name
        users.login_id = ""
        users.mobile = props.obj.rUsr_Mobile
            users.org_id = 0
            users.org_type = 1
        users.org_type_id = 0

        users.phone = props.obj.rUsr_Phone
        users.state = 0
        users.user_id = 0
        obj1.organisation = organisation
        obj1.users = users

        return (
            <OpenAddOrganization IsOpen ="true" selectedUser={obj1} obj={props.obj} reqId={props.reqId} isOpen1={isOpen1} setOpen1={setOpen1} hide={true} />
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

                        setOpen1(true)
                    }}
                >
                    <Archive size={14} className='mr-50' />
                    <span className='align-middle'>Accept</span>
                </DropdownItem>
                <DropdownItem
                    className='w-100'
                    onClick={() => {

                        const obj = new Object()
                        obj.state = 3
                        obj.registration_Id = props.reqId
                        obj.is_deleted = true
                        axios.post(`${RejectRequest}`, obj)
                            .then(response => {

                                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                                if (Isave !== null && Isave !== false) {
                                    
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
                                    dispatch(getOrgRequest(obj))
                                } else alert("Something Went Wrong!!")

                            })
                            .then(() => {

                            })
                            .catch(err => console.log(err))

                    }}
                >
                    <Archive size={14} className='mr-50' />
                    <span className='align-middle'>Reject</span>
                </DropdownItem>

            </DropdownMenu>
        </UncontrolledDropdown >)
}