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
  Input,
  Alert,
  FormGroup,
  ButtonGroup
} from "reactstrap"
import { AlertCircle } from "react-feather"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getQRbase64, getQRbase642 } from "../Utility/Utility"
import { selection } from "../Utility/selection"
import axios from 'axios'
import Swal from 'sweetalert2'
import { searchHandel } from "../TopBar"
import { R_Loader } from "../../../loader/loader"
export const help_for_delete = async (data, cb = null, props, selecteddesigns) => {
  props.loaderRef.current.style.display = 'block'
  const formPayload = new FormData()
  const Swal = require('sweetalert2')
  formPayload.append('file', null)

  formPayload.append('alldata', JSON.stringify(data))

  await axios({
    url: './Design/UploadDesigns',
    method: 'post',
    data: formPayload,
    headers: { 'Content-Type': 'multipart/form-data' },
    enctype: 'multipart/form-data'
  }).then(async e => {
    const message = e.data.message
    if (e.data.message === null) {
      if (e.data.issaved && cb !== null) {
      } else {
        if (cb !== null) {
          cb(false)
        }
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: message,
        showConfirmButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          selection.reMoveAll()
          if (document.querySelector('#page') && document.querySelector('#page').checked === true) {
            document.querySelector('#page').checked = false
          }
          props.setreRender(!props.reRender)
          const isAllSearch = true
          let IsName = ""
          if (props.orderbyref.current.value === "Name") {
            IsName = true
          } else {
            IsName = false
          }
          searchHandel(props, undefined, isAllSearch, 0, props.orderbycountref.current.value ? parseInt(props.orderbycountref.current.value) : 15, undefined, IsName)
          props.orderbyref.current.value = "Name"
        }
      })
    }
    if (selecteddesigns.length === 1 || props.designCode !== undefined) {
      await singleDeleteCache(props.designCode, selecteddesigns)
    } else if (selecteddesigns.length > 1) {
      await MultipleDeleteCache(selecteddesigns, e.data.designList)
    }
  })
  props.loaderRef.current.style.display = 'none'

}
const CanCelPopUp = (props) => {
  return (
    <Modal isOpen={props.Cancel} toggle={props.CancelToogle} className="modal-md mt-4">
      <center ><h1 style={{ marginTop: '20px', marginBottom: '5px' }} >Your Design is Safe</h1>
      </center>
      <ModalBody>
        <center>
          <Button color="success" onClick={props.CancelToogle}>
            OK
          </Button>
        </center>
      </ModalBody>

    </Modal>
  )
}
const MultipleDeleteCache = async (selecteddesigns, designList) => {
  let saveBase64Image = {}
  let items = []
  function filterArrays(selected, designlist, items) {
    for (let i = 0; i < selected.length; i++) {
      if (designlist.includes(selected[i])) {
        continue
      } else {
        items.push(selected[i])
      }
    }
    return items
  }

  if (designList.length > 0) {
    items = filterArrays(selecteddesigns, designList, items)
  } else {
    items = selecteddesigns.map((e) => {
      return e
    })
  }
  if (items.length > 0 && items !== null && items !== undefined) {
    items.forEach((e) => {
      saveBase64Image = {
        DesignName: e,
        IsOverrite: false,
        IsDelete: true,
        IsFirstImage: false
      }
      axios.post(`./Design/SaveBase64Image`, saveBase64Image).then((response) => {
        const res = JSON.parse(response.data)
        return res
      }).catch((error) => {
        console.error('Error in axios request:', error)
        return false
      })
    })
  }
}

const singleDeleteCache = async (Dm_Design, selecteddesigns) => {
  const saveBase64Image = {
    IsOverrite: false,
    IsDelete: true,
    IsFirstImage: false
  }
  if (Dm_Design !== undefined) {
    saveBase64Image.DesignName = Dm_Design
  } else {
    saveBase64Image.DesignName = selecteddesigns[0]
  }
  axios.post(`./Design/SaveBase64Image`, saveBase64Image).then((response) => {
    const res = JSON.parse(response.data)
    return res
  }).catch((error) => {
    console.error('Error in axios request:', error)
    return false
  })
}

