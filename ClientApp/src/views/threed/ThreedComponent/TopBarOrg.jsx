import { useState, useContext, createContext } from "react"
import {
    Row,
    Col,
    Input,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ButtonGroup
} from "reactstrap"
import { List, Grid } from 'react-feather'
import ThreeD_Design from "./popup/ThreeD_Design"
import { AbilityContext } from '@src/utility/context/Can'
import { SaveConfigToArr, rmAllSaveConfig, SetAll } from './ImgGrid'
import axios from 'axios'
import classnames from 'classnames'
import { Dropdown } from "primereact/dropdown"
import { object } from "prop-types"
import MultiSelectProduct from "./MultiselectProduct"
import { imgData } from "./data"
//!Top-Left
const LeftTop = ({ pageRest, forceRerender, ability, PrOrList, applicationref, modelsref,
    productsref, orgidref, showTdsConfiguration, multiSlectReset, setsaastoken, setCredit, setused_credit, saasapi }) => {
    const orgtype = JSON.parse(localStorage.userData).org_type
    const updateorgcredit = async (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex]
        const Org_email = selectedOption.getAttribute('email')
        const orgid = e.target.value
        const issaasuser = await axios.get(`./Organization/GetUserType?OrganisationId=${orgid}`)
        if (issaasuser.data !== "0") {
            try {
                const saasobj = {
                    email: Org_email,
                    organisation_id: String(orgid)
                }
                const getsaastoken = await axios.post(`${saasapi}get-token`, saasobj, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                console.log(getsaastoken.data.api_token)
                if (getsaastoken.data.api_token) {
                    setsaastoken(getsaastoken.data.api_token)
                    saasobj.api_token = getsaastoken.data.api_token
                    const getcredits = await axios.post(`${saasapi}check-subscription`, saasobj, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    if (getcredits.data !== null) {
                        setused_credit(getcredits.data.total_model)
                        setCredit(getcredits.data.used_model)
                    }
                } else {
                    setsaastoken(null)
                    setused_credit(0)
                    setCredit(0)
                }
            } catch (error) {
                console.error("Error fetching SaaS token:", error)
                setsaastoken(null)
                setused_credit(0)
                setCredit(0)
            }
        } else {
            setsaastoken(null)
            setused_credit(0)
            setCredit(0)
        }

    }
    return (
        <Col className="col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex pr-0  col ">
            {ability.can('Display', '3DImages') && <> <form class="form-inline flex-wrap select col-md-3 col-sm-12 pl-0 pr-50"> <span className="float-left mr-1">Orgnization</span>
                <select
                    id="collection3DLibrary"
                    className="form-control float-left mr-1"
                    ref={orgidref}
                    onChange={(e) => {
                        updateorgcredit(e)
                        pageRest()
                        forceRerender()
                    }}
                >
                    {
                        PrOrList?.OrgList && PrOrList?.OrgList.map((e, k) => {
                            //organization_Name  //PrOrList.OrgList[e]
                            return <option email={e.email} value={e.organisation_id}>{e.organization_Name}</option>

                        })}
                </select>
            </form> </>
            }
            <form class="form-inline flex-wrap select col-md-3 col-sm-12 pl-0 pr-50">
                <span className="float-left mr-1">Application</span>
                <select
                    id="collection3DLibrary"
                    className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                    onChange={showTdsConfiguration}
                    ref={applicationref}
                >
                    <option
                        index="0"
                    >
                        Archive
                    </option>
                    <option
                        index="1"
                    >
                        Q3d
                    </option>
                </select>
            </form>
            <form class="form-inline flex-wrap select col-md-3 col-sm-12 pl-0 pr-50">
                <span className="float-left mr-1">Models</span>
                <select
                    id="collection3DLibrary"
                    className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                    onChange={() => {
                        pageRest()
                        forceRerender()
                    }}
                    ref={modelsref}
                >
                    <option
                        index="0"
                        value="0"
                    >
                        All
                    </option>
                    <option
                        index="1"
                        value="1"
                    >
                        Used
                    </option>
                    <option
                        index="2"
                        value="2"
                    >
                        NotUsed
                    </option>
                    <option
                        index="3"
                        value="3"
                    >
                        Exclusive
                    </option>
                    {orgtype !== 3 && <option
                        index="4"
                        value="4"
                    >
                        TryOn
                    </option>
                    }
                </select>
            </form>

            <form class="form-inline flex-wrap select col-md-3 col-sm-12 pl-0 pr-50 flex-column align-items-start">
                <span className="float-left mr-1" style={{ marginBottom: "0.4rem" }}>Product</span>
                {/* <div className="col-md-2 col-lg-2 col-sm-4 float-left pl-0 product_threed">  */}
                {PrOrList?.ProductList && <MultiSelectProduct multiSlectReset={multiSlectReset} PrOrList={PrOrList}
                    productsref={productsref} forceRerender={forceRerender} pageRest={pageRest}
                />}

            </form>
        </Col>
    )
}

//!Top Right
const TopRight = ({ modal, toggle, ability, PrOrList, forceRerender, newselctionref, showTdsConfiguration, applicationref, productsref, orgidref, txtsearchref, designameref, saastoken, setCredit, saasapi }) => {

    const Swal = require('sweetalert2')
    //const [count, setcount] = useState(0)
    const onSaveConfiguration = async (e) => {
        const SaveQ3dProductConfiguration = []
        const configuredId = []
        const UnconfiguredId = []
        const configuredProductRequest = {
            ids: configuredId
        }
        const unconfiguredProductRequest = {
            ids: UnconfiguredId
        }
        //Method for SaveProductOrder
        const SaveProductConfiguration = async (SaveQ3dProductConfiguration) => {
            await axios.post('./ThreeD/SaveQ3dProductConfiguration', SaveQ3dProductConfiguration)
                .then(async function (response) {
                    const data = await JSON.parse(response.data)
                    if (data.value === true) {
                        await Swal.fire({
                            icon: 'success',
                            title: '<b>Model Configuration</b>',
                            text: 'Q3d Product Ordering configured Successfully!!',
                            allowOutsideClick: false,
                            backdrop: true
                        })
                    } else {
                        await Swal.fire({
                            icon: 'success',
                            title: '<b>Model Configuration</b>',
                            text: 'Q3d Product Ordering configured Successfully!!',
                            allowOutsideClick: false,
                            backdrop: true
                        })
                    }
                })
            forceRerender()
        }
        //Method for get recently configured products  
        const GetConfiguredOrgProducts = async (configuredProductRequest) => {
            await axios.post('./ThreeD/GetOrgProducts', configuredProductRequest)
                .then(async function (response) {
                    const pdata = await JSON.parse(response.data)
                    for (let i = 0; i < pdata.length; i++) {
                        const product_name = pdata[i]
                        const SaveProductConfig = new Object({
                            state: 0,
                            q3d_organisation_id: JSON.parse(localStorage.userData) ? JSON.parse(localStorage.userData).organisationId : 0,
                            q3d_product_name: product_name,
                            q3d_order_no: 0
                        })
                        SaveQ3dProductConfiguration.push(SaveProductConfig)
                    }
                })
        }
        //Method for get recently Unconfigured products      
        const GetUnConfiguredOrgProducts = async (unconfiguredProductRequest) => {
            await axios.post('./ThreeD/GetOrgProducts', unconfiguredProductRequest)
                .then(async function (response) {
                    const pdata = await JSON.parse(response.data)
                    for (let i = 0; i < pdata.length; i++) {
                        const product_name = pdata[i]
                        const obj = {
                            OrganisationId: JSON.parse(localStorage.profile)?.org_id ? JSON.parse(localStorage.profile).org_id : 0,
                            Application: applicationref.current?.value,
                            ModelState: 1,
                            Product: pdata[i],
                            Textsearch: txtsearchref.current ? txtsearchref.current.value : false,
                            DesignName: designameref.current?.value
                        }
                        await axios.post(`./ThreeD/ConfigureTdImageSearchByOrgId`, obj).then(res => {
                            const tempresult = JSON.parse(res.data)
                            const count = tempresult.totalRecords
                            if (count <= 1) {
                                const SaveProductConfig = new Object({
                                    state: 3,
                                    q3d_organisation_id: JSON.parse(localStorage.userData) ? JSON.parse(localStorage.userData).organisationId : 0,
                                    q3d_product_name: product_name
                                })
                                SaveQ3dProductConfiguration.push(SaveProductConfig)
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: '<b>Model Configuration</b>',
                                    text: 'Q3d Product Ordering configured Successfully!!',
                                    allowOutsideClick: false,
                                    backdrop: true
                                })
                            }
                        })
                    }
                })
        }

        const GetProducts = async () => {
            if (configuredId.length > 0) {
                await GetConfiguredOrgProducts(configuredProductRequest)
            }
            if (UnconfiguredId.length > 0) {
                await GetUnConfiguredOrgProducts(unconfiguredProductRequest)
            }
            if (SaveQ3dProductConfiguration.length > 0) {
                SaveProductConfiguration(SaveQ3dProductConfiguration)
            }
        }

        if (newselctionref.current.innerHTML === "[selection 0]" && SaveConfigToArr().length < 1) {
            Swal.fire(
                ' please select 3D Image'
            )
        } else {
            //e.preventDefault() 
            const selection = document.getElementById('collection3DLibrary').value
            //let msg = ""

            switch (selection) {
                case 'Q3d':

                    const _RootTdShowroomConfiguration = new Object()
                    _RootTdShowroomConfiguration.td_Showroom_Configurations = SaveConfigToArr()
                    await axios.post(`./ThreeD/SavehowroomImageConfiguration`, _RootTdShowroomConfiguration)
                        .then(async response => {
                            const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                            const message = response.data === null ? null : JSON.parse(response.data).message
                            const count = _RootTdShowroomConfiguration.td_Showroom_Configurations.reduce((sum, item) => {
                                if (item.td_Order_No === 1 && item.state === 0) {
                                    return sum + (item.Td_Credit || 0) // add td_Credit if exists
                                }
                                return sum
                            }, 0)
                            if (Isave === true) {
                                Swal.fire({
                                    icon: 'success',
                                    title: '<b>Configuration</b>',
                                    text: 'Model Confgured Successfully!!',
                                    allowOutsideClick: false,
                                    backdrop: true
                                })
                                try {
                                    if (JSON.parse(localStorage.profile).user_type !== 0 && saastoken !== null && count > 0) {
                                        const saasobj = {
                                            organisation_id: String(JSON.parse(localStorage.profile).org_id), //"1339637714",
                                            activity: "Select3DImage",
                                            deduct_credit: count,
                                            api_token: saastoken
                                        }
                                        if (JSON.parse(localStorage.profile).user_type === 1) {
                                            saasobj.email = JSON.parse(localStorage.profile).org_email
                                        } else {
                                            saasobj.email = JSON.parse(localStorage.profile).login_id
                                        }
                                        const deductcredit = await axios.post(`${saasapi}deduct-credit`, saasobj, {
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        })
                                        setCredit(deductcredit.data.used_model)
                                    }
                                } catch (error) {
                                    console.error("Error fetching SaaS token:", error)
                                }

                            }
                            if (Isave === false) {
                                Swal.fire({
                                    icon: 'error',
                                    title: '<b>Configuration</b>',
                                    text: 'Model configuration Failed !!',
                                    allowOutsideClick: false,
                                    backdrop: true
                                })
                            }
                            if (productsref.current.value === "All") {
                                _RootTdShowroomConfiguration?.td_Showroom_Configurations.forEach((e) => {
                                    if (e.state === 0) {
                                        configuredId.push(e.td_Three_DImage_Id)
                                    } else {
                                        UnconfiguredId.push(e.td_Three_DImage_Id)
                                    }
                                })
                                GetProducts()
                            }

                            if (productsref.current.value !== "All" && message === "Added") {
                                const SaveProductConfig = {
                                    state: 0,
                                    q3d_organisation_id: JSON.parse(localStorage.userData) ? JSON.parse(localStorage.userData).organisationId : 0,
                                    q3d_product_name: productsref.current?.value ? productsref.current.value.replace(/,/g, '') : "",
                                    q3d_order_no: 0
                                }
                                SaveQ3dProductConfiguration.push(SaveProductConfig)
                                SaveProductConfiguration(SaveQ3dProductConfiguration)
                            }

                            if (productsref.current.value !== "All" && message === "Deleted") {
                                const obj1 = {
                                    OrganisationId: JSON.parse(localStorage.profile)?.org_id ? JSON.parse(localStorage.profile).org_id : 0,
                                    Application: applicationref.current?.value,
                                    ModelState: 1,
                                    Product: productsref.current?.value ? productsref.current.value.replace(/,/g, '') : "",
                                    Textsearch: txtsearchref.current ? txtsearchref.current.value : false,
                                    DesignName: designameref.current?.value
                                }
                                axios.post(`./ThreeD/ConfigureTdImageSearchByOrgId`, obj1).then(res => {
                                    const tempresult = JSON.parse(res.data)
                                    const count = tempresult.totalRecords
                                    if (count <= 1) {
                                        const SaveProductConfig = {
                                            state: 3,
                                            q3d_organisation_id: JSON.parse(localStorage.userData) ? JSON.parse(localStorage.userData).organisationId : 0,
                                            q3d_product_name: productsref.current?.value ? productsref.current.value.replace(/,/g, '') : ""
                                        }
                                        SaveQ3dProductConfiguration.push(SaveProductConfig)
                                        SaveProductConfiguration(SaveQ3dProductConfiguration)
                                    } else {
                                        Swal.fire({
                                            icon: 'success',
                                            title: '<b>Model Configuration</b>',
                                            text: 'Q3d Product Ordering configured Successfully!!',
                                            allowOutsideClick: false,
                                            backdrop: true
                                        })
                                    }
                                })
                            }
                            //}
                            forceRerender()
                            rmAllSaveConfig()
                            newselctionref.current?.setAttribute('count', 0)
                            newselctionref.current.textContent = `[selection 0]`
                            const obj = new Object()
                            obj.page = 0
                            obj.perPage = 7
                            dispatch(getData(obj))
                            setis_open(false)
                        })
                        .then(() => {

                        })
                        .catch(err => console.log(err))
                    break

                // default:
                case 'Archive':
                    const _RootTdQvImageConfiguration = new Object()
                    _RootTdQvImageConfiguration.td_Qv_Image_Configurations = SaveConfigToArr()
                    await axios.post(`./ThreeD/SaveFullViewImageConfiguration`, _RootTdQvImageConfiguration)
                        .then(async response => {

                            const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                            const count = _RootTdQvImageConfiguration.td_Qv_Image_Configurations.reduce((sum, item) => {
                                if (item.td_Order_No === 1 && item.state === 0) {
                                    return sum + (item.Td_Credit || 0) // add td_Credit if exists
                                }
                                return sum
                            }, 0)
                            if (Isave === true) {
                                Swal.fire({
                                    icon: 'success',
                                    title: '<b>Configuration</b>',
                                    text: 'Model Confgured Successfully!!',
                                    allowOutsideClick: false,
                                    backdrop: true
                                })

                                try {
                                    if (JSON.parse(localStorage.profile).user_type !== 0 && saastoken !== null && count > 0) {
                                        const saasobj = {
                                            organisation_id: String(JSON.parse(localStorage.profile).org_id), //"1339637714",
                                            activity: "Select3DImage",
                                            deduct_credit: count,
                                            api_token: saastoken
                                        }
                                        if (JSON.parse(localStorage.profile).user_type === 1) {
                                            saasobj.email = JSON.parse(localStorage.profile).org_email
                                        } else {
                                            saasobj.email = JSON.parse(localStorage.profile).login_id
                                        }
                                        const deductcredit = await axios.post(`${saasapi}deduct-credit`, saasobj, {
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        })
                                        setCredit(deductcredit.data.used_model)

                                    }
                                } catch (error) {
                                    console.error("Error fetching SaaS token:", error)
                                }
                            }
                            if (Isave === false) {
                                Swal.fire({
                                    icon: 'error',
                                    title: '<b>Configuration</b>',
                                    text: 'Model configuration Failed !!',
                                    allowOutsideClick: false,
                                    backdrop: true
                                })
                            }
                            forceRerender()
                            rmAllSaveConfig()
                            newselctionref.current?.setAttribute('count', 0)
                            newselctionref.current.textContent = `[selection 0]`
                            const obj = new Object()
                            obj.page = 0
                            obj.perPage = 7
                            dispatch(getData(obj))

                            setis_open(false)
                        })

                        .then(() => {

                        })
                        .catch(err => console.log(err))
                    break
            }
        }
        return

        const _RoleAssignment = new Object()
        _RoleAssignment.user_Id = document.getElementById('CAC_custName').getAttribute('uid')

        _RoleAssignment.is_Role_Admin = true
        _RoleAssignment.role_assignment_id = document.getElementById('CAC_custName').getAttribute('raid') === null ? 0 : document.getElementById('CAC_custName').getAttribute('raid')
        const selectedRoleID = document.getElementById('CAC_accessRole').selectedOptions[0].getAttribute('roleid')
        if (Number(selectedRoleID) === 0) {
            _RoleAssignment.state = 3
        } else {
            _RoleAssignment.state = document.getElementById('CAC_custName').getAttribute('raid') === null ? 0 : 2
        }
        _RoleAssignment.role_Id = selectedRoleID
        //dispatch(addCustUser(custuser))
        axios.post(`./Role/SaveRoleAssignments`, _RoleAssignment)

            .then(response => {

                const Isave = response.data === null ? null : JSON.parse(response.data).isSave
                if (Isave !== null && Isave !== false) {
                    //const custuser = new Object()
                    // custuser.customer_Id = response.data.req.org_type_id
                    // dispatch(getCustomerUsers(custuser))
                    //dispatch(getData())
                    const obj = new Object()
                    obj.page = 0
                    obj.perPage = 7
                    // dispatch(getData(obj))

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
    }

    const [Del, setDel] = useState(false)
    const deltoggle = () => setDel(!Del)
    const [Ddata, setData] = useState(null)
    return (
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 pr-0" >
            <div className="text-lg-right d-lg-flex" style={{ justifyContent: "right", float: "right" }}>
                <ThreeD_Design PrOrList={PrOrList} modal={modal} toggle={toggle} forceRerender={forceRerender} topbarstate={true} headername="Add 3D Images" subheadername="Add and Upload 3D Images"
                    applicationref={applicationref} showTdsConfiguration={showTdsConfiguration} />
                {/* 3d Images part disabled here*/}
                {ability.can('configure', '3DImages') && <Button className="btn btn-sm btn-success mr-1"
                    onClick={() => {
                        onSaveConfiguration()
                    }}
                >
                    Save Configuration
                </Button>}

                {ability.can('Display', '3DImages') && <Button
                    type="button"
                    id="add_designBTN"
                    className="btn btn-sm btn-success"
                    onClick={toggle}
                > Add 3D Images
                </Button>}

            </div>
        </div>
    )
}

//!LeftTopDown
const InputSearchCombo = (props) => {
    return (
        <>
            <div
                style={{ display: 'block', position: 'relative', float: 'right' }}>
                <InputGroup className='col-12' style={{ marginLeft: "4px" }} >
                    <div class="input-icons" style={{ position: 'relative' }}>
                        <Input value={props.tempsearchValue} placeholder="search" className='rounded-left' style={{ borderRadius: '0' }}
                            type='text'
                            onChange={(e) => {
                                props.setTempSearchValue(e.target.value)
                                props.designameref.current = { value: e.target.value }
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    props.txtsearchref.current = { value: true }
                                    props.pageRest()
                                    props.forceRerender()
                                }
                            }}
                        >

                        </Input>
                        <i className="fa fa-times" aria-hidden="true" role='button'
                            onClick={() => {
                                if (props.tempsearchValue !== '') {
                                    props.setTempSearchValue('')
                                    props.designameref.current = { value: '' }
                                    props.txtsearchref.current = { value: false }
                                    props.pageRest()
                                    props.forceRerender()
                                }
                            }}
                            style={{ position: 'absolute', right: '1rem', top: '0.875rem' }}></i>
                    </div>
                    <InputGroupAddon addonType="append" className='position-relative'>
                        <InputGroupText className="bg-primary text-white" role="button"
                            onClick={() => {
                                props.txtsearchref.current = { value: true }
                                props.pageRest()
                                props.forceRerender()
                            }}
                        >Search

                        </InputGroupText>
                        <Button className="btn btn-sm btn-default ml-50 mr-50" onClick={() => {
                            props.applicationref.current.value = "Archive"
                            props.showTdsConfiguration()
                        }}
                        >
                            Reset
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </>
    )
}

//!TopBar
const TopBarOrg = (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const ability = useContext(AbilityContext)
    const showTdsConfiguration = (e) => {
        props.modelsref.current.value = 0
        props.txtsearchref.current = { value: false }
        props.newselctionref.current?.setAttribute('count', 0)
        props.newselctionref.current.textContent = `[selection 0]`
        if (props.tempsearchValue !== '') {
            props.setTempSearchValue('')
            props.designameref.current = { value: '' }
            props.txtsearchref.current = { value: false }
        }
        pageRest()
        rmAllSaveConfig()
        props.setmultiSlectReset(prv => !prv)
        props.setimgData([])
        props.forceRerender()
    }
    const pageRest = () => {
        props.pagestartref.current = 0
        props.pagendref.current = 25
    }
    const SearchToggleComponent = (props) => {
        return (
            <>
                <div >
                    { /* className="collapse" */}
                    <div id=""  >
                        <div className="AdvanceSearch">
                            <Col className="col-md-4 col-lg-2 flip mb-8 mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}>
                                <select
                                    id="Season"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="0"
                                >
                                    <option className="filter_data">Season</option>
                                </select>
                            </Col>

                            <div className="col-md-4 col-lg-2 flip mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}>
                                <select
                                    id="Color"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="1"
                                >
                                    <option className="filter_data">Color</option>
                                </select>
                            </div>
                            <div
                                className="col-md-4 col-lg-2 flip mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}
                            >
                                <select
                                    id="Pattern"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="2"
                                >
                                    <option className="filter_data">Pattern</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-lg-2 flip mb-1" style={{ paddingLeft: "4px", paddingRight: "4px", float: "left" }}>
                                <select
                                    id="Weave"
                                    type="text"
                                    className="_featureTypeSearch form-control"
                                    selectcss="3"
                                >
                                    <option className="filter_data">Weave</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-lg-2 d-flex">
                                <button
                                    type="button"
                                    id="AdvanceSearchBtn"
                                    className="btn btn-xs btn-primary waves-effect waves-light mb-2"
                                >
                                    Search</button
                                ><button
                                    type="button"
                                    id="ResetBtn"
                                    className="btn btn-xs btn-primary waves-effect waves-light mb-2" style={{ marginLeft: "4px" }}                                    >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }

    return (
        <>
            <Card className="contain1">
                <div className="col-xl-12">
                    <CardHeader className='border-bottom'>
                        <div className="d-flex">
                            <CardTitle tag='h4' className='d-flex justify-content-start'>3D Images</CardTitle>
                            {/* {props.saastoken !== null && props.saastoken !== undefined && */}
                            <div className='creditwallet'>
                                {props.saastoken !== null && props.saastoken !== undefined && <div className='wallet_title'>Credit Balance</div>}
                                <div className='d-flex'>
                                    {props.saastoken !== null && props.saastoken !== undefined && <div className='credit_balance'><span>{props.credit}</span> / <span>{props.used_credit}</span> <small> Credits</small> </div>}
                                    <div className='New_Selection' ><span count={0} ref={props.newselctionref} >[selection 0]</span> </div>
                                </div>
                            </div>
                            {/* } */}
                        </div>
                        <TopRight PrOrList={props.PrOrList} modal={modal} toggle={toggle} ability={ability} forceRerender={props.forceRerender}
                            newselctionref={props.newselctionref} pageRest={pageRest} txtsearchref={props.txtsearchref} setimgData={props.setimgData}
                            modelsref={props.modelsref} productsref={props.productsref} applicationref={props.applicationref} setCredit={props.setCredit}
                            designameref={props.designameref} showTdsConfiguration={showTdsConfiguration} orgidref={props.orgidref} saastoken={props.saastoken}
                            saasapi={props.saasapi}
                        />

                    </CardHeader>
                </div>
                <CardBody >
                    <Row className="mb-0">
                        <LeftTop pageRest={pageRest} forceRerender={props.forceRerender} txtsearchref={props.txtsearchref}
                            setimgData={props.setimgData} PrOrList={props.PrOrList} ability={ability}
                            applicationref={props.applicationref} modelsref={props.modelsref} productsref={props.productsref}
                            orgidref={props.orgidref} pagestartref={props.pagestartref} pagendref={props.pagendref}
                            newselctionref={props.newselctionref} showTdsConfiguration={showTdsConfiguration}
                            multiSlectReset={props.multiSlectReset} setsaastoken={props.setsaastoken} setCredit={props.setCredit}
                            setused_credit={props.setused_credit} saasapi={props.saasapi}
                        />

                        <div className="col-xl-6 col-xl-6 col-md-12  col-sm-12 d-lg-flex justify-content-end pl-0" style={{ marginTop: "25px" }}>
                            <InputSearchCombo pageRest={pageRest} designameref={props.designameref} tempsearchValue={props.tempsearchValue}
                                setTempSearchValue={props.setTempSearchValue} txtsearchref={props.txtsearchref} forceRerender={props.forceRerender}
                                applicationref={props.applicationref} showTdsConfiguration={showTdsConfiguration} />
                            <div className="ml-0 text-lg-right">
                                <div style={{ float: "right", padding: "4px" }}> Total {props.count}</div>
                                <ButtonGroup className='btn-group-toggle'>
                                    <Button
                                        tag='label'
                                        className={classnames('btn-icon view-btn grid-view-btn border-0', {
                                            active: props.activeView === 'grid'
                                        })}
                                        color='primary'
                                        outline
                                        onClick={() => props.setActiveView('grid')}
                                    >
                                        <Grid size={16} />
                                    </Button>
                                    <Button
                                        tag='label'
                                        className={classnames('btn-icon view-btn list-view-btn', {
                                            active: props.activeView === 'list'
                                        })}
                                        color='primary'
                                        outline
                                        onClick={() => props.setActiveView('list')}
                                    >
                                        <List size={16} />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}

export default TopBarOrg
