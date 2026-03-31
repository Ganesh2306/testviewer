import { useState } from 'react'

import { Button, Modal, DropdownItem, Form } from 'reactstrap'
import { Delete, Edit, Phone, Shield, Trash } from 'react-feather'
import axios from 'axios'
import { getDesignFeautre } from '../../store/actions/index'
import { useDispatch} from 'react-redux'
import ModalBodyDesignFeature from '../ModalBodyDesignFeature'

import ModalHeaderUI from '../../../../modal/ModalHeader'
import ModalFooterUI from '../../../../modal/ModalFooter'

// ! Add AddUser function 

const DeleteRecord = (props) => {
    const [isOpen, setis_open] = useState(false)
    const Swal = require('sweetalert2')
    const dispatch = useDispatch()
    return (
    <>
     <div className="dropdown-item">
              <Trash size={15} className="mr-1" onClick={
                  Swal.fire({
                      title: 'Are you sure?',
                      text: "You want to delete this ?",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                      if (result.isConfirmed) {
                          const features = []
                          const data = new Object()
                          const root = new Object()
                          data.state = 3
                          data.design_Feature_Id = props.ID
                          data.is_deleted = true
                          features.push(data)
                          root.saveFeatureRequestDto = data
                          axios.post('./Management/SaveFeature', root)
                              .then(response => {
                                  const Isave = response.data === null ? null : response.data.isSave
                                  if (Isave !== null && Isave !== false) {
                                      Swal.fire(
                                          'Deleted!',
                                          'Your design feature has been deleted.',
                                          'success'
                                      )
                                      dispatch(getDesignFeautre())
                                  } else {
                                      Swal.fire({
                                          icon: 'error',
                                          title: 'Oops...',
                                          text: 'Something went wrong!'
                                      })
                                  }

                              })
                              .then(() => {

                              })
                              .catch(err => console.log(err))

                      }
                  })

              } />Delete
    </div>
  
  {/* <DropdownItem className='w-100'><Delete size={15} className = "mr-1"/>Delete</DropdownItem> */}
  {/* <Delete size={15} className = "ml-2"/> */}
    {/* <Modal isOpen={isOpen} toggle={() => setis_open(false)} className='modal-lg'>
    <ModalHeaderUI setis_open={setis_open} headerName="Edit Feature" />
    <Form onSubmit={(e) => {

      //if(ValidateEmail()===true&&Phone()==true)
      setis_open(false)
      e.preventDefault()
      console.log(props.id)
    }}>
    <ModalBodyDesignFeature bodyFor="Update" editName = "Update" editLabelName = "Edit Design Feature" editLabelList ="Design Feature List" />
    <ModalFooterUI setis_open={setis_open} FooterBtnName="Save" />
    </Form>
  </Modal>    */}
  </>
  )
}

export default DeleteRecord

