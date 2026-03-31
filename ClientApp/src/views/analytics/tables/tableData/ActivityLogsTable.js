import "react-datepicker/dist/react-datepicker.css"
// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
import { AnalyticsTableColumns, AnalyticsTableSubHead } from '../data'

// ** Store & Actions
import { getActivityData } from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import DatePicker from 'react-datepicker'
const ActivityLogsList = () => {
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange
    
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.activityLogs)
    // ** States
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        dispatch(
            getActivityData({
                page: currentPage,
                perPage: rowsPerPage,
                q: searchValue
            })
        )
    }, [dispatch, store.data.length])


    // ** Function to handle filter
    const handleFilter = e => {
        setSearchValue(e.target.value)

        dispatch(
            getActivityData({
                page: currentPage,
                perPage: rowsPerPage,
                q: e.target.value
            })
        )
    }

    // ** Function to handle Pagination and get data
    const handlePagination = page => {
        dispatch(
            getActivityData({
                page: page.selected + 1,
                perPage: rowsPerPage,
                q: searchValue
            })
        )
        setCurrentPage(page.selected + 1)
    }

    // ** Function to handle per page
    const handlePerPage = e => {
        dispatch(
            getActivityData({
                page: currentPage,
                perPage: parseInt(e.target.value),
                q: searchValue
            })
        )
        setRowsPerPage(parseInt(e.target.value))
    }

    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number((store.total / rowsPerPage).toFixed(0))

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
                    <CardTitle tag='h4'>Activity Logs</CardTitle>
    
                </CardHeader>
                <Row className='mx-0 mt-1'>
                    <Col sm='6'>
                        <div className='d-flex align-items-center'>
                            
                        </div>
                    </Col>
                    <Col xl='6'
                        className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'>
                        <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                        <DatePicker className="form-control"
                         placeholderText="Select date range"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update)
                            }}
                            isClearable={true}
                            /> &nbsp;&nbsp;
                        <Button color="success" className="text-nowrap">Save Excel</Button> &nbsp;&nbsp;

                         <Button color="success"  className="text-nowrap">Save PDF</Button>

                        </div>
                        
                    </Col>
                </Row>
              <hr></hr>
                <Row className='mx-0 mt-1 mb-50'>
                    <Col sm='6'>
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
                    <Col xl='6'
                        className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                    >
                        <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                            <Label className='mr-1' for='search-input'>
                                Search
            </Label>
                            <Input
                                className='dataTable-filter'
                                type='text'
                                bsSize='sm'
                                id='search-input'
                                value={searchValue}
                                onChange={handleFilter}
                            />
                        </div>
                        
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    striped
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={AnalyticsTableColumns}
                    sortIcon={<ChevronDown size={10} />}
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                />
            </Card>
        </Fragment>
    )
}

export default memo(ActivityLogsList)