
//--------------------------------------------------------------------
//    Function    :-    OrderPage   
//    Purpose        :-    place Order form (get Board list data or selected board data send to order form)
//    Created        :-    26-06-2023
//    Author        :-    Ui=Manisha-> functionality-Abhishek ---Update the person name here who next working on this project 
//--------------------------------------------------------------------
// ** Third Party Components
import React, {useState, useRef, useEffect, useContext} from 'react'
import axios from 'axios'
import Orderlist from './Orderlist'
import { accessContext } from '../../context/accessContext'
import {Input, Col, Button, CustomInput} from 'reactstrap'
// ** Styles
import Swal from 'sweetalert2'
import '@styles/base/pages/app-ecommerce.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ArrowDown } from 'react-feather'
import useWindowSize from '../../customHooks/useWindowSize'
import PerfectScrollbar from 'react-perfect-scrollbar'
const OrderPage = (props) => {
  const orderDataRef = useRef([])
  const odcodeRef = useRef(null)
  const odrequestRef = useRef(null)
  const Customerref = useRef("All")
  const odstatusRef = useRef(null)
  const oddescriptionRef = useRef(null)
  const [orderno, setOrderno] = useState(null)
  const [error, setError] = useState(null)
  const [errord, setErrord] = useState(null)
  const [disabled, setDisable] = useState(false)
  const [updateOrderRef, setUpdateOrderRef] = useState(null)
  const [update, setupdate] = useState(false)
  const [requestType, setRequestType] = useState(null)
 const {selectedUser} = useContext(accessContext)
    /* console.log(props.selectedboard) */
  const [designData, setDesignData] = useState(props.selectedDesign)
  const [orderData, setorderData] = useState(orderDataRef)
  const allFormRef = useRef(null)
  const OrdercodeErrorRef = useRef(null)
  const DescriptionErrorRef = useRef(null)
  const OrderQuantityRef = useRef(null)
  const OrderQuantityErrorRef = useRef(null)
  const [borderColor, setBorderColor] = useState('')
 

  const history = useHistory()
  // const orderSuccess = () => toast.success(<OrderSuccessToast />, { hideProgressBar: true, autoClose: 2000 }) 
   const orderSuccess = () => {
     Swal.fire({
       title: 'Thank you',
       text: 'Your order requested successfully. For more details, please check your order status in the "Orders" section.Thank you for Archiving.',
         confirmButtonText: 'OK',
         allowOutsideClick: false
     }).then((result) => {
       if (result.isConfirmed) {
         console.log('OK button clicked')
          if (props.showOrder) {
           props.setShowOrder(false)
          } 
           if (!props.setViewOrder) {
               history.goBack()
               setTimeout(() => {
                   const button = document.getElementById('closebtn1')
                   if (button) {
                       // Create a new click event
                       const event = new MouseEvent('click', {
                           bubbles: true,
                           cancelable: true,
                           view: window
                       })
                       // Dispatch the event
                       button.dispatchEvent(event)
                   }
               }, 2000) // Adjust the timeout duration as needed
           }
       }
     })
   }

   const ordercodeonchange = () => {
     const userinput = odcoderef.current.value
     if (userinput.length > 0 && userinput.length < 50) {
       ordercodeerrorref.current.textcontent = ''
     } else {
       ordercodeerrorref.current.textcontent = 'order code must have at most 50 characters'
     }
   }

   const descriptiononchange = () => {
     const userinput = oddescriptionref.current.value
     if (userinput.length > 0 && userinput.length < 500) {
       descriptionerrorref.current.textcontent = ''
     } else {
       descriptionerrorref.current.textcontent = 'description must have at most 500 characters'
     }
   }
  
  const ValidateInputField = () => {
    if (designData.length > 0) {
        if (odcodeRef.current.value.trim() === "") {
        // odcodeRef.current.style.borderColor = 'red'
        /*  OrdercodeErrorRef.current.textContent = 'order code must have at most 50 characters'*/
       }
        if (oddescriptionRef.current.value.trim() === "") {
            // oddescriptionRef.current.style.borderColor = 'red'
      /* DescriptionErrorRef.current.textContent = 'Description must have at most 500 characters'*/
       }
      if (odcodeRef.current.value.trim() !== "" || oddescriptionRef.current.value.trim() === "" || oddescriptionRef.current.value.trim() !== "") {
        const SaveOrderRequestDto = {
          Order_Code : odcodeRef.current.value,
          Order_RequestType : odrequestRef.current.value,
          // order_status : odstatusRef.current.value,
           order_status :'New',
          Order_Description : oddescriptionRef.current.value,
          Supplier_id: JSON.parse(localStorage.selecteduser).value,
          //  Supplier_id: JSON.parse(localStorage.userData).org_type_id,
          Customer_Id : ((localStorage.selecteduser && JSON.parse(localStorage.selecteduser)?.value)) ? (JSON.parse(localStorage.selecteduser).value) : 0,
          Order_BoardId : props.selectedboard,
          state: 0,
          Order_Comments : "",
          temp: orderDataRef,
          saveOrderDetailsRequestDtos: orderData.map((f, index) => {
            const result = (f.comment === undefined && f.Comment !== undefined) ? f.Comment : (f.comment !== f.Comment ? f.comment : f.Comment)
            return {
              Od_Dm_Id : f.id,
              Od_Quantity : f.Order,
             Od_Comments :  result,
              Order_request_type :  f.RequestType.value ? f.RequestType.value : f.RequestType,
              Od_Order_Id : 0
            }
          })
        } 
         if (selectedUser) {
           SaveOrderRequestDto.Customer_Id = ((localStorage.selecteduser && JSON.parse(localStorage.selecteduser)?.value)) ? (JSON.parse(localStorage.selecteduser).value) : 0
         } else {
           SaveOrderRequestDto.Customer_Id = Customerref.current ? Customerref.current.value : 0
         }
      axios.post('/Order/SaveOrderDetails', SaveOrderRequestDto).then(response => {
          const data = JSON.parse(response.data)
          if (props.isCartJourney) { sessionStorage.removeItem("designMaster") }
      setTimeout(() => {
      setOrderno(data[0].orderNo)
      setDisable(true)
      })
      axios.get(`/Order/GetMyOrder?OrderNo=${data[0].orderNo}`).then(response => {
      })
      })
      orderSuccess()
    }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Design count is 0!'
      })
    }
  }
  const [reRender, setRender] = useState({
    id:null,
    rerender: false
  })

  useEffect(() => {
    setDesignData(() => {
      return designData.filter((priv) => priv.designId !== reRender.id)
    })
    }, [reRender.rerender])

    useEffect(() => {
      setorderData(() => {
        /* orderDataRef.current = orderDataRef.map((e) => {
          
          return 
        })  */
        //console.log(orderDataRef)
        return orderData.current ? orderData.current : orderData.filter((priv) => priv.id !== reRender.id)
      })
      return () => {
        setRequestType()
      }
      }, [reRender.rerender])

      // only 
      /* useEffect(() => {
        return () => {
          setRequestType(null)
        }
      }, []) */

      const { width, height } = useWindowSize() 

  return ( 
    <>
    <div className='LeftColumnOrder' style={{ height: `${height}px`,  width: '350px', marginLeft : '350px'}}>
    <Col className='pt-2 order_head '>        
                <Col className='py-4 order_head d-flex justify-content-center'>   
                  <h4 className='m-0 py-50 w-100 text-left'>Request Form</h4>                  
                </Col>  
                
      </Col>
      <div className='row_orderB_'>   
              <ArrowDown className='d-none d-sm-block d-md-none'/>
              <Col className='order_head P-2'  style={{width: `${width - 280}px` }}>       
                <div className=''>
                      <div className='viOrder '>
                      <div className='view-options pt-25 jutify-content-between'>   
                        <div className="d-flex align-items-center optionsA">
                                  <div className='d-flex align-items-left colA w-100'>
                                  <div className='small text-nowrap mr-50'>Request Number</div>
                                      <CustomInput
                                                  className='form-control cursor'
                                                  type='text'    
                                                  disabled={true}                   
                                                  // innerRef={rowsPerPage}
                                                  defaultValue={orderno}                             
                                                  style={{                                                 
                                                    padding: '0 0.8rem',
                                                    backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                                  }}
                                              >
                                              
                                      </CustomInput>
                                  </div>
                                  <div className='d-flex align-items-left colA w-100'>    
                                    <div className='small text-nowrap mr-50'>Request code:</div>
                                    <Input
                                      style={{                                    
                                        padding: '0 0.8rem',
                                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                        // borderColor: borderColor
                                      }}
                                      type='text' 
                                      innerRef={odcodeRef}
                                      disabled={disabled}  
                                      className='rounded-0' 
                                      name='text' 
                                      id='orderno'
                                      maxlength="50"
                                      //disabled = {props.ordnum ? props.ordnum : false} 
                                      onChange={(e) => {
                                        const inputValue = e.target.value
                                        const regex = /[^a-zA-Z0-9]/g
                                        const cleanedValue = inputValue.replace(regex, '')

                                        if (inputValue !== cleanedValue) {
                                            setError(<p className="error-message">Do not allow special characters</p>)
                                        } else {
                                            setError(null)
                                        }

                                        odcodeRef.current.value = cleanedValue
                                    }}
                                      >
                                      </Input>
                                      <small className="error-message" style={{ color: 'red' }}>{error}</small>
                                      <div style={{ color: 'red' }} className="error-message" ref={OrdercodeErrorRef}></div>
                                  </div>
                                  <div className='d-flex align-items-left colA w-100'>    
                                    <div className='small text-nowrap mr-50'>Request Type:</div>
                                      <CustomInput
                                                  className='form-control cursor  mr-75'
                                                  innerRef={odrequestRef}
                                                  disabled={disabled}
                                                  type='select'                     
                                                  // innerRef={rowsPerPage}
                                                  defaultValue={'25'}                             
                                                  style={{
                                                                                                     padding: '0 0.8rem',
                                                    backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                                  }}
                                                  onChange={(e) => {
                                                    setRequestType(e.target.value)
                                                  }}
                                              >
                                                  <option value='Reference' name='Reference' className='dropdown-sort'>Reference</option>
                                                  <option value='Yardage' name="Yardage" className='dropdown-sort'>Yardage</option>
                                                  <option value='Sample' className='dropdown-sort'>Sample</option>
                                                  <option value='Meter' className='dropdown-sort'>Request of Meters</option>
                                                  <option value='Pieces' className='dropdown-sort'>Request of Pieces</option>                                              
                                                  <option value='Exclusives' className='dropdown-sort'>Request of Modification of Exclusives</option>
                                                
                                                
                                      </CustomInput>
                                  </div>
                                  { !props.selectedUser ? console.log(selectedUser) :    <div className='d-flex align-items-left colA w-100'>       
                                      <div className='small text-nowrap mr-50'>Request Status:</div>
                                      <CustomInput
                                                className='form-control cursor  mr-75'
                                                innerRef= { odstatusRef }
                                                disabled={disabled}
                                                type='select'                     
                                                // innerRef={rowsPerPage}
                                                defaultValue={'25'}                             
                                                style={{                                             
                                                  padding: '0 0.8rem',
                                                  backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                                }}
                                                onChange={e => {
                                                  odstatusRef.current.value = e.target.value
                                              }} 
                                            >
                                                <option value='New' className='dropdown-sort'>New</option>
                                                <option value='Pending' className='dropdown-sort'>Pending</option>
                                                <option value='All' className='dropdown-sort'>All</option>
                                                <option value='Completed' className='dropdown-sort'>Completed</option>
                                              
                                      </CustomInput>
                                  </div>}    
                                  <div className='d-flex align-items-left colA w-100 ' >
                                      <label className='mr-50'>Description</label>
                                        <Input type='textarea descri' className='rounded-0 py-0' style={{padding:'0!important'}}
                                        innerRef={oddescriptionRef}
                                        maxlength="500"
                                        name='text' id='exampleTexta' rows='1' placeholder='Enter the description'
                                        disabled={disabled}
                                          //disabled={props.desc ? false : 'true'}          
                                          // disabled={props.desc ? props.desc : false}
                                          onChange={(e) => {
                                            const inputValue = e.target.value
                                            const regex = /[^a-zA-Z0-9\s]/g  //vaibhavi more
                                            const cleanedValue = inputValue.replace(regex, '')

                                            if (inputValue !== cleanedValue) {
                                                setErrord(<p className="error-message">Do not allow special characters</p>)
                                            } else {
                                                setErrord(null)
                                            }

                                            oddescriptionRef.current.value = cleanedValue
                                        }}
                                          >
                                          </Input>  
                                      <div style={{ color: 'red' }} className="error-message" ref={DescriptionErrorRef}></div>
                                  </div>      
                                  <div className='d-flex align-items-left colA w-100 designcount'>
                                        <label className='mr-50 '>Designs : {designData.length} </label>
                                        {/* <div className='mx-50'> {designData.length}</div> */}
                                  </div>  
                                  <div className='d-flex align-items-left colA w-100'>                  
                                    { !disabled && <Button className='btn-icon mt-0 btn-md align-items-center orderbtn' color='primary'  onClick={() => { 
                                      ValidateInputField()
                                      }}>                                        
                                      <span className='ml-25 d-sm-inline'>Place&nbsp;Request</span>
                                 
                                  </Button> }
                                  <Button className='btn-icon mt-0 btn-md  align-items-center reportbtn' color='primary'  onClick={() => {     
                                    props.setViewOrder(false) 
                                      }}>                                        
                                      <span className='align-middle ml-25 d-none d-sm-inline'>Generater&nbsp;&nbsp;Report</span>
                                  </Button>
                
                                </div>
                                                 
                          
                        </div>     
                      </div>
                    
                      </div>
                    </div>               
              </Col>                
    </div>
    </div>   
    <div className='checkout-tab-steps ecommerce-application' style={{ height: `${height}px`, width: `${width - 350}px`}}>

        <div className='orderHeading'>
                     <h2> {selectedUser.label}</h2>
                  
      </div>
  
      <PerfectScrollbar style={{height: `${height}px`, width: `${width - 380}px`}}>  
      <div className='list-view product-checkout' >
            <div ref={allFormRef} className='checkout-options' >
            {
          (designData).map((e, k) => {
            return <Orderlist requestType={requestType} setRender={setRender} counter={k} disabled={disabled} update={update} setupdate={setupdate} //orderDataRef={orderDataRef}
                orderDataRef={orderData} title={e.designName} stock={e.stock} price={e.price} odrequestRef={odrequestRef}
                id={e.designId} NoThumb={props.NoThumb} comment={e.comment} len={props.len} period={props.period} quantity={e.length ? e.length : props.quantity}
            feature ={e.features} bgimg={(`${e.imageUrl}`)} selectionDataRef={props.selectionDataRef} selectedDesign={designData} reRender={reRender}/>
            })
        
            }          
            </div>
      </div>
      </PerfectScrollbar>
    </div> 
    </>       
  )
}

export default OrderPage
