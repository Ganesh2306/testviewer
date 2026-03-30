import { Trash, Grid, List, Share2, Link2 } from 'react-feather'
import classnames from 'classnames'
import { Table, Button, ButtonGroup, Row, Input } from 'reactstrap'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { accessContext } from '../../context/accessContext'
import { BC_Menu, getCollectionList, sendrq, getBoard } from '../../../utility/_boardutils/utils'
import axios from 'axios'
import '../css/viewboard.css'
import { bcMenuContext } from '../../context/bcMenuContext'
import pdfHtml from '../../design/Utility/pdfHtml'
import { ModalAssignCollection } from '../../popups/ModalAssignCollection'
import { ModalCreateWishlist } from '../../popups/ModalCreateWishlist'
import Loader from '../../Loader/Loader'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useWindowSize from '../../customHooks/useWindowSize'

function chk(a, id, istrue) {

    if (!a) {
        return null
    }
    const BoardCollectionDto = istrue ? a.collections : a.allFavoriteList
    for (let index = 0; index < BoardCollectionDto.length; index++) {
      if (istrue) {
        if (a.collections[index].collection_Id === id) { // //a.collections[index][istrue ? `collectionId` : `boardId`]
          return a.collections[index]
        }
      } else {
        if (a.allFavoriteList[index].favorite_Id === id) { // //a.collections[index][istrue ? `collectionId` : `boardId`]
          return a.allFavoriteList[index]
        }
      }
    }
  }

