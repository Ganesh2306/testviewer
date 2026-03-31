import { useState } from 'react'
import { Edit } from 'react-feather'
import { Button, Modal, Form } from 'reactstrap'
import ModalBodyUI from './ModalBodySupCustomerAccessControl'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { getData } from '../../store/actions'
import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import { ModalFooterUISaveCancel } from '../../../modal/ModalFooterOld'
import { getRoleByRoleType } from '../../../MethodList'
const AccessControlSupplierCustomer = (props) => {
    const [is_open, setis_open] = useState(false)
    const [roleData, setroleData] = useState([])
    const dispatch = useDispatch()
    console.log(is_open)
    function getRoleByType(roleType) {

        const Role = new Object()
        Role.role_Type = roleType
        Role.role_Type = roleType
        axios.post(`${getRoleByRoleType}`, Role)
            .then(response => {
                setis_open(true)
                const rolesData = response.data.allRolesList === null ? null : response.data.allRolesList
                if (rolesData !== null && rolesData !== undefined) {

                    setroleData(rolesData)

                    if (rolesData.length > 0) {
                        const userId = document.getElementById('SAC_Name').getAttribute('uid')
                        axios.get(`./Role/GetRoleAssignmentByUserId?userId=${userId}`)
                            .then(response => {
                                setis_open(true)
                                const role_Assignments = response.data.role_Assignments === null ? null : response.data.role_Assignments
                                if (role_Assignments !== null && role_Assignments !== undefined) {
                                    document.getElementById('SAC_Name').setAttribute('raid', response.data.role_Assignments.role_Assignment_Id)
                                    if (document.querySelector(`option[roleid="${role_Assignments.role_Id}"]`) !== null) {
                                        const selectedValue = document.querySelector(`option[roleid="${role_Assignments.role_Id}"]`).value
                                        document.getElementById('SAC_accessRole').value = selectedValue
                                    }
                                }
                            })
                    }

                }
            })
    }

    function setRole() {
        const roles = []
        roles.push(<option roleid={0} key={0} value="Unassigned">Unassigned</option>)
        for (let i = 0; i < roleData.length; i++) {

            roles.push(<option roleid={roleData[i].role_Id} key={roleData[i].role_Id} value={roleData[i].role_Name}>{roleData[i].role_Name}</option>)
        }
        return roles
    }
    function onSubmit(e) {

        e.preventDefault()
        const _RoleAssignment = new Object()
        _RoleAssignment.user_Id = document.getElementById('SAC_Name').getAttribute('uid')

        _RoleAssignment.is_Role_Admin = true
        _RoleAssignment.role_assignment_id = document.getElementById('SAC_Name').getAttribute('raid') === null ? 0 : document.getElementById('SAC_Name').getAttribute('raid')
        const selectedRoleID = document.getElementById('SAC_accessRole').selectedOptions[0].getAttribute('roleid')
        if (Number(selectedRoleID) === 0) {
            _RoleAssignment.state = 3
        } else {
            _RoleAssignment.state = document.getElementById('SAC_Name').getAttribute('raid') === null ? 0 : 2
        }
        _RoleAssignment.role_Id = selectedRoleID
        //dispatch(addCustUser(custuser))
        axios.post(`./Role/SaveRoleAssignments`, _RoleAssignment)
            .then(response => {

                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                if (Isave !== null && Isave !== false) {
                
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    dispatch(getData(obj))

                    setis_open(false)
                    Swal.fire(
                        'Success!',
                        'Role assigned successfully!!',
                        'success'
                    )
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
        // console.log(Customer)
    }

    return (
        <div>
            <div className='d-flex' onClick={() => getRoleByType(1)}>
                <Button.Ripple color='' className='btn-sm'>
                    <Edit size={15} />
                </Button.Ripple>
            </div>
            <Modal backdrop="static" isOpen={is_open} toggle={() => setis_open(false)} className='modal-md modal-dialog-centered'>   {/*abhishek 17-2-22*/}
                <ModalHeaderUI setis_open={setis_open} headerName=" Access Control" />
                <Form onSubmit={onSubmit}>
                    <ModalBodyUI supplierData={props.supplierData} setRole={setRole} bodyFor="ModalBodySupCustomerAccessControl" />
                    <ModalFooterUISaveCancel setis_open={setis_open} FirstBtnName="Save" SecondBtnName="Cancel" />
                </Form>
            </Modal>
        </div>
    )
}

export default AccessControlSupplierCustomer
