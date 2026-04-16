import React, { useState } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Third Party Components
import { ShoppingCart, Trash } from 'react-feather'
import { Button, CustomInput } from 'reactstrap'
import { CartSuccessToast } from '../../popups/CartSuccessToast'
import { toast } from 'react-toastify'

import '../css/boardspage.css'

const BoardThumbHover = (props) => {
    const [iconstate, seticonActive] = useState(false)
    const [checked, setChecked] = useState(false)
    const notifySuccess = () => toast.success(<CartSuccessToast />, { hideProgressBar: true })

    return (   
        <div className="option-hover">
            <div className="icon-wrap-check">
                <CustomInput inline type='checkbox'
                    onChange={() =>  setChecked(!checked)}
                    id={props.id} /></div>
                 <div className="icon-wrap">
                     <Button
                    color='light'
                    onClick={() => {
                        if (!iconstate) {
                            notifySuccess()
                        }
                        seticonActive(!iconstate)    
                    }}
                    className={iconstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                    >
                        <ShoppingCart
                        size={18}             
                        />           
                    </Button>   
                    <Button className='iconthumb' color='light'>
                    <Trash size={18}/>
                   </Button>                 
                </div>             
           </div>
      )
    }
export default BoardThumbHover

