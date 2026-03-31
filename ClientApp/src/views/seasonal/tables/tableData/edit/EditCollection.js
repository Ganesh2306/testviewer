
import React, { useState } from 'react'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GetCollectionListBySeasonId, GetEditCollection } from '../../../store/actions'
import { Button, Modal, Form } from 'reactstrap'
import ModalHeaderUI from '../../../../modal/ModalHeader'
import ModalFooterUI from '../../../../modal/ModalFooter'
import ModalBodyCollection from '../ModalBodyCollection'
import { propTypes } from 'react-bootstrap/esm/Image'
import axios from 'axios'

const MySwal = withReactContent(Swal)

const EditCollection = (props) => {
const [CustomerId, SetCustomerId] = useState(0)
const [isShow, setShow] = useState(false)   
const [is_open, setis_open] = useState(false)   
const dispatch = useDispatch()
const store = useSelector(state => state.Collection)

const SeasonSchema = yup.object().shape({  
      Select_Season:yup.string(),
      Collection_Name:yup.string(),
      Collection_Type:yup.string(),
      Customer_Name:yup.string(),
      Status:yup.string(),
      profile_Image:yup.mixed().required('File is required')
  })

const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(SeasonSchema) })
  const onSubmit = async (e) => {
    let base64 = null
    if (e.profile_Image && e.profile_Image.length !== 0) {
        const arrayBuffer = e.profile_Image ? await e.profile_Image[0].arrayBuffer() : ''
       base64 = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }    
  
 const collectionData = {
  Collection_Id : store.selectedcollection.collection_Id,
  Collection_Name : e.Collection_Name,
  Sm_Season_Id : store.selectedcollection.sm_Season_Id,
  imageiamgebase64 : base64 ? base64 : store.selectedcollection.collectionIamge,
  Collection_Organisation_Id : 0,
  State : 2,
    // Collection_Customer_Id: store.selectedcollection.collection_Customer_Id,
    //collectionIamge
  Collection_Customer_Id: CustomerId !== 0 ? CustomerId : store.selectedcollection.collection_Customer_Id,
  Collection_Customer_User_id : store.selectedcollection.collection_Customer_User_id,
  Collection_Created_On : store.selectedcollection.collection_Created_On,
  Collection_Created_By : store.selectedcollection.collection_Created_By,
  Collection_Modified_On : store.selectedcollection.collection_Modified_On
 }
//  obj.Collection_Id = store.selectedcollection.collection_Id
//  obj.Collection_Name = e.Collection_Name
//  obj.Sm_Season_Id = store.selectedcollection.sm_Season_Id 
//  obj.imageiamgebase64 = base64
//  //base64 === undefined ? null : base64
//  obj.Collection_Organisation_Id = 0
//  obj.State = 2
//  obj.Collection_Customer_Id = store.selectedcollection.collection_Customer_Id
//  obj.Collection_Customer_User_id = store.selectedcollection.collection_Customer_User_id
//  obj.Collection_Created_On = store.selectedcollection.collection_Created_On
//  obj.Collection_Created_By = store.selectedcollection.collection_Created_By
//  obj.Collection_Modified_On = store.selectedcollection.collection_Modified_On
    setis_open(false)
    return MySwal.fire({
     title: ' Update a Collection?',
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
        axios.post(`./Seasonal/SaveCollectionBySeasonId`, collectionData).then(response => {
          if (response.data) {
            const Isave = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isSave
            const IsExist = JSON.parse(response.data) === null ? null : JSON.parse(response.data).isExist
            if (JSON.parse(response.data).message === null) {
                if (Isave !== null && Isave !== false && IsExist === false) {
                    Swal.fire(
                        'Updated!',
                        'Collection has been Updated.',
                        'success'
                    )
                }
                    if (Isave !== null && Isave === false && IsExist === true) {
                     Swal.fire(
                         'Collection Name Already Exist.'
                         )
                     }
                     }
                     }
        const obj = new Object()
        const pageno = 0 //Number(document.getElementsByClassName("pagination")[0].getElementsByClassName("active")[0].innerText) - 1 //abhishek 03/03
          //const entries = Number(document.getElementById("sort-select").value)
          const entries = parseInt(document.getElementById("sort-select").value)
          obj.SeasonID = store.selectedcollection.sm_Season_Id
        if (pageno === 0) {
            obj.page = 0
            obj.perPage = entries
        } else {
            obj.page =  entries
            obj.perPage = pageno * entries
        }
        
          props.setShow2(false)
            dispatch(GetCollectionListBySeasonId(obj))
        })
      } 
     })
    }
  return (
    <div>
        <Modal isOpen={props.isShow2} toggle={() => setis_open(props.setShow2)}  className='modal-sm-12' backdrop={'static'}>
                <ModalHeaderUI setis_open={props.setShow2} headerName="Edit Collection" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBodyCollection SetCustomerId={SetCustomerId} Seaslist={props.Seaslist} setCustomer={props.setCustomer} selectedcollection={store.selectedcollection}  IsDisable="true" bodyFor="Update" register={register} errors={errors}  />
                  <ModalFooterUI FooterBtnName="Update" setis_open={props.setShow2}
                  />
                </Form>
        </Modal>
    </div>
  )
  }


export default EditCollection
