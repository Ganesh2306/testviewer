import React, { useState, useEffect } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row
} from "reactstrap"
import { Edit, Trash2, Crop } from "react-feather"
import { DeletePopUp, QrPopUp } from './DeletePopUp'
import { FibricInfo } from './FibricInfo'
import { getFTG } from "../TopBar"
import { SelectboxModify } from "./SelectBox"
import axios from 'axios'
import { getQRbase64 } from '../Utility/Utility'
import { selection } from "../Utility/selection"
//let msg = ''
const help_for_upload = async (data, cb = null) => {
      const formPayload = new FormData()
     
      formPayload.append('file', null)
          
      formPayload.append('alldata', JSON.stringify(data))
       await axios({
          url: './Design/UploadDesigns',
          method: 'post',
          data: formPayload,
          headers: { 'Content-Type': 'multipart/form-data' },
          enctype: 'multipart/form-data'           
          
        }).then(e => {
          
          if (e.data.issaved && cb !== null) {
            cb(true)
          } else {
            if (cb !== null) {
              cb(false)
            }
          }        
        })
    }

const convertToBase64 = (url, cb) => {
      const img = document.createElement("IMG")
      img.crossOrigin = 'Anonymous'
      const canvasm = document.createElement('canvas')
      const ctx = canvasm.getContext('2d')             
          img.onload = function() {    
            canvasm.width = img.width
            canvasm.height = img.height
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const imag = canvasm.toDataURL("image/jpeg")//canvas.toDataURL() 
                         
          cb(imag)
      }
      img.src = url
  }

const FDiv = ({FidName, dconid, data, tempid, defaultV, readOnly}) => {
      return ( 
      <div className="form-group col-md-12 d-flex p-0">
      <label
        for="exampleInputName2"
        featuremodifyid={FidName[0].id}
        md_conf_id={dconid}
        className="col-lg-4 col-sm-4 control-label">
        {FidName[0].name}
      </label>
      <div className="col-lg-9 col-sm-9">
      <SelectboxModify data={data} onFocusOut={() => ''} onSchange={() => ''} 
      tempid={`m-${tempid}`} defaultV={defaultV} readOnly={readOnly} />
      </div>
    </div>
      )
  }
export const SelectBox1 = ({rolldata, featureTData, features, readOnly}) => {
      return (
        <>
        {
          rolldata.map((e, k) => {
            
            let ftdata = []
            const FidName = []
            let defaultV = ""
            let d_con_id = ""

            if (featureTData.length > 0 && featureTData !== null) {
              for (let i = 0; i < featureTData.length; i++) {
                if (featureTData[i].design_feature_id === e.design_features_id) {
                  ftdata = featureTData[i].featureTypeList
                  FidName.push({id:e.design_features_id, name: e.design_features_name})
                  defaultV = features[e.design_features_name] === undefined ? "" : features[e.design_features_name]
                  d_con_id = e.design_configuration_id
                }  
              }
            }
            if (FidName.length > 0) {                 
                return <FDiv data={ftdata} tempid={k} 
                FidName={FidName} defaultV={defaultV} 
                dconid={d_con_id} key={k} readOnly={readOnly}/>
            }
          })                     
        }
        </>
      )
    }

const SideOptions = ({rolldata, featureTData, features}) => {
      return (
        <div className="col-lg-12 prod_block">
          
          <div className="fabwindow">   
            <div className="basic_div" id="UpropertyDiv" style={{overflowY:'scroll', overflowX:'hidden'}}>
              <div id="modifyPop">
                <SelectBox1 rolldata={rolldata} featureTData={featureTData} features={features} />
              </div>
            </div>
          </div>
        </div>
      )
    }
    
