//--------------------------------------------------------------------
//    Function    :-     DesignHeader, CreateOrder, GenerateReport, Clear Selection
//    Purpose        :-   Sort By perpage,name, latest, Ratings, Select All, Clear Selection, passing props data to createOrder and Generate Report
//    Created        :-    26-06-2023
//    Author        :-    Ui=Manisha-> functionality-Abhishek, Rinku---Update the person name here who next working on this project 
//--------------------------------------------------------------------

// ** Third Party Components
import axios from 'axios'
import { useState, useContext } from 'react'
import {  File, X } from 'react-feather'
import { useParams, useHistory } from 'react-router-dom'
import { bcMenuContext } from '../../context/bcMenuContext'
import { BC_Menu } from '../../../utility/_boardutils/utils'
import { CreateOrderWindow } from '../../OrderPage/CreateOrderWindow'
import Loader from '../../Loader/Loader'

import {
    Row,
    Col,
    Button,
    CustomInput,
    Input
} from 'reactstrap'
import { accessContext } from '../../context/accessContext'
import pdfHtml from '../Utility/pdfHtml'
import { updateDifference, updateOrderBy, searchTemplate } from './Sidebar'

const UpdateSelectedDesigns = (selectionDataRef) => {
const selectedDesign = []
    Object.entries(selectionDataRef.current).forEach((e, i) => {
    if (e[1].checked === true) {
      selectedDesign.push(e[1].prop)
        }
      document.getElementById('count').innerHTML = selectedDesign.length  
    })   
}
const GenerateReport = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const selectedindex = useParams('boardId')
    const { boardId } = useParams()
    const { bcMenudata } = useContext(bcMenuContext)
    const { is_boarduser, board, selectedUser } = useContext(accessContext)
    const requestdata = {
        start: 0,
        end: 1000000,
        designName: null
    }

    const checkForcb = (isLogin) => {
        if (isLogin) {
            return BC_Menu.value
        } else {
            return !BC_Menu.value
        }
    }
    const val1 = board ? board[boardId] : {}
    const val2 = bcMenudata ? bcMenudata[boardId] : {}
    const name = BC_Menu.value ? ((val2) ? val2.collection_Id ? `${val2.collection_Name}` : `${val2.board_Name}` : undefined) : ((val1) ? val1.collection_Id ? `${val1.collection_Name}` : `${val1.board_Name}` : undefined)   
    if (!BC_Menu.value) {
        if (boardId && is_boarduser) {
            requestdata.CollectionId = val1.collection_Id ? val1.collection_Id : 0
        } else if (boardId && !is_boarduser) {

            requestdata.BoardId = val1.favorite_Id ? val1.favorite_Id : 0

        }
    } else {
        if (boardId && !is_boarduser) {
            requestdata.CollectionId = val2.collection_Id ? val2.collection_Id : 0
        } else if (boardId && is_boarduser) {
            requestdata.BoardId = val2.favorite_Id ? val2.favorite_Id : 0
        }

    }

    if (selectedUser) {
        if (is_boarduser) {
            requestdata.customerid = localStorage?.selecteduser?.value ? JSON.parse(localStorage.selecteduser)?.value : selectedUser.value
        } else {
            requestdata.supplierid = JSON.parse(localStorage.selecteduser)?.value
            requestdata.SupplierUserId = JSON.parse(localStorage.selecteduser)?.user_id
        }

    }
    const CollectionURL = `/DesignSearch/PdfCollection`
    const BoardURL = `/DesignSearch/PdfBoard`
    return <>
        <Button className='btn-icon mt-0 btn-sm d-flex align-items-center btn-secondary' onClick={async () => {
            try {
                setIsLoading(true)
                axios.post(checkForcb(is_boarduser) ? BoardURL : CollectionURL, requestdata).then(async e => {
                    const data = JSON.parse(e.data)
                    const html = await pdfHtml(data.designMaster, data.totalCount, selectedindex, checkForcb(is_boarduser), is_boarduser, board, data.logoUrl, data.customer, data.supplier, name, () => setIsLoading(false))
                })
            } catch (error) {
                console.log(error)
            }
        }}>
            <File size={14} />
            <div className='align-middle text-justify ml-50 d-none d-sm-inline '>Generate&nbsp;&nbsp;Report</div>
        </Button >
        {isLoading && <Loader isShow={isLoading} />}
    </>
}

