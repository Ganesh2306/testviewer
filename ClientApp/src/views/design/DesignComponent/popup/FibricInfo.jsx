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
import { Edit, ArrowUpRight } from "react-feather"
import { getFTG } from "../TopBar"
import { SelectBox1 } from "./UploadDesign"

const SideOptions = ({rolldata, featureTData, features}) => {
 
  return (
    <div className="col-lg-12 prod_block">
      <div className="fabwindow">
        {/* <div className="header info_fab_heading">Properties</div> */}
        <div className="basic_div" id="UpropertyDiv" >
        <SelectBox1 rolldata={rolldata} featureTData={featureTData} features={features} readOnly={true} />
        </div>
      </div>
    </div>
  )
}

const ImgBox = ({fibName, URL}) => {
     
  return (
    <Col className="col-lg-6 prod_block_first p-50 ">
      <div className="fabwindow">
        <div className="Fab_name">
          <ul id="UfabricList" className="list-group">
            <li
              className="list-group-item selected designfab_name"             
              value="bulk2 (1371)"
              did="46811434302"
            >
              {" "}
              Design : {fibName}
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
                  height: "100vh",  
                  maxHeight:"500px"  
              }}
            ></div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export const InfoBox = (props) => {
  const [featureTData, rolldata] = getFTG()
    const URL = `url("${props.src}")`
  
  return (
    <>
      <Modal isOpen={props.modal} toggle={props.toggle} className="modal-lg modal-dialog-centered" fade={false} >
       <ModalHeader toggle={() => {
          props.toggle()
          props.HovFun(false)
        }}> Fabric Information </ModalHeader>
        <Form>
        <Row className = 'm-0' style={{overflowY: 'hidden', overflowX: 'hidden'}}>
          <ImgBox fibName={props.fibName} URL={URL} />
            <div className="col-lg-6 p-0" >      
              <ModalBody className="pr-0" >
              <div className="row">
                <SideOptions featureTData={featureTData} rolldata={rolldata} features={props.features} />
              </div>
             </ModalBody>
       
           </div>
           </Row>  
        </Form> 
        <ModalFooter>
              {/*<Button color="primary" onClick={props.toggle}>*/}
              {/*  Save*/}
              {/*</Button>*/}
            </ModalFooter>      
      </Modal>
    </>
  )
}

export const FibricInfo = (props) => {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  
  return (
    <>
      <ArrowUpRight size={18} onClick={toggle} role='button' />
      <InfoBox fibName={props?.check?.fname} modal={modal} toggle={toggle} src={props.src} features={props.features} HovFun={props.HovFun} />
      &nbsp;&nbsp;
    </>
  )
}
