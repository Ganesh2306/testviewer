import React, {useState} from 'react'
import { Edit } from 'react-feather'

import { Input, Label, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FormGroup } from 'reactstrap'
export const ModalSaveInCollection = () => {
  const ranges = [
    {
      label: 'Now',
      value: new Date()
    }
  ];
    const [is_open, setis_open] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div>
        <Button.Ripple color='' className='btn-sm' onClick={() => setis_open(true)}>
        SaveIn Collection
         <Edit size={16} />
         </Button.Ripple>
         <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm'>
           <ModalHeader toggle={() => setis_open(false)}> Save in Collection</ModalHeader>
           
           <ModalBody>
                 <FormGroup>
                   <Label for='collnameVertical'>New collection</Label>
                   <Input type='text' name='col_name' id='collnameVertical' placeholder='Sustainability and wellness' />
                 </FormGroup>
                 <hr/>
                 <FormGroup className="mb-0" style={{maxHeight:'200px',minHeight: '200px',overflow:'auto'}}>
                   <Label>previous collection 1</Label>
                   <hr/>
                   <Label>previous collection 2</Label>
                   <hr/>
                   <Label>previous collection 3</Label>
                   <hr/>
                   <Label>previous collection 4</Label>
                 </FormGroup>
                 
           </ModalBody>


    <ModalFooter>
    <Button color='primary' onClick={() => setis_open(false)}>
       Save
    </Button>
    </ModalFooter>
         </Modal>
       </div>
    )
}
