import { useState, useRef, useContext, useEffect } from 'react'
import { MoreVertical, Check, Plus } from 'react-feather'
import { Card, Button, Form, Input } from 'reactstrap'
import { ModalCreateWishlist } from "../../popups/ModalCreateWishlist"
import { ModalSaveWishlist } from "../../popups/ModalSaveWishlist"
import { accessContext } from "../../context/accessContext"
import { bcMenuContext } from '../../context/bcMenuContext'
import { useHistory } from "react-router-dom"
import axios from "axios"

const QuantityOrder = (props) => {
    const [fabqty, setFabQty] = useState('')
    const [moveinorder, setMoveinorder] = useState(true)
    const previousValue = useRef(fabqty)
    // console.log('mm dh')
    // console.log(setMoveinorder)
    // console.log(moveinorder)
    const history = useHistory()

    useEffect(() => {
        previousValue.current = fabqty
    }, [fabqty])
    useEffect(() => {
        if (sessionStorage.designMaster) {
            const isexist = JSON.parse(sessionStorage.designMaster).some(p => p.designId === props.designData.designId)
            setMoveinorder(!isexist)
            isexist ? setFabQty(JSON.parse(sessionStorage.designMaster).find(p => p.designId === props.designData.designId).length) : setFabQty('')
        }
    })
    const handleSubmitQty = e => {
        //e.preventDefault()
        e.stopPropagation()
        //e.stopImmediatePropagation()
        props.designData.length = fabqty
        // console.log(props.designData)
        if (!sessionStorage.designMaster) {
            sessionStorage.setItem("designMaster", JSON.stringify([props.designData]))
        } else {
            const designMasterForCart = JSON.parse(sessionStorage.designMaster)
            designMasterForCart.push(props.designData)
            sessionStorage.setItem("designMaster", JSON.stringify(designMasterForCart))
        }

        setMoveinorder(!moveinorder)
        // console.log(setMoveinorder)
    }
    const showCart = e => {

        history.push({ pathname: "/Cart" })
        // alert('showing in cart')

    }
    return (
        <>
        
            {!moveinorder ? <div className="showoverlayQty" style={{ display: 'none' }} >{fabqty} mtrs ordered</div> : ''}
            <Form>
            

                <div className="count_box " id="count_box">
                    {moveinorder ? <div className="d-flex">
                        <Input type='text' value={fabqty} className='input_custom_qty' style={{ display: 'none' }}
                            //onClick={c_quantityChange} 
                            onChange={e => {
                                setFabQty(e.target.value)
                            }}
                          >
                        </Input>
                        <div className="valuelabel" style={{ display: 'none' }}>mtrs</div>
                    </div> : ''}
                    {/* {props.iconfavstate ? <Button className="btn btn-sm countaply" type="submit" >Add to Cart</Button> : ''} */}
                    {moveinorder ? <Button className="btn btn-sm countaply" style={{ display: 'none' }} onClick={handleSubmitQty} >Add to Cart</Button> : <Button className="btn btn-sm countaply" style={{ display: 'none' }} onClick={showCart} >View Cart</Button>}

                </div>
            </Form>
        </>
    )
}

