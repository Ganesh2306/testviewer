// ** React Imports
import React, { Fragment, useEffect, useState, useRef, useContext } from 'react'
import StickyMenu from '../OtherComponents/StickyMenu'
//import ReactDOMServer from 'react-dom/server'
import { Link, useHistory, useParams } from 'react-router-dom'
import "./../css/seasonspage.css"
import "./../css/pageflip.scss"
import '@styles/base/pages/app-ecommerce.scss'
// ** Styles
import '@styles/react/apps/app-email.scss'
import { Check, Plus } from 'react-feather'
import HTMLFlipBook from 'react-pageflip'
import * as Icon from 'react-feather'
import { Button, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap'
import { useBarcode } from '@createnextapp/react-barcode'
//import { withImportantStyle } from 'react-with-important-style'
//import { PanZoom } from 'react-panzoom'
//import { PanZoom } from '@sasza/react-panzoom';
//import { PanZoom } from 'react-easy-panzoom'
import QRCode from 'react-qr-code'
import { Favhoverbox, WrapBtn } from '../OtherComponents/Favhoverbox'
//import hexToRgba from 'hex-to-rgba'
import nossimg from "../../../../src/assets/images/fabicon/noos1234.png"
import yardimg from "../../../../src/assets/images/fabicon/yardage123.png"
import cadimg from "../../../../src/assets/images/fabicon/cad1234.png"
import sampleimg from "../../../../src/assets/images/fabicon/sample123.png"
import stockimg from "../../../../src/assets/images/fabicon/stock123.png"
import loder from "../../../../src/assets/images/fabicon/loaderTds.gif"
import { accessContext } from "../../context/accessContext"
import show3D from "../../../../src/assets/img/3d.svg"
import nextprevBtn from "../../../../src/assets/img/prev.svg"
import openfullScreenIcon from "../../../../src/assets/img/fullview.svg"
import closefullScreenIcon from "../../../../src/assets/img/minimise.svg"
import closefullScreenIconHeader from '../../../../src/assets/img/close_fullview.svg'
import addToCart from "../../../../src/assets/img/cart.svg"
import actualLogo from "../../../../src/assets/img/actual.svg"
import q3dLogo from "../../../../src/assets/img/360.svg"
import { info } from '../../../../src/views/SeasonalCollections/BookThumnails/SeasonDesignView/Sidebar'
import { rmselected, setselected } from "../../../../src/views/SeasonalCollections/BookThumnails/Utility/utility"

document.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'ArrowLeft':
            $(".swiper-button-prev").trigger('click')
            break
        case 'ArrowRight':
            $(".swiper-button-next").trigger('click')
            break
    }
})

const ConverToPx = (unit, data) => {

    let pxVal = 0

    switch (unit) {
        case 'inch':
            pxVal = data * 100
            break
        case 'cm':
            pxVal = data * 100
            break
        default:
            break
    }
    return pxVal
}
const ConverToPxY = (data) => {
    let pxVal = 0
    pxVal = data * 100
    return pxVal
}

const getZoomRatio = (obookW, obookH) => {
    const className = [0]
    const vW = $('.content-body').last().width()
    const vH = $('.content-overlay').last().height()
    const actualbH = ConverToPx('inch', obookH)
    const actualbW = ConverToPx('inch', obookW)
    let ratio = 1
    const hratio = vH / actualbH
    const wratio = vW / actualbW

    ratio = hratio > wratio ? hratio : wratio
    if (actualbW > actualbH) {
        ratio = wratio - 0.05
    } else if (actualbH > vH) {
        ratio = hratio - 0.14
    }

    return ratio
}

const PageCover = React.forwardRef((props, book) => {
    //
    // console.log(cover)
    // let image
    // if (props.bg === null) {
    //     image = props.bg
    //     image = {cover}
    // }
    // console.log(props.bg)
    return (

        <div className="page page-cover" ref={book} data-density="hard" >
            <div className="page-content" style={{ backgroundImage: `url('${props.bg}')` }}>
                <h2>{props.children}</h2>
            </div>
        </div>
    )
})


