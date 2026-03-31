
import React, { useState } from 'react'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CollezioniGetSeasonMastersList } from '../../../store/actions'
import { Button, Modal, Form } from 'reactstrap'
import ModalHeaderUI from '../../../../modal/ModalHeader'
import ModalFooterUI from '../../../../modal/ModalFooter'
import ModalBodyUI from '../../tableData/ModalBodySeason'
import { propTypes } from 'react-bootstrap/esm/Image'
import { data } from 'jquery'
import axios from 'axios'

const MySwal = withReactContent(Swal)

const EditSeason = (props) => {
const [isShow, setShow] = useState(false)   
const [is_open, setis_open] = useState(false)   
const dispatch = useDispatch()
const store = useSelector(state => state.Seasonal)

const seasonSchema = yup.object().shape({  
  Season_Name: yup.string().min(1),
  Description:yup.string(),
  State:yup.string(),
  profile_Image:yup.mixed()
  })
const { register, errors, handleSubmit, trigger } = useForm({ mode: 'onChange', resolver: yupResolver(seasonSchema) })

const onSubmit = async (e) => {
  let base64 = null
  if (e.profile_Image) {
      const arrayBuffer = e.profile_Image[0] ? await e.profile_Image[0].arrayBuffer() : ""
     base64 = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  }    
  
  //  const seasondto = new Object()
  //  seasondto.State = 2
  //  seasondto.Season_Name = e.Season_Name
  //  seasondto.Description = e.Description
   //seasondto.profile_Image = base64
  //document.getElementsByName("profile_Image")[0].getAttribute("data") === null ? null : document.getElementsByName("profile_Image")[0].getAttribute("data").split(",")[1]
   const SeasonDto = {
    State : 2,
    Sm_Season_Name : e.Season_Name ? e.Season_Name : store.selectedseasonal.sm_Season_Name,
    imageiamgebase64 :  base64 ? base64 : store.selectedseasonal.seasonIamge,
    Sm_Organization_Id : store.selectedseasonal.sm_Organization_Id,
    Sm_Created_By : store.selectedseasonal.sm_Created_By,
    Sm_Supplier_Id : store.selectedseasonal.sm_Supplier_Id,
    Sm_State :  eval(document.getElementById("C_StoreType").value),
    Sm_Season_Id : parseInt(e.season_Id),
    Sm_Order_No : store.selectedseasonal.sm_Order_No,
    Sm_Created_On : store.selectedseasonal.sm_Created_On

 }
  
  
    return MySwal.fire({
     title: ' Update a Season?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, Update it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
   axios.post(`./Seasonal/CollezioniSaveSeasonMasters`, SeasonDto)
   .then(response => {
    if (response.data) {
       const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
       const IsExist = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isExist
       if (JSON.parse(response.data).message === null) {
           if (Isave !== null && Isave !== false && IsExist === false) {
               Swal.fire(
                   'Updated!',
                   'Season has been Updated.',
                   'success'
               )
           }
               if (Isave !== null && Isave === false && IsExist === true) {
                Swal.fire(
                    'Season Name Already Exist.'
                    )
                }
                }
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
               props.setShow(false)
              
               
           })
      }
   })
  //  .then(() => {

  //  })
  //  .catch(err => console.log(err))

}

    // setis_open(false)
    // return MySwal.fire({
    //  title: ' Update a Season?',
    //   icon: 'success',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, Update it!',
    //   customClass: {
    //     confirmButton: 'btn btn-primary',
    //     cancelButton: 'btn btn-outline-danger ml-1'
    //   },
    //   buttonsStyling: false
    // }).then(function (result) {
    //   if (result.value) {
    //     MySwal.fire({
    //       icon: 'success',
    //       title: 'Season Created!',
    //       text: 'Your file has been assgined in season.',
    //       customClass: {
    //         confirmButton: 'btn btn-success'
    //       }
    //     })
    //   }
    // })
 // }
 
  return (
    <div>
        <Modal isOpen={props.isShow} toggle={() => setis_open(props.setShow(false))}  className='modal-sm-12' backdrop={'static'}>
                <ModalHeaderUI setis_open={props.setShow} headerName="Edit Season" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBodyUI selectedseasonal={store.selectedseasonal} bodyFor="Update" register={register} errors={errors}  />
                    <ModalFooterUI FooterBtnName="Update" setis_open={props.setShow}/>
                </Form>
        </Modal>
    </div>
  )
}
export default EditSeason
