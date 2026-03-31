import React, { useState, useEffect } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  PopoverBody,
  Form,
  Label,
  Col,
  Row,
  Input,
  UncontrolledPopover
} from "reactstrap"
import { Icon, InlineIcon } from '@iconify/react'
import { Edit, Trash2, Crop } from "react-feather"
import { DeletePopUp, QrPopUp } from './DeletePopUp'
import { FibricInfo } from './FibricInfo'
import { arrayOf } from "prop-types"
import { UpdateSuccessPopup } from "./UpdateSuccessPopup"
import { getFTG } from "../TopBar"
import { SelectboxModify } from "./SelectBox"
import tshirtCrewOutline from '@iconify/icons-mdi/tshirt-crew-outline'
import axios from 'axios'
import { getQRbase64 } from '../Utility/Utility'
import { selection } from "../Utility/selection"
import { ProgressBar } from "react-bootstrap"
import Swal from "sweetalert2"
//let msg = ''
const renderstatus = async (dsize, imageurl, items, mainTDS, Dm_Design, ConfiguredProducts, loaderRef, toggle, setreRender, reRender) => {
  loaderRef.current.style.display = 'block'
  const [widthStr, heightStr] = dsize.split(',').map(value => value.trim())
  const height = parseFloat(heightStr)
  const width = parseFloat(widthStr)
  let saveBase64Image = {}
  const axiosRequests = []
  function isBlankOrWhiteBackground(base64Data, threeDImageName) {
    // Decode the base64 data to get the raw image data
    const binaryData = atob(base64Data)
    const arrayBuffer = new ArrayBuffer(binaryData.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i)
    }

    // Create an image object from the raw data
    const blob = new Blob([uint8Array], { type: 'image/png' })
    const imageUrl = URL.createObjectURL(blob)
    const image = new Image()
    image.src = imageUrl

    // Wait for the image to load
    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

        // Get the pixel data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        // Check if all pixels are white or transparent
        let isBlank = true
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i]
          const g = pixels[i + 1]
          const b = pixels[i + 2]
          const a = pixels[i + 3]

          // Check if the pixel is not fully transparent and not white
          if (a > 0 && (r !== 255 || g !== 255 || b !== 255)) {
            isBlank = false
            break
          }
        }

        resolve(isBlank)
        //show popup if base64 is blank or white background
        if (isBlank === true) {
          Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: `Failed to save renders for ${threeDImageName}`
          })
        }
      }
    })
  }
  const result = await new Promise((resolve) => {
    mainTDS.generateFabricImage(imageurl, width, height, 1, 'webp', items, 0.7, (result) => {
      resolve(result)
      console.log(result)
    })
  })
  if (result.length > 0 && result !== null && result !== undefined) {
    result.forEach(async (e, k) => {
      const base64Data = e.data.split(',')[1]
      const isBlank = await isBlankOrWhiteBackground(base64Data, e.threeDImageName)
      const index = ConfiguredProducts.indexOf(e.productName)
      const productName = e.productName
      let flag = false
      if (k === 0) {
        flag = true
      } else {
        flag = false
      }
      //const productName = `${e.productName}_${index + 1}`
      // Check if Base64 is not white background or blank image  
      if (!isBlank) {
        saveBase64Image = {
          base64image: e.data.split(',')[1],
          ThreedImageName: e.threeDImageName, //`${e.threeDImageName}_${k + 1}`
          ThreedImageId: e.id,
          ProductName: productName,
          DesignName: Dm_Design,
          IsOverrite: true,
          IsDelete: false,
          IsFirstImage: flag
        }
        axiosRequests.push(
          axios.post(`./Design/SaveBase64Image`, saveBase64Image).then((response) => {
            const res = JSON.parse(response.data)
            if (res === false) {
              Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'failed to create renders!'
              })
            }
            return res
          }).catch((error) => {
            console.error('Error in axios request:', error)
            return false
          })
        )
      }
    })
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'failed to create renders!'
    })
  }
  await Promise.all(axiosRequests).finally(() => {
    loaderRef.current.style.display = 'none' // Hide loader regardless of request success or failure
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Design Features updated and renders created Sucessfully..!',
      showConfirmButton: true,
      allowOutsideClick: false,
      showConfirmButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        toggle()
        setreRender(!reRender)

      }
    })
  })
}