const Page = React.forwardRef((props, book) => {
    // 
    const [iconfavstate, seticonfavActive] = useState(false)
    const { unit, bg, number, card, shapesdata, zoomScale, isExtra, pgclass, bgcolor, addtoboard } = props
    const isPageQRcode = true
    function decimalToHex(decimal) {
        return decimal.toString(16).toUpperCase()
    }
    let decimal = 0
    let bgcol = ''
    let bgimg = ''
    if (bgcolor === 16777215 && bg !== null) {
        decimal = 16777215
        const hexadecimal = decimalToHex(decimal)
        bgcol = `#${hexadecimal}`
        bgimg = `url('${props.bg}')`
    } if (bgcolor !== null && bg === null) {
        decimal = bgcolor
        const hexadecimal = decimalToHex(decimal)
        bgcol = `#${hexadecimal}`
        bgimg = `url('${''}')`

    } if ((bgcolor === 16777215 && bg === null) || bg === '' || bg === undefined || bgcolor === '') {
        decimal = 16777215
        const hexadecimal = decimalToHex(decimal)
        bgcol = `#${hexadecimal}`
        bgimg = `url('${''}')`
    }
    //const hexadecimal = decimalToHex(decimal)
    // console.log(hexadecimal) // Output: BC614E
    const labelData = '111-222-333' // card ? card.cR_CardCode :  
    let lblClass = 'LBQR'
    if (number % 2 !== 0) {
        lblClass = 'RBQR'
    }


    return (

        <div className="page" ref={book} >
            <div className={pgclass}></div>
            <div className="page-content" style={{ backgroundImage: `${bgimg}`, backgroundColor: `${bgcol}` }}>
                {/* <div className="textFont" style={{ width: 'auto', height: 'auto' }}>{shape.designCode}</div> */}
                {/* <div className="page-content" style={{ backgroundColor : `#${hexadecimal}`}}> */}
                {
                    props.shapesdata.reverse().map((shape, num) => {
                        return <><Shape shape={shape} unit={props.unit} isExtra={isExtra} zoomScale={zoomScale} shapeDetails={shape.cardLayoutDto[0]} pinkingShare={shape.cardLayoutDto[0].card[0].cR_PinkingShear} shapename={shape.cardLayoutDto[0].cL_ShapeName} pg_no={shape.cC_CardSequence} dropShadow={shape.cardLayoutDto[0].card[0].cR_DropShadow
                        } FolderEffect={shape.cardLayoutDto[0].card[0].cR_FolderEffect} shapesequence={shape.cC_ShapeSequence} width={card.cR_Width} height={card.cR_Height} setBoardSelected={props.setBoardSelected}
                            setcollview={props.setcollview}
                            poc={props.poc}
                            setPoc={props.setPoc}
                            rowsPerPage={props.rowsPerPage}
                            showFilterView={props.showFilterView}
                            fullViewDiv={props.fullViewDiv}
                            hideFilterView={props.hideFilterView}
                            PluginModel={props.PluginModel}
                            View3dPlugin={props.View3dPlugin}
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
                            hideSearch={props.hidesearch}
                            catID={props.catID}
                            cust_pageFold_ref={props.cust_pageFold_ref}
                            pageFold={props.pageFold}
                        ></Shape></>


                    })
                }
                {/*  <div className="page-text">{props.children}</div>*/}
                <div className="page-footer">{props.number + 1}</div>
            </div>
            {!isExtra && shapesdata.length > 0 && <div className={lblClass} style={{ padding: '4px' }}></div>}
            {/* {isPageQRcode ? <QRCodeShape value={labelData} /> : <BarCodeShape value={labelData} />} */}
            {((addtoboard === "Design" || addtoboard === "")) ? <div className='page_options' id='pageopt' style={{ display: "none" }}>
                {/* {<QRCodeShape value={'http://172.16.10.91//TDS_RAYMOND//Collezioni_Backgrounds//3378588041//CollectionCard//Test236//1.jpg'} />} */}

                <Favhoverbox />
                {!isExtra && <Button className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                    onClick={() => {
                        seticonfavActive(!iconfavstate)
                    }
                    }

                    color='light'
                >
                    {iconfavstate ? <><Check size={18} /></> : <><Plus size={18} /> <span className='align-middle'>Add to Board</span></>}
                </Button>}
            </div> : ''}
        </div>
    )
})

const BarCodeShape = (props) => {
    // console.log(props.title)
    const { value, title } = props
    const { inputRef } = useBarcode({
        value: value ? value : 'default',
        options: {
            background: '#ffffff00',
            height: 20,
            width: 0.5,
            displayValue: title,
            fontSize: 10
        }
    })

    return <svg ref={inputRef} />
}

