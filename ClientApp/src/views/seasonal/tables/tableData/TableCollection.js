// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { CollectionTableColumns, CollectionData } from '../seasondata'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'
import Addcollection from '../../Addcollection'
import DataTable from 'react-data-table-component'
import { getData, GetCollectionListBySeasonId, SearchCollectionListBySeasonId } from '../../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { store as store1 } from '@store/storeConfig/store'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
const TableCollection = () => {
// ** Store Vars
const dispatch = useDispatch()
const store = useSelector(state => state.Collection)

// ** States
const [currentPage, setCurrentPage] = useState(0)
const [rowsPerPage, setRowsPerPage] = useState(7)
const [searchValue, setSearchValue] = useState('')
const [clearbt, setClearbt] = useState(false)
const seasonIdref = useRef(0)
const [seasonId, setseasonId] = useState(0)
const [SeasonName, setSeasonName] = useState("")
const [seasonList, setSeasonList] = useState([])
const [Ispaging, setPaging] = useState(false)

function getCollectionBySeasonId(obj) {
  if (obj.SeasonID === 0) return
  store1.dispatch(GetCollectionListBySeasonId(obj))
}

function getcollectionBySeasonIdOnchange(id) {
  if (id === 0) return
  const obj = new Object()
  obj.page = 0
  obj.perPage = 7
  obj.SeasonID = id
  store1.dispatch(GetCollectionListBySeasonId(obj))
}

function getSeasonList() {
  // setupdateDT(true)
  const Seasons1 = []
  const obj = new Object()
  obj.Start = 0
  /*obj.End = 7  shubham change purpose:- Season list getting only first seven seasons*/
  axios.post(`./Seasonal/GetSeasonMastersList`, obj).then(response => {
      const Seasons = response.data.seasonMastersList
     // Seasons.sort((a, b) => (a.sm_Season_Name.toUpperCase() > b.sm_Season_Name.toUpperCase()) ? 1 : -1)
      Seasons.sort((a, b) => {
          if (a.sm_Season_Name.toUpperCase() > b.sm_Season_Name.toUpperCase()) {
              return 1
          } else {
              return -1
          }
      })
      if (Seasons !== null && Seasons.length > 0) {
          for (let i = 0; i < Seasons.length; i++) {
              Seasons1.push(<option id={Seasons[i].sm_Season_Id} key={Seasons[i].sm_Season_Id} value={Seasons[i].sm_Season_Name}>{Seasons[i].sm_Season_Name}</option>)
          }
          setSeasonList(Seasons1)
          const obj = new Object()
          obj.page = 0
          obj.perPage = 7
          obj.SeasonID = Seasons[0].sm_Season_Id
          setseasonId(Seasons[0].sm_Season_Id)
          setSeasonName(Seasons[0].sm_Season_Name)
          getCollectionBySeasonId(obj)
      }

  })
}

useEffect(() => {
  getSeasonList()
}, [])

  useEffect(() => {
    dispatch(
      GetCollectionListBySeasonId({
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
  //     GetCollectionListBySeasonId({
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
        obj.SeasonID = seasonId
        setPaging(false)
        dispatch(
          GetCollectionListBySeasonId(obj)
        )
    }

}

// const resetInputField = e => {
//             setSearchValue("")
//             setClearbt(false)
//  }
// ** HandleResetInputField
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
obj.SeasonID = seasonId
setPaging(false)
dispatch(
GetCollectionListBySeasonId(obj)
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
          GetCollectionListBySeasonId({
                page: start,
                perPage: perpage,
                SeasonID :seasonId
                
            })
        )
    } else {
        let perpage = 7
        if (page.rowsPerPage === undefined) perpage = rowsPerPage
             
        else perpage = page.rowsPerPage
        const start = page.selected === 0 ? 0 : page.selected * perpage
        dispatch(
          SearchCollectionListBySeasonId({
                searchvale: document.getElementById("search-input").value,
                page: start,
                perPage: perpage,
                SeasonID :seasonId
            })
        )
    }
    setCurrentPage(page.selected + 1)
  
  }
  // const handlePagination = page => {
  //   dispatch(
  //     GetCollectionListBySeasonId({
  //       page: page.selected + 1,
  //       perPage: rowsPerPage,
  //       q: searchValue
  //     })
  //   )
  //   setCurrentPage(page.selected + 1)
  // }

  // ** Function to handle per page
  const handlePerPage = e => {
    // dispatch(
    //   GetCollectionListBySeasonId({
    //     page: currentPage,
    //     perPage: parseInt(e.target.value),
    //     q: searchValue
    //   })
    // )
    // setRowsPerPage(parseInt(e.target.value))
    setRowsPerPage(parseInt(e.target.value))
    const obj = new Object()
    obj.selected = 0
    obj.rowsPerPage = parseInt(e.target.value)
    handlePagination(obj)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    //const count = Number((store.total / rowsPerPage).toFixed(0))
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
//   const obj = {
//     OrganisationId: 0,
//     SupplierId: 0,
//     start: 0,
//     end: 0
// }


// useEffect(async () => {
//     const res = await axios.post("./Seasonal/GetSeasonMastersList", obj)
//     sslist(res.data.seasonMastersList)
//   }, [])
  return (
    <Card>
         <Row className='mx-0 my-1'> 
                <Col sm="3" md='4' className='pr-0 col-md-4'>
                  <div className='align-items-center col-sm-12 col-lg-12 d-inline-flex pr-0 pl-0'>
                    
                      <Label className="col-form-label col-lg-3 pl-0">Seasons</Label>
                      <Input 
                       type="select"
                       name="OrderCName"
                        className="states order-alpha form-control state col-lg-6" 
                        parentid="#" 
                        subid="#"
                        ref={seasonIdref}
                        id="Seaslist_id"
                        onChange={
                           (e) => { 
                          const Seas_Id = e.target.options[e.target.selectedIndex].getAttribute("id")
                          //const Seas_Id = document.getElementById('Seaslist_id').id
                          const Seas_Name = e.target.options[e.target.selectedIndex].getAttribute("value")
                          getcollectionBySeasonIdOnchange(Seas_Id)
                          setseasonId(Seas_Id)
                          setSeasonName(Seas_Name)
                        }}
                        >
                          {/* <option value="none">Select</option> */}
                          
                          {
                            seasonList
                          } 

                      </Input>
                      <Addcollection seasonId={seasonId} SeasonName={SeasonName} />
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
                    
                    </div>
                </Col> 
            </Row>
               <DataTable
                    noHeader
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={ CollectionTableColumns }    
                    paginationComponent={CustomPagination}
                    //data={CollectionData} 
                    data={dataToRender()}                 
                />  
            </Card>
  )
}

export default TableCollection