const CreateOrder = (Deisgn, selectionDataRef, selectedElementRef) => {

    const [showOrder, setShowOrder] = useState(false)
    const [setViewOrder] = useState(false)
    const { boardId } = useParams()
    const { bcMenudata } = useContext(bcMenuContext)
    const { is_boarduser, board, selectedUser } = useContext(accessContext)
    const requestdata = {
        start: 0,
        end: 1000000,
        designName: null
    }

  
    const val1 = board ? board[boardId] : {}
    const val2 = bcMenudata ? bcMenudata[boardId] : {}
    //const name = BC_Menu.value ? ((val2) ? val2.collection_Id ? `${val2.collection_Name}` : `${val2.board_Name}` : undefined) : ((val1) ? val1.collection_Id ? `${val1.collection_Name}` : `${val1.board_Name}` : undefined)
    // val1 = board ? board[boardId] : {}
    if (!BC_Menu.value) {
        if (boardId && is_boarduser) {
            requestdata.CollectionId = val1.collection_Id ? val1.collection_Id : 0
        } else if (boardId && !is_boarduser) {

            requestdata.BoardId = val1.favorite_Id ? val1.favorite_Id : 0

        }
    } else {
        // val2 = bcMenudata ? bcMenudata[boardId] : {}
        if (boardId && !is_boarduser) {
            requestdata.CollectionId = val2.collection_Id ? val2.collection_Id : 0
        } else if (boardId && is_boarduser) {
            requestdata.BoardId = val2.favorite_Id ? val2.favorite_Id : 0
        }

    }

    if (selectedUser) {
        if (is_boarduser) {
            requestdata.customerid = localStorage?.selecteduser?.value ? JSON.parse(localStorage.selecteduser)?.value : selectedUser.value
            //JSON.parse(localStorage.selecteduser)?.value
        } else {
            requestdata.supplierid = JSON.parse(localStorage.selecteduser)?.value
            requestdata.SupplierUserId = JSON.parse(localStorage.selecteduser)?.user_id
        }

    }
    // const CollectionURL = `/DesignSearch/PdfCollection`
    // const BoardURL = `/DesignSearch/PdfBoard`


    //console.log(requestdata)

    return <>
         <Button className='btn-icon mt-0 btn-sm d-flex align-items-center ml-50' color='primary' onClick={() => setShowOrder(true)} >
            Place&nbsp;&nbsp;Order
        </Button>
        <CreateOrderWindow Deisgn={Deisgn} selectedboard={requestdata.BoardId} 
        showOrder={showOrder} setShowOrder={setShowOrder}
         setViewOrder={setViewOrder} 
        selectionDataRef={selectionDataRef} selectedElementRef={selectedElementRef}/> 
        {/*history.push({pathname: "/Order", state: JSON.stringify(demoData), imgD: JSON.stringify(props.imgdata), searchObj: JSON.stringify(props.searchObj)})*/}
    </>
}
let reRender
const RightOptions = ({ show, rowsPerPage, setPoc, OrderBy, ThumSize, poc, Deisgn,  check, setcheck, selectionDataRef, selectedElementRef, isColorChecked, setIsColorChecked, isPatternChecked, setIsPatternChecked, setSelectedPage, setSearchobj, is_boarduser, totalstock }) => {
    const history = useHistory()
    const { access } = useContext(accessContext)
    reRender = [setPoc, poc, setSearchobj]

   const handleColorChange = () => {
    const newValue = !isColorChecked
    setIsColorChecked(newValue)
    searchTemplate.iscolor = newValue
    reRender[0](!reRender[1])
}
const handlePatternChange = () => {
    const newValue = !isPatternChecked
    setIsPatternChecked(newValue)
    searchTemplate.ispattern = newValue
    searchTemplate.pattern = localStorage.getItem('pattern')
    reRender[0](!reRender[1])
}

    return (
        <>

            <div className='view-options d-flex'>
                <div className="filter_color_pattern">
                    <div className="filter_color">
                        
                        <Input id="color_checkbox" type="checkbox" className='custom-control-input form-check-input'  checked={isColorChecked} onChange={handleColorChange}></Input>
                        <span className="pt-25">Color</span>
                    </div>
                    <div className="filter_pattern">
                        <Input id="pattern_checkbox" type="checkbox" className='custom-control-input form-check-input'  checked={isPatternChecked} onChange={handlePatternChange}></Input>
                        <span className="pt-25">Pattern</span>
                    </div>
                   
                </div>
                {/* <div className='d-flex align-items-center'
                    style={{
                        // width: '8rem', shubham added purpose: Total stock hides under dropdown
                        padding: '0 0.8rem'
                    }}>{(localStorage.warehouse === "stock" || localStorage.warehouse === "noos")  && access["444449"] && access["444449"]["218889"] ? <div className='small text-nowrap'>Total Stock : {totalstock}</div> : <></>}</div> */}
                <CustomInput
                    className='form-control cursor mr-50'
                    type='select'
                    id='rows-per-page'
                    innerRef={rowsPerPage}
                    defaultValue={'25'}
                    style={{
                        width: '5rem',
                        padding: '0 0.8rem',
                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                    }}

                    onChange={(e) => {
                        //console.log(props.rowsPerPage)
                        setSelectedPage(0)
                        updateDifference(parseInt(e.target.value))
                        //props.rowsPerPage.current.value = e.target.value
                        setPoc(!poc)
                    }}
                >
                    <option value='10' className='dropdown-sort'>10</option>
                    <option value='20' className='dropdown-sort'>20</option>
                    <option value='25' className='dropdown-sort'>25</option>
                    <option value='50' className='dropdown-sort'>50</option>
                    {/* <option value='2500' className='dropdown-sort'>500</option> */}
                </CustomInput>

                {!show && <CustomInput
                    className='form-control cursor'
                    type='select'
                    id='dfhhfd-size-bfjb'
                    innerRef={OrderBy}
                    defaultValue={'25'}
                    style={{
                        width: '5rem',
                        padding: '0 0.8rem',
                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                    }}

                    onChange={(e) => {
                        
                        //console.log(props.rowsPerPage)
                        //updateOrderBy({isRating : props.OrderBy.current.selectedIndex === 2, isName : props.OrderBy.current.selectedIndex === 1 })
                        updateOrderBy({ isRating: OrderBy.current.selectedIndex === 2, isName: OrderBy.current.selectedIndex === 1, isLatest: OrderBy.current.selectedIndex === 0 })
                        setPoc(!poc)
                    }}
                >
                    <option value='Latest' className='dropdown-sort'>Latest</option>
                    <option value='Name' className='dropdown-sort'>Name</option>
                    { access && access["444449"] && access["444449"]["268889"] && <option value='Rating' className='dropdown-sort'>Rating</option> }
                </CustomInput>
                }
                <CustomInput
                    className='form-control ml-50 sel_size cursor'
                    id='my-dfdfd-dfdf-dfd'
                    type='select'
                    onClick={
                        (e) => {
                            ThumSize.current.id = e.target.value
                            //console.log(props.ThumSize)
                            setTimeout(() => {
                                const scrollableDiv = document.getElementsByClassName('thumbnailsHeight')[0]
                                if (scrollableDiv) {
                                  scrollableDiv.scrollTop = 0
                                }
                              }, 1000)  
                        }
                        
                    } >
                    <option value='large_grid' className='dropdown-sort'>Large</option>
                    <option value='medium_grid' className='dropdown-sort'>Medium</option>
                   
                </CustomInput>
                {
                 
                }
                {
                    show && <GenerateReport name={name} />
                }
                {
                   history.location.state === 'board' && show && <CreateOrder Deisgn={Deisgn} selectionDataRef={selectionDataRef} selectedElementRef={selectedElementRef} />
                }
              

                {
                    show && <div className='selectThumbnails'>
                        <div className="custom-control custom-checkbox boardCheck justify-content-center" id='checkboard'>
                            <div className='d-flex position-relative'>
                                <Input id="pagechk" type="checkbox" className='custom-control-input form-check-input'
                                  defaultChecked={check}
                                  onChange = {async (e) => {
                                    if (e.target.checked === true) {
                                      Object.entries(selectedElementRef.current).forEach((e) => {
                                        if (e[1] && !e[1].checked) {
                                            e[1].click()
                                        }
                                    })
                                    UpdateSelectedDesigns(selectionDataRef)
                                   } else {
                                     Object.entries(selectedElementRef.current).forEach((e) => {
                                      if (e[1] && e[1].checked) {
                                          e[1].click()
                                      }
                                  })
                                  UpdateSelectedDesigns(selectionDataRef)
                                  }
                                  }}
                                    
                                />
                           {  <label for="boardselect" className='custom-control-label' />}
                            {  show && <div className='d-flex text-nowrap ml-2'>Select Page</div>   }                           
                          
                            </div>
                            <div className='mx-1'>|</div>
                            <div className='clearSelection text-nowrap' onClick={() => {
                                document.getElementById("pagechk").checked = false
                                Object.entries(selectedElementRef.current).forEach((e) => {
                                    if (e[1] && e[1].checked === true) {
                                        //e[1].checked = false
                                        e[1].click()
                                        //e[1].element.click()
                                        // UpdateSelectedDesigns(selectionDataRef)
                                    }
                                })
                                UpdateSelectedDesigns(selectionDataRef)
                            }} >
                                <X size={15} className='mr-25'  
                                />
                                <span> Clear</span>
                               
                            </div>
                            <div>
                           
                            </div>
                        </div>
                    </div>
                }

            </div>

        </>
    )
}

