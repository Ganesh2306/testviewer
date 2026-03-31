import $ from 'jquery'
//**React Imports */
import { Fragment, useState, useEffect, useRef, memo } from 'react'
//**Custom Components */
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col, CardText, CardHeader, CardTitle, Label, Input, Button } from 'reactstrap'
import Card from '@components/card-snippet'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Tables
import RoleAccordion from './tables/tableData/RoleAccordion'
import "./tables/tableData/Role.css"
import axios from 'axios'
import { GetRoleDesignConfigurtions } from '../management/tables/store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { getRoleByRoleType, getDesignTypesByRole, getDesignGroupsByRole, getDesignFeaturesByRole } from '../MethodList'
import { R_Loader } from '../loader/loader'
/*<Breadcrumbs breadCrumbTitle='Datatables' breadCrumbParent='Home' breadCrumbActive='Datatables Advance' />*/
const RoleConfiguration = () => {
    const [roleData, setroleData] = useState([])
    const [roleId, setRoleId] = useState(0)
    const dispatch = useDispatch()
    const loaderRef = useRef(null)
    const Swal = require('sweetalert2')
    const [Loading, setLoading] = useState(true)
    const [dataFetched, setDataFetched] = useState(false)
    useEffect(() => {
        const dataFetchedStorage = localStorage.getItem('dataFetched')
        if (dataFetchedStorage) {
            setDataFetched(true)
        } else {
            setTimeout(() => {
               setLoading(false)
               setDataFetched(true)
               localStorage.setItem('dataFetched', true) 
            }, 1000)
        }
    }, [])
    function getRoleByType(roleType) {
        setroleData([])
        dispatch({
            type: 'GET_ROLE_DESIGNCONFIGUARTION',
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
                            GetRoleDesignConfigurtions(rolesData[0].role_Id, {
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

    function SaveRoleDesignConfiguration() {
        loaderRef.current.style.display = 'block'
        const RoleDesignConfiguration = new Object()
        RoleDesignConfiguration.SaveRoleDesignConfigurations = []
        const role_id = document.getElementById('RDC_role').selectedOptions.length > 0 ? document.getElementById('RDC_role').selectedOptions[0].getAttribute('roleid') : 0
        document.querySelectorAll("input[type=checkbox]").forEach(input => {

            const SaveRoleDesignConfiguration = new Object()
            const rpcid = input.getAttribute('rpcid')
            const dcid = input.getAttribute('dcid')
            const id = input.getAttribute('id')
            const idString = `input[id="${id}"]`
            //const elemParent = $(id).parentNode
            const elemParent = document.getElementById(id).parentNode
         
            const ischecked = input.checked
            SaveRoleDesignConfiguration.role_Design_Configuration_Id = rpcid
            SaveRoleDesignConfiguration.id = id
            SaveRoleDesignConfiguration.design_Configuration_id = dcid
            SaveRoleDesignConfiguration.role_Id = role_id
            SaveRoleDesignConfiguration.is_Read_Only = false
            SaveRoleDesignConfiguration.order_No = 0
            if (Number(rpcid) === 0) {
                if (ischecked) {
                    //Added
                    SaveRoleDesignConfiguration.state = 0
                } else {
                    SaveRoleDesignConfiguration.state = 1
                }
            } else {
                if (!ischecked) {
                    //Deleted
                    SaveRoleDesignConfiguration.state = 3
                } else {
                    SaveRoleDesignConfiguration.state = 1
                }
            }
            if (SaveRoleDesignConfiguration.state === 0 && (elemParent.classList.contains('Dfeature') || elemParent.classList.contains('Dgroup'))) {
              
                const parentElem = elemParent.parentNode.parentNode.parentNode
                if (parentElem.firstElementChild.classList.contains('Dgroup')) {
                    const parId = parentElem.firstElementChild.firstElementChild.getAttribute('id')
                    if (Number(RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === parId)[0].role_Design_Configuration_Id) === 0) {
                        RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === parId)[0].state = 0
                    }
                    let typeparentElem = parentElem.parentNode.parentNode.parentNode.firstElementChild
                    if (parentElem.parentNode.parentNode.firstElementChild.classList.contains('Dtype')) {
                        typeparentElem = parentElem.parentNode.parentNode.firstElementChild
                        const typeparId = typeparentElem.firstElementChild.getAttribute('id')
                        if (Number(RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === typeparId)[0].role_Design_Configuration_Id) === 0) {
                            RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === typeparId)[0].state = 0
                        }
                    } else if (typeparentElem.firstElementChild.classList.contains('Dtype')) {
                        //.firstElementChild.firstElementChild.firstElementChild.getAttribute('dcid')
                        const typeparId = typeparentElem.firstElementChild.firstElementChild.getAttribute('id')
                        if (Number(RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === typeparId)[0].role_Design_Configuration_Id) === 0) {
                            RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === typeparId)[0].state = 0
                        }
                    }
                }
                if (parentElem.firstElementChild.classList.contains('Dtype')) {
                    // const typeparentElem = parentElem.firstElementChild.firstElementChild
                    const typeparId = parentElem.firstElementChild.firstElementChild.getAttribute('id')
                    if (Number(RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === typeparId)[0].role_Design_Configuration_Id) === 0) {
                        RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.id === typeparId)[0].state = 0
                    }
                }
            }
            // if (SaveRoleDesignConfiguration.state !== 1) {
            RoleDesignConfiguration.SaveRoleDesignConfigurations.push(SaveRoleDesignConfiguration)
            // }
        })

        RoleDesignConfiguration.SaveRoleDesignConfigurations = RoleDesignConfiguration.SaveRoleDesignConfigurations.filter(s => s.state !== 1)
        if (RoleDesignConfiguration.SaveRoleDesignConfigurations.length > 0) {
            axios.post('./Role/SaveRoleDesignConfiguration', RoleDesignConfiguration)
                .then(function (response) {
                    // if (response.data.includes('isSave":true')) {
                        if (JSON.parse(response.data)?.isSave === true) {
                        const role_id = document.getElementById('RDC_role').selectedOptions.length > 0 ? document.getElementById('RDC_role').selectedOptions[0].getAttribute('roleid') : 0
                        dispatch({
                            type: 'GET_ROLE_DESIGNCONFIGUARTION',
                            data: null,
                            totalPages: 50
                        })
                        dispatch(
                            GetRoleDesignConfigurtions(role_id, {
                                page: "",
                                perPage: "",
                                q: ""
                            })
                        )
                        //getDesignFeatures_ByRole(groupId, typeId, roleId)
                        Swal.fire(
                            'Success !',
                            'Role design configuration saved successfully!!',
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
        } else {
            Swal.fire(
                'Warning !',
                'Please configure role design configuration & then save!!',
                'warning'
            )
        }
        loaderRef.current.style.display = 'none'
    }

    useEffect(() => {
        loaderRef.current.style.display = 'block'
        getRoleByType(0)
        loaderRef.current.style.display = 'none'
    }, [])

    //useEffect(() => {
    //    dispatch(
    //        //GetRoleDesignConfigurtions(0, {
    //        //    page: "",
    //        //    perPage: "",
    //        //    q: ""
    //        //})
    //    )
    //}, [dispatch])
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Role' breadCrumbParent='Role' breadCrumbActive='Role Configuration' />
            <Row>
                <Col sm='12'>
                {Loading && !dataFetched ? (
                     <div className="text-center">
                     <h2 style={{fontFamily: "Montserrat",  color:"#0a66c2"}}>Please Wait ,Loading Role Configuration List</h2>
                   </div>
                ) : (<Card title='Role Design Configuration'>
                        <div className="col-md-8 pull-right" style={{ position: "absolute", top: "16px", right: "18px", display: "inline-flex" }}>
                            <Col className="form-group d-flex mb-0 mr-2 col ">
                                <Label className="col-form-Label col-sm-12 col-md-5 d-flex ml-5 p-0" style={{ marginTop: "0.5rem" }}>Select Role Type</Label>  {/*mayuri added ml-5 and <RoleAccordion />  made changes this file*/}
                                <Input type="select" name="RoleType" className="col-sm-12 col-md-6 pl-1" parentid="#" subid="#" id="RoleType" onChange={(e) => {
                                    getRoleByType(e.target.value)
                                }}>
                                    <option value="0" name="Organization">Organization</option>
                                    <option value="1" name="Supplier">Supplier</option>
                                    <option value="2" name="Customer">Customer</option>
                                    <option value="3" name="Agent">Agent</option>
                                </Input>
                            </Col>
                            <Col className="form-group d-flex mb-0">
                                <Label className="form-group d-flex mb-0  ml-0 col-md-4 p-0" style={{ marginTop: "0.5rem" }}>Select Role</Label>
                                <Input type="select" name="OrderCName" className="states order-alpha form-control state   mr-2 col-md-6" parentid="#" subid="#" id="RDC_role" onChange={(e) => {
                                    const actrole_Id = e.target.options[e.target.selectedIndex].getAttribute("roleId")
                                    setRoleId(actrole_Id)

                                    dispatch({
                                        type: 'GET_ROLE_DESIGNCONFIGUARTION',
                                        data: null,
                                        totalPages: 50
                                    })
                                    dispatch(
                                        GetRoleDesignConfigurtions(actrole_Id, {
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
                            <Button color='primary' onClick={SaveRoleDesignConfiguration} className="btn-sm ml-0">
                                Save
                            </Button>
                        </div>
                        <RoleAccordion />
                    </Card>)}
                </Col>
            </Row>
            <R_Loader loaderRef={loaderRef} />
        </Fragment>
    )
}

export default RoleConfiguration