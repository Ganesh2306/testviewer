import React, { useState } from "react"

import { Card } from 'reactstrap'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const DesignOpenView = (props) => {
    const [iconstate, seticonActive] = useState(false)
    return ( 
        <Card id='mainZoomdiv'  className='design_open_view p-0 m-0 ffffff'  
                                View3dPlugin={props.View3dPlugin} PluginModel={props.PluginModel}
                                setActiveImageData={props.setActiveImageData}
                                selectedImgDataForDetail={props.selectedImgDataForDetail}                               
        >  
                      
        </Card>
    )
}
export default DesignOpenView
