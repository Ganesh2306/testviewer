// ** React Imports
import React, { Fragment, useEffect, useState, useContext, useRef } from 'react'
import { NavLink, NavItem } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import * as Icon from 'react-feather'
import themeConfig from '@configs/themeConfig'

// ** Product components
import DesignCard from './DesignCard'
import DesignHeader from './DesignHeader'
import ArchivePagination from '../../pagecomponents/ArchivePagination'
import axios from 'axios'
// ** Third Party Components
import classnames from 'classnames'
import { searchTemplate, track } from './Sidebar'
import { accessContext } from '../../context/accessContext'
//bcMenuContext 
import { bcMenuContext } from '../../context/bcMenuContext'
import { BC_Menu } from '../../../utility/_boardutils/utils'
import Loader from '../../Loader/Loader'
import useWindowSize from '../../customHooks/useWindowSize'


export const searchBoard = {
    folderId: "0",
    designName: "",
    isText: false,
    isUserAdmin: false,
    createdBy: "",
    IsBoard: true,
    BoardName: '',
    filterSearchRequestDto: {
        folderId: 0,
        features: {}, //!  ,..,..,
        isAnd: true
    },
    isRating: false,
    isName: true,
    start: 0,
    end: 25,
    DesignTypeIdGroupId: null,
    iswearhouse: false,
    designstate: '',
    //designstate: 'sample', //localStorage.getItem('warehouse') !== null ? localStorage.getItem('warehouse').toLocaleLowerCase() : `stock`,
    designstate: `sample`,
    range: {}, //! +
    Difference: 25,
    isSmart: false
}

