import ModalHeaderUI from '../modal/ModalHeader'
import ModalFooterUI from '../modal/ModalFooter'
import React, { useState } from 'react'

import { Button, Modal, Form } from 'reactstrap'
import ModalBodyUI from './tables/advance/ModalBody'

const ShareDesigns = () => {
    const [is_open, setis_open] = useState(false)
  return (
    <div>
            <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Create Season
      </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm-12' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Create Season" />
                <Form >
                    <ModalBodyUI bodyFor="add"   />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Create" />
                </Form>
            </Modal>
        </div>
  )
}

export default ShareDesigns
