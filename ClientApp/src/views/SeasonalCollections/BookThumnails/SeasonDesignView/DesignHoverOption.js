/*eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'
import { ShoppingCart, Book, Check, MoreVertical, Plus, Trash } from 'react-feather'
import { Button, Card, Input, Form } from 'reactstrap'
import { ModalSaveWishlist } from "../../../popups/ModalSaveWishlist"
import { ModalCreateWishlist } from "../../../popups/ModalCreateWishlist"
import { CartSuccessToast } from '../../../popups/CartSuccessToast'
import { CollectionSuccessToast } from '../../../popups/CollectionSuccessToast'
import { BoardSuccessToast } from '../../../popups/BoardSuccessToast'
import { DeleteDesigns } from "../../../popups/DeleteDesigns"
import { accessContext } from "../../../context/accessContext"
import { bcMenuContext } from "../../../context/bcMenuContext"
import '../../../design/css/designpage.css'
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"

const QuantityOrder = (props) => {
    const [fabqty, setFabQty] = useState(0)
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
            let isexist = JSON.parse(sessionStorage.designMaster).some(p => p.designId == props.designData.designId)
            setMoveinorder(!isexist)
            isexist ? setFabQty(JSON.parse(sessionStorage.designMaster).find(p => p.designId == props.designData.designId).length) : ""
        }
    })
    const handleSubmitQty = e => {
        e.preventDefault()
        props.designData.length = fabqty
        // console.log(props.designData)
        if (!sessionStorage.designMaster) { sessionStorage.setItem("designMaster", JSON.stringify([props.designData])) }
        else {
            let designMasterForCart = JSON.parse(sessionStorage.designMaster)
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
    const quantityChange = (e) => {
        setFabQty(e.target.value)

    }
    return (
        <>
            {!moveinorder ? <div className="showoverlayQty">{fabqty} mtrs ordered</div> : ''}
            <Form>
                <div className="count_box " id="count_box">
                    {moveinorder ? <div className="d-flex">
                        <Input type='text' value={fabqty} className='input_custom_qty'
                            onChange={quantityChange} >
                        </Input>
                        <div className="valuelabel">mtrs</div>
                    </div> : ''}
                    {/* {props.iconfavstate ? <Button className="btn btn-sm countaply" type="submit" >Add to Cart</Button> : ''} */}
                    {moveinorder ? <Button className="btn btn-sm countaply" onClick={handleSubmitQty} ><ShoppingCart/>Add to Cart</Button> : <Button className="btn btn-sm countaply" onClick={showCart} >View Cart</Button>}

                </div>
            </Form>
        </>
    )
}

const Favhoverbox = (props) => {
    const [is_open, setis_open] = useState(false)
    const opentoggle = () => setis_open(!is_open)

    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)
    const { boardId } = useParams()

    const { access, is_boarduser, selectedUser } = useContext(accessContext)
    if (access["333339"]) {
        if (is_boarduser && !access["333339"]["248889"]) {
            return <></>
        }
    }

    return (
        <>
            <Card className="favhover text-white text-left flex-column px-50" onClick={() => props.name ? setis_open(true) : setis_createopen(true)}>
                <div className="arrow-right">
                    <div className="d-flex justify-content-between mt-50 boardn">
                        <small className="font-weight-bold" style={{ textTransform: "capitalize" }}>
                            -{props.name} </small>
                    </div>
                    {props.iconfavstate ? <small>{`${is_boarduser && !selectedUser ? `Remove from Collection` : `Remove from Board`}`}</small> : <small>{`${is_boarduser && !selectedUser ? `Save to Collection` : `Save to Board`}`}</small>}
                    {/*{props.iconfavstate ? <small>{`${is_boarduser ? `Remove from Collection` : `Remove from Board`}`}</small> : <small>{`${is_boarduser ? `Save to Collection` : `Save to Board`}`}</small>}*/}
                    <div className="triangle"></div>
                    <div ><MoreVertical size={18} /></div>

                    <ModalSaveWishlist seticonActive={props.seticonActive}
                        iconfavstate={props.iconfavstate}
                        favState={props.favState}
                        ptDesign={props.ptDesign}
                        setBoardSelected={props.setBoardSelected}
                        is_open={is_open} setis_open={opentoggle}
                        setis_createopen={setis_createopen} />

                    {/*<ModalCreateWishlist seticonActive={props.seticonActive}*/}
                    {/*    iconfavstate={props.iconfavstate} is_createopen={is_createopen}*/}
                    {/*    setis_createopen={CreateOpentoggle} />*/}
                    <ModalCreateWishlist seticonActive={props.seticonActive}
                        iconfavstate={props.iconfavstate} is_createopen={is_createopen}
                        setis_createopen={CreateOpentoggle} setBoardSelected={props.setBoardSelected} ptDesign={props.ptDesign} />
                </div>
            </Card>
        </>
    )
}

