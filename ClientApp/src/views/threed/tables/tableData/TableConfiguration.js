// ** React Imports
import { Fragment, useState, useEffect, memo, useRef } from 'react'

// ** Table Columns
import { ProductTableColumns, ProductThreeDTypeData, ColumnRoleDesign } from '../data'

// ** Store & Actions
import { GetQ3DProductsdata, getThreeDProductDataSearch } from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { store as store1 } from '@store/storeConfig/store'
// ** Third Party Components
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import $ from 'jquery'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Button, Input } from 'reactstrap'
import './../../../../customStyles/archivestyle.css'
const TableConfiguration = () => {
    // ** Store Vars 
    const dispatch = useDispatch()
    const store = useSelector(state => state.Q3dProducts)
    // ** States
    const [Ispaging, setPaging] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
    const [clearbt, setClearbt] = useState(false)
    const orgidRef = useRef(0)
    const [orglist, setOrglist] = useState([])
    const [productdata, setProductdata] = useState([])
    let ProductData_new = []

    const GetQ3DProductsdata2 = async () => {
        const obj = {
            OrganisationId: orgidRef.current ? orgidRef.current.value : 0
        }
        await axios.post(`./ThreeD/GetQ3DProducts?OrganisationId=${obj.OrganisationId}`, obj).then(response => {
            const data = JSON.parse(response.data)?.value
            setQ3dProductdataByOrder(data)

        })

    }

    // ** Function for passing Organisation_Id (ByDefault Id of 1st Organisation from Organisation Dropdown) when page render
    const getProductByOrgId = () => {
        GetQ3DProductsdata2()
    }

    // ** Function for passing Organisation_Id on Dropdown Onchange
    const getProductByOrgnisationonchange = (id) => {
        if (id === 0) return
        const obj = new Object()
        obj.OrganisationId = id
        GetQ3DProductsdata2()
    }

    // ** Function for Get ConfiguredOrganisations
    const GetQ3DProducts = (async () => {
        await axios.post(`./ThreeD/GetConfiguredOrganisations`).then(response => {
            setOrglist(JSON.parse(response.data))
            getProductByOrgId()
        })
    })

    useEffect(() => {
        GetQ3DProducts()
    }, [])

    // useEffect(async() => {
    //     setQ3dProductdataByOrder(store.data)
    //  }, [store])    


    // ** Function to iterate store_data and push in new array, pass data to Datatable Columns
    const setQ3dProductdataByOrder = async (data) => {
        ProductData_new = []
        setProductdata([])
        if (Object.keys(data).length > 0) {
            Object.keys(data).forEach((e, k) => {
                const Pdata = new Object({
                    id: (k + 1),
                    q3d_product_name: e,
                    q3dorder_no: <Input key={k} defaultValue={data[e]} type='number' bsSize='sm' style={{ width: '80px' }} />
                })
                ProductData_new.push(Pdata)
            })
        }
        setProductdata(ProductData_new)
    }

    // ** Function for Edit ProductConfiguration
    const EditProductConfiguration = async () => {
        const SaveQ3dProductConfiguration = []
        const datas = $('.rdt_TableBody')
        for (let i = 0; i < datas.children().length; i++) {
            const product_name = datas[0].children[i].children[1].textContent
            const order_no = datas[0].children[i].children[2].children[0].children[0].value
            const SaveProductConfig = new Object({
                state: 2,
                q3d_organisation_id: orgidRef.current ? orgidRef.current.value : 0,
                q3d_product_name: product_name,
                q3d_order_no: order_no
            })
            SaveQ3dProductConfiguration.push(SaveProductConfig)
        }
        await axios.post('./ThreeD/SaveQ3dProductConfiguration', SaveQ3dProductConfiguration)
            .then(async function (response) {
                const data = await JSON.parse(response.data)
                if (data.value === true) {
                    await Swal.fire(
                        'Success !',
                        '3dOrder Configuration Saved Successfully!',
                        'success'
                    )
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '3dOrder Configuration not Saved!'
                    })
                }
            })

    }

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
                GetQ3DProductsdata(obj)
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
            GetQ3DProductsdata(obj)
        )
    }
    const handlePagination = page => {

        if (document.getElementById("search-input").value === "") {
            let perpage = 7
            if (page.rowsPerPage === undefined) perpage = rowsPerPage
            else perpage = page.rowsPerPage
            const start = page.selected === 0 ? 0 : page.selected * perpage
            dispatch(
                GetQ3DProductsdata({
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
                getThreeDProductDataSearch({
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
                // onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName={
                    'pagination react-paginate separated-pagination pagination-sm '
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

        if (Object.keys(store.data).length > 0) {
            return store.data
        } else if (Object.keys(store.data).length === 0 && isFiltered) {
            return []
        } else {
            return (Object.keys(store.data)).slice(0, rowsPerPage)
        }
    }

    return (
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <div className='col-md-8 col-sm-12 d-flex' style={{ justifyContent: "left" }} >
                        <CardTitle tag='h4' className="mr-4" style={{ paddingTop: "0.5rem" }}> 3D Product Order</CardTitle>
                        <form className="form-inline flex-wrap select col-md-3 col-sm-12 pl-0 pr-50"> <span className="float-left mr-1">Organization</span>
                            <select className="form-control"
                                ref={orgidRef}
                                onChange={(e) => {
                                    const id = orgidRef.current ? orgidRef.current.value : 0
                                    getProductByOrgnisationonchange(id)
                                }}
                            >
                                {orglist?.value && orglist.value.map((e, k) => {
                                    return <option value={e.organisation_id}>{e.organization_Name}</option>
                                })}

                            </select>
                        </form>
                    </div>

                    <Button className="btn btn-sm btn-success mr-1"
                        onClick={async () => {
                            await EditProductConfiguration()
                            const obj1 = {
                                OrganisationId: orgidRef.current ? orgidRef.current.value : 0
                            }
                            GetQ3DProductsdata2()

                        }}
                    > Save </Button>
                </CardHeader>
                <DataTable
                    id="Q3dproductdt"
                    noHeader
                    //pagination
                    //paginationServer
                    className='react-dataTable'
                    columns={ProductTableColumns}
                    //sortIcon={<ChevronDown size={10} />}
                    //paginationComponent={CustomPagination}
                    data={productdata}
                />
            </Card>
        </Fragment>
    )
}

export default memo(TableConfiguration)
