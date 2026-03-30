import axios from 'axios'
import {  Search, X  } from 'react-feather'
import classnames from 'classnames'
import { Table, Button,  Row, InputGroup, Input, InputGroupAddon, InputGroupText} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useState, useEffect, useRef, useContext } from 'react'
import { ViewOrderWindow } from './ViewOrderWindow'
import orderPdf from './Orderdata/orderPdf'
import { accessContext } from '../context/accessContext'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useWindowSize from '../customHooks/useWindowSize'
// import '../css/viewboard.css'
import Loader from '../Loader/Loader'
const TRow = (props) => {
  const {ordercode, orderid, Customer, Designs, OrderStatus, OrderType, User, cdate, setUpdatePrante } = props
  //const [showOrder,  setShowOrder] = useState(false)
  const [viewOrder, setViewOrder] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
//const history = useHistory()
  const Dateformat = new Date(cdate)
  const month = Dateformat.getMonth() + 1  //months from 1-12
  const day = Dateformat.getDate()
    const year = Dateformat.getFullYear()
  //const newdate = year + "/" + month + "/" + day //2023-07-14
  const newDate = `${year}-${month}-${day}` 
  return (
        <>
           <tr className='ecommerce-card card' >
                 <td>
                   {orderid}
                </td>
            <td>
             <h6 className='item-price  p-1 design_name'> {ordercode} </h6>
           </td>

           <td>
              <span className='p-1 py-25'>{Customer}</span>
           </td>

           <td>
              <span className='p-1 py-25'>{User}</span>
           </td>

           <td>
              <span className='p-1 py-25'>{cdate}</span>
           </td>

            <td  className='lastupdate' >
                   <span className='p-1 py-25'> {Designs}                     
                    </span>
            </td>
               
             <td>
               <p className='p-1 py-25 mb-1 item-description card-text'>{OrderType}</p>
             </td>

              <td  className='showforrow'><span className='p-1 py-25'>{OrderStatus}</span>
              </td>

              {/*<td className=''>*/}
              {/*      <div className='collectionclick' ></div>*/}
              {/*        <div className='board_col_remove'>*/}
              {/*          <FileText className='mr-2 ' size={15}  /> */}
              {/*          <span className='align-middle'></span>*/}
              {/*        </div>                   */}
              {/*</td>*/}

              <td>
                     <div className='d-flex justify-content-left'>
                        <Button type="button" className="btn btn-md btn-secondary mr-50 px-1 view-cartbt" style={{width: '156px'}}
                         onClick={async () => {
                          const finalAppendFabrics = (pareseData, type = `t`) => {
                            const path = pareseData.url
                            return {
                                url : pareseData.url,
                                logoUrl : pareseData.logoUrl,
                                generateOrderReportDto : pareseData.generateOrderReportDto,
                                designOrderReportDto : pareseData.generateOrderReportDto.designOrderReportDto.map((e) => {  
                                    return {
                                        ...e,
                                        imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`
                                    }
                                })
                              
                            }
                        }
                          try {
                            setIsLoading(true)
                            axios.get(`/Order/GenerateOrder_Report?OrderNo=${orderid}`).then(async e => {
                              
                              const data = JSON.parse(e.data)
                              const pareseData = (data)
                              const updatepares = finalAppendFabrics(pareseData)
                              const html = await orderPdf(updatepares, () => setIsLoading(false))
                            })
                        } catch (error) {
                            console.log(error)
                        }
                          }}
                        >Generate Report</Button>
                         {/* {isLoading && <Loader />} */}
                        <div type="button" className="btn btn-md btn-primary" style={{width: '156px'}}  onClick={(e) => {
                          
                            setViewOrder(true)
                        }
                          }>View Request</div>   
                            {<Loader isShow={isLoading} />}
                      </div>
              </td>
          </tr>
                  
          <ViewOrderWindow setUpdatePrante={setUpdatePrante} orderid={orderid} currentStatus={OrderStatus} orderType={OrderType} viewOrder={viewOrder} setViewOrder={setViewOrder}/>
    </>
        )
}
const OrderTable = (props) => {
  const [orignalOrderlist, setOrignalOrderList] = useState([])
  const [activeView, setActiveView] = useState('list')
  const [orderlist, setOrderlist] = useState([])
  const [custlist, setcustlist] = useState([])
  const [updateParent, setUpdatePrante] = useState(false)
  const forceRerender = () => setUpdatePrante(!updateParent)
  const Customerref = useRef("All")
  const orderstatusref = useRef("All")
  const { selectedUser } = useContext(accessContext)
  const [tempsearchValue, setTempSearchValue] = useState('')
  const textserchref = useRef("")
  const history = useHistory()
  //load CustomerOrderList and Serching
  useEffect(async () => {
  const GetMyOrderListRequest1 = {
    RequestType : "All",
    Status : orderstatusref.current ? orderstatusref.current.value : "All"
  }

  if (selectedUser) {
    GetMyOrderListRequest1.CustomerId = ((localStorage.selecteduser && JSON.parse(localStorage.selecteduser)?.value)) ? (JSON.parse(localStorage.selecteduser).value) : 0
  } else {
    GetMyOrderListRequest1.CustomerId = Customerref.current ? Customerref.current.value : 0
  }
      await axios.post('/Order/GetCustomerOrderList', GetMyOrderListRequest1).then(response => {
          const allOrderList = JSON.parse(response.data).allOrderList
          setOrderlist(allOrderList)
          setOrignalOrderList(allOrderList)
    })
    axios.get('/Order/CustomersList').then(response => {
       setcustlist(JSON.parse(response.data).customerListDto)
    })

  }, [updateParent])
const resetSearch = async () => {
    setTempSearchValue("")
    setOrderlist(orignalOrderlist)
}
const { width, height } = useWindowSize()
const backspaceWord = () => {
  const words = tempsearchValue.split('')
  if (words.length > 0) {
    words.pop()
    setTempSearchValue(words.join(''))
    forceRerender()
  }
}
return (
    <>
     <h2 className='mr-1 headers cursor' onClick={() => history.goBack()}>Requests</h2>
      <Row className="col-lg-12 col-sm-12 col-xs-10 text-right d-flex greyHeadinner" id ="headerOrder" >
          <InputGroup className='input-group-merge'>
            <Input className='search-product' placeholder='Search Design' value={tempsearchValue} ref={textserchref} 
                               onChange={(e) => { 
                               setTempSearchValue(e.target.value)  
                               }}
                               onKeyPress={async(e) => {
                               if (e.key === 'Enter') {
                                if (tempsearchValue.trim() !== "") {
                                  const Searchobj = {
                                    searchString :tempsearchValue ? tempsearchValue.trim() : ""
                                  }
                                  if (Customerref.current && Customerref.current.value !== "0") {
                                    Searchobj.CustomerId = Customerref.current ? Customerref.current.value : 0 
                                  } else {
                                    Searchobj.SupplierId = ((localStorage.userData && JSON.parse(localStorage.userData)?.userid)) ? (JSON.parse(localStorage.userData).userid) : 0 
                                  } 
                                  await axios.post('/Order/SearchCustomerOrderList', Searchobj).then(response => {
                                    setOrderlist(JSON.parse(response.data).allOrderList)
                                  })
                                } else {
                                    resetSearch()
                                }
                                }
                               }}
                               onKeyDown={(e) => {
                                if (e.key === 'Backspace') {
                                  e.preventDefault()// Prevent the default backspace behavior
                                  backspaceWord()// Call the backspace function
                                }
                              }}
                               >
            </Input>
            <InputGroupAddon addonType='append'>
              <InputGroupText className='pr-1'>
              {tempsearchValue && (
                 <X type='submit' className='text-primary order_close' size={22}  
                  onClick={async() => {
                      forceRerender()
                      setTempSearchValue("")
                     }}
                />
                )}
                <Search type='submit' className='text-primary' size={22}  
                  onClick={async() => {
                    if (tempsearchValue !== "") {
                      const Searchobj = {
                        searchString :tempsearchValue ? tempsearchValue : ""
                      }
                      if (Customerref.current && Customerref.current.value !== "0") {
                        Searchobj.CustomerId = Customerref.current ? Customerref.current.value : 0 
                      } else {
                        Searchobj.SupplierId = ((localStorage.userData && JSON.parse(localStorage.userData)?.userid)) ? (JSON.parse(localStorage.userData).userid) : 0 
                      } 
                      await axios.post('/Order/SearchCustomerOrderList', Searchobj).then(response => {
                        setOrderlist(JSON.parse(response.data).allOrderList)
                      })
                    } 
                   }}
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        
         <div className='view-options d-flex'>
    {localStorage.selecteduser === undefined && 
<div className='d-flex align-items-center mr-1'>       
               <div className='small text-nowrap mr-50'>Customer:</div>
             <select
                        className='form-control cursor'
                        //type='select' 
                        ref={Customerref}                    
                        // innerRef={rowsPerPage}
                        defaultValue={'25'}  
                        onChange={forceRerender}                           
                        style={{                              
                          padding: '0 0.8rem',
                          backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                        }}
                    >
                      <option value="0" className='dropdown-sort'>All</option>
                        {(custlist).map((e) => {
                        return <option value={e.customer_id} className='dropdown-sort'>{e.customer_Name}</option>
                      })}
             </select>
          </div> }
          <div className='d-flex align-items-center'>       
               <div className='small text-nowrap mr-50 d-md-block d-none'>Request Status:</div>
             <select
                        className='form-control cursor'
                        //type='select'                     
                         //innerRef={rowsPerPage}
                        ref={orderstatusref}
                        defaultValue={'25'} 
                        onChange={forceRerender}                            
                        style={{
                          width: '5rem',
                          padding: '0 0.8rem',
                          backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                        }}
                    >
                                          <option value='All' className='dropdown-sort'>All</option>
                                          <option value='New' className='dropdown-sort'>New</option>
                                          <option value='Pending' className='dropdown-sort'>Pending</option>
                                          <option value='Completed' className='dropdown-sort'>Completed</option> 
             </select>
          </div>
        
        </div>

       </Row>
        <div className='boards_view orderpage'>
         <div>
         <PerfectScrollbar style={{ height: `${(height - 100) / 16}rem` }}>   
          <Table className='boardtable' id="viewtableOrder">
              <thead className={classnames({
                      'header-grid-view-order': activeView === 'grid',
                      'header-list-view-order': activeView === 'list'
                    })}>
              <tr>
                  <th>Request No.</th>
                  <th>Code</th>
                  <th>Customer</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Designs</th>
                  <th>Request Type</th>
                  <th>Request Status</th>
                  <th></th>                    
                  
              </tr>
          </thead>
              <tbody className={classnames({'grid-view': activeView === 'grid', 'list-view': activeView === 'list' })}>
                   {
                    orderlist.map((e, k) => {
                      return <TRow key={k} ordercode={e.order_Code} orderid={e.order_No} Customer={e.customerName}
                      User={e.userName} cdate={e.order_Date}
                      setUpdatePrante={setUpdatePrante}
                      Designs={e.designCount} OrderStatus={e.order_Status} OrderType={e.order_RequestType} />
                    })
                   } 
            </tbody>
          </Table>
          </PerfectScrollbar>
    
        </div>
      </div>
  </>
)
}
export default OrderTable
