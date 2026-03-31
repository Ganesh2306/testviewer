import { useState, useEffect, useRef } from "react"
import {
  Button,
  CardBody
} from "reactstrap"
import { ChevronDown, Edit, List, Grid } from 'react-feather'
import { Icon } from '@iconify/react'
import tshirtCrewOutline from '@iconify/icons-mdi/tshirt-crew-outline'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { UploadDesign } from './popup/UploadDesign'
import { DeletePopUp, QrPopUp } from './popup/DeletePopUp'
import { FibricInfo } from './popup/FibricInfo'
import {  ImgColumn } from './data'
import axios from 'axios'
import '../design.css'
import { getQRbase64 } from './Utility/Utility'
import { selection } from "./Utility/selection"
import { searchHandel } from '../DesignComponent/TopBar'

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
//!Image Grid View
 //! Image Table View
const Table = ({designList}) => {
    const arr = []
    const [ctrlKey, setCtrlKey] = useState()
      if (designList && designList.designMaster !== undefined) {
       //p.designList.designMaster
       for (let i = 0; i < designList.designMaster.length; i++) {
           const e = designList.designMaster[i]
           const obj = {}
           obj.uid = e.designId
           obj.features = JSON.stringify(e.features)
           obj.id = i + 1 
           obj.src = encodeURI(`${e.imageUrl}`)
           obj.name = e.designCode//e.split('/')[e.split('/').length - 1].split('t.')[0]
           arr.push(obj)            
       }   
      }

      return (
          <DataTable
            noHeader
            nopagination
            paginationServer
            className='react-dataTable'
            columns={ ImgColumn }         
            sortIcon={<ChevronDown size={10} />}         
            data={arr}
            
          />
          
      )
  } 

