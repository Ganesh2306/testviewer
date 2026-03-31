import { useRef, useState} from 'react'
import { R_Loader } from '../../loader/loader'
import { Modal, Form, Button } from 'reactstrap'
import ModalHeaderUI from './../../modal/ModalHeader'
import ModalFooterUI from './../../modal/ModalFooter'
import ModalExportExcelBodyUI from './ModelExportBodyUI'
import axios from 'axios'

const OpenSupplierExportExcel = (props) => { 
    const loaderRef = useRef(null)  
    const dropdown = document.getElementById('sort-select1')
    const selectedOption = dropdown?.options[dropdown.selectedIndex] ? dropdown?.options[dropdown.selectedIndex] : ''
    const Supplierid = parseInt(selectedOption.id)
    const org_type = JSON.parse(localStorage.userData)?.org_type
    let Excelrequest = {
      SupplierId : 0,
      OrganisationId : JSON.parse(localStorage.profile).org_id  ? JSON.parse(localStorage.profile).org_id : 0
  }
    if (org_type === 1) {
       Excelrequest = {
        SupplierId : Supplierid,
        OrganisationId : JSON.parse(localStorage.profile).org_id  ? JSON.parse(localStorage.profile).org_id : 0
    }
  }
  if (org_type === 2) {
      Excelrequest = {
        SupplierId : JSON.parse(localStorage.userData)?.org_type_id,
        OrganisationId : JSON.parse(localStorage.profile).org_id  ? JSON.parse(localStorage.profile).org_id : 0
    }
  }
    const ExportStockQty = async (Excelrequest) => {
      loaderRef.current.style.display = 'block'
    //  axios.post(`./Supplier/ExportStockQty?SupplierId=${Excelrequest.SupplierId}&OrganisationId=${Excelrequest.OrganisationId}`, Excelrequest).then(async res => {
    try {
        const res = await axios.post(`./Supplier/ExportStockQty?SupplierId=${Excelrequest.SupplierId}&OrganisationId=${Excelrequest.OrganisationId}`, Excelrequest).then(async res => {
    
        if (res.data) {
           //loaderRef.current.style.display = 'none'
          const fileUrl = res.data 
          const link = document.createElement('a')
          link.href = fileUrl
          link.download = 'ExportStock.xlsx'
          link.click()
          loaderRef.current.style.display = 'none'
        } else {
          console.error("No file path received from the server.")
          loaderRef.current.style.display = 'none'
        }
    })
      } catch (error) {
        console.error("Error:", error)
        loaderRef.current.style.display = 'none'
      }
    } 
    const ExportOrderRequest = async (Excelrequest) => {
      loaderRef.current.style.display = 'block'
        try {
            const res =  axios.post(`./Supplier/ExportOrderRequest?SupplierId=${Excelrequest.SupplierId}&OrganisationId=${Excelrequest.OrganisationId}`, Excelrequest).then(async res => {
            if (res.data) {
                const fileUrl = res.data
                const link = document.createElement('a')
                link.href = fileUrl
                link.download = 'OrderList.xlsx'
                link.click()
                loaderRef.current.style.display = 'none'
              } else {
                console.error("No file path received from the server.")
                loaderRef.current.style.display = 'none'
              }
            })
            } catch (error) {
              console.error("Error:", error)
              loaderRef.current.style.display = 'none'
            }
    } 
    const ExportOrderRequestDetails = async (Excelrequest) => {
      loaderRef.current.style.display = 'block'
        try {
            const res =  axios.post(`./Supplier/ExportOrderRequestDetails?SupplierId=${Excelrequest.SupplierId}&OrganisationId=${Excelrequest.OrganisationId}`, Excelrequest).then(async res => {
        if (res.data) {
            const fileUrl = res.data
            const link = document.createElement('a')
            link.href = fileUrl
            link.download = 'OrderDetails.xlsx'
            link.click()
            loaderRef.current.style.display = 'none'
          } else {
            console.error("No file path received from the server.")
            loaderRef.current.style.display = 'none'
          }
        })
        } catch (error) {
          console.error("Error:", error)
          loaderRef.current.style.display = 'none'
        }
    } 

    return (
        <>
        <div className='vertically-centered-modal'>
            <Modal backdrop="static" isOpen={props.isOpen1} toggle={() => props.isOpen1(false)} className='modal-md'>
                <ModalHeaderUI setis_open={props.setOpen1} headerName="Export Stock" />
                <Form  onSubmit={(e) => {
                     e.preventDefault()
                  
                    if (props.dataToPass === "ExportStock") {
                         ExportStockQty(Excelrequest)
                         }
                        
                   if (props.dataToPass === "OrderList") {
                         ExportOrderRequest(Excelrequest) 
                        }

                   if (props.dataToPass === "OrderDetails") {
                         ExportOrderRequestDetails(Excelrequest)
                        }
                        

                }} >
                    <ModalExportExcelBodyUI bodyFor="Save" />
                    <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Generate Excel" />
                </Form  >
            </Modal>
        </div>   
        <R_Loader loaderRef={loaderRef} />    
        </>
    )
}

export default OpenSupplierExportExcel