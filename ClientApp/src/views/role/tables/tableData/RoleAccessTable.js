// ** React Imports
import { Fragment, useState, useEffect, memo, useRef } from 'react'
// ** Table Columns
import { ColumnRoleDesign, RoleDesignData } from './data'
import $ from 'jquery'
// ** Store & Actions
import { getData } from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, CustomInput } from 'reactstrap'
import { getRoleByRoleType, getDesignTypesByRole, getDesignGroupsByRole, getDesignFeaturesByRole } from '../../../MethodList'
import { R_Loader } from '../../../loader/loader'
const DataRoleAccessTable = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.dataTables)

    // ** States
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
    const [roleData, setroleData] = useState([])
    const [typesData, settypesData] = useState([])
    const [groupsData, setgroupsData] = useState([])
    const [featuresData, setfeaturesData] = useState([])
    const [roleId, setRoleId] = useState(0)
    const [typeId, setTypeId] = useState(0)
    const [groupId, setGroupId] = useState(0)
    const select1 = useRef('Organization')
    const select2 = useRef('')
    const select3 = useRef('')
    const select4 = useRef('')
    const Swal = require('sweetalert2')
    let RoleDesignData_new = []
    const loaderRef = useRef(null)
    const myComplexobj = {
        type: [],
        group: [],
        ft: [],
        roll: []
    }
    const selectedType = {
        type: null,
        group: null,
        selectedUSer: null
    }
    // ** Get data on mount

    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            q: searchValue
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        if (store.data.length > 0) {
            return store.data
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    }
    function setProductFeatures(featuresData1) {

        RoleDesignData_new = []
        setfeaturesData([])
        if (featuresData1.length > 0) {
            for (let i = 0; i < featuresData1.length; i++) {

                const feature = new Object({
                    id: (i + 1),
                    role_design_configuration_id: featuresData1[i].role_design_configuration_id,
                    Design_Name: featuresData1[i].design_features_name,
                    save_check: <CustomInput className="access_check text-center" inline type='checkbox' id={`c${(Math.random() * 1000000000).toFixed(0)}`} csfid={featuresData1[i].configure_savedesign_feature.configure_SaveDesign_Feature_Id} defaultChecked={featuresData1[i].configure_savedesign_feature.csF_Is_Save} />,
                    mand_check: <CustomInput className="access_check text-center" inline type='checkbox' id={`c${(Math.random() * 1000000000).toFixed(0)}`} csfid={featuresData1[i].configure_savedesign_feature.configure_SaveDesign_Feature_Id} defaultChecked={featuresData1[i].configure_savedesign_feature.csF_Is_Mandatory} />,
                    ord_a: <Input defaultValue={featuresData1[i].configure_savedesign_feature.csF_Order_No} type='text' bsSize='sm' style={{ width: '80px' }} />,
                    label_check: <CustomInput className="access_check text-center" inline type='checkbox' id={`c${(Math.random() * 1000000000).toFixed(0)}`} clfid={featuresData1[i].configure_labledesign_feature.configure_LableDesign_Feature_Id} defaultChecked={featuresData1[i].configure_labledesign_feature.clF_Is_Lable} />,
                    ord_b: <Input defaultValue={featuresData1[i].configure_labledesign_feature.clF_Order_No} type='text' bsSize='sm' style={{ width: '80px' }} />,
                    advance_check: <CustomInput className="access_check text-center" inline type='checkbox' id={`c${(Math.random() * 1000000000).toFixed(0)}`} cffid={featuresData1[i].configure_filterdesign_feature.configure_FilterDesign_Feature_Id} defaultChecked={featuresData1[i].configure_filterdesign_feature.cfF_Is_Filter_Search} />,
                    inputtext: <Input defaultValue={featuresData1[i].configure_filterdesign_feature.cfF_Order_No} type='text' id='a1' bsSize='sm' style={{ width: '80px' }} cffid={featuresData1[i].configure_filterdesign_feature.cfF_Order_No} />,
                    ai_check: <CustomInput className="access_check text-center" inline type='checkbox' id={`c${(Math.random() * 1000000000).toFixed(0)}`} cafid={featuresData1[i].configure_AISearch_Feature.configure_AIsearch_Feature_Id} defaultChecked={featuresData1[i].configure_AISearch_Feature.caiF_Is_AI} />,
                    ord_c: <Input defaultValue={featuresData1[i].configure_AISearch_Feature.caiF_Order_No} type='text' id='a2' bsSize='sm' style={{ width: '80px' }} cafid={featuresData1[i].configure_AISearch_Feature.caiF_Order_No} />
                })
                RoleDesignData_new.push(feature)
            }
            setfeaturesData(RoleDesignData_new)
            loaderRef.current.style.display = 'none'
        }
    }

    function getDesignFeatures_ByRole(agroup_Id, atype_Id, paraRoleId) {
        loaderRef.current.style.display = 'block'
        RoleDesignData_new = []
        if ((roleId === 0 && paraRoleId === 0) || (typeId === 0 && atype_Id === 0) || (agroup_Id === 0 && groupId === 0)) return

        const Role = new Object()
        Role.role_Id = paraRoleId !== 0 ? paraRoleId : roleId
        Role.designTypeId = atype_Id !== 0 ? atype_Id : typeId
        Role.designGroupeId = agroup_Id
        axios.post(`${getDesignFeaturesByRole}`, Role)
            .then(response => {

                const featData = response.data.allDesignFeatursByRoles === null ? null : response.data.allDesignFeatursByRoles
                if (featData !== null && featData !== undefined) {
                    setProductFeatures(featData)
                }
            })
    }

    function getDesignGroups_ByRole(atype_Id, paraRoleId) {

        if ((roleId === 0 && paraRoleId === 0) || atype_Id === 0) return
        const Role = new Object()
        Role.role_Id = paraRoleId !== 0 ? paraRoleId : roleId
        Role.designTypeId = atype_Id
        axios.post(`${getDesignGroupsByRole}`, Role)
            .then(response => {

                const grpData = response.data.allDesignGroupsByRoles === null ? null : response.data.allDesignGroupsByRoles
                if (grpData !== null && grpData !== undefined) {
                    setgroupsData(grpData)
                    if (grpData.length > 0) {
                        select4.current = grpData[0].design_groups_name
                        setGroupId(grpData[0].design_groups_id)
                        getDesignFeatures_ByRole(grpData[0].design_groups_id, atype_Id, paraRoleId)
                    }
                }
            })
    }

    function getDesignTypes_ByRole(aroleId) {

        settypesData([])
        setgroupsData([])
        setfeaturesData([])
        if (aroleId === 0) return
        const Role = new Object()
        Role.role_Id = aroleId
        setRoleId(aroleId)
        axios.post(`${getDesignTypesByRole}`, Role)
            .then(response => {
                const typeData = response.data.allDesignTypesByRoles === null ? null : response.data.allDesignTypesByRoles
                if (typeData !== null && typeData !== undefined) {
                    settypesData(typeData)
                    if (typeData.length > 0) {
                        select3.current = typeData[0].design_type_name
                        setTypeId(typeData[0].design_type_id)
                        getDesignGroups_ByRole(typeData[0].design_type_id, aroleId)
                    }
                }
            })
    }


    function getRoleByType(roleType) {
        setroleData([])
        settypesData([])
        setgroupsData([])
        setfeaturesData([])
        if (roleType === "") return

        const Role = new Object()
        Role.role_Type = roleType
        axios.post(`${getRoleByRoleType}`, Role)
            .then(response => {
                const rolesData = response.data.allRolesList === null ? null : response.data.allRolesList
                if (rolesData !== null && rolesData !== undefined) {
                    select2.current = ''
                    select3.current = ''
                    select4.current = ''

                    setroleData(rolesData)
                    if (rolesData.length > 0) {
                        select2.current = rolesData[0].role_Name
                        setRoleId(rolesData[0].role_Id)
                        getDesignTypes_ByRole(rolesData[0].role_Id)
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

    function setProductTypes() {
        const types = []
        for (let i = 0; i < typesData.length; i++) {

            types.push(<option typeid={typesData[i].design_type_id} key={typesData[i].design_type_id} value={typesData[i].design_type_name}>{typesData[i].design_type_name}</option>)
        }
        return types
    }

    function setProductGroups() {
        const groups = []
        for (let i = 0; i < groupsData.length; i++) {

            groups.push(<option groupid={groupsData[i].design_groups_id} key={groupsData[i].design_groups_id} value={groupsData[i].design_groups_name}>{groupsData[i].design_groups_name}</option>)
        }
        return groups
    }


    function SaveRoleDesignAccess() {
        loaderRef.current.style.display = 'block'
        const RoleDesignAccess = new Object()
        RoleDesignAccess.saveConfigureSaveDesignFeatureRequestDtos = []
        RoleDesignAccess.saveConfigureLableDesignFeatureRequestDtos = []
        RoleDesignAccess.saveConfigureFilterDesignFeatureRequestDtos = []
        RoleDesignAccess.saveConfigureAISearchFeatureRequestDtos = []

        const datas = $('.rdt_TableBody')
        for (let i = 0; i < datas.children().length; i++) {
            const rdcid = datas[0].children[i].children[0].children[0].getAttribute('rdcid')
            const featureNm = datas[0].children[i].children[1].textContent
            const SaveDesign_Feature_Id = datas[0].children[i].children[2].children[0].children[0].children[0].getAttribute('csfid')
            const csF_Is_save = datas[0].children[i].children[2].children[0].children[0].children[0].checked
            const csF_state = SaveDesign_Feature_Id === '0' ? 0 : csF_Is_save ? 2 : 3
            const csF_order_No = datas[0].children[i].children[4].children[0].children[0].value
            const csF_Is_Mandatory = datas[0].children[i].children[3].children[0].children[0].children[0].checked


            const LableDesign_Feature_Id = datas[0].children[i].children[5].children[0].children[0].children[0].getAttribute('clfid')
            const clF_Is_lable = datas[0].children[i].children[5].children[0].children[0].children[0].checked
            const clF_state = LableDesign_Feature_Id === '0' ? 0 : clF_Is_lable ? 2 : 3
            const clF_Order_no = datas[0].children[i].children[6].children[0].children[0].value

            const FilterDesign_Feature_Id = datas[0].children[i].children[7].children[0].children[0].children[0].getAttribute('cffid')
            const cfF_Is_Filter_search = datas[0].children[i].children[7].children[0].children[0].children[0].checked
            const cfF_state = FilterDesign_Feature_Id === '0' ? 0 : cfF_Is_Filter_search ? 2 : 3
            const cfF_Order_no = datas[0].children[i].children[8].children[0].children[0].value

            const AiDesign_Feature_Id = datas[0].children[i].children[9].children[0].children[0].children[0].getAttribute('cafid')
            const caF_Is_Ai_search = datas[0].children[i].children[9].children[0].children[0].children[0].checked
            const ai_state = (AiDesign_Feature_Id === "0" || AiDesign_Feature_Id === null) ? 0 : (caF_Is_Ai_search ? 2 : 3)
            const ai_Order_no = datas[0].children[i].children[10].children[0].children[0].value

            const SaveConfigureSaveDesignFeatureRequestDto = new Object({
                state: csF_state,
                configure_SaveDesign_Feature_Id: SaveDesign_Feature_Id,
                csF_Role_Design_Configuration_Id: rdcid,
                csF_Is_Save: csF_Is_save,
                csF_Is_Mandatory,
                csF_order_No
            })
            RoleDesignAccess.saveConfigureSaveDesignFeatureRequestDtos.push(SaveConfigureSaveDesignFeatureRequestDto)
            const SaveConfigureLableDesignFeatureRequestDto = new Object({
                state: clF_state,
                configure_LableDesign_Feature_Id: LableDesign_Feature_Id,
                clF_Role_Design_Configuration_Id: rdcid,
                clF_Is_Lable: clF_Is_lable,
                clF_Order_No: clF_Order_no
            })
            RoleDesignAccess.saveConfigureLableDesignFeatureRequestDtos.push(SaveConfigureLableDesignFeatureRequestDto)
            const SaveConfigureFilterDesignFeatureRequestDto = new Object({
                state: cfF_state,
                configure_FilterDesign_Feature_Id: FilterDesign_Feature_Id,
                cfF_Role_Design_Configuration_Id: rdcid,
                cfF_Is_Filter_Search: cfF_Is_Filter_search,
                cfF_Order_No: cfF_Order_no
            })
            RoleDesignAccess.saveConfigureFilterDesignFeatureRequestDtos.push(SaveConfigureFilterDesignFeatureRequestDto)

            const SaveConfigureAISearchFeatureRequestDto = new Object({
                state: ai_state,
                Configure_AISearch_Feature_Id: (AiDesign_Feature_Id !== null && AiDesign_Feature_Id !== undefined) ? AiDesign_Feature_Id : 0,
                CAIF_Role_Design_Configuration_Id: rdcid,
                CAIF_Is_AI: caF_Is_Ai_search,
                CAIF_Order_No: ai_Order_no
            })
            RoleDesignAccess.saveConfigureAISearchFeatureRequestDtos.push(SaveConfigureAISearchFeatureRequestDto)
        }

        axios.post('./Role/SaveDesignAccess', RoleDesignAccess)
            .then(function (response) {
                if (JSON.parse(response.data)?.isSave === true) {
                    getDesignFeatures_ByRole(groupId, typeId, roleId)
                    Swal.fire({
                        icon: 'Success !',
                        title: 'Design access saved successfully!!',
                        text: 'success'
                    })
                    loaderRef.current.style.display = 'none'
                } else if (response.data === null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to save configuration!'
                    })
                    loaderRef.current.style.display = 'none'
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    })
                    loaderRef.current.style.display = 'none'
                }

                console.log(response)
            })

    }


    useEffect(() => {
        loaderRef.current.style.display = 'block'
        getRoleByType(0)
        loaderRef.current.style.display = 'none'
    }, [])

    return (
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Role Design Access</CardTitle>
                </CardHeader>

                <Col className='md-12 p-1 '>
                    <div className='d-flex justify-content-start'>
                        <div className="form-group d-flex mb-0" style={{ width: '18%' }}>
                            <Label className="col-form-label col-md-6 text-right">Role Type</Label>
                            <Input type="select" name="RoleType" className="states order-alpha form-control state mr-2 col-md-9 " parentid="#" subid="#" id="RoleType"
                                onChange={(e) => {
                                    getRoleByType(e.target.value)
                                }}>
                                <option value="0" name="Organization">Organization</option>
                                <option value="1" name="Supplier">Supplier</option>
                                <option value="2" name="Customer">Customer</option>
                                <option value="3" name="Agent">Agent</option>
                            </Input>
                        </div>
                        <div className="form-group d-flex ml-1 mb-0 rolepp" style={{ width: '18%' }}>
                            <Label className="col-form-label  col-md-6 ml-1 text-right">Role</Label>
                            <Input type="select" name="Role" className="states order-alpha form-control state col-md-9" parentid="#" subid="#" id="Role" onChange={(e) => {

                                const actrole_Id = e.target.options[e.target.selectedIndex].getAttribute("roleid")
                                setRoleId(actrole_Id)
                                setTimeout(getDesignTypes_ByRole(actrole_Id), 50)
                            }}>
                                {
                                    setRole()
                                }
                            </Input>
                        </div>
                        <div className="form-group d-flex mb-0 rolepp" style={{ width: '29%' }}>
                            <Label className="col-form-label col-md-6  ml-2 text-right">Design Type</Label>
                            <Input type="select" name="OrderCName" className="states order-alpha form-control state col-md-6" parentid="#" subid="#" id="" onChange={(e) => {
                                const atype_id = e.target.options[e.target.selectedIndex].getAttribute("typeid")
                                setTypeId(atype_id)
                                getDesignGroups_ByRole(atype_id, 0)
                            }}>
                                {
                                    setProductTypes()
                                }
                            </Input>
                        </div>
                        <div className="form-group d-flex mb-0 rolepp" style={{ width: '24%' }}>
                            <Label className="col-form-label col-md-6 ml-1 text-right">Design Group</Label>
                            <Input type="select" name="OrderCName" className="states order-alpha form-control state col-md-6" parentid="#" subid="#" id="rpc_profeat" onChange={(e) => {
                                const agroup_Id = e.target.options[e.target.selectedIndex].getAttribute("groupid")
                                setGroupId(agroup_Id)
                                getDesignFeatures_ByRole(agroup_Id, 0, 0)
                            }}>
                                {
                                    setProductGroups()
                                }
                            </Input>
                        </div>
                        <div style={{ width: '10%', float: 'left', textAlign: 'left', marginLeft: '3.5rem' }}>
                            <Button color='primary' onClick={SaveRoleDesignAccess} className="btn" style={{ width: 'auto', position: '', right: '16px', top: '6px', float: 'left', marginLeft: '2rem', padding: '10px' }}>
                                Save
                            </Button>
                        </div>
                    </div>
                </Col>

                <DataTable
                    id="roleAccessDt"
                    noHeader
                    className='react-dataTable'
                    columns={ColumnRoleDesign}
                    data={featuresData}
                />
            </Card>
            <R_Loader loaderRef={loaderRef} />
        </Fragment>
    )
}

export default memo(DataRoleAccessTable)
