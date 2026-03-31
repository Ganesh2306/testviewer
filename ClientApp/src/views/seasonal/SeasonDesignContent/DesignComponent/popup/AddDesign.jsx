import React, { useState, useEffect, useRef } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Label,
    Col,
    Input,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownItem
} from "reactstrap"

import ContentTable, { old, MandatoryOptionsId, refSelectedId, addXlData, deleteRowUploaded, PRICE_ID, STANDARD} from "./ContentTable"
import { ProgressModel as MyModel } from "./progressComponent/ProgressCard"
import {  MoreVertical } from 'react-feather'
import { connect } from 'react-redux'
import { setUploadFile } from '../redux/uploadFile/uploadFile.actions'
import UploadProgress from '../UploadProgress/UploadProgress'
import { getExistDname, uploadFile } from "../../utility/IsDesignExist"
import OpenExportExcel from '../ExcelComponent/ExportExcel'
import axios from 'axios'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import readXlsxFile from 'read-excel-file'

import { updatecheckforUpload } from '../../../../SessionComponent/IdleTimeOutHandler'

const IdelTime = 1000 * 60 * 0.3
const Swal = require('sweetalert2')
let forBtn = true
export const getHead = () => {
    const arr = []
    try {
        const a = document.getElementById('main-thead').firstElementChild.cells
        for (let index = 2; index < a.length; index++) {
            if (index > 5) {
                arr.push(a[index].id)
            } else {
                arr.push(a[index].innerText)
            }
        }
        return arr
    } catch (error) {
        return []
    }
}

const getAllDataFromTable = (index, nodeIndex) => {
    const input = [2, 3, 4, 5]
    if (input.includes(index)) {
        return document.querySelectorAll(`#row-${nodeIndex} td input`)[index - 2].value
    } else {
        return document.querySelectorAll(`#row-${nodeIndex} td`)[index].textContent
    }
}

const overwriteMSG = "<h2>Design name is already exist.</h2> <p>Do you want to overwrite the existing Design?</p>"


const pushAllBulkData = (fileList) => {
    let bulkold = []
    const arr = getHead()

    for (let i = 0; i < fileList.length; i++) {

        const obj = {}
        obj.name = fileList[i].name
        obj.file = fileList[i]
        arr.map((e, k) => {
            if (k === 3) {
                const temp = obj.name.split('.')[0].split('-')
                obj['Dm_Variant'] = temp.length === 3 ? temp[2] : temp.length === 2 ? '' : ''
            } else if (k === 1) {
                const temp = obj.name.split('.')[0].split('-')
                obj['Dm_Article'] = temp.length === 3 ? temp[0] : temp.length === 2 ? temp[0] : ''
            } else if (k === 2) {
                const temp = obj.name.split('.')[0].split('-')
                obj['Dm_Design'] = temp.length === 3 ? temp[1] : temp.length === 2 ? temp[1] : temp[0]
            } else if (k === 0) {
                obj['Dm_Design_Code'] = obj.name.split('.')[0]
            } else {
                obj[e] = ''
            }
        })

        bulkold = [...bulkold, obj]
    }
    return bulkold
}

let f = true

const constantValues = ['Dm_Design_Code', 'Dm_Article', 'name', 'file', 'Dm_Design', 'Dm_Variant', 'data', 'Di_Product']
const supportedFiles = ['png', 'jpg', 'bmp', 'jpeg', 'tiff', 'tif', 'dob']