const Coloroverlay = ({ colourWay, colourWayClick,
    isBottom, hideFilterView,
    setActiveImageData,
    ptDesign, PluginModel,
    View3dPlugin, srno
}) => {
    //colourWay = colourWay.push(ptDesign)
    //const {setshowBack} = useContext(NaveBackBtn)
    const NewcolourWay = (designID, _colourWay, _ptDesign) => {
        const arr = _colourWay ? _colourWay : []
        return arr //new_colour
    }
    return (
        <>
            {colourWay && (colourWay.length > 0) &&
                <div className="colorbox">
                    <div className='color-ways'>
                        {
                            /*  [ptDesign].map((e, k) => {
                                
                                 return <div key={`${0}-colour-way-comp${e.designId}`}
                                     onClick = {() => {
                                     e.colorwayDesigns = NewcolourWay(e.designId, colourWay, ptDesign)
                                     colourWayClick({
                                         dSize: e.designSize, 
                                         bgimg : encodeURI(e.imageUrl), 
                                         isBottom, 
                                         hideFilterView, 
                                         PluginModel, 
                                         View3dPlugin, 
                                         setActiveImageData, 
                                         currentDesign: e, 
                                         srno,
                                         colourWay: 0
                                       })
                                     
                                 }}
                                 className="designSwatch"  >
                                     <img className='img-fluid card-img-top' style={{height:`3rem`, width:`3rem`}}
                                     src={e.imageUrl} 
                                 />
                                 </div>
                             }) */
                        }
                        {
                            colourWay ? colourWay.map((e, k) => {
                                return <div key={`${k}-colour-way-comp${e.designId}`}
                                    onClick={() => {
                                        //const makeCurrentDesign = e
                                        e.colorwayDesigns = NewcolourWay(e.designId, colourWay, ptDesign)
                                        colourWayClick({
                                            dSize: e.designSize,
                                            bgimg: encodeURI(e.imageUrl),
                                            isBottom,
                                            hideFilterView,
                                            PluginModel,
                                            View3dPlugin,
                                            setActiveImageData,
                                            currentDesign: e, //makeCurrentDesig
                                            srno,
                                            colourWay: k
                                            //cd:setshowBack
                                        })
                                        //setshowBack(true)
                                    }}
                                    className="designSwatch"  /* style={{backgroundImage: `url(${encodeURI(e.imageUrl)})`}} */ >
                                    <img className='img-fluid card-img-top' style={{ height: `3rem`, width: `3rem` }}
                                        src={e.imageUrl}
                                    />
                                </div>
                            }) : <></>
                        }
                    </div>
                </div>
            }
        </>
    )
}
//268889

