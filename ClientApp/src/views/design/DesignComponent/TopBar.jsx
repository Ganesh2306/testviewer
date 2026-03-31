import { useState, useContext, useEffect, useRef } from "react"
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
    DropdownToggle,
    DropdownMenu,
    InputGroup,
    InputGroupAddon,
    DropdownItem,
    UncontrolledDropdown,
    ButtonGroup,
    CustomInput
} from "reactstrap"
import { MoreVertical, List, Grid } from 'react-feather'
import { QrPopUp } from './popup/DeletePopUp'
// import { UploadSareePopup } from "./popup/UploadSareePopup"
import { UploadSaree } from "./popup/UploadSaree"
import OpenExportExcel from './ExcelComponent/ExportExcel'
import AddDesign from "./popup/AddDesign"
import AddtoCollection from "../../seasonal/tables/tableData/AddtoCollection"
import { AbilityContext } from '@src/utility/context/Can'
import axios from "axios"
import { skipState, setSkipFt } from "./SkipCall"
import { selection } from "./Utility/selection"
import { PrintQr } from './popup/PrintQr'
import { forColour } from './popup/ContentTable'
import { R_Loader } from '../../../views/loader/loader'
import classnames from 'classnames'
import { getQRbase642 } from "./Utility/Utility"
import { DateRangePicker } from "react-date-range"
import JSZip from "jszip"
let selectedObj = {}
let getFeatureListD = null
let getDesignTypeGroup = null
const myComplexobj = {
    type: [],
    group: [],
    ft: [],
    roll: []
}

export const getFTG = () => {
    return [getFeatureListD, getFilteredData({ rollData: getDesignTypeGroup })]
}
const DateFilter = ({ fid, name, setname, setIsDateFilterVisible }) => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 })
    const inputRef = useRef(null)
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date()
    })
    const datePickerRef = useRef(null)
    setIsDateFilterVisible(true)
    const clearrange = () => {
        delete selectedObj[`dsp-${fid}`]
        setDateRange({
            startDate: new Date(),
            endDate: new Date()
        })
        setShowDatePicker(false)
    }
    function formatDateRange(startDate, endDate) {
        const format = (date) => {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        }
        return `${format(startDate)} + ${format(endDate)}`
    }
    const handleDateRangeChange = (ranges, id) => {
        const start = ranges.selection.startDate
        const end = ranges.selection.endDate
        setDateRange({
            startDate: start,
            endDate: end
        })
        const range = formatDateRange(start, end)
        selectedObj[id] = range
        setname(range)
    }
    const handleClickOutside = (event) => {
        if (
            datePickerRef.current &&
            !datePickerRef.current.contains(event.target) &&
            !inputRef.current.contains(event.target)
        ) {
            setShowDatePicker(false)
        }
    }

    const handleCalendarClose = () => {
        setShowDatePicker(!showDatePicker)
    }
    const handleDateButtonClick = () => {
        setShowDatePicker(true)
    }
    useEffect(() => {
        if (showDatePicker && inputRef.current && datePickerRef.current) {
            const inputRect = inputRef.current.getBoundingClientRect()
            const inputTop = inputRect.top + window.scrollY

            requestAnimationFrame(() => {
                const calendarRect = datePickerRef.current.getBoundingClientRect()
                const calendarWidth = 580
                let left
                const spaceOnRight = window.innerWidth - inputRect.right
                const spaceOnLeft = inputRect.left
                if (spaceOnRight >= calendarWidth) {
                    left = inputRect.left + window.scrollX
                } else if (spaceOnLeft >= calendarWidth) {
                    left = inputRect.right - calendarWidth + window.scrollX
                } else {
                    left = window.innerWidth - calendarWidth
                }
                left = Math.min(left, window.innerWidth - calendarWidth)
                setCalendarPosition({
                    top: inputTop,
                    left
                })
            })
        }
    }, [showDatePicker])

    useEffect(() => {
        if (showDatePicker) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [showDatePicker])

    return (
        <Col
            className="col-md-4 col-lg-2 flip mb-8 mb-1"
            style={{ paddingLeft: "0px", paddingRight: "4px", float: "left" }}
        >
            <div style={{ position: "relative", overflow: 'visible' }} className="datpickerCalendar">
                <input
                    ref={inputRef}
                    id={`dsp-${fid}`}
                    type="text"
                    className="_featureTypeSearch form-control"
                    style={{ cursor: "pointer" }}
                    value={name}
                    text="Date"
                    readOnly
                    onClick={handleDateButtonClick}
                />
                {showDatePicker && (
                    <div
                        ref={datePickerRef}
                        style={{
                            position: "fixed",
                            zIndex: 9999999999,
                            backgroundColor: "white",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            padding: "10px",
                            top: calendarPosition.top,
                            left: calendarPosition.left
                        }}
                    >
                        <DateRangePicker
                            onChange={(ranges) => handleDateRangeChange(ranges, `dsp-${fid}`)}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={[{ ...dateRange, key: "selection" }]}
                            direction="horizontal"
                            preventSnapRefocus={true}
                            calendarFocus="backwards"
                        />
                        <button
                            type="button"
                            role="button"
                            className="btn btn-secondary mt-2 px-3"
                            style={{ position: "relative", bottom: "-300px", zIndex: 99999 }}
                            onClick={() => {
                                clearrange()
                                setShowDatePicker(false)
                                setname("Date")
                            }}
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            role="button"
                            className="btn btn-primary mt-2 px-3"
                            style={{ position: "relative", bottom: "-300px", right: "-10px", zIndex: 99999 }}
                            onClick={handleCalendarClose}
                        >
                            OK
                        </button>
                    </div>
                )}
            </div>
        </Col>

    )
}
const Swal = require('sweetalert2')

const getFilteredData = (Data) => {
    try {
        const val = document.getElementById('collectionFabLibrary').value
        const options = val.split('-')
        let DesignTypes = null
        let designFeatures = []
        for (let i = 0; i < Data.rollData.allDesignTypesByRoles.length; i++) {
            if (`${Data.rollData.allDesignTypesByRoles[i].design_type_id}` === options[0].trim()) {
                DesignTypes = Data.rollData.allDesignTypesByRoles[i]
                for (let j = 0; j < DesignTypes.getDesignGroupsByRoleListDto.length; j++) {
                    if (`${DesignTypes.getDesignGroupsByRoleListDto[j].design_groups_id}` === options[1].trim()) {
                        designFeatures = DesignTypes.getDesignGroupsByRoleListDto[j].getDesignFeaturesByRoleListDto
                        return designFeatures
                    }
                }
            }
        }
        return designFeatures
    } catch (error) {
        return []
    }
}

