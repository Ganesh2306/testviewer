// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
import axios from 'axios'
// ** Table Columns
import { CustomerUserTableColumns } from '../data'

import AddUser from './OpenAddCustomerUser'

// ** Store & Actions
import { getCustomerUsers, SearchCustomerUsers, getData } from '../../store/actions'
import { store as store1 } from '@store/storeConfig/store'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import {
    Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, Modal, ModalHeader,
    ModalBody, ModalFooter, FormGroup
} from 'reactstrap'

const CustomerUsersList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.Customerusers)
    // ** States
    const [Ispaging, setPaging] = useState(false)
    const [CustomerValue, setCustomerValue] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
    const [clearbt, setClearbt] = useState(false)
    const [customersList, setcustomersList] = useState([])
    const [updateDT, setupdateDT] = useState(false)
    const [userData, setuserData] = useState({})
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
    function getCustomerList() {
        // setupdateDT(true)
        const customers1 = []
        const obj = new Object()
        obj.Start = 0
        obj.End = 0
        axios.post(`./Customer/Customers`, obj).then(response => {
            
            const customers = response.data.customerListDto
            if (customers !== null && customers.length > 0) {
              //  setselectedCustomer(customers[0].customer_Name)
                for (let i = 0; i < customers.length; i++) {
                    customers1.push(<option id={customers[i].customer_Id} key={customers[i].customer_Id} value={customers[i].customer_Name}>{customers[i].customer_Name}</option>)
                }
                const obj = new Object()
                obj.page = 0
                obj.perPage = 7
                obj.CustomerId = customers[0].customer_Id
                setCustomerValue(customers[0].customer_Id)
                setcustomersList(customers1)
                getUserByCustomerId(obj)
            }

        })
    }

    useEffect(() => {
        setuserData(JSON.parse(localStorage.getItem('userData')))
        
        if (JSON.parse(localStorage.getItem('userData')).org_type === 1) {
            getCustomerList()
            setupdateDT(false)
        } else { setupdateDT(true) }
    }, [])

    // useEffect(() => {
    //     if (updateDT) {
    //         dispatch(
    //             getCustomerUsers({
    //                 page: currentPage,
    //                 perPage: rowsPerPage,
    //                 q: searchValue
    //             })
    //         )
    //     }
    // }, [dispatch, store?.data?.length, updateDT])

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
            obj.CustomerId = CustomerValue
            setPaging(false)
            dispatch(
                getCustomerUsers(obj)
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
        obj.CustomerId = CustomerValue
        setPaging(false)
        dispatch(
            getCustomerUsers(obj)
        )
    }
    // ** Function to handle Pagination and get data
    const handlePagination = page => {
        
        if (document.getElementById("search-input").value === "") {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
                getCustomerUsers({
                    page: start,
                    perPage: perpage,
                    CustomerId: CustomerValue
                })
            )
        } else {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
                SearchCustomerUsers({
                    searchvale: document.getElementById("search-input").value,
                    page: start,
                    perPage: perpage,
                    CustomerId: CustomerValue
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
      
        const count = Math.ceil(Number((store.totalCustUsers / rowsPerPage)))

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

        if (store?.data?.length > 0) {
            return store.data
        } else if (store?.data?.length === 0 && isFiltered) {
            return []
        } else {
            return store.allData.slice(0, rowsPerPage)
        }
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Customer User List</CardTitle>
                </CardHeader>
                <Row className='mx-0 mt-1 mb-50'>
                    <Col sm='6'>
                        <div className='d-flex align-items-center'>
                            <Label for='sort-select'>show</Label>
                            <Input
                                className='dataTable-select form-control-sm'
                                type='select'
                                id='sort-select'
                                Col="sm"
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
                            {
                                (userData.org_type === 1) && <><Label style={{ paddingLeft: "20px" }} for='sort-select1'>Customer</Label>
                                    <Input
                                        style={{ width: "150px" }}
                                        className='dataTable-select form-control-sm'
                                        type='select'
                                        id='sort-select1'
                                        onChange={
                                            (e) => {
                                                const actcust_Id = e.target.options[e.target.selectedIndex].getAttribute("id")
                                                getUserByCustomerIdOnchange(actcust_Id)
                                                setCustomerValue(actcust_Id)
                                            }
                                        }
                                    >
                                        {/*<option value="none">Customer</option>*/}
                                        {
                                            customersList
                                        }
                                    </Input></>
                            }
                        </div>

                    </Col>
                    <Col xl='6'
                        className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                    >
                        <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                            <Label className='mr-1' for='search-input'>
                                Search
              </Label>
                            <div class="input-icons" style={{ position: 'relative' }}>
                            <Input
                                className='dataTable-filter'
                                type='text'                                
                                id='search-input'
                                value={searchValue}
                                onChange={handleFilter}
                            />
                                {clearbt ? <i className="fa fa-times" aria-hidden="true" role='button' onClick={resetInputField} style={{ position: 'absolute', right: '2rem', top: '0.875rem' }}></i> : null}
                                </div>
                        </div>

                        <AddUser />
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={CustomerUserTableColumns}
                    sortIcon={<ChevronDown size={10} />}
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                />
            </Card>
        </Fragment>
    )
}

export default memo(CustomerUsersList)
