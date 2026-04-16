// ** React Imports
import { Link, useHistory } from 'react-router-dom'
import React, { useState } from "react"

// ** Third Party Components
import { Star } from 'react-feather'
import { Card, CardBody, CardText, Button, CustomInput, Badge } from 'reactstrap'
import CartThumbHover from './CartThumbHover'
import DesignRatings from '../../pagecomponents/DesignRatings'
import '../css/cart.css'

const CartThumb = (props) => {
    const history = useHistory()
    return (
        <Card
            role="button"
            tabIndex="-3"
            className='card-body border-right-0' style={{ borderRadius: "0px" }}>
            <div className='item-img text-center mx-auto position-relative' style={{ backgroundImage: `url("${props.bgimg}")` }}>
                <div className="top">
                    <a>
                        <img className='img-fluid card-img-top rounded-0' />
                    </a>
                </div>
                <CartThumbHover />

            </div>
            <CardBody style={{ height: "96px", border: "1px solid #ebe9f1" }} className='position-relative'>
                <h6 className='item-name'>
                    <a className='text-body'>
                        {props.title}
                    </a>
                </h6>
                <h4 className='item-description text-primary'>$55</h4>
                <span className='item-description '>In Stock: {props.stock}</span>
                <div className='item-rating'>
                    <DesignRatings />
                </div>
            </CardBody>
        </Card>
    )
       
}
 export default CartThumb