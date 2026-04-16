import React, { useState } from "react"
// ** Store & Actions
// ** Custom Components
// ** Third Party Components
// ** Third Party Components
import { ShoppingCart, Heart, Codesandbox } from 'react-feather'
import { Card, Button } from 'reactstrap'
import { ModalSaveWishlist } from '../../popups/ModalSaveWishlist'
import { ModalSaveInCollection } from '../../popups/ModalSaveInCollection'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const DesignOpenView = ({toggalDesignView, View3dPlugin, PluginModel, setActiveImageData, designMaster}) => {
    const [iconstate, seticonActive] = useState(false)
    return ( 
        <Card id='mainZoomdiv' className='design_open_view p-0 m-0 dthemeCard'>
            <div className="icon-wrap" style={{display:"none"}}>
                <ModalSaveWishlist editHeaderName="Create / Save Wishlist" wishicon={
                    <Button className='iconthumb iconstate btn-wishlist '
                        color='light'><Heart
                            size={18}
                        /></Button>} />
                <Button
                    color='light'
                    onClick={() => {
                        iconstate ? seticonActive(false) : seticonActive(true)
                    }}
                    className={iconstate ? "iconthumb btn-wishlist iconstate active" : "iconthumb btn-wishlist iconstate"}
                >
                    <ShoppingCart
                        size={18}
                    />
                </Button>
               
                <ModalSaveInCollection />
                <hr className='text-black' />
                <div>
                    <Button className='iconthumb btn btn-primary' 
                        color='light'
                    >
                        <Codesandbox
                            size={18}
                        />
                    </Button>
                </div>
            </div>
              <div className ="coll_plugin" style={{ display:"none", backgroundImage:'url("https://res.cloudinary.com/tdscloudcdn/TEXTRONICS_ARCHIVE_DEMO/689455444042/304681266431//YAMA-D600-(9)t.jpg")' }}>                
              </div>
        </Card>
    )
}
export default DesignOpenView
