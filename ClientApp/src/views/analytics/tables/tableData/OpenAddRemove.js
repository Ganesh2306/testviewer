import { useState } from 'react'

import { Button, Modal } from 'reactstrap'

import ModalBodyAddRemove from './ModalBodyAddRemove'

import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'


// ! Add AddUser function 
const AddRemoveProp = (btnName) => {
    const [is_open, setis_open] = useState(false)
    console.log(is_open)
    return (
        <div>
            <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Add/Remove Design Property
                           </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md '>
                <ModalHeaderUI setis_open={setis_open} headerName="Add/ Remove Design Properties" />
                <ModalBodyAddRemove bodyFor="AddCustomer"  editName = "Add" editLabelName="Add/ Remove Desing Properties" />              
                <ModalFooterUI  setis_open={setis_open} FooterBtnName="Save" FooterBtnCancel="Cancel"/>                
            </Modal>
        </div>
    )
}

export default AddRemoveProp