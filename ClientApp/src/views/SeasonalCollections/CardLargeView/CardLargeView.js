// ** React Imports
import React, { useState, useRef, Fragment } from 'react'
import { useHistory } from 'react-router-dom'

import CardGallery from '../CardLargeView/Component/CardGallery'
import "./../css/seasonspage.css"
import '@styles/base/pages/app-ecommerce.scss'
import '@styles/react/apps/app-email.scss'
import './../css/card.scss'
import 'swiper/swiper.scss'
import 'swiper/components/effect-coverflow/effect-coverflow.scss'

const CardLargeView = (props) => {
    const card = useRef(null)
    const history = useHistory()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <Fragment>
            <div className=''>
                <div className="ecommerce-application myseasons">
                    {/*<div>This is bookview</div>*/}
                 
                    <CardGallery thumbimagedata={props.cards} firstpage={props.firstpage} pages={props.pages} lastpage={props.lastpage} cardref={card} setBoardSelected={props.setBoardSelected}
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
                    />
                    </div>
            </div>
        </Fragment>
    )
}
export default CardLargeView
