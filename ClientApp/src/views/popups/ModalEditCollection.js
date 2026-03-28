import React, {useState} from 'react'
import { Edit } from 'react-feather'

import { FormGroup, Input, Label, Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

export const ModalEditCollection = (props) => {
  const [img, setImg] = useState(null)

  const onChange = e => {
    if ((e.target.files[0].size / 1024 / 1024) < 0.2510) {
        const reader = new FileReader(),
            files = e.target.files
        reader.onload = function () {
            setImg(reader.result)
        }
        reader.readAsDataURL(files[0])
    } else {
        const Swal = require('sweetalert2')
        Swal.fire({
            icon: 'info',
            title: 'Image Size...',
            text: 'The Uploaded image is too large!  The max image size  (250KB or less) '
        })
    }
}

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
        {/* <Button.Ripple color='' className={'btn-sm'}> */}
        
         <Edit className={ props.coll_edit }  onClick={() => setis_open(true)} />
        {/*  </Button.Ripple> */}
         <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm modal-dialog-centered' backdrop='static' >
           <ModalHeader toggle={() => setis_open(false)}> Edit Collection</ModalHeader>
           
           <ModalBody style={{minHeight:'300px'}}>
                 <FormGroup>
                   <Label for='nameVertical'>Collection Name</Label>
                   <Input type='text' name='col_name' id='nameVertical' placeholder='Collection Name' value='Grow Harvest' disabled/>
                 </FormGroup>
                 <FormGroup>
                   <Label for='categoryVertical'>Category</Label>
                   <select id="categoryVertical"  className="form-control"  name="category" >
                  <option value="Suiting">Suiting</option>
                  <option value="Shirting">Shirting</option>
              </select>
                 </FormGroup>
              <FormGroup className="">
        <Label for="description">Description</Label>
        <Input type="textarea" name="text" id="description" placeholder='Write your description...' />
      </FormGroup>
      <FormGroup >
      <Label for="description">Select Cover Picture</Label>
      <label class="mb-75 me-75 btn btn-primary btn-xs form-label d-block">Upload  </label>
       <input data={img}
                            name="profile_Image"
                            type='file' hidden                           
                            id='profile_Image'
                            onChange={onChange}
                            accept='image/*' 
                            className='upload-cover'                          
          /> 
     
      </FormGroup>
      <FormGroup>
        <p className="mb-0"><strong>Delete this Collection</strong></p>
        <Label>Deleting this Collection and all of its designs forever</Label><Label>You can't undo this.</Label>
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
