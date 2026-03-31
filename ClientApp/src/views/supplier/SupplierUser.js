// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
// ** Third Party Components
import {
    Row,
    Col,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Label,
    UncontrolledDropdown
} from 'reactstrap'
import axios from 'axios'
import { R_Loader } from '../loader/loader'
import { MoreVertical } from 'react-feather'
import OpenSupplierExportExcel from './ExcelComponent/OpenSupplierExportExcel'
import OpenExportProductCount from './ProductCountComponent/ExportProductCount'
import OpenExportDesignCount from './CountComponent/ExportDesignCount'
import Swal from 'sweetalert2'
// ** Tables
import TableServerSide from './tables/tableData/SupplierUserTable'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const SupplierUser = () => {
    const [isOpen1, setOpen1] = useState(false)
    const [isOpen2, setOpen2] = useState(false)
    const [isOpen3, setOpen3] = useState(false)
    const [dataToPass, setDataToPass] = useState(null)
    const loaderRef = useRef(null) 
    const [loading, setLoading] = useState(true)
  const [dataFetched, setDataFetched] = useState(false)

 useEffect(() => {
  const dataFetchedStorage = localStorage.getItem('dataFetched')
  if (dataFetchedStorage) {
    setDataFetched(true)
  } else {
    setTimeout(() => {
    setLoading(false)
    setDataFetched(true)  
    localStorage.setItem('dataFetched', true)
    }, 1000)
  }
 }, [])
    const handleButtonClick = (data) => {
        setDataToPass(data)
      }
   
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Supplier User' breadCrumbParent='Supplier User' breadCrumbActive='Supplier User List' />
          <Row className='position-relative'>
          {loading && !dataFetched ? (
           <div className= "text-center">
           <h2 style={{fontFamily: "Montserrat", color:"black"}}>Please Wait ,Loading Supplier User List</h2>
         </div>
        ) : (
            <><div className='supplier_dropdown d-flex align-items-center'>
                          <Label for='sort-select'>Import Export Excel</Label>
                          <OpenSupplierExportExcel setOpen1={setOpen1} isOpen1={isOpen1} dataToPass={dataToPass} />
                          <UncontrolledDropdown>
                              <DropdownToggle className='hide-arrow ml-50 bg-secondary d-block text-center' tag='a' style={{ width: '36px', height: '36px' }}>
                                  <MoreVertical className='text-white mt-50' size={20} style={{ width: '18px', height: '18px' }} />
                              </DropdownToggle>
                              <DropdownMenu right>
                                  <div className=''>
                                      <label className="custom-file-upload w-100 customdropitem  p-1 " title="Import Excel">
                                          <i
                                              className="fas fa-file-import mr-50"
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              data-original-title="Import Excel"
                                          ></i>
                                          <input
                                              id="importExcel"
                                              type="file"
                                              accept=".xls,.xlsx"
                                              multiple=""
                                              style={{ display: 'none' }}
                                              onChange={async (e) => {
                                                  loaderRef.current.style.display = 'block'
                                                  const org_type = JSON.parse(localStorage.userData)?.org_type
                                                  let Suppid = 0
                                                  if (org_type === 1) {
                                                      const d = document.getElementById('sort-select1')
                                                      const selectedOpt = d?.options[d.selectedIndex] ? d?.options[d.selectedIndex] : ''
                                                      Suppid = parseInt(selectedOpt.id)
                                                  }
                                                  if (org_type === 2) {
                                                      Suppid = JSON.parse(localStorage.userData)?.org_type_id
                                                  }
                                                  const obj = {}
                                                  obj['SupplierId'] = Suppid
                                                  const file = e.target.files[0]
                                                  const formPayload = new FormData()
                                                  formPayload.append('file', file)
                                                  formPayload.append('alldata', JSON.stringify(obj))
                                                  await axios({
                                                      url: './Supplier/ImportStockQty',
                                                      method: 'post',
                                                      data: formPayload,
                                                      headers: { 'Content-Type': 'multipart/form-data' },
                                                      enctype: 'multipart/form-data'
                                                  }).then(e => {

                                                      if (e.data !== null && e.data !== undefined) {
                                                          if (JSON.parse(e.data.issaved)) {
                                                              Swal.fire(
                                                                  'Success',
                                                                  'Data saved successfully !!',
                                                                  'success'
                                                              )
                                                              loaderRef.current.style.display = 'none'
                                                          } else {
                                                              Swal.fire({
                                                                  icon: 'info',
                                                                  title: 'Oops...',
                                                                  text: 'Data not saved!'
                                                              })
                                                              loaderRef.current.style.display = 'none'
                                                          }
                                                      } else {
                                                          Swal.fire({
                                                              icon: 'error',
                                                              title: 'Oops...',
                                                              text: 'Something went wrong!'
                                                          })
                                                          loaderRef.current.style.display = 'none'
                                                      }

                                                  })

                                                  e.target.value = ''

                                              } } />
                                          Import Stock
                                      </label>


                                  </div>

                                  <DropdownItem className='p-0 w-100'>
                                      <button
                                          id="exportSupplierExcelBtn"
                                          type="button"
                                          className="btn btn-sm waves-effect waves-light btn-white p-1 w-100 text-left"
                                          data-toggle="modal"
                                          data-target="#export_supplier_model"
                                          title="Export Supplier Excel"
                                          onClick={() => {
                                              setOpen1(!isOpen1)
                                              handleButtonClick("ExportStock")
                                          } }
                                      >
                                          <i
                                              className="fas fa-file-export mr-50 "
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title=""
                                              data-original-title="Export Excel"
                                          >
                                          </i>
                                          Export Stock
                                      </button>
                                  </DropdownItem>
                                  <DropdownItem className='p-0 w-100'>
                                      <button
                                          id="exportSupplierExcelBtn"
                                          type="button"
                                          className="btn btn-sm waves-effect waves-light btn-white p-1 w-100 text-left"
                                          data-toggle="modal"
                                          data-target="#export_supplier_model"
                                          title="Export Supplier Excel"
                                          onClick={() => {
                                              setOpen1(!isOpen1)
                                              handleButtonClick("OrderList")
                                          } }
                                      >
                                          <i
                                              className="fas fa-file-export mr-50 "
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title=""
                                              data-original-title="Export Excel"
                                          >
                                          </i>
                                          Export Order List
                                      </button>
                                  </DropdownItem>

                                  <DropdownItem className='p-0 w-100'>
                                      <button
                                          id="exportExcelBtn"
                                          type="button"
                                          className="btn btn-sm waves-effect waves-light btn-white p-1 w-100 text-left"
                                          data-toggle="modal"
                                          data-target="#export_model"
                                          title="Export Excel"
                                          onClick={() => {
                                              setOpen1(!isOpen1)
                                              handleButtonClick("OrderDetails")
                                          } }
                                      >
                                          <i
                                              className="fas fa-file-export mr-50 "
                                              data-toggle="tooltip"
                                              data-placement="bottom"
                                              title=""
                                              data-original-title="Export Excel"
                                          >
                                          </i>
                                          Export Order Details
                                      </button>
                                  </DropdownItem>
                                  <DropdownItem  className='p-0 w-100'>
                            <button
                            id="exportdesigncount"
                            type='button'
                            className="btn btn-sm waves-effect waves-light btn-white p-1 w-100 text-left"
                            data-toggle="modal"
                            data-target="#export_count"
                            title="Export Excel design"
                            onClick={() => {
                                setOpen2(!isOpen2)                                
                            }}
                            >
                                    <i
                                        className="fas fa-file-export mr-50 "
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title=""
                                        data-original-title="Export Excel design"
                                    >

                                    </i>
                            Export Design Count
                            </button>
                            <OpenExportDesignCount setOpen2={setOpen2} isOpen2={isOpen2} />
                          </DropdownItem>
                          <DropdownItem  className='p-0 w-100'>
                            <button
                               id="exportproductcount"
                               type='button'
                               className="btn btn-sm waves-effect waves-light btn-white p-1 w-100 text-left"
                               data-toggle="modal"
                               data-target="#export_model"
                               title="Export Excel product"
                               onClick={() => {
                                setOpen3(!isOpen3)                                
                        }}
                               >
                                <i
                                        className="fas fa-file-export mr-50 "
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        title=""
                                        data-original-title="Export Excel design"
                                    >
                                    </i>
                                Export Product Count
                                
                               </button>
                               <OpenExportProductCount setOpen3={setOpen3} isOpen3={isOpen3} />
                          </DropdownItem>
                              </DropdownMenu>
                          </UncontrolledDropdown>
                      </div><Col sm='12'>
                              <TableServerSide />
                          </Col></>
        )}
             
      </Row>
      <R_Loader loaderRef={loaderRef} />
    </Fragment>
    
  )
}

export default SupplierUser
