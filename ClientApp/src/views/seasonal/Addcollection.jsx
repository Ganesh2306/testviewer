import ModalHeaderUI from './../modal/ModalHeader'
import ModalFooterUI from './../modal/ModalFooter'
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, Modal, Form } from 'reactstrap'
import ModalBodyCollection from './tables/tableData/ModalBodyCollection'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from "axios"
import { string } from 'prop-types'
import { GetCollectionListBySeasonId } from '../seasonal/store/actions/index'
import { useDispatch, useSelector } from 'react-redux'

const MySwal = withReactContent(Swal)

const Addcollection = (props) => {
  const [Seaslist, sslist] = useState(null)
  const [setCustomer, Customer] = useState(null)
    const addcollSchema = yup.object().shape({  
      Select_Season:yup.string(),
      Collection_Name:yup.string().trim().required("Please Enter collection Name"),
      Collection_Type:yup.string(),
      Customer_Name:yup.string(),
      Status:yup.string(),
      profile_Image:yup.mixed().required('File is required')
    })
    const dispatch = useDispatch()
  const store = useSelector(state => state.Collection)
    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(addcollSchema) })

    const onSubmit = async (e) => {
      console.log(e)
        const arrayBuffer = e.profile_Image[0] ? await e.profile_Image[0].arrayBuffer() : ""
    const base64 = btoa(
    new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
      
     const obj = new Object()
     obj.Collection_Name = e.Collection_Name
     obj.Collection_Customer_Id = parseInt(e.Customer_Name) ? parseInt(e.Customer_Name) : 0
     obj.Sm_Season_Id = parseInt(e.Select_Season) ? parseInt(e.Select_Season) : props.seasonId
     obj.imageiamgebase64 =  base64
     obj.State = 0

        setis_open(false)
        return MySwal.fire({
         title: ' Create a Collection?',
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
            axios.post(`./Seasonal/SaveCollectionBySeasonId`, obj).then(response => {
              const data = JSON.parse(response.data)
              if (data && !data.isExist) {
            MySwal.fire({
              icon: 'success',
              title: 'Collection Created!',
             //text: 'Your file has been assgined in season.',
              customClass: {
                confirmButton: 'btn btn-success'
                }
            })
           } else {
                  MySwal.fire({
                    icon: 'Unsuccessfull',
                    title: 'Collection Alredy Exists',
                    text: 'Your file has been  Not saved in seasonal collection.',
                    customClass: {
                      confirmButton: 'btn btn-success'
                  }
                })
              }
            const obj1 = new Object()
            const pageno = 0 
            const entries = Number(document.getElementById("sort-select").value)
            if (pageno === 0) {
                obj1.page = 0
                obj1.perPage = entries
            } else {
                obj1.page =  entries
                obj1.perPage = pageno * entries                
            }
                //obj.Sm_Season_Id = parseInt(e.Select_Season)
                obj1.SeasonID = props.seasonId
            dispatch(GetCollectionListBySeasonId(obj1))
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
    useEffect(async () => {
      const res = await axios.post("./Seasonal/GetSeasonMastersList", obj)
      sslist(res.data.seasonMastersList)
      const list = await axios.post("./Seasonal/GetConfiguredCustomerList")
      Customer(list.data.customerListDto)
    }, [])

    const [is_open, setis_open] = useState(false)
  return (
    <div>
            <Button.Ripple color='primary' onClick={async() => {
              const seasonlength = Seaslist.length
              if (seasonlength > 0) {
                setis_open(true)
              } else {
                Swal.fire('Please Add Season....')
              }
              } }>
                Create Collection
           </Button.Ripple>
            <Modal isOpen={is_open} toggle={() => setis_open(false)} className='modal-sm-12' backdrop={'static'}>
                <ModalHeaderUI setis_open={setis_open} headerName="Create Collection" />
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBodyCollection bodyFor="add" SeasonId={props.seasonId} SeasonName={props.SeasonName} Seaslist = { Seaslist } setCustomer = { setCustomer } register={register} errors={errors} IsDisable="false" />
                    <ModalFooterUI setis_open={setis_open} FooterBtnName="Create" />
                </Form>
            </Modal>
        </div>
  )
}

export default Addcollection