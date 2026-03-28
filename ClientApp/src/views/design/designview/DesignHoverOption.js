/*eslint-disable */
// ** React Imports
import Select from 'react-select'
import React, { useState, useContext, useEffect, useRef } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'
import { Heart, Book, X, Plus, Trash, Minus, ChevronDown, CheckCircle, FilePlus } from 'react-feather'
import { Button, Card, Row, Input, Form, Col, Label } from 'reactstrap'
import { ModalSaveWishlist } from "../../popups/ModalSaveWishlist"
import { ModalCreateWishlist } from "../../popups/ModalCreateWishlist"
import { CartSuccessToast } from '../../popups/CartSuccessToast'
import { CollectionSuccessToast } from '../../popups/CollectionSuccessToast'
import { BoardSuccessToast } from '../../popups/BoardSuccessToast'
import { DeleteDesigns } from "../../popups/DeleteDesigns"
import { DeleteSuccessToast } from '../../popups/DeleteSuccessToast'
import { accessContext } from "../../context/accessContext"
import { bcMenuContext } from '../../context/bcMenuContext'
import { BC_Menu } from "../../../utility/_boardutils/utils"
import '../css/designpage.css'
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"

const RequestOptions = [
    { value: 'Reference', label: 'Reference' },
    { value: 'Yardage', label: 'Yardage' },
    { value: 'Sample', label: 'Sample' },
    { value: 'Meter', label: 'Request of Meters' },
    { value: 'Pieces', label: 'Request of Pieces' },
    { value: 'Exclusives', label: 'Request of Modification and Exclusives' }
]

