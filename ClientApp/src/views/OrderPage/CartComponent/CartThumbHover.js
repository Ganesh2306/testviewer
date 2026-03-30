import React, { useState } from "react"
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import { X, Heart, Book, Trash, MoreVertical } from 'react-feather'
import { Button, CustomInput, Card, Badge } from 'reactstrap'
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
                {/* <small>{'Save design in:'}</small>
                <div className="d-flex justify-content-between mt-50 boardn"> <small className="font-weight-bold">- {'Profile'} </small>
                </div> */}
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
    const [iconfavstate, seticonfavActive] = useState(false)
    return (   
             <> 
               <Badge className='bg-success activeboard'>Profile</Badge>
                <div className="option-hover">
                    <div className="icon-wrap-check d-flex "><CustomInput inline type='checkbox' defaultChecked /></div>  
                    <div className="icon-wrap">               
                    < Button
                        color='light'
                        onClick={() => {
                            iconfavstate ? seticonfavActive(false) : seticonfavActive(true)
                        }}
                        className={iconfavstate ? "iconthumb btn-wishlist iconstate active bg-primary" : "iconthumb btn-wishlist iconstate"}
                    >
                        <Book
                            size={18}
                        />
                        <Favhoverbox />
                    </Button >
                        <Button className='iconthumb' color='light'>
                        <Trash size={21}/>
                       </Button>  
                    </div>       
                </div>            
             </>
      )
    }
export default CartThumbHover