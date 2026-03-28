// ** React Imports
import { Fragment, useState, useRef, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'
// ** Third Party Components
import { File, BookOpen, Grid, Trello } from 'react-feather'
import "./css/seasonspage.css"
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
// ** Styles
import '@styles/react/apps/app-email.scss'
import BookThumbnails from './BookThumnails/BookThumbnails'
import SeasonSwatchCard from './BookView/SeasonSwatchCard'
import Sidebar from './BookThumnails/SeasonDesignView/Sidebar'
import CardLargeView from './CardLargeView/CardLargeView'
import CardBookView from './CardLargeView/CardBookView'
import DesignSearchbar from './BookThumnails/SeasonDesignView/DesignSearchbar'
import DesignHeader from './BookThumnails/SeasonDesignView/DesignHeader'
import DesignView from './CollezioniFullDesignView/DesignView'
import { accessContext } from '../context/accessContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import loder from "../../assets/images/fabicon/loaderTds.gif"
import { FullView, getPluginObject, rmovePluginObject, View3dPlugin, rmview3d }  from "../FullViewPlugin/FullView"
export const NaveRef = {
    mainv: null,
    fullv: null
}
const PluginObject = {
    PluginModel: false
}

//const getPluginObject = () => {
//    return PluginObject.PluginModel
//}

export const setPluginObject = (a = false) => {
    if (a) {
        PluginObject.PluginModel = false
    }
}

//const View3dPlugin = (data) => {
//    PluginObject.PluginModel = $('#mainZoomdiv').view3DModel({
//        data,
//        onView3DModelPluginLoad: () => {

//            console.log('View3DModelPluginLoad loaded')
//        },
//        onAddToCart: (status) => {
//            console.log(status)
//        },
//        onAddToFav: (status) => {
//            console.log(status)
//        },
//        onPreviousBtnClick: () => {
//            try {
//                goTopriv()
//            } catch (error) {

//            }

//        },
//        onNextBtnClick: () => {
//            try {
//                goTonext()

//            } catch (error) {

//            }
//            console.log('Next Button Clicked')
//        },
//        onColorwayImgChange: (cbData) => {
//        }
//    })
//    return PluginObject.PluginModel
//}
//const View3dPlugin = (data, searchFun) => {
//    PluginObject.PluginModel = $('#mainZoomdiv').view3DModel({
//        data,
//        onView3DModelPluginLoad: () => {

//            console.log('View3DModelPluginLoad loaded')
//        },
//        onAddToCart: (status) => {
//            console.log(status)
//        },
//        onAddToFav: (status) => {
//            console.log(status)
//        },
//        onPreviousBtnClick: () => {
//            //console.log('Previous Button Clicked')
//            try {
//                goTopriv()
//            } catch (error) {

//            }

//        },
//        onNextBtnClick: () => {
//            const last = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty').length - 1
//            let csrno = document.querySelectorAll('#AllBottomDesign .BottomDesignThumEmpty.active-Bottom-image-for-fullview')[0]
//            csrno = parseInt(csrno.getAttribute('id').replace('BottomDesignThum', ''))
//            if (csrno === last) {
//                if (nextDesignSearchObj.end <= totalCount) {
//                    nextDesignSearchObj.start += 25
//                    nextDesignSearchObj.end += 25
//                    searchFun(nextDesignSearchObj, csrno)
//                }
//            }
//            try {
//                //data.onNextBtnClick()
//                goTonext()
//                /*data.SetBoard(true)*/
//            } catch (error) {

//            }
//            console.log('Next Button Clicked')
//        },
//        onColorwayImgChange: (cbData) => {
//            // console.log(cbData)
//        }
//    })
//    return PluginObject.PluginModel
//}
const showBoards = ({ id, data }) => {
    const d = data ? data[id] : false
    return {
        show: d && true,
        msg: d
    }
}

const SwitchCollezioni = (props) => {
  
       const history = useHistory()
    //const [poc, setPoc] = useState(false)
    //const setBoardSelected = (data) => { setPoc(e => !e) }
    if (props.showpage === 1) {
        return props && props.cards && props.cards.length > 0 ? <> <BookThumbnails setImgDetails={props.setImgDetails} ThumSize={props.ThumSize} getDesignOnly={true} rowsPerPage={props.rowsPerPage} setSearchobj={props.setSearchobj} /> <SeasonSwatchCard Searchobj={props.Searchobj} setcollview={props.setcollview} poc={props.poc} setPoc={props.setPoc} cards={props.cards} setBookStartPage={props.setBookStartPage} catID={props.catID} defaultview={props.defaultview} /> </> : <><div><h1>Card Not Found</h1></div></>

    } else if (props.showpage === 2) {
        return <BookThumbnails
            AllCataDesign={props.AllCataDesign}
            setBoardSelected={props.setBoardSelected}
            setcollview={props.setcollview}
            poc={props.poc}
            setPoc={props.setPoc}
            rowsPerPage={props.rowsPerPage}
            showFilterView={props.showFilterView}
            fullViewDiv={props.fullViewDiv}
            hideFilterView={props.hideFilterView}
            PluginModel={getPluginObject}
            View3dPlugin={View3dPlugin}
            imgDataForDetail={props.imgDataForDetail}
            setActiveImageData={props.setActiveImageData}
            selectedImgDataForDetail={props.selectedImgDataForDetail}
            setImgDetails={props.setImgDetails}
            ThumSize={props.ThumSize} //// added tanmay 18-04-2024 :- changes the size of the thumbnail 
            setPluginObject={props.setPluginObject}
            sidebarOpen={props.sidebarOpen}
            setSidebarOpen={props.setSidebarOpen}
            showpage={props.collview}
            ishide={props.true}
            boardData={props.val}
            hideSearch={props.hidesearch}
            catID={props.catID}
            setSearchobj={props.setSearchobj}
            Searchobj={props.Searchobj}
        />
    } else if (props.showpage === 3) {
        return props && props.firstpage && props.cards.length > 0 && Object.keys(props.cards).length > 0 ? <CardLargeView setcollview={props.setcollview} poc={props.poc} setPoc={props.setPoc} cards={props.cards} firstpage={props.firstpage} pages={props.pages} lastpage={props.lastpage} hideSearch={props.hidesearch} setBoardSelected={props.setBoardSelected}
            //setcollview={props.setcollview}
            //poc={props.poc}
            //setPoc={props.setPoc}
            rowsPerPage={props.rowsPerPage}
            showFilterView={props.showFilterView}
            fullViewDiv={props.fullViewDiv}
            hideFilterView={props.hideFilterView}
            PluginModel={getPluginObject}
            View3dPlugin={View3dPlugin}
            imgDataForDetail={props.imgDataForDetail}
            setActiveImageData={props.setActiveImageData}
            selectedImgDataForDetail={props.selectedImgDataForDetail}
            setImgDetails={props.setImgDetails}
            setPluginObject={props.setPluginObject}
            sidebarOpen={props.sidebarOpen}
            setSidebarOpen={props.setSidebarOpen}
            showpage={props.collview}
            ishide={props.true}
            boardData={props.val}
            //hideSearch={props.hidesearch}
            catID={props.catID}
        /> : <><div><h1>Card Not Found</h1></div></>

    } else if (props.showpage === 4) {
        return props && props.firstpage && props.cards.length > 0 && Object.keys(props.firstpage).length > 0 ? <CardBookView setcollview={props.setcollview} poc={props.poc} setPoc={props.setPoc} cards={props.cards} firstpage={props.firstpage} pages={props.pages} lastpage={props.lastpage} isNewBook={props.isNewBook} setBookState={props.setBookState} hideSearch={props.hidesearch} bookStartPage={props.bookStartPage} setBoardSelected={props.setBoardSelected}
            //setcollview={props.setcollview}
            //poc={props.poc}
            //setPoc={props.setPoc}
            rowsPerPage={props.rowsPerPage}
            showFilterView={props.showFilterView}
            fullViewDiv={props.fullViewDiv}
            hideFilterView={props.hideFilterView}
            PluginModel={getPluginObject}
            View3dPlugin={View3dPlugin}
            imgDataForDetail={props.imgDataForDetail}
            setActiveImageData={props.setActiveImageData}
            selectedImgDataForDetail={props.selectedImgDataForDetail}
            setImgDetails={props.setImgDetails}
            setPluginObject={props.setPluginObject}
            sidebarOpen={props.sidebarOpen}
            setSidebarOpen={props.setSidebarOpen}
            showpage={props.collview}
            ishide={props.true}
            boardData={props.val}
            //hideSearch={props.hidesearch}
            catID={props.catID}
        /> : <><div><h1>Card Not Found</h1></div></>
    }
}

const SeasonBook = (props) => {
    const [showCategory, setShowCategory] = useState(false)
    const [designCount, setDesignCount] = useState('')
    const [Searchobj, setSearchobj] = useState('')
    const [collview, setcollview] = useState(1)
    const history = useHistory()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [cardbook, setCardbook] = useState("")
    const floatbook = useRef()
    const [poc, setPoc] = useState(false)
    const rowsPerPage = useRef()
    const LogicalOperator = useRef()
    const OrderBy = useRef()
    const ThumSize = useRef()
    const hideMainDiv = useRef(null)
    const fullViewDiv = useRef(null)
    const [ImgColumn, setImgColumn] = useState(null)
    const [imgDataForDetail, setImgDataForDetail] = useState(null)
    const [selectedImgDataForDetail, setSelectedImgDataForDetail] = useState(null)
    const { board } = useContext(accessContext)
    const { boardId } = useParams()
    const [loading, setLoading] = useState(true)
    const [ArticleName, setArticleName] = useState("")
    const [cataloguesname, setCatalogueName] = useState([])
    const [AllCataDesign, setAllCataDesign] = useState(false)
    const val = showBoards({ id: boardId && parseInt(boardId), data: board })

    const setActiveImageData = (data) => {
        setSelectedImgDataForDetail(data)
    }
    const [ImgdataFullView, setImgdataFullView] = useState([])
    const setImgDetails = (data) => {
        setImgDataForDetail(data)
        setImgdataFullView(data)
    }

    const hideFilterView = () => {
        hideMainDiv.current.style.display = 'none'
        //setshowBack(true)
    }

    const showFilterView = () => {
        fullViewDiv.current.style.display = 'block'
    }

    useEffect(() => {
        NaveRef.mainv = hideMainDiv
        NaveRef.fullv = fullViewDiv
        return () => {
            setPluginObject(true)
            //setshowBack(false)
        }
    }, [])
    const [catalogues, setCatalogues] = useState([])
    const [cards, setCards] = useState([])
    const [cardData, setcardData] = useState([])
    const [firstpage, setFirstpage] = useState([])
    const [pages, setPages] = useState([])
    const [lastpage, setLastpage] = useState([])
    const [isNewBook, setBookState] = useState(true)
    const [bookStartPage, setBookStartPage] = useState(0)
    const [seasonName, setseasonName] = useState("")
    const [collectionName, setCollectionName] = useState("")

    const setBoardSelected = (data) => { setPoc(e => !e) }
    const { is_boarduser, selectedUser, access } = useContext(accessContext)
    //Added By : Vijay Pansande, Add On : 20-03-2023, Purpose : Get design for thumb controller in seasonal
    const [selectedCatalogue, setselectedCatalogue] = useState(0)
    //useEffect(() => {
    //    setcollview(4)
    //    //setShowCategory(false)
    //}, [bookStartPage])
    //Added By :Vijay Pansande, Added On : (12/13)-11-2022. Purpose : Get collection catalouge working
    let bID = 0
    if (is_boarduser) {
        //Added By Vijay Pansande, Added On : 27-12-2022, Purpose : Switch user 
        if (selectedUser) {
            bID = JSON.parse(localStorage.selectUserBoard).allFavoriteList.length ? JSON.parse(localStorage.selectUserBoard).allFavoriteList[0].favorite_Id : 0
            //bID = bcMenudata.length ? bcMenudata[bcMenudata.length - 1].favorite_Id : 0
            if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
        } else {
        }
    } else {
        bID = JSON.parse(localStorage.board).length ? JSON.parse(localStorage.board)[JSON.parse(localStorage.board).length - 1].favorite_Id : 0
        if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
    }
    useEffect(() => {
        const colObj = { SeasonId: history.location.state.sId, CollectionName: history.location.state.colName }
        colObj.SupplierId = !is_boarduser && selectedUser ? selectedUser.value : 0
        colObj.customerId = is_boarduser && selectedUser ? selectedUser.value : 0
        axios.post("/DesignSearch/getCatalougeNameByCollectionName", colObj).then(e => {
            setLoading(true)
            //console.log("caltalog", JSON.parse(e.data.result1).collectionNameCatalogueDto)
            // console.log(setCatalogues(JSON.parse(e.data.result1).collectionNameCatalogueDto))
            //setCatalogueName(JSON.parse(e.data.result1).collectionNameCatalogueDto)
            setCardbook(JSON.parse(e.data.result1).collectionNameCatalogueDto[0].defaultView)
            //const catalogueN = JSON.parse(e.data.result1)


            setCards(JSON.parse(e.data.result2).collectionCardImageDto)
            // console.log(setcardData(JSON.parse(e.data.result2).collectionCardImageDto))
            setseasonName(JSON.parse(e.data.result1).collectionNameCatalogueDto[0].seasonName)
            setCollectionName(JSON.parse(e.data.result1).collectionNameCatalogueDto[0].collectionName)
            setCatalogueName(JSON.parse(e.data.result1).collectionNameCatalogueDto[0].catalogueName)

            const tempjson = JSON.parse(e.data.result2).collectionCards
            // console.log(tempjson)
            setBookState(true)
            setLoading(false)
            // const catlougename = tempjson[0].cC_CollectionName
            if (tempjson.length > 0) {
                setFirstpage(tempjson[0])
                setLastpage(tempjson[tempjson.length - 1])
                setPages(tempjson.filter(s => s.cardLayoutDto[0].card[0].cR_CardType === 0))

            }
        }).catch(err => Swal.fire({
            icon: 'error',
            title: 'Card',
            text: "some thing went wrong"
        }))
    }, [props.poc, bID])

    //Added By :Vijay Pansande, Added On : (12/13)-11-2022. Purpose : Get card on change ofcollection  working

    const onChangeCollection = (data) => {
        // console.log(data)
        setselectedCatalogue(data.CollectionId)
        data.boardId = Number(sessionStorage.privselected) ? sessionStorage.privselected : 0
        axios.post("/DesignSearch/getCollectionCards", data).then(e => {

            // console.log("Cards", JSON.parse(e.data))
            setCards(JSON.parse(e.data).collectionCardImageDto)
            setcardData(JSON.parse(e.data).collectionCardImageDto)
            // console.log(setcardData(JSON.parse(e.data).collectionCardImageDto))
            const tempjson = JSON.parse(e.data).collectionCards
            setBookState(false)
            setCardbook(JSON.parse(e.data).collectionCardImageDto[0].defaultView)
            setCollectionName(JSON.parse(e.data).collectionCardImageDto[0].collectionName)
            //const defaultView = JSON.parse(e.data).collectionCardImageDto[0].defaultView
            setcollview(1)
            setCatalogueName(JSON.parse(e.data).collectionCards[0].cd_Catalogue)
            setBookStartPage(0)
            // tanmay change

            setLoading(false) //tanmay change 
            if (tempjson.length > 0) {
                setFirstpage(tempjson[0])
                setLastpage(tempjson[tempjson.length - 1])
                setPages(tempjson.filter(s => s.cardLayoutDto[0].card[0].cR_CardType === 0))

            }
        }).catch(err => Swal.fire({
            icon: 'error',
            title: 'Collections',
            text: "some thing went wrong"
        }))
    }
    //Added By : Vijay Pansande, Added On : (15/17)-11-2022, Purpose : search card by then name
    const [searchType, setSearchType] = useState("cardcode")
    const searchCardByName = (data) => {
        data = searchType === "cardcode" ? data : Number(data)
        if (!data) {
            setCards(cardData)
            return
        } setCards(cardData)
        //const a = cards.filter(p => p.cardcode === data)
        const a = cardData.filter(p => p[searchType] === data)
        setCards(a)
    }
    return (
        <Fragment >
            <div className='collezioni_pages' >
                <div ref={floatbook} id='on_book_filter'>
                    <div ref={hideMainDiv} id='coll_main_page' >
                        <div className='d-flex book_thumb'>

                            <Button color='flat-secondary' size='xs' className={collview === 1 ? 'btn-sm pageactive' : 'btn-sm'}

                                onClick={() => {

                                    setcollview(1)
                                    setShowCategory(false)
                                }} >
                                <Trello size={18} />
                                <span className='ml-25'>Card&nbsp;List</span>
                            </Button>

                            <Button color='flat-secondary' size='xs'

                                className={collview === 3 ? 'btn-sm pageactive' : 'btn-sm'} onClick={() => {
                                    setcollview(3)
                                    setCardbook('CARD')
                                    setShowCategory(false)

                                }}>
                                <File size={18} />
                                <span className='ml-25'>Card</span>
                            </Button>
                            <Button color='flat-secondary' size='xs' className={cardbook === 'BOOK' && collview === 4 ? 'btn-sm pageactive' : 'btn-sm'} onClick={() => {

                                setcollview(4)
                                setCardbook('BOOK')
                                setShowCategory(false)
                            }}>
                                <BookOpen size={18} />
                                <span className='ml-25'>Book</span>
                            </Button>
                            <Button color='flat-secondary' size='xs' className={collview === 2 ? 'btn-sm pageactive' : 'btn-sm'} onClick={() => {

                                setcollview(2)
                                setShowCategory(true)
                            }}>
                                <Grid size={18} />
                                <span className='ml-25'>Designs</span>
                            </Button>
                        </div>
                        <div className='content-detached content-right'>
                            {loading ? <div className="loder"><img src={loder} height={80} width={80} /></div> : ''}
                            <DesignSearchbar
                                LogicalOperator={LogicalOperator}
                                sidebarOpen={sidebarOpen}
                                setSidebarOpen={setSidebarOpen}
                                floatbook={floatbook}
                                showCategory={showCategory}
                                setShowCategory={setShowCategory}
                                setCardCount={cards.length}
                                searchCardByName={searchCardByName}
                                setSearchType={setSearchType}
                                collectionName={collectionName}
                                cataloguesName={cataloguesname}
                                seasonName={seasonName}


                            />

                            <div className='content-right border-0'>
                                <div className='content-body position-relative'>
                                    {loading ? <div className="loder"><img src={loder} height={80} width={80} /></div> : ''}


                                    <DesignHeader
                                        rowsPerPage={rowsPerPage}
                                        OrderBy={OrderBy}
                                        poc={poc} setPoc={setPoc}
                                        LogicalOperator={LogicalOperator}
                                        ThumSize={ThumSize} // added tanmay 18-04-2024 :- changes the size of the thumbnail 
                                        setSidebarOpen={setSidebarOpen}
                                        totalCount={designCount}
                                        showCategory={showCategory}
                                        setShowCategory={setShowCategory}
                                    />
                                    <SwitchCollezioni
                                        AllCataDesign={AllCataDesign}
                                        showCategory={showCategory}
                                        setBoardSelected={setBoardSelected}
                                        ImgColumn={ImgColumn}
                                        sidebarOpen={sidebarOpen}
                                        setSidebarOpen={setSidebarOpen}
                                        showpage={collview}
                                        ThumSize={ThumSize} // added tanmay 18-04-2024 :- changes the size of the thumbnail 
                                        defaultview={cardbook}
                                        setcollview={setcollview}
                                        showFilterView={showFilterView}
                                        fullViewDiv={fullViewDiv}
                                        hideFilterView={hideFilterView}
                                        PluginModel={getPluginObject}
                                        View3dPlugin={View3dPlugin} 
                                        imgDataForDetail={imgDataForDetail}
                                        setActiveImageData={setActiveImageData}
                                        selectedImgDataForDetail={selectedImgDataForDetail}
                                        setImgDetails={setImgDetails}
                                        setPluginObject={setPluginObject}
                                        ishide={true} 
                                        boardData={val}
                                        poc={poc}
                                        setPoc={setPoc}
                                        rowsPerPage={rowsPerPage}
                                        cards={cards}
                                        firstpage={firstpage}
                                        pages={pages}
                                        lastpage={lastpage}
                                        isNewBook={isNewBook}
                                        setBookState={setBookState}
                                        bookStartPage={bookStartPage}
                                        setBookStartPage={setBookStartPage}
                                        catID={selectedCatalogue}
                                        setSearchobj={setSearchobj}
                                        Searchobj={Searchobj}
                                    />
                                </div>
                                {/* {showCategory ? < ArchivePagination
                                    poc={poc}
                                    setPoc={setPoc}
                                    rowsPerPage={rowsPerPage}
                                    DesignCount={designCount}
                                    className='justify-content-center' /> : <></>} */}
                            </div>
                        </div>
                        <Sidebar
                            setAllCataDesign={setAllCataDesign}
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            OrderBy={OrderBy}
                            poc={poc} setPoc={setPoc}
                            rowsPerPage={rowsPerPage}
                            LogicalOperator={LogicalOperator}
                            setSearchobj={setSearchobj}
                            Searchobj={Searchobj}
                            showCategory={showCategory}
                            setShowCategory={setShowCategory}
                            catalogues={catalogues}
                            getCardData={onChangeCollection}
                            articleName={setArticleName}

                        />
                    </div>
                    {/* <Sidebar 
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        OrderBy={OrderBy}
                        poc={poc} setPoc={setPoc}
                        rowsPerPage={rowsPerPage}
                        LogicalOperator={LogicalOperator}
                        setSearchobj={setSearchobj}
                        Searchobj={Searchobj}
                        showCategory={showCategory}
                        setShowCategory={setShowCategory}
                        catalogues={catalogues}
                        getCardData={onChangeCollection}
                        articleName={setArticleName}
                    /> */}
                </div>

                <div ref={fullViewDiv} id='coll-fullview-viewPage' className='scrollbar-hidden' style={{ display: "none" }}>
                    {loading ? <div className="loder"><img src={loder} height={80} width={80} /></div> : ''}
                    {/*Added By : Vijay Pansande, Added On : 13-01-202, Purpose : New fullView*/}
                    {true ? <FullView setImgdataFullView={setImgdataFullView} imgDataForDetail={ImgdataFullView} SearchObj={Searchobj} NaveRef={NaveRef} /> : <DesignView
                        ImgColumn={ImgColumn}
                        toggalDesignView={""}
                        PluginModel={getPluginObject}
                        View3dPlugin={View3dPlugin}
                        imgDataForDetail={imgDataForDetail}
                        setActiveImageData={setActiveImageData}
                        selectedImgDataForDetail={selectedImgDataForDetail}
                        setImgDetails={setImgDetails}
                        setPluginObject={setPluginObject}
                        ishide={true}
                        boardData={val}
                        poc={poc}
                        setPoc={setPoc}
                    />}
                </div>
            </div>

        </Fragment >

    )
}

export default SeasonBook