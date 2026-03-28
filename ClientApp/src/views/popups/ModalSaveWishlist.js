import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Plus, Search, X } from 'react-feather'
import { BoardSuccessToast } from '../popups/BoardSuccessToast'
import { accessContext } from '../context/accessContext'
import { bcMenuContext } from '../context/bcMenuContext'
import { FormGroup, Input, Modal, Button, ModalBody, ListGroup, ListGroupItem} from 'reactstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CollectionSuccessToast } from './CollectionSuccessToast'
import { sendrq, getCollectionList, getBoard } from "../../utility/_boardutils/utils"
/*export const ModalSaveWishlist = ({ wishicon }) => {*/

const privselected = {
  data:null,
  element:null
}
//tanmay changes added : 30-04-2024 purpose customer data getting
// export const createBoardObj = (boardName, user, designId) => {
//   const returnObj = {
//     state: 0,
//     board_id: 0,
//     board_name: boardName,
//     board_customer_id: user === "Customer Admin" || user === "Customer User" ? JSON.parse(localStorage.selecteduser).cus_orgtypeId : JSON.parse(localStorage.selecteduser).value,
//     board_customer_user_id: user === "Customer Admin" || user === "Customer User" ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id,
//     bd_Dm_Id: designId,
//     board_supplier_id: user === "Customer Admin" || user === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id,
//     board_created_by: user === "Customer Admin" || user === "Customer User"  ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
//   }
//   return returnObj
// }
export const createBoardObj = (boardName, user, designId) => {
  const returnObj = {
    state: 0,
    board_id: 0,
    board_name: boardName,
    board_customer_id: user === "Customer Admin" || user === "Customer User" ? JSON.parse(localStorage.userData).org_type_id : JSON.parse(localStorage.selecteduser).value,
    board_customer_user_id: user === "Customer Admin" || user === "Customer User" ? JSON.parse(localStorage.userData).userid : JSON.parse(localStorage.selecteduser).user_id,
    bd_Dm_Id: designId,
    board_supplier_id: user === "Customer Admin" || user === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id,
    board_created_by: user === "Customer Admin" || user === "Customer User"  ? JSON.parse(localStorage.userData).userid : JSON.parse(localStorage.selecteduser).user_id
  }
  return returnObj
}
export const ModalSaveWishlist = (props) => {
                              
    // console.log(props.ptDesign.imageUrl)
    const [boardName, setBoardName] = useState("")
    const [showMsg, setShowmsg] = useState(false)
    const [showMsg1, setShowmsg1] = useState(false)
    const [lengthError, setLengthError] = useState(null)
    const [error, setError] = useState(null)
    const BoardSuccess = () => toast.success(<BoardSuccessToast />, { hideProgressBar: true, autoClose: 3000 })
    const CollectionSuccess = () => toast.success(<CollectionSuccessToast />, { hideProgressBar: true, autoClose: 3000 })
    
    const ranges = [
        {
        label: 'Now',
        value: new Date()
        }
        ]
     //Added By Vijay Pansande, Added On : 27-12-2022, Purpose : Switch user
    const { board, is_boarduser, selectedUser, setboard } = useContext(accessContext)
    //Added By Vijay Pansande, Added On : 29-12-2022, Purpose : Switch user 
    const { bcMenudata, setbcMenudata } = useContext(bcMenuContext)
    const [searchtext, setSearchtext] = useState("")
    useEffect(() => {
    setSearchtext("")
    setBoardName("")
    privselected.data = null
    privselected.element = null
    return () => {
      setSearchtext("")
      setBoardName("")
      privselected.data = null
      privselected.element = null
    }
  }, [props.is_open])
  
    //const [is_createopen, setis_createopen] = useState(false)
    //const CreateOpentoggle = () => setis_createopen(!is_createopen)
    // const [is_boarduser, setis_boarduser] =  useState(true)
    const style = {
        border: '1px solid #d8d6de'  
    }
    const handleCreate = () => {
      if (boardName.trim() === '') {
          setShowmsg(true)
      }
  }
    return (
        <div>
            <Modal isOpen={props.is_open} toggle={() => props.setis_open(false)} className='modal-sm modal-dialog-centered modal-create'>
              <button type="button" className='d-block close btn-sm' onClick={() => props.setis_open(false)} style={{position:"absolute", right:'1.5rem', top:'1.5rem', cursor:'pointer', zIndex :'99'}}><X /></button>
              {/* <ModalHeader toggle={() => props.setis_open(false)}>Save to  {is_boarduser && !selectedUser ? "Collection" : "Wishlist"}</ModalHeader>  */}
                <ModalBody className="d-flex justify-content-between mb-1">          
                  { props.ptDesign?.imageUrl ? <div className='designImage m-2' style={{backgroundImage:`url("${props.ptDesign.imageUrl}")`}}></div> : ''}
                  <div className='w-100 m-2 rightCreate'>
                   <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl MuiInputBase-adornedEnd mui-17er0ku-searchInputRoot-searchInputEndAdornment">
                   <h5 className='my-1 mt-1'>Create New  {is_boarduser && !selectedUser ? "Collection" : "Wishlist"}</h5>
                   <FormGroup className='position-relative'>
                    <Input type='text' value={boardName} name='col_name'
                            onChange={(e) => {
                              setShowmsg(false)
                              setShowmsg1(false)
                              const inputValue = e.target.value
                              if (inputValue.length > 32) {
                                setLengthError(<small>You have reached your maximum limit of characters allowed</small>) // Set length error message
                                setError(null) // Clear other error messages
                                return // Prevent further processing
                              } else {
                                setLengthError(null) // Clear length error if within limit
                              }
                              if (/[^a-zA-Z0-9 ]/i.test(inputValue)) {
                                  setError(<small>Do not allow special character</small>)
                              } else {
                                  setError(null)
                                  setBoardName(e.target.value)
                                  // ordercodeonchange(e)
                              }
                          }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                  if (boardName !== "") {
                                       if (is_boarduser && !selectedUser) {
                                const Obj = new Object()
                                Obj.state = 0
                                Obj.collection_Id =  0
                                Obj.collection_Name = boardName
                                Obj.collection_Customer_Id = 0
                                Obj.collection_Customer_User_id = 0
                                Obj.collection_Created_On = new Date()
                                const designDetailsDto = new Object()
                                designDetailsDto.designCode = props.ptDesign.designCode
                                designDetailsDto.designName = props.ptDesign.designName
                                designDetailsDto.article = props.ptDesign.article
                                designDetailsDto.design = props.ptDesign.design
                                designDetailsDto.folderId = props.ptDesign.folderId
                                designDetailsDto.designId = props.ptDesign.designId
                                designDetailsDto.features = props.ptDesign.features
                                designDetailsDto.created_On = props.ptDesign.created_On
                                designDetailsDto.state = props.ptDesign.state
                                designDetailsDto.price = props.ptDesign.price
                                designDetailsDto.stock = props.ptDesign.stock
                                designDetailsDto.rating = props.ptDesign.rating
                                designDetailsDto.design_Desc = props.ptDesign.design_Desc
                                designDetailsDto.designSize = props.ptDesign.designSize
                                designDetailsDto.products = props.ptDesign.products
                                Obj.designDetailsDto = designDetailsDto

                                getCollectionList().then((collectionList) => {
                                  const newCollectionName = Obj.collection_Name
                                  if (collectionList.some((collection) => collection.collection_Name === newCollectionName)) {
                                    setShowmsg(true) 
                                        setShowmsg1(true)
                                    props.setis_open(false)
                                  } else {
                                    axios.post("/DesignSearch/CreateCollection", Obj).then((e) => {
                                      // console.log(e)
                                      if (e.data === false || e.data === "false") {
                                        setShowmsg(true) 
                                        setShowmsg1(true)
                                      } else {
                                        sessionStorage.removeItem('privselected')
                                        getCollectionList(setboard).then((e) => props.setBoardSelected(false))
                                        props.setis_open(false)
                                      }
                                    }).catch(e => console.error(e))
                                  }
                                })
                              } else {
                          //tanmay changes added : 30-04-2024 purpose customer data getting
                          axios.post("/DesignSearch/CreateBoard", createBoardObj(boardName, localStorage.who, props.ptDesign.designId)).then(e => {
                            if (e.data === 0 || e.data === "0") {
                              { setShowmsg(true) 
                                setShowmsg1(true)
                              }
                            } else {
                                sessionStorage.removeItem('privselected')
                                if (!is_boarduser) {
                                    sendrq(setboard).then((e) =>  props.setBoardSelected(false))
                                } else {
                                  let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
                                if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
                                  // log_supplier_id = JSON.parse(localStorage.selecteduser).cus_orgtypeId
                                  // log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                                  // log_supplier_custId = JSON.parse(localStorage.selecteduser).value
                                  log_supplier_id = JSON.parse(localStorage.selecteduser).value
                                  log_supplier_creBoaredID = JSON.parse(localStorage.userData).userid
                                  log_supplier_custId = JSON.parse(localStorage.userData).org_type_id
                                } else {
                                  log_supplier_id = JSON.parse(localStorage.userData).org_type_id
                                  log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                                  log_supplier_custId = JSON.parse(localStorage.selecteduser).value
                                }
                                getBoard(log_supplier_id, setbcMenudata, props.setBoardSelected)
                                  //getBoard(JSON.parse(localStorage.selecteduser).user_id, setbcMenudata, props.setBoardSelected)
                                    //getBoard((localStorage?.selecteduser)?.user_id ? JSON.parse(localStorage.selecteduser).user_id : selectedUser.user_id, setbcMenudata, props.setBoardSelected)
                                }
                                 props.setis_open(false)
                                
                            }
                            //setboard(rs)
                             //BoardSuccess() 
                          }).catch(e => {
                           
                            // console.log(e)
                          })
                        }
                      }
                              }
                          }}
                    id='wishnameVerticalcreate' placeholder={is_boarduser && !selectedUser ? "Collection Name" : "Wishlist Name"} />
                    {lengthError && <div style={{ color: 'red' }}>{lengthError}</div>}
                     {error && <div style={{ color: 'red' }}>{error}</div>}
                     {showMsg && <small className='errormsg' style={{ color: "Red" }}>Please create {is_boarduser && !selectedUser ? "Collection" : "Wishlist"}.</small>}
                    { showMsg1 ? <small className='errormsg' style={{color:"Red"}}>{is_boarduser && !selectedUser ? "" : ""} Name Already Exists</small> : '' }
               
                    <Button className="MuiButtonBase-root createNew btn-sm" color='primary'
                    tabindex="0" type="button" data-automation="filter-bar_search-input-submit" aria-label="Create" 
                    onClick={() => {
                      handleCreate()
                    // props.setis_open(false)                        
                    // props.setis_createopen(true)     
                    if (boardName !== "") {
                    if (is_boarduser && !selectedUser) {
                    const Obj = new Object()
                    Obj.state = 0
                    Obj.collection_Id =  0
                    Obj.collection_Name = boardName
                    Obj.collection_Customer_Id = 0
                    Obj.collection_Customer_User_id = 0
                    Obj.collection_Created_On = new Date()
                    const designDetailsDto = new Object()
                    designDetailsDto.designCode = props.ptDesign.designCode
                    designDetailsDto.designName = props.ptDesign.designName
                    designDetailsDto.article = props.ptDesign.article
                    designDetailsDto.design = props.ptDesign.design
                    designDetailsDto.folderId = props.ptDesign.folderId
                    designDetailsDto.designId = props.ptDesign.designId
                    designDetailsDto.features = props.ptDesign.features
                    designDetailsDto.created_On = props.ptDesign.created_On
                    designDetailsDto.state = props.ptDesign.state
                    designDetailsDto.price = props.ptDesign.price
                    designDetailsDto.stock = props.ptDesign.stock
                    designDetailsDto.rating = props.ptDesign.rating
                    designDetailsDto.design_Desc = props.ptDesign.design_Desc
                    designDetailsDto.designSize = props.ptDesign.designSize
                    designDetailsDto.products = props.ptDesign.products
                    Obj.designDetailsDto = designDetailsDto

                         getCollectionList().then((collectionList) => {
                      const newCollectionName = Obj.collection_Name
                      if (collectionList.some((collection) => collection.collection_Name === newCollectionName)) {
                        setShowmsg(true) 
                        setShowmsg1(true)
                        //props.setis_open(false)
                      } else {
                        axios.post("/DesignSearch/CreateCollection", Obj).then((e) => {
                          // console.log(e)
                          if (e.data === false || e.data === "false") {
                            setShowmsg(true) 
                            setShowmsg1(true)
                          } else {
                            sessionStorage.removeItem('privselected')
                            getCollectionList(setboard).then((e) => props.setBoardSelected(false))
                            props.setis_open(false)
                          }
                        }).catch(e => console.error(e))
                      }
                    })
                  } else {
                      // tanmay changes added : 30-04-2024 purpose customer data getting
                    axios.post("/DesignSearch/CreateBoard", createBoardObj(boardName, localStorage.who, props.ptDesign.designId)).then(e => {
                        if (e.data === 0 || e.data === "0") {
                          { setShowmsg(true) 
                            setShowmsg1(true)
                          }
                          // alert('Board already exist')
                        } else {
                            sessionStorage.removeItem('privselected')
                            if (!is_boarduser) {
                                sendrq(setboard).then((e) =>  props.setBoardSelected(false))
                            } else {
                              let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
                                if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
                                  // log_supplier_id = JSON.parse(localStorage.selecteduser).cus_orgtypeId
                                  // log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                                  // log_supplier_custId = JSON.parse(localStorage.selecteduser).value
                                  log_supplier_id = JSON.parse(localStorage.selecteduser).value
                                  log_supplier_creBoaredID = JSON.parse(localStorage.userData).userid
                                  log_supplier_custId = JSON.parse(localStorage.userData).org_type_id
                                } else {
                                  log_supplier_id = JSON.parse(localStorage.userData).org_type_id
                                  log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
                                  log_supplier_custId = JSON.parse(localStorage.selecteduser).value
                                }
                                getBoard(log_supplier_id, setbcMenudata, props.setBoardSelected)
                              //getBoard(JSON.parse(localStorage.selecteduser).user_id, setbcMenudata, props.setBoardSelected)
                                //getBoard((localStorage?.selecteduser)?.user_id ? JSON.parse(localStorage.selecteduser).user_id : selectedUser.user_id, setbcMenudata, props.setBoardSelected)
                            }
                            props.setis_open(false)
                            
                        }
                      }).catch(e => {
               
                // console.log(e)
              })
            }
          }                      
                    }}
     >
       <Plus/>
                    </Button>                
                    </FormGroup>
                    </div>
                    <h5 className='mb-1'>Select</h5>
                    <FormGroup className='position-relative'>
                   
                    <Input value={searchtext} type='text' name='col_name' id='wishnameVertical' placeholder='search here' className= 'wishnameVertical'
                    onChange = {(e) => {
                    setSearchtext(e.target.value.toString())
                   }}
                /> 
                    <Search className='text-secondary searchlist' size={22} />
                    </FormGroup>
                    <FormGroup className="mb-0 listname" style={{ maxHeight: '200px', minHeight: '200px', overflow: 'auto'}}>
                        <ListGroup flush style={{ Border: '1px solid #d8d6de;' }}>
                            {
                              //Added By Vijay Pansande, Added On : 29-12-2022, Purpose : Switch user
                                ((is_boarduser && !selectedUser) || !is_boarduser) ? (Array.isArray(board) ? board.map((e, k) => {
                                    if (is_boarduser) {
                                        if (searchtext && e.collection_Name.toLowerCase().includes(searchtext.toLowerCase())) {
                                            return <ListGroupItem key={k} onClick={
                                                (a) => {
                                                    if (privselected.element) {
                                                        privselected.element.target.style.backgroundColor = ""
                                                    }
                                                    a.currentTarget.style.backgroundColor = "#efefef"
                                                    privselected.data = e
                                                    privselected.element = a
                                                    //console.log(e)
                                                }
                                            } >{e.collection_Name}</ListGroupItem>
                                        } else if (!searchtext) {
                                            return <ListGroupItem key={k} onClick={
                                                (a) => {
                                                    if (privselected.element) {
                                                        privselected.element.target.style.backgroundColor = ""
                                                    }
                                                    a.currentTarget.style.backgroundColor = "#efefef"
                                                    privselected.data = e
                                                    privselected.element = a
                                                    //console.log(e)
                                                }
                                            }>{e.collection_Name}</ListGroupItem>
                                        }
                                    } else {
                                        if (searchtext && e.board_Name.toLowerCase().includes(searchtext.toLowerCase())) {
                                            return <ListGroupItem key={k} onClick={
                                                (a) => {
                                                    if (privselected.element) {
                                                        privselected.element.target.style.backgroundColor = ""
                                                    }
                                                    a.currentTarget.style.backgroundColor = "#efefef"
                                                    privselected.data = e
                                                    privselected.element = a
                                                    // console.log(e)
                                                }
                                            } >{e.board_Name}</ListGroupItem>
                                        } else if (!searchtext) {
                                            return <ListGroupItem key={k} onClick={
                                                (a) => {
                                                    if (privselected.element) {
                                                        privselected.element.target.style.backgroundColor = ""
                                                    }
                                                    a.currentTarget.style.backgroundColor = "#efefef"
                                                    privselected.data = e
                                                    privselected.element = a
                                                    // console.log(e)
                                                }
                                            }>{e.board_Name}

                                            </ListGroupItem>
                                        }
                                    }
                                }) : null) : bcMenudata && bcMenudata.map((e, k) => {
                                    if (searchtext && e.board_Name.toLowerCase().includes(searchtext.toLowerCase())) {
                                        return <ListGroupItem key={k} onClick={
                                            (a) => {
                                                if (privselected.element) {
                                                    privselected.element.target.style.backgroundColor = ""
                                                }
                                                a.currentTarget.style.backgroundColor = "#efefef"
                                                privselected.data = e
                                                privselected.element = a
                                                // console.log(e)
                                            }
                                        } >{e.board_Name}</ListGroupItem>
                                    } else if (!searchtext) {
                                        return <ListGroupItem key={k} onClick={
                                            (a) => {
                                                if (privselected.element) {
                                                    privselected.element.target.style.backgroundColor = ""
                                                }
                                                a.currentTarget.style.backgroundColor = "#efefef"
                                                privselected.data = e
                                                privselected.element = a
                                                // console.log(e)
                                            }
                                        }>{e.board_Name}

                                        </ListGroupItem>
                                    }
                                })
                            }                       
                        </ListGroup>
                    </FormGroup>
                    <Button color='primary' className="w-100 mt-1" 
                        onClick={() => {
                        if (privselected.data) {
                        const SaveDesignToBoardDto = new Object()
                        SaveDesignToBoardDto.state = props.iconfavstate ? 3 : 0 
                        const designDetailsDto = new Object()
                        const boardDetailDto = new Object()
                        const collectionDetailDto = new Object()
                        designDetailsDto.designCode = props.ptDesign.designCode
                        designDetailsDto.designName = props.ptDesign.designName
                        designDetailsDto.article = props.ptDesign.article
                        designDetailsDto.design = props.ptDesign.design
                        designDetailsDto.folderId = props.ptDesign.folderId
                        designDetailsDto.designId = props.ptDesign.designId
                        designDetailsDto.features = props.ptDesign.features
                        designDetailsDto.created_On = props.ptDesign.created_On
                        designDetailsDto.state = props.ptDesign.state
                        designDetailsDto.price = props.ptDesign.price
                        designDetailsDto.stock = props.ptDesign.stock
                        designDetailsDto.rating = props.ptDesign.rating
                        designDetailsDto.design_Desc = props.ptDesign.design_Desc
                        designDetailsDto.designSize = props.ptDesign.designSize
                        designDetailsDto.products = props.ptDesign.products
                        if (is_boarduser) {
                          
                          //designDetailsDto.collectionName = board.length > 0  ? board[board.length - 1].collection_Name : `tds` 
                        } else {
                          //designDetailsDto.boardName = board.length > 0  ? board[board.length - 1].board_Name : `tds`
                        }
                         
                            if (is_boarduser && !selectedUser) {
                          collectionDetailDto.Coll_Dm_Id = props.ptDesign.designId
                          collectionDetailDto.Coll_Supplier_Id = privselected.data.collection_Supplier_Id
                          collectionDetailDto.collection_Id = privselected.data.collection_Id
                            } else {

                                //boardDetailDto.Bd_Supplier_Id = privselected.data.board_Supplier_Id
                                boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id
                              boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).org_type_id : JSON.parse(localStorage.selecteduser).value
                            boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).userid  : JSON.parse(localStorage.selecteduser).user_id
                            boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.userData).userid  : JSON.parse(localStorage.selecteduser).user_id
                                boardDetailDto.board_Id = privselected.data.favorite_Id
                                boardDetailDto.bd_Dm_Id = props.ptDesign.designId
                        }
                        
                        designDetailsDto.cartName = props.ptDesign.cartName
                        SaveDesignToBoardDto.boardDetailDto = boardDetailDto
                        SaveDesignToBoardDto.designDetailsDto = designDetailsDto//props.ptDesign;
                        SaveDesignToBoardDto.collectionDetailDto = collectionDetailDto
                        
                        if (is_boarduser && !selectedUser) {
                        sessionStorage.setItem("privselected", privselected.data.collection_Id)
                        axios.post("./DesignSearch/SaveTocollectionDetails", SaveDesignToBoardDto).then(e => {
                            // CollectionSuccess()
                            props.setBoardSelected(false)
                             if (e.data === "true") {
                              props.setis_open(false)
                              CollectionSuccess()
                            } else {  
                              Swal.fire({
                                position: "Center",
                                icon: "Warning",
                                title: "Design already exist in collection!!",
                                timer: 1500
                              })                          
                           }
                        })
                            } else {
                            sessionStorage.setItem("privselected", privselected.data.favorite_Id)
                            axios.post("/DesignSearch/SaveToBoardDetails", SaveDesignToBoardDto).then(e => {
                              if (e.data === "true") {
                              props.setis_open(false)
                              props.seticonActive((state) => !state)
                              BoardSuccess()
                            } else {                                
                              Swal.fire({
                                position: "Center",
                                icon: "Warning",
                                title: "Design already exist in wishlist!!",
                                timer: 1500
                              })    
                                }
                             props.setBoardSelected(false)
                        })
                        }
                      } else {
                        Swal.fire({
                          position: "Center",
                          icon: "Warning",
                          title: "Please Select",
                          timer: 1500
                        })    
                      }
                    }}
                      >
                       Save
                 </Button>
                 </div>
           </ModalBody>
     
      {/* <ModalFooter>
                           
                
    </ModalFooter> */}
         </Modal>
       </div>
    )
}
