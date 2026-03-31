import { useState, useContext } from 'react'
import { Button, Modal, DropdownItem, Form } from 'reactstrap'
import { stateContext } from '../../../../context/stateContext'

// ! Add AddUser function 

const OrderInvoiceButton = (props) => {
  const { isOpen, setOpen } = useContext(stateContext)
   return (
    <> 
    <span className= "text-primary pointer" style={{cursor:'pointer'}} onClick={() => setOpen(true)}>1145</span>
  </>
  )
}

export default OrderInvoiceButton

