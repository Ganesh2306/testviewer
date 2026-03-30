import React, {useState} from 'react'

import InvoiceList from './Tables'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

export const ModalStatusReport = (props) => {
  const ranges = [
    {
      label: 'Now',
      value: new Date()
    }
  ]

    const [is_open, setis_open] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    return (
        <div>
        {/* <Button.Ripple color='' className='btn-sm' onClick={() => setis_open(true)}>
        Status Report
         <Edit size={16} />
         </Button.Ripple> */}
         <Modal isOpen={props.reportopen} toggle={() => props.setreportopen(false)} className='modal-xl'>
           <ModalHeader toggle={() =>  props.setreportopen(false)}> User Status</ModalHeader>
           
           <ModalBody>

                 <div style={{
    margin: 'auto',
    padding: '0px 20px 0px 20px'}}>
                 <InvoiceList></InvoiceList>
                 </div>
             
           </ModalBody>


    <ModalFooter>
    <Button color='primary' onClick={() =>  props.setreportopen(false)}>
       Save
    </Button>
    </ModalFooter>
         </Modal>
       </div>
    )
}
