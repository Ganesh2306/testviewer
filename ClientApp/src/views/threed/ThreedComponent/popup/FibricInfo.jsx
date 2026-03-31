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

export const InfoBox = (props) => {
    const URL = `url("${props.src}")`
  const ImgBox = () => {
    return (
      <Col className="col-lg-6 prod_block_first">
        <div className="fabwindow">
          <div className="Fab_name">
            <ul id="UfabricList" className="list-group">
              <li
                className="list-group-item selected"
                style={{
                  backgroundColor: "#337ab7",
                  textTransform: "capitalize",
                  color: "#fff",
                  padding: "8px 12px",
                  display: "block"
                }}
                value="bulk2 (137)"
                did="46811434302"
              >
                {" "}
                Design : bulk2 (137)
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
          <div className="header">Properties</div>
          <div className="basic_div" id="UpropertyDiv">
            Hello....
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Modal isOpen={props.modal} toggle={props.toggle} className="modal-lg" fade={false}>
        <ModalHeader toggle={() => {
          props.toggle()
          props.HovFun(false)
        }}> Fabric Information </ModalHeader>
        <Form>
          <ModalBody>
            <div className="row">
              <ImgBox />

              <SideOptions />
            </div>
          </ModalBody>
        </Form>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Save
          </Button>
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
      <InfoBox modal={modal} toggle={toggle} src={props.src} HovFun={props.HovFun} />
      &nbsp;&nbsp;
    </>
  )
}