const QRCodeShape = (props) => {

    const { value, back, fore, size } = props
    const transbg = '#ffffff00'

    return (<QRCode
        title={value ? value : 'default-title'}
        value={value ? value : 'Scan Page-QR'}
        bgColor={'white'}
        fgColor={fore ? fore : 'black'}
        size={size ? size : 40}
    />)
}
const DesignAt = (value) => {

    let DesignAt = value.toUpperCase()
    if (DesignAt === "CAD") {
        DesignAt = { cadimg }
        DesignAt = DesignAt.cadimg.replace(/^data:image\/(png|jpg);base64  ,/, "")
    } else if (DesignAt === "STOCK") {
        DesignAt = { stockimg }
        DesignAt = DesignAt.stockimg.replace(/^data:image\/(png|jpg);base64,/, "")
    } else if (DesignAt === "NOOS") {
        DesignAt = { nossimg }
        DesignAt = DesignAt.nossimg.replace(/^data:image\/(png|jpg);base64,/, "")
    } else if (DesignAt === "YARDAGES") {
        DesignAt = { yardimg }
        DesignAt = DesignAt.yardimg.replace(/^data:image\/(png|jpg);base64,/, "")
    } else if (DesignAt === "SAMPLE") {
        DesignAt = { sampleimg }
        DesignAt = DesignAt.sampleimg.replace(/^data:image\/(png|jpg);base64,/, "")
    }
    return DesignAt
}
const BlankPage = React.forwardRef((props, book) => {
    //console.log(props.shapesdata[0].cardLayoutDto[0])
    return (
        <div className="page" ref={book} >
            <div className="page-content" >
                <div className="page-footer"></div>
            </div>
        </div>
    )
})
let bookCardData = {}
const selectDesignImageNo = (imageData, bookCardData) => {
    const cardNum = imageData.cC_CardSequence
    const cardDesignNum = imageData.cC_ShapeSequence
    const bookAllData = bookCardData
    let designCount = 0
    if (cardNum === 2) {
        designCount = cardDesignNum - 1
    } else {
        for (let index = 2; index < cardNum; index++) {
            designCount += Object.values(bookAllData[index]).length
        }
        designCount += cardDesignNum - 1
    }
    

    return designCount 
}
const Shape = React.forwardRef((props, book) => {

    const [loading, setLoading] = useState(true)
    const { shapeDetails, shape, unit, zoomScale, pinkingshare, FolderEffect, width, height } = props
    const history = useHistory()
    useEffect(() => {

        setLoading(false)
        const timeoutId = setTimeout(() => {
            function tempShapename(rectno, F) {

                for (let name = 0; name < rectno; name++) {
                    if (F === 'rect' && props.pg_no.toString() === $('.rect:not(.rect[data-zoom-image=""])').eq(name).attr('pg_no')) {
                        $('.rect:not(.rect[data-zoom-image=""])').eq(name).polygonPluggin({ clip: 10, pinkingShare: props.pinkingShare, dropShadow: props.dropShadow, foldedShadow: props.FolderEffect })
                    } else if (F === 'right_triangle' && props.pg_no.toString() === $('.right_triangle:not(.right_triangle[data-zoom-image=""])').eq(name).attr('pg_no')) {
                        $('.right_triangle:not(.right_triangle[data-zoom-image=""])').eq(name).polygonPluggin({ clip: 10, pinkingShare: props.pinkingShare, dropShadow: props.dropShadow, foldedShadow: props.FolderEffect })
                    } else if (F === 'roundrect' && props.pg_no.toString() === $('.roundrect:not(.roundrect[data-zoom-image=""])').eq(name).attr('pg_no')) {
                        $('.roundrect:not(.roundrect[data-zoom-image=""])').eq(name).polygonPluggin({ clip: 10, pinkingShare: props.pinkingShare, dropShadow: props.shapeDetails.card[0].cR_DropShadow, foldedShadow: props.FolderEffect })
                    }
                }
                // setLoading(false)
            }
            const rectno = $('.rect:not(.rect[data-zoom-image=""])').length
            tempShapename(rectno, 'rect')
            const right_triangle = $('.right_triangle:not(.right_triangle[data-zoom-image=""])').length
            tempShapename(right_triangle, 'right_triangle')
            const roundrect = $('.roundrect:not(.roundrect[data-zoom-image=""])').length
            tempShapename(roundrect, 'roundrect')

        }, 30)
        return () => clearTimeout(timeoutId)
    }, book)
    let lblClass = ''
    let bgImage = shapeDetails.cL_ShapeName === 'textbox' || shapeDetails.cL_ShapeName === 'cbarcode' ? '' : shape.uRl
    bgImage = bgImage.replaceAll(" ", "%20")
    ////shape.uRl const bgImage = shapeDetails.cL_ShapeName === 'rect' ? shape.uRl : '' 
    let bgImageZ = shapeDetails.cL_ShapeName === 'textbox' || shapeDetails.cL_ShapeName === 'cbarcode' ? '' : shape.uRl
    bgImageZ = bgImageZ.replace('/t/', '/z/')
    bgImageZ = bgImageZ.replace("t.", "z.")
    const TextData = shapeDetails.cL_PrintDesignName ? JSON.parse(shapeDetails.cL_PrintDesignName) : ''
    let color = TextData ? TextData.fontColor : ''
    let labelData = TextData ? TextData.defTxt : '' // label the text data
    let fontFamily = TextData ? TextData.fontFamily : ''
    let fontSize = TextData ? TextData.fontSize / 1.5 : '' //fix the font size 
    const fontStyle = TextData.fontStyle === "italic" ? "italic" : '' //TextData.fontStyle"" text font style itallic
    const fontWeight = TextData.fontStyle === 'Bold' ? "Bold" : '' //text font weight 
    const [iconfavstate, seticonfavActive] = useState(false)
    const DesignState = shape.designAt // wharehouse state
    let isBarcode = false // flag bar code
    let isdesignCode = false // flag design code
    let barcodeWidth = 0
    let barcodeHeight = 0
    let landscapeflag1 = false

    let advString = ""
    let ArticleN = ""
    let DesignN = ""
    let VarientN = ""
    //let seperator = null
    let bgimgreapet = 0
    let bgposition = 0 //

    const landscapeflag = false // landscape flag
    if (!landscapeflag) { // check the landscape page 
        if ((width > height)) {
            landscapeflag1 = true
        } else {
            landscapeflag1 = false
        }
    }
    // if (shape.designAt !== null) {
    // const barCodePosition = JSON.parse(shapeDetails.barcodePostion)
    // barcodeWidth = barCodePosition.x  // position text allign
    // barcodeHeight = barCodePosition.Y  // position text height allign 
    // }
    if (TextData.BRQRSTAT || TextData.DSNCODESTAT) {  // check the baracode and design state
        const designLabelInfo = JSON.parse(shapeDetails.cL_PrintDesignName)
        const barCodePosition = JSON.parse(shapeDetails.barcodePostion)
        if (TextData.BRQRSTAT && TextData.DSNCODESTAT) {

            const fontDetail = designLabelInfo.FontDetail
            color = fontDetail.Color
            fontFamily = fontDetail.FontFamily
            fontSize = fontDetail.Size
            lblClass = designLabelInfo.Position
            isBarcode = designLabelInfo.IsBarcode
            isdesignCode = designLabelInfo.IsDesignCode
            barcodeWidth = barCodePosition.x
            barcodeHeight = barCodePosition.Y
            if (isBarcode || !isBarcode) { //check barcode flag
                labelData = shape.designCode
                lblClass = `${lblClass}Bar`
            }
        } else if (TextData.BRQRSTAT) {

            isBarcode = designLabelInfo.IsBarcode
            if (isBarcode) {
                barcodeWidth = barCodePosition.x
                barcodeHeight = barCodePosition.Y
                lblClass = designLabelInfo.Position
            } else {
                barcodeWidth = barCodePosition.x
                barcodeHeight = barCodePosition.Y
                lblClass = designLabelInfo.Position
            }
            labelData = shape.designCode
            lblClass = `${lblClass}Bar`

        } else if (TextData.DSNCODESTAT || TextData.Adv.IsArticle || TextData.Adv.IsDesign || TextData.Adv.IsVarient) { //

            isdesignCode = designLabelInfo.IsDesignCode
            lblClass = designLabelInfo.Position
            barcodeWidth = barCodePosition.x
            barcodeHeight = barCodePosition.Y
            const fontDetail = designLabelInfo.FontDetail
            color = fontDetail.Color
            fontFamily = fontDetail.FontFamily
            fontSize = fontDetail.Size
            advString = shape.designCode
            const isArticle = TextData.Adv.IsArticle // check Article flag 
            const isDesign = TextData.Adv.IsDesign // check design flag 
            const isvarient = TextData.Adv.IsVarient // check varient flag 
            const isSeperator = TextData.Adv.Seperator === "" ? " " : TextData.Adv.Seperator // detect the Seperator use 
            if (isdesignCode) {
                //check designcode flag
                labelData = shape.designCode
                lblClass = `${lblClass}Bar`
            } else {
                // ArticleN = shape.article !== undefined ? shape.article === ' ' ? '' : shape.article : ''  //advString.split(`${isSeperator}`)[0] !== undefined ? advString.split(`${isSeperator}`)[0] : ''
                // DesignN = shape.design !== undefined ? shape.design === ' ' ? '' : shape.design : '' //advString.split(`${isSeperator}`)[1] !== undefined ? advString.split(`${isSeperator}`)[1] : ''
                // VarientN = shape.variant !== undefined ? shape.variant === ' ' ? '' : shape.variant : '' // advString.split(`${isSeperator}`)[2] !== undefined ? advString.split(`${isSeperator}`)[2] : ''
                // labelData = aDVCompareCheck(isArticle, isDesign, isvarient, isSeperator, ArticleN, DesignN, VarientN)
                // lblClass = `${lblClass}Bar`

                if (isArticle || isDesign || isvarient) { // check all ADV name 
                    // seperator = 
                    ArticleN = shape.article !== undefined ? shape.article === ' ' ? '' : shape.article : ''  //advString.split(`${isSeperator}`)[0] !== undefined ? advString.split(`${isSeperator}`)[0] : ''
                    DesignN = shape.design !== undefined ? shape.design === ' ' ? '' : shape.design : '' //advString.split(`${isSeperator}`)[1] !== undefined ? advString.split(`${isSeperator}`)[1] : ''
                    VarientN = shape.variant !== undefined ? shape.variant === ' ' ? '' : shape.variant : '' // advString.split(`${isSeperator}`)[2] !== undefined ? advString.split(`${isSeperator}`)[2] : ''

                    if (isArticle && isDesign && isvarient) {
                        if (VarientN === '' || VarientN === ' ') {
                            labelData = `${ArticleN}${isSeperator}${DesignN}`
                        } else if (DesignN === '' || DesignN === ' ') {
                            labelData = `${ArticleN}${isSeperator}${VarientN}`
                        } else if (ArticleN === '' || ArticleN === ' ') {
                            labelData = `${DesignN}${isSeperator}${VarientN}`
                        } else {
                            labelData = `${ArticleN}${isSeperator}${DesignN}${isSeperator}${VarientN}`
                        }
                    } else if (isArticle && !isDesign && !isvarient) {
                        labelData = ArticleN
                    } else if (isArticle && isDesign) {
                        labelData = `${ArticleN}${isSeperator}${DesignN}`
                    } else if (isArticle && isvarient) {
                        if (VarientN === '') {
                            labelData = `${ArticleN}`
                        } else if (ArticleN === '') {
                            labelData = `${VarientN}`
                        } else {
                            labelData = `${ArticleN}${isSeperator}${VarientN}`
                        }
                    } else if (isDesign && !isvarient) {
                        labelData = DesignN
                    } else if (isDesign && isvarient) {
                        if (VarientN === '') {
                            labelData = `${DesignN}`
                        } else if (DesignN === '') {
                            labelData = `${VarientN}`
                        } else {
                            labelData = `${DesignN}${isSeperator}${VarientN}`
                        }
                    } else if (isvarient) {
                        labelData = VarientN
                    }
                    lblClass = `${lblClass}Bar`
                }
            }
        }
    }
    function activateLensZoom(e, bookEffect) {
        //$(".page .stf__item .--left .--hard .--simple").css({ "z-index": "10 !important"})
        $(e.target).ezPlus({
            scrollZoom: true,
            zoomType: "window",
            zoomContainerAppendTo: "body",
            displayLens: false,
            zoomWindowWidth: 250,
            zoomWindowHeight: 250,
            zoomWindowFadeIn: 500,
            zoomWindowFadeOut: 750,
            windowOffsetTop: ConverToPx(unit, shapeDetails.cL_shapePositionY) * zoomScale,
            windowOffsetLeft: ConverToPx(unit, shapeDetails.cL_shapePositionX) * zoomScale
        })
        $(e.target).off('mouseover')
    }

    let bgsize = 0
    let activatelens = activateLensZoom
    // if (props.pageFold === 'user_fold') {
    //     activatelens = ""
    // } else {
    //     activatelens = activateLensZoom
    // }
    //props.pageFold === "user_fold" ? "" : activatelens 
    if (shapeDetails.cL_Shape_Type === "Picture") {
        bgsize = 'contain'
        bgimgreapet = "no-repeat"
        activatelens = ''
        bgposition = 'center'
    } else {
        bgsize = ''
        //activatelens = activateLensZoom
    }
    const handelOnClick = ({ srno, dSize, bgimg, isBottom, d_feature, hideFilterView, designInfoList, PluginModel, View3dPlugin, setActiveImageData, currentDesign, cb = null, colourWay, product }) => {
       
        $(window).scrollTop(0)//manisha//
        // NaveBtn.NavHome.current.style.display = 'none'
        // NaveBtn.NavBack.current.style.display = 'block'
        const des_Size = dSize ? dSize : "0.0, 0.0" //props.currentDesign.designSize !== null ? props.currentDesign.designSize : "5.927, 5.583"
        const demoData = {
            productName: product ? product : 'shirt',
            openfullScreenIcon,
            closefullScreenIcon,
            //q3dLogo,
            show3D,
            //resetLogo,
            nextprevBtn,
            //headerLogoCollezioni,
            //headerBGColleziono,
            //headerLogoArchive,
            //headerBGArchive,
            addToCart,
            q3dLogo,
            designInfoList,
            //addToCartFilled,
            //addToFavFilled,
            closefullScreenIconHeader,
            actualLogo,
            pluginFor: 'collezioni', // archive - collezioni
            ScreenDPIX: JSON.parse(localStorage.DeviceDetailsDto).screen_X_DPI,
            ScreenDPIY: JSON.parse(localStorage.DeviceDetailsDto).screen_Y_DPI,
            ScreenDPIXDefault: '96',
            ScreenDPIYDefault: '96',
            DpiUnit: 'inch', // inch or cm
            designWidth: des_Size.split(',')[0]?.trim(), //10.25 - o 4.103 - s 0.77 - 2s 1.54
            designHeight: des_Size.split(',')[1]?.trim(), // 10.37 - o 4.153 - s 0.78 - 2s 1.56
            isaddtoCart: false,
            isaddtoFav: false,
            displayFavCartBtn: true,
            displayNextPreviousBtn: true,
            displayDesignName: false,
            bgImgFor3DImgs: false, //bg img show/hide when suting
            displayDesignInfo: true, // display design info table
            q3d: true, //if false q3d models will not display.
            q3dData: {
                key: '420826895',
                tempkey: '123456789',
                OrganisationId: info.orgid[0],
                serviceUrl: info.orgid[1],

                skinColorRGB: '223,185,147',
                shoesRGB: '0,0,0'
            },
            watermark: {
                addWatermark: true,
                name: 'Textronics'
            },
            designInfo: {
                Name: props.shape.designCode ? props.shape.designCode : undefined,
                feature: d_feature
            },
            displayColorwayImg: false,
            changeColorwayImg: false,
            colorwayList: [],
            galleryImgData: [
                {
                    b: bgimg.replaceAll('t.jpg', 'b.jpg').replaceAll('/t/', '/b/'),
                    t: bgimg,
                    z: bgimg.replaceAll('t.jpg', 'z.jpg').replaceAll('/t/', '/z/'),
                    name: props.title,
                    isdesign: true,
                    id: 54545,
                    altImg_t: bgimg
                }
            ],
            isTotem: false,
            onNextBtnClick(e) {
            }
        }

        if (!isBottom) { //props.isBottom
            hideFilterView() //props.hideFilterView()
            props.showFilterView()
            setTimeout(() => {
                try {
                    //isBottom
                    try {
                        const prv = document.getElementsByClassName("swiper-button-prev")[0] //swiper-button-prev
                        for (let i = 0; i < 6; i++) {
                            prv.click()
                        }
                    } catch (error) {

                    }
                    setTimeout(() => {
                        const next = document.getElementsByClassName("swiper-button-next")[0]
                        for (let i = 1; i < Math.ceil((srno + 1) / 5); i++) {
                            next.click()
                        }
                        rmselected()
                        setselected(srno)
                    }, 100)

                    //console.log(srno, Math.ceil(srno / 5))

                } catch (error) {

                }
            }, 10)

        } else {

        }

        if (PluginModel()) {
            PluginModel().changeDesign(demoData)

        } else {
            View3dPlugin(demoData)
            //history.push({ pathname: "/FullView", state: JSON.stringify(demoData), imgD: JSON.stringify(props.imgdata), searchObj: sessionStorage.getItem("SeasonalSearchDesign") })
        }

        setActiveImageData(currentDesign)
        $(window).scrollTop(0)//manisha//

        if (colourWay) {
            try {
                setTimeout(() => {
                    document.querySelectorAll('#colour-way-design-in-fullview .selected_colorway').forEach(e => {
                        e.classList.remove('selected_colorway')
                        e.firstChild.style.display = 'none'
                    })
                    const element = document.querySelector(`#colour-way-design-in-fullview-${colourWay} span`)
                    element.classList.add('selected_colorway')
                    element.firstChild.style.display = ''
                }, 10)
            } catch (error) {

            }
        } else {
            setTimeout(() => {
                document.querySelectorAll('#colour-way-design-in-fullview .selected_colorway').forEach(e => {
                    e.classList.remove('selected_colorway')
                    e.firstChild.style.display = 'none'
                })
                //11-4-2023
                //const element = document.querySelector(`#colour-way-design-in-fullview-${0} span`)
                //element.classList.add('selected_colorway')
                //element.firstChild.style.display = ''
            }, 10)
        }

    }
    const { access, is_boarduser, board, selectedUser } = useContext(accessContext)
    return (

        shapeDetails && (!shapeDetails.cL_ShapeWidth <= 0) ? <>
            {loading ? <div className="loder" ><img src={loder} height={80} width={80} /><span className='page-content' style={{ display: 'none' }}></span></div> : ''}
            {/* {isBarcode ? <div className={lblClass} ref={book} style={{ width: ConverToPxY(barcodeWidth) * zoomScale, height: ConverToPxY(barcodeHeight) * zoomScale }}><BarCodeShape value={labelData} /></div> : ""} */}
            {/* {(landscapeflag1) ? (((TextData.BRQRSTAT) && (!TextData.DSNCODESTAT || !TextData.Adv.IsArticle || !TextData.Adv.IsDesign || !TextData.Adv.IsVarient)) ? ((isBarcode) ? ((<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: (ConverToPxY(barcodeHeight) * zoomScale) - 40, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /></div>)) : ((<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: (ConverToPxY(barcodeHeight) * zoomScale) - 40, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript">{labelData}</label></div>))) : "") : ((TextData.BRQRSTAT && (!TextData.DSNCODESTAT || !TextData.Adv.IsArticle || !TextData.Adv.IsDesign || !TextData.Adv.IsVarient)) ? ((isBarcode) ? ((<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /></div>)) : ((<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript">{labelData}</label></div>))) : "")} */}

            {((TextData.DSNCODESTAT) && (!TextData.IsVerticle) && (!TextData.BRQRSTAT)) ? <div className={lblClass} ref={book} style={{ left: (ConverToPxY(barcodeWidth) * zoomScale), top: ConverToPxY(barcodeHeight) * zoomScale, position: "absolute" }}><label className={lblClass} style={{ color, fontFamily, fontWeight, fontSize, fontStyle }}>{labelData}</label></div> : ""}

            {(landscapeflag1) ? (((TextData.BRQRSTAT) && ((TextData.DSNCODESTAT || TextData.Adv.IsArticle || TextData.Adv.IsDesign || TextData.Adv.IsVarient) && (!TextData.IsVerticle))) ? ((isBarcode) ? (<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /></div>) : (<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: (ConverToPxY(barcodeHeight) * zoomScale) - 40, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript" style={{ color: 'black', fontWeight: 600, marginTop: 0.2, fontSize: 10 }}>{labelData}</label></div>)) : "") : (((TextData.BRQRSTAT) && ((TextData.DSNCODESTAT || TextData.Adv.IsArticle || TextData.Adv.IsDesign || TextData.Adv.IsVarient) && (!TextData.IsVerticle))) ? ((isBarcode) ? (<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /> </div>) : (<div className={lblClass} ref={book} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript" style={{ color: 'black', fontWeight: 600, marginTop: 0.2, fontSize: 10 }}>{labelData}</label></div>)) : "")}

            {(TextData.IsVerticle) ? <div className={lblClass} ref={book} style={{ left: (ConverToPxY(barcodeWidth) * zoomScale) - (10), top: (ConverToPxY(barcodeHeight) * zoomScale) + (10), position: 'absolute' }}><h6 style={{ color, fontFamily, fontWeight, fontSize, fontStyle, position: 'absolute' }}>{ArticleN}</h6><br /><h6 style={{ color, fontFamily, fontWeight, fontSize, fontStyle, position: 'absolute' }}>{DesignN}</h6><br /><h6 style={{ color, fontFamily, fontWeight, fontSize, fontStyle, position: 'absolute' }}>{VarientN}</h6></div> : ""}

            {(shape.designAt !== null) ? <div className="wharehouseimg" ref={book} style={{ backgroundImage: `url('data:image/png;base64,${DesignAt(shape.designAt)}')`, marginLeft: (ConverToPx(unit, shapeDetails.cL_shapePositionX) * zoomScale) + (-65), marginTop: (ConverToPx(unit, shapeDetails.cL_shapePositionY) * zoomScale) + 60, height: (20), width: (20), position: 'absolute', backgroundRepeat: 'no-repeat', backgroundSize: `100%` }}></div> : ""}

            {<div onMouseOver={(e) => {
                if (props.cust_pageFold_ref?.current === 'user_fold') {
                    $($(".zoomWindow")).css({ display: "none" })
                    $(".gradUp").css({ display: "none" })
                    $(".gradDown").css({ display: "none" })  //.gradDown
                } else {
                    $(".gradUp").css({ display: "block" })
                    $(".gradDown").css({ display: "block" })
                    const activeData = true
                    activateLensZoom(e, activeData)
                }
            }} onClick={(e) => {
                            //const d = props.shape
                //let new_colour = props.currentDesign.colorwayDesigns.filter((e) => e.designId !== props.design_id)
                //new_colour = [props.currentDesign, ...new_colour] //new_colour.push(props.currentDesign)
                //const new_currentDesign = props.currentDesign
                //new_currentDesign.colorwayDesigns = new_colour
                const new_currentDesign = props.shape
                handelOnClick({                 
                    dSize: props.shape.designSize,
                    bgimg: props.shape.uRl,
                    isBottom: props.isBottom,
                    hideFilterView: props.hideFilterView,
                    PluginModel: props.PluginModel,
                    View3dPlugin: props.View3dPlugin,
                    setActiveImageData: props.setActiveImageData,
                    d_feature: new_currentDesign.designFeature,
                    designInfoList : new_currentDesign.designInfos,
                    currentDesign: new_currentDesign, //props.currentDesign, //new_colour, //props.currentDesign,
                    srno: selectDesignImageNo(props.shape, bookCardData) || 0,
                    product: props.shape.products
                })
            }} className={shapeDetails.cL_ShapeName} pg_no={props.pg_no} ref={book} data-zoom-image={bgImageZ} style={{ backgroundImage: `url("${bgImage}")`, width: (ConverToPx(unit, shapeDetails.cL_ShapeWidth) * zoomScale), height: (ConverToPx(unit, shapeDetails.cL_shapeHeight) * zoomScale) + 5, marginLeft: (ConverToPx(unit, shapeDetails.cL_shapePositionX) * zoomScale), marginTop: ConverToPx(unit, shapeDetails.cL_shapePositionY) * zoomScale, position: 'absolute', backgroundSize: `${bgsize}`, backgroundRepeat: `${bgimgreapet}`, backgroundPosition: `${bgposition}`, overflow: 'hidden' }}>
                {(shapeDetails.cL_ShapeName === 'textbox') ? <div className="imageheader" ref={book} style={{ width: 'auto', height: 'auto', position: 'absolute', color, fontFamily, fontWeight, fontSize, fontStyle }}>{shape.textInfo}</div> : ""}
                {(((shapeDetails.cL_ShapeName === "roundrect") || (shapeDetails.cL_ShapeName === "rect") || (shapeDetails.cL_ShapeName === "right_triangle")) && (!(shapeDetails.cL_Shape_Type === "Picture"))) && <div className='swatch_options bookswatch_thumb' id='VijaySeason'>
                   {(is_boarduser && selectedUser) || !is_boarduser ? <WrapBtn designUrl={props.shape.uRl} designId={props.shape.designId} isBoardExist={props.shape.isBoardExist} setBoardSelected={props.setBoardSelected} /> : <></>}
                </div>}

            </div>}
        </> : <></>
    )
})