const DesignHeader = props => {
    // console.log(props.totalCount, 'total')
    
    const { activeView, setActiveView, dispatch, getProducts, store, setSidebarOpen, showfloat, name, check, setcheck, selectionDataRef, selectedElementRef, showRightOptions, setSelectedPage, data } = props

    const history = useHistory()
    window.order = () => props.OrderBy
    return (
        <>
          <button className='navbar-toggler shop-sidebar-toggler p-25 d-lg-none d-flex-sm' onClick={() => setSidebarOpen(true)}>
                <span className='navbar-toggler-icon d-lg-none d-flex-sm mobile-filter-text'>
                    <svg width="26" height="18" viewBox="0 0 26 18" xmlns="http://www.w3.org/2000/svg" class="EiPQEB04x7bYPRpKMznx"><path d="M26 4.9H0V3l26-.1zM26 14.9H0V13l26-.1z"></path><circle cx="8.1" cy="3.9" r="3.5"></circle><circle cx="17.5" cy="13.9" r="3.5"></circle></svg>
                    <span className='text-white mb-50'> Filters </span>                  
                </span>
          </button>
        <div className='ecommerce-header row_search_b'>
                <Row className="mx-0">
                <Col sm='12'>
                    <div className='ecommerce-header-items'>
                        <div className='d-flex align-items-center'>
                            <div className='result-toggler'>
                                {/* <div className='align-items-center bn_name'> <b>{props.name}</b></div> */}
                         
                                <span className='search-results small'>Total :: {props.totalCount}</span>                               
                                    {history.location.state === 'board' && <div className='d-flex text-nowrap small selection_boardcn'>Selected &nbsp; &nbsp;<span id='count'> 0 </span></div>}
                                

                          </div>
                        </div>
                        {<RightOptions show={props.showRightOptions} Deisgn={props.Deisgn} setPoc={props.setPoc} rowsPerPage={props.rowsPerPage}
                                       OrderBy={props.OrderBy} ThumSize={props.ThumSize} poc={props.poc} name={props.name} 
                                       check={check} setcheck={setcheck}  setSearchobj={props.setSearchobj} isColorChecked={props.isColorChecked} setIsColorChecked={props.setIsColorChecked} isPatternChecked={props.isPatternChecked} setIsPatternChecked={props.setIsPatternChecked}
                                       selectionDataRef={selectionDataRef} selectedElementRef={selectedElementRef} setSelectedPage={setSelectedPage} totalstock={props.totalstock || 0}
                        />}
                    </div>
                </Col>
            </Row>
            </div>
            </>
    )
}

export default DesignHeader
