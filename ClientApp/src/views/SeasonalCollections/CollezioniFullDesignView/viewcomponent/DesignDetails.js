// ** React Imports
import { useState, useContext } from 'react'
import {  useParams } from 'react-router-dom'
import {
    Row, Col, CardText, Button, Card
} from 'reactstrap'
import { ShoppingCart, FileText, MoreVertical } from 'react-feather'
import '@styles/base/pages/app-ecommerce.scss'
import DesignColorways from './DesignColorways'
import { accessContext } from "../../../context/accessContext"
import { ModalSaveWishlist } from "../../../popups/ModalSaveWishlist"
import { ModalCreateWishlist } from "../../../popups/ModalCreateWishlist"
import { ModalSaveInCollection } from "../../../popups/ModalSaveInCollection"
import { ModalCreateCollection } from "../../../popups/ModalCreateCollection"
//ToDO:- Working on LabelOreder ---
// import { LabelOreder } from '../../design/designview/Sidebar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CartSuccessToast } from '../../../popups/CartSuccessToast'
import { CollectionSuccessToast } from '../../../popups/CollectionSuccessToast'
import { BoardSuccessToast } from '../../../popups/BoardSuccessToast'
import QRCode from 'react-qr-code'


const Favhoverbox = (props) => {
    const [is_open, setis_open] = useState(false)
    const opentoggle = () => setis_open(!is_open)

    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)
    const { is_boarduser } = useContext(accessContext)

    return (
        <>
      {is_boarduser ?  <Card className="favhover designview text-white text-left flex-column px-50" onClick={() => setis_open(true)}>
            <div className="arrow-right">              
                {/* <div className="d-flex justify-content-between mt-50 boardn"> <small className="font-weight-bold">- {'ManishaD'} </small>
                </div> */}
                <small>{'Save in other Board'}</small>
                <div className="triangle"></div>                
                <div ><MoreVertical size={18} /></div>                  
                <ModalSaveWishlist is_open={is_open} setis_open={opentoggle} setis_createopen={setis_createopen} />
                <ModalCreateWishlist is_createopen={is_createopen} setis_createopen={CreateOpentoggle} />
            </div>
        </Card> : <Card className="favhover designview text-white text-left flex-column px-50" onClick={() => setis_open(true)}>
        <div className="arrow-right">              
            {/* <div className="d-flex justify-content-between mt-50 boardn"> <small className="font-weight-bold">- {'ManishaD'} </small>
            </div> */}
            <small>{'Save in Collection'}</small>
            <div className="triangle"></div>                
            <div ><MoreVertical size={18} /></div>                  
                 <ModalSaveInCollection is_open={is_open} setis_open={opentoggle} setis_createopen={setis_createopen} />
                <ModalCreateCollection is_createopen={is_createopen} setis_createopen={CreateOpentoggle} />
        </div>
    </Card> } </>
    )
}

