import React, { useState, useRef, useEffect, useContext } from 'react'
import SwiperCore, { Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import StickyMenu from '../../OtherComponents/StickyMenu'
import { Card, CardBody, Button, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap'
import * as Icon from 'react-feather'
import { Favhoverbox, WrapBtn } from '../../OtherComponents/Favhoverbox'
import { Check, Plus } from 'react-feather'
import 'swiper/swiper.scss'
import "../../css/seasonspage.css"
import 'swiper/components/effect-coverflow/effect-coverflow.scss'
import { useBarcode } from '@createnextapp/react-barcode'
import './../../css/card.scss' 
import cover from './../../NewFolder/cover.jpg'
import cover_last from './../../NewFolder/cover_last.jpg'
import nossimg from "../../../../../src/assets/images/fabicon/noos1234.png"
import yardimg from "../../../../../src/assets/images/fabicon/yardage123.png"
import cadimg from "../../../../../src/assets/images/fabicon/cad1234.png"
import sampleimg from "../../../../../src/assets/images/fabicon/sample123.png"
import stockimg from "../../../../../src/assets/images/fabicon/stock123.png"
import loder from "../../../../../src/assets/images/fabicon/loaderTds.gif"
import { accessContext } from "../../../context/accessContext"
import QRCode from 'react-qr-code'
import show3D from "../../../../../src/assets/img/3d.svg"
import nextprevBtn from "../../../../../src/assets/img/prev.svg"
import openfullScreenIcon from "../../../../../src/assets/img/fullview.svg"
import closefullScreenIcon from "../../../../../src/assets/img/minimise.svg"
import closefullScreenIconHeader from '../../../../../src/assets/img/close_fullview.svg'
import addToCart from "../../../../../src/assets/img/cart.svg"
import actualLogo from "../../../../../src/assets/img/actual.svg"
import q3dLogo from "../../../../../src/assets/img/360.svg"
import { info } from '../../../../../src/views/SeasonalCollections/BookThumnails/SeasonDesignView/Sidebar'
import { rmselected, setselected } from "../../../../../src/views/SeasonalCollections/BookThumnails/Utility/utility"
SwiperCore.use([Thumbs])
let shapedata = {}
const groupBy = (objectArray, property) => {
    /*console.log('DATA ', objectArray)*/
    shapedata =  objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
            acc[key] = []
        }
        // Add object to list for given key's value
        acc[key].push(obj)
        //console.log(acc)
        return acc
    }, {})
    return shapedata
}

