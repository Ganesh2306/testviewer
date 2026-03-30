
//--------------------------------------------------------------------
//    Function    :-    OrderPage   
//    Purpose        :-    place Order form (get Board list data or selected board data send to order form)
//    Created        :-    26-06-2023
//    Author        :-    Ui=Manisha-> functionality-Abhishek ---Update the person name here who next working on this project 
//--------------------------------------------------------------------
// ** Third Party Components
import React, { useState, useRef, useEffect, useContext } from 'react'
import axios from 'axios'
import Orderlist from './Orderlist'
import orderPdf from '../Orderdata/orderPdf'
import { accessContext } from '../../context/accessContext'
import { Input, Col, Row, Button, CustomInput } from 'reactstrap'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import Loader from '../../Loader/Loader'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useWindowSize from '../../customHooks/useWindowSize'
const ViewOrderPage = (props) => {
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    // const disabled = true
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false) // Set loading to false after a delay (simulating data loading)
        }, 2000)
        return () => clearTimeout(timer)

    }, [])

    const orderDataRef = useRef([])
    const odcodeRef = useRef(null)
    const odrequestRef = useRef(null)
    const odstatusRef = useRef(null)
    const oddescriptionRef = useRef(null)
    const [orderno, setOrderno] = useState(null)
    const [disabled, setDisable] = useState(false)
    //  const {selectedUser} = useContext(accessContext)
    //   console.log(props.selectedboard)

    const [designData, setDesignData] = useState([]) //Done
    const { is_boarduser, selectedUser } = useContext(accessContext)
    const [description, setDesigndescription] = useState()
    const [code, setcode] = useState()
    const [reRender, setRender] = useState({
        id: null,
        //data: props.selectionDataRef
        rerender: false
    })
    const [pdfDownloadSuccess, setPdfDownloadSuccess] = useState(false)
    const [reportGenerated, setReportGenerated] = useState(false)
    useEffect(() => {
        if (pdfDownloadSuccess) {
            const timeoutId = setTimeout(() => {
                setPdfDownloadSuccess(false)
                setReportGenerated(false)
            }, 1000)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [pdfDownloadSuccess])

    const handleGenerateReport = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get(`/Order/GenerateOrder_Report?OrderNo=${props.orderid}`)
            const data = JSON.parse(response.data)

            const finalAppendFabrics = (pareseData, type = `t`) => {
                const path = pareseData.url
                return {
                    url: pareseData.url,
                    logoUrl: pareseData.logoUrl,
                    generateOrderReportDto: pareseData.generateOrderReportDto,
                    designOrderReportDto: pareseData.generateOrderReportDto.designOrderReportDto.map((e) => {
                        return {
                            ...e,
                            imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`
                        }
                    })

                }
            }

            const html = await orderPdf(finalAppendFabrics(data), () => {
                setIsLoading(false)
                setReportGenerated(true)
            })
            console.log('PDF downloaded')
            setPdfDownloadSuccess(true)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    const finalAppendFabrics = (pareseData, type = `t`) => {

        const path = pareseData.url
        return {
            totalCount: pareseData.generateOrderReportDto.designOrderReportDto.length,
            designMaster: pareseData.generateOrderReportDto.designOrderReportDto.map((e) => {
                return {
                    ...e,
                    imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`
                }
            })
        }
    }
    useEffect(async () => {

        // currentStatus// --> New 
        if (props.currentStatus === "New") {

            const SaveOrderRequestDto = new Object()

            SaveOrderRequestDto.Order_Number = props.orderid
            SaveOrderRequestDto.Order_Code = ""
            SaveOrderRequestDto.Order_RequestType = ""
            SaveOrderRequestDto.order_status = ""
            SaveOrderRequestDto.Order_Description = ""
            SaveOrderRequestDto.Supplier_id = 0
            SaveOrderRequestDto.Order_BoardId = 0
            SaveOrderRequestDto.state = 2
            SaveOrderRequestDto.Order_Comments = ""
            SaveOrderRequestDto.order_status = props.currentStatus   //vaibhavi more

            SaveOrderRequestDto.saveOrderDetailsRequestDtos = [
                {
                    Od_Dm_Id: 0,
                    Order_request_type: "",
                    Od_Order_Id: 0
                }
            ]

            if (is_boarduser) {
                 axios.post('/Order/updateOrderStatus', SaveOrderRequestDto).then(response => {  // remove unecessary (await),its hold data of supplier user
                    console.log(response)
                })
            }
        }
        await axios.get(`/Order/GetMyOrder?OrderNo=${props.orderid}`).then(response => {
            console.log('mdhee')
            console.log(response.data)
            const pareseData = JSON.parse(response.data)
            setDesigndescription(pareseData.generateOrderReportDto.description)
            setcode(pareseData.generateOrderReportDto.orderCode)
            const fabric = pareseData
            const updatepares = finalAppendFabrics(fabric)
            setDesignData(updatepares.designMaster)
            setDisable(true)

        })
    }, [])
    const { width, height } = useWindowSize()
    return (
        <>
            <div className='LeftColumnOrder' style={{ height: `${height}px`,  width: '350px', marginLeft : '350px'}}>
            <Row className='row_order_'>

                <Col className='py-1 order_head d-flex justify-content-between'>
                {/* <h5 id='selecteduser'> Customer Name: {selectedUser.label}</h5> */}

                   
                    <div className='d-flex'>
                        <div className='messege-wait'>
                            {isLoading && "Please wait, your order report is generating."}
                        </div>
                        <div className='messege-wait success'>
                            {reportGenerated && "Success! Click here to view Order Report it in a new tab"}
                        </div>
                        {/* {isLoading && <Loader isShow={isLoading} />}
                        <Button className='btn-icon mt-0 btn-sm  align-items-center reportbtn  mr-4' color='primary' style={{ marginRight: '0.8rem' }}
                            onClick={handleGenerateReport}>
                            Generate&nbsp;&nbsp;Report
                        </Button> */}
                    </div>
                </Col>

            </Row>
            <div className='row_orderB_'>              
                <Col className='p-2 order_head '>
                <h4 className='text-center d-md-block d-none'> Request Form</h4>
                    <div className=''>
                        <div className='viOrder'>
                            <div className='view-options pt-25 jutify-content-between'>
                                <div className='d-flex align-items-center optionsA'>
                                    <div className='d-flex align-items-left colA w-100'>
                            
                                        <div className='small text-nowrap mr-50'>Request Number</div>
                                        <CustomInput
                                            className='form-control cursor'
                                            type='text'
                                            disabled={true}
                                            // innerRef={rowsPerPage}
                                            defaultValue={props.orderid}
                                            style={{                                              
                                                padding: '0 0.8rem',
                                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                            }}
                                        >

                                        </CustomInput>
                                    </div>
                                    <div className='d-flex align-items-left colA w-100'>
                                        <div className='small text-nowrap '>Request code:</div>
                                        <Input
                                            style={{                                             
                                                padding: '0 0.8rem',
                                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                            }}
                                            type='text'
                                            innerRef={odcodeRef}
                                            defaultValue={code}
                                            disabled={disabled}
                                            maxlength="30"
                                            className='rounded-0'
                                            name='text'
                                            id='orderno'
                                            //disabled = {props.ordnum ? props.ordnum : false} 
                                            // onChange={(e) => {
                                            //   handleInputChange(e)
                                            // odcodeRef.current.value = e.target.value

                                            // }}
                                            onChange={(e) => {
                                                odcodeRef.current.value = e.target.value
                                            }}
                                        >
                                        </Input>
                                    </div>
                                    <div className='d-flex align-items-left colA w-100'>
                                        <div className='small text-nowrap mr-50'>Request Type:</div>
                                        <CustomInput
                                            className='form-control cursor'
                                            innerRef={odrequestRef}
                                             disabled={disabled}
                                            // type='select'
                                            // innerRef={rowsPerPage}
                                            value ={props.orderType}  
                                            style={{                                              
                                                padding: '0 0.8rem',
                                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                            }}
                                            // onChange={(e) => {

                                            //     odrequestRef.current.value = e.target.value
                                            // }}
                                        >
                                            <option value='Reference' className='dropdown-sort'>Reference</option>
                                            <option value='Pieces' className='dropdown-sort'>Pieces</option>


                                        </CustomInput>
                                    </div>
                                    {JSON.parse(localStorage.profile).org_type === 2 && !selectedUser && <div className='d-flex align-items-center colA'>
                                        <div className='small text-nowrap mr-50'>Request Status:</div>
                                        <CustomInput
                                            className='form-control cursor'
                                            innerRef={odstatusRef}
                                            //disabled={disabled}
                                            type='select'
                                            // innerRef={rowsPerPage}
                                            defaultValue={props.currentStatus}
                                            style={{                                             
                                                padding: '0 0.8rem',
                                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                            }}
                                            onChange={e => {

                                                odstatusRef.current.value = e.target.value
                                                const SaveOrderRequestDto = new Object()

                                                SaveOrderRequestDto.Order_Number = props.orderid
                                                SaveOrderRequestDto.Order_Code = ""
                                                SaveOrderRequestDto.Order_RequestType = ""
                                                SaveOrderRequestDto.order_status = ""
                                                SaveOrderRequestDto.Order_Description = ""
                                                SaveOrderRequestDto.Supplier_id = 0
                                                SaveOrderRequestDto.Order_BoardId = 0
                                                SaveOrderRequestDto.state = 2
                                                SaveOrderRequestDto.Order_Comments = ""
                                                SaveOrderRequestDto.order_status = e.target.value

                                                SaveOrderRequestDto.saveOrderDetailsRequestDtos = [
                                                    {
                                                        Od_Dm_Id: 0,
                                                        Order_request_type: "",
                                                        Od_Order_Id: 0
                                                    }
                                                ]
                                                if (is_boarduser) {
                                                    axios.post('/Order/updateOrderStatus', SaveOrderRequestDto).then(response => {
                                                        console.log(response)
                                                    })
                                                }
                                            }}
                                        >
                                            <option value='New' className='dropdown-sort'>New</option>
                                            <option value='Pending' className='dropdown-sort'>Pending</option>
                                            {/* <option value='All' className='dropdown-sort'>All</option> */}
                                            <option value='Completed' className='dropdown-sort'>Completed</option>

                                        </CustomInput>
                                    </div>}
                                    <div className='align-items-left optionsB w-100' >
                                    <label className=' mr-75'>Description</label>
                                    <Input type='textarea descri' className='rounded-0 py-0' style={{ padding: '0!important' }}
                                        innerRef={oddescriptionRef}
                                        name='text' id='exampleTexta' rows='1' placeholder='Enter the description'
                                        disabled={disabled}
                                        defaultValue={description}
                                        //disabled={props.desc ? false : 'true'}          
                                        // disabled={props.desc ? props.desc : false}
                                        onChange={e => {
                                            oddescriptionRef.current.value = e.target.value
                                        }}
                                    />
                                </div>
                                    <div className='d-flex align-items-left colA designcount w-100'>                                                                   
                                        <div className=''> Designs : {designData.length}</div>
                                    </div>   

                {isLoading && <Loader isShow={isLoading} />}
                        <Button className='btn-icon mt-0 btn-md  align-items-center reportbtn w-100' color='primary' style={{ marginRight: '0.8rem' }}
                            onClick={handleGenerateReport}>
                            Generate&nbsp;&nbsp;Report
                        </Button>                             
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

            </div>
            </div>           
            {loading ? <Loader isShow={loading} /> : (
                <div className='checkout-tab-steps ecommerce-application'>
                    <div className='orderHeading' style={{width: `${width - 350}px` }}>
                     <h2> {selectedUser.label}</h2>
                     <div className='orderDetails'>
                        <div className='orderNumber'> <h6 className='mb-0'>Request Number :</h6> 
                        <CustomInput
                                            className='form-control cursor border-0 bg-transparent'
                                            type='text'
                                            disabled={true}
                                            // innerRef={rowsPerPage}
                                            defaultValue={props.orderid}
                                            style={{                                                                                       
                                                padding: '0 0.8rem',
                                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                            }}></CustomInput>

                        </div>
                        <div className='orderCode d-flex flex-row '> <h6>Request Code :</h6>
                        <Input
                                            style={{                                             
                                                padding: '0 0.8rem',
                                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                                            }}                                          
                                            type='text'
                                            innerRef={odcodeRef}
                                            defaultValue={code}
                                            disabled={disabled}
                                            maxlength="30"
                                            className='rounded-0 mb-50 border-0 bg-transparent'
                                            name='text'
                                            id='orderno'                                         
                                            onChange={(e) => {
                                                odcodeRef.current.value = e.target.value
                                            }}
                                        >
                                        </Input>
                                        
                        </div>
                     </div>
                    </div>
                   
                    <div className='list-view product-checkout'>
                    <PerfectScrollbar style={{width: `${width - 390}px` }}>
                        <div className='checkout-options' style={{height: `${height}px`, width: `${width - 400}px`  }}>
                            {designData.map((e, k) => {
                                return <Orderlist setRender={setRender} counter={k} disabled={disabled} orderDataRef={orderDataRef} title={e.designName} stock={e.stock} price={e.price}
                                    id={e.designId} NoThumb={props.NoThumb} comment={e.comment} len={props.len} period={props.period} quantity={e.orderQuantity}
                                    feature={e.fieatureDic} bgimg={(`${e.imageUrl}`)} selectionDataRef={props.selectionDataRef} selectedDesign={designData}
                                    requestType={e.requestType} orderid={props.orderid} />
                            })}
                        </div>
                 </PerfectScrollbar>
                    </div>
                </div>
            )}

        </>
    )
}

export default ViewOrderPage