const QuantityOrder = (props) => {
    const [fabqty, setFabQty] = useState(1)
    const [requestType, setRequestType] = useState(null)
    const [moveinorder, setMoveinorder] = useState(true)
    const [selectedValue, setselectedValue] = useState(RequestOptions[0])
    const [comment, setComment] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isAdded, setisAdded] = useState(false)
    const popupRef = useRef(null)
    const previousValue = useRef(fabqty)
    const history = useHistory()

    useEffect(() => {
        previousValue.current = fabqty
    }, [fabqty])

    useEffect(() => {
        if (sessionStorage.designMaster) {
            let isexist = JSON.parse(sessionStorage.designMaster).some(p => p.designId == props.designData.designId)
            if (isexist) {
                const existingData = JSON.parse(sessionStorage.designMaster).find(p => p.designId == props.designData.designId)
                setFabQty(existingData.length)
                setComment(existingData.comment)
                setselectedValue(existingData.requestType)
                setisAdded(true) // Set to true if already added
            }
        }
    }, [])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                props.setCartbox(false)// Close the popup
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [popupRef, props])
    const handleSubmitQty = e => {
        e.preventDefault()
        props.designData.length = fabqty || "1"
        props.designData.myrequest = selectedValue
        props.designData.comment = comment
        props.designData.requestType = selectedValue
        if (!sessionStorage.designMaster) {
            sessionStorage.setItem("designMaster", JSON.stringify([props.designData]))
            localStorage.setItem("designMaster", JSON.stringify([props.designData]))
        }
        else {
            let designMasterForCart = JSON.parse(sessionStorage.designMaster)
            designMasterForCart.push(props.designData)
            sessionStorage.setItem("designMaster", JSON.stringify(designMasterForCart))
        }
        setMoveinorder(!moveinorder)
        // console.log(setMoveinorder)
        props.notifySuccess()
        setisAdded(true)
    }
    const showCart = e => {
        history.push({ pathname: "/Cart" })
    }

    const quantityChange = (e) => {
        const value = e.target.value
        const validInput = /^\d*\.?\d{0,1}$/

        if (validInput.test(value)) {
            setFabQty(value)
            setErrorMessage('')
        } else {
            setErrorMessage(<small>Request quantity must have digits and a single decimal point</small>)
        }
    }
    const onRequestChange = (e) => {
        setselectedValue(e)
    }
    // Parse the designMaster from sessionStorage
    const designMaster = JSON.parse(sessionStorage.getItem('designMaster')) || []
    const isMatch = designMaster.some(item => item.designName === props.title)
    // console.log(isMatch ? 'true' : 'false', 'vaibhavi')
    props.Addreq.current = isMatch
    //console.log(props.Addreq.current = isMatch, 'Addreq')
    return (
        <>
            <div className="cartPopup" ref={popupRef}>
                <button type="button" class="close" onClick={(e) => {
                    props.setCartbox(false)
                    e.currentTarget.closest('.ecommerce-card.cartOpened').classList.remove('cartOpened');
                }


                }><span ><X /></span></button>
                <Form className='p-1'>
                    <Row className="m-0">

                        <Col className='mb-1' md='12' sm='12'>
                            <Label for='EmailVerticalIcons'>Request Type</Label>
                            <Select
                                className='react-select custom_RequestType_imp'
                                classNamePrefix='select'
                                value={selectedValue}
                                options={RequestOptions}
                                isClearable={false}
                                onChange={(e) => onRequestChange(e)}
                                isDisabled={isAdded}
                            />
                        </Col>
                        <Col className='mb-1' md='12' sm='12'>
                            <Label for='IconsMobile'>Request Quantity
                                <span>
                                    {fabqty > props.designData.stock && (
                                        <span style={{ color: 'red', marginLeft: '5px', fontSize: 'x-small' }}>
                                            {localStorage.warehouse === 'stock' ? (<div>{`Out of stock!! Available stock quantity: ${props.designData.stock}`}</div>) : null}
                                        </span>
                                    )}
                                </span>

                            </Label>
                            <Input
                                type='text'
                                className={`rounded-0 ${isAdded ? 'read-only-input' : ''}`}
                                name='text'
                                id='exampleText'
                                placeholder='mtrs'
                                value={fabqty}
                                onChange={quantityChange}
                                readOnly={isAdded}
                                maxLength={11}
                            >
                            </Input>
                            {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}

                        </Col>
                        <Col className='mb-1' md='12' sm='12'>
                            <Label for='IconsMobile'>Comments</Label>
                            <Input
                                type='textarea'
                                className={`rounded-0 ${isAdded ? 'read-only-input' : ''}`}
                                name='text'
                                id='exampleTexta'
                                rows='1'
                                maxlength="200"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Enter the comments'
                                readOnly={isAdded}
                            />
                        </Col>
                    </Row>

                </Form>
                <div className='d-flex'>
                    {isAdded ? (
                        <>
                            <button className="btn btn-sm w-50 btn-primary countaply addedCart rounded-0" onClick={showCart}>
                                <CheckCircle size={20} className='mr-50' />View in
                            </button>
                            <div className="showoverlayQty">{fabqty} mtrs ordered</div>
                        </>
                    ) : (
                        <button className="btn btn-sm w-100 countaply rounded-0 btn-primary border-none" onClick={handleSubmitQty}>
                            <FilePlus size={20} className='mr-1' />Add to Request
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

const Favhoverbox = (props) => {
    const [is_open, setis_open] = useState(false)
    const opentoggle = () => setis_open(!is_open)

    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)
    const { boardId } = useParams()
    const [isHovered, setIsHovered] = useState(false)  //vaibhavi more 
    //Added By Vijay Pansande, Added On : 27-12-2022, Purpose : Switch user 
    const { access, is_boarduser, selectedUser } = useContext(accessContext)
    if (!selectedUser) {
        if (is_boarduser && !access["333339"]["248889"]) {
            return <></>
        }
    }
    const displayName = localStorage.who === 'supplier admin'
        ? props.boards[props.boards.length - 1]?.board_Name
        : props.name
    return (
        <>
            <div className="morevertical right"
                style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : '' }}
                onClick={() => {
                    props.name ? setis_open(true) : setis_createopen(true)
                    setIsHovered(false)
                }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}><ChevronDown size={20} />
                <div className="verticalHover">{is_boarduser && !selectedUser ? <span>Collections</span> : <span>Wishlists</span>}</div>
            </div>

            {!isHovered ? <Card className="favhover text-left flex-column px-50" onClick={() => props.name ? setis_open(true) : setis_createopen(true)}>
                <div className="verticalHover">{is_boarduser ? <span>Collections</span> : <span>Wishlists</span>}</div>
                <div className="arrow-right">
                    {props.bcMenudata ? <div className="d-flex justify-content-between mt-50 boardn">
                        <small className="font-weight-bold" style={{ textTransform: "capitalize" }} >
                            -{props.name}
                        </small>
                    </div> : (props.bcMenudata.length === 0 ? '' : <div className="d-flex justify-content-between mt-50 boardn">
                        <small className="font-weight-bold" style={{ textTransform: "capitalize" }} >
                            -{props.name}
                        </small>
                    </div>)
                    }

                    {props.iconfavstate ? <small>{`${is_boarduser && !selectedUser ? `Remove from Collection` : `Remove from Wishlist`}`}</small> : <small>{`${is_boarduser && !selectedUser ? `Save to Collection` : `Save to Wishlist`}`}</small>}


                    <div className="triangle"></div>
                    <div className="morevertical"><ChevronDown size={20} /></div>

                    <ModalSaveWishlist seticonActive={props.seticonActive}
                        setBoardSelected={props.setBoardSelected}
                        iconfavstate={props.iconfavstate}
                        favState={props.favState}
                        ptDesign={props.ptDesign}
                        is_open={is_open} setis_open={opentoggle}
                        setis_createopen={setis_createopen}
                    />
                    <ModalCreateWishlist seticonActive={props.seticonActive}
                        iconfavstate={props.iconfavstate} is_createopen={is_createopen}
                        setis_createopen={CreateOpentoggle} setBoardSelected={props.setBoardSelected} ptDesign={props.ptDesign} />
                </div>
            </Card> : ''}
        </>
    )
}