const DesignDetails = (props) => {
    
    // ** Props
    const {View3dPlugin, PluginModel, selectedImgDataForDetail, data, deleteWishlistItem, dispatch, addToWishlist, getProduct, productId, addToCart } = props
    // ** Handle Wishlist item toggle
    // ** State
    const [selectedColor, setSelectedColor] = useState('primary')
    const [iconstate, seticonActive] = useState(false)
    const [is_open, setis_open] = useState(false)
    const opentoggle = () => setis_open(!is_open)
    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)
    const [iconfavstate, seticonfavActive] = useState(false)
    const { access } = useContext(accessContext)
    const { is_boarduser } = useContext(accessContext)
    const { boardId } = useParams()
    const handleWishlist = val => {
        if (val) {
            dispatch(deleteWishlistItem(productId))
        } else {
            dispatch(addToWishlist(productId))
        }
        dispatch(getProduct(productId))
    }
    const QRCodeShape = (props) => {

        const {value} = props
        //const transbg = '#ffffff00'
    
        return (<QRCode
            //title={value ? value : 'default-title'}
            value={value ? value : 'Scan Page-QR'}
            bgColor={'white'}
            fgColor={'black'}
            size={100}
        />)
    }
    const BarCodeShape = (props) => {
        console.log(props.title)
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
    function downloadPDF(pdf) {
        const linkSource = `data:application/pdf;base64,${pdf}`
        const downloadLink = document.createElement("a")
        const fileName = "abc.pdf"
        downloadLink.href = linkSource
        downloadLink.download = fileName
        downloadLink.click()
    }
    const q3dUrl = localStorage.getItem("q3dUrl")
    // ** Handle Move/Add to cart
    const handleCartBtn = (id, val) => {
        if (val === false) {
            dispatch(addToCart(id))
        }
        dispatch(getProduct(productId))
    }
    const notifySuccess = () => toast.success(<CartSuccessToast />, { hideProgressBar: true, autoClose: 2000 })
    const BoardSuccess = () => toast.success(<BoardSuccessToast />, { hideProgressBar: true, autoClose: 2000})
    const CollectionSuccess = () => toast.success(<CollectionSuccessToast />, { hideProgressBar: true, autoClose: 2000 })

    return (
        <div>
            {/* <div className='qrBox  position-absolute' onClick={() => { $(".item-features").toggle(); $(".item-features").css({ "margin-left": "1rem", "margin-top": "8rem" }) }} style={{ marginLeft: '5rem' }} >
                {selectedImgDataForDetail && selectedImgDataForDetail.designCode ? <QRCodeShape value={encodeURI(`${selectedImgDataForDetail && selectedImgDataForDetail.designCode ? selectedImgDataForDetail.q3dUrl : ""}?k=${(JSON.parse(localStorage.userData).org_type_id).toString(16)}&t=${selectedImgDataForDetail && selectedImgDataForDetail.designCode ? props.selectedImgDataForDetail.designCode : 'unknown'}`)} /> : ""}
            </div> */}
            <div className='item-features py-2' style={{ display: 'none' }} >
                <Row className='text-left mx-1'>
                    <Col className='mb-4 mb-md-0' xs='12'>               
                         <h4>Design : {selectedImgDataForDetail && selectedImgDataForDetail.designCode ? selectedImgDataForDetail.designCode : 'unknown'}</h4>                 
                            <ul className='product-features list-unstyled'>                            
                                { access["222229"] && access["222229"]["288889"] && <li onClick={() => {
                                    const obj = {folderId: selectedImgDataForDetail.folderId}
                                    axios.post('./DesignSearch/DownloadDesignSpecification', obj).then(e => {
                                        const data = JSON.parse(e.data)
                                        if (data.designSpecification) {
                                            downloadPDF(data.designSpecification)
                                        } else {
                                            alert(data.message)
                                        }
                                        //console.log(e)
                                    }).catch(e => {
                                        alert(e)
                                    })
                                }} >
                                     <FileText size={19} className ='text-secondary'/>
                                      <span>Download Specifications</span>
                                </li>}
                            </ul>
                            <hr />
                            {/*<div className='product-color-options'>*/}
                            {/*{selectedImgDataForDetail && Object.keys(selectedImgDataForDetail.features).length > 0 ? <h6>Properties</h6> : <></>}*/}
                            {/* </div>*/}
                         
                        <CardText tag='span' className='item-company'>
                            <table>
                                <tbody>
                                {
               /* selectedImgDataForDetail && (Object.entries(selectedImgDataForDetail.features)).map(([key, value]) =>  {
              
                   console.log(selectedImgDataForDetail)
                    return  (<tr key={key}> 
                    <td className='pr-1' key={key}>{key}:</td>
                    <td key={value}>{value}</td>
                    </tr>)
                })  */
                selectedImgDataForDetail && selectedImgDataForDetail.designInfo && Object.keys(selectedImgDataForDetail.designInfo).map((e, k) => {
                return  (<tr key={k}> 
                        <td className='pr-1' >{selectedImgDataForDetail.designInfo[e]}:</td>
                        <td >{selectedImgDataForDetail.features[selectedImgDataForDetail.designInfo[e]]}</td>
                        </tr>)
                })
              }           
                                </tbody>
                            </table>
                        </CardText>
                       
                        <div className='d-flex flex-lg-row flex-md-row flex-sm-column pt-1'>
                           <Button  
                              onClick={() => {
                                if (!iconstate) {
                                    notifySuccess()
                                }
                                seticonActive(!iconstate)    
                            }}                          
                                className='btn-cart mr-0  btn-sm mr-1 mb-1 mb-sm-0'
                                color='primary'    
               
                            > 
                            <ShoppingCart size={14} className="text-white mr-50" />
                              <span>Add to Cart</span>
                            </Button> 
                         </div>
                    </Col>
                </Row>      
                </div>
            <Col className='mb-4 mb-md-0' md='4' xs='12'>
                    <div className='w-95 '>
                        <h4 className='mb-1'>Colorways</h4>
                        <DesignColorways View3dPlugin={View3dPlugin}
                            PluginModel={PluginModel}
                            colorwayDesigns={selectedImgDataForDetail ? selectedImgDataForDetail.colorwayDesigns : []} />
                    </div>
                </Col>
        </div>
     )
}
export default DesignDetails