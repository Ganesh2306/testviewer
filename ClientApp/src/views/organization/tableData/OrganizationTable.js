// ** React Imports
import { Fragment, useState, useEffect, useRef, memo } from 'react'
import { R_Loader } from '../../../views/loader/loader'
// ** Table Columns
import { OrgnizationTableColumns } from '../data'
import OpenAddOrganization from './OpenAddOrganization'
// ** Store & Actions
import { getOrgData, getOrgDataSearch } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
//**Context  */
import StateProvider from '../../context/stateContext'
// import CloneOrganization from './CloneOrganization'
const OrgnizationList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.organization)
  const [Ispaging, setPaging] = useState(false)
  // ** States
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [clearbt, setClearbt] = useState(false)
  const loaderRef = useRef(null)
  //const [demo, setSearchValue] = useState('')

  useEffect(() => {
    // loaderRef.current.style.display = 'block'  
    dispatch(
      getOrgData({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue
      })
    )
    // loaderRef.current.style.display = 'none'
  }, [dispatch])

  // ** Function to handle filter
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
      setPaging(false)
      dispatch(
        getOrgData(obj)
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
    setPaging(false)
    dispatch(
      getOrgData(obj)
    )
  }

  const handlePagination = page => {
    // loaderRef.current.style.display = 'block'  
    if (document.getElementById("search-input").value === "") {
      let perpage = 7
      if (page.rowsPerPage === undefined) perpage = rowsPerPage
      else perpage = page.rowsPerPage
      const start = page.selected === 0 ? 0 : page.selected * perpage
      dispatch(
        getOrgData({
          page: start,
          perPage: perpage,
          q: searchValue
        })
      )
      // loaderRef.current.style.display = 'none'
    } else {
      let perpage = 7
      if (page.rowsPerPage === undefined) perpage = rowsPerPage
      else perpage = page.rowsPerPage
      const start = page.selected === 0 ? 0 : page.selected * perpage
      dispatch(
        getOrgDataSearch({
          page: start,
          perPage: perpage,
          searchvale: document.getElementById("search-input").value
        })
      )
      // loaderRef.current.style.display = 'none'
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
          <CardTitle tag='h4'>Organization List</CardTitle>
        </CardHeader>
        <Col className='mx-0 mt-1 mb-50  d-flex'>
          <Col sm=''>
            <div className='d-flex mt-1 align-items-center'>
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
          <Col xl='4'
            className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-1 lg-0 mt-sm-1 mt-1 md-0 col-md-8 col-xl-8'
          >
            <div className='d-flex align-items-center  mb-sm-0 mb-1 mr-1'>
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
            {/* <Button.Ripple color='primary'>
              Add New User
            </Button.Ripple> */}
            <StateProvider>
              <OpenAddOrganization />
              {/* <CloneOrganization/> */}
            </StateProvider>
          </Col>
        </Col>
        <DataTable
          noHeader
          pagination
          paginationServer
          className='react-dataTable'
          columns={OrgnizationTableColumns}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={dataToRender()}      
  
        // setCurrentPage={setCurrentPage}
        // currentPage={currentPage}
        />
        <R_Loader loaderRef={loaderRef} />
      </Card>
    </Fragment>
  )
}

export default memo(OrgnizationList)
