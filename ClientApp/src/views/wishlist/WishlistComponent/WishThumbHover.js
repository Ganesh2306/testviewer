import React, { useState } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import { ShoppingCart, X } from 'react-feather'
import { Button, CustomInput } from 'reactstrap'

import '../css/wishlistpage.css'

const WishThumbHover = (props) => {
    const [iconstate, seticonActive] = useState(false)

    return (   
        <div className="option-hover">
            <div className="icon-wrap-check">
                <CustomInput inline type='checkbox' id={props.id} /></div>
                <div className="icon-wrap">                        
                    <Button
                    color='light'
                    onClick={() => {
                        iconstate ? seticonActive(false) : seticonActive(true)
                    }}
                    className={iconstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                    >
                        <ShoppingCart
                        size={18}             
                        />           
                    </Button>   
                    <Button className='iconthumb' color='light'>
                                  <X size={18}/>           
                   </Button>                 
                </div>             
           </div>
      )
    }
export default WishThumbHover