export const DeletePopUp = (props) => {
  const [Cancel, setCancel] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)
  return (
    <>
      <Modal isOpen={props.modal} toggle={props.toggle} className="modal-md modal-dialog-centered" id="D_deletepopup" backdrop={false} >

        <center >
          <AlertCircle color='orange' size={100} style={{ marginTop: '20px', marginBottom: '5px' }} /> <br />
          <h1>Are You Sure?</h1>
          <br />
          <h5>The design you have selected will be deleted permanently</h5>
        </center>
        <ModalBody>
          <div className='float-right'>
            <Button color="success"  //disabled={isLoading} 
              className='m-1' onClick={async () => {
                props.loaderRef.current.style.display = 'block'
                try {
                  props.loaderRef.current.style.display = 'block'
                  const temp1 = Object.keys(selection.slected)
                  const temp2 = Object.values(selection.slected)
                  const fablist = temp1.map((e, i) => {
                    return e
                  })
                  const fablist2 = temp2.map((e, i) => {
                    return e
                  })
                  const selecteddesigns = fablist2.map(item => item.name)
                  const isStorageF = await axios.post(`./Design/GetStorageLocation`)
                  if (!isStorageF.data.isStorage) {
                    Swal.fire({
                      position: 'center',
                      icon: 'info',
                      title: 'Please configure storage  !⚠',
                      showConfirmButton: true
                    })
                  } else {
                    setCancel(true)
                    const modifyobj = {}
                    const Features_Dic = []
                    const tmp = []
                    const temp_arr = []

                    //  document.querySelectorAll('#modifyPop .form-group').forEach(function(elem, index) {
                    const fd = {}
                    const vs = {}
                    vs['dd_details_id'] = 0
                    vs['dd_dm_id'] = 0
                    vs['dd_feature_id'] = 0
                    vs['dd_feature_type_id'] = 0
                    vs['dd_feature_type_name'] = 0
                    vs['dd_design_configuration_id'] = 0

                    /* if (elem.getElementsByTagName('input')[0].value !== "") {
                      fd['Featurename'] = 0
                      fd['FeatureTypename'] = 0
                      Features_Dic.push(fd)
                    } */
                    tmp.push(vs)
                    // })

                    modifyobj['State'] = 3
                    modifyobj['DesigIds'] = fablist.join() ? fablist.join() : props.id
                    modifyobj['Dm_Design_Id'] = 0
                    const val = document.getElementById('collectionFabLibrary').value
                    const options = val.split('-')
                    modifyobj['Dm_DesignType_Id'] = options[0].trim()
                    modifyobj['Dm_Design_Group_Id'] = options[1].trim()
                    modifyobj['Dm_Supplier_Id'] = props.supplierref.current?.value ? props.supplierref.current?.value : 0
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
                    modifyobj['designBase64'] = "/9j/4AAQSkZJRgABAQEBLAEsAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAOAA8DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9TdLuptC1640+5TdDcf6uRj8o+lW/DGp/YRcabeLvZSCrNTPFOhteeH7W8eT99A+Rg8EVB4iSPTI7HUCpaSZCr89TS5TQ/9k="

                    modifyobj['Dm_Variant'] = "0"
                    modifyobj['Dm_Article'] = "0"
                    modifyobj['Dm_Design'] = "0"
                    modifyobj['Dm_Design_Code'] = "0"//props.fibName 
                    modifyobj['Dm_Design_Name'] = props.fibName
                    const popUp = (bol) => {
                      const Swal = require('sweetalert2')
                      if (bol) {
                        props.orderbyref.current.value = "Name"
                        //msg = `Design Updated Sucessfully..!`
                        //setmsg(`Design Updated Sucessfully..!`)
                        Swal.fire({
                          position: 'center',
                          icon: 'info',
                          title: 'Design Deleted Sucessfully..!',
                          showConfirmButton: true
                        }).then((result) => {
                          if (result.isConfirmed) {
                            if (bol) {
                              props.setreRender(!props.reRender)
                              //props.toggle()
                            }
                          }
                        })
                        props.setDel(false)
                      } else {
                        //setmsg(`Design Not Updated Sucessfully..!`)
                        Swal.fire({
                          position: 'center',
                          icon: 'info',
                          title: 'Design Not Deleted ..!',
                          showConfirmButton: true
                        })
                      }
                      //  success_toggle()
                      //delete design cache
                    }
                    help_for_delete(modifyobj, popUp, props, selecteddesigns)
                    //  await DeleteCache(props.designCode)
                  }
                  // props.loaderRef.current.style.display = 'none'
                  props.toggle()
                  //setIsLoading(false)
                } catch (error) {
                  props.loaderRef.current.style.display = 'none' // Hide loader in case of an error
                  //setIsLoading(false)
                  console.error('An error occurred:', error)
                }
                props.toggle()
              }}>
              Yes, delete it!
              </Button>
            <Button color="danger" onClick={props.toggle}>
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* <CanCelPopUp Cancel={ Cancel } CancelToogle={ () => {
          setCancel(false)
      }} /> */}

    </>
  )
}

export const QrPopUp = ({ showqr, toogleqr, src, fabName }) => {
  const Swal = require('sweetalert2')
  return (
    <Modal isOpen={showqr} toggle={toogleqr} className="modal-sm modal-dialog-centered">
      <ModalHeader toggle={toogleqr} className='text-center justify-content-center'>Scan QR Code </ModalHeader>
      {/* <center ><h4 style={{marginTop:'20px', marginBottom:'5px'}} >QR</h4>
               </center> */}
      <ModalBody>
        {/* <center>
                  <img src={getQRbase64(src)} alt="ar" />
                </center>
                  <center>
                      <Button color="success" onClick={toogleqr}>
                          OK
                      </Button>
                  </center>  */}
        <Form>
          <Row>
            <Col md='12' className='text-center'>
              <FormGroup>
                <center>
                  <img src={getQRbase64(src)} alt="ar" />
                </center>
              </FormGroup>
              <FormGroup>
                <Input type='text' name='lastname' id='id="q3dLink"' placeholder='Q3dlink' value={src} disabled={true} />
              </FormGroup>
            </Col>
            <Col md='12' className='d-flex justify-content-center'>
              <CopyToClipboard text={src}
              //onCopy={() => this.setState({copied: true})}
              >
                <Button color='primary' className='mx-50'
                  onClick={() => {
                    Swal.fire('Link Copy....')
                  }}
                >
                  Copy Link
                </Button>
              </CopyToClipboard>

              <Button color='primary' className='mx-50' onClick={async () => {
                const a = document.createElement('a')
                a.href = await getQRbase642(src, fabName)
                a.download = fabName || "q3dqr"
                a.click()
              }} >
                Download
              </Button>
            </Col>
          </Row>
        </Form>

      </ModalBody>

    </Modal>
  )
}