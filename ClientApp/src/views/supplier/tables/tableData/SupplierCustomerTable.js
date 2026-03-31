
// ** React Imports
import { Fragment, useState, useEffect, useRef, memo, useContext } from 'react'
import axios from 'axios'
// ** Table Columns
import { SupplierCustomerTableColumns } from '../data'

// ** Store & Actions
import { getSUData, getSUDataSearch, getCustomerUsers, getconfigureCustomer, SearchConfiguredCustomersList } from '../../store/actions'
import { store as store1 } from '@store/storeConfig/store'
import { useSelector, useDispatch } from 'react-redux'
//import { getCustomerUsers } from '../../store/actions'

import Swal from 'sweetalert2'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import { SupplierCustomerOptions } from './Options'
const SupplierCustomerList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.SupplierCustomers)
    // ** States
    const [Ispaging, setPaging] = useState(false)
    const [suppid, setSuppValue] = useState(0)
    const [SelectedSupplierIndex, setSelectedSupplierIndex] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
    const [clearbt, setClearbt] = useState(false)
    const [suppliersList, setsuppliersList] = useState([])
    const [updateDT, setupdateDT] = useState(false)
    const [userData, setuserData] = useState({})
    const [CustomerValue, setCustomerValue] = useState(0)
    const [customersList, setcustomersList] = useState([])
    const suprollidref = useRef(null)
    const custrollidref = useRef(null)

    function getUserBySuppId(obj) {
        if (obj.SupplierId === 0) return
        store1.dispatch(getconfigureCustomer(obj))
    }

    function getUserBySupplierIdonchange(id) {
        custrollidref.current.selectedIndex = 0
        if (id === 0) return
        const obj = new Object()
        obj.page = 0
        obj.perPage = 7
        obj.SupplierId = id
        getCustomerList(id)
        store1.dispatch(getconfigureCustomer(obj))
    }
    function getUserByCustomerId(obj) {
        if (obj.CustomerId === 0) return
        store1.dispatch(getCustomerUsers(obj))
    }

    function getUserByCustomerIdOnchange(id) {
        if (id === 0) return
        const obj = new Object()
        obj.page = 0
        obj.perPage = 7
        obj.CustomerId = id
        store1.dispatch(getCustomerUsers(obj))
    }
    const obj = {
        Supplier_Id: parseInt(suppid),
        Supplier_Role_Id : parseInt(suprollidref.current?.value),
        Customer_Id: parseInt(CustomerValue),
        Customer_Role_Id: parseInt(custrollidref.current?.value),
        State:0
        }
        console.log(obj)
    function getSupplierList() {
        // setupdateDT(true)
        const suppliers1 = []
        const obj = new Object()
        obj.Start = 0
        obj.End = 0
        axios.post(`./Supplier/Suppliers`, obj).then(response => {
            const suppliers = response.data.supplierListDto
            if (suppliers !== null && suppliers.length > 0) {
                //  setselectedCustomer(customers[0].customer_Name)
                for (let i = 0; i < suppliers.length; i++) {
                    suppliers1.push(<option id={suppliers[i].supplier_id} key={suppliers[i].supplier_id} value={suppliers[i].roleid}>{suppliers[i].sup_name}</option>)
                }
                setsuppliersList(suppliers1)
                const obj = new Object()
                obj.page = 0
                obj.perPage = 7
                obj.SupplierId = suppliers[0].supplier_id
                setSuppValue(suppliers[0].supplier_id)
                getUserBySuppId(obj)
                getCustomerList(suppliers[0].supplier_id)
            } 

        })
    }

    function getCustomerList(id) {
        // setupdateDT(true)
        const customers1 = []
        const obj = {
            SupplierId : parseInt(id)  
        }
        // const obj = new Object()
        // obj.Start = 0
        // obj.End = 0
        axios.post(`./Supplier/GetUnconfiguredCustomer`, obj).then(response => {
            const customers = response.data.customerListDto
  
            if (customers !== null && customers.length > 0) {
              //  setselectedCustomer(customers[0].customer_Name)
                for (let i = 0; i < customers.length; i++) {
                    customers1.push(<option id={customers[i].customer_id} key={customers[i].customer_id} value={customers[i].role_Id}>{customers[i].customer_Name}</option>)
                }
                const obj = new Object()
                obj.page = 0
                obj.perPage = 7
                obj.customer_id = customers[0].customer_id
                setCustomerValue(customers[0].customer_id)
                setcustomersList(customers1)
                getUserByCustomerId(obj)
            } else {
                customers1.push(<option>None</option>)
                setcustomersList(customers1)
            }

        })
    }
 useEffect(() => {
    getCustomerList(suppid)
 }, [store.data.length])
    // useEffect(() => {
    //     setuserData(JSON.parse(localStorage.getItem('userData')))
    //     if (JSON.parse(localStorage.getItem('userData')).org_type === 1) {
    //         getSupplierCustomerList()
    //        // getCustomerList(suppid)
    //         setupdateDT(false)
    //     } else { setupdateDT(true) }
    // }, [])

    useEffect(() => {
        getSupplierList()
        setupdateDT(false)
     }, [])    
      
    useEffect(() => {
        
        if (updateDT) {
            dispatch(
                getconfigureCustomer({
                    page: currentPage,
                    perPage: rowsPerPage,
                    q: searchValue
                })
            )
        }
    }, [dispatch, store.data.length, updateDT])

    const handleFilter = e => {
        
        setSearchValue(e.target.value)
        setClearbt(true)
        if (e.target.value !== "") {
            setPaging(true)
            const obj = new Object()
            obj.selected = 0
            obj.rowsPerPage = rowsPerPage
            handlePagination(obj)
        } else {
            setClearbt(false)
            const pageno = currentPage === 0 ? currentPage : currentPage - 1
            const obj = new Object()
            if (pageno === 0) {
                obj.page = 0
                obj.perPage = rowsPerPage
            } else {
                obj.page = pageno * rowsPerPage
                obj.perPage = rowsPerPage
            }
            obj.SupplierId = suppid
            setPaging(false)
            dispatch(
                getconfigureCustomer(obj)
            )
        }

    }
    const resetInputField = e => {
        setPaging(false)
        setSearchValue("")
        setClearbt(false)

        const pageno = currentPage === 0 ? currentPage : currentPage - 1
        const obj = new Object()
        if (pageno === 0) {
            obj.page = 0
            obj.perPage = rowsPerPage
        } else {
            obj.page = pageno * rowsPerPage
            obj.perPage = rowsPerPage
        }
        obj.SupplierId = suppid
        setPaging(false)
        dispatch(
            getconfigureCustomer(obj)
        )
        getCustomerList(obj.SupplierId)
         custrollidref.current.selectedIndex = 0
        // suprollidref.current.selectedIndex = 0
        suprollidref.current.selectedIndex = SelectedSupplierIndex
    }

   // ** Function to handle Pagination and get data
    // ** Function to handle Pagination and get data
    const handlePagination = page => {
        
        if (document.getElementById("search-input").value === "") {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
                getconfigureCustomer({
                    page: start,
                    perPage: perpage,
                    SupplierId: suppid
                })
            )
        } else {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
                 
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
                SearchConfiguredCustomersList({
                    searchvale: document.getElementById("search-input").value,
                    page: start,
                    perPage: perpage,
                    SupplierId: suppid
                })
            )
        }
        setCurrentPage(page.selected + 1)

    }

    // ** Function to handle per page
    const handlePerPage = e => {
        
        setRowsPerPage(parseInt(e.target.value))
        const obj = new Object()
        obj.selected = 0
        obj.rowsPerPage = parseInt(e.target.value)
        handlePagination(obj)
    }
    // ** Custom Pagination
    const CustomPagination = () => {
        //const perpagEntries = Ispaging === true ? 200 : rowsPerPage
        const count = Math.ceil(Number((store.total / rowsPerPage)))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                breakLabel='...'
                pageCount={count || 1}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName={
                    'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
                }
            />
        )
    }

    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            q: searchValue
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })
        console.log(store.data)

        if (store.data.length > 0) {
            return store.data
        } else if (store.data.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Supplier Customer List</CardTitle>
                
                        <Button.Ripple color='primary' className='text-nowrap ml-1' onClick={() => {
                            
                            axios.post(`./Supplier/SaveSupplierCustomerConfiguration`, obj).then(res => {
                                    Swal.fire(
                                        'Success!',
                                        'configuration Saved Succesfully!',
                                        'success'
                                    )
                                    resetInputField()
                                })
                             }} > Add Customer </Button.Ripple>
               
                </CardHeader>
                <Row className='mx-0 mt-1 mb-50'>
                    <Col xl='2' md='2'>
                        <div className='d-flex align-items-center'>
                            <Label for='sort-select'>show</Label>
                            <Input
                                className='dataTable-select'
                                type='select'
                                id='sort-select'
                                value={rowsPerPage}
                                onChange={e => handlePerPage(e)}
                            >
                                <option value={7}>7</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={75}>75</option>
                                <option value={100}>100</option>
                            </Input>
                            <Label for='sort-select'>entries</Label>                  
                        </div>
                    </Col>
                    <div className='col-xl-5 col-md-5 d-flex'>
              
                                <Col >
                                    <div className='d-xl-flex flex-sm-column flex-lg-row align-items-center'>
                                    {
                               <><Label className='col-form-label pr-1 pl-50' for='sort-select1_Supplier'>Supplier</Label>
                                
                                    <select                                       
                                        className=' form-control states order-alpha col-md-8"'
                                        //type='select'
                                        id='sort-select1_Supplier'
                                        ref={suprollidref}
                                        onChange={
                                            (e) => {
                                                const actsup_Id = e.target.options[e.target.selectedIndex].getAttribute("id")
                                                getUserBySupplierIdonchange(actsup_Id)
                                                setSuppValue(actsup_Id)
                                                custrollidref.current.selectedIndex = 0
                                                setSelectedSupplierIndex(suprollidref.current.selectedIndex)
                                            }
                                        }
                                    >
                                      
                                        {
                                            suppliersList
                                        }
                                    </select></>
                            }
                            </div>
                                </Col>
                                <Col>
                                <div className='d-xl-flex flex-sm-column flex-lg-row align-items-center'>
                                    {
                                <><Label className="col-form-label pr-1 pl-50">Customer</Label>
                                    <select 
                                    //type="select" 
                                           name="OrderCName" 
                                           className="states order-alpha form-control state col-md-8 col-xl-9" 
                                           parentid="#" 
                                           subid="#" 
                                           id='sort-select1'
                                           ref={custrollidref}
                                        onChange={
                                            (e) => {
                                                const actcust_Id = e.target.options[e.target.selectedIndex].getAttribute("id")
                                                getUserByCustomerIdOnchange(actcust_Id)
                                                setCustomerValue(actcust_Id)
                                            }
                                        }
                                     >
                                         {
                                            customersList
                                         }
                                                     
                                    </select></>
                                   }
                                </div>
                                </Col>

                    </div>
                    <div className='col-xl-5 col-md-5 d-flex'>
                         <div className='d-flex align-items-center mb-sm-0 mb-1 col-sm-12 justify-content-lg-end justify-content-start'>
                            <Label className='mr-1' for='search-input'>
                                Search
                          </Label>
                            <div class="input-icons" style={{ position: 'relative' }}>
                            <Input
                                className='dataTable-filter mr-2'
                                type='text'                               
                                id='search-input'
                                value={searchValue}
                                onChange={handleFilter}
                                />
                                {clearbt ? <i className="fa fa-times" aria-hidden="true" role='button' onClick={resetInputField} style={{ position: 'absolute', right: '2rem', top: '0.875rem' }}></i> : null}
                                </div>
                               
                            {/* { <AddSupplierCustomer />  } */}
                        </div>
                    </div>
                   
              
                </Row>
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={SupplierCustomerTableColumns}
                    sortIcon={<ChevronDown size={10} />}
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                />
            </Card>
        </Fragment>
    )
}
export default memo(SupplierCustomerList)