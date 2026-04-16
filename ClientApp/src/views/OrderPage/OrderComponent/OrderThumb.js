//--------------------------------------------------------------------
//    Function    :-    Order Page form thum information
//    Purpose        :-    place Order form (OrderThumb)
//    Created        :-    27-06-2023
//    Author        :-    Ui=Manisha-> functionality-Abhishek
//--------------------------------------------------------------------

// ** React Imports
import { useHistory } from 'react-router-dom'
import React, { useContext} from "react"

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'
import OrderThumbHover from './OrderThumbHover'
import DesignRatings from '../../pagecomponents/DesignRatings'
import '../css/order.css'
import { accessContext } from "../../context/accessContext"

const OrderThumb = (props) => {

    const history = useHistory()
    const { access } = useContext(accessContext)
    return (
        <Card
            role="button"
            tabIndex="-3"
            className='card-body orderthumb p-0' style={{ borderRadius: "0px", padding:"0"}}>
            <div className='item-img text-center mx-auto position-relative ' style={{ backgroundImage: `url("${props.bgimg}")`}}>
                <div className="top">
                    <a>
                        <img className='img-fluid card-img-top rounded-0' />
                    </a>
                </div>
                <OrderThumbHover  id={props.id} setRender={props.setRender} selectionDataRef={props.selectionDataRef} selectedDesign={props.selectedDesign} />
            </div>
            <CardBody style={{ border:'none' }}  className='position-relative'>
                <h6 className='item-name'>
                    <a className='text-body'>
                        {props.title}
                    </a>
                </h6>
                {/* <h4 className='item-description text-primary'>{access["444449"] && access["444449"]["278889"] && props.price && `${props.price}/-`}</h4> */}
                <span className='item-description '>In Stock: {props.stock}</span>
                <div className='item-rating'>
                    {access["444449"] && access["444449"]["268889"] && props.currentDesign && props.currentDesign.features && <DesignRatings isThumb={true} rating={props.currentDesign && props.currentDesign.features ? Number(props.currentDesign["rating"]) : 0} />}
{/*                    <DesignRatings />*/}
                </div>
            </CardBody>
        </Card>
    )
       
}
 export default OrderThumb