let forloader = true
const DesignsPage = props => {
    // console.log(props.croppedImageUrl, props.fileImage, 'url')
    const {
        sidebarOpen,
        setSidebarOpen
    } = props
    const [imgData, setImgdata] = useState([])
    const [designCount, setDesignCount] = useState('')
    const [totalStock, setTotalStock] = useState(0)
    // const [searchObj, setsearchObj] = useState('')
    const [QRurl, setQRurl] = useState('')
    const [selectedPage, setSelectedPage] = useState(0)
    const { boardId } = useParams()

    const selectionDataRef = useRef({})
    window.seeobjme = selectionDataRef

    const selectedElementRef = useRef({})
    window.seeobjmes = selectedElementRef

    const { is_boarduser, board, selectedUser } = useContext(accessContext)
    const { bcMenudata } = useContext(bcMenuContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [isSingleItem, setIsSingleItem] = useState(false) //

    const setforloader = () => { forloader = false }

    let val = board ? board[boardId] : {}
    let val2 = bcMenudata ? bcMenudata[boardId] : {}
    useEffect(async () => {
        setIsLoading(true)
        try {
            searchTemplate.designstate = localStorage.getItem('warehouse')

        } catch (error) {

        }
        
        if (searchTemplate.DesignTypeIdGroupId !== null || boardId) {
            if (!boardId) {
                BC_Menu.value = false
            }

            let bID = 0
            if (is_boarduser) {
                //Added By Vijay Pansande, Added On : 27-12-2022, Purpose : Switch user 
                if (selectedUser) { //tanmay Added 30-04-2024
                    bID = JSON?.parse(localStorage?.selectUserBoard)?.allFavoriteList !== null && JSON.parse(localStorage?.selectUserBoard)?.allFavoriteList !== undefined && JSON.parse(localStorage?.selectUserBoard)?.allFavoriteList?.length ? JSON.parse(localStorage?.selectUserBoard)?.allFavoriteList[0]?.favorite_Id : 0
                    //JSON.parse(localStorage.selectUserBoard).length || JSON.parse(localStorage.selectUserBoard).allFavoriteList.length
                    //bID = bcMenudata.length ? bcMenudata[bcMenudata.length - 1].favorite_Id : 0
                    if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
                    searchTemplate.id = Number(sessionStorage.privselected) ? sessionStorage?.privselected : bID
                    searchTemplate.boardId = searchTemplate?.id
                } else {
                    if (JSON.parse(localStorage.board)?.collections?.length) {
                        bID = JSON.parse(localStorage.board).collections.length ? JSON.parse(localStorage.board).collections[JSON.parse(localStorage.board).collections.length - 1].collection_Id : 0
                    } else {
                        bID = JSON.parse(localStorage.board).length ? JSON.parse(localStorage.board)[0].collection_Id : 0
                    }
                    if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
                    searchTemplate.id = Number(sessionStorage.privselected) ? sessionStorage.privselected : bID
                    searchTemplate.collectionId = searchTemplate.id
                }

            } else {
                //bID = JSON.parse(localStorage.board).length ? JSON.parse(localStorage.board)[JSON.parse(localStorage.board).length - 1].favorite_Id : 0 //commented by rinku
                if (JSON.parse(localStorage.board)?.allFavoriteList?.length) {
                    bID = JSON.parse(localStorage.board).allFavoriteList.length ?  JSON.parse(localStorage.board).allFavoriteList[JSON.parse(localStorage.board).allFavoriteList.length - 1].favorite_Id : 0
                } else {
                    bID = JSON.parse(localStorage.board).length ?  JSON.parse(localStorage.board)[0].favorite_Id : 0
                }
                if (!Number(sessionStorage.privselected)) { sessionStorage.setItem("privselected", bID) }
                searchTemplate.id = Number(sessionStorage.privselected) ? sessionStorage.privselected : bID
                searchTemplate.boardId = searchTemplate.id
            }

            val = board ? board[boardId] : {}
            if (!BC_Menu.value) {
                if (boardId && is_boarduser) {
                    if (!track.isChange) {
                        searchTemplate.start = 0
                        searchTemplate.end = 25
                        track.isChange = true
                    }
                    searchTemplate.IsCollection = true
                    searchTemplate.IsBoard = false
                    searchTemplate.id = val.collection_Id
                } else if (boardId && !is_boarduser) {
                    if (!track.isChange) {
                        searchTemplate.start = 0
                        searchTemplate.end = 25
                        track.isChange = true
                    }
                    searchTemplate.id = val.favorite_Id
                    searchTemplate.IsBoard = true
                    searchTemplate.IsCollection = false
                } else {
                    if (track.isChange) {
                        searchTemplate.start = 0
                        searchTemplate.end = 25
                        track.isChange = false
                    }

                    searchTemplate.IsCollection = false
                    searchTemplate.IsBoard = false
                }
                //searchTemplate.designstate = localStorage.getItem('warehouse')
                searchTemplate.designstate = localStorage.getItem('warehouse')
                //searchTemplate.designstate = localStorage.getItem('warehouse') !== null && localStorage.getItem('warehouse') !== undefined && localStorage.getItem('warehouse') !== '' ? localStorage.getItem('warehouse').toLocaleLowerCase() : `sample`
            } else {
                val2 = bcMenudata ? bcMenudata[boardId] : {}
                if (boardId && !is_boarduser) {
                    if (!track.isChange) {
                        searchTemplate.start = 0
                        searchTemplate.end = 25
                        track.isChange = true
                    }
                    searchTemplate.IsCollection = true
                    searchTemplate.IsBoard = false
                    searchTemplate.id = val2.collection_Id
                } else if (boardId && is_boarduser) {
                    if (!track.isChange) {
                        searchTemplate.start = 0
                        searchTemplate.end = 25
                        track.isChange = true
                    }
                    searchTemplate.id = val2.favorite_Id
                    searchTemplate.IsBoard = true
                    searchTemplate.IsCollection = true
                } else {
                    if (track.isChange) {
                        searchTemplate.start = 0
                        searchTemplate.end = 25
                        track.isChange = false
                    }
                    searchTemplate.IsCollection = false
                    searchTemplate.IsBoard = false
                }

            }
            try {
                props.setSearchobj(searchTemplate)
                searchTemplate.Ai_Design = props.aiDesignNameRef.current
               // searchTemplate.Base64Image = props.fileImageRef.current
                //searchTemplate.Base64Image = props.fileImageRef.current
                 searchTemplate.Base64Image = localStorage.hsv1 !== undefined && localStorage.hsv1 !== null && localStorage.hsv2 !== undefined && localStorage.hsv2 !== null ?  '' : props.fileImageRef.current //added for imagesearch 
                 searchTemplate.hsv1 = localStorage.hsv1 !== undefined && localStorage.hsv1 !== null ? localStorage.hsv1 : ''   
                 searchTemplate.hsv2 = localStorage.hsv2 !== undefined && localStorage.hsv2 !== null ? localStorage.hsv2 : ''                   //added for imagesearch  
                searchTemplate.pattern = localStorage.pattern !== undefined && localStorage.pattern !== null ? localStorage.pattern : ''                  //added for imagesearch
                if (props.fileImageRef.current !== null && props.fileImageRef.current !== undefined && props.fileImageRef.current !== '') {
                    searchTemplate.Is_AISearch = true
                } else {
                    searchTemplate.Is_AISearch = false 
                }
                // if (searchTemplate.Base64Image !== null && searchTemplate.Base64Image !== undefined && searchTemplate.Base64Image !== '') {
                //     searchTemplate.start = 0
                //     searchTemplate.end = 25
                //     searchTemplate.Difference = 25
                // }
                // console.log(searchTemplate.CustomerId, 'vaibhavi')
                const newCustomerId = selectedUser.value

                // Update the searchTemplate with the new CustomerId
                searchTemplate.CustomerId = newCustomerId
                if (localStorage.who === 'Supplier User') {
                    searchTemplate.roleidtemp = 0
                } else if (localStorage.who === 'Supplier Admin') {
                    searchTemplate.roleidtemp = 0
                } else {
                    searchTemplate.roleidtemp = newCustomerId
                }


                const config = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json'
                    },
                    // body: history.location.searchObj1 ? history.location.searchObj1 : JSON.stringify(searchTemplate)
                    body : JSON.stringify(searchTemplate)
                }
                const finalAppendFabrics = (pareseData, type = `t`) => {
                    const path  = pareseData.localUrl 
                      
                    return {
                        totalCount:pareseData.totalCount, 
                        designMaster:pareseData.designMaster.map((e) => {
                        return {...e, 
                            imageUrl: `${path}/${e.folderId}/${type}/${e.designName}${type}.jpg`,
                            colorwayDesigns: e.colorwayDesigns !== null && e.colorwayDesigns.map((f) => {
                                return { ...f, imageUrl: `${path}/${e.folderId}/${type}/${f.designName}${type}.jpg`}
                              })
                        }
                        }),
                        localUrl:pareseData.localUrl,
                        imageUrl:pareseData.localUrl
                    }               
                }
                //if(searchObj1)
                const response = await fetch(`/DesignSearch/GetDesignSearchByfolderId`, config)
                if (response.ok) {
                    const res = await response.json()
                    const pareseData = JSON.parse(res)
                    const updatepares = finalAppendFabrics(pareseData)
                    const geturl = await axios('/Login/Q3durl')
                    setQRurl(geturl.data)
                    setImgdata(updatepares.designMaster)
                    setDesignCount(updatepares.totalCount)
                    setIsSingleItem(updatepares.totalCount === 1)
                    const hsv1 = pareseData.hsv1 ? pareseData.hsv1 : ''
                    const hsv2 = pareseData.hsv2 ? pareseData.hsv2 : ''
                    // const w1  = pareseData.w1 ? pareseData.w1 : ''
                    // const w2 = pareseData.w2 ? pareseData.w2 : ''
                    const pattern = pareseData.pattern ? pareseData.pattern : ''
                    // localStorage.setItem('hsv1', hsv1)
                    // localStorage.setItem('hsv2', hsv2)
                    localStorage.setItem('pattern', pattern)
                    // localStorage.setItem('w1', w1)
                    // localStorage.setItem('w2', w2)
                    //setTotalStock(pareseData.totalStock)
                    // //const temp = finalAppendFabrics(pareseData)
                    props.setImgDetails(updatepares)     //props.setImgDetails(pareseData)
                    setIsLoading(false)

                } else {
                    //!
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        } else {
            setImgdata([])
            setDesignCount('')
        }
        return () => {
            setImgdata([])
            setDesignCount('')
            selectedElementRef.current = {}
            selectionDataRef.current = {}
            //props.setImgDetails(null)
            setIsLoading(false)
        }
    }, [props.poc, boardId])

const { width, height } = useWindowSize()

    return (
        <>

            <div className='content-detached content-right'>
                 
                <div className={boardId ? `cb boardswindow` : `cb`} id={boardId ? `boardswindow` : ``}>
                    {boardId ? <div className='header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center navbar navbar-expand-lg' id='fullview_back_page' >
                        <div className='navbar-container d-flex content'>
                            <ul className='nav navbar-nav'>
                                <NavItem key="collection" className='d-block'>
                                    <NavLink id="brand-in-page" onClick={() => {
                                        //history.push('/design')
                                        //Vijay Pansande, Added On : 09-02-2023, Purpose : Back button working on collection board
                                        history.goBack()
                                    }}>
                                        <span>
                                            <Icon.ArrowLeft className='ficon mr-50' size={15} />
                                            {BC_Menu.value ? ((val2) ? val2.collection_Id ? `${val2.collection_Name}` : `${val2.board_Name}` : undefined) : ((val) ? val.collection_Id ? `${val.collection_Name}` : `Board : ${val.board_Name}` : undefined)}

                                        </span>
                                    </NavLink>
                                </NavItem>
                            </ul>
                            <div className='navbar-header d-xl-block d-md-block'>
                                <ul className='nav navbar-nav'>
                                    <NavItem>
                                        <a href='#' className='navbar-brand'>
                                            <span className='brand-logo'>
                                                <img src={themeConfig.app.appLogoImage} alt='logo' />
                                            </span>
                                        </a>
                                    </NavItem>
                                </ul>
                            </div>
                        </div>
                    </div> : ''}

                    <div id=''>
                        <div className='content-body'>
                        
                            <DesignHeader rowsPerPage={props.rowsPerPage}
                                showfloat={props.showfloat}
                                OrderBy={props.OrderBy}
                                setSearchobj={props.setSearchobj}
                                poc={props.poc} setPoc={props.setPoc}
                                LogicalOperator={props.LogicalOperator}
                                selectionDataRef={selectionDataRef}
                                selectedElementRef={selectedElementRef}
                                ThumSize={props.ThumSize}
                                name={BC_Menu.value ? ((val2) ? val2.collection_Id ? `Collection : ${val2.collection_Name}` : `Board : ${val2.board_Name}` : undefined) : ((val) ? val.collection_Id ? `Collection : ${val.collection_Name}` : `Board : ${val.board_Name}` : undefined)}
                                showRightOptions={boardId}
                                Deisgn={props.imgDataForDetail}
                                ImgColumn={props.ImgColumn}
                                setSidebarOpen={setSidebarOpen} totalCount={designCount} selectedDesignRef={props.selectedDesignRef} designRef={props.designRef} check={props.check} setcheck={props.setcheck}
                                setSelectedPage = {props.setSelectedPage}
                                data={imgData}
                                totalstock={totalStock}
                                 isColorChecked= {props.isColorChecked}
                                setIsColorChecked ={props.setIsColorChecked}
                                isPatternChecked={props.isPatternChecked}
                                setIsPatternChecked={props.setIsPatternChecked}
                                />
                            <div
                                className={classnames('body-content-overlay', {
                                    show: sidebarOpen
                                })}
                                onClick={() => setSidebarOpen(false)}
                            >
                            </div>
                            <Fragment>
                            
              
                                <DesignCard
                                    positionFilter= {props.positionFilter}
                                    ImgColumn={props.ImgColumn}
                                    data={imgData}
                                    setBoardSelected={props.setBoardSelected}
                                    hideFilterView={props.hideFilterView}
                                    showFilterView={props.showFilterView}
                                    PluginModel={props.PluginModel}
                                    View3dPlugin={props.View3dPlugin}
                                    Searchobj={props.Searchobj}
                                    setActiveImageData={props.setActiveImageData}
                                    ThumSize={props.ThumSize}
                                    showfloat={props.leftfloat}
                                    poc={props.poc}
                                    fullViewDiv={props.fullViewDiv}
                                    selectedDesignRef={props.selectedDesignRef}
                                    designRef={props.designRef}
                                    selectionDataRef={selectionDataRef}
                                    selectedElementRef={selectedElementRef}
                                    setcheck={props.setcheck}
                                    QRurl={QRurl}
                                    setforloader={setforloader}
                                    searchDesignByPagination={props.searchDesignByPagination}
                                    totalCount={designCount}
                                    isSingleItem={isSingleItem}
                                    windowWidth={width}
                                    windowHeight={height}
                                    backbuttonRef={props.backbuttonRef}
                                    searchClickRef={props.searchClickRef}
                                />
                             
                            </Fragment>
                           
                        </div>
                    </div>
                </div>
                <ArchivePagination poc={props.poc} setPoc={props.setPoc}
                    rowsPerPage={props.rowsPerPage}
                     selectionDataRef={selectionDataRef}
                    DesignCount={designCount}
                    className='justify-content-center'
                    setSelectedPage={props.setSelectedPage}
                    selectedPage={props.selectedPage}
                    />
                     {isLoading && <Loader isShow={isLoading}/>}

            </div>
        </>
    )
}
 export default DesignsPage