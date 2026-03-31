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

const ImgBox = ({ fibName, URL }) => {
    return (
        <Col className="col-lg-12 prod_block_first p-50">
            <div className="fabwindow">
                <div className="Fab_name">
                    <ul className="list-group">
                        <li className="list-group-item selected rounded-0 designfab_name">
                            Design: {fibName}
                        </li>
                    </ul>
                </div>
                <div className="position-relative">
                    <div style={{ width: "100%", height: "calc(97vh - 32px)", overflow: "hidden" }}> {/* Dynamic height based on viewport */}
                        <div
                            style={{
                                backgroundImage: `url(${URL})`,
                                backgroundSize: "auto", // Ensures the image covers the container without leaving gaps
                                backgroundPosition: "center",
                                width: "100%",
                                height: "100%" // Ensures the container takes full height of the preview
                            }}
                        />
                    </div>
                </div>
            </div>
        </Col>
    )
}


export const PreviewFab = (props) => {
    const image = props.src
    //const URL = image.replace('/t/', '/b/').replace('t.jpg', 'b.jpg')
    const URL = image.replace('/t/', '/z/').replace('t.jpg', 'z.jpg').replace(/\(/g, "%28").replace(/\)/g, "%29")
  return (
        <>
            <Modal 
                isOpen={props.preview} 
                toggle={props.setPreview} 
                className="modal-fullscreen"
                style={{ maxWidth: "100vw", height: "auto", maxHeight: "0vh",  margin: "0rem"  }} // 90% of viewport size
            >
                <ModalHeader className='col-lg-12' toggle={() => props.setPreview(false)}>
                    Preview
                </ModalHeader>
                <ModalBody className='p-0'>
                    <Row className='m-0'>
                        <ImgBox URL={URL} fibName={props.fibName} />
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}

