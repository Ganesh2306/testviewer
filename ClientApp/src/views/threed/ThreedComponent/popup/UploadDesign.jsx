import React, { useState } from "react"
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
import { Edit, Trash2, Crop } from "react-feather"
import { DeletePopUp } from './DeletePopUp'
import { arrayOf } from "prop-types"
 import { UpdateSuccessPopup } from "./UpdateSuccessPopup"

//ToDo : use uid prop and get SRC From Data.js 
    //!This is More Reliable then get Img SRC from Img-div

    const SelectData = ['Finish', 'Count', 'Category', 'Product', 'Weave', 'Construction', 'Blend', 'Colour']
    const OptionData = ['example1', 'example2', 'example3', 'example4']

export const UploadDesign = (props) => {

    const [Success, setSuccess] = useState(false)
    const success_toggle = () => setSuccess(!Success)

    const URL = `url("${props.src}")`

    const SelectBox = (Sprops) => {
      const SelectOption = (Oprops) => {
        return (
          <option
                      coltype="development"
                      isstock="false"
                      isexclusive="true"
                      value="none"
                    >
                      {Oprops.Options}
                    </option>
        )
      }
      return (
        <div className="row form-group col-md-12">
                <label
                  for="exampleInputName2"
                  fid="247508466717"
                  className="col-lg-4 col-sm-4 control-label"
                >
                  {Sprops.Name}
                </label>
                <div className="col-lg-8 col-sm-8">
                  <select className="form-control bg-light" id="Warehouse">
                    
                    <option
                      coltype="development"
                      isstock="false"
                      isexclusive="true"
                      value="SS-21"
                    >
                      none
                    </option>
                    {
                      Sprops.Options.map((e, k) => {
                        return <SelectOption Options={e} />
                      })
                    }
                  </select>
                </div>
              </div>
      )
    }
    //!IMgBox for edit 
  const ImgBox = () => {
      
      //console.log(URL)
    return (
      <Col className="col-lg-6 prod_block_first">
        <div className="fabwindow">
          <div className="Fab_name">
            <ul id="UfabricList" className="list-group">
              <li
                className="list-group-item selected rounded-0"
                style={{
                  backgroundColor: "#337ab7",
                  textTransform: "capitalize",
                  color: "#fff",
                  padding: "8px 12px",
                  display: "block"
                }}
                
              >
                {" "}
                Design : {props.fibName}
              </li>
            </ul>
          </div>
          <div className="fabwindow">
            <div className="show_fabric">
              <div
                id="UshowFabric"
                style={{
                  backgroundImage:
                  URL,
                    //'url(http://res.cloudinary.com/tdscloudcdn/TEXTRONICS_SUPPLIER/41733116920/470118832651/252151144790/bulk2 (137)t.jpg)',
                  width: "100%",
                  height: "250px"
                }}
              ></div>
            </div>
          </div>
        </div>
      </Col>
    )
  }

  const SideOptions = () => {
    return (
      <div className="col-lg-6 prod_block">
        <div className="fabwindow">
          <div className="header"
          style={{
            backgroundColor: "#337ab7",
            textTransform: "capitalize",
            color: "#fff",
            padding: "8px 12px",
            display: "block",
            marginBottom:'8px'
          }}
          >Properties</div>
          <div className="basic_div" id="UpropertyDiv" style={{overflowY:'scroll', height:'250px'}}>
            <div id="propU">
              
             { SelectData.map((e, k) => {
               return <SelectBox Name={e} Options={OptionData} />
             })}
              
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Modal isOpen={props.modal} toggle={() => {
        props.HovFun(false)
        props.toggle()
      }} className="modal-lg"
       fade={false} >
        <ModalHeader toggle={() => {
        props.HovFun(false)
        props.toggle()
      }}>Edit/Modify Design </ModalHeader>
        <Form>
          <ModalBody>
            <div className="row">
              <ImgBox />

              <SideOptions />
            </div>
          </ModalBody>
        </Form>
        <ModalFooter className='d-block'>
        <Button color="primary" className='float-left' >
          <Crop size={18} className='' /> 
          <span style={{marginLeft:'0.5rem'}}>Crop Design</span>
          </Button>

          <Button color="danger"  className='float-right' onClick={() => {
            props.toggle()
            props.HovFun(false)
          }}>
          Cancel
          </Button>                   
          <Button color="success" className='float-right' 
            onClick={success_toggle}             >
            Update
            <UpdateSuccessPopup modal={Success} toggle={success_toggle}></UpdateSuccessPopup>
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
  const [modal, setModal] = useState(false)
  const [Del, setDel] = useState(false)
  const deltoggle = () => setDel(!Del)
  const toggle = () => setModal(!modal)

  //console.log(props.HovFun)
  return (
    <>
      <Edit size={18} onClick={toggle} />
      <UploadDesign modal={modal} toggle={toggle} src={props.src} fibName={props.fibName} HovFun={props.HovFun}  />
      &nbsp;&nbsp;
      
      <Trash2 size={18} onClick={() => setDel(!Del)} />
       <DeletePopUp modal={Del} toggle={deltoggle} />
    </>
  )
}
