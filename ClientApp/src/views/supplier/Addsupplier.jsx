import React, { useState } from 'react'

import { Button, Modal, Form } from 'reactstrap'

import ModalBodyUI from './tables/tableData/ModalBody'

import { stateContext } from "../context/stateContext"
import { useForm } from 'react-hook-form'

import ModalHeaderUI from './../modal/ModalHeader'
import ModalFooterUI from './../modal/ModalFooter'

// ! Add AddUser function 
const Addsupplier = (btnName) => {
  const [is_open, setis_open] = useState(false)
  const { register, errors, handleSubmit } = useForm()
  // const { isValide, setIsValide, isEmpty, setisEmpty } = React.useContext(stateContext)
  const onSubmit = data => {
    //toast.success(<SuccessToast data={data} />, { hideProgressBar: true })
    console.log('hello')
    /* if (isValide) {
      setIsValide(false)
      //d.Status = 'Active'
      setis_open(false)
      data.preventDefault()
      //! logic

    } else {
      //setisEmpty(true)
      alert('Fill all Field ')
    }
    console.log(isValide)
 */
    setis_open(false)
    data.preventDefault()
  }

  return (
    <div>
      <Button.Ripple color='primary' onClick={() => setis_open(true)}>
        Add Role
      </Button.Ripple>
      <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm-12'>
        <ModalHeaderUI setis_open={setis_open} headerName="Add Role" />
        <Form onSubmit={(e) => {
            onSubmit(e)
        }}>
          <ModalBodyUI bodyFor="add" />
          <ModalFooterUI setis_open={setis_open} FooterBtnName="Add Role" />
        </Form>
      </Modal>
    </div>
  )
}

export default Addsupplier