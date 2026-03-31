import { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Input, Label, Col, ModalBody } from 'reactstrap'
import "react-datepicker/dist/react-datepicker.css"
import * as validate from '../../validation/OrgValidationFunctions'
import Multiselect from 'multiselect-react-dropdown'
import { FilePlus } from 'react-feather'

// ! PopUpBody 
const ModalBodyUI = forwardRef((props, ref) => {
    const initialValue = [{ name: 'Dobby', id: 1 }, { name: 'Archive', id: 2 }, { name: 'Collezioni', id: 3 }, { name: 'Q3D', id: 4}, { name: 'StyleMe-TryOn', id: 5 }]
   

    const [DrivePath, setDrivePath] = useState(null)
    //** CDN */
    const [IsCDN, setCDN] = useState('none')
    const [IsLocal, setLocal] = useState('block')
    const [IsFtp, setFtp] = useState('none')
    //let IsFtp = "none"
    const [IsAws, setAws] = useState('none')
    const [IsAzure, setAzure] = useState('none')
    const [IsDobby, setDobby] = useState(false)
    const [IsArchive, setArchive] = useState(true)
    const [IsCollezioni, setCollezioni] = useState(false)
    const [IsQ3D, setQ3D] = useState(false)
    const [IsStyleME, setStyleMe] = useState(false)
    const [stateOptions, setStateValues] = useState(initialValue)
    const [stateselOptions, setStateSelValues] = useState([])
      //ftp
    const [Ishost, sethost] = useState(false)
    const [Isport, setport] = useState(false)
    const [Isurl, seturl] = useState(false)
    const [Ispass, setpass] = useState(false)
    //aws
    const [IsAurl, setAurl] = useState(false)
    const [IsAid, setAid] = useState(false)
    const [IsApass, setApass] = useState(false)
       
    //ftp
    const [IsCPath, setCPath] = useState(false)
    const [IsCName, setCName] = useState(false)
    const [IsCsecret, setCsecret] = useState(false)
    const [IsCkey, setCkey] = useState(false)

    //azure

    const [IszAurl, setAzurl] = useState(false)
    const [IszAid, setAzid] = useState(false)
    const [IszApass, setAzpass] = useState(false)
   
    useImperativeHandle(
        ref,
        () => ({
            checkAllFields() {
                
            },
            getLimitField() {

                const obj = new Object()
                obj.IsDobby = IsDobby
                obj.IsArchive = IsArchive
                obj.IsCollezioni = IsCollezioni
                obj.IsQ3D = IsQ3D
                obj.IsStyleME = IsStyleME
                return obj
            },
            ftp(h, p, i, po) {
                sethost(validate.Validatehost(h))
                setport(validate.ValidatePort(p))
                seturl(validate.ValidateUrl(i))
                setpass(validate.Validatepass(po))
                if (Ishost && Isport && Isurl && Ispass) return true
                else return false
            },
            aws(u, i, p) {
                setAurl(validate.ValidateAwsURL(u))
                setAid(validate.ValidateAwsUSerID(i))
                setApass(validate.ValidatePortAwsPass(p))
                if (IsAurl && IsAid && IsApass) return true
                else return false
            },
            cdn(p, n, s, k) {

                setCPath(validate.ValidateCpath(p))
                setCName(validate.ValidateCname(n))
                setCsecret(validate.ValidateCsecret(s))
                setCkey(validate.ValidateCkey(k))
                if (IsCPath && IsCName && IsCsecret && IsCkey) return true
                else return false
            },
            azure(u, i, p) {
                setAzurl(validate.ValidateAzsURL(u))
                setAzid(validate.ValidateAzsUSerID(i))
                setAzpass(validate.ValidatePortAzsPass(p))
                if (IszAurl && IszAid && IszApass) return true
                else return false
            }
        })
    )
    function onSelect(e) {
       
        for (let i = 0; i < e.length; i++) {
            if (e[i].name === "Archive") setArchive(true)
            if (e[i].name === "Dobby") setDobby(true)
            if (e[i].name === "Collezioni") setCollezioni(true)
            if (e[i].name === "Q3D") setQ3D(true)
            if (e[i].name === "StyleMe-TryOn") setStyleMe(true)
        }
    }
    function onRemove(e) {
        
        for (let i = 0; i < e.length; i++) {
            if (e[i].name === "Archive") setArchive(false)
            if (e[i].name === "Dobby") setDobby(false)
            if (e[i].name === "Collezioni") setCollezioni(false)
            if (e[i].name === "Q3D") setQ3D(false)
            if (e[i].name === "StyleMe-TryOn") setStyleMe(false)
        }
    }
    const FolderStrutChange = e => {
        
        setAzure('none')
        setAws('none')
        setCDN('none')
        setFtp('none')
        setLocal('none')
        const sel = e.target === undefined ? e : e.target.selectedOptions[0].getAttribute("name")
        switch (sel) {
            case 'local':
                 setLocal('block')
               
                break
            case 'ftp':
                setFtp('block')
                break
            case 'cdn':
                setCDN('block')
                break
            case 'aws':
               setAws('block')
                break
            case 'azure':
                 setAzure('block')
               
                break

            default:
                break
        }
    }
    useEffect(() => {
        
        if (props.selectedConfiguredata !== undefined && props.selectedConfiguredata !== null) {
            const SelectedValue = []
            
            if (props.selectedConfiguredata.product_Dobby) {
                const obj = new Object()
                obj.name = "Dobby"
                obj.id = 1
                setDobby(true)
                SelectedValue.push(obj)
            } if (props.selectedConfiguredata.product_Archive) {
                const obj = new Object()
                obj.name = "Archive"
                obj.id = 2
                setArchive(true)
                SelectedValue.push(obj)
            } if (props.selectedConfiguredata.product_Collezioni) {
                const obj = new Object()
                obj.name = "Collezioni"
                obj.id = 3
                setCollezioni(true) 
                SelectedValue.push(obj)
            } if (props.selectedConfiguredata.product_Showroom) {
                const obj = new Object()
                obj.name = "StyleMe-TryOn"
                obj.id = 4
                setStyleMe(true)
                SelectedValue.push(obj)
            } if (props.selectedConfiguredata.product_Q3d) {
                const obj = new Object()
                obj.name = "Q3D"
                setQ3D(true)
                obj.id = 5
                SelectedValue.push(obj)
            }
            setStateSelValues(SelectedValue)
            if (props.selectedConfiguredata.ftp_Store !== null && props.selectedConfiguredata.ftp_Store) {
                setpass(true)
                seturl(true)
                setport(true)
                sethost(true)
                setLocal('none')
                setFtp('block')
            } else if (props.selectedConfiguredata.cdn) {
                setCPath(true)
                setCName(true)
                setCsecret(true)
                setCkey(true)
                setLocal('none')
                setCDN('block')
            } else if (props.selectedConfiguredata.aws_S3_Bucket) {
                setApass(true)
                setAid(true)
                setAurl(true)
                setLocal('none')
                setAws('block')
            } else if (props.selectedConfiguredata.azure_Blob_Storage) {
                setAzurl(true)
                setAzid(true)
                setAzpass(true)
                setLocal('none')
                setAzure('block')
            }
        }
    }, [props.selectedConfiguredata !== undefined && props.selectedConfiguredata !== null])

    const Driveletter = () => {
        
        const letter = []
        if (props.selectedConfiguredata !== undefined && props.selectedConfiguredata !== null) {
            if (props.selectedConfiguredata.drive_Path === "D") {
                letter.push(<option selected value="D" name="D">D</option>)
                letter.push(<option value="C" name="C">C</option>)
                letter.push(<option value="E" name="E">E</option>)
                letter.push(<option value="F" name="F">F</option>)

            } else if (props.selectedConfiguredata.drive_Path === "C") {
                letter.push(<option value="D" name="D">D</option>)
                letter.push(<option selected value="C" name="C">C</option>)
                letter.push(<option value="E" name="E">E</option>)
                letter.push(<option value="F" name="F">F</option>)

            } else if (props.selectedConfiguredata.drive_Path === "E") {
                letter.push(<option value="D" name="D">D</option>)
                letter.push(<option value="C" name="C">C</option>)
                letter.push(<option selected value="E" name="E">E</option>)
                letter.push(<option value="F" name="F">F</option>)

            } else if (props.selectedConfiguredata.drive_Path === "F") {
                letter.push(<option value="D" name="D">D</option>)
                letter.push(<option value="C" name="C">C</option>)
                letter.push(<option value="E" name="E">E</option>)
                letter.push(<option selected value="F" name="F">F</option>)

            } else {
                letter.push(<option value="D" name="D">D</option>)
                letter.push(<option value="C" name="C">C</option>)
                letter.push(<option value="E" name="E">E</option>)
                letter.push(<option value="F" name="F">F</option>)
            }

        }
        return letter
    }
    const storeTypes = () => {
        
        const storeType = []
        
        if (props.selectedConfiguredata !== undefined && props.selectedConfiguredata !== null) {
                if (props.selectedConfiguredata.ftp_Store !== null && props.selectedConfiguredata.ftp_Store) {

                    storeType.push(<option value="local" name="local">Local Server Path</option>)
                    storeType.push(<option selected value="ftp" name="ftp">Ftp Store</option>)
                    storeType.push(<option value="cdn" name="cdn">CDN</option>)
                    storeType.push(<option value="aws" name="aws">AWS S3 Bucket</option>)
                    storeType.push(<option value="azure" name="azure">Azure Blob Storage</option>)
                   // IsFtp = "block"
                   
                } else if (props.selectedConfiguredata.cdn) {

                    storeType.push(<option value="local" name="local">Local Server Path</option>)
                    storeType.push(<option  value="ftp" name="ftp">Ftp Store</option>)
                    storeType.push(<option selected value="cdn" name="cdn">CDN</option>)
                    storeType.push(<option value="aws" name="aws">AWS S3 Bucket</option>)
                    storeType.push(<option value="azure" name="azure">Azure Blob Storage</option>)
                   
                } else if (props.selectedConfiguredata.aws_S3_Bucket) {
                    storeType.push(<option value="local" name="local">Local Server Path</option>)
                    storeType.push(<option value="ftp" name="ftp">Ftp Store</option>)
                    storeType.push(<option value="cdn" name="cdn">CDN</option>)
                    storeType.push(<option selected value="aws" name="aws">AWS S3 Bucket</option>)
                    storeType.push(<option value="azure" name="azure">Azure Blob Storage</option>)
                } else if (props.selectedConfiguredata.azure_Blob_Storage) {
                    storeType.push(<option value="local" name="local">Local Server Path</option>)
                    storeType.push(<option value="ftp" name="ftp">Ftp Store</option>)
                    storeType.push(<option value="cdn" name="cdn">CDN</option>)
                    storeType.push(<option value="aws" name="aws">AWS S3 Bucket</option>)
                    storeType.push(<option selected value="azure" name="azure">Azure Blob Storage</option>)
                } else {

                    storeType.push(<option value="local" name="local">Local Server Path</option>)
                    storeType.push(<option value="ftp" name="ftp">Ftp Store</option>)
                    storeType.push(<option value="cdn" name="cdn">CDN</option>)
                    storeType.push(<option value="aws" name="aws">AWS S3 Bucket</option>)
                    storeType.push(<option value="azure" name="azure">Azure Blob Storage</option>)
                }
        }
        return storeType
    }
    
    return (
        < ModalBody >
            {console.log(props.selectedConfiguredata)}
            <hr className="m-2" />
            <Col className="row form-group">
                <Label className="control-label col-sm-2 "><b>License:</b></Label>
            </Col>
                <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 ">Total User Limit  <span style={{ color: 'red' }} >*</span></Label>
                <Input dataId={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.organisation_Data_Id} defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.user_Limit} required type="text" className="form-control col-sm-4" id="C_userlimit" autocomplete="off" onkeyup="IsEmpty(this)" />

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2">Customer Limit<span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.customer_Limit} required type="text" className="form-control col-sm-4" id="C_custlimit" autocomplete="off" onkeyup="IsEmpty(this)" />
                </Col>
                <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2">Supplier Limit<span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.supllier_Limit}  required type="text" className="form-control col-sm-4 mt-0" id="C_supplimit" autocomplete="off" onkeyup="IsEmpty(this)" />

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 ">Design Limit <span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.design_Limit} required type="text" className="form-control col-sm-4" id="C_designlimit" autocomplete="off" onkeyup="IsEmpty(this)" />
                </Col>
                <Col className="row form-group">
                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 ">Agent Limit <span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.agent_Limit} required type="text" className="form-control col-sm-4" id="c_agentlimit" autocomplete="off" onkeyup="IsEmpty(this)" />

                <Label className="col-form-Label col-sm-12 col-md-4 col-lg-2 ">Credit Limit <span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.credit_Limit} required type="text" className="form-control col-sm-4" id="c_creditlimit" autocomplete="off" onkeyup="IsEmpty(this)" />

               
                                  </Col>
           
             <hr className="m-2" />
            <Col className="row form-group">
                <Label className="control-label col-sm-4"><b>Product Type:</b></Label>
                <Multiselect
                    className="control-label col-sm-2 ml-1"
                    options={stateOptions} 
                    onSelect={onSelect} 
                    onRemove={onRemove}
                    selectedValues={stateselOptions }
                    displayValue="name" 
                />
            </Col>

            <hr className="m-2" />
            <Col className="row form-group mx-0">
                <Label className="control-label "><b>Database:</b></Label>
            </Col>
            <Col className="row form-group">
                <Label className="control-label col-sm-2">SQL Server Name/Ip <span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.sql_Data_Source_Name} required type="text" className="form-control col-sm-4" id="C_serverIP" autocomplete="off" onkeyup="IsEmpty(this)" />

                <Label className="control-label col-sm-2">SQL Server User ID <span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.sql_User_Id} required type="text" className="form-control col-sm-4" id="C_ServerUserID" autocomplete="off" onkeyup="IsEmpty(this)" />
            </Col>

            <Col className="row form-group">
                <Label className="control-label col-sm-2">SQL Server Password  <span style={{ color: 'red' }} >*</span></Label>
                <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.sql_Password} required type="text" className="form-control col-sm-4" id="C_serverPass" autocomplete="off" onkeyup="IsEmpty(this)" />
            </Col>

            <hr className="m-2" />
            <Col className="row form-group mx-0">
                <label class="control-label "><b>Folder Structure:</b></label>
            </Col>
            <Col className="row form-group" >
                <Label className=" col-sm-4">Select Store Type <span style={{ color: 'red' }}>*</span></Label>
                <Input type="select" name="dbdrivepath" className=" col-sm-4" parentid="#C_StoreType" subid="#C_StoreType" id="C_StoreType"
                  
                    onChange={
                        (e) => {
                            FolderStrutChange(e)
                        }
                    }
                >
                    { storeTypes()}
                </Input>
               

            </Col>
            <div style={{ display: `${IsLocal}` }} >
            <Col  className="row form-group">
                <Label className=" col-sm-4">Database drive path <span style={{ color: 'red' }}>*</span></Label>
                    <Input type="select" name="dbdrivepath" className=" col-sm-2" parentid="#C_countryId" subid="#C_cityId" id="C_drive"
                        style={{ borderColor: (DrivePath === true) ? '#66DE93' : (DrivePath === null) ? '' : '#D83A56' }}
                  onChange={
                      (e) => {
                          setDrivePath(validate.DrivePath(e.target.value))
                        }
                    }
                >
                        {Driveletter()}
                </Input>
                </Col>
            </div>
            <div style={{ display: `${IsAws}` }} >
            <Col   className="row form-group">
                <Label className="col-form-label col-sm-2">Access URL <span style={{ color: 'red' }}>*</span></Label>
                <Input type="text" className="form-control phone col-sm-8" id="C_accessURL" placeholder="Access URL"
                        style={{ borderColor: (IsAurl === true) ? '#66DE93' : '#D83A56' }}
                  onChange={(e) => {
                        setAurl(validate.ValidateAwsURL(e.target.value))
                        }}
                        defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.aws_Url_Access}
                />
            </Col>

            <Col  className="row form-group">
                <Label className="col-form-label col-sm-2">URL access user ID <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.aws_Url_Access_Id} type="text" className="form-control phone col-sm-8" id="C_URLaccessUserID" placeholder="URL access user ID"
                        style={{ borderColor: (IsAid === true) ? '#66DE93' : '#D83A56' }}
                  onChange={(e) => {
                      setAid(validate.ValidateAwsUSerID(e.target.value))
                    }}
                />
            </Col>

            <Col className="row form-group">
                <Label className="col-form-label col-sm-2">URL access password <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.aws_Url_Access_Password} type="text" className="form-control phone col-sm-8" id="C_URLaccesspasswordL" placeholder="password"
                        style={{ borderColor: (IsApass === true) ? '#66DE93'  : '#D83A56' }}
                  onChange={(e) => {
                      setApass(validate.ValidatePortAwsPass(e.target.value))
                    }}
                />
                </Col>
            </div>
            <div style={{ display: `${IsCDN}` }} >
            <Col  className="row form-group">
                <Label className="col-form-label col-sm-2">CDN Path <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.cdn_CdnPath} type="text" className="form-control phone col-sm-4" id="O_CdnPath" placeholder="CDN Path"
                        style={{ borderColor: (IsCPath === true) ? '#66DE93' : (IsCPath === null) ? '' : '#D83A56' }}
                  onChange={(e) => {
                      setCPath(validate.ValidateCpath(e.target.value))
                    }}
                />
                <Label className="col-form-label col-sm-2">Cloud Name <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.cdn_Cloud_Name} type="text" className="form-control phone col-sm-4" id="O_CloudNAme" placeholder="Cloud Name"
                        style={{ borderColor: (IsCName === true) ? '#66DE93' : (IsCName === null) ? '' : '#D83A56' }}
                  onChange={(e) => {
                      setCName(validate.ValidateCname(e.target.value))
                    }}
                />
            </Col>
            <Col  className="row form-group">
                <Label className="col-form-label col-sm-2">API Secret <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.cdn_Api_Secret} type="text" className="form-control phone col-sm-4" id="O_ApiSecret" placeholder="API Secret"
                        style={{ borderColor: (IsCsecret === true) ? '#66DE93' : (IsCsecret === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        setCsecret(validate.ValidateCsecret(e.target.value))
                    }}
                />
                <Label className="col-form-label col-sm-2">API Key <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.cdn_Api_Key} type="text" className="form-control phone col-sm-4" id="O_ApiKey" placeholder="API Key"
                        style={{ borderColor: (IsCkey === true) ? '#66DE93' : (IsCkey === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        setCkey(validate.ValidateCkey(e.target.value))
                    }}
                />
                </Col>
            </div>
            <div style={{ display: `${IsFtp}` }}>
            <Col  className="row form-group">
                <Label className="col-form-label col-sm-2">Host <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.ftp_Host} type="text" className="form-control phone col-sm-4" id="O_Host" placeholder="Host"
                        style={{ borderColor: (Ishost === true) ? '#66DE93' : (Ishost === null) ? '' : '#D83A56' }}
                  onChange={(e) => {
                        sethost(validate.Validatehost(e.target.value))
                    }}
                />
                <Label className="col-form-label col-sm-2">Port <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.ftp_Port} type="text" className="form-control phone col-sm-4" id="O_Port" placeholder="Port"
                        style={{ borderColor: (Isport === true) ? '#66DE93' : (Isport === null) ? '' : '#D83A56' }}
                  onChange={(e) => {
                      setport(validate.ValidatePort(e.target.value))
                    }}
                />
                </Col>
            <Col className="row form-group">
                <Label className="col-form-label col-sm-2">URL Access User ID <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.ftp_Url_Acces_User_Id} type="text" className="form-control phone col-sm-4" id="O_URlID" placeholder="URL Access User ID"
                        style={{ borderColor: (Isurl === true) ? '#66DE93' : (Isurl === null) ? '' : '#D83A56' }}
                  onChange={(e) => {
                      seturl(validate.ValidateUrl(e.target.value))
                    }}
                />
                <Label className="col-form-label col-sm-2">URL Access User Password <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.ftp_Url_Access_Password} type="text" className="form-control phone col-sm-4" id="O_Urlpass" placeholder="URL Access User Password"
                        style={{ borderColor: (Ispass === true) ? '#66DE93' : (Ispass === null) ? '' : '#D83A56' }}
                  onChange={(e) => {
                      setpass(validate.Validatepass(e.target.value))
                    }}
                />
            </Col>
            </div>
            <div style={{ display: `${IsAzure}` }} >
            <Col  className="row form-group">
                <Label className="col-form-label col-sm-2">URL Access  <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.azure_Url_Access} type="text" className="form-control phone col-sm-8" id="O_URlAccess" placeholder="URL Access"
                        style={{ borderColor: (IszAurl === true) ? '#66DE93' : (IszAurl === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        setAzurl(validate.ValidateAzsURL(e.target.value))
                    }}
                />
               
            </Col>
            <Col  className="row form-group">
                <Label className="col-form-label col-sm-2">URL Access User ID <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.azure_Url_Access_Id} type="text" className="form-control phone col-sm-4" id="O_AURlID" placeholder="URL Access User ID"
                        style={{ borderColor: (IszAid === true) ? '#66DE93' : (IszAid === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        setAzid(validate.ValidateAzsUSerID(e.target.value))
                    }}
                />
                <Label className="col-form-label col-sm-2">URL Access User Password <span style={{ color: 'red' }}>*</span></Label>
                    <Input defaultValue={props.selectedConfiguredata === undefined || props.selectedConfiguredata === null ? "" : props.selectedConfiguredata.azure_Url_Access_Password} type="text" className="form-control phone col-sm-4" id="O_AURlPass" placeholder="URL Access User Password"
                        style={{ borderColor: (IszApass === true) ? '#66DE93' : (IszApass === null) ? '' : '#D83A56' }}
                    onChange={(e) => {
                        setAzpass(validate.ValidatePortAzsPass(e.target.value))
                    }}
                />
                </Col>
            </div>

        </ModalBody >
    )
}
)
export default ModalBodyUI
