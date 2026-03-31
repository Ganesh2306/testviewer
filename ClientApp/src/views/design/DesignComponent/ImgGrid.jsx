import { useState, useEffect, useRef, useContext } from "react"
import {
  Button,
  CardBody,
  Table,
  ButtonGroup,
  Input,
  Label,
  CustomInput
} from "reactstrap"
import { ChevronDown, Edit, List, Grid } from 'react-feather'
import { Icon, InlineIcon } from '@iconify/react'
import tshirtCrewOutline from '@iconify/icons-mdi/tshirt-crew-outline'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { UploadDesign } from './popup/UploadDesign'
import { DeletePopUp, QrPopUp } from './popup/DeletePopUp'
import { FibricInfo } from './popup/FibricInfo'
import { PreviewFab } from "./popup/PreviewFab"
import { imgData, ImgColumn } from './data'
import axios from 'axios'
import '../design.css'
// import { getQRbase64 } from './Utility/Utility'
import { selection } from "./Utility/selection"
import { searchHandel } from '../DesignComponent/TopBar'
import { AbilityContext } from '@src/utility/context/Can'
import classnames from 'classnames'
import { Form } from "react-bootstrap"
import { DateRangePicker } from "react-date-range"
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
//let mainTDS = null
export const help_for_delete = async (data, cb = null) => {

  const formPayload = new FormData()

  formPayload.append('file', null)

  formPayload.append('alldata', JSON.stringify(data))
  await axios({
    url: './Design/UploadDesigns',
    method: 'post',
    data: formPayload,
    headers: { 'Content-Type': 'multipart/form-data' },
    enctype: 'multipart/form-data'

  }).then(e => {

    if (e.data.issaved && cb !== null) {
      cb(true)
    } else {
      if (cb !== null) {
        cb(false)
      }
    }

  })

}

const CustomPagination = ({ setDesignList, totalCountfab, prerender, tempsearchValue, selectedPage, setSelectedPage, orderbyref, orderbycountref, supplierref, loaderRef }) => {
  const valuee = orderbycountref.current.value ? parseInt(orderbycountref.current.value) : 15
  const [parPage, setparPage] = useState(valuee)
  const handlePagination = page => {
    loaderRef.current.style.display = 'block'
    const _selectpage = page.selected
    try {
      document.querySelector('#page').checked = false
    } catch (error) {

    }
    setSelectedPage(page.selected)
    const start = page.selected === 0 ? 0 : page.selected * parPage
    const end = parPage + start
    const sid = localStorage.getItem('SupId')
    if (tempsearchValue === "") {
      tempsearchValue = undefined
    }
    let IsName = ""
    if (orderbyref.current.value === "Name") {
      IsName = true
    } else {
      IsName = false
    }
    searchHandel({ setDesignList }, tempsearchValue, false, start, end, supplierref.current?.value, IsName)
      .then(() => {
        loaderRef.current.style.display = 'none'
      })
      .catch((error) => {
        console.error('Error:', error)
        loaderRef.current.style.display = 'none'
      })
  }

  const count = Math.ceil(totalCountfab / parPage)
  useEffect(() => {
    //setSelectedPage(0)
    setparPage(valuee)
  }, [prerender])
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      breakLabel='...'
      pageCount={count || 1}
      onPageChange={page => handlePagination(page)}
      marginPagesDisplayed={5}
      pageRangeDisplayed={2}
      activeClassName='active'
      forcePage={selectedPage}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm pr-1 mt-1'
      }
    />
  )
}