const WrapBtn = ({ boardId, iconfavstate, lastoptions, board, len, is_boarduser, BoardSuccess, idtosend, seticonActive, seticonfavActive, ptDesign, access, setBoardSelected }) => {
    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)
    const { selectedUser } = useContext(accessContext)
    if (access["333339"]) {
        if (is_boarduser && !access["333339"]["248889"]) {
            return <></>
        }
    }

    return <><Button
        color='light'
        className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
        onClick={() => {
            //ToDo :  Pls focus on  work 
            if (lastoptions) {
                const SaveDesignToBoardDto = new Object()
                SaveDesignToBoardDto.state = iconfavstate ? 3 : 0
                const designDetailsDto = new Object()
                const boardDetailDto = new Object()
                const collectionDetailDto = new Object()
                // console.log(board[len - 1])

                if (is_boarduser) {
                    if (selectedUser) {
                        boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id
                              boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).cus_orgtypeId : JSON.parse(localStorage.selecteduser).value
                            boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                            boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                        boardDetailDto.Board_id = idtosend
                        boardDetailDto.bd_Dm_Id = ptDesign.designId
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
                    boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id,
                    boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).cus_orgtypeId : JSON.parse(localStorage.selecteduser).value
                    boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id,
                    boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                    //boardDetailDto.Bd_Supplier_Id = board[len - 1].board_Supplier_Id
                    boardDetailDto.Board_id = idtosend
                    boardDetailDto.bd_Dm_Id = ptDesign.designId
                    boardDetailDto.State = iconfavstate ? 3 : 0
                }

                //designDetailsDto.designCode = ptDesign.designCode
                //designDetailsDto.designName = ptDesign.designName
                //designDetailsDto.article = ptDesign.article
                //designDetailsDto.design = ptDesign.design
                //designDetailsDto.folderId = ptDesign.folderId
                //designDetailsDto.designId = ptDesign.designId
                //designDetailsDto.features = ptDesign.features
                //designDetailsDto.created_On = ptDesign.created_On
                //designDetailsDto.state = ptDesign.state
                //designDetailsDto.price = ptDesign.price
                //designDetailsDto.stock = ptDesign.stock
                //designDetailsDto.rating = ptDesign.rating
                //designDetailsDto.design_Desc = ptDesign.design_Desc
                //designDetailsDto.designSize = ptDesign.designSize
                //designDetailsDto.products = ptDesign.products



                //designDetailsDto.cartName = ptDesign.cartName
                //designDetailsDto. = props.ptDesign.designCode
                //boardDetailDto.board_detail_id = 11221;
                SaveDesignToBoardDto.boardDetailDto = boardDetailDto
                SaveDesignToBoardDto.designDetailsDto = null//props.ptDesign;
                SaveDesignToBoardDto.collectionDetailDto = collectionDetailDto
                //const obj = { SaveDesignToBoardDto: {
                //    designDetailsDto: props.ptD,
                //    boardDetailDto: {
                //        state: 0
                //    },
                //    state: 0
                //}
                //}

                axios.post("./DesignSearch/SaveToBoardDetails", SaveDesignToBoardDto).then(e => {
                    // console.log(e)
                    if (e.data) {
                        if (!iconfavstate) {
                            BoardSuccess()
                            setTimeout(() => { setBoardSelected(false) }, 1000);
                        }
                        seticonfavActive(!iconfavstate)
                    } else {
                        //props.ptDesign.boardName = null
                        //props.ptDesign.state = 0
                    }
                }).catch((err) => {
                    alert('noboards')
                    console.error(err)
                })
            }
        }}
    >
        {iconfavstate ? <><Check size={18} /></> : <><Plus size={18} /> <span className='align-middle'>Save</span></>}
    </Button>
        <ModalCreateWishlist seticonActive={seticonActive}
            iconfavstate={iconfavstate} is_createopen={is_createopen}
            setis_createopen={CreateOpentoggle} />
    </>
}
const DesignHoverOption = (props) => {
    const [iconstate, seticonActive] = useState(props.cartName !== "" && true)
    const [Delwish, setDelwish] = useState(false)
    const delwishtoggle = () => setDelwish(!Delwish)
    const { access, is_boarduser, board, selectedUser } = useContext(accessContext)
    const len = board ? board.length : 0
    const { boardId } = useParams()
    const { bcMenudata } = useContext(bcMenuContext)
    const [iconfavstate, seticonfavActive] = useState(false)
    //! Suresh
    let lastoptionsName = ""
    let idtosend = 0
    let lastoptions = 0
    //Added By Vijay Pansande, Added On : 23-03-2023, Purpose : Board Working for seasonal
    //const boardId = Number(sessionStorage.privselected)
    //if (is_boarduser && bcMenudata.length > 0 && selectedUser) {
    //    lastoptionsName = bcMenudata.find(p => p.favorite_Id === Number(sessionStorage.privselected)).board_Name
    //    lastoptions = Number(sessionStorage.privselected)
    //    idtosend = lastoptions
    //} else if (!is_boarduser && board.length > 0) {
    //    lastoptionsName = board.find(p => p.favorite_Id === Number(sessionStorage.privselected)).board_Name
    //    lastoptions = Number(sessionStorage.privselected)
    //    idtosend = lastoptions
    //}
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
        } else {

        }

    } else {
        bID = JSON.parse(localStorage.board).length ? JSON.parse(localStorage.board)[JSON.parse(localStorage.board).length - 1].favorite_Id : 0
        if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
        lastoptions = Number(sessionStorage.privselected) ? sessionStorage.privselected : bID
        idtosend = lastoptions
        lastoptionsName = idtosend ? board.find(p => p.favorite_Id === Number(sessionStorage.privselected)).board_Name : ""
    }


    let favState = props.ptDesign.isBoardExist


    //seticonfavActive(props.isBoardExist)

    useEffect(() => {

        seticonfavActive(favState)

        return () => {
            seticonfavActive(false)
        }
    }, [props.ptDesign.designId, boardId, props.ptDesign.isBoardExist, lastoptionsName])

    const notifySuccess = () => toast.success(<CartSuccessToast />, { hideProgressBar: true, autoClose: 2000 })
    const BoardSuccess = (data) => toast.success(<BoardSuccessToast  {...data} />, { hideProgressBar: true, autoClose: 2000 })
    const CollectionSuccess = () => toast.success(<CollectionSuccessToast />, { hideProgressBar: true, autoClose: 2000 })
    return (
        <>
            {/* {is_boarduser ? <Badge className='bg-success activeboard'> </Badge> : <Badge className='bg-success activecollection'> </Badge>} */}
            <QuantityOrder iconfavstate={iconfavstate} designData={props.ptDesign} setBoardSelected={props.setBoardSelected} />
            <div className="icon-wrap" key={props.ptDesign.designId} >
                 <Favhoverbox name={lastoptionsName} ptDesign={props.ptDesign}
                    setBoardSelected={props.setBoardSelected}
                    iconfavstate={iconfavstate}
                    favState={favState}
                    seticonActive={seticonActive} /> 

                {access["333339"]["248889123"] && <Button
                    color='light'
                    className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                    onClick={() => {
                        //ToDo :  Pls focus on  work 
                        if (lastoptions) {
                            const SaveDesignToBoardDto = new Object()
                            SaveDesignToBoardDto.state = iconfavstate ? 3 : 0
                            const designDetailsDto = new Object()
                            const boardDetailDto = new Object()
                            const collectionDetailDto = new Object()
                            // console.log(board[len - 1])

                            if (is_boarduser) {
                                collectionDetailDto.collection_Id = board[len - 1].collection_Id
                                //collectionDetailDto.collection_Name = board[len - 1].collection_Supplier_Id

                            } else {
                                boardDetailDto.Board_id = board[len - 1].favorite_Id
                                boardDetailDto.board_Supplier_Id = board[len - 1].board_Supplier_Id
                            }

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

                            boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id,
              
                            boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).cus_orgtypeId : JSON.parse(localStorage.selecteduser).value
                            boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id,
                            boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User"  ? JSON.parse(localStorage.selecteduser).user_id : JSON.parse(localStorage.selecteduser).user_id
                            //boardDetailDto.Board_id = idtosend
                            boardDetailDto.Board_id = idtosend
                            boardDetailDto.bd_Dm_Id = props.ptDesign.designId
                        }

                        designDetailsDto.cartName = props.ptDesign.cartName
                        //designDetailsDto. = props.ptDesign.designCode
                        //boardDetailDto.board_detail_id = 11221;
                        SaveDesignToBoardDto.boardDetailDto = boardDetailDto
                        SaveDesignToBoardDto.designDetailsDto = designDetailsDto//props.ptDesign;
                        SaveDesignToBoardDto.collectionDetailDto = collectionDetailDto

                        axios.post("./DesignSearch/SaveToBoardDetails", SaveDesignToBoardDto).then(e => {
                            // console.log(e)
                            if (e.data) {
                                if (!iconfavstate) {
                                    BoardSuccess()
                                }
                                seticonfavActive(!iconfavstate)
                            } else {
                                //props.ptDesign.boardName = null
                                //props.ptDesign.state = 0
                            }
                        }).catch((err) => {
                            console.error(err)
                        })


                    }}
                >
                    {!is_boarduser ? (boardId ? <></> : <Book size={18} />) : (boardId ? <></> : <Plus size={18} />)}

                </Button>}
                {
                    <WrapBtn boardId={boardId} iconfavstate={iconfavstate} lastoptions={lastoptions} board={board}
                        len={len} is_boarduser={is_boarduser} BoardSuccess={BoardSuccess} idtosend={idtosend}
                        seticonfavActive={seticonfavActive} ptDesign={props.ptDesign}
                        access={access} setBoardSelected={props.setBoardSelected}
                    />
                }
                {!is_boarduser && boardId ? <button
                    onClick={() => {
                        if (!iconstate) {
                            delwishtoggle()
                        }
                        seticonActive(!iconstate)
                    }}
                    className={iconstate ? "iconthumb btn-wishlist iconstate active" : "iconthumb btn-wishlist iconstate"}
                >
                    <Trash className='mr-0'
                        size={18} />
                </button> : <></>}
                <DeleteDesigns deletewishmodal={Delwish} deletetoggle={delwishtoggle} />

                {/* { !is_boarduser && boardId ? <Button
                    color='light'
                    onClick={() => {
                        if (!iconstate) {
                            notifySuccess()
                        }
                        seticonActive(!iconstate)    
                    }}
                    className={iconstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                        >
                         <ShoppingCart
                        size={18} />                    
                    </Button> : <></> }  
               { !is_boarduser && boardId ? <Button 
                    color='light'
                    onClick={() => {
                        if (!iconstate) {
                            notifySuccess()
                        }
                        seticonActive(!iconstate)    
                    }}
                    className={iconstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                        >
                         <ShoppingCart
                        size={18} />                    
                    </Button> : <></> } */}


            </div>
            {access["444449"] && access["444449"]["298889"] && <Coloroverlay colourWay={props.colourWay}
                iconfavstate={iconfavstate}
                //seticonActive={seticonActive}
                colourWayClick={props.colourWayClick}
                isBottom={props.isBottom}
                hideFilterView={props.hideFilterView}
                setActiveImageData={props.setActiveImageData}
                ptDesign={props.ptDesign}
                PluginModel={props.PluginModel}
                View3dPlugin={props.View3dPlugin}
                srno={props.srno}
            />}
        </>
    )
}

export default DesignHoverOption