const TRow = ({ Name, Lsdate, designName, folderId, User, Count, NoComments, k, show, list, id, setboard, chk, setbcMenudata, checked, onCheckboxChange }) => {
    //console.log(list)

    //Added By Vijay Pansande, Added On : 30-12-2022, Purpose : Switch user (delete board)
    const [is_open, setis_open] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { board, is_boarduser, selectedUser } = useContext(accessContext)
    const history = useHistory()
    const Swal = require('sweetalert2')
    const viewColBoard = show ? "col" : "board"

    const selectedindex = useParams('boardId')
    const { boardId } = useParams()
    // console.log(selectedindex)
    const { bcMenudata } = useContext(bcMenuContext)
    // console.log(board)
    // console.log(bcMenudata)
    const requestdata = {
      start : 0,
      end : 1000000,
      designName : null
  }

  const checkForcb = (isLogin) => {
    if (isLogin) {
     return BC_Menu.value
    } else {
      return !BC_Menu.value
    }
  }
    const val1 = board ? board[boardId ? boardId : k] : {}
    const val2 = bcMenudata ? bcMenudata[boardId ? boardId : k] : {}
    const name = BC_Menu.value ? ((val2) ? val2.collection_Id ? `${val2.collection_Name}` : `${val2.board_Name}` : undefined) : ((val1) ? val1.collection_Id ? `${val1.collection_Name}` : `${val1.board_Name}` : undefined)
              // val1 = board ? board[boardId] : {}
    if (!BC_Menu.value) {
        if (is_boarduser) {
            requestdata.CollectionId = val1.collection_Id ? val1.collection_Id : 0
        } else if (!is_boarduser) {

            requestdata.BoardId = val1.favorite_Id ? val1.favorite_Id : 0

        }
    } else {
        // val2 = bcMenudata ? bcMenudata[boardId] : {}
        if (!is_boarduser) {
            requestdata.CollectionId = val2.collection_Id ? val2.collection_Id : 0
        } else if (is_boarduser) {
            requestdata.BoardId = val2.favorite_Id ? val2.favorite_Id : 0
        }

    }
    if (selectedUser) {
      if (is_boarduser) {
        requestdata.customerid = localStorage?.selecteduser?.value ? JSON.parse(localStorage.selecteduser)?.value : selectedUser.value
      } else {
        requestdata.supplierid = JSON.parse(localStorage.selecteduser)?.value
        requestdata.SupplierUserId = JSON.parse(localStorage.selecteduser)?.user_id
      }

    }
     const CollectionURL = `/DesignSearch/PdfCollection`
     const BoardURL = `/DesignSearch/PdfBoard`
     let baseUrl = localStorage.getItem("localUrl")
     baseUrl = `${baseUrl}/${list ? list.folderId : folderId}/t/${list ? list.designName : designName}t.jpg`
      return (
        <>
              <tr className='ecommerce-card card' >
                <td>
                  <div className='custom-control custom-checkbox wishlistCheck'>               
                    <Input type="checkbox"
                     checked={checked} 
                     onChange={onCheckboxChange} 
                              className='custom-control-input form-check-input'>
                      </Input>
                      <label for="wishlistCollSelect" className='custom-control-label' />
                  </div>   
                </td>                           
                  <td>
                    <Link to={show ? {pathname:`./MyCollection/${k}`, state:"col" } : { pathname:`./Boards/${k}`,  state:"board" }}>
                    <div className='item-img text-center mx-auto position-relative collection_img'>
                          <div className="top"  style={{ backgroundImage: `url("${baseUrl}")` }}>
                            <img className='img-fluid card-img-top'/>
                        </div>
                  </div>
                    </Link>
                  </td>
                <td>
                 <h6 className='item-price  p-1 design_name'>{list?.board_Name || list?.collection_Name}</h6>
               </td>
               <td>
                  <span className='p-1 py-25'>        {list?.user}</span>
               </td>

                <td  className='lastupdate' >
                       {/* <span className='p-1 py-25'>
                       {list !== null ?  new Date(new Date(list.modifiedOn).getTime() - (1 * 60 * 60 * 1000)).toUTCString().replace('GMT+0000 (Coordinated Universal Time)', 'GMT')  : 0}
                        </span> */}
                                      <span className='p-1 py-25'>
    {(() => {
        const currentDate = new Date() // Get the current date and time
        const options = { 
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
            hour12: true 
        }
        return currentDate.toLocaleString(undefined, options) // Format the current date and time
    })()}
</span>
                </td>
  

                 <td>
                   <p className='p-1 py-25 mb-1 item-description card-text'> {list?.designCount}</p>
                 </td>
                  {/* <td  className='showforrow'><span className='p-1 py-25'>{list?.commentCount}</span></td> */}
                <td className=''>
                  <Link to={show ? {pathname:`./MyCollection/${k}`, state:"col" } : { pathname:`./Boards/${k}`,  state:"board" }} > <div className='collectionclick' ></div></Link>

                    {is_boarduser && !show ? <div className='board_col_remove' onClick={() => {
                                if (chk) {
                                } else {
                                    if (show) {
                                      Swal.fire({
                                        title: 'Are you sure?',
                                        text: "Your Collection will be permanently deleted!!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!',
                                        allowOutsideClick: false
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          axios.post("./DesignSearch/CreateCollection", {
                                            state: 3,
                                            collection_Id: id,
                                            collection_Name: "",
                                            collection_Customer_Id: 0,
                                            collection_Customer_User_id: 0
                                        }).then((e) => {
                                            if (e.data === false || e.data === "false") {
                                                alert('not created')
                                            } else {
                                              Swal.fire(
                                                'Deleted!',
                                                'Your Collection has been deleted.',
                                                'success'
                                              )
                                                //Added By : Vijay Pansande, Added On : 09-12-2022, Purpose : clear board id from session when we delete board
                                                // commented by Manisha below lines
                                                const check = Number(sessionStorage.privselected) && Number(sessionStorage.privselected) === id ? sessionStorage.removeItem('privselected') : ""
                                                getCollectionList(setboard)
                                            }
                                        }
                                        )
                                        }
                                      }).catch(e => console.error(e))
                                    } else {
                                      Swal.fire({
                                        title: 'Are you sure?',
                                        text: " Your Wishlist will be permanently deleted!!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!'
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          axios.post("./DesignSearch/CreateBoard", {
                                            state: 3,
                                            board_id: id,
                                            board_name: "",
                                            board_customer_id: 0,
                                            board_customer_user_id: 0,
                                            board_supplier_id: selectedUser && is_boarduser ? JSON.parse(localStorage.selecteduser).user_id : 0
                                           
                                        }).then(e => {
                                            if (e.data === false || e.data === "false") {
                                                alert('not created')
                                            } else {
                                              Swal.fire(
                                                'Deleted!',
                                                'Your Wishlist has been deleted.',
                                                'success'
                                              )
                                                //Added By : Vijay Pansande, Added On : 09-12-2022, Purpose : clear board id from session when we delete board
                                                const check = Number(sessionStorage.privselected) && Number(sessionStorage.privselected) === id ? sessionStorage.removeItem('privselected') : ""
                                                if (!is_boarduser) {
                                                    sendrq(setboard)
                                                } else {
                                                  getBoard(JSON.parse(localStorage.userData).org_type_id, setbcMenudata)
                                                  //getBoard(JSON.parse(localStorage.selecteduser).user_id, setbcMenudata)
                                                 
                                                }

                                            }
                                        })
                                        }
                                      }).catch(e => {
                                        })
                                    }
                                }
                            }
                            }>
                      <Trash className='mr-2 ' size={15}
                            
                        /><span className='align-middle'></span>
                    </div> : selectedUser && show ? '' : <div className='board_col_remove'>
                      <Trash className='mr-2 ' size={15}
                            onClick={() => {
                                if (chk) {
                                } else {
                                    if (show) {
                                      Swal.fire({
                                      title: 'Are you sure?',
                                        text: "Your Collection will be permanently deleted!!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!',
                                        allowOutsideClick: false
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          axios.post("./DesignSearch/CreateCollection", {
                                            state: 3,
                                            collection_Id: id,
                                            collection_Name: "",
                                            collection_Customer_Id: 0,
                                            collection_Customer_User_id: 0
                                        }).then((e) => {
                                            if (e.data === false || e.data === "false") {
                                                alert('not created')
                                            } else {
                                              Swal.fire(
                                                'Deleted!',
                                                'Your Collection has been deleted.',
                                                'success'
                                              )
                                                //Added By : Vijay Pansande, Added On : 09-12-2022, Purpose : clear board id from session when we delete board
                                                // commented by Manisha below lines
                                                const check = Number(sessionStorage.privselected) && Number(sessionStorage.privselected) === id ? sessionStorage.removeItem('privselected') : ""
                                                getCollectionList(setboard)
                                            }
                                        }
                                        )
                                        }
                                      }).catch(e => console.error(e))
                                    } else {
                                      Swal.fire({
                                        title: 'Are you sure?',
                                        text: " Your Wishlist will be permanently deleted!!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!'
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          axios.post("./DesignSearch/CreateBoard", {
                                            state: 3,
                                            board_id: id,
                                            board_name: "",
                                            board_customer_id: 0,
                                            board_customer_user_id: 0,
                                            board_supplier_id: selectedUser && is_boarduser ? JSON.parse(localStorage.selecteduser).user_id : 0
               
                                        }).then(e => {
                                            if (e.data === false || e.data === "false") {
                                                alert('not created')
                                            } else {
                                              Swal.fire(
                                                'Deleted!',
                                                'Your Wishlist has been deleted.',
                                                'success'
                                              )
                                                //Added By : Vijay Pansande, Added On : 09-12-2022, Purpose : clear board id from session when we delete board
                                                const check = Number(sessionStorage.privselected) && Number(sessionStorage.privselected) === id ? sessionStorage.removeItem('privselected') : ""
                                                if (!is_boarduser) {
                                                    sendrq(setboard)
                                                } else {
                                                  getBoard(JSON.parse(localStorage.userData).org_type_id, setbcMenudata)
                                                    //getBoard(JSON.parse(localStorage.selecteduser).user_id, setbcMenudata)    
                                                    //setbcMenudata(getBoard(JSON.parse(localStorage.selecteduser).user_id))
                                                }

                                            }
                                        })
                                        }
                                      }).catch(e => {
                                        })
                                    }
                                }
                            }
                            }
                        /><span className='align-middle'></span>
                    </div>
                    }

                     </td>
                     <td>
                         <div className='d-flex justify-content-left align-items-center justify-content-center'>
                          <Button type="button" className="btn btn-md mr-50 px-1 view-cartbt" style={{width: '156px'}}
                          onClick={async() => {
                              try {
                                  setIsLoading(true)
                                axios.post(checkForcb(is_boarduser) ? BoardURL : CollectionURL, requestdata).then(async e => {
                                const data = JSON.parse(e.data)
                                    // console.log(data)
                                    const html = await pdfHtml(data.designMaster, data.totalCount, selectedindex, checkForcb(is_boarduser), is_boarduser, board, data.logoUrl, data.customer, data.supplier, name, () => setIsLoading(false))
                                    // console.log(html, 'tfs')
                              })
                             } catch (error) {
                              // console.log(error)
                             }
                  }}
                          >Generate Report</Button>
                          </div>
                     </td>
                     <td>
                     {isLoading && <Loader isShow={isLoading} />}
                           <Link to={show ? {pathname:`./MyCollection/${k}`, state:"col" } : { pathname:`./Boards/${k}`,  state:"board" }} className='view-cartbt ' ><div type="button" className="btn btn-md btn-primary view-cartbt" style={{width: '156px'}}>View {show ? `Collection` : `Wishlist`}</div></Link>
                     </td>
                     <td>
                     {/* <div className="shareLink">
                              <Link2/>
                    </div> */}
                     </td>
                     <td> 
                      {/* <div className="shareCollection" onClick={setis_open}><Share2/></div> */}
                            <ModalAssignCollection is_open={is_open} setis_open={setis_open}/>
                     </td>
                     <td></td>
              </tr>

        </>

            )
}