//!IMgBox for edit 
const ImgBox = ({ fibName, URL }) => {
  
      return (
        <Col className="col-lg-6 prod_block_first p-50 ">
          <div className="fabwindow">
            <div className="Fab_name">
              <ul id="UfabricList" className="list-group">
                <li
                  className="list-group-item selected rounded-0 designfab_name"
                >
                  {" "}
                  Design : {fibName}
                </li>
              </ul>
            </div>
            <div className="fabwindow position-relative">
              <div className="show_fabric">
                <div
                  id="UshowFabric"
                  className='ushowfb'
                  style={{
                    backgroundImage:
                    URL,
                      //'url(http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_SUPPLIER/41733116920/470118832651/252151144790/bulk2 (137)t.jpg)',
                    width: "100%",
                    height: "100vh",  
                    maxHeight:"500px"               
                  }}
                          >
                              <div className="design_crop cursor"><Crop size={18} /></div>
                    <div color="primary" className='float-left iconthumb btn btn-light' >
                                  <Edit size={18} className='' /> Edit Design
                                  <span style={{ marginLeft: '0.5rem' }}>                                  
                                      <input type="file" className="file_input_select cursor"
                                          accept="image/x-png,image/jpeg,image/jpg,image/tiff,image/tif,image/bmp,.dob"
                                          />                                      
                                  </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      )
    }

export const UploadDesign = (props) => {

    const [Success, setSuccess] = useState(false)
    const success_toggle = () => setSuccess(!Success)
    const [msg, setmsg] = useState('')

    const URL = `url("${props.src}")`
    const [featureTData, rolldata] = getFTG()  

  return (
    <>
     
      <Modal isOpen={props.modal} toggle={() => {
        props.HovFun(false)
        props.toggle()
      }} className="modal-lg modal-dialog-centered"
       fade={false} 
       >
      <ModalHeader className = 'col-lg-12' toggle={() => {
          props.HovFun(false)
          props.toggle()        
      }}>Edit/Modify Design
       </ModalHeader>  
       <Row className = 'm-0' style={{overflowY: 'hidden', overflowX: 'hidden'}}>
        <ImgBox URL={URL} fibName={props.fibName}/>
        <div  className="col-lg-6 p-0" >
   
         <ModalBody className="pr-0">
            <div className="row">
              <SideOptions featureTData={featureTData} rolldata={rolldata} features={props.features} />
            </div>
          </ModalBody>
          </div>
        </Row>
        <ModalFooter className='d-block'>   
            <Button color="danger"  className='float-right' onClick={() => {
              props.toggle()
              props.HovFun(false)
            }}>
            Cancel
            </Button>                   
            <Button color="primary" className='float-right' 
              onClick={async() => {
                const isStorageF = await axios.post(`./Design/GetStorageLocation`)
                if (!isStorageF.data.isStorage) {
                      Swal.fire({
                            position: 'center',
                            icon: 'info',
                            title: 'Please configure storage  !⚠',
                            showConfirmButton: true
                              })
                      } else {
                                      
                        const file = []  
                              
                        const url = props.src
                const getBase64 = (data) => {                    
                      const modifyobj = {}
                      const Features_Dic = []
                      const tmp = []
                      const temp_arr = []

                      document.querySelectorAll('#modifyPop .form-group').forEach(function(elem, index) {
                      const fd = {}
                      const vs = {}
                      vs['dd_details_id'] = 0
                      vs['dd_dm_id'] = 0
                      vs['dd_feature_id'] = elem.getElementsByTagName('label')[0].getAttribute('featuremodifyid')
                      vs['dd_feature_type_id'] = 0
                      vs['dd_feature_type_name'] = elem.getElementsByTagName('input')[0].value
                      vs['dd_design_configuration_id'] = elem.getElementsByTagName('label')[0].getAttribute('md_conf_id')               
                     
                        if (elem.getElementsByTagName('input')[0].value !== "") {
                          fd['Featurename'] = elem.getElementsByTagName('label')[0].innerText.trim()
                          fd['FeatureTypename'] = elem.getElementsByTagName('input')[0].value.trim()
                          Features_Dic.push(fd)
                        }
                        tmp.push(vs)
                    })
                    
                    modifyobj['State'] = 2                
                    modifyobj['IsImageUpdate'] = false
                    modifyobj['Dm_Design_Id'] = props.uid
                    const val = document.getElementById('collectionFabLibrary').value
                    const options = val.split('-')
                    modifyobj['Dm_DesignType_Id'] = options[0].trim()
                    modifyobj['Dm_Design_Group_Id'] = options[1].trim()
              
                    modifyobj['SaveExclusiveDesignRequestDto'] = {} /* {
                  De_Exclusive_Id: cut_id === "" ? "0" : "1",
                  De_Customer_Id: cut_id === '' ? "0" : cut_id           
                } */
                modifyobj['SaveInventoryDesignRequestDto'] = {} /* {           
                  Di_State: document.getElementById('Warehouseid').value, //Cad,Stock
                  Di_Product: obj['Di_Product']  //TODO
                } */
                modifyobj['Features_Dic'] = JSON.stringify(Features_Dic.length === 0 ? 0 : Features_Dic)
                modifyobj['FeatureList'] = JSON.stringify(tmp)
              
              // temp_arr.push(modifyobj)   
                    //Abhishek
                    modifyobj['designBase64'] = data.replace("data:image/jpeg;base64,", "")
                    modifyobj['designsize'] = props.designsize
                    //modifyobj['designBase64'] = null

                modifyobj['Dm_Variant'] = "0"            
                modifyobj['Dm_Article'] =  "0"          
                modifyobj['Dm_Design'] =    "0"         
                modifyobj['Dm_Design_Code'] = props.fibName
                modifyobj['Dm_Design_Name'] = props.fibName
                    
                const popUp = (bol) => {
                 
                  const Swal = require('sweetalert2')
                  
                  if (bol) {                 
                    Swal.fire({
                      position: 'center',
                      icon: 'info',
                      title: 'Design Updated Sucessfully..!',
                      showConfirmButton: true
                        }).then((result) => {
                          if (result.isConfirmed) {
                            if (bol) {
                              props.toggle()
                              props.setreRender(!props.reRender)
                            }
                          }
                        })
                  } else {                  
                    Swal.fire({
                      position: 'center',
                      icon: 'info',
                      title: 'Design Not Updated Sucessfully..!',
                      showConfirmButton: true
                        })
                  }
                  success_toggle()
                }

                help_for_upload(modifyobj, popUp)

                }  

                if (url.includes("data:image")) {
                  getBase64(url) //file['base64'] = url
                } else {                     
                convertToBase64(url, getBase64)                    
                }          
                
              } 
              }}>
              Update
            </Button>         
        </ModalFooter>
   
      </Modal>
    </>
  )
}