const OnHoverOption = ({ src, id, fibName, setreRender, reRender, features, setonHover, props, orderbyref, designList, orderbycountref, designCode, Q3drenderpluginURL, products, mainTDS, loaderRef, isq3dlite, setSelect, select, setSelectedPage, selectedPage, di_state, access, supplierref }) => {
  const [Del, setDel] = useState(false)
  const deltoggle = () => setDel(!Del)
  const [showqr, setshowqr] = useState(false)
  const toogleqr = () => setshowqr(!showqr)
  const [editmodal, seteditModal] = useState(false)
  const [preview, setPreview] = useState(false)
  const togglePreview = () => setPreview(!preview)
  //const [QR, setQR] = useState(getQRbase64(`${selection.Q3dURL}?k=${selection.userId}&t=${fibName}`))
  const edittoggle = () => seteditModal(!editmodal)
  const ability = useContext(AbilityContext)
  const org_type = JSON.parse(localStorage.userData)?.org_type
  return (
    <div className="icon-wrap">
      <div className="iconstop" style={{ float: 'left', zIndex: '9' }}>
        {/* (ability.can('display', 'Design') || ability.can('show', 'Design')) */}
        {(ability.can('display', 'Design') || ability.can('show', 'Design')) && <Button className="iconthumb" color='light' title="Edit" >
          <Edit role='button' onClick={() => {
            edittoggle()
          }} />
          <UploadDesign setreRender={setreRender}
            reRender={reRender} check={props}
            modal={editmodal} uid={id}
            toggle={edittoggle} src={src} fibName={fibName}
            HovFun={setonHover} features={features}
            Q3drenderpluginURL={Q3drenderpluginURL} products={products} di_state={di_state}
            mainTDS={mainTDS} loaderRef={loaderRef} isq3dlite={isq3dlite} setSelect={setSelect} select={select} setSelectedPage={setSelectedPage} selectedPage={selectedPage} access={access} supplierref={supplierref}
          />
        </Button>
        }
        {access.current !== null && access.current["444449"] && !access.current["444449"]["227789"] && <Button className="iconthumb" color='light' title="QR" id='' onClick={() => {
          selection.setSelectAll(false, designList)
          selection.reMoveAll()
          toogleqr()
        }}>
          <i className="fa fa-qrcode" aria-hidden="true" role='button' ></i>
        </Button>}
        {showqr && <QrPopUp showqr={showqr} toogleqr={toogleqr} src={org_type === 2 ? selection.getQrLink(true, fibName) : selection.getCustQrLink(true, fibName, supplierref)} fabName={fibName} />}
        <Button className="iconthumb" color='light' title="Info">
          <FibricInfo src={src} HovFun={setonHover} check={props}
            features={features}
          />
        </Button>
        {/* {access.current !== null && access.current["444449"] && !access.current["444449"]["227789"] && <Button className="iconthumb" color='light' title="Garment" href={org_type === 2 ? `${selection.Q3dURL}?k=${selection.userId()}&t=${fibName}` : `${selection.Q3dURL}?k=${JSON.parse(supplierref.current.value).toString(16)}&t=${fibName}`} target="_blank">
          <Icon icon={tshirtCrewOutline} role='button' />
        </Button>} */}
        {access.current !== null && access.current["444449"] && !access.current["444449"]["227789"] && <Button className="iconthumb" color='light' title="Garment" href={window.location.host === 'getznertech-admin.q3d.in' ? `${selection.Q3dURL}?k=${selection.userId()}&t=${fibName}&p=ecom` : (org_type === 2 ? `${selection.Q3dURL}?k=${selection.userId()}&t=${fibName}` : `${selection.Q3dURL}?k=${parseInt(supplierref.current.value).toString(16)}&t=${fibName}`)} target="_blank">
          <Icon icon={tshirtCrewOutline} role='button' />
        </Button>}
        {(ability.can('display', 'Design') || ability.can('show', 'Design')) && <Button className="iconthumb" onClick={async () => {
          selection.setSelectAll(false, designList)
          selection.reMoveAll()
          deltoggle()
        }} color='light' title="Remove">
          <i className="fa fa-times " aria-hidden="true" role='button' ></i>
          <DeletePopUp orderbycountref={orderbycountref} orderbyref={orderbyref} All={props} fibName={fibName} modal={Del} setDel={seteditModal} toggle={deltoggle}
            id={id} setreRender={setreRender} reRender={reRender} designCode={designCode} loaderRef={loaderRef} supplierref={supplierref} />
        </Button>
        }
        <Button className="iconthumb" color='light' title="i" id=''
          onClick={() => {
            setPreview(true)
          }}>
          <i className="" aria-hidden="true" role='button' >I</i>

        </Button>
        {preview && <PreviewFab preview={preview} setPreview={togglePreview} src={src} fibName={fibName} />}
      </div>
    </div>
  )
}

