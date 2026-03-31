// ** React Imports
import { Fragment, useEffect, useState, useRef } from 'react'
import TopBar, { searchHandel } from './DesignComponent/TopBar'
import ImgGrid from './DesignComponent/ImgGrid'
import { selection } from "./DesignComponent/Utility/selection"

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import './../../customStyles/archivestyle.css'
import './../../customStyles/selectmenu.css'
import axios from 'axios'
import { string } from 'prop-types'

const style = {
    margin: '0px 0px 0px 10px'
}

const pstyle = {
    margin: '0px 0px 15px 0px'
}
const filterlist = (Data) => {
    if (Data === null || Data === undefined || Data instanceof Error) {
        return []
    }

    const getList = {}
    Data.supplierListDto.forEach((e) => {
        getList[e.sup_code] = e.sup_name
    })
    return getList
}

let exportsetState = null
let exportState = null
export const getState = () => [exportState, exportsetState]

const Design = () => {
    const [ImgViewToggle, setImgViewToggle] = useState(true)
    const [designList, setDesignList] = useState({})
    const [reRender, setreRender] = useState(false)
    const [myColour, setmyColour] = useState(null)
    const [activeView, setActiveView] = useState('grid')
    exportsetState = setreRender
    exportState = reRender
    const suplist = []
    const callme = async () => {
        suplist[0] = await axios.get("./Design/GetSupplierList")
    }
    const [splist, setsplist] = useState(null)
    const [sprollist, test] = useState(null)
    const [tempsearchValue, setTempSearchValue] = useState('')
    const [selectedPage, setSelectedPage] = useState(0)
    const pagestartref = useRef(0)
    const pagendref = useRef(15)
    const orderbyref = useRef("Name")
    const orderbycountref = useRef(15)
    const designcount = selection.selected2.length
    const [select, setSelect] = useState(false)
    const supplierref = useRef(null)
    const loaderRef = useRef(null)
    const [Q3drenderpluginURL, setQ3drenderpluginURL] = useState('')
    const [saasapi, getsaasapi] = useState("")
    const [products, setproduct] = useState([])
    const [isLoading, setLoading] = useState(true)
    const singlerepeat = useRef(false)
    const [credit, setcredit] = useState(0)
    const [remaning_credit, setremaning_credit] = useState(0)
    const [saastoken, setsaastoken] = useState(null)
    const [used_credit, setused_credit] = useState(0)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    // const [access, setaccess] = useState(null)
    const access = useRef(null)
    const obj = {
        OrgannisationId: 0,
        Start: 0,
        End: 10
    }
    const saasobj = {
        organisation_id: String(JSON.parse(localStorage.profile).org_id)
    }
    if (JSON.parse(localStorage.profile).user_type === 1) {
        saasobj.email = JSON.parse(localStorage.profile).org_email
    } else {
        saasobj.email = JSON.parse(localStorage.profile).login_id
    }

    const FilterData = (data) => {

        const b = {}
        data.forEach((e) => {
            const f = {}
            e.getOperationIdOperationNameRoleTaskIdResponseDtos.forEach((t) => {
                f[t.operation_Id] = true

            })
            b[e.task_Id] = f
        })
        return b
    }
    const unsavedesigns = []
    useEffect(async () => {
        const myColour = await axios.get("./Design/LoadJson") //ToDo:
        const supplierList = await axios.post("./Supplier/Suppliers", obj)
        test((supplierList && (supplierList.data.supplierListDto ? supplierList.data.supplierListDto : null)))
        setsplist(filterlist(supplierList && (supplierList.data ? supplierList.data : null)))
        setLoading(false)
        localStorage.setItem("suppliers", JSON.stringify(supplierList.data.supplierListDto))
        selection.reMoveAll()
        setmyColour(myColour)
        const qurl = window.location.origin
        if (JSON.parse(localStorage.profile).org_type === 3 || JSON.parse(localStorage.profile).org_type === 1) {
            const RoleId = JSON.parse(localStorage.suppliers)[0].roleid
            const accessResponse = await axios.get(`./Design/RoleAccessToElement?RoleId=${RoleId}`)
            const ft = FilterData(JSON.parse(accessResponse.data).allDetails)
            localStorage.setItem("access", JSON.stringify(ft))
            // setaccess(ft)
            access.current = ft
        } else {
            const accessResponse = await axios.get(`./Design/RoleAccessToElement`)
            const ft = FilterData(JSON.parse(accessResponse.data).allDetails)
            localStorage.setItem("access", JSON.stringify(ft))
            // setaccess(ft) 
            access.current = ft
        }
        axios.get(`./Login/Q3durl?Url=${qurl}`).then(e => {
            selection.Q3dURL = e.data ? e.data : `http://CheckAppSeeting`
        }).catch(e => {
            selection.Q3dURL = `http://CheckAppSeeting`
        })
        axios.get('./Login/Q3drenderpluginURL').then(e => {
            setQ3drenderpluginURL(e.data ? e.data : `http://CheckAppSeeting`)
            localStorage.setItem('Q3drenderpluginURL', e.data)
        }).catch(e => {
            Q3drenderpluginURL = `http://CheckAppSeeting`
        })
        // axios.get('./Login/getsaasapi').then(e => {
        //     getsaasapi(e.data ? e.data : `http://CheckAppSeeting`)
        //     localStorage.setItem('saasapi', e.data)
        // }).catch(e => {
        //     saasapi = `http://CheckAppSeeting`
        // })
        await axios.get("./Design/GetConfiguredProducts").then(e => {
            setproduct(JSON.parse(e.data))
            localStorage.setItem('products', e.data)
        }).catch(e => {
        })
        //selection.designInfo = designList.designMaster
        //ToDo :- axios call --
        return () => {
            selection.reMoveAll()
            setsplist(null)
        }
    }, [])
    useEffect(async () => {
        selection.designInfo = designList.designMaster
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const getsaastoken = await axios.post("https://sas.textronic.online/api/get-token",
                let saasApiUrl = "http://CheckAppSeeting"
                try {
                    const res = await axios.get("./Login/Getsaasapi")
                    if (res?.data) {
                        saasApiUrl = res.data
                        localStorage.setItem("saasapi", res.data)
                    }
                } catch (err) {
                    console.error("Error fetching SaaS API URL:", err)
                }

                // optional: update state if you have one
                getsaasapi(saasApiUrl)
                const getsaastoken = await axios.post(`${saasApiUrl}get-token`,
                    saasobj,
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )

                console.log(getsaastoken.data.api_token)

                if (getsaastoken.data.api_token) {
                    setsaastoken(getsaastoken.data.api_token)
                    saasobj.api_token = getsaastoken.data.api_token

                    const getcredits = await axios.post(
                        `${saasApiUrl}check-subscription`,
                        saasobj,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    )

                    if (getcredits.data !== null) {
                        setcredit(getcredits.data.total_fabric_upload)
                        setused_credit(getcredits.data.used_fabric_upload)
                        setremaning_credit(getcredits.data.remaining_credits)
                    }
                } else {
                    setsaastoken(null)
                }
            } catch (error) {
                console.error("Error fetching SaaS token:", error)
                setsaastoken(null)
            }
        }
        if (JSON.parse(localStorage.profile).user_type !== 0) {
            fetchData()
        }
    }, [modal]) // runs on mount + whenever `modal` state changes

    const toSetSelectedAll = (isSelectAll) => {
        if (!select) {
            selection.setSelectAll(!select, designList)
        } else {
            selection.reMoveAll()
            selection.hideSelectedAll()
        }
    }

    if (isLoading) {
        return <div className="App">
            <div className="text-center">
                <h2 style={{ fontFamily: "Montserrat", color: "black", padding: "15%", textAlign: "center" }}>Please Wait, Loading Designs...</h2>
            </div>
        </div>
    }

    return (
        <Fragment>
            <div className="mobile_group_show">
                <button type="button" id="upload_design_btn" className="btn btn-sm btn-primary waves-effect waves-light">
                    <i className="fas fa-upload mr-50" >  </i>Upload Design
                </button>
            </div>
            <div className='main-design-div'>
                <TopBar className='season_upload_hide' sprollist={sprollist} splist={splist} myColour={myColour && myColour.data} ImgViewToggle={ImgViewToggle} setImgViewToggle={setImgViewToggle}
                    setDesignList={setDesignList} designList={designList} reRender={reRender} setreRender={setreRender} activeView={activeView} setActiveView={setActiveView}
                    tempsearchValue={tempsearchValue} setTempSearchValue={setTempSearchValue} pagestartref={pagestartref} pagendref={pagendref} setSelectedPage={setSelectedPage} selectedPage={selectedPage}
                    designcount={designcount} orderbyref={orderbyref} orderbycountref={orderbycountref} supplierref={supplierref} loaderRef={loaderRef}
                    Q3drenderpluginURL={Q3drenderpluginURL} products={products} unsavedesigns={unsavedesigns} access={access} singlerepeat={singlerepeat}
                    saastoken={saastoken} credit={credit} usedcredit={used_credit} setused_credit={setused_credit} remaning_credit={remaning_credit} setremaning_credit={setremaning_credit}
                    modal={modal} setModal={setModal} toggle={toggle} saasapi={saasapi}
                />
                <ImgGrid ImgViewToggle={ImgViewToggle} setImgViewToggle={setImgViewToggle} setDesignList={setDesignList} designList={designList} reRender={reRender} setreRender={setreRender}
                    activeView={activeView} setActiveView={setActiveView} tempsearchValue={tempsearchValue} pagestartref={pagestartref} pagendref={pagendref} selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage} toSetSelectedAll={toSetSelectedAll} orderbyref={orderbyref} orderbycountref={orderbycountref} supplierref={supplierref}
                    Q3drenderpluginURL={Q3drenderpluginURL} products={products} loaderRef={loaderRef} select={select} setSelect={setSelect} access={access} />
            </div>
        </Fragment>
    )
}

export default Design
