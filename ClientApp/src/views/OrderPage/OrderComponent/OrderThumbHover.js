//--------------------------------------------------------------------
//    Function    :-   CartThumbHover  
//    Purpose        :-    Remove Design from Order Form
//    Created        :-    26-06-2023
//    Author        :-    Ui=Manisha-> functionality-Rinku ---Update the person name here who next working on this project 
//--------------------------------------------------------------------

import React, { useState } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import { Trash, MoreVertical } from 'react-feather'
import { Button, Card } from 'reactstrap'
import { ModalSaveWishlist } from "../../popups/ModalSaveWishlist"
import { ModalCreateWishlist } from "../../popups/ModalCreateWishlist"
 const Favhoverbox = (props) => {
    const [is_open, setis_open] = useState(false)
    const opentoggle = () => setis_open(!is_open)

    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)

    return (
        <Card className="favhover text-white text-left flex-column px-50">
            <div className="arrow-right">              
                <small>{'Save in other Board'}</small>          
                <div className="triangle"></div>
                <div onClick={() => setis_open(true)}><MoreVertical size={18} /></div>
                <ModalSaveWishlist is_open={is_open} setis_open={opentoggle} setis_createopen={setis_createopen} />
                <ModalCreateWishlist is_createopen={is_createopen} setis_createopen={CreateOpentoggle} />
            </div>
        </Card>
    )
} 

const CartThumbHover = (props) => {
    const handleRemove = () => {
const currentData = JSON.parse(sessionStorage.getItem('designMaster')) || []
                            const updatedData = currentData.filter(item => item.designId !== props.id)
                            sessionStorage.setItem('designMaster', JSON.stringify(updatedData))
                            props.setRender(prev => ({
                                ...prev,
                                id: props.id,
                                rerender: !prev.rerender
                            }))
                        }
    //const [iconfavstate, seticonfavActive] = useState(false)
    return (   
             <>               
                <div className="option-hover">                 
                    <div className="icon-wrap"> 
                        <Button className='iconthumb' color='light' onClick={handleRemove}>
                        <Trash size={21}/>
                       </Button>  
                    </div>       
                </div>            
             </>
      )
    }
export default CartThumbHover