const help_for_upload = async (data, cb = null, mainTDS, props) => {
  const formPayload = new FormData()
  formPayload.append('file', null)
  formPayload.append('alldata', JSON.stringify(data))
  await axios({
    url: './Design/UploadDesigns',
    method: 'post',
    data: formPayload,
    headers: { 'Content-Type': 'multipart/form-data' },
    enctype: 'multipart/form-data'

  }).then(async e => {

    if (e.data.issaved && cb !== null) {
      const Updatecheckbox = document.getElementById('renderchk')
      if (Updatecheckbox === null || Updatecheckbox.checked === false) {
        cb(true)
      }
      if (e.data.issaved === true && Updatecheckbox !== null && Updatecheckbox.checked === true) {
        //create dynamic imageUrl
        const timestamp = Date.now()
        const imageUrl = `${e.data.imageUrl}/z/${data.Dm_Design_Code}z.jpg?v=${timestamp}`
        const feature = JSON.parse(data.Features_Dic)
        const productlist = feature.filter(obj => obj.Featurename === 'Product').map(obj => obj.FeatureTypename.toLowerCase())
        const items = []
        props.products.forEach(product => {
          productlist.forEach(item => {
            if (item.toLowerCase().includes(product.toLowerCase())) {
              if (!items.includes(product)) {
                items.push(product)
              }
            }
          })
        })
        if (items.length > 0 && e.data.designSize !== null && e.data.designSize !== undefined && imageUrl !== undefined && imageUrl !== null && mainTDS !== undefined && mainTDS !== null && data.Dm_Design_Code !== undefined && data.Dm_Design_Code !== "" && props.loaderRef !== undefined && props.loaderRef !== null) {
          await renderstatus(e.data.designSize, imageUrl, items, mainTDS, data.Dm_Design_Code, props.products, props.loaderRef, props.toggle, props.setreRender, props.reRender)
        } else {
          Swal.fire({
            position: 'center',
            icon: 'info',
            html: 'Design Features Updated ..!<br>Failed to create renders<br>Is product configured correctly?',
            showConfirmButton: true,
            allowOutsideClick: false,
            showConfirmButton: true
          }).then(async (result) => {
            if (result.isConfirmed) {
              props.toggle()
              props.setreRender(!props.reRender)
            }
          })
        }
      }
    } else {
      if (cb !== null) {
        cb(false)
      }
    }
    /* obj[file.Dm_Design] = e.data.issaved
    if (cb !== null) {
      cb(file.Dm_Design, totalCount, fileno, e.data.issaved, FileSize)
    } */
  })


}

const convertToBase64 = (url, cb) => {
  //help_for_delete
  const img = document.createElement("IMG")
  img.crossOrigin = 'Anonymous'
  const canvasm = document.createElement('canvas')
  const ctx = canvasm.getContext('2d')
  img.onload = function () {
    canvasm.width = img.width
    canvasm.height = img.height
    ctx.drawImage(img, 0, 0, img.width, img.height)
    const imag = canvasm.toDataURL("image/jpeg")//canvas.toDataURL() 

    cb(imag)
  }
  const version = new Date().getTime()
  //img.src = {url}
  img.src = `${url}?v${version}`
}
//ToDo : use uid prop and get SRC From Data.js 
//!This is More Reliable then get Img SRC from Img-div
const FDiv = ({ FidName, dconid, data, tempid, defaultV, readOnly }) => {
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
          tempid={`m-${tempid}`} defaultV={defaultV} readOnly={readOnly} FidName={FidName[0].name} />
      </div>
    </div>
  )
}
export const SelectBox1 = ({ rolldata, featureTData, features, readOnly }) => {
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
                FidName.push({ id: e.design_features_id, name: e.design_features_name })
                defaultV = features[e.design_features_name] === undefined ? "" : features[e.design_features_name]
                d_con_id = e.design_configuration_id
              }
            }
          }
          if (FidName.length > 0) {
            return <FDiv data={ftdata} tempid={k}
              FidName={FidName} defaultV={defaultV}
              dconid={d_con_id} key={k} readOnly={readOnly} />
          }
        })
      }
    </>
  )
}

// export const SelectBox1 = ({ rolldata, featureTData, features, readOnly }) => {
//   return (
//       <>
//           {
//               rolldata.map((e, k) => {

//                   let ftdata = []
//                   const FidName = []
//                   let defaultV = ""
//                   let d_con_id = ""

