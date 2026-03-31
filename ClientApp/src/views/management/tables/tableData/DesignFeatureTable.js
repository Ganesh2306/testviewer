// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
import { ColumnsDesignFeature, ProductDesignFeatureData } from './data'

import AddDesignFeature from './OpenAddDesignFeature'

// ** Store & Actions
import { getDesignFeautre, DesignFeautreSearch } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'

const DataDesignFeatureTable = () => {
  // ** Store Vars
  const dispatch = useDispatch()
    const store = useSelector(state => state.DesignFeature)

  // ** States
    const [Ispaging, setPaging] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7)
  const [searchValue, setSearchValue] = useState('')
  const [clearbt, setClearbt] = useState(false)

  // ** Get data on mount
  useEffect(() => {
    dispatch(
        getDesignFeautre({
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
                getDesignFeautre(obj)
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
            getDesignFeautre(obj)
        )
    }
    

    const handlePagination = page => {
        
        if (document.getElementById("search-input").value === "") {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
                getDesignFeautre({
                    page: start,
                    perPage: perpage,
                    q: searchValue
                })
            )
        } else {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
               DesignFeautreSearch({
                    page: start,
                    perPage: perpage,
                    searchvale: document.getElementById("search-input").value
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
          <CardTitle tag='h4'>Design Feature</CardTitle>
        </CardHeader>
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
          <AddDesignFeature/>
            </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          className='react-dataTable'
          columns={ColumnsDesignFeature}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={dataToRender()}
          //data={ProductDesignFeatureData}
        />
      </Card>
    </Fragment>
  )
}

export default memo(DataDesignFeatureTable)
