// ** Third Party Components
//import { Star, ShoppingCart, Heart, Book } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import WishThumbHover from './WishThumbHover'
import DesignRatings from '../../pagecomponents/DesignRatings'

const WishlistThumb = (props) => { 
    return (
        <Card
            role="button"
            tabIndex="-3"
            className='ecommerce-card' style={{ borderRadius: "0px" }} > <WishThumbHover id={props.id} />
            <div className='item-img text-center mx-auto position-relative' style={{ backgroundImage: `url("${props.bgimg}")` }} onClick={() => history.push('/designview')}>
                <div className="top" >
                    <a href='#'>
                        <img className='img-fluid card-img-top' />
                    </a>
                </div>
            </div>
            <CardBody style={{ height: "78px" }}>
                <h6 className='item-name'>
                    <a href='#' className='text-body'>
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
 export default WishlistThumb