const Coloroverlay = ({ colourWay, colourWayClick,
    isBottom, hideFilterView,
    setActiveImageData,
    ptDesign, PluginModel,
    View3dPlugin, srno
}) => {
    const NewcolourWay = (designID, _colourWay, _ptDesign) => {
        const arr = _colourWay ? _colourWay : []
        return arr
    }
    return (
        <>
            {colourWay && (colourWay.length > 0) &&
                <div className="colorbox">
                    <div className='color-ways'>
                        {
                            colourWay ? colourWay.map((e, k) => {
                                return <div key={`${k}-colour-way-comp${e.designId}`}
                                    onClick={() => {
                                        e.colorwayDesigns = NewcolourWay(e.designId, colourWay, ptDesign)
                                        colourWayClick({
                                            dSize: e.designSize,
                                            bgimg: encodeURI(e.imageUrl),
                                            isBottom,
                                            hideFilterView,
                                            PluginModel,
                                            View3dPlugin,
                                            setActiveImageData,
                                            currentDesign: e,
                                            srno,
                                            colourWay: k
                                        })
                                    }}
                                    className="designSwatch" >
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


const WrapBtn = ({ boardId, iconfavstate, lastoptions, board, len, is_boarduser, BoardSuccess, idtosend, seticonActive, seticonfavActive, ptDesign, access, setBoardSelected, setforloader, CollectionSuccess }) => {

    const history = useHistory()
    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)
    const { selectedUser } = useContext(accessContext)
    if (!selectedUser) {
        if (is_boarduser && !access["333339"]["248889"]) {
            return <></>
        }
    }
    //Added By Vijay Pansande, Added On 24-12-2022, Purpose : To show delete icon only when we view collection or board 
    const addOrDelete = () => {
        if (lastoptions) {
            const SaveDesignToBoardDto = new Object()
            SaveDesignToBoardDto.state = iconfavstate ? 3 : 0
            const designDetailsDto = new Object()
            const boardDetailDto = new Object()
            const collectionDetailDto = new Object()
            if (is_boarduser) {
                //Added By : Vijay Pansande, Added On : 06-12-2022, Purpose : Collection ID mapping issue to save design in collection
                collectionDetailDto.collection_Id = lastoptions
            } else {
                boardDetailDto.Board_id = board[len - 1].favorite_Id
                boardDetailDto.board_Supplier_Id = board[len - 1].board_Supplier_Id
            }

            designDetailsDto.designCode = ptDesign.designCode
            designDetailsDto.designName = ptDesign.designName
            designDetailsDto.article = ptDesign.article
            designDetailsDto.design = ptDesign.design
            designDetailsDto.folderId = ptDesign.folderId
            designDetailsDto.designId = ptDesign.designId
            designDetailsDto.features = ptDesign.features
            designDetailsDto.created_On = ptDesign.created_On
            designDetailsDto.state = ptDesign.state
            designDetailsDto.price = ptDesign.price
            designDetailsDto.stock = ptDesign.stock
            designDetailsDto.rating = ptDesign.rating
            designDetailsDto.design_Desc = ptDesign.design_Desc
            designDetailsDto.designSize = ptDesign.designSize
            designDetailsDto.products = ptDesign.products
            if (is_boarduser) {
            } else {
            }
            if (is_boarduser) {
                if (selectedUser) {
                    boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id,
                        boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).org_type_id : JSON.parse(localStorage.selecteduser).value
                    boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).userid : JSON.parse(localStorage.selecteduser).user_id,
                        boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).userid : JSON.parse(localStorage.selecteduser).user_id
                    boardDetailDto.Board_id = idtosend
                    boardDetailDto.bd_Dm_Id = ptDesign.designId
                    boardDetailDto.State = iconfavstate ? 3 : 0
                }
                else {//Added By : Vijay Pansande, Added On : 06-12-2022, Purpose : Collection ID mapping issue to save design in collection
                    collectionDetailDto.Coll_Supplier_Id = board.find(p => p.collection_Id == lastoptions).collection_Supplier_Id
                    collectionDetailDto.Collection_Id = idtosend
                    collectionDetailDto.Coll_Dm_Id = ptDesign.designId
                    collectionDetailDto.State = iconfavstate ? 3 : 0
                }
            } else {
                boardDetailDto.Bd_Supplier_Id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.selecteduser).value : JSON.parse(localStorage.userData).org_type_id,
                    boardDetailDto.Bd_Customer_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).org_type_id : JSON.parse(localStorage.selecteduser).value
                boardDetailDto.Bd_Customer_User_id = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).userid : JSON.parse(localStorage.selecteduser).user_id,
                    boardDetailDto.Bd_Created_By = localStorage.who === "Customer Admin" || localStorage.who === "Customer User" ? JSON.parse(localStorage.userData).userid : JSON.parse(localStorage.selecteduser).user_id
                boardDetailDto.Board_id = idtosend
                boardDetailDto.bd_Dm_Id = ptDesign.designId
                boardDetailDto.State = iconfavstate ? 3 : 0
            }

            designDetailsDto.cartName = ptDesign.cartName
            SaveDesignToBoardDto.boardDetailDto = boardDetailDto
            SaveDesignToBoardDto.designDetailsDto = designDetailsDto
            SaveDesignToBoardDto.collectionDetailDto = collectionDetailDto
            if (is_boarduser && !selectedUser) {
                axios.post("/DesignSearch/SaveTocollectionDetails", SaveDesignToBoardDto).then(e => {
                    // console.log(e)
                    if (e.data) {
                        if (!iconfavstate) {
                            CollectionSuccess()
                        }
                        seticonfavActive(!iconfavstate)
                        setTimeout(() => { setBoardSelected(false) }, 1000);
                    } else {

                    }
                }).catch((err) => {
                    console.error(err)
                })
            } else {
                axios.post("/DesignSearch/SaveToBoardDetails", SaveDesignToBoardDto).then(e => {

                   // console.log(e)
                    if (e.data) {
                        if (!iconfavstate) {

                            BoardSuccess()
                        }
                        seticonfavActive(!iconfavstate) //added by vaibhavi
                        //Added By Vijay Pansande, Added On : 14-12-2022, Purpose : Rerendor design when collection change
                        setTimeout(() => {
                            setBoardSelected(false)
                        }, 1000);
                    } else {

                    }
                }).catch((err) => {
                    console.error(err)
                })
            }
        } else {
            CreateOpentoggle()
            CreateOpentoggle()
        }
    }
    //Added Vijay Pansande, Added On : 24-12-2022, Purpose : Show delete Icon on design in collection or board
    let isShowDelete = ((is_boarduser && (history.location.state == "col" || history.location.state == "board")) || (!is_boarduser && history.location.state == "board"))
    let ischeck = (is_boarduser && selectedUser && history.location.state == "col") || (!is_boarduser && selectedUser && history.location.state == "col") ? true : false
    ischeck ? isShowDelete = false : ""
    return <>{!isShowDelete ? history.location.state && !ischeck ? <></> : <Button
        color='light'
        style={{ display: (JSON.parse(localStorage.userData).organisationId === 757782875) ? 'none' : '' }}
        className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
        onClick={addOrDelete}
    >
        {iconfavstate ? <> <Heart className='addPlus' size={18} /><Minus className='removeMinus' size={18} /></> : <><Plus size={18} /> </>}
    </Button> : <button
        onClick={addOrDelete}
        className="iconthumb btn-wishlist iconstate"
    >
        <Trash className='mr-0'
            size={18} />
    </button>

    }

        <ModalCreateWishlist seticonActive={seticonActive}
            iconfavstate={iconfavstate} is_createopen={is_createopen}
            setis_createopen={CreateOpentoggle} setBoardSelected={setBoardSelected} ptDesign={ptDesign} />
    </>
}
const DesignHoverOption = (props) => {
    //! Add some 
    //Added By Vijay Pansande, Added On : 30-12-2022, Purpose : Switch user 

    const [is_open, setis_open] = useState(false)
    const opentoggle = () => setis_open(!is_open)

    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)

    const { bcMenudata } = useContext(bcMenuContext)
    const [iconstate, seticonActive] = useState(props.cartName !== "" && true)
    const [Delwish, setDelwish] = useState(false)
    const delwishtoggle = () => setDelwish(!Delwish)
    const { access, is_boarduser, board, selectedUser } = useContext(accessContext)
    const len = board ? board.length : 0
    const lent = bcMenudata ? bcMenudata.length : 0
    const { boardId } = useParams()
    let lastoptionsName = board && (len === 0 && board ? "" : board[0].board_Name ? board[0].board_Name : board[0].collection_Name)
    let idtosend = props.bID
    let favState = undefined
    let lastoptions = idtosend
    let showDesignHover = false
    const [iconfavstate, seticonfavActive] = useState(false)
    const history = useHistory()
    if (boardId) {

        if (BC_Menu.value) {
            favState = false
            //Added By Vijay Pansande, Added On : 29-01-2023, Purpose : Switch user 
            if (history.location.state == "col") {
                if (is_boarduser && selectedUser && Number(sessionStorage.privselected)) {
                    lastoptionsName = bcMenudata.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).board_Name
                    idtosend = bcMenudata.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).favorite_Id
                    favState = props.ptDesign.isCollectionBoardExist
                    lastoptions = idtosend
                    showDesignHover = true
                } else if (!is_boarduser && selectedUser && Number(sessionStorage.privselected)) {
                    lastoptionsName = board.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).board_Name
                    idtosend = board.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).favorite_Id
                    favState = props.ptDesign.isCollectionBoardExist
                    lastoptions = idtosend
                    showDesignHover = true
                } else {
                    if (is_boarduser && !selectedUser) {
                        lastoptionsName = len === 0 && board ? "" : board[boardId].board_Name ? board[boardId].board_Name : board[boardId].collection_Name
                        idtosend = len === 0 && board ? 0 : board[boardId].favorite_Id ? board[boardId].favorite_Id : board[boardId].collection_Id
                        lastoptions = idtosend
                        favState = props.ptDesign.isCollectionExist
                    }
                    else {
                        showDesignHover = true
                        lastoptionsName = ""
                        idtosend = 0
                    }
                }
            } else { //Board  //Added By Vijay Pansande, Added On : 29-01-2023, Purpose : Switch user 
                if (is_boarduser) {
                    lastoptionsName = len === 0 && bcMenudata?.length === 0 ? "" : bcMenudata[boardId].board_Name ? bcMenudata[boardId].board_Name : bcMenudata[boardId].collection_Name
                    idtosend = len === 0 && bcMenudata?.length === 0 ? 0 : bcMenudata[boardId].favorite_Id ? bcMenudata[boardId].favorite_Id : bcMenudata[boardId].collection_Id
                    lastoptions = idtosend
                    favState = props.ptDesign.isBoardExist
                } else {
                    lastoptionsName = len === 0 && board ? "" : board[boardId].board_Name ? board[boardId].board_Name : board[boardId].collection_Name
                    idtosend = len === 0 && board ? 0 : board[boardId].favorite_Id ? board[boardId].favorite_Id : board[boardId].collection_Id
                    lastoptions = idtosend
                    favState = props.ptDesign.isBoardExist
                }

            }


        } else {

            favState = false
            //Added By Vijay Pansande, Added On : 29-01-2023, Purpose : Switch user 
            if (history.location.state == "col") {
                if (is_boarduser && selectedUser && Number(sessionStorage.privselected) && bcMenudata.length > 0 && sessionStorage.getItem('privselected').board_Name !== undefined) {
                    lastoptionsName = bcMenudata.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).board_Name
                    idtosend = bcMenudata.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).favorite_Id
                    favState = props.ptDesign.isCollectionBoardExist
                    lastoptions = idtosend
                    showDesignHover = true
                } else if (!is_boarduser && selectedUser && Number(sessionStorage.privselected) && board.length > 0 && sessionStorage.getItem('privselected').board_Name !== undefined) {
                    lastoptionsName = board.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).board_Name
                    idtosend = board.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).favorite_Id
                    favState = props.ptDesign.isCollectionBoardExist
                    lastoptions = idtosend
                    showDesignHover = true
                } else {
                    if (is_boarduser && !selectedUser && board.length > 0) {
                        lastoptionsName = len === 0 && board ? "" : board[boardId].board_Name ? board[boardId].board_Name : board[boardId].collection_Name //board && board.allFavoriteList && board.allFavoriteList[len - 1].board_Name
                        idtosend = len === 0 && board ? 0 : board[boardId].favorite_Id ? board[boardId].favorite_Id : board[boardId].collection_Id//collection_Id
                        lastoptions = idtosend
                        favState = props.ptDesign.isCollectionExist
                    }
                    else {
                        showDesignHover = true
                        lastoptionsName = ""
                        idtosend = 0
                    }
                }
            }
            else { //Board  //Added By Vijay Pansande, Added On : 29-01-2023, Purpose : Switch user 
                lastoptionsName = len === 0 && board ? "" : board[boardId].board_Name ? board[boardId].board_Name : board[boardId].collection_Name
                idtosend = len === 0 && board ? 0 : board[boardId].favorite_Id ? board[boardId].favorite_Id : board[boardId].collection_Id
                lastoptions = idtosend
                favState = props.ptDesign.isBoardExist
            }
        }
    } else {
        //Added By : Vijay Pansande, added On : 04-12-2022, Purpose : Show newly added collection and board 1st on design hover
        lastoptionsName = board && (len === 0 && board ? "" : board[0].board_Name ? board[0].board_Name : board[0].collection_Name)
        idtosend = board && (len === 0 && board ? 0 : board[0].favorite_Id ? board[0].favorite_Id : board[0].collection_Id)
        if ((board.length && Number(sessionStorage.privselected)) || (selectedUser && is_boarduser && Number(sessionStorage.privselected))) {
            if (is_boarduser) {
                //Added By Vijay Pansande, Added On : 27-12-2022, Purpose : Switch user  sessionStorage.getItem('privselected')).board_Name
                if (selectedUser) {
                    lastoptionsName = bcMenudata.find(p => p.favorite_Id == sessionStorage.getItem('privselected'))?.board_Name
                    idtosend = bcMenudata.find(p => p.favorite_Id == sessionStorage.getItem('privselected'))?.favorite_Id
                    favState = props.ptDesign.isBoardExist
                } else {
                    lastoptionsName = board.find(p => p.collection_Id == sessionStorage.getItem('privselected')).collection_Name
                    idtosend = board.find(p => p.collection_Id == sessionStorage.getItem('privselected')).collection_Id
                    favState = props.ptDesign.isCollectionExist
                }

            } else {
                lastoptionsName = board.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).board_Name
                idtosend = board.find(p => p.favorite_Id == sessionStorage.getItem('privselected')).favorite_Id
                favState = props.ptDesign.isBoardExist
            }
        } else {
            lastoptionsName = ""
            idtosend = 0
        }
        lastoptions = idtosend

    }



    useEffect(() => {

        seticonfavActive(favState)

        return () => {
            seticonfavActive(false)
        }
    }, [props.ptDesign.designId, props.ptDesign.isCollectionExist, props.ptDesign.isBoardExist, boardId, props.ptDesign.isCollectionBoardExist])


    const notifySuccess = () => toast.success(<CartSuccessToast />, { hideProgressBar: true, autoClose: 2000 })
    const BoardSuccess = (data) => {

        toast.success(<BoardSuccessToast  {...data} />, { hideProgressBar: true, autoClose: 2000 })
    }
    const DesignDeleteSuccess = (data) => toast.success(<DeleteSuccessToast  {...data} />, { hideProgressBar: true, autoClose: 2000 })
    const CollectionSuccess = () => toast.success(<CollectionSuccessToast />, { hideProgressBar: true, autoClose: 2000 })


    return (
        <>

            {!is_boarduser || (is_boarduser && selectedUser) ? (props.cartbox && <QuantityOrder Addreq={props.Addreq} title={props.title} notifySuccess={notifySuccess} iconfavstate={iconfavstate} setCartbox={props.setCartbox} cartbox={props.cartbox} designData={props.ptDesign} setBoardSelected={props.setBoardSelected} />) : <></>}
            <div className="icon-wrap" key={props.ptDesign.designId} >
                {!boardId || showDesignHover ? <Favhoverbox name={lastoptionsName}
                    ptDesign={props.ptDesign}
                    bcMenudata={bcMenudata}
                    setBoardSelected={props.setBoardSelected}
                    iconfavstate={iconfavstate}
                    favState={favState}
                    seticonActive={seticonActive} boards={board}
                /> : <></>}

                {access["333339"]["248889123"] && <Button

                    className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                    onClick={() => {
                        //ToDo :  Pls focus on  work 
                        if (lastoptions) {
                            const SaveDesignToBoardDto = new Object()
                            SaveDesignToBoardDto.state = iconfavstate ? 3 : 0
                            const designDetailsDto = new Object()
                            const boardDetailDto = new Object()
                            const collectionDetailDto = new Object()
                            if (is_boarduser) {
                                collectionDetailDto.collection_Id = board[len - 1].collection_Id
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
                            boardDetailDto.Board_id = idtosend
                            boardDetailDto.bd_Dm_Id = props.ptDesign.designId
                            boardDetailDto.State = iconfavstate ? 3 : 0
                            designDetailsDto.cartName = props.ptDesign.cartName
                            SaveDesignToBoardDto.boardDetailDto = boardDetailDto
                            SaveDesignToBoardDto.designDetailsDto = designDetailsDto
                            SaveDesignToBoardDto.collectionDetailDto = collectionDetailDto
                            axios.post("/DesignSearch/SaveToBoardDetails", SaveDesignToBoardDto).then(e => {

                                //console.log(e)
                                if (e.data) {
                                    if (!iconfavstate) {
                                        BoardSuccess(JSON.parse(e.data))
                                    }
                                    seticonfavActive(!iconfavstate)
                                } else {

                                }
                            }).catch((err) => {
                                console.error(err)
                            })
                        }
                        else {

                            alert('create board firstt')
                        }
                    }}
                >
                    {!is_boarduser ? (boardId ? <></> : <Book size={18} />) : (boardId ? <></> : <Plus size={18} />)}

                </Button>}
                {
                    <WrapBtn boardId={boardId} iconfavstate={iconfavstate} lastoptions={lastoptions} board={board}
                        len={len} is_boarduser={is_boarduser} BoardSuccess={BoardSuccess} idtosend={idtosend}
                        seticonfavActive={seticonfavActive} ptDesign={props.ptDesign}
                        access={access} CollectionSuccess={CollectionSuccess}
                        setBoardSelected={props.setBoardSelected}
                        setforloader={props.setforloader}
                    />
                }

                {false && !is_boarduser && boardId ? <button

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
            </div>
            {access["444449"] && access["444449"]["298889"] && <Coloroverlay colourWay={props.colourWay}
                iconfavstate={iconfavstate}
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