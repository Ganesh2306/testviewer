
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
import axios from 'axios'
// ** Table Columns
import { SupplierUserTableColumns } from '../data'

import { AddSupplierUser } from './modalEditSupplier'

// ** Store & Actions
import { getSUData, getSUDataSearch } from '../../store/actions'
import { store as store1 } from '@store/storeConfig/store'
import { useSelector, useDispatch } from 'react-redux'


// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'

const SupplierUsersList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.supplierusers)
    // ** States
    const [Ispaging, setPaging] = useState(false)
    const [suppid, setSuppValue] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
    const [clearbt, setClearbt] = useState(false)
    const [suppliersList, setsuppliersList] = useState([])
    const [updateDT, setupdateDT] = useState(false)
    const [userData, setuserData] = useState({})
    function getUserBySuppId(obj) {
        if (obj.SupplierId === 0) return
        store1.dispatch(getSUData(obj))
    }
    function getUserBySupplierIdonchange(id) {
        if (id === 0) return
        const obj = new Object()
        obj.page = 0
        obj.perPage = 7
        obj.SupplierId = id
        store1.dispatch(getSUData(obj))
    }
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
                    suppliers1.push(<option id={suppliers[i].supplier_id} key={suppliers[i].supplier_id} value={suppliers[i].sup_name}>{suppliers[i].sup_name}</option>)
                }
                setsuppliersList(suppliers1)
                const obj = new Object()
                obj.page = 0
                obj.perPage = 7
                obj.SupplierId = suppliers[0].supplier_id
                setSuppValue(suppliers[0].supplier_id)
                getUserBySuppId(obj)
            }

        })
    }
     useEffect(() => {
        setuserData(JSON.parse(localStorage.getItem('userData')))
       
        if (JSON.parse(localStorage.getItem('userData')).org_type === 1) {
            getSupplierList()
            setupdateDT(false)
        } else { setupdateDT(true) }
    }, [])

    // useEffect(() => {
    //     if (updateDT) {
    //         dispatch(
    //             getSUData({
    //                 page: currentPage,
    //                 perPage: rowsPerPage,
    //                 q: searchValue
    //             })
    //         )
    //     }
    // }, [dispatch, store.data.length, updateDT])


    // ** Function to handle filter
    //const handleFilter = e => {
    //    setSearchValue(e.target.value)
    //    setClearbt(true)
    //    if (updateDT) {
    //        dispatch(
    //            getSUData({
    //                page: currentPage,
    //                perPage: rowsPerPage,
    //                q: e.target.value
    //            })
    //        )
    //    }
    //}

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
                getSUData(obj)
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
            getSUData(obj)
        )
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
                getSUData({
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
                getSUDataSearch({
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
                    <CardTitle tag='h4'>Supplier User List</CardTitle>
                </CardHeader>
                <Row className='mx-0 mt-1 mb-50'>
                    <Col xl='4' md='4'>
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
                            {
                                (userData.org_type === 1) && <><Label style={{ paddingLeft: "20px" }} for='sort-select1'>Supplier</Label>
                                    <Input
                                        style={{ width: "150px" }}
                                        className='dataTable-select form-control-sm'
                                        type='select'
                                        //id='sort-select_Sup'
                                        id='sort-select1'
                                        onChange={
                                            (e) => {
                                                const actsup_Id = e.target.options[e.target.selectedIndex].getAttribute("id")
                                                getUserBySupplierIdonchange(actsup_Id)
                                                setSuppValue(actsup_Id)
                                            }
                                        }
                                    >
                                        {
                                            
                                            suppliersList
                                        }
                                    </Input></>
                            }
                        </div>
                    </Col>
                    <Col xl='8' md='8'
                        className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-sm-1 mt-md-0'
                    >
                        <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1 col-sm-12 justify-content-lg-end justify-content-start'>
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
                            <AddSupplierUser />
                        </div>
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={SupplierUserTableColumns}
                    sortIcon={<ChevronDown size={10} />}
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                />
            </Card>
        </Fragment>
    )
}

export default memo(SupplierUsersList)
