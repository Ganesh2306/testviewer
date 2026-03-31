// ** React Imports
import { useState, useEffect } from 'react'
import { SeasonTableColumns, SeasonData } from '../seasondata'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'
import Addseasonal from '../../Addseasonal'
import DataTable from 'react-data-table-component'
import { getData, CollezioniGetSeasonMastersList, CollezioniSearchSeasonMastersList } from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'

const TableSeason = () => {
 
// ** Store Vars
const dispatch = useDispatch()
const store = useSelector(state => state.Seasonal)

// ** States
const [currentPage, setCurrentPage] = useState(0)
const [rowsPerPage, setRowsPerPage] = useState(7)
const [searchValue, setSearchValue] = useState('')
const [Ispaging, setPaging] = useState(false)
const [clearbt, setClearbt] = useState(false)

  useEffect(() => {
    dispatch(
      CollezioniGetSeasonMastersList({
        page: currentPage,
        perPage: rowsPerPage,
        q: searchValue
      })
    )
  }, [dispatch])

    
  // ** Function to handle filter
  // const handleFilter = e => {
  //   setSearchValue(e.target.value)
  //   setClearbt(true)

  //   dispatch(
  //     CollezioniGetSeasonMastersList({
  //       page: currentPage,
  //       perPage: rowsPerPage,
  //       q: e.target.value
  //     })
  //   )
  // }

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
          CollezioniGetSeasonMastersList(obj)
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
          CollezioniGetSeasonMastersList(obj)
        )
}
  // ** Function to handle Pagination and get data
// const handlePagination = page => {
//     dispatch(
//       CollezioniGetSeasonMastersList({
//         page: page.selected + 1,
//         perPage: rowsPerPage,
//         q: searchValue
//       })
//     )
//     setCurrentPage(page.selected + 1)
//   }
const handlePagination = page => {
        
  if (document.getElementById("search-input").value === "") {
      let perpage = 7
      if (page.rowsPerPage === undefined) perpage = rowsPerPage
      else perpage = page.rowsPerPage
      const start = page.selected === 0 ? 0 : page.selected * perpage
      dispatch(
        CollezioniGetSeasonMastersList({
              page: start,
              perPage: perpage,
              q: searchValue
              //SupplierId: suppid
          })
      )
  } else {
      let perpage = 7
      if (page.rowsPerPage === undefined) perpage = rowsPerPage
           
      else perpage = page.rowsPerPage
      const start = page.selected === 0 ? 0 : page.selected * perpage
      dispatch(
        CollezioniSearchSeasonMastersList({
              searchvale: document.getElementById("search-input").value,
              page: start,
              perPage: perpage
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

// const handlePerPage = e => {
//     dispatch(
//       CollezioniGetSeasonMastersList({
//         page: currentPage,
//         perPage: parseInt(e.target.value),
//         q: searchValue
//       })
//     )
//     setRowsPerPage(parseInt(e.target.value))
//   }

  // ** Custom Pagination
const CustomPagination = () => {
    //const count = 12
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
  //const dataToRender = () => {
    // const filters = {
    //   q: searchValue
    //}
    //}

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
    <Card>
            <Row className='mx-0 my-1'> 
                <Col sm="3" md='4' className='pr-0'>
                  <div className='align-items-center col-sm-12 col-lg-12 d-inline-flex pr-0 pl-0'>
                      <Label className="col-form-label col-lg-3 pl-0">Season</Label>
                      {/* <Input type="select" name="OrderCName" className="states order-alpha form-control state col-lg-6" parentid="#" subid="#" id="">
                          <option value="none">Select</option>
                          <option value="CustB" name="Season_a">Season_a</option>
                          <option value="CustC" name="Season_b">Season_b</option>
                          <option value="CustD" name="Season_c">Season_c</option>
                      </Input> */}
                      <Addseasonal />
                  </div>
                  
              </Col>       
          
              <Col sm='9' md='8' className='d-flex justify-content-end'>
                    <div className='d-flex align-items-center mb-sm-0 mr-1'>
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
                    <div className='d-flex align-items-center pl-0'>
                        <Label for='sort-select'>Show</Label>
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
            </Row>
            <DataTable
                    noHeader
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={SeasonTableColumns} 
                    paginationComponent={CustomPagination}
                    //data={SeasonData}    
                    data={dataToRender()}              
                />  
    </Card>
  )
}

export default TableSeason