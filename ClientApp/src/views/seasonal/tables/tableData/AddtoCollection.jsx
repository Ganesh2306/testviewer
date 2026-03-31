import ModalHeaderUI from '../../../modal/ModalHeader'
import ModalFooterUI from '../../../modal/ModalFooter'
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { Button, Modal, Form } from 'reactstrap'
import axios from 'axios'
import ModalBodyAddCollection from './ModalBodyAddCollection'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
const MySwal = withReactContent(Swal)
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { selection } from '../../../design/DesignComponent/Utility/selection'
import { data } from 'jquery'
const AddtoCollection = (props) => {
   const [articleValue, setArticleValue] = useState('')
   const [Seasonlist, setSeasonlist] = useState(null)
   const [is_open, setis_open] = useState(false)

    const onChangeArticleName = (e) => {
        setArticleValue(e.target.value)
    }
  const savecollSchema = yup.object().shape({
    season_name: yup.string(),
    Collection_name :yup.string()
  })
  const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(savecollSchema) })

    const onSubmit = (e) => {
    console.log(e)
    const temp1 = Object.keys(selection.slected)
    console.log(Object.keys(selection.slected))
    // const data = temp1.forEach(element => {
    //   //State : 0
    //   Coll_Dm_Id : Object.keys(selection.slected)
    //   Sm_Season_Id : parseInt(e.season_name)
    //   Collection_id : parseInt(e.Collection_name)
    // })
    const Totalarr = []
    const obj = {}
    obj.CollectionDetailDto = temp1.map((f) => {
      
      return {
        state : 0,
        Coll_Dm_Id : parseInt(f),
        Sm_Season_Id : parseInt(e.season_name),
        Collection_id : parseInt(e.Collection_name)
      }
    })
    Totalarr.push(obj.CollectionDetailDto)
    // const data = {
    //   State : 0,
    //   Coll_Dm_Id : Object.keys(selection.slected),
    //   Sm_Season_Id : parseInt(e.season_name),
    //   Collection_id : parseInt(e.Collection_name)
    // }
    // console.log(Object.assign({}, seleted_id))
    setis_open(false) 
    //axios.post('./Seasonal/SaveCollectionDetailsOnSeasonID', obj.CollectionDetailDto) //Pending
    return MySwal.fire({
     title: ' Assign to Collection?',
//     text: "Move designs in Collection?",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        axios.post('./Seasonal/SaveCollectionDetailsOnSeasonID', obj.CollectionDetailDto).then(response => {
          if (response.data.isSave) {
            MySwal.fire({
              icon: 'success',
              title: 'Designs Added to Collection!',
              text: 'Your file has been saved in seasonal collection.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })
          } else {
            MySwal.fire({
              icon: 'Unsuccessfull',
              title: 'Designs Not Added to Collection!',
              text: 'Your file has been  Not saved in seasonal collection.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            })

          }
        })
       
      }
    })
  }
  const obj = {
    OrganisationId: 0,
    SupplierId: 0,
    start: 0,
    end: 0
}

// useEffect(async () => {
//   const res = await axios.post("./Seasonal/GetSeasonMastersList", obj)
//   setSeasonlist(res.data)

//   return () => {
//     setSeasonlist(null)
//   }
// }, [])

  return (
    <>
            <Button type="button"   color='primary' className="btn btn-sm btn-primary ml-50"  onClick={async() => {
              const seletedlength = Object.keys(selection.slected).length
              if (seletedlength > 0) {
                setis_open(true)
              } else {
                Swal.fire('Please Select Design')
              }
            } }>
               Assign to Collection
           </Button>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm-12' backdrop={'static'}  >
              <ModalHeaderUI setis_open={setis_open} headerName="Assign to Collection" />
                <Form onSubmit={handleSubmit(onSubmit)}   >
                    <ModalBodyAddCollection register={register} bodyFor="add" Seasonlist={ Seasonlist } />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Add to Seasonal Collection"/>
                </Form>
            </Modal>
        </>
  )
}

export default AddtoCollection