export const Favhoverbox = (props) => {
    const [is_open, setis_open] = useState(false)
    const opentoggle = () => setis_open(!is_open)

    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)

    const { access, is_boarduser, selectedUser } = useContext(accessContext)
    if (access["333339"]) {
        if (is_boarduser && !access["333339"]["248889"]) {
            return <></>
        }
    }
    return (
        <>
            <Card className="favhover text-left flex-column px-50" onClick={(e) => { setis_open(true) }}>
                <div className="arrow-right">
                    <div className="d-flex justify-content-between mt-50 boardn">
                        <small className="font-weight-bold" style={{ textTransform: "capitalize" }} >
                             -{props.name} </small>
                    </div>
                    {props.iconfavstate ? <small>{`${is_boarduser && !selectedUser ? `Remove from Collection` : `Remove from Board`}`}</small> : <small>{`${is_boarduser && !selectedUser ? `Save to Collection` : `Save to Board`}`}</small>}
                    <div className="triangle"></div>
                    <div ><MoreVertical size={18} /></div>

                    <ModalSaveWishlist seticonActive={props.seticonActive}
                        iconfavstate={props.iconfavstate}
                        favState={props.favState}
                        ptDesign={props.ptDesign}
                       
                        setBoardSelected={props.setBoardSelected}
                        is_open={is_open} setis_open={opentoggle}
                        setis_createopen={setis_createopen} />
                    <ModalCreateWishlist seticonActive={props.seticonActive}
                        iconfavstate={props.iconfavstate} is_createopen={is_createopen}
                        
                        setis_createopen={CreateOpentoggle} setBoardSelected={props.setBoardSelected} ptDesign={props.ptDesign} />
                </div>
            </Card>
        </>
    )
}
export const WrapBtn = (props) => {

    const history = useHistory()
    const [is_createopen, setis_createopen] = useState(false)
    const { access, is_boarduser, selectedUser, board } = useContext(accessContext)
    const { bcMenudata } = useContext(bcMenuContext)
    const [iconfavstate, seticonfavActive] = useState(false)
    //Addded By : Vijay Pansande, Added On 02-03-2023, Purpose : Board working in seasonal
    //const { board } = useContext(accessContext)
    let idtosend = 0
    let lastoptions = 0
    const favState = props.isBoardExist
    //const len = board ? board.length : 0
    //const lastoptionsName = len === 0 && board ? "" : board.find(p => p.favorite_Id === Number(sessionStorage.privselected)).board_Name
    let lastoptionsName = ""
    const len = board ? board.length : 0
    
    let bID = 0
    if (is_boarduser) {
        //Added By Vijay Pansande, Added On : 27-12-2022, Purpose : Switch user 
        if (selectedUser) {
            bID = JSON.parse(localStorage.selectUserBoard).allFavoriteList.length ? JSON.parse(localStorage.selectUserBoard).allFavoriteList[0].favorite_Id : 0
            //bID = bcMenudata.length ? bcMenudata[bcMenudata.length - 1].favorite_Id : 0
            if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
            lastoptions = Number(sessionStorage.privselected) ? sessionStorage.privselected : bID
            idtosend = lastoptions
            lastoptionsName = idtosend ? bcMenudata.find(p => p.favorite_Id === Number(sessionStorage.privselected)).board_Name : ""
           // favState = props.isBoardExist
        } else {

        }

    } else {
        bID = JSON.parse(localStorage.board).length ? JSON.parse(localStorage.board)[JSON.parse(localStorage.board).length - 1].favorite_Id : 0
        if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
        lastoptions = Number(sessionStorage.privselected) ? sessionStorage.privselected : bID
        idtosend = lastoptions
        lastoptionsName = idtosend ? board.find(p => p.favorite_Id === Number(sessionStorage.privselected)).board_Name : ""
       // favState = props.isBoardExist
    }
    useEffect(() => {

        seticonfavActive(favState)

        return () => {
            seticonfavActive(false)
        }
    }, [props.isBoardExist])
    const ptDesign = { designId : props.designId,
        imageUrl : props.designUrl }
    return <>
        <QuantityOrder iconfavstate={iconfavstate} designData={props.ptDesign} setBoardSelected={props.setBoardSelected} />
        <Button
            color='light'
            className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
            onClick={(e) => {
                //ToDo :  Pls focus on  work 
                e.stopPropagation()
                if (lastoptionsName) {
                    const SaveDesignToBoardDto = new Object()
                    SaveDesignToBoardDto.state = iconfavstate ? 3 : 0
                    //const designDetailsDto = new Object()
                    const boardDetailDto = new Object()
                    const collectionDetailDto = new Object()
                    if (is_boarduser) {
                        if (selectedUser) {
                            boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id
              
                            boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).cus_orgtypeId : JSON.parse(localStorage.selecteduser).value
                            boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                            boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                            //boardDetailDto.Board_id = idtosend
                            boardDetailDto.Board_id = idtosend
                            boardDetailDto.bd_Dm_Id = props.designId
                            boardDetailDto.State = iconfavstate ? 3 : 0
                        }
                        //else {//Added By : Vijay Pansande, Added On : 06-12-2022, Purpose : Collection ID mapping issue to save design in collection
                        //    //collectionDetailDto.Coll_Supplier_Id = board[len - 1].collection_Supplier_Id
                        //    collectionDetailDto.Coll_Supplier_Id = board.find(p => p.collection_Id == lastoptions).collection_Supplier_Id
                        //    collectionDetailDto.Collection_Id = idtosend
                        //    collectionDetailDto.Coll_Dm_Id = ptDesign.designId
                        //    collectionDetailDto.State = iconfavstate ? 3 : 0
                        //}
                    } else {
                        boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id
              
                            boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).cus_orgtypeId : JSON.parse(localStorage.selecteduser).value
                            boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                            boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                            //boardDetailDto.Board_id = idtosend
                       // boardDetailDto.board_Supplier_Id = board[len - 1].board_Supplier_Id
                        boardDetailDto.Board_id = idtosend
                        boardDetailDto.bd_Dm_Id = props.designId
                        boardDetailDto.State = iconfavstate ? 3 : 0
                    }
                    //designDetailsDto.designId = props.designId
                    SaveDesignToBoardDto.boardDetailDto = boardDetailDto
                    //SaveDesignToBoardDto.designDetailsDto = designDetailsDto
                    SaveDesignToBoardDto.designDetailsDto = null
                    SaveDesignToBoardDto.collectionDetailDto = collectionDetailDto
                    axios.post("/DesignSearch/SaveToBoardDetails", SaveDesignToBoardDto).then(e => {
                        // console.log(e)
                        if (e.data) {
                            if (!iconfavstate) {
                                //BoardSuccess()
                            }
                            seticonfavActive(!iconfavstate)
                        } else {
                            //props.ptDesign.boardName = null
                            //props.ptDesign.state = 0
                        }
                    }).catch((err) => {
                        console.error(err)
                    })
                }
            }
            }
        >
            {iconfavstate ? <><Check size={10} /></> : <><Plus size={10} /> <span className='align-middle'>Save</span></>}

        </Button>
        <Favhoverbox name={lastoptionsName} ptDesign={ptDesign} setBoardSelected={props.setBoardSelected} />
    </>
}