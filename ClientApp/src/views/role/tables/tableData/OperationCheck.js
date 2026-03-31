import { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Row, Col, Label, Input, CardBody, Form, Button, input, Table, CustomInput } from 'reactstrap'
import { getRoleByRoleType } from '../../../MethodList'
import { useSelector, useDispatch } from 'react-redux'
import { GetRoleTasks } from '../../store/actions'
import { R_Loader } from '../../../loader/loader'
const RoleTypeOptions = [
    { value: 'Supplier', label: 'Supplier' },
    { value: 'Organization', label: 'Organization' },
    { value: 'Customer', label: 'Customer' },
    { value: 'Agent', label: 'Agent' }
]

const RoleListOptions = [
    { value: 'TDS Design Team', label: 'TDS Design Team' },
    { value: 'TDS Mkt Team', label: 'TDS Mkt Team' },
    { value: 'TDS Customer', label: 'TDS Customer' },
    { value: 'TDS Supplier', label: 'TDS Supplier' },
    { value: 'TDS Agent', label: 'TDS Agent' }
]

const userData = [
    { name: "Branding" },
    { name: "Collection" },
    { name: "Download" },
    { name: "Stock" }
]
const designData = [
    { name: "Stock Infoooo" },
    { name: "3D View" },
    { name: "3D 360 View" }//,
    //{ name: "Technical Specification" }
]
const OperationCheck = () => {
    const Swal = require('sweetalert2')
    //for left all check 
    const [roleData, setroleData] = useState([])
    const [roleId, setRoleId] = useState(0)
    const [selectedRoleType, setselectedRoleType] = useState('')
    const dispatch = useDispatch()
    const loaderRef = useRef(null)
    const store = useSelector(state => state.RoleTasks)
    function getRoleByType(roleType) {
        setroleData([])
        dispatch({
            type: 'GET_ROLE_TASKS',
            data: null,
            totalPages: 50
        })
        if (roleType === "") return

        const Role = new Object()
        Role.role_Type = roleType
        axios.post(`${getRoleByRoleType}`, Role)
            .then(response => {

                const rolesData = response.data.allRolesList === null ? null : response.data.allRolesList
                if (rolesData !== null && rolesData !== undefined) {
                    setroleData(rolesData)
                    if (rolesData.length > 0) {

                        setRoleId(rolesData[0].role_Id)
                        dispatch(
                            GetRoleTasks(rolesData[0].role_Id, {
                                page: "",
                                perPage: "",
                                q: ""
                            })
                        )
                    }
                }
            })
    }

    function setRole() {
        const roles = []
        for (let i = 0; i < roleData.length; i++) {

            roles.push(<option roleid={roleData[i].role_Id} key={roleData[i].role_Id} value={roleData[i].role_Name}>{roleData[i].role_Name}</option>)
        }
        return roles
    }

    //for main all check    
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        // setUsers(userData)
        loaderRef.current.style.display = 'block'
        getRoleByType(0)
        loaderRef.current.style.display = 'none'
    }, [])

    function checkUncheck(id) {
        const elem = document.getElementById(id)
        const childs = elem.parentElement.parentElement.parentElement.parentElement.tBodies[0].getElementsByTagName('input')//[0].checked = true
        for (let i = 0; i < childs.length; i++) {
            childs[i].checked = elem.checked
        }
    }

    function operationcheckUncheck(operId, taskId) {

        const operelem = document.getElementById(operId)
        const taskelem = document.getElementById(taskId)
        const childs = taskelem.parentElement.parentElement.parentElement.parentElement.tBodies[0].getElementsByTagName('input')//[0].checked = true
        if (!operelem.checked) {
            taskelem.checked = operelem.checked
        } else {
            let isAllCheck = true
            for (let i = 0; i < childs.length; i++) {
                if (!childs[i].checked) {
                    taskelem.checked = childs[i].checked
                    isAllCheck = false
                    break
                }

            }
            if (isAllCheck) {
                taskelem.checked = true
            }
        }

    }

    const returnRoleOperationCol = (item, i) => {

        const tableItem = (<Col md='6' sm='12'>
            <Table borderless responsive>
                <thead>
                    <tr>
                        <th colSpan='2' className='d-flex'>
                            <input type="checkbox"
                                style={{ width: "18px", height: "18px", marginRight: '1rem' }}
                                className="check-me-for-enable-all"
                                id={`ch${item.uniqueid}`}
                                // checked={!users.some((user) => user?.isChecked !== true)}
                                defaultChecked={!item?.getOperationIdOperationNameRoleTaskIdResponseDtos.some(s => s.isChecked === false) || false}
                                // onChange={handleChange}
                                onClick={() => checkUncheck(`ch${item.uniqueid}`)}
                            // name="allSelect2"
                            />
                            <Label for={`ch${item.uniqueid}`} id={`tk${item.task_Id}`}>{item.task_Operations}</Label> </th>
                    </tr>
                </thead>
                {/* <tbody>
                    {item.getOperationIdOperationNameRoleTaskIdResponseDtos.map((user, index) => (
                        <tr>
                            <td key={index} className='d-flex'>
                                <input
                                    id={`chk${user.uniqueid}`}
                                    parid={`tk${item.task_Id}`}
                                    toid={user.task_Operation_Id}
                                    rtid={user.role_Task_Id}
                                    style={{ width: "18px", height: "18px", marginRight: '1rem' }}
                                    type="checkbox"
                                    className="custominput" custom-control-input
                                    //// name={user.name}
                                    defaultChecked={user?.isChecked || false}
                                    //  onChange={handleChange} 
                                    onClick={() => operationcheckUncheck(`chk${user.uniqueid}`, `ch${item.uniqueid}`)}
                                />
                                <Label for={`chk${user.uniqueid}`} id={`op${user.operation_Id}`} >{user.operation_Name}</Label></td>
                        </tr>
                    ))}
                </tbody> */}
                <tbody>
                    {item.getOperationIdOperationNameRoleTaskIdResponseDtos.map((user, index) => {
                        //show "Disable Q3D Options" only for supplier option from dropdown
                        if (user.operation_Name === "Disable Q3D Options" && selectedRoleType !== "Supplier") {
                            return null
                        }

                        return (
                            <tr key={index}>
                                <td className='d-flex'>
                                    <input
                                        id={`chk${user.uniqueid}`}
                                        parid={`tk${item.task_Id}`}
                                        toid={user.task_Operation_Id}
                                        rtid={user.role_Task_Id}
                                        style={{ width: "18px", height: "18px", marginRight: '1rem' }}
                                        type="checkbox"
                                        className="custominput" custom-control-input
                                        defaultChecked={user?.isChecked || false}
                                        onClick={() => operationcheckUncheck(`chk${user.uniqueid}`, `ch${item.uniqueid}`)}
                                    />
                                    <Label for={`chk${user.uniqueid}`} id={`op${user.operation_Id}`} >{user.operation_Name}</Label>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Col>)

        return tableItem
    }

    const dataToRender = () => {
        const items = []
        let RoleTaskOperations = []

        if (store.data !== null && store.data.allDetails !== undefined && store.data.allDetails.length > 0) {
            RoleTaskOperations = []

            store.data.allDetails.map((item, i) => {
                item.uniqueid = (Math.random() * 1000000000).toFixed(0)
                item.isChecked = false
                item.getOperationIdOperationNameRoleTaskIdResponseDtos.map((item1, i) => {
                    item1.isChecked = !(item1.role_Task_Id === 0)
                    item1.uniqueid = (Math.random() * 1000000000).toFixed(0)
                })
                RoleTaskOperations.push(item)
            })
        }
        if (RoleTaskOperations.length > 0) {
            const menuItems = RoleTaskOperations.map((item, i) => {
                const menuItem = returnRoleOperationCol(item, i)
                return menuItem
            })
            items.push(menuItems)
        }
        return items
    }

    function saveTaskOperation() {
        loaderRef.current.style.display = 'block'
        const TaskOperation = new Object()
        const RoleTasks = []
        const role_id = document.getElementById('RDC_role').selectedOptions.length > 0 ? document.getElementById('RDC_role').selectedOptions[0].getAttribute('roleid') : 0
        const tables = document.getElementsByClassName('table-borderless')
        for (let k = 0; k < tables.length; k++) {
            const tBodies = tables[k].tBodies
            // for (const i = 0; i < tbodies.length; i++) {
            const childOpeations = tBodies[0].getElementsByTagName('input')
            for (let j = 0; j < childOpeations.length; j++) {
                const RoleTaskSave = new Object()
                RoleTaskSave.role_Id = role_id
                if (Number(childOpeations[j].getAttribute('rtid')) !== 0) {
                    if (!childOpeations[j].checked) {
                        //Deleted
                        RoleTaskSave.role_Task_Id = childOpeations[j].getAttribute('rtid')

                        RoleTaskSave.state = 3
                        RoleTasks.push(RoleTaskSave)
                    }
                } else if (childOpeations[j].checked) {
                    //Added
                    RoleTaskSave.task_Operation_Id = childOpeations[j].getAttribute('toid')
                    RoleTaskSave.state = 0
                    RoleTasks.push(RoleTaskSave)
                }
            }
            // }
        }
        if (RoleTasks.length > 0) {
            TaskOperation.RoleTasks = RoleTasks

            axios.post('./Role/SaveRoleTasks', TaskOperation)
                .then(function (response) {
                    // if (response.data.includes('isSave":true')) {
                    if (JSON.parse(response.data)?.isSave === true) {
                        const role_id = document.getElementById('RDC_role').selectedOptions.length > 0 ? document.getElementById('RDC_role').selectedOptions[0].getAttribute('roleid') : 0
                        dispatch({
                            type: 'GET_ROLE_TASKS',
                            data: null,
                            totalPages: 50
                        })
                        dispatch(
                            GetRoleTasks(role_id, {
                                page: "",
                                perPage: "",
                                q: ""
                            })
                        )
                        //getDesignFeatures_ByRole(groupId, typeId, roleId)
                        Swal.fire(
                            'Success !',
                            'Role operations saved successfully!!',
                            'success'
                        )
                    } else if (response.data === null) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Failed to save configuration!'
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    }

                    console.log(response)
                })

        }
        loaderRef.current.style.display = 'none'
    }

    function handalCheckAll(event) {

        const a = document.querySelectorAll(".check-me-for-enable-all")
        if (event.target.checked) {
            //! Check 
            a.forEach(e => {
                if (!e.checked) {
                    e.click()
                }
            })
        } else {
            //for un -check
            a.forEach(e => {
                if (e.checked) {
                    e.click()
                }
            })
        }
    }

    return (
        <>
            <Form>
                <Row>
                    <Col md='12' sm='12' className="d-flex">
                        <Col className='mb-1 d-flex' md='3' sm='12' style={{ position: "relative", zIndex: "999999" }}>
                            <Label className="col-form-label col-md-5 text-right">Role Type</Label>
                            <Input type="select" name="RoleType" className="states order-alpha form-control select react-select ml-0" parentid="#" subid="#" id="RoleType" onChange={(e) => {
                                const selectedOption = e.target.options[e.target.selectedIndex]
                                const selectedName = selectedOption.getAttribute('name')
                                getRoleByType(e.target.value)
                                setselectedRoleType(selectedName)
                            }}>
                                <option value="0" name="Organization">Organization </option>
                                <option value="1" name="Supplier">Supplier</option>
                                <option value="2" name="Customer">Customer</option>
                                <option value="3" name="Agent">Agent</option>
                            </Input>
                        </Col>
                        <Col className='mb-1 d-flex' md='3' sm='12' style={{ position: "relative", zIndex: "999999" }}>
                            <Label className="col-form-label col-md-5 text-right">Roles List</Label>
                            <Input type="select" name="OrderCName" className="states order-alpha form-control  select react-select ml-0" parentid="#" subid="#" id="RDC_role" onChange={(e) => {
                                const actrole_Id = e.target.options[e.target.selectedIndex].getAttribute("roleId")
                                setRoleId(actrole_Id)
                                dispatch({
                                    type: 'GET_ROLE_TASKS',
                                    data: null,
                                    totalPages: 50
                                })
                                dispatch(
                                    GetRoleTasks(actrole_Id, {
                                        page: "",
                                        perPage: "",
                                        q: ""
                                    })
                                )
                            }}>
                                {
                                    setRole()
                                }
                            </Input>
                        </Col>
                        <Col className="d-flex" md='2' style={{ marginTop: "0.5rem" }}>
                            <input type="checkbox"
                                className=""
                                name="isIsChecked1"
                                defaultChecked={isChecked}
                                // onChange={ParentCheckAll}
                                id="isIsChecked1"
                                onClick={handalCheckAll}
                                style={{ width: "18px", height: "18px", marginRight: '1rem' }} />
                            <Label for='isIsChecked1' check>Enable All </Label></Col>
                        <Col><Button color='primary' onClick={saveTaskOperation} className="btn" style={{ marginTop: "0rem", marginLeft: "20rem" }}>Save</Button></Col>
                    </Col>
                </Row>
                <Row>
                    {dataToRender()}
                </Row>
            </Form>
            <R_Loader loaderRef={loaderRef} />
        </>
    )
}

export default OperationCheck