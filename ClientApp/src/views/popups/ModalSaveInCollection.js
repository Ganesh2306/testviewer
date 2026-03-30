import React, {useState} from 'react'
import { Plus } from 'react-feather'
import { toast } from 'react-toastify'
import { CollectionSuccessToast } from '../popups/CollectionSuccessToast'
import { FormGroup, Input, Label, Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const ModalSaveInCollection = (props) => {
  const CollectionSuccess = () => toast.success(<CollectionSuccessToast />, { hideProgressBar: true, autoClose: 3000 })
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
         <Modal isOpen={props.is_open} toggle={() => props.setis_open(false)} className='modal-sm modal-dialog-centered'>
           <ModalHeader  toggle={() => props.setis_open(false)}> Save in Collection</ModalHeader>
           
           <ModalBody>
                 <FormGroup>
                   <Label for='collnameVertical'>New collection</Label>
                   <Input type='text' name='col_name' id='collnameVertical' placeholder='Wishlist Name' />
                 </FormGroup>
                 <hr/>
                 <FormGroup className="mb-0" style={{maxHeight:'200px', minHeight: '200px', overflow:'auto'}}>
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
    <Button.Ripple className='btn-icon  mr-50' color='white'
                        onClick={() => {
                            props.setis_open(false)
                            props.setis_createopen(true)
                        }}>

                        <Plus size={14} />
                        <span className='align-middle ml-25 d-none d-sm-inline text-strong'>Save in New Collection</span>
     </Button.Ripple>
    <Button color='primary'  onClick={() => { props.setis_open(false); CollectionSuccess() }}>
       Save
    </Button>
    </ModalFooter>
         </Modal>
       </div>
    )
}