const BoardTable = (props) => {
  const [is_open, setis_open] = useState(false)
  const opentoggle = () => setis_open(!is_open)
  const [is_createopen, setis_createopen] = useState(false)
  const CreateOpentoggle = () => setis_createopen(!is_createopen)

 const { board, is_boarduser, setboard, selectedUser } = useContext(accessContext)
    const { bcMenudata, setbcMenudata, forceRender, setforceRender } = useContext(bcMenuContext)
    const [activeView, setActiveView] = useState(!BC_Menu.value ? (is_boarduser ? 'grid' : 'list')  : (!is_boarduser ? 'grid' : 'list'))


    const [isMobile, setIsMobile] = useState(false)
    const [list, setList] = useState(null)
    useEffect(async() => {
      if (!BC_Menu.value) {
        await axios.get(`DesignSearch/${is_boarduser ? `GetAllCollectionDetails` : `GetAllBoardDetails`}?id=${0}`).then((e) => {

            setList(JSON.parse(e.data))
        }).catch(e => {
          setList(null)
          console.error(e)
        })
      } else {
        await axios.get(`DesignSearch/${(is_boarduser) ? (BC_Menu.value ? `GetAllBoardDetails` : `GetAllCollectionDetails`) : (BC_Menu.value ? `GetAllCollectionDetails` : `GetAllBoardDetails`)}?id=${selectedUser.user_id}`).then((e) => {
          setList(JSON.parse(e.data))
        }).catch(e => {
          setList(null)
          console.error(e)
        })
      }
      return () => {
        setList(null)
      }
    }, [])

    useEffect(() => {
      // console.log('from board table')
    }, [forceRender])
    const [checkedItems, setCheckedItems] = useState(new Array(board.length || bcMenudata.length).fill(false))
  
  const handleMainCheckboxChange = (e) => {
    const checked = e.target.checked
    setCheckedItems(new Array(board.length || bcMenudata.length).fill(checked))
  }

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems]
    updatedCheckedItems[index] = !updatedCheckedItems[index]
    setCheckedItems(updatedCheckedItems)
  }

