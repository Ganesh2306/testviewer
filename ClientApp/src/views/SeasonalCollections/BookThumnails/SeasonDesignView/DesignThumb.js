// ** React Imports
import React, { useContext } from "react"

import { info } from './Sidebar'
import { useHistory } from "react-router-dom"
// ** Third Party Components
import { Card, CardBody } from 'reactstrap'
import DesignHoverOption from './DesignHoverOption'
//import DesignHoverOption from '../../../design/designview/DesignHoverOption'
import DesignRatings from '../../../pagecomponents/DesignRatings'

import { accessContext } from "../../../context/accessContext"

import { rmselected, setselected } from "../Utility/utility"
import openfullScreenIcon from "../../../../assets/img/fullview.svg"
import closefullScreenIcon from "../../../../assets/img/minimise.svg"
import show3D from "../../../../assets/img/3d.svg"
import nextprevBtn from "../../../../assets/img/prev.svg"
import closefullScreenIconHeader from '../../../../assets/img/close_fullview.svg'
import addToCart from "../../../../assets/img/cart.svg"
import actualLogo from "../../../../assets/img/actual.svg"
import q3dLogo from "../../../../assets/img/360.svg"
import axios from "axios"
import '../../../design/css/designpage.css'

const DesignThumb = (props) => {
    const history = useHistory()
    const { access, is_boarduser, selectedUser } = useContext(accessContext)
    //const {setshowBack} = useContext(NaveBackBtn)
    const handelOnClick = async({ srno, dSize, bgimg, designInfoList, isBottom, hideFilterView, PluginModel, View3dPlugin, setActiveImageData, currentDesign, cb = null, colourWay, product }) => {
        $(window).scrollTop(0)//manisha//
        // NaveBtn.NavHome.current.style.display = 'none'
        // NaveBtn.NavBack.current.style.display = 'block'
        const des_Size = dSize ? dSize : "0.0, 0.0" //props.currentDesign.designSize !== null ? props.currentDesign.designSize : "5.927, 5.583"
        const demoData = {
            //productName: product ? product : 'shirt',
            productName: product ? product : props.currentDesign.features.Product ? props.currentDesign.features.Product : 'kurta',
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
            //addToCartFilled,
            //addToFavFilled,
            closefullScreenIconHeader,
            actualLogo,
            designInfoList, 
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
            IsQrCode: access["222229"] && access["222229"]["266669"] ? "true" : "false", // QR code in accessright added by Avinash
            IsRuler: access["222229"] && access["222229"]["277779"] ? "true" : "false", // Ruler code in accessright added by Avinash
            bgImgFor3DImgs: false, //bg img show/hide when suting
            displayDesignInfo: false, // display design info table
            q3d: true, //if false q3d models will not display.
            Q3dURL: props.QRurl,
            supplierId: (JSON.parse(localStorage.userData).org_type_id).toString(16), 
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
            Name: props.title,
            feature: props.currentDesign.features
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
            View3dPlugin(demoData, props.Searchobj, props.searchDesignByPagination)
           //history.push({ pathname: "/FullView", state: JSON.stringify(demoData), imgD: JSON.stringify(props.imgdata), searchObj: JSON.stringify(props.searchObj) })
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

                // const element = document.querySelector(`#colour-way-design-in-fullview-${0} span`)
                // element.classList.add('selected_colorway')
                // element.firstChild.style.display = ''
            }, 10)
        }

    }

    return (
        <Card
            role="button"
            tabIndex="-3"
            className='ecommerce-card ' style={{ borderRadius: "0px" }}> {(is_boarduser && selectedUser) || !is_boarduser ? <DesignHoverOption
                colourWayClick={handelOnClick}
                boardName={props.boardName}
                cartName={props.cartName}
                colourWay={props.colourWay}
                isBottom={props.isBottom}
                hideFilterView={props.hideFilterView}
                setActiveImageData={props.setActiveImageData}
                ptDesign={props.currentDesign}
                PluginModel={props.PluginModel}
                View3dPlugin={props.View3dPlugin}
                srno={props.srno}
                setPluginObject={props.setPluginObject}
                setBoardSelected={props.setBoardSelected}

            /> : <></>}
            <div className='item-img text-center mx-auto position-relative bottom-img-click'
                style={{ backgroundImage: `url("${props.bgimg}")`, width: props.width ? `${props.width}vh` : '' }}
                // onClick={() => {
                //     let new_colour = props.currentDesign.colorwayDesigns.filter((e) => e.designId !== props.design_id)
                //     new_colour = [props.currentDesign, ...new_colour] //new_colour.push(props.currentDesign)
                //     const new_currentDesign = props.currentDesign
                //     new_currentDesign.colorwayDesigns = new_colour
                //     // history.push('/designview')
                onClick={async() => {
                    const FolderId = props.currentDesign.folderId
                    const designstate = props.currentDesign.state
                     const designname = props.currentDesign.designName
                     const str =  props.currentDesign.designName
                     const DesignCodeFormater = (str) => {
                       const list = str.split("-")
                       const clone = [...list]
                       const first = clone[0]
                       const last = clone[clone.length - 1]
                       if (list.length === 1) {
                           return {
                               first : undefined,
                               mid:first,
                               last: undefined
                           }
                       } else if (list.length === 2) {
                           return {
                               first:null,
                               mid:list[0],
                               last: list[1]
                           }
                       } else {
                           list.pop()
                           list.shift()
                           return {
                               first,
                               mid:list.join('-'),
                               last
                           }
                       }
                   }
                     const temp = DesignCodeFormater(str.split('.')[0])
                     const Article = temp.first ? temp.first : `0`
                     const Design = temp.mid ? temp.mid : `0`
                     const new_colour = await axios.get(`/DesignSearch/GetDesignsColorways?FolderId=${FolderId}&designname=${designname}&Article=${Article}&Design=${Design}&designstate=${designstate}`)
                     // let new_colour = e.colorwayDesigns.filter((e) => e.designId !== props.design_id)
            //let new_colour = props.currentDesign.colorwayDesigns.filter((e) => e.designId !== props.currentDesign.designId)
           // new_colour = [props.currentDesign, ...new_colour] //new_colour.push(props.currentDesign)
            const new_currentDesign = props.currentDesign
            new_currentDesign.colorwayDesigns = JSON.parse(new_colour.data)
            // history.push('/designview')
                    handelOnClick({
                        dSize: props.currentDesign.designSize,
                        bgimg: props.bgimg,
                        isBottom: props.isBottom,
                        hideFilterView: props.hideFilterView,
                        PluginModel: props.PluginModel,
                        View3dPlugin: props.View3dPlugin,
                        setActiveImageData: props.setActiveImageData,
                        designInfoList : new_currentDesign.designInfo,
                        currentDesign: new_currentDesign, //props.currentDesign, //new_colour, //props.currentDesign,
                        srno: props.srno,
                        product: props.currentDesign.products
                    })
                } /* history.push('/designview') */}
            >
                <div className="top"  >
                    <a>
                        <img className='img-fluid card-img-top' />
                    </a>
                </div>
                {/*<div className="fabric_avail">*/}
                {/*    <div className="fabric_avail_icon">*/}
                {/*        <img src={stockimg}></img>*/}
                {/*        <caption>Stock</caption>*/}
                {/*    </div>*/}
                {/*    <div className="fabric_avail_icon">*/}
                {/*        <img src={nosimg}></img>*/}
                {/*        <caption>NOOS</caption>*/}
                {/*    </div>*/}
                {/*    <div className="fabric_avail_icon">*/}
                {/*        <img src={cadimg}></img>*/}
                {/*        <caption>CAD</caption>*/}
                {/*    </div>*/}
                {/*    <div className="fabric_avail_icon">*/}
                {/*        <img src={yardimg}></img>*/}
                {/*        <caption>YARDAGE</caption>*/}
                {/*    </div>*/}
                {/*    <div className="fabric_avail_icon">*/}
                {/*        <img src={sampleimg}></img>*/}
                {/*        <caption>SAMPLE</caption>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <CardBody style={{ height: "78px" }}>
                <h6 className='item-name'>
                    <a className='text-body'>
                        {props.title}
                    </a>
                </h6>
                <h4 className='item-description text-primary'>{access["444449"] && access["444449"]["278889"] && props.price && `${props.price}/-`}</h4>
                <span className='item-description '>{(localStorage.warehouse === "stock" || localStorage.warehouse === "noos")  && access["444449"] && access["444449"]["218889"] && props.currentDesign && props.currentDesign.features && props.currentDesign.stock !== null ? `Stock: ${props.currentDesign.stock}` : <></>}</span>
                <div className='item-rating'>
                    {access["444449"] && access["444449"]["268889"] && props.currentDesign && props.currentDesign.features && <DesignRatings isThumb={true} rating={props.currentDesign && props.currentDesign.features ? Number(props.currentDesign["rating"]) : 0} />}
                </div>
            </CardBody>
        </Card>
    )

}
export default DesignThumb