const ColourWay = () => {
  return (
    <div className="colorbox">
    </div>
  )
}

const ImgBox = (props) => {
  const [onHover, setonHover] = useState(false)
  const [src, setSrc] = useState(props.src)
  const [Features, setFeatures] = useState()
  const checkBackgroundImage = useRef(null)
  const [check, setCheck] = useState(selection.slected[props.imgId] && true)
  useEffect(() => {
    //setCheck(selection.slected[props.imgId] && true)
    setFeatures(props.features)
  }, [])

  const handleError = (e) => {
    if (e.currentTarget.src !== props.localSrc && checkBackgroundImage.current) {
      checkBackgroundImage.current.style.backgroundImage = `url("${props.localSrc}")`
      e.currentTarget.src = props.localSrc
    }
  }
  const divstyle = selection.slected[props.imgId] ? "tt rounded-0 thumbselectDesign" : "tt rounded-0"
  // const divstyle = selection.slected[props.imgId] ? "ecommerce-card card mb-1 p-0 thumbselectDesign" : "ecommerce-card card mb-1 p-0"
  return (

    <tr className='ecommerce-card card mb-1 p-0'

    >

      <td className="thumb-checkbox-wrap">
        <Form>

        </Form>


      </td>
      <td>
        {props.counter + 1}
      </td>

      <td className="thumb-bg p-0">
        <div key={`c-${props.imgId}`} id={props.id}
          designid={props.imgId}
          className={divstyle}
        >

          <div className='custom-control custom-checkbox'>
            <Input type='checkbox' className='custom-control-input'
              defaultChecked={selection.slected[props.imgId] && true}
              //value={check}
              onChange={(e) => {
                const pageno = document.querySelector(".pagination .active").textContent
                if (e.target.checked === false) {
                  selection.reMoveSelected(props.imgId, pageno)
                  //setCheck(false)
                } else {
                  selection.showSelected({ id: props.imgId, name: props.fname, imgUrl: props.src, features: props.features, designSize: props.designSize, designCode: props.designCode, ctrlKey: true, pageno })
                  //setCheck(true)
                }
                selection.AllCheckBox()

              }
              }
            />
            <label for="xx" className='custom-control-label' />

          </div>

          {/* <img src={props.src} onError={(event) => handleError(event)} style={{ display: 'none' }} /> */}
          <img src={props.src} style={{ display: 'none' }} />
        </div>

        <div ref={checkBackgroundImage} className='item-img position-relative p-0 w-100' style={{ backgroundImage: `url("${props.src}")` }}>
          {props.isq3dlite && <div className="excl q_threedlite">Q3dLite </div>}
          <ColourWay />
        </div>
      </td>
      <td className="thumb-cardbody">
        <CardBody className='p-50'> <center id={props.id} >{props.fname}</center> </CardBody>
      </td>
      <td className="thumb-checkbox-wrap">
        <div className="top">
          {onHover || true ? <OnHoverOption src={/* checkBackgroundImage.current ? checkBackgroundImage.current.style.backgroundImage :  */props.src}
            id={props.imgId}
            fibName={props.fname}
            di_state={props.di_state}
            setreRender={props.setreRender}
            reRender={props.reRender}
            features={props.features}
            setonHover={setonHover}
            props={props}
            orderbyref={props.orderbyref}
            designList={props.designList}
            orderbycountref={props.orderbycountref}
            designCode={props.designCode}
            Q3drenderpluginURL={props.Q3drenderpluginURL} products={props.products}
            mainTDS={props.mainTDS} loaderRef={props.loaderRef} isq3dlite={props.isq3dlite}
            setSelect={props.setSelect} select={props.select} setSelectedPage={props.setSelectedPage}
            selectedPage={props.selectedPage} access={props.access} supplierref={props.supplierref}
          /> : ''}
        </div>
      </td>
    </tr>


  )
}

