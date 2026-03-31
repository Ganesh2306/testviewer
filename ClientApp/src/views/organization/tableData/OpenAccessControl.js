import { useState } from 'react'
import { Modal, Button, Form } from 'reactstrap'
import { getData } from '../store/actions'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Edit, Shield } from 'react-feather'
import { useDispatch } from 'react-redux'
import AccessModalBody from './AccessModalBody'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
import { getRoleByRoleType } from '../../MethodList'
// ! Access Control function
const AccessControl = (props) => {
    const [is_open, setis_open] = useState(false)
    const [roleData, setroleData] = useState([])
    const dispatch = useDispatch()
    console.log(is_open)
    function getRoleByType(roleType) {

        const Role = new Object()
        Role.role_Type = roleType
        axios.post(`${getRoleByRoleType}`, Role)
            .then(response => {
                setis_open(true)
                const rolesData = response.data.allRolesList === null ? null : response.data.allRolesList
                if (rolesData !== null && rolesData !== undefined) {

                    setroleData(rolesData)

                    if (rolesData.length > 0) {
                        const userId = document.getElementById('orguserName').getAttribute('uid')
                        axios.get(`./Role/GetRoleAssignmentByUserId?userId=${userId}`)
                            .then(response => {
                                setis_open(true)
                                const role_Assignments = response.data.role_Assignments === null ? null : response.data.role_Assignments
                                if (role_Assignments !== null && role_Assignments !== undefined) {

                                    document.getElementById('orguserName').setAttribute('raid', response.data.role_Assignments.role_Assignment_Id)
                                    const selectedValue = document.querySelector(`option[roleid="${role_Assignments.role_Id}"]`).value
                                    document.getElementById('OrgC_accessRole').value = selectedValue
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
        _RoleAssignment.user_Id = document.getElementById('orguserName').getAttribute('uid')

        _RoleAssignment.is_Role_Admin = eval(document.getElementById('orguserName').getAttribute('isadm'))
        _RoleAssignment.role_assignment_id = document.getElementById('orguserName').getAttribute('raid') === null ? 0 : document.getElementById('orguserName').getAttribute('raid')
        const selectedRoleID = document.getElementById('OrgC_accessRole').selectedOptions[0].getAttribute('roleid')
        if (Number(selectedRoleID) === 0) {
            _RoleAssignment.state = 3
        } else {
            _RoleAssignment.state = document.getElementById('orguserName').getAttribute('raid') === null ? 0 : 2
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
                       // title: 'Oops...',
                       text: 'Please assign Role' 
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
            <Button.Ripple color='' className='btn-sm' onClick={() => getRoleByType(0)}>
                {/* Edit Suplier */}
                <Edit size={16} />
            </Button.Ripple>
            <Modal backdrop="static" isOpen={is_open} toggle={() => setis_open(false)} className='modal-md'>      {/* abhishek 17-02*/}
                <ModalHeaderUI setis_open={setis_open} headerName="Access Control" />
                <Form onSubmit={onSubmit}>
                    <AccessModalBody orgUserData={props.orgUserData} setRole={setRole} bodyFor="access" />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
                </Form>
            </Modal>
        </div>
    )
}

export default AccessControl