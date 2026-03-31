import { useState } from 'react'

import { Button, Modal } from 'reactstrap'

import ModalBodyDesignType from './ModelBodyDesignType'

import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import EditButtonName from '../../../modal/EditButtonName'

// ! Add AddUser function 
const AddDesignType = (btnName) => {
    const [is_open, setis_open] = useState(false)
    console.log(is_open)
    return (
        <div>
            <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Add Type
           </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md'>
                <ModalHeaderUI setis_open={setis_open} headerName="Add Design Type" />
                <ModalBodyDesignType bodyFor="AddCustomer"  editName = "Add" editLabelName="Add Design Type" />              
                <ModalFooterUI  setis_open={setis_open} FooterBtnName="Save" />                
            </Modal>
        </div>
    )
}

export default AddDesignType