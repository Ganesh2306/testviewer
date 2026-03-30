 import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FormGroup, Input, Modal, Button, ModalHeader, ModalBody } from 'reactstrap'
import { BoardSuccessToast } from '../popups/BoardSuccessToast'
import { sendrq, getCollectionList, getBoard } from "../../utility/_boardutils/utils"
import { accessContext } from '../context/accessContext'
import { bcMenuContext } from '../context/bcMenuContext'

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
export const ModalCreateWishlist = (props) => {

    const [active, setActive] = useState(false)
    const [boardName, setBoardName] = useState("")
    const [showMsg, setShowmsg] = useState(false)
    //Added By Vijay Pansande, Added On : 28-12-2022, Purpose : Switch user
    const { setboard, is_boarduser, selectedUser, setSelectesUser } = useContext(accessContext) 
    const { setbcMenudata } = useContext(bcMenuContext)
    const [is_saveopen, setis_saveopen] = useState(false)
    const saveopentoggle = () => setis_saveopen(!is_saveopen) 
    const BoardSuccess = () => toast.success(<BoardSuccessToast ptDesign={props.ptDesign} />, { hideProgressBar: true, autoClose: 3000 })

    useEffect(() => {
        setBoardName("")
        return () => {
            setBoardName("")
        }
    }, [is_saveopen]) 
    

    //const imageUrl = props.ptDesign ? props.ptDesign.imageUrl : "https://service.dam3d.in//TDS_TEXTRONICS/1833265648/t/113-2t.jpg"
    //designUrl={props.designUrl}
    return (
        <>
            <Modal isOpen={props.is_createopen} toggle={() => props.setis_createopen(true)} className='modal-sm modal-dialog-centered'>
                <ModalHeader toggle={() => props.setis_createopen(false)}> Create New {is_boarduser && !selectedUser ? "Collection" : "Wishlist"}</ModalHeader>
                <ModalBody className="d-flex justify-content-between mb-1">
                { props.ptDesign?.imageUrl ? <div className='designImage' style={{backgroundImage:`url("${props.ptDesign.imageUrl}")`}}></div> : ''}
                   <div className='w-100 ml-1'>
                   <FormGroup >
                        {/* <Label for='wishnameVertical'>{!is_boarduser ? "Board" : "Collection"} Name</Label> */}
                        <Input type='text' value={boardName} name='col_name'
                            onChange={(e) => {
                                setBoardName(e.target.value)
                            }}

                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                  if (boardName !== "") {
                        // props.setis_createopen(false)
                       //Added By Vijay Pansande, Added On : 28-12-2022, Purpose : Switch user 

                            if (is_boarduser && !selectedUser) {
                                  const Obj = new Object()
                                Obj.state = 0
                                Obj.collection_Id = 0
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
  
                          axios.post("/DesignSearch/CreateCollection", Obj).then((e) => {
                            // console.log(e)
                            if (e.data === false || e.data === "false") {
                              alert('Collection already exist')
                              props.setis_createopen(false)
                            } else {
                              //Added By Vijay Pansande, Added On 15-12-2022, Purpose : reset session when create new collection
                                sessionStorage.removeItem('privselected')
                                getCollectionList(setboard).then((e) => props.setBoardSelected(false))
                                // props.setBoardSelected(false)
                                props.setis_createopen(false)
                            }
                          }
                          ).catch(e => console.error(e)) 
                        } else {
                          
                          axios.post("/DesignSearch/CreateBoard", createBoardObj(boardName, localStorage.who, props.ptDesign.designId)).then(e => {
                            if (e.data === 0 || e.data === "0") {
                              { setShowmsg(true) }
                              // alert('Board already exist')
                            } else {
                              //Added By Vijay Pansande, Added On 15-12-2022, Purpose : reset session when create new collection
                                sessionStorage.removeItem('privselected')
                                if (!is_boarduser) {
                                    sendrq(setboard).then((e) =>  props.setBoardSelected(false))
                                } else {
                                  let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
                                if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
                                  //log_supplier_id = JSON.parse(localStorage.selecteduser).cus_orgtypeId
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
                                props.setis_createopen(false)
                                
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
                            id='wishnameVertical' placeholder={is_boarduser && !selectedUser ? "Collection Name" : "Wishlist Name"} />
                             { showMsg ? <small className='errormsg' style={{color:"Red"}}>{is_boarduser && !selectedUser ? "Collection" : "Board"} Name Already Exists</small> : '' } 
                    </FormGroup>

                    <Button color='primary' className='w-100' onClick={() => {
                      //ToDO: Make axios call -> CreateBoard
                      
                      if (boardName !== "") {
                      // props.setis_createopen(false)
                     //Added By Vijay Pansande, Added On : 28-12-2022, Purpose : Switch user 
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

                        axios.post("/DesignSearch/CreateCollection", Obj).then((e) => {
                          // console.log(e)
                          if (e.data === false || e.data === "false") {
                            alert('Collection already exist')
                            props.setis_createopen(false)
                          } else {
                            //Added By Vijay Pansande, Added On 15-12-2022, Purpose : reset session when create new collection
                              sessionStorage.removeItem('privselected')
                              getCollectionList(setboard).then((e) => props.setBoardSelected(false))
                              // props.setBoardSelected(false)
                              props.setis_createopen(false)
                          }
                        }
                        ).catch(e => console.error(e)) 
                      } else {
                    
                        axios.post("/DesignSearch/CreateBoard", createBoardObj(boardName, localStorage.who, props.ptDesign.designId)).then(e => {
                          if (e.data === 0 || e.data === "0") {
                            { setShowmsg(true) }
                            // alert('Board already exist')
                          } else {
                            //Added By Vijay Pansande, Added On 15-12-2022, Purpose : reset session when create new collection
                              sessionStorage.removeItem('privselected')
                              if (!is_boarduser) {
                                  sendrq(setboard).then((e) =>  props.setBoardSelected(false))
                              } else {
                                let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
                                if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
                                 /* log_supplier_id = JSON.parse(localStorage.selecteduser).cus_orgtypeId*/
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
                              props.setis_createopen(false)
                              
                          }
                          //setboard(rs)
                           //BoardSuccess() 
                        }).catch(e => {
                         
                          console.log(e)
                        })
                      }
                    }
                    }}
                      >
                      Create 
                    </Button>  
                   </div>
                  

                </ModalBody>
             
                    {/* <Button color='primary' onClick={() => {
                      //ToDO: Make axios call -> CreateBoard
                      if (boardName !== "") {
                      // props.setis_createopen(false)
                     //Added By Vijay Pansande, Added On : 28-12-2022, Purpose : Switch user 
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

                        axios.post("/DesignSearch/CreateCollection", Obj).then((e) => {
                          console.log(e)
                          if (e.data === false || e.data === "false") {
                            alert('Collection already exist')
                            props.setis_createopen(false)
                          } else {
                            //Added By Vijay Pansande, Added On 15-12-2022, Purpose : reset session when create new collection
                              sessionStorage.removeItem('privselected')
                              getCollectionList(setboard).then((e) => props.setBoardSelected(false))
                              // props.setBoardSelected(false)
                              props.setis_createopen(false)
                          }
                        }
                        ).catch(e => console.error(e)) 
                      } else {
                        axios.post("/DesignSearch/CreateBoard", {
                          state: 0,
                          board_id: 0,
                          board_name: boardName,
                          board_customer_id: 0,
                            board_customer_user_id: 0,
                            bd_Dm_Id: props.ptDesign.designId,
                          //board_created_on: "2022-08-08T03:40:48.939Z",
                          board_supplier_id: selectedUser && is_boarduser ? JSON.parse(localStorage.selecteduser).user_id : 0
                        }).then(e => {
                          if (e.data === 0 || e.data === "0") {
                            { setShowmsg(true) }
                            // alert('Board already exist')
                          } else {
                            //Added By Vijay Pansande, Added On 15-12-2022, Purpose : reset session when create new collection
                              sessionStorage.removeItem('privselected')
                              if (!is_boarduser) {
                                  sendrq(setboard).then((e) =>  props.setBoardSelected(false))
                              } else {
                                  getBoard(JSON.parse(localStorage.selecteduser).user_id, setbcMenudata, props.setBoardSelected)
                              }
                              props.setis_createopen(false)
                              
                          }
                          //setboard(rs)
                           //BoardSuccess() 
                        }).catch(e => {
                         
                          console.log(e)
                        })
                      }
                    }
                    }}
                      >
                      Create 
                    </Button>                   */}
                   
         </Modal>
       </>
    )
}