//! Looping IMG-Box
const ImgLooped = ({ designList, setreRender, reRender, check, setCheck, select, setSelect, orderbyref, orderbycountref, Q3drenderpluginURL, products, mainTDS, loaderRef, setSelectedPage, selectedPage, access, supplierref }) => {
  return (
    <>
      {
        designList && Object.keys(designList).length === 0 ? <></> : designList?.designMaster.map((e, k) => {
          const src = encodeURI(`${e.imageUrl}`)

          //const src = e.imageUrl
          const localSrc = encodeURI(`${e.localUrl}`)
          return <ImgBox key={k} counter={k}
            id={`design-thum-${k}`} src={src} localSrc={localSrc}
            fname={e.designName} imgId={e.designId} designSize={e.designSize} di_state={e.state}
            features={e.features} setreRender={setreRender}
            reRender={reRender} check={check} setCheck={setCheck} select={select} setSelect={setSelect}
            orderbyref={orderbyref} designList={designList} orderbycountref={orderbycountref} designCode={e.designCode}
            Q3drenderpluginURL={Q3drenderpluginURL} products={products} mainTDS={mainTDS} loaderRef={loaderRef}
            isq3dlite={e.isDrapingpathExist} setSelectedPage={setSelectedPage} selectedPage={selectedPage} access={access} supplierref={supplierref}
          />
        })
      }
    </>
  )
}
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
const ImgGrid = (p) => {
  const [Del, setDel] = useState(false)
  const deltoggle = () => setDel(!Del)
  const ability = useContext(AbilityContext)
  const [check, setCheck] = useState({ allselect: false, page: {} })
  const [count, setcount] = useState(0)
  const TDSRef = useRef(null)
  //when page 1st time load Weekly() method call by default
  useEffect(() => {
    Weekly()
  }, [])
  useEffect(() => {
    const OrgId = localStorage.userData ? JSON.parse(localStorage.userData)?.organisationId : null
    if (OrgId && p.Q3drenderpluginURL) {
      $(document).ready(function () {
        // mainTDS
        TDSRef.current = $('#suit1').TDS_Q3D({
          ServiceUrl: p.Q3drenderpluginURL, //"https://api.dam3d.in/tdst/pms_q3d", // add serviceUrl https://service.dam3d.in/Services/tdst/pms_q3d
          Key: undefined, //optional 
          OrganisationId: JSON.parse(localStorage.userData)?.organisationId, //  pass OrganizationId as a string //JSON.parse(localStorage.userData)?.organisationId 
          texture: undefined, // pass Texture then model render directly drape on model texture not pass then pass type:- undefined
          defaultThreeDImage: "", //pass threedImageId not have an Id pass Empty string 
          container: 'suit1', // container should be add in html file pass the ID suit1 (passing name be diferent) 
          twidth: undefined, // if pass the texture then should be pass twidth otherwisw pass Undefind 
          theight: undefined, // if pass the texture then should be pass twidth otherwisw pass Undefind 
          dracoPath: 'draco/', // create folder "darco" containing :- draco_decoder.js, draco_decoder.wasm, draco_encoder.js, draco_wasm_wrapper.js
          isSkinColor: 'rgb(223,185,147)', //  default color
          isShoesColor: 'rgb(0,0,0)', // * default color
          rotationWithPan: false, // if true as boolean data type:-  then rotationwithpan working other then false 
          isQ3d: true, //always true as boolean data type :- other then data not getting
          isRedirect: false, // always false as boolean data type :- otherwise data not getting
          designProductName: undefined, // always undefined 
          isShowProduct: false, //always false as boolean data type :- otherwise data not getting
          productName: 'shirt', // if pass the productName then passing productName data top of the Api Response //newArray
          CursorZoom: false, // if true as boolean data type:-  then CursorZoom working other then false 
          onConfigLoad: (config) => {
            // console.log(config);
          },
          onImageChange: () => {
            //    console.log('3d image changed');
          }
        })
      })
    }
  }, [p.Q3drenderpluginURL])
  const [showCalendar, setShowCalendar] = useState(false)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const calendarRef = useRef(null)

  useClickOutside(calendarRef, () => {
    setShowCalendar(false)
  })

  const handleDateButtonClick = () => {
    setShowCalendar(!showCalendar)
  }

  const handleCalendarClose = () => {
    setShowCalendar(false)
  }
  
  const formatDate = (date) => {
    return date.toLocaleDateString('sv-SE')
  }

  const handleDateRangeChange = async (item) => {

    const startdate = formatDate(item.selection.startDate)
    const enddate = formatDate(item.selection.endDate)

    const payload = {
      StartDate: startdate,
      EndDate: enddate
    }
    setState([item.selection])

    try {
      const response = await axios.post("./Design/GetRenderCount", payload)
      const data = JSON.parse(response.data).totalDrapeCount
      setcount(data)
    } catch (err) {
      console.error(err)
    }
  }
  // Function to show Monthly Rendered count
  // const Monthly = async () => {
  //   const da = new Date()
  //   let cdate = ""
  //   let fdate = ""
  //   if (da.getMonth() + 1 < 10 && da.getDate() < 10) {
  //     cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-0${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 > 10 && da.getDate() >= 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 < 10 && da.getDate() >= 10) {
  //     cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 > 10 && da.getDate() < 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 === 10 && da.getDate() === 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 === 10 && da.getDate() > 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 === 10 && da.getDate() < 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //   }

  //   if (da.getMonth() + 1 < 10) {
  //     fdate = `${da.getFullYear()}-0${da.getMonth() + 1}-0${1}`
  //   }
  //   if (da.getMonth() + 1 > 10) {
  //     fdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${1}`
  //   }
  //   if (da.getMonth() + 1 === 10) {
  //     fdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${1}`
  //   }
  //   const obj = {
  //     StartDate: fdate,
  //     EndDate: cdate
  //   }
  //   await axios.post(`./Design/GetRenderCount`, obj).then(response => {
  //     const data = JSON.parse(response.data).totalDrapeCount
  //     setcount(data)
  //   })
  // }
  // Function to show Yearly Rendered count
  // const Yearly = async () => {
  //   const da = new Date()
  //   let cdate = ""
  //   let fdate = ""

  //   if (da.getMonth() + 1 < 10 && da.getDate() < 10) {
  //     cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-0${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 > 10 && da.getDate() >= 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 < 10 && da.getDate() >= 10) {
  //     cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 > 10 && da.getDate() < 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 === 10 && da.getDate() === 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 === 10 && da.getDate() > 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //   }
  //   if (da.getMonth() + 1 === 10 && da.getDate() < 10) {
  //     cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //   }
  //   fdate = `${da.getFullYear()}-0${1}-0${1}`
  //   const obj = {
  //     StartDate: fdate,
  //     EndDate: cdate
  //   }
  //   await axios.post(`./Design/GetRenderCount`, obj).then(response => {
  //     const data = JSON.parse(response.data).totalDrapeCount
  //     setcount(data)
  //   })
  // }
  //Function to show Weekly Rendered count
  // const Weekly = async () => {
  //   const da = new Date()
  //   let cdate = ""
  //   let fdate = ""
  //   cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //   fdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate() - 6}`
  //   const newDate = da.getDate() - 6
  //   if (newDate <= 0) {

  //     const currentDate = new Date()
  //     const sixDaysBefore = new Date(currentDate)

  //     sixDaysBefore.setDate(currentDate.getDate() - 6)
  //     while (sixDaysBefore > currentDate) {
  //       sixDaysBefore.setDate(sixDaysBefore.getDate() - 1)
  //     }

  //     fdate = `${sixDaysBefore.getFullYear()}-${sixDaysBefore.getMonth() + 1}-${sixDaysBefore.getDate()}`
  //     //Current Date
  //     if (da.getMonth() + 1 < 10 && da.getDate() < 10) {
  //       cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-0${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 > 10 && da.getDate() >= 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 < 10 && da.getDate() >= 10) {
  //       cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 > 10 && da.getDate() < 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 === 10 && da.getDate() === 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 === 10 && da.getDate() > 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 === 10 && da.getDate() < 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //     }
  //     //First Date
  //     if (sixDaysBefore.getMonth() + 1 < 10 && sixDaysBefore.getDate() < 10) {
  //       fdate = `${sixDaysBefore.getFullYear()}-0${sixDaysBefore.getMonth() + 1}-0${sixDaysBefore.getDate()}`
  //     }
  //     if (sixDaysBefore.getMonth() + 1 > 10 && sixDaysBefore.getDate() >= 10) {
  //       fdate = `${sixDaysBefore.getFullYear()}-${sixDaysBefore.getMonth() + 1}-${sixDaysBefore.getDate()}`
  //     }
  //     if (sixDaysBefore.getMonth() + 1 < 10 && sixDaysBefore.getDate() >= 10) {
  //       fdate = `${sixDaysBefore.getFullYear()}-0${sixDaysBefore.getMonth() + 1}-${sixDaysBefore.getDate()}`
  //     }
  //     if (sixDaysBefore.getMonth() + 1 > 10 && sixDaysBefore.getDate() < 10) {
  //       fdate = `${sixDaysBefore.getFullYear()}-${sixDaysBefore.getMonth() + 1}-0${sixDaysBefore.getDate()}`
  //     }
  //     if (sixDaysBefore.getMonth() + 1 === 10 && sixDaysBefore.getDate() === 10) {
  //       fdate = `${sixDaysBefore.getFullYear()}-${sixDaysBefore.getMonth() + 1}-${sixDaysBefore.getDate()}`
  //     }
  //     if (sixDaysBefore.getMonth() + 1 === 10 && sixDaysBefore.getDate() > 10) {
  //       fdate = `${sixDaysBefore.getFullYear()}-${sixDaysBefore.getMonth() + 1}-${sixDaysBefore.getDate()}`
  //     }
  //     if (sixDaysBefore.getMonth() + 1 === 10 && sixDaysBefore.getDate() < 10) {
  //       fdate = `${sixDaysBefore.getFullYear()}-${sixDaysBefore.getMonth() + 1}-0${sixDaysBefore.getDate()}`
  //     }
  //   } else {
  //     //Current Date
  //     if (da.getMonth() + 1 < 10 && da.getDate() < 10) {
  //       cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-0${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 > 10 && da.getDate() >= 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 < 10 && da.getDate() >= 10) {
  //       cdate = `${da.getFullYear()}-0${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 > 10 && da.getDate() < 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 === 10 && da.getDate() === 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 === 10 && da.getDate() > 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate()}`
  //     }
  //     if (da.getMonth() + 1 === 10 && da.getDate() < 10) {
  //       cdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate()}`
  //     }
  //     //First Date
  //     if (da.getMonth() + 1 < 10 && newDate < 10) {
  //       fdate = `${da.getFullYear()}-0${da.getMonth() + 1}-0${da.getDate() - 6}`
  //     }
  //     if (da.getMonth() + 1 > 10 && newDate >= 10) {
  //       fdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate() - 6}`
  //     }
  //     if (da.getMonth() + 1 < 10 && newDate >= 10) {
  //       fdate = `${da.getFullYear()}-0${da.getMonth() + 1}-${da.getDate() - 6}`
  //     }
  //     if (da.getMonth() + 1 > 10 && newDate < 10) {
  //       fdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate() - 6}`
  //     }
  //     if (da.getMonth() + 1 === 10 && newDate === 10) {
  //       fdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate() - 6}`
  //     }
  //     if (da.getMonth() + 1 === 10 && newDate < 10) {
  //       fdate = `${da.getFullYear()}-${da.getMonth() + 1}-0${da.getDate() - 6}`
  //     }
  //     if (da.getMonth() + 1 === 10 && newDate > 10) {
  //       fdate = `${da.getFullYear()}-${da.getMonth() + 1}-${da.getDate() - 6}`
  //     }
  //   }
  //   const obj = {
  //     StartDate: fdate,
  //     EndDate: cdate
  //   }
  //   await axios.post(`./Design/GetRenderCount`, obj).then(response => {
  //     const data = JSON.parse(response.data).totalDrapeCount
  //     setcount(data)
  //   })
  // }

  const Monthly = async () => {
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)

    const obj = {
      StartDate: firstDay.toLocaleDateString('sv-SE'),
      EndDate: today.toLocaleDateString('sv-SE')
    }

    const response = await axios.post("./Design/GetRenderCount", obj)
    const data = JSON.parse(response.data).totalDrapeCount
    setcount(data)
  }

  const Yearly = async () => {
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), 0, 1)

    const obj = {
      StartDate: firstDay.toLocaleDateString('sv-SE'),
      EndDate: today.toLocaleDateString('sv-SE')
    }

    const response = await axios.post("./Design/GetRenderCount", obj)
    const data = JSON.parse(response.data).totalDrapeCount
    setcount(data)
  }

  const Weekly = async () => {
    const today = new Date()
    const start = new Date()
    start.setDate(today.getDate() - 6)

    const obj = {
      StartDate: start.toLocaleDateString('sv-SE'),
      EndDate: today.toLocaleDateString('sv-SE')
    }

    const response = await axios.post("./Design/GetRenderCount", obj)
    const data = JSON.parse(response.data).totalDrapeCount
    setcount(data)
  }
  return (
    <>
      <div className="position-static ecommerce-application" >
        <div className='list-gridview pt-1 pb-1 d-block position-relative'>
          &nbsp; &nbsp; &nbsp;
          <div style={{ float: "left", padding: "0px", paddingTop: "0px", paddingRight: "0px", fontWeight: "700", fontSize: "1.2rem" }}> <span className="d_count">Total  {(p?.designList?.totalCount !== null || p?.designList?.totalCount !== undefined) ? p?.designList?.totalCount : ''}&nbsp;</span> | </div>
          {(ability.can('display', 'Design') || ability.can('show', 'Design')) && <button
            type="button"
            onClick={deltoggle}
            id="delete_design_btn"
            className="btn btn-sm waves-effect waves-light fields"
            title="Delete"
            data-original-title="Delete Design" style={{ padding: "2px" }}
          >


            <i className="fas fa-trash-alt mr-50" style={{ fontSize: "1.4rem", float: "left" }} >
              <DeletePopUp orderbycountref={p.orderbycountref} orderbyref={p.orderbyref} modal={Del} setDel={setDel} toggle={deltoggle} setreRender={p.setreRender} reRender={p.reRender} designCode={p.designCode} loaderRef={p.loaderRef} supplierref={p.supplierref} />
            </i>
            <span style={{ display: "inline-block", marginTop: "4.5px", padding: "2px" }} >  Delete Selected </span>
          </button>

          }

          <div style={{ display: "inline", padding: "4px", paddingTop: "2px", paddingRight: "4px", top: "4px", position: "relative" }} className="fields"> | &nbsp; Selected Count  <span id='count'> 0 </span> </div>


          <div className="design_all_selection">
            <div className='renderedReport'>
              {p.access.current !== null && p.access.current["444449"] && !p.access.current["444449"]["227789"] && <div className='d-flex align-items-center mr-2 jutify-content-center'>
                <h6 className='mt-50'>Rendered Count - </h6>
                <div style={{ fontSize: "1.2rem", fontWeight: "700" }} className='mx-1'>{count}</div>
                <div className='demo-inline-spacing'>
                  <CustomInput className='mt-0' type='radio' id='exampleCustomRadio' name='customRadio' inline label='Weekly' defaultChecked
                    onChange={() => {
                      Weekly()
                    }}
                  />
                  <CustomInput className='mt-0' type='radio' id='exampleCustomRadio2' name='customRadio' inline label='Monthly'
                    onChange={() => {
                      Monthly()
                    }}
                  />
                  <CustomInput className='mt-0' type='radio' id='exampleCustomRadio3' name='customRadio' inline label='Yearly'
                    onChange={() => {
                      Yearly()
                    }}
                  />
                  <CustomInput className='mt-0' type='radio' id='exampleCustomRadio3' name='customRadio' inline label='Date' onClick={handleDateButtonClick} />

                  {/* <button onClick={handleDateButtonClick}>Date</button> */}
                  {showCalendar && (
                    <div ref={calendarRef} className="showDatePicker">
                      <DateRangePicker
                        onChange={handleDateRangeChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={state}
                        direction="horizontal"
                        preventSnapRefocus={true}
                        calendarFocus="backwards"
                        onClose={handleCalendarClose}
                      />
                    </div>
                  )}


                </div>
              </div>}

            </div>

            {/* p.access.current !== null && p.access.current["444449"] && !p.access.current["444449"]["227789"] && ability.can('display', 'Design')  */}
            {(ability.can('display', 'Design') || ability.can('show', 'Design')) && <div className="d-flex mr-1">
              <div className='custom-control custom-checkbox ' style={{ marginRight: "0.5rem" }}>
                <Form>
                  <Input type='checkbox' id="page" name="ab" className='custom-control-input '
                    defaultChecked={false}
                    onChange={(e) => {
                      selection.setSelectAll(e.target.checked, p.designList, document.querySelector(".pagination .active").textContent)
                    }
                    }
                  />
                  <label for="xx" className='custom-control-label' />
                </Form>
              </div>
              <span style={{ margin: "3px" }}> Select Page </span>
            </div>}

            <div className="d-flex fields">
              {/* <div className='custom-control custom-checkbox' style={{ marginRight: "0.5rem"}} >
      <Form>
                      <Input type='checkbox' id="pageb" name="ac" className='custom-control-input ' 
                       checked={false}
                       onChange = {(e) => { 
                        selection.setSelectAll(false, p.designList)
                        selection.reMoveAll()
                      //   const isAllSearch = true
                      //   p.setSelectedPage(0)
                      //   let IsName = ""
                      //   if (p.orderbyref.current.value === "Name") {
                      //   IsName = true
                      //   } else {
                      //  IsName = false
                      //   }
                      //  searchHandel(p, undefined, isAllSearch, undefined, undefined, undefined, IsName)
                      }
                       }
                       />
                      <label for="xx" className='custom-control-label' />
                      </Form>
        </div> */}
              <div onClick={(e) => {
                selection.setSelectAll(false, p.designList)
                selection.reMoveAll()
              }
              }>
                <i class="fa fa-times" role='button' style={{ fontSize: "1.4rem", float: "left", marginTop: "0.2rem", marginRight: "0.25rem" }}></i>
                <span className="clear_desigen" style={{ margin: "4px", cursor: "pointer", lineHeight: "1.8rem" }} > Clear All  </span>
              </div>
            </div>

          </div>
        </div>
        <CardBody className="p-0">
          <div className="position-static ecommerce-application designthumbview" >

            <Table className=''>
              <thead className={classnames({
                'grid-view': p.activeView === 'grid',
                'list-view': p.activeView === 'list'
              })}>
                <tr>
                  <th></th>
                  <th>Sr.No.</th>
                  <th>Fabric </th>
                  <th>Fabric Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className={classnames({
                'grid-view': p.activeView === 'grid',
                'list-view': p.activeView === 'list'
              })}>
                <ImgLooped setreRender={p.setreRender}
                  designList={p.designList}
                  reRender={p.reRender} check={check} setCheck={setCheck} select={p.select} setSelect={p.setSelect} orderbyref={p.orderbyref} access={p.access} supplierref={p.supplierref}
                  orderbycountref={p.orderbycountref} Q3drenderpluginURL={p.Q3drenderpluginURL} products={p.products} mainTDS={TDSRef.current} loaderRef={p.loaderRef} setSelectedPage={p.setSelectedPage} selectedPage={p.selectedPage} />
              </tbody>
            </Table>
          </div>

        </CardBody>
        <CustomPagination setDesignList={p.setDesignList} totalCountfab={p.designList.totalCount} prerender={p.reRender} tempsearchValue={p.tempsearchValue}
          setSelectedPage={p.setSelectedPage}
          selectedPage={p.selectedPage}
          supplierref={p.supplierref}
          setSelect={p.setSelect} select={p.select} setCheck={setCheck} check={check} orderbyref={p.orderbyref} orderbycountref={p.orderbycountref}
          loaderRef={p.loaderRef}
        />
      </div>
    </>
  )
}

export default ImgGrid

