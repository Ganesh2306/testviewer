import React, { useState, useEffect } from "react"
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

import axios from 'axios'

let rcount = -1

export const getHead = () => {
  const arr = []
  try {
    const a = document.getElementById('main-thead').firstElementChild.cells
    for (let index = 2; index < a.length; index++) {
    //const element = array[index];
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
   return  document.querySelectorAll(`#row-${nodeIndex} td input`)[index - 2].value
  } else {
    return document.querySelectorAll(`#row-${nodeIndex} td`)[index].textContent
  }
}

let f = true
const TopBody = (props) => {
  const Loop = (pro) => {
    if (props.rollData !== null) {
     return  (props.rollData.allDesignTypesByRoles.map((e, k) => { 
        return  (e.getDesignGroupsByRoleListDto.map((a, b) => {
          if (f) {
            pro.setOption(`${e.design_type_id} - ${a.design_groups_id}`)
            f = false
          }  
          return (<option
            designtypeid= {e.design_type_id}
            designgroupid={a.design_groups_id}
            value={`${e.design_type_id} - ${a.design_groups_id}`} 
        //temp={`${e.design_type_id} - ${a.design_groups_id}`} 
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
    rcount = rcount + 1
    props.setChangeFile({change:rcount})
  }

  const removebyId = (id = 5) => {
    //default is 5
    
    rcount = rcount + 1
    props.setreMoveid({dontUse:rcount, use:5})
  }

  const [selectedName, setselectedName] = useState()
  return (
    <div className="col-lg-12">
      <div>
        <Col className="col-xl-4 col-lg-4 col-md-4 col-sm-12 float-left p-0 leftpanel">
          <Form className="form-inline">
            <div className="form-group float-left col-lg-12 col-md-12 col-sm-12 flex-lg-nowrap pl-0">
              <Label for="saveFabLibrary" className="col-lg-12 pl-0 justify-content-left" style={{justifyContent:'Left'}}>
                Upload 3D Images and Add Propeties
              </Label>
             
            </div>
          </Form>
        </Col>
        <Col className="col-xl-8 col-lg-8 col-md-8 col-sm-12 float-left text-lg-right p-0 rightpanel">
          <div className="form-group mb-0">
            <Label
              className="btn btn-sm btn-primary waves-effect waves-light  mb-1"
              style={{ marginRight: "4px" }}
            >
              <Input
                id="importFabric"
                type="file"
                accept="image/x-png,image/jpeg,image/jpg,image/tiff,image/tif,image/bmp,.dob"
                multiple="true"
                onChange={props.handleAttachFIle}
                style={{ display: "none", padding:"0.486rem 0.5rem" }}
              />
          Upload 3D
            </Label>
            <Button
              type="button"
              id="removeFabric"
              className="btn btn-sm btn-light waves-effect waves-light  mb-1"
              style={{ marginRight: "4px", padding:"0.486rem 0.5rem" }}
              onClick={() => {
                //pass id 
                alert('Work-in-Progress')
                removebyId(5)
              }}
            >
              Remove
            </Button>

            <Button
              type="button"
              id="removeAllFabric"
              className="btn btn-sm btn-light waves-effect waves-light mb-1"
              style={{ marginRight: "4px" }}
              onClick={removeAll}
            >
              Remove All
            </Button>
            <Button
              type="button"
              id="saveFabric"
              className="btn btn-sm btn-light waves-effect waves-light mb-1"
              style={{ marginRight: "4px" }}
              onClick={() => {
                //pass Upload Id 
                props.uploadSingleFile(2)
              }}      
              //onClick={
                //     //pass Upload Id 
                //     // props.uploadSingleFile(2)
                //     priSave((el) => {
                //         saveThreedImage(el)
                //     })
                //   //  props.onSaveConfiguration
                // }      
            >
              Save
            </Button>
            <Button
              type="button"
              id="saveAllFabric"
              className="btn btn-sm btn-light waves-effect waves-light mb-1"
              style={{ marginRight: "4px" }}
              //onClick = {props.handelOnclick}
              onClick = {alert("H!")}
            >
              Save All
            </Button>         
           
          </div>
        </Col>       
        <UploadProgress />
      </div>
     
    </div>
  )
}

 export const EditThreeD_Design = (props) => {

  const [AllFiles, setFiles] = useState(null)  //! all resopnce 
  const [option, setOption] = useState()
  const [rollData, setrollData] = useState(null)
  const [changeFile, setChangeFile] = useState(rcount)
  const [reMoveid, setreMoveid] = useState({dontUse:-1, use:undefined})
  
  useEffect(async() => {
    const response = await axios.get(`./Role/GetRoleDesignConfigurationByRole?RoleId=${0}`)
    setrollData(response.data)
    f = true
  }, [])
  
  const handleAttachFIle = (e) => {

    //! do a sevice req from  axios and get responce
    //! After reaponce push it to state Var  

    
    //setFiles(e.target.files)
   
    /* setTimeout(() => {
      e.target.value = ""
    }, 200) */
  }

  const handelOnclick = () => {

  }

  const uploadSingleFile = (id) => {

  }

  return (
    <div>
      <Modal
        isOpen={props.modal}
        toggle={props.toggle}
        className="add_threedesign modal-xl shadow-none"
        style={{
          width: "100%",
          margin: "0",
          maxWidth: "100%",
          height: "100vh",
          background: "#fff",
          overflow: "hidden"
        }}
      >
        <ModalHeader toggle={props.toggle}>Add 3D Images</ModalHeader>
        <Form>
          <ModalBody className="px-0">         
            <TopBody 
            setUploadFile={props.setUploadFile}
             handleAttachFIle={handleAttachFIle}
              handelOnclick={handelOnclick}
              uploadSingleFile={uploadSingleFile}
              changeFile={changeFile}
              setChangeFile={setChangeFile} 
              rollData={rollData}
              setreMoveid={setreMoveid}
              setOption={setOption} />

            <ContentTable files={AllFiles}
             rollData={rollData}
             changeFile={changeFile}
             reMoveid={reMoveid}
             option={option}
             />
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
 export default connect(null, mapDispatchToProps)(EditThreeD_Design)