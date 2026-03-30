// ** React Imports
import React, { useContext, useEffect, useRef, useState } from "react"
import { info } from './Sidebar'

// ** Third Party Components
import { Card, CardBody, Input } from 'reactstrap'
import DesignHoverOption from './DesignHoverOption'
import DesignRatings from '../../pagecomponents/DesignRatings'
import { accessContext } from "../../context/accessContext"
import { rmselected, setselected } from "../Utility/utility"
import openfullScreenIcon from "../../../assets/img/fullview.svg"
import closefullScreenIcon from "../../../assets/img/minimise.svg"
import yardimg from "../../../assets/images/fabicon/yard.png"
import cadimg from "../../../assets/images/fabicon/cad.png"
import show3D from "../../../assets/img/3d.svg"
import nextprevBtn from "../../../assets/img/prev.svg"
import closefullScreenIconHeader from '../../../assets/img/close_fullview.svg'
import addToCart from "../../../assets/img/cart.svg"
import actualLogo from "../../../assets/img/actual.svg"
import q3dLogo from "../../../assets/img/360.svg"
import '../css/designpage.css'
import axios from "axios"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useHistory } from 'react-router-dom'
import { Info, X, FilePlus, Check, MoreHorizontal, MoreVertical } from "react-feather"
import { ErpInfo } from "../../popups/ErpInfo"

const UpdateSelectedDesigns = (selectionDataRef) => {
  const selectedDesign = []
  Object.entries(selectionDataRef.current).forEach((e, i) => {
    if (e[1].checked === true) {
      selectedDesign.push(e[1].prop)
    }
  })
  document.getElementById('count').innerHTML = selectedDesign.length
}