const CustomPagination = ({setDesignList, totalCountfab, prerender}) => {
    const [parPage, setparPage] = useState(15)
    const [selectedPage, setSelectedPage] = useState(0)
    const handlePagination = page => {  
        setSelectedPage(page.selected)
        const start = page.selected === 0 ? 0 : page.selected * parPage
        const end = parPage + start
        searchHandel({setDesignList}, undefined, true, start, end)      
    }
    const count = Math.ceil(totalCountfab / parPage)
    useEffect(() => {
        setSelectedPage(0)
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
              //forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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

const OnHoverOption = ({src, id, fibName, setreRender, reRender, features, setonHover, props}) => {
  const [Del, setDel] = useState(false)
  const deltoggle = () => setDel(!Del)
  const [showqr, setshowqr] = useState(false)
  const toogleqr = () => setshowqr(!showqr)
  const [editmodal, seteditModal] = useState(false)
    const [QR, setQR] = useState(getQRbase64(`${selection.Q3dURL}?k=${selection.userId}&t=${fibName}`))
    const edittoggle = () => seteditModal(!editmodal)
    const [seasonid, setseasonId] = useState(null)
    const [collectionId, setcollectionId] = useState(null)
    
  return (
      <div className="icon-wrap">
      <div className= "iconstop" style={{float:'left', zIndex:'9'}}>
       <Button className="iconthumb" color='light'   title="Edit" >            
              <Edit role='button'  onClick={() => {
                  edittoggle()
              }} />
             <UploadDesign setreRender={setreRender} 
             reRender={reRender} check={props} 
             modal={editmodal} uid={id} 
             toggle={edittoggle} src={src} fibName={fibName} 
             HovFun={setonHover} features={features} />
        </Button>


      <Button className="iconthumb" color='light' title="Q3D" id='' onClick={() => {                                
                                toogleqr()
                            }}>
      <i className="fa fa-qrcode" aria-hidden="true" role='button' ></i>
      </Button>
      <QrPopUp showqr={showqr} toogleqr={toogleqr} src={selection.getQrLink(true)} />   

      <Button className="iconthumb" color='light'   title="Info"> 
      <FibricInfo src={src} HovFun={setonHover} check={props} 
              features={features}
          
             />
      </Button>
              <Button className="iconthumb" color='light' title="Garment" href={`${selection.Q3dURL}?k=${selection.userId}&t=${fibName}`} target="_blank">
       <Icon  icon={tshirtCrewOutline} role='button' />
      </Button>
      <Button className="iconthumb" onClick={async() => {
        setseasonId(document.getElementById("seasonid").value)
        setcollectionId(document.getElementById("collectionId").value)
         deltoggle()
      }} color='light'   title="Remove">                
                  <i className="fa fa-times " aria-hidden="true" role='button' ></i>
      <DeletePopUp All={props} seasonid={seasonid} collectionId={collectionId} fibName={fibName} modal={Del} setDel={seteditModal} toggle={deltoggle} 
      id={id} setreRender={setreRender} reRender={reRender} />
      </Button>                
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
const WrapImg = ({ wrapProps }) => {
    const props = wrapProps
    const myref = useRef(null)
    window.getref = myref
    const [update, setUpdate] = useState({ err: false, rr: false })
    const [err, setErr] = useState(false)
    const [src, setSrc] = useState(props.src)
    useEffect(() => {
        if (update.err) {
            setSrc(props.localSrc)
            setUpdate(e => {
                return { err: false, rr: !e.rr }
            })
        } else {
            setSrc(props.src)
        }
        return () => {
            setUpdate({ err: false, rr: false })
        }
    }, [err])
    const handleError = () => {
        setUpdate(e => {
            return { err: true, rr: e.rr }
        })
        setErr(e => !e)
    }
    return (
        <div ref={myref}
            className='item-img text-center mx-auto position-relative p-0 w-100' style={{ backgroundImage: `url("${src}")` }}>
            <img src={src} onError={handleError} style={{ display: 'none' }} />
            <div className="top">
                <OnHoverOption src={src}
                    id={props.imgId}
                    fibName={props.fname}
                    setreRender={props.setreRender}
                    reRender={props.reRender}
                    features={props.features}
                    props={props}
                />
            </div>
            <ColourWay />
        </div>
    )
}

const ImgBox = (props) => {
    const [onHover, setonHover] = useState(false)
    const [src, setSrc] = useState(props.src)
    const [Features, setFeatures] = useState()
    const checkBackgroundImage = useRef(null)
    const handleError = (e) => {
        if (e.currentTarget.src !== props.localSrc && checkBackgroundImage.current) {
          checkBackgroundImage.current.style.backgroundImage = `url("${props.localSrc}")`
          e.currentTarget.src = props.localSrc
        }
      }
    useEffect(() => {
        setFeatures(props.features)
    })
    const divstyle = selection.slected[props.imgId] ? "ecommerce-card card mb-2 rounded-0 thumbselectDesign" : "ecommerce-card card mb-2 rounded-0"
    return (
      <div key={`c-${props.imgId}`} id={props.id} 
      designid={props.imgId} 
      className={divstyle}
      onClick={(e) => {       
      selection.showSelected({ id: props.imgId, name: props.fname, imgUrl: checkBackgroundImage.current ? checkBackgroundImage.current.style.backgroundImage : props.src, features: Features, designSize: props.designSize, ctrlKey: e.ctrlKey })
      }}
      >
  <div ref={checkBackgroundImage} className='item-img text-center mx-auto position-relative p-0 w-100' style = {{ backgroundImage:`url("${props.src}")`}}> 
  <div className="top">
               {onHover || true ? <OnHoverOption src={/*checkBackgroundImage.current ? checkBackgroundImage.current.style.backgroundImage :*/ props.src} 
               id={props.imgId}  
               fibName={props.fname} 
               setreRender={props.setreRender}
               reRender={props.reRender}
               features ={props.features}
               setonHover= {setonHover}
               props={props}
               /> : ''} 
   </div>
              <ColourWay />
      
  </div>
  <img src={props.src} onError={(event) => handleError(event)} style={{ display: 'none' }} />
  <CardBody className='p-50'> <center id={props.id} >{props.fname}</center> </CardBody>  
      </div>
  )
}

//! Looping IMG-Box
const ImgLooped = ({designList, setreRender, reRender}) => {

  return (
      <>             
          {  
  designList && Object.keys(designList).length === 0 ? <></> : designList?.designMaster.map((e, k) => {
      const src = encodeURI(`${e.imageUrl}`)
      const localSrc = encodeURI(`${e.localUrl}`)
      return <ImgBox key={e.designId} counter={k}
      id={`design-thum-${k}`} src={src} localSrc={localSrc}
      fname={e.designName} imgId={e.designId} designSize={e.designSize}
      features={e.features} setreRender={setreRender}
      reRender={reRender}/>
      })
      }
      </>   
  )
}

const ImgGrid = (p) => {
    const [Del, setDel] = useState(false)
    const deltoggle = () => setDel(!Del)
    const [seasonid, setseasonId] = useState(null)
    const [collectionId, setcollectionId] = useState(null)

    return  (    
        <>
            <div className="position-static ecommerce-application" >
                <div className='list-gridview pt-1 d-block'>

                    <List onClick={() => {
                        p.setImgViewToggle(false)
                    }} color={p.ImgViewToggle ? '#423F3E' : `#CF0000`} size={28} style={{ float: "right", padding: "6px", cursor: "pointer", paddingTop: "0" }} />
                    <Grid color={p.ImgViewToggle ? '#CF0000' : `#423F3E`} size={28} onClick={() => {
                        p.setImgViewToggle(true)
                    }} style={{ float: "right", padding: "6px", cursor: "pointer", paddingTop: "0" }} />
                    &nbsp; &nbsp; &nbsp;
                    <div style={{ float: "left", padding: "4px", paddingTop: "2px", paddingRight: "4px" }}> Total  {(p?.designList?.totalCount !== null || p?.designList?.totalCount !== undefined) ? p?.designList?.totalCount : ''} &nbsp; | </div>
                    <button
                        type="button"
                        //onClick={deltoggle}
                        onClick={async() => {
                            setseasonId(document.getElementById("seasonid").value)
                            setcollectionId(document.getElementById("collectionId").value)
                            deltoggle()
                         }}
                        id="delete_design_btn"
                        className="btn btn-sm waves-effect waves-light"
                        title="Delete"
                        data-original-title="Delete Design" style={{ padding: "2px"}}
                    >
                        <i className="fas fa-trash-alt mr-50" style={{ fontSize: "0.9rem" }} >
                        <DeletePopUp modal={Del} seasonid={seasonid} collectionId={collectionId} setDel={setDel} toggle={deltoggle} setreRender={p.setreRender} reRender={p.reRender} />
                        </i>
                        Remove Selected
                    </button>
                </div>
               <CardBody className="p-0"> 
               {
                        (p.ImgViewToggle) ? <div className ='grid-view p-0'><ImgLooped  setreRender={p.setreRender}
                designList={p.designList} 
               reRender={p.reRender} /> </div> : <Table setreRender={p.setreRender} 
               reRender={p.reRender} designList={p.designList}  />
                }        
                </CardBody>
                <CustomPagination setDesignList={p.setDesignList} totalCountfab={p.designList.totalCount} prerender={p.reRender}/>
            </div>
        </>
    )
}

export default ImgGrid