let f = false
const Loop = (props) => {
    if (props.rollData !== null) {
        return (props.rollData.allDesignTypesByRoles.map((e, k) => {
            return (e.getDesignGroupsByRoleListDto.map((a, b) => {
                if (f) {
                    f = false
                }
                return (<option
                    key={k + b + 25}
                    designtypeid={e.design_type_id}
                    designgroupid={a.design_groups_id}
                    value={`${e.design_type_id} - ${a.design_groups_id}`}
                    name={`${e.design_type_name}-${a.design_groups_name}`}
                    d_conf_i={`d_conf${e.design_Configuration_Id}`}
                >
                    {`${e.design_type_name}-${a.design_groups_name}`}
                </option>)
            }))
        }))
    } else {
        return <></>
    }
}

// ps-advance search txt-textsearch  isAllSearch- all search
export const searchHandel = async (ps, txt, isAllSearch, start, end, sid, Isname) => {
    try {
        const isPtPg = document.getElementById('collectionFabLibrary').value
        if (isPtPg === undefined || isPtPg === "") {
            Swal.fire({
                icon: 'info',
                position: 'center',
                text: 'Please Assign Product Group',
                showConfirmButton: false,
                timer: 5000
            })
            return
        }
        // console.log(ps)
        const diff = end - start
        let obj = {}
        let isText1 = true
        let isAnd1 = false
        if (isAllSearch === true) {
            isText1 = false
            isAnd1 = true
        } else if (txt !== undefined || ps !== undefined) {
            isText1 = true
            isAnd1 = false
        }

        if (txt !== undefined) {
            obj = {
                folderId: "0",
                designName: txt,
                SupplierId: sid ? sid : 0,
                isText: isText1,
                isUserAdmin: false,
                createdBy: "string",
                filterSearchRequestDto: {
                    folderId: 0,
                    features: {},
                    isAnd: isAnd1
                },
                IsRating: false,
                IsName: Isname,
                start: start ? start : 0,
                end: end ? end : 15,
                Range: {},
                Iswearhouse: false,
                designstate: '',
                Difference: diff ? diff : 15,
                DesignTypeIdGroupId: document.getElementById('collectionFabLibrary').value
            }
        } else {
            const temp = {}
            const daterange = {}
            // if (isAllSearch === false) {
            if (Object.keys(selectedObj).length !== 0) {
                Object.keys(selectedObj).map((e, k) => {
                    if (document.getElementById(e) !== null) {
                        const fname = document.getElementById(e)[0] !== undefined ? document.getElementById(e)[0].text : document.getElementById(e).getAttribute("text")
                        if (fname !== 'Date') {
                            if (fname !== selectedObj[e]) {
                                temp[fname] = selectedObj[e].replace("dsp-", "")
                            }
                        } else {
                            if (fname !== selectedObj[e]) {
                                daterange[fname] = selectedObj[e].replace("dsp-", "")
                            }
                        }
                    }
                })
            }
            // }

            obj = {
                folderId: "0",
                designName: "",
                SupplierId: sid ? sid : 0,  //document.getElementById('Supplierid').value
                isText: false,
                isUserAdmin: false,
                createdBy: "",
                filterSearchRequestDto: {
                    folderId: 0,
                    features: temp,
                    isAnd: true
                },
                IsRating: false,
                IsName: Isname,
                start: start ? start : 0,
                end: end ? end : 15,
                Range: daterange,
                Iswearhouse: true,
                collectionId: 0,
                id: 0,
                IsBoard: false,
                userid: 0,
                IsBoard: false,
                IsCollection: false,
                ColorwayDesigns: null,
                CustomerId: 0,
                isSmart: false,
                designstate: document.getElementById("Warehouse_id").value !== null ? (document.getElementById("Warehouse_id").value) : '',
                Difference: diff ? diff : 15,
                DesignTypeIdGroupId: document.getElementById('collectionFabLibrary').value
            }
        }
        const response = await axios.post(`./Design/GetDesignSearchByfolderId`, obj)
        if (response.data === null) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Searching Data Not Found  !?',
                showConfirmButton: true
            })
            return
        }
        const finalAppendFabrics = (pareseData, type = `t`) => {
            //const path = pareseData.imageUrl
            const path = pareseData.localUrl ? pareseData.localUrl : pareseData.imageUrl
            const timestamp = Date.now()
            return {
                totalCount: pareseData.totalCount,
                designMaster: pareseData.designMaster.map((e) => {
                    return {
                        ...e,
                        imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg?v=${timestamp}`
                    }
                }),
                localUrl: pareseData.localUrl,
                imageUrl: pareseData.imageUrl
            }
        }
        const pareseData = (JSON.parse(response.data))
        const updatepares = finalAppendFabrics(pareseData)
        ps.setDesignList(updatepares)
        //ps.setDesignList(JSON.parse(response.data))
        try {
            Object.keys(selectedObj).map((e, k) => {
                document.getElementById(e).value = selectedObj[e]
            })
        } catch (error) {

        }
    } catch (error) {

    }
}

//!Top-Left
const LeftTop = (props) => {
    const ability = useContext(AbilityContext)
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
    return (
        <>
            <Col className="col-xl-12 col-lg-12 col-md-12 col-sm-12 pr-0 design_content">
                {ability.can('add', 'Design') && <> <form className="form-inline flex-wrap select col-md-3 col-sm-12 pl-0 pr-50">
                    <span className="float-left mr-1">Select Supplier</span>
                    <select id="Supplierid"
                        className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                        ref={props.supplierref}
                        onChange={async (e) => {
                            props.loaderRef.current.style.display = 'block'
                            const RoleId = e.target.selectedOptions[0].id
                            const accessResponse = await axios.get(`./Design/RoleAccessToElement?RoleId=${RoleId}`)
                            const ft = FilterData(JSON.parse(accessResponse.data).allDetails)
                            localStorage.setItem("access", JSON.stringify(ft))
                            // props.setaccess(ft)
                            props.access.current = ft
                            props.setSelect(e.target.value)
                            let IsName = ""
                            if (props.orderbyref.current.value === "Name") {
                                IsName = true
                            } else {
                                IsName = false
                            }
                            props.searchHandel(props.fprops, undefined, undefined, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                                .then(() => {
                                    props.loaderRef.current.style.display = 'none'
                                })
                                .catch((error) => {
                                    console.error('Error:', error)
                                    props.loaderRef.current.style.display = 'none'
                                })
                        }}
                    >
                        {
                            props?.sprollist && props?.sprollist.map((e, k) => {
                                return <option id={e.roleid} value={e.supplier_id} >{e.sup_name}</option>
                            })}
                    </select> </form> </>}

                <form className="form-inline flex-wrap select col-md-3 col-sm-12 pr-50 pl-0">
                    <span className="float-left mr-1">Product Group</span>
                    <select
                        id="collectionFabLibrary"
                        className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                        onChange={async (e) => {
                            // props.setreRender(e => !e)
                            let resGetFt = 0
                            const id = e.target.value
                            const [a, b] = id.split(' - ').map(Number)
                            props.loaderRef.current.style.display = 'block'
                            ability.can('add', 'Design') ? resGetFt = await axios.get(`./Design/GetFeatureTypeList?PTPG=${a}-${b}-${props.supplierref.current?.value}`) : resGetFt = await axios.get(`./Design/GetFeatureTypeList?PTPG=${a}-${b}-0`)
                            myComplexobj.ft = resGetFt.data
                            getFeatureListD = resGetFt.data
                            props.setfeatureTData(resGetFt.data)
                            props.featureTDataRef.current = resGetFt.data
                            props.setSelect(e.target.value)
                            const isAllSearch = true
                            let IsName = ""
                            if (props.orderbyref.current.value === "Name") {
                                IsName = true
                            } else {
                                IsName = false
                            }
                            props.searchHandel(props.fprops, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                                .then(() => {
                                    props.loaderRef.current.style.display = 'none'
                                })
                                .catch((error) => {
                                    console.error('Error:', error)
                                    props.loaderRef.current.style.display = 'none'
                                })
                        }}
                    >
                        <Loop rollData={props.rollData} />
                    </select>

                </form>
                <form className="form-inline flex-wrap select col-md-3 col-sm-12 pr-50 pl-0">
                    <span className="float-left mr-1">Warehouse</span>
                    <select id="Warehouse_id" className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                        onChange={(e) => {
                            //props.setreRender(e => !e)
                            props.loaderRef.current.style.display = 'block'
                            props.setSelect(e.target.value)
                            const isAllSearch = true
                            let IsName = ""
                            if (props.orderbyref.current.value === "Name") {
                                IsName = true
                            } else {
                                IsName = false
                            }
                            props.searchHandel(props.fprops, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                                .then(() => {
                                    props.loaderRef.current.style.display = 'none'
                                })
                                .catch((error) => {
                                    console.error('Error:', error)
                                    props.loaderRef.current.style.display = 'none'
                                })
                        }}
                    >
                        <option value="All,Stock,Noos,Sample">All</option>
                        <option value="stock">Stock</option>
                        <option value="noos">Noos</option>
                        <option value="sample">Sample</option>
                    </select>
                </form>
            </Col>
        </>

    )
}

//!Top Right
const TopRight = (props) => {
    const [Del, setDel] = useState(false)
    const deltoggle = () => setDel(!Del)
    const [showqr, setshowqr] = useState(false)
    const [showSaree, setshowSaree] = useState(false)
    const toggleSaree = () => setshowSaree(!showSaree)
    const toogleqr = () => setshowqr(!showqr)
    const [Ddata, setData] = useState(null)
    const ability = useContext(AbilityContext)
    const [isOpen1, setOpen1] = useState(false)
    const [printQrModel, setPrintQrModel] = useState(false)
    const loaderRef = useRef(null)
    const toggleprint = () => { setPrintQrModel(!printQrModel) }
    const selecteddesigns = selection?.selected2.length
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const handleonclick = () => {
        if (parseInt(document.getElementById('count').innerHTML) === 0) {
            //window.showSelectionObj().selected2.length === 0 &&
            alert('please select design')
        } else {
            toggleprint()
        }
    }
    const generateZip = (zip) => {
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "QrImage.zip")
            })
    }
    const downloadQr = () => {
        if (!selection?.selected2.length) {
            alert("Please select Design")
            return
        }

        let src = null
        let count = 0
        const zip = new JSZip()
        selection.selected2.forEach(async (element) => {
            let imgData = null
            src = selection.getQ3dLink(element.name)
            if (src) {
                imgData = await getQRbase642(src, element.name)
                if (selection?.selected2.length === 1) {
                    const tempDownloadTag = document.createElement('a')
                    tempDownloadTag.href = imgData
                    tempDownloadTag.download = element.name
                    tempDownloadTag.click()
                } else {
                    imgData = imgData.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
                    zip.file(`${element.name}.png`, imgData, { base64: true })
                    ++count
                    if (count === selection.selected2.length) {
                        generateZip(zip)
                    }
                }
            }
        })
    }

    const downloadCsv = () => {
        if (!selection?.selected2.length) {
            alert("Please select Design")
            return
        }
        let count = 1
        const refinedData = new Array(['Serial No', 'Design Name', 'URL', 'Thumb', 'Bestfit'])
        selection.selected2.map((value) => {
            let url = selection.getQ3dLink(value.name)
            url = url?.replaceAll("%20", " ")
            const designName = `'${value.name}'`
            const Thumb = value.imgUrl.replace('/z/', '/t/').replace('z.jpg', 't.jpg').replace(/\(/g, "%28").replace(/\)/g, "%29")
            const Bestfit = value.imgUrl.replace('/z/', '/b/').replace('z.jpg', 'b.jpg').replace(/\(/g, "%28").replace(/\)/g, "%29")
            refinedData.push([count, designName, url, Thumb, Bestfit])
            count++
        })
        let csvContent = ''
        refinedData.forEach(row => {
            csvContent += `${row.join(',')}  \n`
        })
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
        const objUrl = URL.createObjectURL(blob)

        let link = document.getElementById("link")
        if (!link) {
            link = document.createElement('a')
            link.setAttribute('download', 'QrUrl.csv')
            link.id = "link"
            //document.querySelector('body').append(link)
        }

        link.setAttribute('href', objUrl)

        link.click()
    }
    return (
        <>
            <div className="col-xl-6 col-lg-6 col-md-10 col-sm-12 d-flex justify-content-end" >
                <div className="button-menu">
                    <div className="text-lg-right d-lg-flex slidemenu d-inline-flex" style={{ justifyContent: "right", gap: "5px" }}>
                        <AddDesign setSelectedPage={props.setSelectedPage} designList={props.designList} orderbyref={props.orderbyref} IdData={props.IdData} myColour={props.myColour}
                            modal={props.modal} toggle={props.toggle} loaderRef={props.loaderRef} tempsearchValue={props.tempsearchValue} supplierref={props.supplierref} singlerepeat={props.singlerepeat}
                            orderbycountref={props.orderbycountref} setDesignList={props.setDesignList} Q3drenderpluginURL={props.Q3drenderpluginURL} products={props.products}
                            unsavedesigns={props.unsavedesigns} setModal={props.setModal} selectedTypeRef={props.selectedTypeRef} setreRender={props.setreRender} reRender={props.reRender} access={props.access}
                            showSaree={showSaree} setshowSaree={setshowSaree} toggleSaree={toggleSaree} saastoken={props.saastoken} setused_credit={props.setused_credit} remaning_credit={props.remaning_credit}
                            setremaning_credit={props.setremaning_credit} saasapi={props.saasapi} />
                        {ability.can('display', 'Design') &&
                            <Button.Ripple color='success'
                                type="button"
                                id="add_designBTN"
                                className="btn btn-sm btn-success design_content upload_comm    on_button"
                                onClick={async () => {
                                    props.loaderRef.current.style.display = 'none'
                                    const isStorageF = await axios.post(`./Design/GetStorageLocation`)
                                    if (!isStorageF.data.isStorage) {
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'info',
                                            title: 'Please configure storage  !?',
                                            showConfirmButton: true
                                        })
                                    } else if (props.remaning_credit <= 0 && props.saastoken !== null) {
                                        Swal.fire({
                                            icon: 'Error',
                                            text: 'Not Enough credit balance for upload design',
                                            allowOutsideClick: false,
                                            backdrop: true
                                        })
                                    } else {
                                        props.toggle()
                                    }
                                }
                                }
                            >
                                <i className="fas fa-plus-circle mr-1"></i> Add Designs
                            </Button.Ripple>}
                               {/* UploadSareePopup : Upload Saree Fabric Button to upload saree designs */}
                        {/* {ability.can('display', 'Design') &&
                            <Button.Ripple color='success'
                                type="button"
                            
                                className="btn btn-sm btn-success design_content upload_comm    on_button"
                                onClick={() => {
                                  toggleSaree()
                                 }
                                }
                            >
                                <i className="fas fa-plus-circle mr-1"></i> Upload Saree Fabric
                                </Button.Ripple>}
                                  <UploadSareePopup showSaree={showSaree} toggleSaree={toggleSaree} setshowSaree = {setshowSaree} />  */}

                        <div className="seasonal_content_assign"><AddtoCollection /></div>
                        {props.access.current !== null && props.access.current["444449"] && !props.access.current["444449"]["227789"] &&
                            <div className="design_content"><Button.Ripple color='success'
                                type="button"
                                id="openQ3DQR"
                                className="btn btn-sm btn-success "
                                onClick={() => {
                                    if (parseInt(document.getElementById('count').innerHTML) <= 30) {
                                        toogleqr()
                                    } else {
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'info',
                                            title: 'Maximum limit exceeded. please select upto 30 Designs',
                                            showConfirmButton: true
                                        })
                                    }
                                }}
                            >

                                <i className="fas fa-qrcode mr-1"></i> QR
                            </Button.Ripple ></div>}


                        <div className="design_content">  <QrPopUp showqr={showqr} toogleqr={toogleqr} src={selection.getQrLink(true)} /></div>
                        <div className="design_content">
                            <OpenExportExcel rollData={props.rollData} setOpen1={setOpen1} isOpen1={isOpen1} />

                            <UncontrolledDropdown>
                                {(ability.can('display', 'Design') || ability.can('show', 'Design') || (props.access.current !== null && props.access.current["444449"] && !props.access.current["444449"]["227789"])) && (
                                    <DropdownToggle
                                        className='hide-arrow ml-50 bg-secondary d-block text-center'
                                        tag='a'
                                        style={{ width: '36px', height: '36px' }}
                                    >
                                        <MoreVertical
                                            className='text-white mt-50'
                                            size={20}
                                            style={{ width: '18px', height: '18px' }}
                                        />
                                    </DropdownToggle>
                                )
                                }
                                <DropdownMenu right>
                                    {(ability.can('display', 'Design') || ability.can('show', 'Design')) && <div className=''>
                                        <label className="custom-file-upload w-100 customdropitem  p-1 " title="Import Excel">
                                            <i
                                                className="fas fa-file-import mr-50"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                data-original-title="Import Excel"
                                            ></i>
                                            <input
                                                id="importExcel"
                                                type="file"
                                                accept=".xls,.xlsx"
                                                multiple=""
                                                style={{ display: 'none' }}
                                                onChange={async (e) => {
                                                    props.loaderRef.current.style.display = 'block'
                                                    const tpgpID = document.getElementById('collectionFabLibrary').value
                                                    const obj = {}
                                                    obj['FolderId'] = 0
                                                    obj['designTypeId'] = tpgpID.split('-')[0].trim()
                                                    obj['designGroupId'] = tpgpID.split('-')[1].trim()
                                                    obj['OrganisationId'] = 0
                                                    const file = e.target.files[0]

                                                    const formPayload = new FormData()
                                                    formPayload.append('file', file)
                                                    formPayload.append('alldata', JSON.stringify(obj))


                                                    await axios({
                                                        url: './Design/SaveDesignMasterExcel',
                                                        method: 'post',
                                                        data: formPayload,
                                                        headers: { 'Content-Type': 'multipart/form-data' },
                                                        enctype: 'multipart/form-data'


                                                    }).then(e => {

                                                        if (e.data !== null && e.data !== undefined) {

                                                            const res = decodeURIComponent(JSON.parse(JSON.stringify(e.data.issaved)))
                                                            const formattedRes = res.replace(/([,.!])\s*/g, '$1<br>').replace(/^\s+/gm, '').trim()

                                                            if (e.data.issaved !== "") {
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    html: `
                                                                    <b style="font-size: 16px;">Data Save Successfully</b>
                                                                    <div style="width: 100%; height: 120px; overflow-y: auto; 
                                                                                padding: 5px; font-family: monospace; 
                                                                                border: 1px solid #ccc; box-shadow: none; 
                                                                                color: red;
                                                                                white-space: pre-wrap; background: #fff; font-size: 14px;">
                                                                    <p style="text-align: left;">${formattedRes}</p>
                                                                    </div>
                                                                `,
                                                                    width: '700px !important',
                                                                    padding: '10px',
                                                                    showCloseButton: true,
                                                                    confirmButtonText: 'OK'
                                                                })
                                                                props.loaderRef.current.style.display = 'none'
                                                                setTimeout(async () => {
                                                                    props.setreRender(!props.reRender)
                                                                }, 200)
                                                            } else {
                                                                Swal.fire(
                                                                    'Success',
                                                                    'Data saved successfully !!',
                                                                    'success'
                                                                )
                                                                props.loaderRef.current.style.display = 'none'
                                                            }
                                                        } else {
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'Oops...',
                                                                text: 'Something went wrong!'
                                                            })
                                                            props.loaderRef.current.style.display = 'none'
                                                        }

                                                    })

                                                    e.target.value = ''

                                                }}
                                            />
                                            Import Excel
                                        </label>
                                    </div>}
                                    {(ability.can('display', 'Design') || ability.can('show', 'Design')) && <DropdownItem className='p-0 w-100'>
                                        <button
                                            id="exportExcelBtn"
                                            type="button"
                                            className="btn btn-sm waves-effect waves-light btn-white p-1 w-100 text-left"
                                            data-toggle="modal"
                                            data-target="#export_model"
                                            title="Export Excel"
                                            onClick={() => {
                                                setOpen1(!isOpen1)
                                                //toggleprint(true)
                                            }}
                                        >
                                            <i
                                                className="fas fa-file-export mr-50 "
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title=""
                                                data-original-title="Export Excel"
                                            >
                                            </i>
                                            Export Excel
                                        </button>
                                    </DropdownItem>}
                                    {props.access.current !== null && props.access.current["444449"] && !props.access.current["444449"]["227789"] && <DropdownItem className='p-0 w-100'>
                                        <button
                                            type="button"
                                            id="printBtn"
                                            className="btn btn-sm btn-white waves-effect waves-light btn-white p-1 w-100"
                                            title="Print"
                                            onClick={() => {
                                                handleonclick()
                                            }}
                                        >
                                            <i
                                                className="mr-50 fas fa-print"
                                            ></i> Print QR
                                            <span className="caret"></span>
                                        </button>
                                        {printQrModel && <PrintQr printQrModel={printQrModel} toggleprint={toggleprint} unit="false" designId={selection} />}
                                    </DropdownItem>}
                                    {props.access.current !== null && props.access.current["444449"] && !props.access.current["444449"]["227789"] && <DropdownItem className='p-0 w-100'>
                                        <button
                                            type="button"
                                            id="downloadQr"
                                            className="btn btn-sm btn-white waves-effect waves-light btn-white p-1 w-100 text-left"
                                            title="download QR"
                                            onClick={() => {
                                                downloadQr()
                                            }}
                                        >
                                            <i
                                                className="mr-50 fas fa-cloud-download-alt"
                                            ></i> Download QR
                                            <span className="caret"></span>
                                        </button>

                                    </DropdownItem>}
                                    {props.access.current !== null && props.access.current["444449"] && !props.access.current["444449"]["227789"] && <DropdownItem className='p-0 w-100'>
                                        <button
                                            type="button"
                                            id="downloadCsv"
                                            className="btn btn-sm btn-white waves-effect waves-light btn-white p-1 w-100 text-lef"
                                            title="Download CSV"
                                            onClick={() => {
                                                downloadCsv()
                                            }}
                                        >
                                            <i
                                                className="mr-50 fas fa-file-csv"
                                            ></i> Download CSV
                                            <span className="caret"></span>
                                        </button>
                                    </DropdownItem>}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
//!Dynamic with Div <SelectBoxWithDiv />
const SelectBoxWithDiv = (props) => {
    //FidName
    const [options, setoptions] = useState(``)
    const Options = (op) => {
        return (
            <option tempid={op.value.design_featuretype_id} value={op.value.design_featuretype_name}>{op.value.design_featuretype_name}</option>
        )
    }

    const handelSelectChange = (e) => {
        if (e.target.id !== e.target.value) {
            selectedObj[e.target.id] = e.target.value
        } else {
            delete selectedObj[e.target.id]
        }
    }

    return (
        <>
            <Col className="col-md-4 col-lg-2 flip mb-8 mb-1"
                style={{ paddingLeft: "0px", paddingRight: "4px", float: "left" }}>
                <select
                    id={`dsp-${props.FidName[0].id}`}
                    type="text"
                    className="_featureTypeSearch form-control"
                    selectcss="0"
                    sfid={props.FidName[0].id}
                    sfname={props.FidName[0].name}
                    onChange={handelSelectChange}
                >
                    <option value={`dsp-${props.FidName[0].id}`}>{props.FidName[0].name}</option>
                    {
                        props.ftdata.map((e, k) => {
                            return <Options key={k} value={e} />
                        })
                    }
                </select>
            </Col>
        </>
    )
}
//! id: collectionFabLibrary

let ftData1 = []
const SearchToggleComponent = (props) => {
    const [ft, setft] = useState(ftData1)
    const [name, setname] = useState('Date')
    const [isDateFilterVisible, setIsDateFilterVisible] = useState(false)
    useEffect(() => {
        ftData1 = getFilteredData(props)
        selectedObj = {}
        return () => {
            props.setSelect(null)
        }
    }, [props.select])

    ftData1 = getFilteredData(props)
    return (
        <>
            <div >
                <div id="cardCollpase1"  >
                    <div className="AdvanceSearch">
                        {
                            ftData1.map((e, k) => {
                                let ftdata = []
                                const FidName = []
                                if (props.featureTDataRef.current !== null) {
                                    for (let i = 0; i < props.featureTDataRef.current.length; i++) {
                                        if (props.featureTDataRef.current[i].design_feature_id === e.design_features_id) {
                                            ftdata = props.featureTDataRef.current[i].featureTypeList
                                        }
                                    }
                                }
                                FidName.push({ id: e.design_features_id, name: e.design_features_name })
                                return e.design_features_name === "Date" ? (<DateFilter key={`${k}-daterange`} fid={e.design_features_id} name={name} setname={setname} setIsDateFilterVisible={setIsDateFilterVisible} />) : (<SelectBoxWithDiv
                                    key={`${k}-select-m`}
                                    FidName={FidName}
                                    ftdata={ftdata}
                                    tid={k}
                                    setSelect={props.setSelect}
                                />
                                )
                            })
                        }

                        <div className="col-md-4 col-lg-2 d-flex pl-0" >
                            <button
                                type="button"
                                id="AdvanceSearchBtn"
                                className="btn btn-xs btn-primary waves-effect waves-light mb-2 px-1 py-50"
                                onClick={() => {
                                    props.setTempSearchValue("")
                                    props.loaderRef.current.style.display = 'block'
                                    props.setSelectedPage(0)

                                    const isAllSearch = false
                                    let IsName = ""
                                    if (props.orderbyref.current.value === "Name") {
                                        IsName = true
                                    } else {
                                        IsName = false
                                    }
                                    searchHandel(props, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                                        .then(() => {
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error)
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                    selection.setSelectAll(false, props.designList)
                                    selection.reMoveAll()
                                    if (document.querySelector('#page')) {
                                        document.querySelector('#page').checked = false
                                    }
                                    // document.querySelector('#page').checked = false
                                }
                                }
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                id="ResetBtn"
                                className="btn btn-xs btn-primary waves-effect waves-light mb-2" style={{ marginLeft: "4px" }}
                                onClick={() => {
                                    props.loaderRef.current.style.display = 'block'
                                    //props.setreRender(!props.reRender)
                                    selectedObj = {}
                                    props.setSelect(!props.select)
                                    const isAllSearch = true
                                    props.setSelectedPage(0)
                                    searchHandel(props, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, true)
                                        .then(() => {
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error)
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                    props.orderbyref.current.value = "Name"
                                    selection.setSelectAll(false, props.designList)
                                    selection.reMoveAll()
                                    if (document.querySelector('#page')) {
                                        document.querySelector('#page').checked = false
                                    }
                                    if (isDateFilterVisible) {
                                        setname("date")
                                    }
                                }
                                }
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

//!TopBar

const InputSearchCombo = (props) => {
    let designFeatureNames = new Set()
    if (getFeatureListD && Array.isArray(getFeatureListD)) {
        getFeatureListD.forEach(item => {
            if (item.featureTypeList && Array.isArray(item.featureTypeList)) {
                item.featureTypeList.forEach(feature => {
                    designFeatureNames.add(feature.design_featuretype_name)
                })
            }
        })
        designFeatureNames = Array.from(designFeatureNames)
    }
    const designFeatureNamesArray = Array.from(designFeatureNames)
    const [filteredItems, setFilteredItems] = useState([])
    const [isDropdownVisible, setDropdownVisible] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const ulRef = useRef(null)

    const handleSearchChange = (e) => {
        const searchValue = e.target.value
        props.setTempSearchValue(searchValue)
        if (searchValue === "") {
            setFilteredItems([])
            setDropdownVisible(false)
        } else {
            setFilteredItems(designFeatureNamesArray.filter(item => item.toLowerCase().startsWith(searchValue.toLowerCase())))
            setDropdownVisible(true)
        }
    }

    const handleClearSearch = () => {
        setDropdownVisible(false)
        props.loaderRef.current.style.display = 'block'
        props.setTempSearchValue('')
        Promise.resolve(props.setreRender(!props.reRender))
            .then(() => {
                props.loaderRef.current.style.display = 'none'
            })
            .catch((error) => {
                console.error('Error:', error)
                props.loaderRef.current.style.display = 'none'
            })
        props.orderbyref.current.value = "Name"
        selection.setSelectAll(false, props.designList)
        selection.reMoveAll()
        if (document.querySelector('#page')) {
            document.querySelector('#page').checked = false
        }
        // document.querySelector('#page').checked = false
    }
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            props.loaderRef.current.style.display = 'block'
            if (props.tempsearchValue !== "") {
                props.setSelectedPage(0)
                const isAllSearch = false
                let IsName = ""
                if (props.orderbyref.current.value === "Name") {
                    IsName = true
                } else {
                    IsName = false
                }
                searchHandel(props, props.tempsearchValue, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                    .then(() => {
                        props.loaderRef.current.style.display = 'none'
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                        props.loaderRef.current.style.display = 'none'
                    })
                selection.setSelectAll(false, props.designList)
                selection.reMoveAll()
                // document.querySelector('#page').checked = false
                if (document.querySelector('#page')) {
                    document.querySelector('#page').checked = false
                }
            }
            if (props.tempsearchValue === "") {
                props.setSelectedPage(0)
                const isAllSearch = true
                let IsName = ""
                if (props.orderbyref.current.value === "Name") {
                    IsName = true
                } else {
                    IsName = false
                }
                searchHandel(props, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                    .then(() => {
                        props.loaderRef.current.style.display = 'none'
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                        props.loaderRef.current.style.display = 'none'
                    })
                selection.setSelectAll(false, props.designList)
                selection.reMoveAll()
                if (document.querySelector('#page')) {
                    document.querySelector('#page').checked = false
                }
                //  document.querySelector('#page').checked = false
            }
        }
    }

    const handleSelectItem = (item) => {
        props.setTempSearchValue(item)
        setDropdownVisible(false)
        props.loaderRef.current.style.display = 'block'
        if (item !== "") {
            props.setSelectedPage(0)
            const isAllSearch = false
            let IsName = ""
            if (props.orderbyref.current.value === "Name") {
                IsName = true
            } else {
                IsName = false
            }
            searchHandel(props, item, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                .then(() => {
                    props.loaderRef.current.style.display = 'none'
                })
                .catch((error) => {
                    console.error('Error:', error)
                    props.loaderRef.current.style.display = 'none'
                })
            selection.setSelectAll(false, props.designList)
            selection.reMoveAll()
            if (document.querySelector('#page')) {
                document.querySelector('#page').checked = false
            }
            //document.querySelector('#page').checked = false
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setSelectedIndex((prevIndex) => {
                const nextIndex = prevIndex === null ? 0 : Math.min(filteredItems.length - 1, prevIndex + 1)
                return nextIndex
            })
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setSelectedIndex((prevIndex) => {
                return prevIndex === null ? 0 : Math.max(0, prevIndex - 1)
            })
        } else if (e.key === "Enter") {
            if (selectedIndex !== null && filteredItems.length > 0) {
                handleSelectItem(filteredItems[selectedIndex]) // Select item from dropdown
            } else {
                handleSearchSubmit(e)
            }
        }
    }

    useEffect(() => {
        if (selectedIndex !== null && ulRef.current) {
            const selectedItem = ulRef.current.children[selectedIndex]
            if (selectedItem) {
                selectedItem.scrollIntoView({ behavior: "smooth", block: "nearest" })
            }
        }
    }, [selectedIndex])

    useEffect(() => {
        if (filteredItems.length > 0) {
            setSelectedIndex(0)
        }
    }, [filteredItems])

    return (
        <>
            <Row
                style={{ display: 'block' }}>
                <InputGroup className='col-lg-4 col-md-6 col-sm-12 d-block' >
                    <div className="input-icons" style={{ position: 'relative' }}>
                        <Input value={props.tempsearchValue} id='txtSearch' placeholder=" Search Design " className='rounded-left w-100' style={{ borderRadius: '0' }}
                            type='text'
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                            onChange={handleSearchChange}
                        >

                        </Input>
                        {isDropdownVisible && filteredItems.length > 0 && (
                            <ul
                                ref={ulRef}
                                tabIndex={0} // Allows focus on the list
                                style={{
                                    maxHeight: "150px",
                                    overflowY: "auto",
                                    position: "absolute",
                                    width: "100%",
                                    backgroundColor: "white",
                                    border: "1px solid #ccc",
                                    zIndex: 10,
                                    listStyleType: "none",
                                    paddingLeft: 0
                                }}
                            >
                                {filteredItems.map((item, index) => (
                                    <li
                                        key={index}
                                        tabIndex={0} // Allows keyboard selection
                                        style={{
                                            padding: "8px",
                                            cursor: "pointer",
                                            backgroundColor: index === selectedIndex ? "lightgrey" : "transparent"
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)} // Update selection on hover
                                        onClick={() => handleSelectItem(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <i className="fa fa-times" aria-hidden="true" role='button'
                            onClick={handleClearSearch}
                            style={{ position: 'absolute', right: '60px', top: '0.875rem' }}></i>
                    </div>
                    <InputGroupAddon addonType="append">
                        <Button className="bg-light text-white px-1" role="button"
                            onClick={(e) => {
                                setDropdownVisible(false)
                                props.loaderRef.current.style.display = 'block'
                                if (props.tempsearchValue === "") {
                                    const isAllSearch = true
                                    let IsName = ""
                                    if (props.orderbyref.current.value === "Name") {
                                        IsName = true
                                    } else {
                                        IsName = false
                                    }
                                    searchHandel(props, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                                        .then(() => {
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error)
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                    selection.setSelectAll(false, props.designList)
                                    selection.reMoveAll()
                                    if (document.querySelector('#page')) {
                                        document.querySelector('#page').checked = false
                                    }
                                    // document.querySelector('#page').checked = false
                                } else {
                                    const isAllSearch = false
                                    let IsName = ""
                                    if (props.orderbyref.current.value === "Name") {
                                        IsName = true
                                    } else {
                                        IsName = false
                                    }
                                    searchHandel(props, props.tempsearchValue, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                                        .then(() => {
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                        .catch((error) => {
                                            console.error('Error:', error)
                                            props.loaderRef.current.style.display = 'none'
                                        })
                                    selection.setSelectAll(false, props.designList)
                                    selection.reMoveAll()
                                    if (document.querySelector('#page')) {
                                        document.querySelector('#page').checked = false
                                    }
                                    // document.querySelector('#page').checked = false
                                }
                            }}
                        ><i class="fa fa-search" aria-hidden="true"></i></Button>
                    </InputGroupAddon>
                </InputGroup>
            </Row>
        </>
    )
}

const TopBar = (props) => {
    const [advsearch, setadvsearch] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const resetInput = event => {
        setSearchValue('')
    }
    const [Modal, Setmodal] = useState(false)
    const Toggle = () => Setmodal(!Modal)
    const [select, setSelect] = useState(null)
    const [Collectionlist, setSeasonlist_id] = useState([])

    //!LeftTopDown
    const [Seaslist, sslist] = useState(null)
    const [rollData, setrollData] = useState(null)
    const [featureTData, setfeatureTData] = useState(null)
    const [Del, setDel] = useState(false)
    const deltoggle = () => setDel(!Del)
    const seasonidref = useRef(null)
    const collectionlidref = useRef(null)
    const orderbyref = useRef(null)
    const loaderRef = useRef(null)
    const featureTDataRef = useRef(null)
    let resGetFt = 0
    const ability = useContext(AbilityContext)
    //const supplierref = useRef(null)
    const selectedType = {
        type: null,
        group: null,
        selectedUSer: null
    }
    const selectedTypeRef = useRef(null)
    const [rolFTdata, setrolFTdata] = useState(myComplexobj)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                props.loaderRef.current.style.display = 'block'
                forColour.value = ""
                if (skipState.skipFt) {
                    const response = await axios.get(`./Design/GetRoleDesignConfigurationByRole?RoleId=${0}`)
                    getDesignTypeGroup = response.data
                    const data = (rs = null) => {
                        let arr = []
                        if (rs !== null) {
                            (rs.allDesignTypesByRoles.map((e, k) => {
                                const obj = {}
                                obj.alldata = e
                                obj.value = `${e.design_type_id}-${k}`
                                obj.label = `${e.design_type_name}`
                                arr.push(obj)
                            }))
                        } else {
                            arr = []
                        }
                        selectedType.type = arr[0] !== undefined ? arr[0].value : ''
                        return arr
                    }
                    const res = response.data
                    const arr = res.allDesignTypesByRoles[0].getDesignGroupsByRoleListDto.map((e, k) => {
                        const obj = e
                        obj.label = obj.design_groups_name
                        obj.design_featuretype_name = obj.design_groups_name
                        obj.design_featuretype_id = `${obj.design_groups_id}-${k}`
                        obj.value = `${obj.design_groups_id}-${k}`
                        return obj
                        //arr.push(obj)
                    })
                    selectedType.group = arr[0] !== undefined ? arr[0].value : ''
                    myComplexobj.type = data(res)
                    myComplexobj.group = arr
                    myComplexobj.roll = res
                    //selectedTypeRef.current = selectedType
                    if (selectedType.type.length > 0 && selectedType.group.length > 0) {
                        selectedTypeRef.current = selectedType
                    }
                    setrollData(response.data)
                    ability.can('add', 'Design') ? resGetFt = await axios.get(`./Design/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group.split('-')[0]}-${props.supplierref.current?.value}`) : resGetFt = await axios.get(`./Design/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group}`)
                    myComplexobj.ft = resGetFt.data
                    getFeatureListD = resGetFt.data
                    featureTDataRef.current = resGetFt.data
                    setfeatureTData(resGetFt.data)

                    let textsearch = ""
                    if (props.tempsearchValue === '') {
                        textsearch = undefined
                    } else {
                        textsearch = props.tempsearchValue
                    }
                    const isAllSearch = false
                    let IsName = ""
                    if (props.orderbyref.current.value === "Name") {
                        IsName = true
                    } else {
                        IsName = false
                    }
                    const start = (props.selectedPage - 1) < 0 ? 0 : ((props.selectedPage) * props.orderbycountref.current.value)
                    const end = start + parseInt(props.orderbycountref.current.value)
                    await searchHandel(props, textsearch, isAllSearch, start, props.orderbycountref.current.value ? parseInt(end) : 15, props.supplierref.current?.value, IsName)
                    props.loaderRef.current.style.display = 'none'
                } else {
                    setSkipFt(true)
                    const isAllSearch = true
                    let IsName = ""
                    if (props.orderbyref.current.value === "Name") {
                        IsName = true
                    } else {
                        IsName = false
                    }
                    setTimeout(async () => {
                        await searchHandel(props, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                    }, 1000)
                    props.loaderRef.current.style.display = 'none'
                }
                // console.log(props.reRender)
            } catch (error) {
                console.error(error)
            } finally {
                props.loaderRef.current.style.display = 'none'
                forColour.value = ""
            }
        }
        fetchdata()
        // return () => {
        //     forColour.value = ""
        //     props.loaderRef.current.style.display = 'none'
        //     //props.setDesignList(null)
        // }
    }, [Modal, props.reRender])
    const obj = {
        OrganisationId: 0,
        SupplierId: 0,
        start: 0,
        end: 0
    }

    return (
        <>
            <Card className="contain1">
                <div className="col-xl-12">
                    <>
                        <CardHeader className='border-bottom'>
                            <div className="d-flex">
                                <CardTitle tag='h4' className='d-flex justify-content-start'>Designs</CardTitle>
                                {props.saastoken !== null && props.saastoken !== undefined && (
                                    <div className='creditwallet'>
                                        <div className='wallet_title'>Credit Balance</div>
                                        <div className='d-flex'>
                                            <div className='credit_balance'>
                                                <span>{props.usedcredit}</span> / <span>{props.credit}</span> <small>Credits</small>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                            <TopRight setSelectedPage={props.setSelectedPage} designList={props.designList} orderbyref={props.orderbyref} designcount={props.designcount} myColour={props.myColour}
                                orderbycountref={props.orderbycountref} Modal={Modal} Setmodal={Setmodal} Toggle={Toggle} supplierref={props.supplierref} tempsearchValue={props.tempsearchValue} singlerepeat={props.singlerepeat}
                                rollData={rollData} setreRender={props.setreRender} reRender={props.reRender} loaderRef={props.loaderRef}
                                setDesignList={props.setDesignList} Q3drenderpluginURL={props.Q3drenderpluginURL} products={props.products} unsavedesigns={props.unsavedesigns} selectedTypeRef={selectedTypeRef}
                                access={props.access} saastoken={props.saastoken} setused_credit={props.setused_credit} remaning_credit={props.remaning_credit} setremaning_credit={props.setremaning_credit}
                                modal={props.modal} setModal={props.setModal} toggle={props.toggle} saasapi={props.saasapi} />
                        </CardHeader>
                    </>

                    <CardBody className="pt-1">
                        <Row className='mx-0 pb-2 seasonal_content_viewupload'>
                            <>
                                <Col className="col-xl-6 col-lg-6 col-md-8 col-sm-12 d-flex pr-0 pl-0">
                                    <form className="form-inline flex-wrap select col-md-4 col-sm-12 pr-50 pl-0">
                                        <span className="float-left mr-1">Seasons</span>
                                        <select id="seasonid" className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                                            ref={seasonidref}
                                            onChange={async () => {
                                                const id = document.getElementById('seasonid').value
                                                const SeasonID = parseInt(id)
                                                const res = await axios.get(`./Seasonal/GetCollectionListBySeasonId?SeasonID=${SeasonID}`)
                                                setSeasonlist_id(res.data.myCollection)
                                            }
                                            }
                                        >
                                            {
                                                Seaslist && Seaslist.map((e, k) => {
                                                    return <option value={e.sm_Season_Id}>{e.sm_Season_Name}</option>
                                                })
                                            }
                                        </select>
                                    </form>
                                    <form className="form-inline flex-wrap select col-md-4 col-sm-12 pr-50 pl-0">
                                        <span className="float-left mr-1">Collection</span>
                                        <select id="collectionId" className="col-md-12 col-lg-12 col-md-6 col-sm-4 form-control float-left"
                                            ref={collectionlidref}
                                        >
                                            {
                                                Collectionlist && Collectionlist.map((e, k) => {
                                                    return <option value={e.collection_Id}>{e.collection_Name}</option>
                                                })
                                            }
                                        </select>
                                    </form>

                                </Col>
                            </>
                        </Row>
                        <Row className="mb-1 justify-content-end">
                            <LeftTop orderbyref={props.orderbyref} orderbycountref={props.orderbycountref} rollData={rollData} setSelect={setSelect} searchHandel={searchHandel} fprops={props} sprollist={props.sprollist}
                                splist={props.splist} supplierref={props.supplierref} setreRender={props.setreRender} loaderRef={props.loaderRef} setfeatureTData={setfeatureTData} setrollData={setrollData} featureTDataRef={featureTDataRef} access={props.access}
                            //setaccess={props.setaccess} 
                            />

                        </Row>
                        <Row className='design_content'>
                            <div className="col-xl-12 col-md-12 m-0 d-lg-flex flex-lg-column flex-sm-row">
                                <div className="col-lg-12 col-md-12 col-sm-12 p-0">
                                    <div className="filterPanel">

                                        <span className="font-weight-bold"> Please filter design here </span>
                                        <div className="card-widgets pt-0">
                                            <a
                                                id="filter-expand"
                                                role="button"
                                                aria-expanded="false"
                                                aria-controls="cardCollpase1"
                                                className="btn btn-secondary btn-xs waves-effect waves-light m-0 collapsed"
                                                style={{ lineHeight: '1rem' }}
                                                onClick={() => {
                                                    setadvsearch(!advsearch)
                                                }}
                                            >
                                                {advsearch ? <i className="fas fa-minus mr-50"></i> : <i className="fas fa-plus mr-50"></i>}
                                                Filter
                                            </a>
                                        </div>
                                        {advsearch ? <SearchToggleComponent orderbycountref={props.orderbycountref} designList={props.designList} orderbyref={props.orderbyref} selectedPage={props.selectedPage} setSelectedPage={props.setSelectedPage} setreRender={props.setreRender} reRender={props.reRender}
                                            setDesignList={props.setDesignList} advsearch={advsearch} setSelect={setSelect} select={select} rollData={rollData} featureTData={featureTData} supplierref={props.supplierref} loaderRef={props.loaderRef} featureTDataRef={featureTDataRef} setTempSearchValue={props.setTempSearchValue} /> : <InputSearchCombo orderbycountref={props.orderbycountref}
                                                designList={props.designList} orderbyref={props.orderbyref} selectedPage={props.selectedPage}
                                                setSelectedPage={props.setSelectedPage} tempsearchValue={props.tempsearchValue} setTempSearchValue={props.setTempSearchValue} setDesignList={props.setDesignList} setreRender={props.setreRender} reRender={props.reRender} supplierref={props.supplierref} loaderRef={props.loaderRef} />}

                                    </div>
                                </div>

                            </div>
                            <div className="custominput_grid">
                                <CustomInput
                                    className='form-control cursor'
                                    type='select'
                                    id='rows-per-page'
                                    innerRef={props.orderbycountref}
                                    defaultValue={'15'}
                                    style={{
                                        width: '7rem',
                                        padding: '0 0.8rem',
                                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                    }}

                                    onChange={(e) => {
                                        props.loaderRef.current.style.display = 'block'
                                        props.setreRender(!props.reRender)
                                        let textsearch = ""
                                        if (props.tempsearchValue === '') {
                                            textsearch = undefined
                                        } else {
                                            textsearch = props.tempsearchValue
                                        }
                                        const isAllSearch = false
                                        let IsName = ""
                                        if (props.orderbyref.current.value === "Name") {
                                            IsName = true
                                        } else {
                                            IsName = false
                                        }
                                        props.setSelectedPage(0)
                                        searchHandel(props, textsearch, isAllSearch, 0, parseInt(props.orderbycountref.current.value), props.supplierref.current?.value, IsName)
                                            .then(() => {
                                                props.loaderRef.current.style.display = 'none'
                                                selection.AllCheckBox()
                                            })
                                            .catch((error) => {
                                                console.error('Error:', error)
                                                props.loaderRef.current.style.display = 'none'
                                            })
                                        //  selection.reMoveAll()
                                        //  document.querySelector('#page').checked = false
                                    }}
                                >
                                    <option value='10' className='dropdown-sort'>10</option>
                                    <option value='15' className='dropdown-sort'>15</option>
                                    <option value='25' className='dropdown-sort'>25</option>
                                    <option value='50' className='dropdown-sort'>50</option>
                                </CustomInput>

                                <CustomInput
                                    className='form-control mx-50 cursor'
                                    type='select'
                                    id='dfhhfd-size-bfjb'
                                    innerRef={props.orderbyref}
                                    defaultValue={'15'}
                                    style={{
                                        width: '6rem',
                                        padding: '0 0.8rem',
                                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                    }}

                                    onChange={(e) => {
                                        props.loaderRef.current.style.display = 'block'
                                        let IsName = ""
                                        if (props.orderbyref.current.value === "Name") {
                                            IsName = true
                                        } else {
                                            IsName = false
                                        }
                                        const item = props.tempsearchValue ? props.tempsearchValue : undefined
                                        props.setSelectedPage(0)
                                        let isAllSearch
                                        if (props.tempsearchValue !== '') {
                                            isAllSearch = false
                                        } else {
                                            isAllSearch = true
                                        }
                                        searchHandel(props, item, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, props.supplierref.current?.value, IsName)
                                            .then(() => {
                                                props.loaderRef.current.style.display = 'none'
                                                selection.setSelectAll(false, props.designList)
                                                selection.reMoveAll()
                                                if (document.querySelector('#page')) {
                                                    document.querySelector('#page').checked = false
                                                }
                                            })
                                            .catch((error) => {
                                                console.error('Error:', error)
                                                props.loaderRef.current.style.display = 'none'
                                            })
                                    }}
                                >
                                    <option value='Name' className='dropdown-sort'>Name</option>
                                    <option value='Latest' className='dropdown-sort'>Latest</option>
                                </CustomInput>

                                <ButtonGroup className='btn-group-toggle listgrid-toggle'>
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
                        </Row>

                    </CardBody>

                </div>
            </Card>
            <R_Loader loaderRef={props.loaderRef} />
        </>
    )
}

export default TopBar