//                   for (let i = 0; i < featureTData.length; i++) {
//                     if (featureTData[i].design_feature_id === e.design_features_id) {
//                       ftdata = featureTData[i].featureTypeList
//                       FidName.push({id:e.design_features_id, name: e.design_features_name})
//                       defaultV = features[e.design_features_name] === undefined ? "" : features[e.design_features_name]
//                       d_con_id = e.design_configuration_id
//                     }  
//                   }
//                   // for (let i = 0; i < featureTData.length; i++) {
//                   //     //const element = array[i];
//                   //     ftdata = featureTData[i].featureTypeList
//                   //     FidName.push({ id: e.design_features_id, name: e.design_features_name })
//                   //     defaultV = features[e.design_features_name] === undefined ? "" : features[e.design_features_name]
//                   //     d_con_id = e.design_configuration_id

//                   // }

//                   /* if (featureTData.length > 0 && featureTData !== null) {

//                   } */
//                   if (FidName.length > 0) {
//                       return <FDiv data={ftdata} tempid={k}
//                           FidName={FidName} defaultV={defaultV}
//                           dconid={d_con_id} key={k} readOnly={readOnly} />
//                   }
//               })
//           }
//       </>
//   )
// }


const SideOptions = ({ rolldata, featureTData, features }) => {
  return (
    <div className="col-lg-12 prod_block">

      <div className="fabwindow">
        {/* <div className="header info_fab_heading"        
            >Properties</div> */}
        <div className="basic_div" id="UpropertyDiv" style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
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
                maxHeight: "500px"
              }}
            >
              {/* akasht */}
              {/* <div className="design_crop cursor" style={{ display: 'none' }}><Crop size={18} /></div>
                    <div color="primary" className='float-left iconthumb btn btn-light' >
                                  <Edit size={18} className='' /> Edit Design
                                  <span style={{ marginLeft: '0.5rem' }}>                                  
                                      <input type="file" className="file_input_select cursor"
                                          accept="image/x-png,image/jpeg,image/jpg,image/tiff,image/tif,image/bmp,.dob"
                                          />                                      
                                  </span>
                    </div> */}
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export const UploadDesign = (props) => {

  //getState={getState}
  const [Success, setSuccess] = useState(false)
  const success_toggle = () => setSuccess(!Success)
  const [msg, setmsg] = useState('')
  const URL = `url("${props.src}")`
  //const URL = props.src
  const [featureTData, rolldata] = getFTG()
  const [message, setMessage] = useState('Uploading cache...')
  //const [rd, setrd] = useState(rolldata)


  return (
    <>

      <Modal isOpen={props.modal} toggle={() => {
        props.HovFun(false)
        props.toggle()
      }} className="modal-lg modal-dialog-centered"
        fade={false}
      >
        <ModalHeader className='col-lg-12' toggle={() => {
          props.HovFun(false)
          props.toggle()
        }}>Edit/Modify Design
        </ModalHeader>
        <Row className='m-0' style={{ overflowY: 'hidden', overflowX: 'hidden' }}>
          <ImgBox URL={URL} fibName={props.fibName} />
          <div className="col-lg-6 p-0" >

            <ModalBody className="pr-0">
              <div className="row">

                {/* <ImgBox URL={URL} fibName={props.fibName}/> */}

                <SideOptions featureTData={featureTData} rolldata={rolldata} features={props.features} />
              </div>
            </ModalBody>
          </div>
        </Row>
        <ModalFooter className='d-flex justify-content-right align-items-center'>
          {props.access !== null && props.access["444449"] && !props.access["444449"]["227789"] && <div>
            <Input type="checkbox" id="renderchk" className="position-relative mr-50" defaultChecked={false} onClick={
              (e) => {

              }
            } />
            Render Cache
          </div>}
          <Button color="primary" className='float-right'
            onClick={async () => {
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

                //const url = props.src.replace(/\/t\//, '/a/').replace(/t\./, 'a.')
                const url = props.src
                const getBase64 = (data) => {

                  // file['base64'] = data
                  const modifyobj = {}
                  const Features_Dic = []
                  const tmp = []
                  const temp_arr = []

                  document.querySelectorAll('#modifyPop .form-group').forEach(function (elem, index) {
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
                  //! Looke at this ⬇ 
                  //TODO : For Img Crope Working
                  modifyobj['IsImageUpdate'] = true
                  modifyobj['Is_override'] = false
                  modifyobj['Dm_Design_Id'] = props.uid
                  const val = document.getElementById('collectionFabLibrary').value
                  const options = val.split('-')
                  modifyobj['Dm_DesignType_Id'] = options[0].trim()
                  modifyobj['Dm_Design_Group_Id'] = options[1].trim()
                  modifyobj['Dm_Supplier_Id'] = props.supplierref.current?.value ? props.supplierref.current?.value : 0
                  modifyobj['SaveExclusiveDesignRequestDto'] = {} 
                  modifyobj['SaveInventoryDesignRequestDto'] = {
                    Di_State: props.di_state
                  } 
                  modifyobj['Features_Dic'] = JSON.stringify(Features_Dic.length === 0 ? 0 : Features_Dic)
                  modifyobj['FeatureList'] = JSON.stringify(tmp)

                  modifyobj['designBase64'] = data.replace("data:image/jpeg;base64,", "")
                  modifyobj['designsize'] = props.designsize
                  //modifyobj['designBase64'] = null


                  modifyobj['Dm_Design_Code'] = props.fibName.trim()
                  modifyobj['Dm_Design_Name'] = props.fibName.trim()
                  const DesignCodeFormater = (str) => {
                    const list = str.split("-")
                    const clone = [...list]
                    const first = clone[0]
                    const last = clone[clone.length - 1]
                    //key = list.length
                    if (list.length === 1) {
                      return {
                        first: undefined,
                        mid: first,
                        last: undefined
                      }
                    } else if (list.length === 2) {
                      return {
                        first: null,
                        mid: list[0],
                        last: list[1]
                      }
                    } else {
                      list.pop()
                      list.shift()
                      return {
                        first,
                        mid: list.join('-'),
                        last
                      }
                    }
                  }
                  const temp = DesignCodeFormater(props.fibName.split('.')[0])
                  modifyobj['Dm_Variant'] = temp.last ? temp.last : `0`
                  modifyobj['Dm_Article'] = temp.first ? temp.first : `0`
                  modifyobj['Dm_Design'] = temp.mid.trim() ? temp.mid.trim() : `0`

                  const popUp = (bol) => {

                    const Swal = require('sweetalert2')

                    if (bol) {
                      //msg = `Design Updated Sucessfully..!`
                      //setmsg(`Design Updated Sucessfully..!`)
                      Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: 'Design Features Updated Sucessfully..!',
                        // backdrop: false,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: true
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          if (bol) {
                            props.toggle()
                            props.setreRender(!props.reRender)
                            //props.setSelect(!props.select)
                          }
                        }
                      })
                    } else {
                      //setmsg(`Design Not Updated Sucessfully..!`)
                      Swal.fire({
                        position: 'center',
                        icon: 'info',
                        title: 'Failed to update design feature..!',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        showConfirmButton: true
                      })
                    }
                    success_toggle()
                  }
                  if (props.mainTDS !== null && props.mainTDS !== undefined) {
                    help_for_upload(modifyobj, popUp, props.mainTDS, props)
                  }
                }

                if (url.includes("data:image")) {
                  getBase64(url) //file['base64'] = url
                } else {
                  convertToBase64(url, getBase64)
                }
                /*  props.toggle()  */
              }
            }}>
            Update
          </Button>
          <Button color="danger" className='float-right' onClick={() => {
            props.toggle()
            props.HovFun(false)
          }}>
            Cancel
          </Button>
          {/* <UpdateSuccessPopup modal={Success} msg={msg} toggle={success_toggle} ></UpdateSuccessPopup> */}
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
        <Edit size={18} onClick={toggle} style={{ height: '18px', width: '18px', marginRight: '1rem' }} />
        <UploadDesign modal={modal} toggle={toggle} src={props.src} fibName={props.fibName}
          setreRender={props.setreRender} reRender={props.reRender}
          HovFun={props.HovFun} uid={props.uid} features={props.features} style={{ height: '18px', width: '18px', marginRight: '1rem' }} />
        <FibricInfo fibName={props.fibName} src={props.src} features={props.features} HovFun={props.HovFun} style={{ height: '18px', width: '18px', marginLeft: '1rem' }} />
        <a target="_blank" href={QR} >
          <Trash2 size={18} onClick={() => setDel(!Del)} style={{ height: '18px', width: '18px', marginLeft: '1rem' }} />
        </a>
        <DeletePopUp modal={Del} toggle={deltoggle} setDel={setDel} id={props.uid} loaderRef={loaderRef} setreRender={props.setreRender} reRender={props.reRender} style={{ height: '18px', width: '18px', marginLeft: '1rem' }} />
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