//!For Edit Only
export const Edit_PopUp = (props) => {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  
  return (
    <>
      <Edit size={props.size ? props.size : 18} onClick={toggle} />
      <UploadDesign modal={modal} toggle={toggle} src={props.src} fibName={props.fibName} />
    </>
  )
}

//! For Edit and Trash 
export const EditDelete = (props) => {
  
  console.log(props.features)
  
  const [modal, setModal] = useState(false)
  const [Del, setDel] = useState(false)
  const deltoggle = () => setDel(!Del)
  const toggle = () => setModal(!modal)
  const [editmodal, seteditModal] = useState(false)
  const [showqr, setshowqr] = useState(false)
  const toogleqr = () => setshowqr(!showqr)
  const edittoggle = () => seteditModal(!editmodal)
  const [QR, setQR] = useState(getQRbase64("https://tds.q3d.in?k=2aeeeb1&t=c1"))

  return (
    <>
    <div key={props.uid} className='p-1 d-flex'>
       <Edit size={18} onClick={toggle} style={{height:'18px', width:'18px', marginRight:'1rem'}} />
       <UploadDesign modal={modal} toggle={toggle} src={props.src} fibName={props.fibName} 
       setreRender={props.setreRender}  reRender={props.reRender}
       HovFun={props.HovFun} uid={props.uid}  features={props.features} style={{height:'18px', width:'18px', marginRight:'1rem'}}/> 
       <FibricInfo fibName={props.fibName} src={props.src} features={props.features}  HovFun={props.HovFun} style={{height:'18px', width:'18px', marginLeft:'1rem'}} /> 
       <a target="_blank" href={QR} >
       <Trash2 size={18} onClick={() => setDel(!Del)} style={{height:'18px', width:'18px', marginLeft:'1rem'}}/>  
       </a>
              <DeletePopUp modal={Del} toggle={deltoggle} setDel={setDel} id={props.uid} setreRender={props.setreRender} reRender={props.reRender} style={{ height: '18px', width: '18px', marginLeft: '1rem' }} />          

          <div style={{ height: '20px', width: '20px', marginLeft: '1.5rem', fontSize: '18px' }} id='' onClick={() => {                               
                                toogleqr()
                            }}>
          <i className="fa fa-qrcode" aria-hidden="true" role='button' size={24} ></i>
          </div>
          <QrPopUp showqr={showqr} toogleqr={toogleqr} src={selection.getQrLink(true)} />
     </div>
    </>
  )
}