const AllCheckBox = (selectedElementRef) => {
  const selecteddesign = []
  Object.entries(selectedElementRef.current).forEach((e) => {
    selecteddesign.push(e[1])
  })
  for (let i = 0; i < selecteddesign.length; i++) {
    const elementc = selecteddesign[i]
    if (elementc && elementc.checked === false && document.getElementById('pagechk')) {
      document.getElementById('pagechk').checked = false
      return
    }
  }
  document.getElementById('pagechk').checked = true
}
let isTitlePresent
const DesignThumb = (props) => {
  //console.log(props.title, 'pioop')
  const history = useHistory()
  const ThumbImg = useRef()
  const [check, SetCheck] = useState(false)
  const [imgDesignInfo, setimgDesignInfo] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [cartbox, setCartbox] = useState()
  const togglecartbox = () => { setCartbox(!cartbox) }
  const [erpInfo, setErpInfo] = useState()
  const erptoggle = () => setErpInfo(!erpInfo)

  const { access, selectedUser, is_boarduser } = useContext(accessContext)
  const { boardId } = useParams()
  const Addreq = useRef()
  const handleError = () => {
    ThumbImg.current.style.backgroundImage = `url("${props.localUrl}")`
  }
  const CustRow = ({ feature, property }) => {
    return (
      <tr>
        <td className='pr-1'>{feature} :</td>
        <td>{property}</td>
      </tr>
    )
  }
  useEffect(() => {


    if (boardId && props.selectionDataRef && props.selectedElementRef) {
      props.selectedElementRef.current[props.design_id].checked = props.selectionDataRef.current[props.design_id].checked
    }
  }, [props.design_id])
  const handelOnClick = async ({ srno, dSize, bgimg, isBottom, isSingleItem,
    hideFilterView, PluginModel,
    setActiveImageData, currentDesign, designInfoList, cb = null, colourWay, product, setBoardSelected }) => {
    if (props.positionFilter && props.positionFilter.current) {
      if (props.positionFilter.current.id === 'searchPage') {
        props.positionFilter.current.id = 'noLeftImage_full'
      } else if (props.positionFilter.current.id === 'noLeftImage') {
      } else {
        props.positionFilter.current.id = 'noLeftImg'
      }
    }
    //manisha added below

    $(window).scrollTop(0)//manisha//
    const des_Size = dSize ? dSize : "0.0, 0.0"
    const demoData = {
      SetBoard: setBoardSelected,
      productName: product ? product : props.currentDesign.features.Product ? props.currentDesign.features.Product : '',
      openfullScreenIcon,
      closefullScreenIcon,
      show3D,
      nextprevBtn,
      addToCart,
      q3dLogo,
      isSingleItem: props.isSingleItem,
      closefullScreenIconHeader,
      actualLogo,
      pluginFor: 'collezioni',
      ScreenDPIX: JSON.parse(localStorage.DeviceDetailsDto).screen_X_DPI,
      ScreenDPIY: JSON.parse(localStorage.DeviceDetailsDto).screen_Y_DPI,
      ScreenDPIXDefault: '96',
      ScreenDPIYDefault: '96',
      DpiUnit: 'inch',
      designWidth: des_Size.split(',')[0]?.trim(),
      designHeight: des_Size.split(',')[1]?.trim(),
      isaddtoCart: false,
      isaddtoFav: false,
      displayFavCartBtn: true,
      IsQrCode: access["222229"] && access["222229"]["266669"] ? "true" : "false",
      IsRuler: access["222229"] && access["222229"]["277779"] ? "true" : "false",
      displayNextPreviousBtn: true,
      displayDesignName: false,
      bgImgFor3DImgs: false, //bg img show/hide when suting
      displayDesignInfo: false, // display design info table
      q3d: true, //if false q3d models will not display.
      q3dUrl: props.q3dUrl ? props.q3dUrl : "",
      supplierId: (JSON.parse(localStorage.userData).org_type_id).toString(16),
      Q3dURL: props.QRurl,
      q3d: true, //if false q3d models will not display.
      q3dUrl: props.q3dUrl ? props.q3dUrl : "",
      supplierId: (JSON.parse(localStorage.userData).org_type_id).toString(16),
      q3dData: {
        key: '420826895',
        tempkey: '123456789',
        OrganisationId: info.orgid && info.orgid.length > 0 ? info.orgid[0] : null,
        serviceUrl: info.orgid && info.orgid.length > 1 ? info.orgid[1] : null,
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
      designInfoList,
      displayColorwayImg: false,
      changeColorwayImg: true,
      currentDesign,
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

    if (!isBottom) {
      hideFilterView()
      props.showFilterView()
      setTimeout(() => {
        try {
          try {
            const prv = document.getElementsByClassName("swiper-button-prev")[0]
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
        } catch (error) {

        }
      }, 10)

    } else {

    }
    if (PluginModel()) {
      if (props.backbuttonRef.current) {
        props.View3dPlugin(demoData, props.SearchObj, props.searchDesignByPagination)
      } else {
        PluginModel().changeDesign(demoData, currentDesign)
      }
    } else {
      // start new one 
      props.View3dPlugin(demoData, props.SearchObj, props.searchDesignByPagination)
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
      }, 10)
    }
    setCartbox(false)
    document.querySelectorAll('.ecommerce-card.cartOpened').forEach((e) => {
      e.classList.remove('cartOpened')
    })

  }
  try {
    const designMaster = JSON.parse(sessionStorage.getItem('designMaster')) || []

    // Check if props.title is present in the designMaster array
    isTitlePresent = designMaster.some(item => item.designName === props.title)

    // Do something with isTitlePresent
    // console.log(isTitlePresent, 'title')
  } catch (error) {
    console.error('Error parsing designMaster from sessionStorage:', error)
  }

  // Output the result
  // console.log(Addreq.current, 'Addreq1')
  const isClickable = false
  const fullViewClickonClick = async () => {
    const FolderId = props.currentDesign.folderId
    const designstate = props.currentDesign.state
    const designname = props.currentDesign.designName
    const str = props.currentDesign.designName
    const DesignCodeFormater = (str) => {
      const list = str.split("-")
      const clone = [...list]
      const first = clone[0]
      const last = clone[clone.length - 1]
      if (list.length === 1) {
        return {
          first: undefined,
          mid: first,
          last: undefined
        }
      } else if (list.length === 2) {
        return {
          first: null,
          mid: list[0],
          last: list[1]
        }
      } else {
        list.pop()
        list.shift()
        return {
          first,
          mid: list.join('-'),
          last
        }
      }
    }
    const temp = DesignCodeFormater(str.split('.')[0])
    const Article = temp.first ? temp.first : `0`
    const Design = temp.mid ? temp.mid : `0`
    const new_colour = await axios.get(`/DesignSearch/GetDesignsColorways?FolderId=${FolderId}&designname=${designname}&Article=${Article}&Design=${Design}&designstate=${designstate}`)
    const new_currentDesign = props.currentDesign
    new_currentDesign.colorwayDesigns = JSON.parse(new_colour.data)
    window.colorways = JSON.parse(new_colour.data)
    handelOnClick({
      dSize: props.currentDesign.designSize,
      bgimg: ThumbImg.current.style.backgroundImage.slice(5, -2), //shubham changes purpose: Change background image path from cdn to local if any error occur
      isBottom: props.isBottom,
      hideFilterView: props.hideFilterView,
      PluginModel: props.PluginModel,
      setActiveImageData: props.setActiveImageData,
      currentDesign: new_currentDesign, //props.currentDesign, //new_colour, //props.currentDesign,
      srno: props.srno,
      designInfoList: new_currentDesign.designInfo,
      product: props.currentDesign.products,
      setBoardSelected: props.setBoardSelected
    })
  }
  const ftdata = JSON.parse(localStorage.getItem("ftdata"))
  // console.log(props.currentDesign.features, 'props.currentDesign.features')
  return (
    <>
      <Card
        role="button"
        tabIndex="-3"
        className='ecommerce-card mb-0'>
        <DesignHoverOption
          setBoardSelected={props.setBoardSelected}
          colourWayClick={handelOnClick}
          boardName={props.boardName}
          cartName={props.cartName}
          colourWay={props.colourWay}
          isBottom={props.isBottom}
          hideFilterView={props.hideFilterView}
          setActiveImageData={props.setActiveImageData}
          ptDesign={props.currentDesign}
          PluginModel={props.PluginModel}
          srno={props.srno}
          setforloader={props.setforloader}
          cartbox={cartbox}
          setCartbox={setCartbox}
          togglecartbox={togglecartbox}
          title={props.title}
          Addreq={Addreq}
          //Added By Vijay Pansande, Added On : 30-12-2022, Purpose : Switch user (Delete Design from board)
          bID={props.bID}
        />
        {/* manisha added boardId for checkbox show hide */}

        {boardId && <div className={`custom-control custom-checkbox boardCheck ${isChecked ? "commerce-card" : "designchecked"
          }`}>
          <Input type="checkbox"
            className='custom-control-input form-check-input'
            defaultChecked={false}
            innerRef={(el) => {
              if (boardId) {
                if (props.selectedElementRef && props.design_id) {
                  props.selectedElementRef.current[props.design_id] = el
                }

                if (props.selectionDataRef && props.selectionDataRef.current && !props.selectionDataRef.current[props.design_id]) {
                  props.selectionDataRef.current[props.design_id] = {
                    element: el,
                    prop: props.currentDesign,
                    checked: false
                  }
                }
              }
            }}
            onChange={(e) => {
              setIsChecked(e.target.checked)
              AllCheckBox(props.selectedElementRef)
              SetCheck(priv => !priv)
              if (props.selectionDataRef.current) {
                props.selectionDataRef.current[props.design_id] = {
                  ...props.selectionDataRef.current[props.design_id],
                  checked: e.target.checked
                }
                UpdateSelectedDesigns(props.selectionDataRef)
              }
            }}
          />
          <label for="boardselect" className='custom-control-label' />
        </div>
        }

        <div ref={ThumbImg} className='item-img text-center mx-auto position-relative bottom-img-click'
          style={{ backgroundImage: `url("${props.bgimg}")`, width: props.width ? `${props.width}vh` : '' }}
          onClick={fullViewClickonClick}
        >
          <div className="top"  >
            <a>
              <img className='img-fluid card-img-top' />
            </a>
          </div>
          <div className="fabric_avail">
            {/* {localStorage.warehouse === 'stock' ? <div className="fabric_avail_icon" style={{
              background: 'none', border: 'none'
            }}>
              <Scissors className='scissor' />
            </div> : <></>}

            {localStorage.warehouse === 'noos' ? <div className="fabric_avail_icon" style={{
              background: 'none', border: 'none'
            }}>
              <Scissors className='scissor' />
            </div> : <></>} */}

            {localStorage.warehouse === 'cad' ? <div className="fabric_avail_icon">
              <img src={cadimg}></img>
              <caption>{localStorage.warehouse}</caption>
            </div> : <></>}


            {localStorage.warehouse === 'yardage' ? <div className="fabric_avail_icon">
              <img src={yardimg}></img>
              <caption>{localStorage.warehouse}</caption>
            </div> : <></>}
            {localStorage.warehouse === 'sample' ? <></> : <></>}

            {localStorage.warehouse === 'sample' ? <></> : <></>}
          </div>
        </div>
        <img src={props.bgimg} onError={handleError} style={{ display: 'none' }} />
        <CardBody style={{ minheight: "20px", position: "relative" }}>
          <h6 className='item-name'>
            <a className='text-body' onClick={fullViewClickonClick}>
              {props.title}
            </a>
          </h6>
          <h4 className='item-description text-primary'>{access["444449"] && access["444449"]["278889"] && props.price && `${props.price}/-`}</h4>
          <span className='item-description '>{(localStorage.warehouse === "stock" || localStorage.warehouse === "noos") && access["444449"] && access["444449"]["218889"] && (`Stock : ${props?.currentDesign?.stock || 0}`)}</span>
          <div className='item-rating'>
            {access["444449"] && access["444449"]["268889"] && props.currentDesign && props.currentDesign.features && <DesignRatings isThumb={true} rating={props.currentDesign && props.currentDesign.features ? Number(props.currentDesign.features.Rating) : 0} />}
          </div>
          {access["444449"] && access["444449"]["217798"] && JSON.parse(localStorage.userData).organisationId !== 757782875 && (
            <div className="infoviewB customtooltip" onClick={(e) => setErpInfo(true)}>
              <ErpInfo
                imgSrc={props.bgimg}
                title={props.title}
                erpInfo={erpInfo}
                setErpInfo={setErpInfo}
                erptoggle={erptoggle}
                windowWidth={props.windowWidth}
                windowHeight={props.windowHeight}
                Url={props.QRurl}
              />
              <MoreVertical />
              <span className="tooltip" style={{
                pointerEvents: isClickable ? 'auto' : 'none', // Enable or disable pointer events
                cursor: isClickable ? 'pointer' : 'not-allowed' // Change cursor style based on state
              }}>
                More..
              </span>
            </div>
          )}

          {access["444449"] && access["444449"]["217798"] && <div className="infoview customtooltip"
            onClick={

              (e) => {
                setimgDesignInfo(true)
                document.querySelectorAll('#Filter-main-viewPage .ecommerce-card.showedInfo').forEach(e => {
                  e.classList.remove('showedInfo')
                })
                document.querySelectorAll('#AllBottomDesign .ecommerce-card.showedInfo').forEach(e => {
                  e.classList.remove('showedInfo')
                })
                e.currentTarget.parentElement.parentElement.classList.add('showedInfo')
              }
            }
          ><Info /><span className="tooltip" style={{
            pointerEvents: isClickable ? 'auto' : 'none', // Enable or disable pointer events
            cursor: isClickable ? 'pointer' : 'not-allowed' // Change cursor style based on state
          }}>Info</span></div>}
          {!is_boarduser || (is_boarduser && selectedUser) ? <div className="cartIcon customtooltip" onClick={(e) => {
            setCartbox(true)
            if (setCartbox) {
              document.querySelectorAll('.addon_options .ecommerce-card.cartOpened').forEach(e => {
                e.classList.remove('cartOpened')
              })
              e.currentTarget.closest('.ecommerce-card').classList.add('cartOpened')
            } if (cartbox) {
              document.querySelectorAll('.addon_options .ecommerce-card.cartOpened').forEach(e => {
                e.classList.remove('cartOpened')
              })
              e.currentTarget.closest('.ecommerce-card').classList.add('cartOpened')
            }

          }}
          >

            <div className="cartSuccess_child"></div>
            {/* <span className="tooltip">Add to Request</span> <FilePlus /> */}
            {isTitlePresent === true ? <><span style={{
              pointerEvents: isClickable ? 'auto' : 'none', // Enable or disable pointer events
              cursor: isClickable ? 'pointer' : 'not-allowed' // Change cursor style based on state
            }} className="tooltip">Request Added</span> <Check size={20} /> </> : <><span className="tooltip" style={{
              pointerEvents: isClickable ? 'auto' : 'none', // Enable or disable pointer events
              cursor: isClickable ? 'pointer' : 'not-allowed' // Change cursor style based on state
            }}>Add to Request</span> <FilePlus /></>}
            {/* <ShoppingCart /> */}
          </div> : <></>}
        </CardBody>
        {imgDesignInfo && <div className="thumbInfoData" >

          <button type="button" class="close" onClick={() => setimgDesignInfo(false)}><span ><X /></span></button>
          {
            props.currentDesign.features && (
              <div>
                {Object.entries(props.currentDesign.features).map(([feature, property]) => (
                  <CustRow key={feature} feature={feature} property={property || ''} />
                ))}
              </div>
            )
          }
        </div>
        }
      </Card>
    </>
  )

}
export default DesignThumb