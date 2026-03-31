import React, { useState, useEffect, useRef } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Label,
    Col,
    Row,
    Input
} from "reactstrap"
import ContentTable, { old } from "./ContentTable"
import { connect } from 'react-redux'
import { setUploadFile } from '../redux/uploadFile/uploadFile.actions'
import UploadProgress from '../UploadProgress/UploadProgress'
import './../ThreedStyle.css'
import Example from "./MultiSelect"
import axios from 'axios'
import { Threedold, threeDImages as temp3d, currentselected, DelIndex, setCurrentselected, Push, priSave, saveThreedImage } from './Tableold'
//import { swal } from 'sweetalert'
import { R_Loader } from '../../../../views/loader/loader'
import { data } from "jquery"

const Swal = require('sweetalert2')

export const getHead = () => {
    const arr = []
    try {
        const a = document.getElementById('main-thead').firstElementChild.cells
        for (let index = 2; index < a.length; index++) {
            arr.push(a[index].innerText)
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

//let f = true
const TopBody = (props) => {
    const modifyobj = {}
    const removeAll = async () => {
        const test = Threedold
        const TdImageName = test.map((e, i) => {
            return e.td_Threed_Image_Name
        })
        const res = await axios.get(`./ThreeD/RemoveTdImage?TdImageName=${TdImageName.join()}`)
        if (Threedold.length > 0) {
            props.setChangeFile(!props.changeFile)
        } else {
            alert("plz add some")
        }
    }

    const removebyId = () => {
        if (Threedold.length > 0) {
            currentselected.isDel = !currentselected.isDel
            props.setreMoveid(!props.reMoveid)
        } else {
            alert("plz add some")
        }
    }

    const loaderRef = useRef(null)

    return (
        <div className="col-lg-12">
            <div>
                <Col className="col-xl-4 col-lg-4 col-md-4 col-sm-12 float-left p-0 leftpanel">
                    <Form className="form-inline">
                        <div className="form-group float-left col-lg-12 col-md-12 col-sm-12 flex-lg-nowrap pl-0">
                            <Label for="saveFabLibrary" className="col-lg-12 pl-0 justify-content-left" style={{ justifyContent: 'Left' }}>
                                {props.subheadername} Upload 3d Images and Product Name
                            </Label>

                        </div>
                    </Form>
                </Col>
                <Col className="col-xl-8 col-lg-8 col-md-8 col-sm-12 float-left text-lg-right p-0 rightpanel">
                    <div className="form-group mb-0">

                        {!props.topbarstate ? <Button
                            type="button"
                            id="importFabricButton"  // Change ID for the Button
                            className="btn btn-sm btn-primary waves-effect waves-light mb-1"
                            style={{ marginRight: "4px", padding: "0.486rem 0.5rem" }}
                            onClick={async () => {
                                if (currentselected.id !== null) {
                                    await removebyId(5)
                                    document.getElementById('importFabricInput').click()
                                } else {
                                    alert("plz select row")
                                }
                                props.browseRef.current = true
                            }}
                        > Browse
                        </Button> : <Button
                            type="button"
                            id="importFabricButton"  // Change ID for the Button
                            className="btn btn-sm btn-primary waves-effect waves-light mb-1"
                            style={{ marginRight: "4px", padding: "0.486rem 0.5rem" }}
                            onClick={async () => {
                                document.getElementById('importFabricInput').click() // Trigger the file input click after removal
                            }}
                        > Upload
                        </Button>}
                        <Input
                            id="importFabricInput"  // Change ID for the Input to be unique
                            type="file"
                            accept=".3dc,.3dp,.3dg,.3df,.3dq"
                            multiple={true}  // Ensure multiple is set as a boolean, not a string
                            onChange={props.handleAttachFIle} // Handle file upload after removal
                            style={{ display: "none", padding: "0.486rem 0.5rem" }}
                        />
                        {props.topbarstate &&
                            <Button
                                type="button"
                                id="removeFabric"
                                className="btn btn-sm btn-light waves-effect waves-light  mb-1"
                                style={{ marginRight: "4px", padding: "0.486rem 0.5rem" }}
                                onClick={() => {

                                    removebyId(5)
                                }}
                            >
                                Remove
                            </Button>}
                        {props.topbarstate &&
                            <Button
                                type="button"
                                id="removeAllFabric"
                                className="btn btn-sm btn-light waves-effect waves-light mb-1"
                                style={{ marginRight: "4px" }}
                                onClick={removeAll}
                            >
                                Remove All
                            </Button>}
                        <Button
                            type="button"
                            id="saveAllFabric"
                            className="btn btn-sm btn-success waves-effect waves-light mb-1"
                            style={{ marginRight: "4px" }}
                            onClick={() => {
                                if (props.DispalyNameRef.current.value.trim().length > 0) {
                                    priSave((el) => {
                                        props.loaderRef.current.style.display = 'block'
                                        if (props.browseRef.current === true) {
                                            el[0].state = 2 // Set state to 2
                                            el[0].td_Threed_Image_Id = props.editobj.TdImageId // Set td_Threed_Image_Id to props.editobj.TdImageId
                                            el[0].isimageupdate = true
                                        }
                                        // props.loaderRef.current.style.display = 'block'
                                        saveThreedImage(el).then(e => {
                                            const res = e.data ? JSON.parse(e.data) : false
                                            if (res) {
                                                if (res.isSave) {
                                                    Swal.fire({
                                                        title: 'success',
                                                        text: '3D save successfully.'
                                                    })
                                                    props.forceRerender()
                                                }
                                                props.loaderRef.current.style.display = 'none'
                                            } else {
                                                props.loaderRef.current.style.display = 'none'
                                                Swal.fire({
                                                    title: 'oops!',
                                                    text: '3D not save.'
                                                })
                                            }
                                        }).catch(error => {
                                            props.loaderRef.current.style.display = 'none'
                                            Swal.fire({
                                                title: 'oops!',
                                                text: '3D not save.'
                                            })
                                            console.error(error)
                                        })
                                    })
                                }
                            }}
                        >
                            Save
                        </Button>


                        {/* { !props.topbarstate &&   <Button className="btn btn-sm btn-success waves-effect waves-light mb-1">Browse</Button>  } */}

                        {/* { props.topbarstate &&
                        <Button
                            type="button"
                            id="saveAllFabric"
                            className="btn btn-sm btn-success waves-effect waves-light mb-1"
                            style={{ marginRight: "4px" }}
                            onClick={props.handelOnclick}                     
                        >
                            Save All
            </Button>} */}

                    </div>
                </Col>
                <UploadProgress />
            </div>
            {/* <R_Loader loaderRef={loaderRef} /> */}

        </div>
    )
}

export const ThreeD_Design = (props) => {
    const { PrOrList } = props
    const [AllFiles, setFiles] = useState(null)
    const [option, setOption] = useState()
    const [rollData, setrollData] = useState(null)
    const [changeFile, setChangeFile] = useState(false)
    const [reMoveid, setreMoveid] = useState(true)
    const [tableData, setTableData] = useState([])
    const [NewFileName, setNewFileName] = useState('')
    const Swal = require('sweetalert2')
    const loaderRef = useRef(null)
    const browseRef = useRef(false)
    const DispalyNameErrorRef = useRef(null)
    const DispalyNameRef = useRef(null)
    const DispalyNameOnChange = (e) => {
        const userInput = e.target.value.trim()
        if (userInput.length > 0 && DispalyNameRef.current.value.trim().length > 0 && DispalyNameRef.current.value.trim().length <= 50) {
            DispalyNameErrorRef.current.textContent = ''
        } else if (DispalyNameRef.current.value.trim().length > 50) {
            DispalyNameErrorRef.current.textContent = 'Display Name must have at most 50 alphanumeric character'
        } else {
            DispalyNameErrorRef.current.textContent = 'Display Name Required '
        }
    }
    const removeAll = async () => {
        const test = Threedold
        const TdImageName = test.map((e, i) => {
            return e.td_Threed_Image_Name
        })
        if (test.length > 0) {
            const res = await axios.get(`./ThreeD/RemoveTdImage?TdImageName=${TdImageName.join()}`)
        }
        if (Threedold.length > 0) {
            setChangeFile(!changeFile)
        }
    }
    useEffect(async () => {
    }, tableData)
    const handleAttachFIle = async (e) => {
        loaderRef.current.style.display = 'block'
        const arr = []
        let IsModified = false
        //JSON.parse(res.data)
        Array.prototype.forEach.call(e.target.files, async file => {
            try {
                const file_length = e.target.files.length
                if (file_length > 3) {
                    loaderRef.current.style.display = 'none'
                    Swal.fire({
                        icon: 'info',
                        title: 'alert',
                        text: 'You can only upload a maximum of 3 files.'
                    })
                    return
                }
                const file_name = Object.values(e.target.files).map((e) => e['name']) //Array format
                if (browseRef.current === false) {
                    const test = await axios.get(`./ThreeD/CheckTdImagePresent?file_name=${file_name.join()}`)
                    if (test.data === "true") {
                        loaderRef.current.style.display = 'none'
                        Swal.fire({
                            icon: 'error',
                            title: 'Exist',
                            text: '3DImage Name already exists!!'
                        })
                        return
                    }
                }
                const formPayload = new FormData()

                if (browseRef.current === true) {
                    IsModified = true
                    if (e.target.files.length > 0) {
                        const originalFile = e.target.files[0]
                        //NewFileName =  e.target.files[0].name.split(".")[0]
                        const extension = originalFile.name.split('.').pop()
                        const oldFilename = `${props.editdata[0].td_Threed_Image_Name}.${extension}`

                        // Create a new File object with the new filename
                        const renamedFile = new File([originalFile], oldFilename, { type: originalFile.type })

                        // Append the new file to formPayload
                        formPayload.append(file.name, renamedFile)
                        formPayload.append('TdImageId', props.editobj.TdImageId)
                    }
                } else {
                    formPayload.append(file.name, file)
                }
                //formPayload.append('IsModified', true)
                const res = await axios.post(`./ThreeD/Upload3DImages?IsModified=${IsModified}&NewFileName=${NewFileName}`, formPayload) //ToDo : Woking 
                //const res = await axios.post(`./ThreeD/Upload3DImages?IsModified=${IsModified}`, formPayload)
                if (JSON.parse(res.data)?.length > 0 && JSON.parse(res.data) !== false) {
                    const data = JSON.parse(res.data)
                    if (browseRef.current === true) {
                        data[0].td_Tryon_Type = props.editdata[0]?.td_Tryon_Type ? props.editdata[0].td_Tryon_Type : ''
                        data[0].td_Tryon_Gender = props.editdata[0]?.td_Tryon_Gender ? props.editdata[0].td_Tryon_Gender : ''
                        data[0].td_Sub_Category = props.editdata[0]?.td_Sub_Category ? props.editdata[0].td_Sub_Category : ''
                        data[0].td_Credit = props.editdata[0]?.td_Credit ? props.editdata[0].td_Credit : 1
                        data[0].td_Threed_Image_Display_Name = props.editdata[0]?.td_Threed_Image_Display_Name ? props.editdata[0].td_Threed_Image_Display_Name : ''
                        data[0].Td_Productname = props.editdata[0]?.Td_Productname ? props.editdata[0].Td_Productname : ''
                        data[0].Td_Productname = props.editdata[0]?.Td_Productname ? props.editdata[0].Td_Productname : ''
                        data[0].td_images_org_configuration = props.editdata[0]?.td_images_org_configuration ? props.editdata[0].td_images_org_configuration : []
                        data[0].td_Threed_Image_Id = props.editdata[0]?.td_Threed_Image_Id ? props.editdata[0]?.td_Threed_Image_Id : 0
                    }
                    setFiles(data)
                    loaderRef.current.style.display = 'none'
                } else {
                    //const msg = JSON.parse(res.data)?.errors && JSON.parse(res.data)?.errors[""][0] ? JSON.parse(res.data)?.errors[""][0] : 'Failed to import 3D Image!'
                    //'Failed to import 3D Image!'
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to import 3D Image!'
                    })
                    loaderRef.current.style.display = 'none'
                }
            } catch (error) {
                console.log("Upload3derror", error)
                //const errormsg = JSON.parse(res.data)?.errors && JSON.parse(error)?.errors[""][0] ? JSON.parse(error)?.errors[""][0] : 'An error occurred while uploading the file'
                //'An error occurred while uploading the file'
                loaderRef.current.style.display = 'none'
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while uploading the file'
                })
            }
        })
        //ToDo: Tableold.js ->  get only name list --> function 
        //ToDo: Axios Call
        //! do a sevice req from  axios and get responce
        //! After response push it to state Var 
        const threeDImages = [
            {
                imageUrl: "http://172.16.10.194//ThreedImages//Women_Long_Dress//Women_Long_Dressb.jpg",
                td_threed_image_id: 306836985,
                td_threed_image_name: "Women_Long_Dress",
                td_Image_Configuration: [
                    {
                        td_Threed_Image_Configuration_Id: 4060703451,
                        td_Threed_Image_Id: 306836985,
                        td_Productname: null,
                        td_Group_Name: "WlDress",
                        td_Group_Display_Name: null,
                        td_Group_Colour: null,
                        td_Group_Product_Name: null,
                        td_Group_Order_No: 0,
                        td_Credit: 0,
                        td_tryon_type: null,
                        td_sub_category: null,
                        td_images_org_configuration: null,
                        state: 0
                    },
                    {
                        td_Threed_Image_Configuration_Id: 4060703451,
                        td_Threed_Image_Id: 306836985,
                        td_Productname: null,
                        td_Group_Name: "WlDress",
                        td_Group_Display_Name: null,
                        td_Group_Colour: null,
                        td_Group_Product_Name: null,
                        td_Group_Order_No: 0,
                        td_Credit: 0,
                        td_tryon_type: null,
                        td_sub_category: null,
                        td_images_org_configuration: null,
                        state: 0
                    },
                    {
                        td_Threed_Image_Configuration_Id: 4060703451,
                        td_Threed_Image_Id: 306836985,
                        td_Productname: null,
                        td_Group_Name: "WlDress",
                        td_Group_Display_Name: null,
                        td_Group_Colour: null,
                        td_Group_Product_Name: null,
                        td_Group_Order_No: 0,
                        td_Credit: 0,
                        td_tryon_type: null,
                        td_sub_category: null,
                        td_images_org_configuration: null,
                        state: 0
                    }
                ]
            }
        ]
        // ! -> sm -- axios call
        //Push(threeDImages[0], setFiles)

        //response.data._RootThreeDImageConfig
        const tableData1 = []
        threeDImages.forEach(function (item, index) {
            const defaultGroups = []
            const newGroups = []
            const groupProducts = []
            const textures = []
            item.td_Image_Configuration.forEach(function (tdGroup, gitemIndex) {
                defaultGroups.push(<tr><td><Input type='text' id='basicInput' placeholder='Mesh1' value={tdGroup.td_Group_Name} disabled /></td></tr>)
                newGroups.push(<tr><td><Input type='text' id='basicInput' placeholder='Mesh1' onChange={handelOnchange} defaultValue={tdGroup.td_Group_Display_Name} /></td></tr>)
                groupProducts.push(<tr><td><Input type='text' id='basicInput' placeholder='Mesh1' onChange={handelOnchange} defaultValue={tdGroup.td_Group_Product_Name} /></td></tr>)
                textures.push(<tr><td><Input type='text' id='basicInput' placeholder='texture' onChange={handelOnchange} defaultValue={tdGroup.td_Group_Colour} /></td></tr>)
            })

            tableData1.push(
                <tr>
                    <td>1</td>
                    <td>
                        <div className="d-flex flex-column text-center align-items-center">
                            <img src={item.imageUrl} />
                            <span>jacket_04.jpg</span>
                            <div className="pt-1">
                                <Input type='text' id='basicInput' placeholder='Enter New Name' className="text-align:center" />
                            </div>
                        </div>
                    </td>
                    <td>
                        <Example />
                    </td>
                    <td>
                        <table className="ContentInner">
                            {defaultGroups}
                        </table>
                    </td>
                    <td><table className="ContentInner">
                        {newGroups}
                    </table>
                    </td>
                    <td><table className="ContentInner">
                        {groupProducts}
                    </table>
                    </td>
                    <td>
                        <table className="ContentInner">
                            {textures}
                        </table>
                    </td>
                    <td>
                        <Example />
                    </td>
                    <td><Input type='text' id='basicInput' />
                    </td>
                </tr>

            )
        })
        //setTableData(tableData1)
        //setFiles(JSON.parse(res.data))
        //setFiles(arr)                
    }

    const handelOnclick = () => {
        const arr = getHead() //[1,2,3,4,5,] 
        const len = arr.length
        const temp_arr = []
        old.map((e, k) => {
            const obj = { file: e.file }
            for (let i = 0; i < len; i++) {
                obj[arr[i]] = getAllDataFromTable(i + 2, k)
            }
            temp_arr.push(obj)
        })
        props.setUploadFile(temp_arr)
    }
    const handelOnchange = () => {

    }
    const uploadSingleFile = (id) => {
        const arr = getHead() //[1,2,3,4,5,] 
        const len = arr.length
        const temp_arr = []
        const obj = { file: old[id].file }
        for (let i = 0; i < len; i++) {
            obj[arr[i]] = getAllDataFromTable(i + 2, id)
        }
        temp_arr.push(obj)
        props.setUploadFile(temp_arr)

    }

    const onSaveConfiguration = (e) => {
        e.preventDefault()
        const selection = document.getElementById('collection3DLibrary').value
        let msg = ""
        switch (selection) {
            case 'Showroom':
                msg = selection
                break
            default:
                msg = "XML"
        }
        alert(msg)
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
    }

    return (
        <div>
            <Modal
                id='threed_element'
                isOpen={props.modal}
                toggle={props.toggle}
                className="add_threedesign modal-xl shadow-none custom-modal"
                style={{
                    width: "100%",
                    margin: "0",
                    maxWidth: "100%",
                    height: "100vh",
                    background: "#fff",
                    overflow: "hidden"
                }}
            >
                <ModalHeader toggle={props.toggle} >
                    {props.headername}
                    <button type="button" className="close custom-close" aria-label="Close"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '40px',
                            zIndex: 1
                        }}
                        onClick={async () => {
                            await removeAll()
                            // const propsCopy = {...props}
                            // propsCopy.editdata = []
                            // props = propsCopy
                            props.toggle()
                            props.applicationref.current.value = "Archive"
                            props.showTdsConfiguration()
                        }}
                    ><span aria-hidden="true">×</span></button>
                </ModalHeader>
                <Form>
                    <ModalBody className="px-0">
                        {
                            //**TopBody or TopBar */
                        }
                        <TopBody setUploadFile={props.setUploadFile}
                            onSaveConfiguration={onSaveConfiguration}
                            handleAttachFIle={handleAttachFIle}
                            handelOnclick={handelOnclick}
                            uploadSingleFile={uploadSingleFile}
                            changeFile={changeFile}
                            setChangeFile={setChangeFile}
                            rollData={rollData}
                            setreMoveid={setreMoveid}
                            reMoveid={reMoveid}
                            setOption={setOption}
                            topbarstate={props.topbarstate}
                            forceRerender={props.forceRerender}
                            loaderRef={loaderRef}
                            browseRef={browseRef}
                            editobj={props.editobj}
                            DispalyNameRef={DispalyNameRef}
                        />
                        <ContentTable files={AllFiles ? AllFiles : props.editdata}
                            PrOrList={PrOrList}
                            rollData={rollData}
                            tableData={tableData}
                            changeFile={changeFile}
                            reMoveid={reMoveid}
                            option={option}
                            modal={props.modal}
                            forceRerender={props.forceRerender}
                            editdata={props.editdata}
                            DispalyNameErrorRef={DispalyNameErrorRef}
                            DispalyNameOnChange={DispalyNameOnChange}
                            DispalyNameRef={DispalyNameRef}
                        />
                    </ModalBody>
                </Form>
                <br />

            </Modal>
            <R_Loader loaderRef={loaderRef} />
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setUploadFile: files => dispatch(setUploadFile(files))
})

export default connect(null, mapDispatchToProps)(ThreeD_Design)
