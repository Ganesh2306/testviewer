// ** React Imports
import { Fragment, useState, useEffect, memo, useContext } from 'react'

// ** Store & Actions
import { serverSideColumnsFavourite, FavouriteData } from './data'
import { getData } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, FastForward } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button, ButtonGroup } from 'reactstrap'

const FavouriteDetails = (props) => { 

// ** Store Vars
const dispatch = useDispatch()
const store = useSelector(state => state.dataTables)

// ** States
const [currentPage, setCurrentPage] = useState(1)
const [rowsPerPage, setRowsPerPage] = useState(7)
const [searchValue, setSearchValue] = useState('')
const [clearbt, setClearbt] = useState(false)

  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue
      })
    )
  }, [dispatch])

  // ** Function to handle filter
  const handleFilter = e => {
    setSearchValue(e.target.value)  
    setClearbt(true)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: e.target.value
      })
    )
    }

    const resetInputField = e => {
        setSearchValue("")
        setClearbt(false)
    }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    dispatch(
      getData({
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
      getData({
        page: currentPage,
        perPage: parseInt(e.target.value),
        q: searchValue
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    //const count = Number((store.total / rowsPerPage).toFixed(0))
    const count = 12

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

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }
  return (    
    <div>
       <div className='report_details'>
            <Card>
              {/* <CardHeader className='border-bottom d-flex'>              
                <div className="col-md-4 text-left">
                <Col className="form-group d-flex">
                     <Label className="col-form-label col-md-4">Customer</Label>
                     <Input type="select" name="OrderCName" className="states order-alpha form-control state col-md-8" parentid="#" subid="#" id="">
                        <option value="none">Select</option>
                        <option value="CustB" name="B">Birla</option>
                        <option value="CustC" name="C">Morarji</option>
                        <option value="CustD" name="D">Raymond</option>                      
                    </Input>
                </Col>
                </div>
                <div>
                <Button.Ripple color='btn btn-success text-right mr-1'>                
                 <span className='ml-25'>Save Excel</span>
                </Button.Ripple>  
                 <Button.Ripple color='btn btn-success text-right'>                
                   <span className='ml-25'>Save PDF</span>
                </Button.Ripple> 
                </div>                
              </CardHeader> */}
               <Row className='mx-0 mt-1'>
                <Col sm='4'>
                  <div className='d-xl-flex flex-sm-column flex-lg-row align-items-center'>
                  <Label className="col-form-label col-md-3 pl-50">Customer</Label>
                     <Input type="select" name="OrderCName" className="states order-alpha form-control state col-md-9" parentid="#" subid="#" id="">
                        <option value="none">Select</option>
                        <option value="CustB" name="B">Birla</option>
                        <option value="CustC" name="C">Morarji</option>
                        <option value="CustD" name="D">Raymond</option>                      
                    </Input>
                  </div>
                
                </Col>
                <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='8'>
                    <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1 excelpdf_group'>
                      <Button.Ripple color='btn btn-success text-right mr-1'>                
                      <span className='ml-25'>Save Excel</span>
                      </Button.Ripple>  
                      <Button.Ripple color='btn btn-success text-right'>                
                        <span className='ml-25'>Save PDF</span>
                      </Button.Ripple> 
                    </div>  
                  </Col> 
              </Row>
              <hr/>
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
                <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
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
                  </Col>
              </Row>
              <DataTable
                noHeader
                pagination
                paginationServer
                className='react-dataTable'
                columns={serverSideColumnsFavourite}
                sortIcon={<ChevronDown size={10} />}
                paginationComponent={CustomPagination}
                //data={dataToRender()}
                data={FavouriteData}
              />
            </Card>
          </div>
     {/* <span onClick={
       () => {
        props.setOpen(true)       
       }
     }>click here</span> */}
    </div>
  ) 
}

export default FavouriteDetails