const TopBody = (props) => {
    const [isOpen1, setOpen1] = useState(false)
    const Loop = (pro) => {
        if (props.rollData !== null) {
            return (props.rollData.allDesignTypesByRoles.map((e, k) => {
                return (e.getDesignGroupsByRoleListDto.map((a, b) => {
                    if (f) {
                        pro.setOption(`${e.design_type_id} - ${a.design_groups_id}`)
                        f = false
                    }
                    return (<option
                        designtypeid={e.design_type_id}
                        designgroupid={a.design_groups_id}
                        value={`${e.design_type_id} - ${a.design_groups_id}`}                     
                        name={`${e.design_type_name}-${a.design_groups_name}`}
                    >
                        {`${e.design_type_name}-${a.design_groups_name}`}
                    </option>)
                }))
            }))
        } else {
            return <></>
        }
    }

    const removeAll = () => {
        if (old.length === 0) {
            Swal.fire({
                icon: 'info',
                position: 'center',
                text: 'Please Add Design',
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            props.setremoveAll(true)
        }
    }

    const removebyId = (id = 5) => {

        if (refSelectedId === null && old.length === 0) {
            Swal.fire({
                icon: 'info',
                position: 'center',
                text: 'Please Add Design',
                showConfirmButton: false,
                timer: 2500
            })
        } else if (refSelectedId === null) {
            Swal.fire({
                position: 'center',
                icon: 'info',
                text: 'Please select Design !?',
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            props.setreMoveid({ dontUse: true, use: 5 })
        }
    }

    const [selectedName, setselectedName] = useState()
    return (
        <div className="col-lg-12">
            <div>
                <Col className="col-lg-5 col-md-9 col-sm-12 float-left p-0 leftpanel">
                    <Form className="form-inline">
                        <div className="form-group float-left col-lg-3 col-md-3  col-sm-12 flex-lg-nowrap pl-0 flex-column align-items-start" style={{ justifyContent: 'Left' }}>
                            <Label for="saveFabLibrary" className="col-lg-12 pl-0 justify-content-left" style={{ justifyContent: 'Left' }}>
                                Design Group
                            </Label>
                            <select
                                className="form-control bg-light mr-0 h-25 col-lg-12 w-100  mt-50"
                                id="designTG"
                                value={selectedName}
                                onChange={(e) => {                                  
                                    setselectedName(e.target.value)
                                    props.setOption(e.target.value)
                                }}
                            >
                                {
                                    <Loop setOption={props.setOption} />
                                }
                            </select>
                        </div>
                        <div className="form-group col-lg-3 col-md-3 col-sm-12 p-0 flex-column align-items-start"  style={{ justifyContent: 'Left' }}>
                            <Label for="saveFabLibrary" className="col-lg-12 pl-0 justify-content-left" style={{ justifyContent: 'Left' }}>
                                Type
                            </Label>
                            <select
                                className="form-control bg-light h-25 mr-0 w-100 mt-50"
                                id="Warehouseid"
                            >
                                <option
                                    coltype="development"
                                    isstock="false"
                                    isexclusive="true"
                                    value="cad"
                                >
                                    CAD
                                </option>
                                <option
                                    coltype="development"
                                    isstock="false"
                                    isexclusive="true"
                                    value="sample"
                                >
                                    Sample
                                </option>
                                <option
                                    coltype="development"
                                    isstock="false"
                                    isexclusive="true"
                                    value="yardages"
                                >
                                    Yardages
                                </option>
                                <option
                                    coltype="production"
                                    isstock="true"
                                    isexclusive="false"
                                    value="noos"
                                >
                                    Noos
                                </option>
                                <option
                                    coltype="production"
                                    isstock="true"
                                    isexclusive="false"
                                    value="stock"
                                >
                                    Stock
                                </option>
                            </select>
                        </div>
                        <div className="form-group col-lg-3 col-md-3 col-sm-12 pr-0 flex-column align-items-start" style={{ justifyContent: 'Left' }}>
                            <Label
                                for="status-select"
                                id="selectCustomerSpan"
                                className="col-lg-12 pl-0 justify-content-left" style={{ justifyContent: 'Left' }}
                            >
                                Customer
                            </Label>
                            <select
                                className="form-control bg-light mr-0 h-25 col-lg-12  w-100 mt-50"
                                id="selectCustomer"
                            >
                                <option id="" value="">
                                    Select Customer
                                </option>
                                {
                                    props.customerList.map((e, k) => {

                                        return <option key={e.customer_id} value={e.customer_id}>{e.customer_Name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className="form-group col-lg-3 col-md-3 col-sm-12 pr-0 flex-column align-items-start" style={{ justifyContent: 'Left' }}>
                            <Label
                                for="status-select"
                                id="selectCustomerSpan"
                                className="col-lg-12 pl-0 justify-content-left " style={{ justifyContent: 'Left' }}
                            >
                                Tailor-i Type
                            </Label>
                            <select
                                className="form-control bg-light mr-0 h-25 col-lg-12  w-100 mt-50"
                                id="selectCustomer"
                                defaultValue={`Fabric`}
                                ref={props.Tailori_Type}
                            >
                                <option value="Fabric">
                                    Fabric
                                </option>                               
                                <option value="Contrast">Contrast</option>
                                <option value="Button">Button</option>
                                <option value="Thread">Thread</option>
                            </select>
                        </div>

                    </Form>
                </Col>
                <Col className="col-lg-7 col-md-3 col-sm-12 float-left text-lg-right p-0 rightpanel">
                    <div className="form-group pt-1">
                        <Label
                            className="btn btn-sm btn-primary waves-effect waves-light  mb-1"
                          
                        >
                            <Input
                                id="importFabric"
                                type="file"
                                accept="image/x-png,image/jpeg,image/jpg,image/tiff,image/tif,image/bmp,.dob"
                                multiple="true"
                                onChange={props.handleAttachFIle}
                                style={{ display: "none", padding: "0.486rem 0.5rem" }}
                            />
                            Upload
                        </Label>
                        <Label
                            className="btn btn-sm btn-primary waves-effect waves-light  mb-1"                           
                        >
                            <input id='bulkupload' type="file" onChange={props.handelBulkUpload} style={{ display: "none", padding: "0.486rem 0.5rem" }} />
                            Bulk Upload
                        </Label>
                        <Button
                            type="button"
                            id="saveFabric"
                            disabled={false}
                            className="btn btn-sm btn-success waves-effect waves-light mb-1 mr-50"                           
                            onClick={() => {
                                if (old.length === 0) {
                                    Swal.fire({
                                        icon: 'info',
                                        position: 'center',
                                        text: 'Please Add Design',
                                        showConfirmButton: false,
                                        timer: 2500
                                    })
                                } else {                                    
                                    props.handelOnclick()
                                }
                            }}
                        >
                            Save
                        </Button>
                    
                        <Button
                            type="button"
                            id="removeFabric"
                            className="btn btn-sm btn-light waves-effect waves-light  mb-1"
                            style={{ padding: "0.486rem 0.5rem" }}
                            onClick={() => {                               
                                removebyId(5)
                            }}
                        >
                            Remove
                        </Button>
                  
                      <Button
                            type="button"
                            id="removeAllFabric"
                            className="btn btn-sm btn-light waves-effect waves-light mb-1 mr-2"                           
                            onClick={removeAll}
                        >
                            Remove All
                        </Button>
                        <span className='vertical'> </span>
                        <OpenExportExcel rollData={props.rollData} setOpen1={setOpen1} isOpen1={isOpen1} />
                        <UncontrolledDropdown>
                            <DropdownToggle className='hide-arrow ml-50 bg-secondary d-block text-center' tag='a' style={{ width: '32px', height: '28px' }}>
                                <MoreVertical className='text-white mt-50' size={20} style={{ width: '18px', height: '18px' }} />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <div className='w-100 '>
                                    <label className="custom-file-upload w-100 customdropitem  text-left" title="Import Excel">
                                        <i
                                            className="fas fa-file-import mr-50"
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            data-original-title="Import Excel"
                                        ></i>
                                        <Input
                                            id="importExcelAdd"
                                            type="file"
                                            accept=".xls,.xlsx"
                                            multiple=""
                                            style={{ padding: "0px 0px 0px 0px", display: "none" }}
                                            onChange={(e) => {

                                                if (old.length > 0) {

                                                    readXlsxFile(e.target.files[0]).then((rows) => {

                                                        const arr1 = getHead()
                                                        const temp = arr1
                                                        temp[0] = 'Dm_Design_Code'
                                                        temp[1] = 'Dm_Article'
                                                        temp[2] = 'Dm_Design'
                                                        temp[3] = 'Dm_Variant'
                                                        addXlData(rows, temp)
                                                        props.setxlRerender(true)
                                                        //props.setreRender(true)

                                                        e.target.value = ''
                                                    })
                                                } else {
                                                    Swal.fire({
                                                        icon: 'info',
                                                        position: 'center',
                                                        text: 'Please Add Design',
                                                        showConfirmButton: false,
                                                        timer: 2500
                                                    })
                                                    e.target.value = ''
                                                }

                                            }}
                                        />
                                        Import Excel
                                    </label>


                                </div>
                                <DropdownItem className='w-100'>
                                    <button
                                        type="button"
                                        id="exportExcelAdd"
                                        className="btn btn-sm btn-white text-left outline-none p-0"
                                        onClick={() => {

                                            if (old.length === 0) {
                                                Swal.fire({
                                                    icon: 'info',
                                                    position: 'center',
                                                    text: 'Please Add Design',
                                                    showConfirmButton: false,
                                                    timer: 2500
                                                })
                                            } else {
                                                const arr1 = getHead()
                                                const rowFTdata = []
                                                const rowTableHeader = []
                                                const finalData = []
                                                for (let y = 0; y < arr1.length; y++) {
                                                    rowFTdata[y] = arr1[y]
                                                    rowTableHeader[y] = arr1[y]

                                                    if (y > 3) {
                                                        rowTableHeader[y] = document.getElementById(arr1[y]).innerHTML

                                                    }
                                                }
                                                finalData.push(rowTableHeader)
                                                rowFTdata[0] = 'Dm_Design_Code'
                                                rowFTdata[1] = 'Dm_Article'
                                                rowFTdata[2] = 'Dm_Design'
                                                rowFTdata[3] = 'Dm_Variant'

                                                const AllD = old

                                                for (let data = 0; data < AllD.length; data++) {
                                                    const tempArr = []
                                                    for (let fi = 0; fi < rowFTdata.length; fi++) {
                                                        tempArr[fi] = AllD[data][rowFTdata[fi]]
                                                        if (fi === rowFTdata.length - 1) {
                                                            finalData.push(tempArr)
                                                        }
                                                    }

                                                }

                                                const wb = XLSX.utils.book_new()
                                                wb.Props = {
                                                    Title: "SheetJS Tutorial"
                                                    //Subject: "Test",
                                                    //Author: "Red Stapler",
                                                    //CreatedDate: new Date(2017,12,19)
                                                }
                                                wb.SheetNames.push("Test Sheet")
                                                const ws_data = finalData
                                                const ws = XLSX.utils.aoa_to_sheet(ws_data)
                                                wb.Sheets["Test Sheet"] = ws
                                                const wbout = XLSX.write(wb, {
                                                    bookType: 'xlsx',
                                                    type: 'binary'
                                                })
                                                function s2ab(s) {
                                                    const buf = new ArrayBuffer(s.length)
                                                    const view = new Uint8Array(buf)
                                                    for (let i = 0; i < s.length; i++) {
                                                        view[i] = s.charCodeAt(i) & 0xFF
                                                    }
                                                    return buf

                                                }
                                    
                                                FileSaver.saveAs(new Blob([s2ab(wbout)], {
                                                    type: "application/octet-stream"
                                                }), 'DesignMaster.xlsx')

                                            }
                                        }}
                                    >
                                        <i
                                        className="fas fa-file-export mr-50 "
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title=""
                                        data-original-title="Export Excel"
                                    ></i>
                                        Export Excel
                                    </button>
                                </DropdownItem>
                               

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                
                </Col>
                <UploadProgress />
            </div>
        </div>
    )
}

const ValidateImageName = (str) => {
    const str1 = str.split('.')[0]
    const forchar = str1.match(/[&\/\\#,+$~%.'":*?<>{}]/g) === null && true
    const lenv = str1.length < 50 && true
    console.log(`str:${str1} specialChars:${forchar} length:${lenv}`)
    const ext = supportedFiles.includes(str.split('.')[1].toLowerCase())

    return [forchar, lenv, ext]
}

const getDesignConfigId = (d) => {
    let obj = {}
    try {     
        const current_base = d.allDesignTypesByRoles
        for (let i = 0; i < current_base.length; i++) {
            const new_curent_base = current_base[i].getDesignGroupsByRoleListDto
            for (let j = 0; j < new_curent_base.length; j++) {
                obj[new_curent_base[j].getDesignFeaturesByRoleListDto[0].design_features_id] = new_curent_base[j].getDesignFeaturesByRoleListDto[0].design_configuration_id
            }
        }
    } catch (error) {
        obj = null
    }
    return obj
}

const pObj = {
    fileName: "", //
    fileSize: 0, //
    totalCount: 0,
    outOfCount: 0, //
    sucessCount: 0, //
    failCount: 0, //
    percentage: 0, //
    tempId: 0,
    btnStatus: true,
    passState: false
}

export const oBjreset = () => {
    pObj.fileName = ''
    pObj.totalCount = 0
    pObj.outOfCount = 0
    pObj.sucessCount = 0
    pObj.failCount = 0
    pObj.percentage = 0
    pObj.tempId = 0
    pObj.btnStatus = true
    pObj.passState = false
}
//let constPersent = 0
export const AddDesign = (props) => {
    const [AllFiles, setFiles] = useState(null)
    const [option, setOption] = useState()
    const [rollData, setrollData] = useState(null)
    const [removeAll, setremoveAll] = useState(false)
    const [reMoveid, setreMoveid] = useState({ dontUse: false, use: undefined })

    const [ProgressModel, setProgressModel] = useState(false)
    const [rDel, setrDel] = useState(false)
    const [progressObj, setprogressObj] = useState(pObj)
    const [xlRerender, setxlRerender] = useState(false)
    const [featureTData, setfeatureTData] = useState(null)
    const [percentX, setpercentX] = useState(0) //! Dont remove it 

    const [customerList, setCustomerList] = useState([])

    const Tailori_Type = useRef()


    const cb = (name, totalCount, fileno, status, Fsize) => {
        updatecheckforUpload(true)      

        pObj.fileName = name
        pObj.totalCount = totalCount
        pObj.outOfCount = fileno + 1
        pObj.sucessCount = status && status !== null ? pObj.sucessCount + 1 : pObj.sucessCount
        pObj.failCount = !(status) && status !== null ? pObj.failCount + 1 : pObj.failCount
        pObj.percentage = (((1 / totalCount) * 100) / 2) + pObj.percentage
        pObj.fileSize = Fsize

        setprogressObj(pObj)
        setpercentX(pObj.percentage)
        setProgressModel(true)
        if (pObj.outOfCount === pObj.totalCount) {
            if (!forBtn) {
                pObj.btnStatus = false
                forBtn = true
                updatecheckforUpload(false)
            } else {
                forBtn = false
            }
            pObj.passState = setProgressModel
            setprogressObj(pObj)            
        }
      
    }

    useEffect(async () => {
        if (props.modal) {
            const response = await axios.get(`./Design/GetRoleDesignConfigurationByRole?RoleId=${0}`)
            //const constArr = ['warehouse', 'product', 'rating', 'price', 'credit', 'date', 'stock']  Abhishek
            const constArr = ['warehouse']
            response.data.allDesignTypesByRoles.forEach((e, k) => {
                e["getDesignGroupsByRoleListDto"].forEach((a, c) => {
                    a["getDesignFeaturesByRoleListDto"].forEach((b, cc) => {
                   if (constArr.includes(response.data.allDesignTypesByRoles[k].getDesignGroupsByRoleListDto[c].getDesignFeaturesByRoleListDto[cc].design_features_name.toLowerCase())) {
                       delete response.data.allDesignTypesByRoles[k].getDesignGroupsByRoleListDto[c].getDesignFeaturesByRoleListDto[cc]
                   }
                    })
                    response.data.allDesignTypesByRoles[k].getDesignGroupsByRoleListDto[c].getDesignFeaturesByRoleListDto = a["getDesignFeaturesByRoleListDto"].filter((e) => {
                        return e !== null
                    })
                })
            })
            setrollData(response.data)

            const resGetFt = await axios.get(`./Design/GetFeatureTypeList`)

            setfeatureTData(resGetFt.data)

            if (document.getElementById('bulkupload') !== null) {
                document.getElementById('bulkupload').setAttribute('webkitdirectory', true)
                document.getElementById('bulkupload').setAttribute('mozdirectory', true)
            }

            const getCustList = await axios.get(`./Design/GetCustomerList`)
            setCustomerList(getCustList.data.customerListDto)
        }
        /* try {
            document.getElementById("#collectionFabLibrary").value
        } catch (e) {
            
        } */
        f = true
    }, [props.modal])

    const handleAttachFIle = (e) => {

        //ToDo: could do some validation for the attached file here   
        const validArr = []
        const err = []
        let namehtml = ''
        //let lenhtml  = ''
        let a = false
        let b = false
        //let errorState = null // set -> 0 for str 1 for len 2 for both 
        Array.from(e.target.files).map((f, k) => {
            const [strValid, lenValid] = ValidateImageName(f.name)
            if (strValid && lenValid) {
                validArr.push(f)
            } else {
                if (strValid === false) {
                    namehtml += `<li><b>${f.name}</b></li>`
                    a = true
                } else if (lenValid === false) {
                    namehtml += `<li><b>${f.name}</b></li>`
                    b = true
                }
                err.push(`${f.name}<br>`)
            }
        })


        if (err.length > 0) {
            let msg = ''
            if (a && b) {
                //both 
                msg = `This File Name Contains Special Characters -<br> "(/[&\/\\#,+$~%.'":*?<>{}]/)" <br> and Length Should Less Than 50 Characters`
            } else if (a) {
                //for spl char
                msg = `This File Name contains special characters -<br> "(/[&\/\\#,+$~%.'":*?<>{}]/)" `
            } else if (b) {
                //for length 
                msg = `File Name Length Should Less Than 50 Characters`
            }
            Swal.fire({
                // title: 'File Name Validation',      
                html: `<div id='tt'><br><h3>${msg}</h3><div class='popupscroll'><ol class="listname">${namehtml}</ol></div></div>`
            })
        }
        setFiles(validArr)
        //
        setTimeout(() => {
            e.target.value = ""
        }, 200)

    }

    //! Save->All
    const handelOnclick = async (dontuse, useMe) => {
        //const constantValues = ['Design Code', 'Article', 'name', 'file', 'Design', 'Variant', 'data']
        //for All
        const temp_arr = []
        //Remove some if not all 
        const temp_rr = []
        //! remove id once done 
        const Dlocation = []
        // imp send it to server 
        const DName = []

        // For Design Code Check
        const DCodeName = []

        // if note uploaded
        const notuploaded = []
        // if ss
        const ss = []
        //
        let done = []
        //
        const Duplicate = []
        let DuplicateString = ``
        const DCode = [] //set at top
        let DcodeString = ``
        //const d = getDesignConfigId(rollData)
        const cut_id = document.getElementById('selectCustomer').value

        let namehtml1 = ''
        const objectData = useMe === undefined ? old : useMe
        let isMandatory = false
        objectData.map((e, k) => {

            const obj = {}
            const tmp = []
            const Features_Dic = []
                for (const key in e) {
                    if (MandatoryOptionsId[key]) {
                        if (e[key] === "") {
                            isMandatory = true
                        }
                    }
                    if (constantValues.includes(key)) {
                        obj[key] = e[key]

                        if (key === 'Dm_Design_Code') {
                            if (DName.includes(e[key])) {

                                if (!(Duplicate.includes(e[key]))) {
                                    Duplicate.push(e[key])
                                    DuplicateString += `<li>${e[key]}</li>`
                                }
                            }
                            DName.push(e[key])
                            if (e[key].split('-').length !== 3) {
                                DCode.push(k)
                                DcodeString += `<li>${objectData[k].Dm_Design_Code}</li>`
                            }
                        }
            /*  else if (key === 'Dm_Design_Code' && useMe === undefined) {
            
              if (e[key].split('-').length !== 3) {
                DCode.push(k)
                DcodeString += `<li>${objectData[k].Dm_Design}</li>`
              }
            } */
                    } else {
                        const vs = {}
                        const fd = {}
                        vs['dd_details_id'] = 0
                        vs['dd_dm_id'] = 0
                        vs['dd_feature_id'] = key
                        vs['dd_feature_type_id'] = 0
                        vs['dd_feature_type_name'] = e[key]
                        vs['dd_design_configuration_id'] = document.getElementById(key).getAttribute('c_id') //ToDo : pass id 
                        //Features_Dic[document.getElementById(key).textContent] = e[key] 
                        if (e[key] !== "") {
                            fd['Featurename'] = document.getElementById(key).textContent.trim()
                            fd['FeatureTypename'] = e[key]
                            Features_Dic.push(fd)
                        }
                        tmp.push(vs)
                    }
            }

            delete obj['name']
            delete obj['data']
            obj['State'] = 0
            obj['IsImageUpdate'] = true
            obj['Abhi'] = "true"
            obj['Dm_Design_Id'] = 0
            obj['Dm_DesignType_Id'] = document.getElementById('designTG').value.split('-')[0].trim()
            obj['Dm_Design_Group_Id'] = document.getElementById('designTG').value.split('-')[1].trim()
            obj['CollectionId'] = props.IdData.Collection_Id
            obj['SeasonId'] = props.IdData.Season_Id
            //obj['Di_State'] = document.getElementById('Warehouseid').value //cad,noos,stock
            // obj['De_Customer_Id'] = document.getElementById('selectCustomer').value
            obj['SaveExclusiveDesignRequestDto'] = {
                De_Exclusive_Id: cut_id === "" ? "0" : "1",
                De_Customer_Id: cut_id === '' ? "0" : cut_id
            }
            obj['SaveInventoryDesignRequestDto'] = {
                Di_State: document.getElementById('Warehouseid').value, //Cad,Stock
                //Di_Product: obj['Di_Product'],  //TODO
                //Di_Product: e[`${STANDARD.PRODUCT !== null ? STANDARD.Product : ''}`],
                //Di_Product: e[`${STANDARD.Di_Product !== null ? STANDARD.Di_Product : ''}`],
                Di_Tailori_Type: Tailori_Type.current ? Tailori_Type.current.value  : "", 
                Di_Product: e[`${STANDARD.PRODUCT !== null ? STANDARD.PRODUCT : ''}`],
                Di_Price:e[`${STANDARD.PRICE_ID !== null ? STANDARD.PRICE_ID : ''}`],
                Di_Stock:e[`${STANDARD.STOCK !== null ? STANDARD.STOCK : ''}`],
                Di_Credit:e[`${STANDARD.CREDIT !== null ? STANDARD.CREDIT : ''}`],
                Di_Rating:e[`${STANDARD.RATING !== null ? STANDARD.RATING : ''}`] 
            }
            obj['Features_Dic'] = JSON.stringify(Features_Dic.length === 0 ? 0 : Features_Dic)
            obj['FeatureList'] = JSON.stringify(tmp)
            delete obj['Di_Product']
            temp_arr.push(obj)
        })
        if (document.getElementById('bulkupload').value === '') {
            if (isMandatory) {
                isMandatory = false
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please fill in the required filed (highlighted in red) before save!'
                })
                return
            }
        }
        const sknos = ['noos', 'stock'].includes(document.getElementById('Warehouseid').value.toLowerCase())
        if (Duplicate.length > 0) {
            console.log(DuplicateString)
            await Swal.fire({
                position: 'center',
                icon: 'info',
                html: `<h3>Duplicate Design Code Found.</h3><br><div class='popupscroll'><ol style="text-align: left;">${DuplicateString}</ol></div>`, //DuplicateString
                showConfirmButton: true
            })
            return
        } else if (DCode.length > 0 && sknos && useMe === undefined) {
            await Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please Fill Article,Design & Varient',
                html: `<div class='popupscroll'><ol class="listname">${DcodeString}</ol></div>`,
                showConfirmButton: true
            })
            return
        } else if (useMe !== undefined && DCode.length > 0 && sknos) {
            let rs = false
            await Swal.fire({
                position: 'center',
                icon: 'warning',
                /*title: `Your Design Doesn't Contain Article OR Design OR Varient`,*/
                html: `<div class='popupscroll'><ol class="listname">${DcodeString}</ol></div>`,
                showConfirmButton: true,
                confirmButtonText: `Don't overwrite`,
                denyButtonText: `overwrite`
            }).then((result) => {
                if (result.isConfirmed) {
                    DCode.map((e, k) => {

                    })
                } else if (result.isDenied) {
                    rs = true
                }
            })

            if (!rs) {
                return
            }
        }
        const existNameList = await getExistDname(DName)

        if (existNameList === null || existNameList.existingDesigns === null) {
            await Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Some thing went wrong please try again..',
                //html: `<ol class="listname">${namehtml1}</ol>`,
                showConfirmButton: true
            })
            return
        }

        const existNamearr = Object.keys(existNameList.existingDesigns)

        let htmlli = ''
        for (let i = 0; i < existNamearr.length; i++) {
            htmlli += `<li>${existNamearr[i]}</li>`
        }

        const newarr = []
        let skiphtml = ``
        const skiparr = []
        let overWrite = ''
        //After Skip after other 
        const temp_final = []
        if (existNamearr.length > 0) {

            existNamearr.forEach((e, k) => {
                const currentTPGP = `${document.getElementById('designTG').value.split('-')[0].trim()}-${document.getElementById('designTG').value.split('-')[1].trim()}`
                const pastTPGP = `${existNameList.existingDesigns[e].split(',')[1]}-${existNameList.existingDesigns[e].split(',')[2]}`
                //if (document.getElementById('designTG').value.split('-')[0].trim() !== existNameList.existingDesigns[e].split(',')[1]  && document.getElementById('designTG').value.split('-')[1].trim() !== existNameList.existingDesigns[e].split(',')[2]) {

                if (currentTPGP !== pastTPGP) {
                    skiphtml += `<li>${e}</li>`
                    skiparr.push(e)
                } else {
                    newarr.push(e)
                    overWrite += `<li>${e}</li>`
                    //
                }
            })
            for (const e in temp_arr) {
                if ((skiparr.includes(temp_arr[e].Dm_Design_Code))) {
                    delete temp_arr[parseInt(e)]
                } else {
                    temp_final.push(temp_arr[parseInt(e)])
                }
            }
            const skipText = "<h2>Design is already exist.</h2> <p>This Design name is already exist in other Product Group</p>"
            const skipMSG = `<br><div class='popupscroll'><ol style="text-align: left;">${skiphtml}</ol></div>`

            if (skiparr.length > 0) {
                await Swal.fire({
                    html: `${skipText}<div class='popupscroll'><ol style="text-align: left;">${skipMSG}</ol></div>`,
                    confirmButtonText: `Skip`
                }).then(async (result) => {
                    if (result.isConfirmed) {

                    }
                })
            }

            if (newarr.length > 0) {
                //ToDo Updatae this ->

                await Swal.fire({
                    html: `${overwriteMSG}<div class='popupscroll'><ol style="text-align: left;">${overWrite}</ol></div>`,
                    showDenyButton: true,
                    confirmButtonText: `Don't overwrite`,
                    denyButtonText: `overwrite`
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        for (const e in temp_final) {
                            //! -> Pass New arr
                            if ((newarr.includes(temp_final[e].Dm_Design_Code))) {
                                delete temp_final[parseInt(e)] //! this has to skip 
                            } else {
                                //! -> new Arr will fill
                                temp_rr.push(temp_final[parseInt(e)])
                            }
                        }

                        done = await uploadFile(temp_rr, cb)
                        setProgressModel(false)
                    } else if (result.isDenied) {
                        for (const e in temp_final) {
                            if ((newarr.includes(temp_final[e].Dm_Design_Code))) {
                                temp_final[parseInt(e)].State = 2
                                temp_final[parseInt(e)].Dm_Design_Id = existNameList.existingDesigns[temp_final[parseInt(e)].Dm_Design_Code].split(',')[0]
                            }
                        }

                        done = await uploadFile(temp_final, cb)
                    }
                })
            }

        } else {

            done = await uploadFile(temp_arr, cb)
 
        }

        done.forEach((e, k) => {
            if (!(Object.values(e)[0])) {
                notuploaded.push(Object.keys(e)[0])
                namehtml1 += `<li>${Object.keys(e)[0]}</li>`
            } else {
                ss.push(Object.keys(e)[0])
            }
        })

        if (notuploaded.length > 0 && useMe === undefined) {
            deleteRowUploaded(notuploaded)
            setrDel(true)
        } else if (useMe === undefined) {
            deleteRowUploaded(notuploaded)
            setrDel(true)
        }
    }

    const handelBulkUpload = async (e) => {
        const validArr = []
        const err = []
        let namehtml = ''

        let a = false
        let b = false

        const skipFileArray = []
        const uniqFileArray = []
        let skipFname = ''
        // const Duplicate = []
        //let DuplicateString = ``

        //let errorState = null // set -> 0 for str 1 for len 2 for both 
        Array.from(e.target.files).map((f, k) => {
            const [strValid, lenValid, ext] = ValidateImageName(f.name)
            if (ext) {
                if (strValid && lenValid) {

                    if (!uniqFileArray.includes(f.name.split(".")[0])) {
                        uniqFileArray.push(f.name.split(".")[0])
                        validArr.push(f)
                    } else {
                        skipFname += `<li><b>${f.name}</b></li>`
                        skipFileArray.push(f.name)
                    }
                } else {
                    if (strValid === false) {
                        namehtml += `<li><b>${f.name}</b></li>`
                        a = true
                    } else if (lenValid === false) {
                        namehtml += `<li><b>${f.name}</b></li>`
                        b = true
                    }
                    err.push(`${f.name}<br>`)
                }
            }
        })

        const bulkobjData = pushAllBulkData(validArr)

        if (err.length > 0) {
            let msg = ''
            if (a && b) {
                //both 
                msg = `This File Name Contains Special Characters -<br> "(/[&\/\\#,+$~%.'":*?<>{}]/)" <br> and Length Should Less Than 50 Characters`
            } else if (a) {
                //for spl char
                msg = `This File Name contains special characters -<br> "(/[&\/\\#,+$~%.'":*?<>{}]/)" `
            } else if (b) {
                //for length 
                msg = `File Name Length Should Less Than 50 Characters`
            }
            await Swal.fire({
                html: `<div id='tt'><h3>${msg}</h3><div class='popupscroll'><ol class="listname">${namehtml}</ol></div><h3>Do You Want To Continue.</h3></div>`,
                showDenyButton: true,
                confirmButtonText: `Yes`,
                denyButtonText: `No`
            }).then(async (result) => {
                if (result.isConfirmed) {
                    //handelOnclick(null, bulkobjData)
                    if (skipFname.length > 0) { //
                        const msg1 = `Duplicate Design Name Found`
                        await Swal.fire({
                            html: `<div id='tt'><br><h3>${msg1}</h3><div class='popupscroll'><ol class="listname">${skipFname}</ol></div><br><h3>Do You Want To Continue.</h3></div>`,
                            showDenyButton: true,
                            confirmButtonText: `Yes`,
                            denyButtonText: `No`
                        }).then(async (result) => {
                            if (result.isConfirmed) {

                                handelOnclick(null, bulkobjData)
                            }
                        })
                    } else {
                        handelOnclick(null, bulkobjData)
                    }
                }
            })
            //handelOnclick
        } else {
            //uploadFile(bulkobjData, cb)
            //handelOnclick(null, bulkobjData)
            if (skipFname.length > 0) { //
                const msg1 = `Duplicate Design Name Found`
                await Swal.fire({
                    html: `<div id='tt'><br><h3>${msg1}</h3><div class='popupscroll'><ol class="listname">${skipFname}</ol></div><br><h3>Do You Want to continue.</h3></div>`,
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`
                }).then(async (result) => {
                    if (result.isConfirmed) {

                        handelOnclick(null, bulkobjData)
                    }
                })
            } else {
                handelOnclick(null, bulkobjData)
            }
        }
        //ToDo: set a Bulk state 
        setTimeout(() => {
            e.target.value = ""
        }, 200)
    }

    const uploadSingleFile = async (id) => {
        if (id !== null) {
            //const d = getDesignConfigId(rollData)
            const temp_arr = []
            const e = old[id]
            const obj = {}
            const tmp = []
            const sknos = ['noos', 'stock'].includes(document.getElementById('Warehouseid').value.toLowerCase())
            const cut_id = document.getElementById('selectCustomer').value
            if (sknos && e.Dm_Design_Code.split('-').length !== 3) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Please Fill Article,Design & Varient',
                    // html: `<ol class="listname">${e.Dm_Design}</ol>`,
                    showConfirmButton: true
                })
                return
            }

            const Features_Dic = []
            for (const key in e) {
                if (constantValues.includes(key)) {
                    obj[key] = e[key]
                } else {
                    const fd = {}
                    const vs = {}
                    vs['dd_details_id'] = 0
                    vs['dd_dm_id'] = 0
                    vs['dd_feature_id'] = key 
                    vs['dd_feature_type_id'] = 0
                    vs['dd_feature_type_name'] = e[key]

                    vs['dd_design_configuration_id'] = document.getElementById(key).getAttribute('c_id')
                    if (e[key] !== "") {

                        //Features_Dic[document.getElementById(key).textContent] = e[key]
                        fd['Featurename'] = document.getElementById(key).textContent.trim()
                        fd['FeatureTypename'] = e[key]
                        Features_Dic.push(fd)
                        //fd[document.getElementById(key).textContent] = e[key]          
                    }
                    tmp.push(vs)
                }
            }

            delete obj['name']
            delete obj['data']
            obj['State'] = 0
            obj['Dm_Design_Id'] = 0
            obj['IsImageUpdate'] = true
            obj['Abhi'] = "true"
            obj['Dm_DesignType_Id'] = document.getElementById('designTG').value.split('-')[0].trim()
            obj['Dm_Design_Group_Id'] = document.getElementById('designTG').value.split('-')[1].trim()
            obj['CollectionId'] = props.IdData.Collection_Id
            obj['SeasonId'] = props.IdData.Season_Id
            //obj['Di_State'] = document.getElementById('Warehouseid').value //cad,noos,stock
            // obj['De_Customer_Id'] = document.getElementById('selectCustomer').value
            obj['FeatureList'] = JSON.stringify(tmp)
            obj['SaveExclusiveDesignRequestDto'] = {
                De_Exclusive_Id: cut_id === "" ? "0" : "1",
                De_Customer_Id: cut_id === '' ? "0" : cut_id
            }
            obj['SaveInventoryDesignRequestDto'] = {
                Di_State: document.getElementById('Warehouseid').value, //Cad,Stock
                //Di_Product: obj['Di_Product'],  //TODO
                Di_Product: e[`${STANDARD.PRODUCT !== null ? STANDARD.PRODUCT : ''}`],
                Di_Price:e[`${STANDARD.PRICE_ID !== null ? STANDARD.PRICE_ID : ''}`],
                Di_Stock:e[`${STANDARD.STOCK !== null ? STANDARD.STOCK : ''}`],
                Di_Credit:e[`${STANDARD.CREDIT !== null ? STANDARD.CREDIT : ''}`],
                Di_Rating:e[`${STANDARD.RATING !== null ? STANDARD.RATING : ''}`] 
            }
            //obj['Features_Dic'] = JSON.stringify(Features_Dic)
            obj['Features_Dic'] = JSON.stringify(Features_Dic.length === 0 ? 0 : Features_Dic)
            delete obj['Di_Product']
            temp_arr.push(obj)

            const existNameList = await getExistDname([obj['Dm_Design_Code']])

            if (existNameList === null || existNameList.existingDesigns === null) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Some thing went wrong please try again..',
                    //html: `<ol class="listname">${namehtml1}</ol>`,
                    showConfirmButton: true
                })
                return
            }
            const existNamearr = Object.keys(existNameList.existingDesigns)

            if (existNamearr.length > 0) {
                //ToDo: Working
                const tpgpid = Object.values(existNameList.existingDesigns)[0].split(',')
                if (document.getElementById('designTG').value.split('-')[0].trim() !== tpgpid[1] || document.getElementById('designTG').value.split('-')[1].trim() !== tpgpid[2]) {
                    const overwriteMSG1 = "<h2>Design name is already exist in another product group.</h2> <p>Do you want to skip or cancel ?</p>"
                    await Swal.fire({
                        html: `${overwriteMSG1}`,
                        showDenyButton: true,
                        confirmButtonText: `cancel`,
                        denyButtonText: `skip`
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            //! if -> yes Dont't do any thing 

                        } else if (result.isDenied) {

                        }
                    })
                    return
                }
                await Swal.fire({
                    html: `${overwriteMSG}`,
                    showDenyButton: true,
                    confirmButtonText: `Don't overwrite`,
                    denyButtonText: `overwrite`
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        //! if -> yes Dont't do any thing 
                    } else if (result.isDenied) {
                        temp_arr[0].State = 2
                        temp_arr[0].Dm_Design_Id = existNameList.existingDesigns[existNamearr[0]].split(',')[0]
                        const done = await uploadFile(temp_arr, cb)

                        //setProgressModel(false)
                        if (done[0][Object.keys(done[0])[0]] === true || done[0][Object.keys(done[0])[0]] === 'true') {
                            //alert('File Uploaded ??')
                            setreMoveid({ dontUse: true, use: 5 })
                            // ToDo : show status in upload popup 
                        }
                        /* else {
                          //alert('Not saved ??')
                          Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Your Design is not saved',
                            showConfirmButton: true
                          })
                        } */
                    }
                })
            } else {

                //ToDo : pass cb function 
                //
                const done = await uploadFile(temp_arr, cb)
                if (done[0][Object.keys(done[0])[0]] === true || done[0][Object.keys(done[0])[0]] === 'true') {
                    /* Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Your Design has been saved',
                      showConfirmButton: true
                    }) */
                    setreMoveid({ dontUse: true, use: 5 })
                }
                /* else {
                 //alert('Not saved ??')
                 Swal.fire({
                   position: 'center',
                   icon: 'warning',
                   title: 'Your Design is not saved',
                   showConfirmButton: true
                 })
               } */
            }
        } else {
            //alert('Please select !?')
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please select Design !?',
                showConfirmButton: true
            })
        }
    }

    return (
        <div>
            <Modal
                isOpen={props.modal}
                toggle={props.toggle}
                keyboard={false}    //  keyboard={false}  for close window 
                className="add_my_design modal-xl shadow-none"
                style={{
                    width: "100%",
                    margin: "0",
                    maxWidth: "100%",
                    height: "100vh",
                    background: "#fff",
                    overflow: "hidden"
                }}
            >
                <ModalHeader toggle={props.toggle}>Add Design</ModalHeader>
                <Form>
                    <ModalBody className="px-0">
                        {
                            //**TopBody or TopBar */
                        }
                        <TopBody setUploadFile={props.setUploadFile}
                        Tailori_Type={Tailori_Type}
                            handleAttachFIle={handleAttachFIle}
                            handelOnclick={handelOnclick}
                            uploadSingleFile={uploadSingleFile}
                            removeAll={removeAll}
                            setremoveAll={setremoveAll}
                            rollData={rollData}
                            setreMoveid={setreMoveid}
                            setOption={setOption}
                            setxlRerender={setxlRerender}
                            handelBulkUpload={handelBulkUpload}
                            customerList={customerList}
                        />

                        <ContentTable
                            
                            files={AllFiles}
                            setFiles={setFiles}
                            rollData={rollData}
                            removeAll={removeAll}
                            reMoveid={reMoveid}
                            setreMoveid={setreMoveid}
                            setremoveAll={setremoveAll}
                            setxlRerender={setxlRerender}
                            xlRerender={xlRerender}
                            featureTData={featureTData}
                            option={option}
                            rDel={rDel}
                            setrDel={setrDel}
                            myColour={props.myColour}
                        />
                        <MyModel ProgressModel={ProgressModel} ProgressObj={progressObj} />                   
                        <></>
                    </ModalBody>
                </Form>
                <br />
            </Modal>

        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setUploadFile: files => dispatch(setUploadFile(files))
})

export default connect(null, mapDispatchToProps)(AddDesign)

//export default AddDesign;
