import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
// ** Store & Actions
// ** Custom Components
// ** Third Party Components
import * as Icon from 'react-feather'
import { Card, CardBody, NavLink, NavItem } from 'reactstrap'
import { NaveRef } from '../SeasonBook'

import './css/fullview.css'
import '@styles/base/pages/app-ecommerce.scss'

import DesignOpenView from './viewcomponent/DesignOpenView'
import DesignDetails from './viewcomponent/DesignDetails'
import BottomDesignScroll from './viewcomponent/BottomDesignScroll'
import themeConfig from '@configs/themeConfig'
// ** Styles
import '@styles/base/pages/app-ecommerce-details.scss'

require("./css/view3dmodelRuler.css")
const DesignView = (props) => {
    return (
        <>
         <div className='header-navbar navbar-fixed align-items-center navbar-shadow navbar-brand-center navbar navbar-expand-lg' id='fullview_back_page' >
            <div className='navbar-container d-flex content'>
            <ul className='nav navbar-nav pt-50'> 
                <NavItem key="collection" className='d-block' onClick={() => {
                 if (NaveRef.fullv && NaveRef.mainv) {
                    NaveRef.fullv.current.style.display = 'none'
                    NaveRef.mainv.current.style.display = 'block'
                }
                }}>         
                        <NavLink id="brand-in-page" >                
                            <span>
                            <Icon.ArrowLeft className='ficon mr-50' size={15}/>
                            Back
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
        </div>
        <Fragment>
                <div className='app-ecommerce-details fullmain' style={{
                    // marginBottom: '15vh'
                }}>
                    <Card className='border-0 dthemeCard'>
                        <div className='columnA'>
                            <CardBody className='p-0 m-0'>
                                <DesignOpenView
                                    toggalDesignView={props.toggalDesignView}
                                    View3dPlugin={props.View3dPlugin}
                                    PluginModel={props.PluginModel}
                                    setActiveImageData={props.setActiveImageData}
                                    designMaster={props.imgDataForDetail ? props.imgDataForDetail.designMaster : []} />
                            </CardBody>
                            <DesignDetails
                                View3dPlugin={props.View3dPlugin} PluginModel={props.PluginModel}
                                selectedImgDataForDetail={props.selectedImgDataForDetail} />
                        </div>
                        <div className='columnB'>
                            <CardBody className=''>
                                <BottomDesignScroll toggalDesignView={props.toggalDesignView}
                                    View3dPlugin={props.View3dPlugin} PluginModel={props.PluginModel}
                                    setActiveImageData={props.setActiveImageData}
                                    selectedImgDataForDetail={props.selectedImgDataForDetail ? props.selectedImgDataForDetail : []}
                                    designMaster={props.imgDataForDetail ? props.imgDataForDetail.designMaster : []} />
                            </CardBody>
                        </div>
                    </Card>
                </div>
            {/* </div> */}
        </Fragment>
        </>
    )
}
export default DesignView
