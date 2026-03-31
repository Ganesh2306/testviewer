import { useState } from 'react'

import { Button, Modal } from 'reactstrap'

import ModalBodyDesignGroup from './ModalBodyDesignGroup'

import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'

// ! Add AddUser function 

const AddDesignGroup = (btnName) => {
    const [is_open, setis_open] = useState(false)
    console.log(is_open)
    return (
        <div>
            <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Add Group
           </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-md'>
                <ModalHeaderUI setis_open={setis_open} headerName="Add Design Group" />
                <ModalBodyDesignGroup bodyFor="AddDesign" editName = "Add" editLabelName="Add Design Group"/>
                <ModalFooterUI  setis_open={setis_open} FooterBtnName="Save" />
            </Modal>
        </div>
    )
}

export default AddDesignGroup