import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
//import OrderPage from './OrderComponent/OrderPage'
import OrderPage from "../OrderPage/OrderComponent/OrderPage"

const GenerateOrder = (props) => {
    const [showOrder, setShowOrder] = useState(0)  //0 1 2
    const [alldesign, setalldesigndata] = useState([])
    const BoardId = props.selectedboard
    const selectedDesign = []
    const history = useHistory()

    return (
        <div>
             <Modal id='createWindow' isOpen={true} toggle={() => props.setShowOrder(false)} className='modal-xl modal-dialog-centered m-0' style={{ maxWidth: '100%' }}>
                <ModalHeader toggle={() => {
                    history.goBack()
                    //props.setShowOrder(false)
                }}> 
                {/* Order Request Form */}
                </ModalHeader>
                <ModalBody>
                    <OrderPage selectedDesign={JSON.parse(sessionStorage.designMaster)} Design={JSON.parse(sessionStorage.designMaster)} selectedboard={0}
                        selectionDataRef={JSON.parse(sessionStorage.designMaster)} showOrder={props.showOrder} setShowOrder={true}
                        setViewOrder={false} desc={true} isCartJourney={true} />
                </ModalBody>
            </Modal>

        </div>
    )
}
export default GenerateOrder
