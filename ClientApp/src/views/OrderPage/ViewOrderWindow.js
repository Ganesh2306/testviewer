import React, {useState, useContext} from 'react'
import { accessContext } from '../context/accessContext'

import { Modal, ModalHeader, ModalBody} from 'reactstrap'
import ViewOrderPage from './OrderComponent/ViewOrderPage'

export const ViewOrderWindow = (props) => {
  const { is_boarduser, selectedUser } = useContext(accessContext)
  const { orderid, currentStatus, setUpdatePrante } = props
  const [isShowReport, setShowReport] = useState(false)

    return (
        <div className='ordermodel'>    
         <Modal id='vieworderA' isOpen={props.viewOrder} toggle={() => props.setViewOrder(false)} className='modal-xl modal-dialog-centered m-0' style={{maxWidth:'100%'}}>
           <ModalHeader  toggle={() =>  {
            props.setViewOrder(false)
            setUpdatePrante(prv => !prv)
                }}>
                 {/* {selectedUser.label} */}
                </ModalHeader>
           <ModalBody>
           {/* <button type="button" class="close" aria-label="Close"  toggle={() =>  {
            props.setViewOrder(false)
        
                }}>
                <span aria-hidden="true">×</span></button> */}
            <ViewOrderPage setUpdatePrante={setUpdatePrante} currentStatus={currentStatus} orderid={orderid}  ShowReport={true}  showOrder={props.showOrder} 
             setShowOrder = {props.setShowOrder} orderType = {props.orderType}           
                    setViewOrder={props.setViewOrder}/>
           </ModalBody>
         </Modal>
        
       </div>
    )
}
// props.setViewOrder(false) 