const groupBy = (objectArray, property) => {
    bookCardData = objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
            acc[key] = []
        }
        // Add object to list for given key's value
        acc[key].push(obj)
        //console.log(acc)
        return acc
    }, {})
    return bookCardData
}

const CardBookView = (props) => {

    //const newprops = props
    // const newprops = useRef(props)
    //const { setboardSelected } = props

    function handleMouseOver(event) {
        event.preventDefault()
    }

    const book = useRef(null)
    const [pageCount, SetPageCount] = useState(1)//useState(props.bookStartPage ? Number(props.bookStartPage) + 1 : 0)
    // let pageCount = 1
    const [showSearch, setShowSearch] = useState(false)
    const [inputValue, setInputValue] = useState('')
    //const [pageCount, SetPageCount] = useState(1)
    const [bookData, setBookData] = useState("")
    const zoomScale = props && props.firstpage ? getZoomRatio(props.firstpage.cardLayoutDto[0].card[0].cR_Width, props.firstpage.cardLayoutDto[0].card[0].cR_Height) - 0.03 : 1
    let zoomScaleShape = zoomScale
    let mf = 2
    //let pageCount = 1
    //let PdfData = ""
    if (props && props.firstpage) {
        if (props.firstpage.cardLayoutDto[0].card[0].cR_Width > props.firstpage.cardLayoutDto[0].card[0].cR_Height) {
            mf = 1
            zoomScaleShape = zoomScale / 2
        }
    }

    //const [page, setPage] = useState(0)
    // const [totalPage, setTotalPage] = useState(0)
    // const [pageFold, setPageFold] = useState("")
    //et cust_pageFold = ""
    const cust_pageFold_ref = useRef("")
    const changeFlipBook = (e) => {
        if (e.charCode === 27 || e.charCode === 13) {
            const pageNumber = e.target.value === "" ? 0 : parseInt(e.target.value, 10)
            // inputValue = pageNumber
            setInputValue(pageNumber)
            setShowSearch(true)
            if (pageNumber === 0) {
                alert("enter the number More than 0")
                return
            }
            const totalPage = props.cards.length
            let currentPage = pageCount //=== 0 ? 1 : pageCount//pageCount % 2 == 0 ? pageCount - 1 : pageCount
            if (pageCount % 2 === 0) { // book purpose : 2nd flipping 
                if (pageCount === pageNumber - 1) {
                    return
                } else if (pageCount === pageNumber) {
                    return
                }
            }
            currentPage = pageCount % 2 === 0 && pageNumber % 2 === 0 ? currentPage - 1 : currentPage
            if (pageNumber <= totalPage) {
                if (currentPage % 2 === 0) {
                    currentPage = pageCount + 1
                } else {
                    currentPage = pageCount
                }
            } else {
                alert("Enter the Proper Card Number u Enter Number more than TotalNumber cards")
                return
            }

            // Calculate the number of pages to flip
            const pagesToFlip = pageNumber - currentPage
            const pageFlipCount = Math.round((Math.abs(pagesToFlip) / 2))
            ///pageFlipCount = pageNumber === 1 ? totalPage : pageFlipCount
            //   pagesToFlip = pageNumber === 1 ? -(pagesToFlip) : pagesToFlip
            //pageFlipCount  = pageFlipCount / 2 === 0 ? pageFlipCount / 2 : pageFlipCount

            // Use a loop to turning pages

            // Use a loop to  turning pages
            for (let i = 0; i < pageFlipCount; i++) {
                if (pagesToFlip > 0) {
                    book.current.pageFlip().flipNext()
                } else {
                    book.current.pageFlip().flipPrev()
                }
            }
        }

    }

    function onFlip(data) {
        //console.log(`Current page:   ${data}`)
        SetPageCount(data + 1)
        //pageCount = data + 1
    }
    function onChangeState(data) {

        //cust_pageFold = data
        //setPageFold(data)
        cust_pageFold_ref.current = data
    }
    //useEffect(() => {
    //    if (book.current.pageFlip()) {
    //        setPage(book.current.pageFlip().getPageCount())
    //    }
    //}, [book.current])
    // useEffect(() => {
    //     if (book.current) {
    //         const htmlString = document.querySelectorAll(".book-container .stf__block .page")     //ReactDOMServer.renderToString(book.current)
    //         localStorage.setItem('myStoredComponent', htmlString)
    //     }
    // }, [])
    function storeData() {

        const data = document.querySelectorAll(".book-container .stf__block .page")
        setBookData((data[0]).outerHTML)
        const bookdata = (data[0]).outerHTML


        //localStorage.setItem("data", (data[0]).outerHTML)
        //    alert("data stored")
    }
    return (
        <Fragment>
            <InputGroup className='input-group-merge cardbookSearchbar' style={{ width: "250px" }}>
                <Input
                    placeholder='Search CardName...'
                    className='search-product'
                    filterKey='title'
                    value={inputValue}
                    filterHeaderKey='groupTitle'
                    onKeyPress={changeFlipBook}
                    onChange={e => {
                        setInputValue(e.target.value)
                    }}
                />
                <InputGroupAddon addonType='append' className='search_button'>
                    <InputGroupText >
                        <Icon.Search className='text-muted' size={14} />
                    </InputGroupText>
                    <div className='search-input-close' style={{ display: showSearch ? "block" : "none" }}
                        onClick={e => {
                            e.stopPropagation()
                            e.preventDefault()
                            // handleClearQueryInStore()
                            setInputValue("")
                            setShowSearch(false)
                        }}>
                        <Icon.X
                            className='ficon'
                        />
                    </div>
                </InputGroupAddon>

            </InputGroup>
            <div className='content-area-wrapper border-0'>

                {/* <img src={loder} height={80} width={80} style={{ marginLeft: 642, marginTop: 200, animationDuration: '2', display: "grid" }}/> */}
                <div class="swiper-button-prev" onClick={(event) => {
                book.current.pageFlip().flipPrev()
                event.stopPropagation()
                }}></div>
                {/*   <div className='book-container' style={{ width: props && Object.keys(props.firstpage).length > 0 ? ConverToPx(props.firstpage.cardLayoutDto[0].card[0].cR_Unit, props.firstpage.cardLayoutDto[0].card[0].cR_Width) : 'auto', height: props && Object.keys(props.firstpage).length > 0 ? ConverToPx(props.firstpage.cardLayoutDto[0].card[0].cR_Unit, props.firstpage.cardLayoutDto[0].card[0].cR_Height) : 'auto' }}>*/}
                {/* <PanZoom disabled={true}
                    minZoom={100}
                    maxZoom={100}
                > */}
                <div className='outer_container'>
                    <div className='book-container' style={{ width: props && Object.keys(props.firstpage).length > 0 ? mf * ConverToPx(props.firstpage.cardLayoutDto[0].card[0].cR_Unit, props.firstpage.cardLayoutDto[0].card[0].cR_Width) * zoomScale : 'auto', height: props && Object.keys(props.firstpage).length > 0 ? '100%' : 'auto' }}>

                        <HTMLFlipBook
                            width={props && props.firstpage ? ConverToPx(props.firstpage.cardLayoutDto[0].card[0].cR_Unit, props.firstpage.cardLayoutDto[0].card[0].cR_Width) * zoomScale : 'auto'}
                            height={props && props.firstpage ? ConverToPx(props.firstpage.cardLayoutDto[0].card[0].cR_Unit, props.firstpage.cardLayoutDto[0].card[0].cR_Height) * zoomScale : 'auto'}
                            size="stretch"
                            minWidth={10} // 315
                            maxWidth={800} //793
                            minHeight={10} //400
                            maxHeight={1200} //1123
                            maxShadowOpacity={0.4}
                            showCover={true}
                            className="demo-book"
                            drawShadow={true}
                            swipeDistance={30}
                            ref={book}
                            usePortrait={true}
                            showPageCorners={false}
                            clickEventForward={false}
                            mobileScrollSupport={true}
                            useMouseEvents={true}
                            onChangeState={(e) => onChangeState(e.data)}
                            // onChangeOrientation={("portrait", "landscape")}
                            onMouseOver={(e) => handleMouseOver(e)}
                            grabCorner={true}
                            onFlip={(e) => onFlip(e.data)}
                            onInit={(e) => storeData()}
                            startPage={parseInt(props.bookStartPage)}
                            flippingTime={1000}
                            disableFlipByClick={true}

                        >

                            {(props.firstpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl === null) ? (props && props.firstpage && <PageCover key={props.firstpage.cL_CardLayoutId} bg={"https://s3.ap-south-1.amazonaws.com/aws.tds/tds_raymond/Collezioni_Backgrounds/2006729886/CollectionCard/2762270031/FUTURISTIC%20MINI/1.jpg"} zoomScale={zoomScaleShape}></PageCover>) : (props && props.firstpage && <PageCover key={props.firstpage.cL_CardLayoutId} bg={props.firstpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl} zoomScale={zoomScaleShape}></PageCover>)}

                            {props && props.pages && Object.keys(groupBy(props.pages, 'cC_CardSequence')).map((e, k) => {
                                const shapesdata = bookCardData[e]//groupBy(props.pages, 'cC_CardSequence')[e]

                                let pgclass = 'rightpage'
                                if (k % 2 === 0) {
                                    pgclass = 'leftpage'
                                }
                                return <Page key={shapesdata[0].cL_CardLayoutId + k} card={shapesdata[0].cardLayoutDto[0].card[0]} unit={shapesdata[0].cardLayoutDto[0].card[0].cR_Unit} bg={shapesdata[0].cardLayoutDto[0].card[0].cR_BackgroundImageUrl} shapesdata={shapesdata}
                                    number={k + 1} zoomScale={zoomScaleShape} pgclass={pgclass} addtoboard={shapesdata[0].cardLayoutDto[0].cL_Shape_Type} bgcolor={shapesdata[0].cardLayoutDto[0].card[0].cR_BackgroundColor} setBoardSelected={props.setBoardSelected}
                                    setcollview={props.setcollview}
                                    poc={props.poc}
                                    setPoc={props.setPoc}
                                    rowsPerPage={props.rowsPerPage}
                                    showFilterView={props.showFilterView}
                                    fullViewDiv={props.fullViewDiv}
                                    hideFilterView={props.hideFilterView}
                                    PluginModel={props.PluginModel}
                                    View3dPlugin={props.View3dPlugin}
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
                                    hideSearch={props.hidesearch}
                                    catID={props.catID}
                                    pageFold={""}
                                    cust_pageFold_ref={cust_pageFold_ref}
                                ></Page>

                            })
                            }
                            {props && props.pages && Object.keys(bookCardData).length % 2 !== 0 ? <Page key='12345554333' isExtra={true} unit={''} bg={''} shapesdata={[]} number={Object.keys(Shape).length + 1} zoomScale={zoomScaleShape}></Page> : <></>}

                            {(props.lastpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl === null) ? (props && props.lastpage && <PageCover key={props.lastpage.cL_CardLayoutId} bg={"https://s3.ap-south-1.amazonaws.com/aws.tds/tds_raymond/Collezioni_Backgrounds/2006729886/CollectionCard/2762270031/FUTURISTIC%20MINI/18.jpg"} zoomScale={zoomScaleShape}></PageCover>) : (props && props.lastpage && <PageCover key={props.lastpage.cL_CardLayoutId} bg={props.lastpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl} zoomScale={zoomScaleShape}></PageCover>)}
                        </HTMLFlipBook>

                    </div>
                </div>
                {/* </PanZoom> */}
                <div class="swiper-button-next" onClick={(event) => { 
                 book.current.pageFlip().flipNext()
                 event.stopPropagation()
                  }}></div>
                {/* <StickyMenu pageCount={pageCount} book={book} totalPage={props.cards.length} /> */}

            </div>

            <StickyMenu pageCount={pageCount} book={book} cloneBook={bookData} totalPage={props.cards.length} />
        </Fragment>
    )
}

export default CardBookView


// important page={page}
// {shapeDetails.cL_ShapeName === "rect" && <div className='swatch_options bookswatch_thumb' id=''>
//                     <Favhoverbox />
//                     <WrapBtn />
//                     {/*<Button className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}*/}
//                     {/*    onClick={() => {*/}
//                     {/*        seticonfavActive(!iconfavstate)*/}
//                     {/*    }*/}
//                     {/*    }*/}

//                     {/*    color='light'*/}
//                     {/*>*/}
//                     {/*    {iconfavstate ? <><Check size={18} /></> : <><Plus size={18} /></>}*/}
//                     {/*</Button>*/}
//                 </div>}


/* <Button className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                    onClick={() => {
                        seticonfavActive(!iconfavstate)
                    }
                    }
                        color='light'
                >
                    {iconfavstate ? <><Check size={18} /></> : <><Plus size={18} /></>}
                </Button> */