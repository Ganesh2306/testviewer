// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'
import axios from 'axios'
// ** Table Columns
import { AgentUserTableColumns } from '../data'

import AddAgentUSer from './OpenAddAgentUser'

// ** Store & Actions
import { getAgentUsers, SearchAgentUsers } from '../../store/actions'
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

const UsersList = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.Agentusers)
    // ** States

    const [Ispaging, setPaging] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
    const [clearbt, setClearbt] = useState(false)
    const [AgentIdValue, setAgentIdValue] = useState(0)
    const [agentsList, setagentsList] = useState([])
    const [updateDT, setupdateDT] = useState(false)
    const [userData, setuserData] = useState({})
    function getUserByAgentId(obj) {
        if (obj.AgentId === 0) return
        store1.dispatch(getAgentUsers(obj))
    }
    function getUserByAgentIdOnchange(id) {
        if (id === 0) return
        const obj = new Object()
        obj.page = 0
        obj.perPage = 7
        obj.AgentId = id
        store1.dispatch(getAgentUsers(obj))
    }

    function getAgentList() {
        // setupdateDT(true)
        
        const agents1 = []
        const obj = new Object()
        obj.Start = 0
        obj.End = 0
        axios.post(`./Agent/Agents`, obj).then(response => {
            
            const agents = response.data.agentListDto
            if (agents !== null && agents.length > 0) {
                //  setselectedCustomer(customers[0].customer_Name)
                for (let i = 0; i < agents.length; i++) {
                    agents1.push(<option id={agents[i].agent_id} key={agents[i].agent_id} value={agents[i].agt_name}>{agents[i].agt_name}</option>)
                }
                setagentsList(agents1)
                const obj = new Object()
                obj.page = 0
                obj.perPage = 7
                obj.AgentId = agents[0].agent_id
                setAgentIdValue(agents[0].agent_id)
                getUserByAgentId(obj)
            }

        })
    }

    useEffect(() => {
        setuserData(JSON.parse(localStorage.getItem('userData')))
        
        if (JSON.parse(localStorage.getItem('userData')).org_type === 1) {
            getAgentList()
            setupdateDT(false)
        } else { setupdateDT(true) }
    }, [])

    useEffect(() => {
        if (updateDT) {
            dispatch(
                getAgentUsers({
                    page: currentPage,
                    perPage: rowsPerPage,
                    q: searchValue
                })
            )
        }
    }, [dispatch, store.data.length, updateDT])

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
            obj.AgentId = AgentIdValue
            setPaging(false)
            dispatch(
                getAgentUsers(obj)
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
        obj.AgentId = AgentIdValue
        setPaging(false)
        dispatch(
            getAgentUsers(obj)
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
                getAgentUsers({
                    page: start,
                    perPage: perpage,
                    AgentId: AgentIdValue
                })
            )
        } else {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
                SearchAgentUsers({
                    searchvale: document.getElementById("search-input").value,
                    AgentId: AgentIdValue,
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
                    <CardTitle tag='h4'>Agent User List</CardTitle>
                </CardHeader>
                <Row className='mx-0 mt-1 mb-50'>
                    <Col sm='6'>
                        <div className='d-flex align-items-center'>
                            <Label for='sort-select'>show</Label>
                            <Input
                                className='dataTable-select form-control-sm'
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
                                (userData.org_type === 1) && <><Label style={{ paddingLeft: "20px" }} for='sort-select1'>Agent</Label>
                                    <Input
                                        style={{ width: "150px" }}
                                        className='dataTable-select form-control-sm'
                                        type='select'
                                        id='sort-select1'
                                        onChange={
                                            (e) => {
                                                const actcagt_Id = e.target.options[e.target.selectedIndex].getAttribute("id")
                                                getUserByAgentIdOnchange(actcagt_Id)
                                                setAgentIdValue(actcagt_Id)
                                            }
                                        }
                                    >
                                        {/*<option value="none">Customer</option>*/}
                                        {
                                            agentsList
                                        }
                                    </Input></>
                            }
                        </div>
                    </Col>
                    <Col xl='6'
                        className='d-flex align-items-633sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
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
                                {clearbt ? <i className="fa fa-times" aria-hidden="true" role='button' onClick={resetInputField} style={{ position: 'absolute', right: '1rem', top: '0.875rem' }}></i> : null}
                             </div>
                        </div>

                        <AddAgentUSer />
                    </Col>
                </Row>
                <DataTable
                    noHeader
                    pagination
                    paginationServer
                    className='react-dataTable'
                    columns={AgentUserTableColumns}
                    sortIcon={<ChevronDown size={10} />}
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                />
            </Card>
        </Fragment>
    )
}

export default memo(UsersList)
