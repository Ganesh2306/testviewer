import { Fragment, useRef } from 'react'
import * as Icon from 'react-feather'
import { searchTemplate } from '../design/designview/Sidebar'
import { Card, CardBody, NavLink, NavItem } from 'reactstrap'
import { ArrowLeft } from 'react-feather'
import '../FullDesignView/css/fullview.css'
import '@styles/base/pages/app-ecommerce.scss'
import DesignOpenView from '../FullDesignView/viewcomponent/DesignOpenView'
import DesignDetails from '../FullDesignView/viewcomponent/DesignDetails'
import BottomDesignScroll from '../FullDesignView/viewcomponent/BottomDesignScroll'
import themeConfig from '@configs/themeConfig'
import '@styles/base/pages/app-ecommerce-details.scss'

require("./css/view3dmodelRuler.css")
let reRender
const DesignView = (props) => {
    const { setPoc, poc, setSearchobj } = props
    reRender = [setPoc, poc, setSearchobj]
    const hadnDelete = () => {
        props.setFileImage(null)
        props.fileImageRef.current = null
        reRender[0](!reRender[1])
        if (props.positionFilter.current) {
            props.positionFilter.current.id = 'noLeftImg'
            document.getElementsByClassName("thumbnailsHeight")[0].style.height = "669px"
        }
    }
    return (
        <>
            <div className='header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center navbar navbar-expand-lg' id='fullview_back_page' >
                <div className='navbar-container d-flex content'>
                    <ul className='nav navbar-nav' id="fullback" onClick={(e) => {
                        window?.resetAnimation()
                        props.backbuttonRef.current = true
                        //alert('cliked')
                    }}>
                        <NavItem key="collection" className='d-block' onClick={() => {

                            if (props.NaveRef.fullv && props.NaveRef.mainv) {
                                props.rmovePluginObject()
                                props.NaveRef.fullv.current.style.display = 'none'
                                props.NaveRef.mainv.current.style.display = 'block'
                            }
                        }}>  {props.AIsearchref.current === true ? (
                            <button onClick={hadnDelete} className="btn-icon" style={{ border: "transparent", backgroundColor: 'white' }}>
                                <ArrowLeft />
                                Back
                            </button>
                        ) : (
                            <NavLink id="brand-in-page" className='d-flex cursor'>
                                <Icon.ArrowLeft className='ficon d-md-block d-none' size={15} />
                                <Icon.X className='ficon d-md-none d-sm-block' size={15} />
                                <span className='d-md-block d-none ml-50'>Back</span>
                            </NavLink>
                        )}

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
            </div>
            <Fragment>
                <div className='app-ecommerce-details fullmain' style={{
                }}>
                    <Card className='border-0 dthemeCard'>
                        <div className='columnA'>
                            <CardBody className='p-0 m-0 border-0  '>
                                <DesignOpenView
                                    toggalDesignView={props.toggalDesignView}
                                    View3dPlugin={props.View3dPlugin}
                                    PluginModel={props.PluginModel}
                                    setActiveImageData={props.setActiveImageData}
                                    designMaster={props.imgDataForDetail ? props.imgDataForDetail.designMaster : []} />
                            </CardBody>
                            <DesignDetails
                                View3dPlugin={props.View3dPlugin} PluginModel={props.PluginModel} setActiveImageData={props.setActiveImageData}
                                selectedImgDataForDetail={props.selectedImgDataForDetail} designMaster={props.imgDataForDetail.designMaster} />

                        </div>
                        <div className='columnB'>
                            <CardBody className='column_b'>
                                <BottomDesignScroll toggalDesignView={props.toggalDesignView}
                                    View3dPlugin={props.View3dPlugin} PluginModel={props.PluginModel}
                                    setActiveImageData={props.setActiveImageData}
                                    selectedImgDataForDetail={props.selectedImgDataForDetail}
                                    designMaster={props.imgDataForDetail.designMaster}
                                    setBoardSelected={props.setBoardSelected}
                                    SearchObj={props.SearchObj}
                                    searchDesignByPagination={props.searchDesignByPagination}
                                    backbuttonRef={props.backbuttonRef}
                                />
                            </CardBody>
                        </div>
                    </Card>

                </div>

            </Fragment>
        </>
    )
}
export default DesignView
