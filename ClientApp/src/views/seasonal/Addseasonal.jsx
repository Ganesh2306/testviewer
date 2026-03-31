import ModalHeaderUI from './../modal/ModalHeader'
import ModalFooterUI from './../modal/ModalFooter'
import React, { useState } from 'react'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import { Button, Modal, Form } from 'reactstrap'
import ModalBodyUI from './tables/tableData/ModalBodySeason'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { CollezioniGetSeasonMastersList } from '../seasonal/store/actions/index'

const MySwal = withReactContent(Swal)

const Addseasonal = () => {
  const seasonSchema = yup.object().shape({  
    Season_Name: yup.string().trim().required("Please Enter Season Name"),
    Description:yup.string(),
    State:yup.string(),
    profile_Image:yup.mixed().required('File is required')
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(seasonSchema) })
  const dispatch = useDispatch()
  const store = useSelector(state => state.Seasonal)

  const onSubmit = async (e) => {
    console.log(e)
      const arrayBuffer = e.profile_Image[0] ? await e.profile_Image[0].arrayBuffer() : ''
    const base64 = btoa(
    new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
    //const base64String = btoa(String.fromCharCode(...new Uint8Array(c)))
    console.log(base64)
    const obj = new Object()
    obj.Sm_Season_Name = e.Season_Name
    obj.imageiamgebase64 =  base64
    obj.Sm_State =  parseInt(e.state)
    obj.Sm_Organization_Id = 0
    obj.Sm_Created_By = 0
    obj.Sm_Supplier_Id = 0
    obj.state = 0
    setis_open(false)
    return MySwal.fire({
     title: ' Create a Season?',
//     text: "Move designs in Collection?",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, Create it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
          axios.post(`./Seasonal/CollezioniSaveSeasonMasters`, obj).then(response => {
              const data = JSON.parse(response.data)
              if (data && !data.isExist) {
            MySwal.fire({
              icon: 'success',
              title: 'Season Created!',
              text: 'Your file has been assgined in season.',
              customClass: {
                  confirmButton: 'btn btn-success'
                }
              })
          } else {
              MySwal.fire({
                icon: 'Unsuccessfull',
                title: 'Season Alredy Exists',
                text: 'Your file has been  Not saved in seasonal collection.',
                customClass: {
                  confirmButton: 'btn btn-success'
              }
            })
          }
          const obj = new Object()
               const pageno = 0 
               const entries = Number(document.getElementById("sort-select").value)
               if (pageno === 0) {
                   obj.page = 0
                   obj.perPage = entries
               } else {
                   obj.page =  entries
                   obj.perPage = pageno * entries
               }
               dispatch(CollezioniGetSeasonMastersList(obj))
        
        })
      }
    })
  }
  
 const [is_open, setis_open] = useState(false)
  return (
    <div>
          <Button.Ripple color='primary' onClick={() => setis_open(true)}>
                Create Season
          </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm-12' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Create Season" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUI register={register} bodyFor="add" errors={errors}  />
                    <ModalFooterUI FooterBtnName="Create" />
                </Form>
            </Modal>
     </div>
  )
}

export default Addseasonal