const ConverToPx = (unit, data) => {

    let pxVal = 0
    switch (unit) {
        case 'inch':
            pxVal = data * 100
            break
        default:
            break
    }
    return pxVal
}
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
const getZoomScale = (bookHT, bookWD) => {
    //console.log($('.page').css('height'))
    //console.log($('.swiper-container').first().css('height')).ecommerce-application.myseasons
    let classname = ""
    if ($('.ecommerce-application.myseasons').length > 0) {
        classname = ('.ecommerce-application.myseasons')
    } else {

        classname = $('.content-body')[0]
    }
    const vH = parseFloat($('.ecommerce-application.myseasons').css('height'))
    const vW = parseFloat($(classname).css('width'))
    const actualbH = ConverToPx('inch', bookHT)
    const actualbW = ConverToPx('inch', bookWD)
    let ratio = 1
    const hratio = vH / actualbH
    const wratio = vW / actualbW
    ratio = hratio < wratio ? hratio : wratio
    //if (actualbH > actualbW) {
    //        ratio = vH / actualbH
    //} else if (actualbW > actualbH) {
    //        ratio = 0.5
    //}
    //console.log(ratio)
    return ratio
}
const DesignAt = (value) => {

    let DesignAt = value.toUpperCase()
    if (DesignAt === "CAD") {
        DesignAt = { cadimg }
        DesignAt = DesignAt.cadimg.replace(/^data:image\/(png|jpg);base64   ,/, "")
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
const BuildPage = React.forwardRef((props, cardref) => {

    const { isExtra, addtoboard } = props
    const [iconfavstate, seticonfavActive] = useState(false)
    return (
        <div className="page" ref={cardref} style={{
            width: props.width,
            height: props.height,
            transform: `scale(${props.currentZoom - 0.03})`
        }}>
            <div className="page-content" style={{ backgroundImage: `url('${props.bg}')` }}>
                {
                    props.shapesdata.reverse().map((shape, num) => {
                        return (<Shape shape={shape} unit={props.unit} zoomScale={props.zoomScale} height={props.height} width={props.width} shapeDetails={shape.cardLayoutDto[0]} pg_no={props.number} pinkingShare={shape.cardLayoutDto[0].card[0].cR_PinkingShear} shapename={shape.cardLayoutDto[0].cL_ShapeName} dropShadow={shape.cardLayoutDto[0].card[0].cR_DropShadow
                        } FolderEffect={shape.cardLayoutDto[0].card[0].cR_FolderEffect} shapesequence={shape.cC_ShapeSequence}
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
                            setBoardSelected={props.setBoardSelected}
                        ></Shape>)
                    })
                }
                {/*  <div className="page-text">{props.children}</div>*/}
                <div className="page-footer">{props.number}</div>
            </div>
            {((addtoboard === "Design" || addtoboard === "")) ? <div className='page_options' id='pageopt'>
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
const ConverToPxY = (data) => {
    let pxVal = 0
    pxVal = data * 96
    return pxVal
}
const selectDesignImageNo = (imageData, shapedata) => {
    const cardNum = imageData.cC_CardSequence
    const cardDesignNum = imageData.cC_ShapeSequence
    const bookAllData = shapedata
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
const Shape = React.forwardRef((props, cardref) => {
    const [loading, setLoading] = useState(true)
    const { shapeDetails, shape, unit, zoomScale, pinkingshare, FolderEffect } = props
    useEffect(() => {
        function tempShapename(rectno, F) {
            setLoading(false)
            for (let name = 0; name < rectno; name++) {
                if (F === 'rect' && props.pg_no.toString() === $('.rect:not(.rect[data-zoom-image=""])').eq(name).attr('pg_no')) {
                    $('.rect:not(.rect[data-zoom-image=""])').eq(name).polygonPluggin({ clip: 10, pinkingShare: props.pinkingShare, dropShadow: props.dropShadow, foldedShadow: props.FolderEffect })
                } else if (F === 'right_triangle' && props.pg_no.toString() === $('.right_triangle:not(.right_triangle[data-zoom-image=""])').eq(name).attr('pg_no')) {
                    $('.right_triangle:not(.right_triangle[data-zoom-image=""])').eq(name).polygonPluggin({ clip: 10, pinkingShare: props.pinkingShare, dropShadow: props.dropShadow, foldedShadow: props.FolderEffect })
                } else if (F === 'roundrect' && props.pg_no.toString() === $('.roundrect:not(.roundrect[data-zoom-image=""])').eq(name).attr('pg_no')) {
                    $('.roundrect:not(.roundrect[data-zoom-image=""])').eq(name).polygonPluggin({ clip: 10, pinkingShare: props.pinkingShare, dropShadow: props.shapeDetails.card[0].cR_DropShadow, foldedShadow: props.FolderEffect })
                }
            }
        }
        const rectno = $('.rect:not(.rect[data-zoom-image=""])').length
        tempShapename(rectno, 'rect')
        const right_triangle = $('.right_triangle:not(.right_triangle[data-zoom-image=""])').length
        tempShapename(right_triangle, 'right_triangle')
        const roundrect = $('.roundrect:not(.roundrect[data-zoom-image=""])').length
        tempShapename(roundrect, 'roundrect')
    })
    let lblClass = ''
    const bgImage = shapeDetails.cL_ShapeName === 'textbox' || shapeDetails.cL_ShapeName === 'cbarcode' ? '' : shape.uRl
    ////shape.uRl const bgImage = shapeDetails.cL_ShapeName === 'rect' ? shape.uRl : '' 
    let bgImageZ = shapeDetails.cL_ShapeName === 'textbox' ? '' : shape.uRl
    bgImageZ = bgImageZ.replace('/t/', '/z/')
    bgImageZ = bgImageZ.replace("t.", "z.")
    const TextData = shapeDetails.cL_PrintDesignName ? JSON.parse(shapeDetails.cL_PrintDesignName) : ''
    let color = TextData ? TextData.fontColor : ''
    let labelData = TextData ? TextData.defTxt : ''
    let fontFamily = TextData ? TextData.fontFamily : ''
    let fontSize = TextData ? TextData.fontSize / 1.5 : '' //fix the font size
    const fontStyle = TextData.fontStyle === "italic" ? "italic" : '' //TextData.fontStyle"" text font style itallic
    const fontWeight = TextData.fontStyle === 'Bold' ? "Bold" : '' //text font weight 
    const DesignState = shape.designAt // wharehouse state
    let isBarcode = false
    let isdesignCode = false
    let barcodeWidth = 0
    let barcodeHeight = 0


    let advString = ""
    let ArticleN = ""
    let DesignN = ""
    let VarientN = ""
    let landscapeflag1 = false
    const landscapeflag = false
    if (!landscapeflag) {
        if ((props.width > props.height)) {
            landscapeflag1 = true
        } else {
            landscapeflag1 = false
        }
    }
    if (TextData.BRQRSTAT || TextData.DSNCODESTAT) {
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
            if (isdesignCode) { //check designcode flag
                labelData = shape.designCode
                lblClass = `${lblClass}Bar`
            }
            if (isArticle || isDesign || isvarient) { // check all ADV name 
                ArticleN = advString.split('-')[0]
                DesignN = advString.split('-')[1]
                VarientN = advString.split('-')[2]
                if (isArticle && isDesign && isvarient) {
                    labelData = `${ArticleN}-${DesignN}-${VarientN}`
                } else if (isArticle && !isDesign && !isvarient) {
                    labelData = ArticleN
                } else if (isArticle && isDesign) {
                    labelData = `${ArticleN}-${DesignN}`
                } else if (isArticle && isvarient) {
                    labelData = `${ArticleN}-${VarientN}`
                } else if (isDesign && !isvarient) {
                    labelData = DesignN
                } else if (isDesign && isvarient) {
                    labelData = `${DesignN}-${VarientN}`
                } else if (isvarient) {
                    labelData = VarientN
                }
                lblClass = `${lblClass}Bar}`
            }

        }

    }

     const handelOnClick = ({ srno, dSize, bgimg, isBottom, d_feature, designInfoList, hideFilterView, PluginModel, View3dPlugin, setActiveImageData, currentDesign, cb = null, colourWay, product }) => {

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
            displayDesignInfo: false, // display design info table
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
    const [iconfavstate, seticonfavActive] = useState(false)
    function activateLensZoom(e) {
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
        $(e.target).unbind('mouseover')
    }
    let bgimgreapet = 0
    let bgposition = 0 //
    let bgsize = 0
    let activatelens = activateLensZoom
    if (shapeDetails.cL_Shape_Type === "Picture") {
        bgsize = 'contain'
        bgimgreapet = "no-repeat"
        activatelens = ''
        bgposition = 'center'
    } else {
        bgsize = ''
        activatelens = activateLensZoom
    }

    const { access, is_boarduser, board, selectedUser } = useContext(accessContext)
    return (
        shapeDetails && (!shapeDetails.cL_ShapeWidth <= 0) ? <>
            {loading ? <div className="loder" ><img src={loder} height={80} width={80} /></div> : ''}
            {/* {isBarcode ? <div className={lblClass}  style={{ width: ConverToPxY(barcodeWidth) * zoomScale, height: ConverToPxY(barcodeHeight) * zoomScale }}><BarCodeShape value={labelData} /></div> : ""} */}
            {/* {(landscapeflag1) ? (((TextData.BRQRSTAT) && (!TextData.DSNCODESTAT || !TextData.Adv.IsArticle || !TextData.Adv.IsDesign || !TextData.Adv.IsVarient)) ? ((isBarcode) ? ((<div className={lblClass}  style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: (ConverToPxY(barcodeHeight) * zoomScale) - 40, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /></div>)) : ((<div className={lblClass}  style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: (ConverToPxY(barcodeHeight) * zoomScale) - 40, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript">{labelData}</label></div>))) : "") : ((TextData.BRQRSTAT && (!TextData.DSNCODESTAT || !TextData.Adv.IsArticle || !TextData.Adv.IsDesign || !TextData.Adv.IsVarient)) ? ((isBarcode) ? ((<div className={lblClass}  style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /></div>)) : ((<div className={lblClass}  style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript">{labelData}</label></div>))) : "")} */}

            {((TextData.DSNCODESTAT) && (!TextData.IsVerticle) && (!TextData.BRQRSTAT)) ? <div className={lblClass} ref={cardref} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><label className={lblClass} style={{ color, fontFamily, fontWeight, fontSize, fontStyle }}>{labelData}</label></div> : ""}

            {(landscapeflag1) ? (((TextData.BRQRSTAT) && ((TextData.DSNCODESTAT || TextData.Adv.IsArticle || TextData.Adv.IsDesign || TextData.Adv.IsVarient) && (!TextData.IsVerticle))) ? ((isBarcode) ? (<div className={lblClass} ref={cardref} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /></div>) : (<div className={lblClass} ref={cardref} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: (ConverToPxY(barcodeHeight) * zoomScale) - 40, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript" style={{ color: 'black', fontWeight: 600, marginTop: 0.2, fontSize: 10 }}>{labelData}</label></div>)) : "") : (((TextData.BRQRSTAT) && ((TextData.DSNCODESTAT || TextData.Adv.IsArticle || TextData.Adv.IsDesign || TextData.Adv.IsVarient) && (!TextData.IsVerticle))) ? ((isBarcode) ? (<div className={lblClass} ref={cardref} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><BarCodeShape value={labelData} title={true} /> </div>) : (<div className={lblClass} ref={cardref} style={{ left: ConverToPxY(barcodeWidth) * zoomScale, top: ConverToPxY(barcodeHeight) * zoomScale, position: 'absolute' }}><QRCodeShape value={labelData} title={true} /><label for="javascript" style={{ color: 'black', fontWeight: 600, marginTop: 0.2, fontSize: 10 }}>{labelData}</label></div>)) : "")}

            {((TextData.IsVerticle)) ? <div className={lblClass} ref={cardref} style={{ left: (ConverToPxY(barcodeWidth) * zoomScale) + (10), top: (ConverToPxY(barcodeHeight) * zoomScale) + (10), position: 'absolute' }}><h6 style={{ color, fontFamily, fontWeight, fontSize, fontStyle, position: 'absolute' }}>{ArticleN}</h6><br /><h6 style={{ color, fontFamily, fontWeight, fontSize, fontStyle, position: 'absolute' }}>{DesignN}</h6><br /><h6 style={{ color, fontFamily, fontWeight, fontSize, fontStyle, position: 'absolute' }}>{VarientN}</h6></div> : ""}

            {(landscapeflag1) ? ((shape.designAt !== null) ? <div className="wharehouseimg" ref={cardref} style={{ backgroundImage: `url('data:image/png;base64,${DesignAt(shape.designAt)}')`, left: (ConverToPxY(barcodeWidth) * zoomScale) + 10, top: (ConverToPxY(barcodeHeight) * zoomScale) + 15, height: (20), width: (20), position: 'absolute', backgroundRepeat: 'no-repeat', backgroundSize: `100%` }}></div> : "") : ((shape.designAt !== null) ? <div className="wharehouseimg" style={{ backgroundImage: `url('data:image/png;base64,${DesignAt(shape.designAt)}')`, left: (ConverToPxY(barcodeWidth) * zoomScale), top: (ConverToPxY(barcodeHeight) * zoomScale) + 15, height: (20), width: (20), position: 'absolute', backgroundRepeat: 'no-repeat', backgroundSize: `100%` }}></div> : "")}

            <div onMouseOver={activatelens} onClick={() => {
                const d = props.shape
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
                    srno: selectDesignImageNo(new_currentDesign, shapedata) || 0,
                    product: props.shape.products
                })
            }} className={shapeDetails.cL_ShapeName} pg_no={props.pg_no} ref={cardref} data-zoom-image={bgImageZ} style={{ backgroundImage: `url('${bgImage}')`, width: ConverToPx(unit, shapeDetails.cL_ShapeWidth) * zoomScale, height: ConverToPx(unit, shapeDetails.cL_shapeHeight) * zoomScale, marginLeft: ConverToPx(unit, shapeDetails.cL_shapePositionX) * zoomScale, marginTop: ConverToPx(unit, shapeDetails.cL_shapePositionY) * zoomScale, position: 'absolute', backgroundSize: `${bgsize}`, backgroundRepeat: `${bgimgreapet}`, backgroundPosition: `${bgposition}`, overflow: 'hidden' }}>
                {(shapeDetails.cL_ShapeName === 'textbox') ? <div className="imageheader" ref={cardref} style={{ width: 'auto', height: 'auto', position: 'absolute', color, fontFamily, fontWeight, fontSize, fontStyle }}>{shape.textInfo}</div> : ""}
                {(((shapeDetails.cL_ShapeName === "roundrect") || (shapeDetails.cL_ShapeName === "rect") || (shapeDetails.cL_ShapeName === "right_triangle")) && (!(shapeDetails.cL_Shape_Type === "Picture"))) && <div className='swatch_options bookswatch_thumb' id='VijaySeason'>
                    {(is_boarduser && selectedUser) || !is_boarduser ? <WrapBtn designUrl={props.shape.uRl} designId={props.shape.designId} isBoardExist={props.shape.isBoardExist} /> : <></>}
                </div>}
            </div></> : <></>
    )
})

const SwiperGallery = ((props) => {
    const cardref = useRef(null)
    // console.log('FrotPage', (props.firstpage.cardLayoutDto[0].card[0].cR_CardType === 1).length)
    const zoomScale = props && props.firstpage ? getZoomScale(props.firstpage.cardLayoutDto[0].card[0].cR_Height, props.firstpage.cardLayoutDto[0].card[0].cR_Width) - 0.03 : 1
    const defaultFirstPage = false//!(props.firstpage.cardLayoutDto[0].card[0].cR_CardType === 1)
    const defaultLastPage = false//!(props.lastpage.cardLayoutDto[0].card[0].cR_CardType === 2)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [count, setCount] = useState(0)
    const [currentZoom, setcurrentZoom] = useState(1)
    const [inputValue, setInputValue] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    //const swiper1 = useSwiper()
    //const swiperRef = props.card
    const isRtl = false
    const changeFlipBook = (e) => {
        // cardref.current.slideTo(parseInt((e.target.value) - 1, 10))
        //swiper1.slideNext()
        if (e.charCode === 27 || e.charCode === 13) {
        let currentPage = null
        const pageNumber = e.target.value === "" ? 0 : parseInt(e.target.value, 10)
        const totalCard = props.thumbimagedata.length
        setInputValue(pageNumber)
        setShowSearch(true)
        if (totalCard >= pageNumber) {
            currentPage = count
        } else {
            alert("Enter the Proper Card Number u Enter Number more than TotalNumber cards")
            return
        }
        const pagesToFlip = pageNumber - currentPage
        for (let i = 0; i < Math.abs(pagesToFlip); i++) {
            if (pagesToFlip > 0) {
                $(".swiper-button-next").click()
            } else {
                $(".swiper-button-prev").click()
            }
          }
        }
        
    }
    function click(data) {
        setCount(data)
    }
    // const cardSave = useRef(null)
    const params = {
        //ref: props.cardref,
        className: 'swiper-gallery upperimgview',
        spaceBetween: 10,
        autoHeight: true,
        navigation: true,
        grabCursor: true,
        zoom: true,
        effect: 'coverflow',
        pagination: {
            clickable: true
        },
        thumbs: { swiper: thumbsSwiper }
    }

    const paramsThumbs = {
        autoHeight: true,
        className: 'gallery-thumbs',
        spaceBetween: 2,
        slidesPerView: 0,
        // Responsive breakpoints
        breakpoints: {

            // when window width is <= 499px
            499: {
                slidesPerView: 0,
                spaceBetweenSlides: 2
            },
            // when window width is <= 999px
            999: {
                slidesPerView: 0,
                spaceBetweenSlides: 2
            }
        },
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        onSwiper: setThumbsSwiper
    }


    return (
        <>
        <InputGroup className='input-group-merge cardbookSearchbar' style={{ width: "250px", position : "absolute", zIndex: "99"}}>
                    <Input
                        placeholder='Search Card'
                        className='search-product'
                        filterKey='title'
                        value={inputValue}
                        onChange={e => {
                            setInputValue(e.target.value)  
                                    }}
                        filterHeaderKey='groupTitle'
                        onKeyPress={changeFlipBook}
                    />
                    <InputGroupAddon addonType='append' className='search_button'>
                        <InputGroupText >
                            <Icon.Search className='text-muted' size={14} />
                        </InputGroupText>
                        <div className='search-input-close' style={{ display : showSearch ? "block" : "none" }}
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
        <div className='content-area-wrapper'>   
        <Card className="swiper" >
            {/* {<button id="previousButton" onClick={() => swiperRef.current.slideNext()} />} */}
            {/* {<button id="nextButton" className="btn btn-primary" onClick={() => swiperRef.current.slideNext()}/>} */}
            <CardBody className='p-0'>
                {/* <div className='outer_container'> */}
                <div className='swiper-gallery' style={{ minHeight: '100%', maxWidth: '100%'}}>
                    <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params} ref={cardref} onSlideChange={(e) => click(e.activeIndex)}>

                        {/*{*/}
                        {/*    props && props.thumbimagedata && props.thumbimagedata.map((e, k) => {*/}
                        {/*        return <SwiperSlide>*/}
                        {/*            <h4> This is page {(k + 1)} </h4>*/}
                        {/*            */}{/*<img src={e.imagePath} name={e.cardcode} alt='swiper 1' className='img-fluid' />*/}
                        {/*        </SwiperSlide>*/}
                        {/*    })*/}
                        {/*}*/}

                        {props && props.firstpage && <SwiperSlide >
                            <BuildPage number='' bg={((props.firstpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl === null)) ? cover : props.firstpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl} shapesdata={[]} unit={props.firstpage.cardLayoutDto[0].card[0].cR_Unit}
                                width={ConverToPx(props.firstpage.cardLayoutDto[0].card[0].cR_Unit, props.firstpage.cardLayoutDto[0].card[0].cR_Width) * zoomScale}
                                height={ConverToPx(props.firstpage.cardLayoutDto[0].card[0].cR_Unit, props.firstpage.cardLayoutDto[0].card[0].cR_Height) * zoomScale}
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
                                setBoardSelected={props.setBoardSelected}
                                currentZoom={currentZoom}  

                            ></BuildPage>
                        </SwiperSlide>
                        }

                        {props && props.pages && Object.keys(groupBy(props.pages, 'cC_CardSequence')).map((e, k) => {
                            const shapesdata = shapedata[e]//groupBy(props.pages, 'cC_CardSequence')[e]
                            //console.log(groupBy(props.pages, 'cC_CardSequence')[e])
                            //groupBy(props.pages, 'cC_CardSequence')[e].map((page, num) => {
                            //})
                            return <SwiperSlide>
                                <BuildPage number={k + 1} bg={shapesdata[0].cardLayoutDto[0].card[0].cR_BackgroundImageUrl} shapesdata={shapesdata} unit={shapesdata[0].cardLayoutDto[0].card[0].cR_Unit}
                                    width={ConverToPx(shapesdata[0].cardLayoutDto[0].card[0].cR_Unit, shapesdata[0].cardLayoutDto[0].card[0].cR_Width) * zoomScale}
                                    height={ConverToPx(shapesdata[0].cardLayoutDto[0].card[0].cR_Unit, shapesdata[0].cardLayoutDto[0].card[0].cR_Height) * zoomScale}
                                    zoomScale={zoomScale}
                                    addtoboard={shapesdata[0].cardLayoutDto[0].cL_Shape_Type}
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
                                    setBoardSelected={props.setBoardSelected}
                                    currentZoom={currentZoom}
                                    
                                ></BuildPage>
                            </SwiperSlide>
                        })
                        }
                        {props && props.lastpage && <SwiperSlide>
                            <BuildPage number='' bg={((props.lastpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl === null)) ? cover_last : props.lastpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl} shapesdata={[]} unit={props.lastpage.cardLayoutDto[0].card[0].cR_Unit}
                                width={ConverToPx(props.lastpage.cardLayoutDto[0].card[0].cR_Unit, props.lastpage.cardLayoutDto[0].card[0].cR_Width) * zoomScale}
                                height={ConverToPx(props.lastpage.cardLayoutDto[0].card[0].cR_Unit, props.lastpage.cardLayoutDto[0].card[0].cR_Height) * zoomScale}
                                zoomScale={zoomScale}
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
                                setBoardSelected={props.setBoardSelected}
                                currentZoom={currentZoom}
                            ></BuildPage>
                        </SwiperSlide>
                        }

                    </Swiper>

                    <Swiper {...paramsThumbs} >

                        {
                            ((props.firstpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl === null)) ? props && props.firstpage && <SwiperSlide>
                                <div className="book_active"></div>
                                <img src={cover} name='frontPage' alt='' className='img-fluid' />
                            </SwiperSlide> : ""
                        }
                        {
                            props.thumbimagedata && props.thumbimagedata.map((e, k) => {
                                return <SwiperSlide>
                                    <div className="book_active"></div>
                                    <img src={e.imagePath} name={e.cardcode} alt='swiper 1' className='img-fluid' />
                                </SwiperSlide>
                            })
                        }
                        {
                            ((props.lastpage.cardLayoutDto[0].card[0].cR_BackgroundImageUrl === null)) ? props && props.lastpage && <SwiperSlide>
                                <div className="book_active"></div>
                                <img src={cover_last} name='frontPage' alt='' className='img-fluid' />
                            </SwiperSlide> : ""
                        }
                    </Swiper>
                </div>
                {/* </div> */}
            </CardBody>
        </Card>
        <StickyMenu cardref={cardref} pageCount={count} totalPage={props.thumbimagedata.length - 1} setcurrentZoom={setcurrentZoom}/>
        </div>
        </>
    )
})

export default SwiperGallery
