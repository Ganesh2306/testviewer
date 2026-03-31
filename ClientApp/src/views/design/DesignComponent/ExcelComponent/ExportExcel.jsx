import { useRef, useState } from 'react'
import { R_Loader } from '../../../loader/loader'
import { Modal, Form, Button } from 'reactstrap'
import { useForm } from 'react-hook-form'
import ModalHeaderUI from './../../../modal/ModalHeader'
import ModalFooterUI from './../../../modal/ModalFooter'
import ModalExportExcelBodyUI from './ModelExportBodyUI'
import { useDispatch } from 'react-redux'
//import * as Form from '@uppy/form'
import axios from 'axios'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ! Edit user function 
const OpenExportExcel = (props) => {

    const Swal = require('sweetalert2')
    const [isLoader, setLoader] = useState(false)  /* abhishek new*/
    //** Ref */
    const loaderRef = useRef(null)
    const childRef = useRef()
    const dispatch = useDispatch()
    const excelSchema = yup.object().shape({
        type_group: yup.string().notRequired(),
        start_Date: yup.date().required('Please select date').typeError('Please select start date'),
        end_Date: yup.date().required('Please select date').typeError('Please select end date').min(
            yup.ref('start_Date'),
            "end date can't be before start date"
        )
    })

    const { register, errors, handleSubmit } = useForm({ mode: 'onChange', resolver: yupResolver(excelSchema) })

    const GetExcel = async (e) => {
        //dispatch(ShowLoader(true))
        //setLoader(true)      //abhishek new
        loaderRef.current.style.display = 'block'
        const tpgpID = document.getElementById('exporttpegroupid').value
        const start_Date = document.getElementById('start_Date1').value
        const end_Date = document.getElementById('end_Date1').value

        const r = {}
        r['startDate'] = start_Date//start_Date+"000:00:00.0000"
        r['endDate'] = end_Date//end_Date+"000:00:00.0000"
        r['folderId'] = 0
        r['designTypeId'] = tpgpID.split('-')[0].trim()
        r['designGroupId'] = tpgpID.split('-')[1].trim()
        r['organisationId'] = 0
        r['drivePath'] = ""

        /*  axios.post(`./Design/GetDesignMasterExcel`, r)
          .then(response => {    
                        
              if (response !== null) {
                  props.setOpen1(!props.isOpen1)
                  let a = document.createElement("a")
                  a.href = `${response.data}` //`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response}`
                  a.download = 'DesignMaster.xlsx'
                  document.body.appendChild(a)
                  a.click()
                  a.remove()
                   a = null

              } else {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Error in excel generation!'
                  })
              }

          })
          .then(() => {

          })
          .catch(err => console.log(err)) } */
        function download() {
            fetch(`./Design/GetDesignMasterExcel`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(r)
            }).then(async response => {
                const mediaType = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"
                const d = await response.json()
                const anchor_href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${JSON.parse(d)}`
                const link = document.createElement("a")
                link.download = "DesignMaster.xls"
                link.href = anchor_href //`${mediaType}${await response.json()}`

                link.click()


                loaderRef.current.style.display = 'none'
            })
                .catch(e => {
                    loaderRef.current.style.display = 'none'
                })
        }
        download()

    }


    return (
        <>
            <div className='vertically-centered-modal'>
                <Modal backdrop="static" isOpen={props.isOpen1} toggle={() => props.isOpen1(false)} className='modal-md'>
                    <ModalHeaderUI setis_open={props.setOpen1} headerName="Export Excel" />
                    <Form onSubmit={handleSubmit(GetExcel)} autocomplete="none" >
                        <ModalExportExcelBodyUI register={register} errors={errors} ref={childRef} bodyFor="Save" rollData={props.rollData} />
                        <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Generate Excel" />
                    </Form>
                </Modal>
            </div>
            <R_Loader loaderRef={loaderRef} />
        </>
    )
}

export default OpenExportExcel