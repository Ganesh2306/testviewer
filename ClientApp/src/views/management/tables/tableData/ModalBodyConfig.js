import { useState, useEffect } from 'react'
import {  ModalBody, ListGroup, ListGroupItem, CustomInput } from 'reactstrap'
import ListGroupDesign from './ListGroupDesign'
import ConfigList from './ConfigList'
// ! PopUpBody 


const ModalBodyConfig = (props) => {
  const inputstyle = {
    color: "green"
  }
  return (
    < ModalBody style={{Padding : "0.8rem"}}>
          <ConfigList forWhat={props.forWhat} data={props.types }/>
    </ModalBody >
  )
}

export default ModalBodyConfig