const { width, height } = useWindowSize()
    return (
      <>
         <h2 className='headers'>{!BC_Menu.value ? (!is_boarduser ? `My Wishlist`  : `Latest Trending Collections`) : (!is_boarduser ? `Latest Trending Collections` : `My Wishlist`)}</h2>
          <ModalCreateWishlist 
          is_open={is_open}
          setis_open={setis_open}
          is_createopen={is_createopen}
          setis_createopen={setis_createopen}  />       

          <div className = {!BC_Menu.value ? (!is_boarduser ? 'boards_view boardsPage'  : 'boards_view collectionPage') : (!is_boarduser ? 'boards_view collectionPage' : 'boards_view boardsPage')}>
          {/* <div className='btn-sm btn-innerCreate'>{!BC_Menu.value ? (!is_boarduser ? `Create Wishlist`  : `Create Collection`) : (!is_boarduser ? `Create Collection` : `Create Wishlist`)}</div> */}
                 <div className="shareLinkHead mr-1"><Link2/> <span className='ml-50'>Share Link</span></div>
                 {/* <ButtonGroup className='btn-group-toggle'>               
                  <Button
                    tag='label'
                    className={classnames('btn-icon view-btn grid-view-btn border-0', {
                      active: activeView === 'grid'
                    })}
                    color='primary'
                    outline
                    onClick={() => setActiveView('grid')}
                  >
                    <Grid size={16}  />
                  </Button>
                  <Button
                    tag='label'
                    className={classnames('btn-icon view-btn list-view-btn', {
                      active: activeView === 'list'
                    })}
                    color='primary'
                    outline
                    onClick={() => setActiveView('list')}
                  >
                    <List size={16} />
                  </Button>
              </ButtonGroup> */}
        <div>
          <PerfectScrollbar > 
            <Table className='boardtable' id="viewtable"  >
          
                <thead className={classnames({
                        'header-grid-view': activeView === 'grid',
                        'header-list-view': activeView === 'list'
                      })}
                      // style={{width: `${width}px`}}
                      >
                <tr>
                    <th>
                    <div className='custom-control custom-checkbox wishlistCheckHead'>
                      <Input type="checkbox"
                       checked={checkedItems.every(Boolean)} 
                       onChange={handleMainCheckboxChange}
                              className='custom-control-input form-check-input m-0'>
                      </Input>
                      <label for="wishlistCollSelect" className='custom-control-label' />
                      {activeView === 'grid' ? <span className='selectAll'>Select All</span> : ''}
             </div>
                    </th>
                    {!BC_Menu.value ? <th>{is_boarduser ? `Collections` : `Wishlist`} :: {board ? board.length : 0}</th> : <th>{!is_boarduser ? `Collections` : `Wishlist`} :: {bcMenudata ? bcMenudata.length : 0}</th>}
                                <th>{!BC_Menu.value ? (!is_boarduser ? `Wishlist` : `Collection`) : (!is_boarduser ? `Collection` : `Wishlist`)} Name</th>
                    <th>User</th>
                    <th>Last Updated</th>
                    <th>Designs</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
                <tbody className={isMobile ? classnames('grid-view') : classnames({'grid-view': activeView === 'grid', 'list-view' : activeView === 'list' })} >
                            {
                             Array.isArray(board) && !BC_Menu.value && board.map((e, k) => {
                           return <TRow list={chk(list, e.collection_Id ? e.collection_Id : e.favorite_Id, is_boarduser)}
                               chk={is_boarduser && selectedUser}
                               show={is_boarduser} k={k}
                               Name={e.boardName ? e.board_Name : e.collection_Name}
                               id={e.favorite_Id ? e.favorite_Id : e.collection_Id}
                               key={is_boarduser ? `col-${k}` : `board-${k}`}
                               designName={e.designName}
                              setboard={setboard}
                              folderId = {e.folderId ? e.folderId : 0}
                              Lsdate={e.modifiedOn ? new Date(e.modifiedOn) : new Date(e.modifiedOn)}
                               User={e.board_Supplier_Id ? e.board_Supplier_Id : e.collection_Supplier_Id}
                               Count={0} NoComments={0}
                               checked={checkedItems[k]} 
                               onCheckboxChange={() => handleCheckboxChange(k)}  />
                        })
                    }
                    {
                      Array.isArray(bcMenudata) && BC_Menu.value && bcMenudata.map((e, k) => {
                          return <TRow list={chk(list, e.collection_Id ? e.collection_Id : e.favorite_Id, !is_boarduser)}
                              chk={BC_Menu && !(is_boarduser && selectedUser)}
                              show={!is_boarduser} k={k}
                              Name={e.board_Name ? e.board_Name : e.collection_Name}
                              id={e.favorite_Id ? e.favorite_Id : e.collection_Id}
                              key={is_boarduser ? `col-${k}` : `board-${k}`}
                              setboard={setboard}
                              designName={e.designName}
                              folderId = {e.folderId ? e.folderId : 0}
                              Lsdate={e.modifiedOn ? new Date(e.modifiedOn) : new Date(e.modifiedOn)}
                              User={e.board_Supplier_Id ? e.board_Supplier_Id : e.collection_Supplier_Id}
                              Count={0} NoComments={0}
                              setforceRender={setforceRender}
                              setbcMenudata={setbcMenudata}
                              checked={checkedItems[k]} 
                              onCheckboxChange={() => handleCheckboxChange(k)} 
                        />
                    })
                    }
                </tbody>
            </Table>
            </PerfectScrollbar>
          </div>
          </div>
      </>
    )
}

export default BoardTable
