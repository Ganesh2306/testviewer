
// ** Custom Components
import CartThumb from './CartThumb'
import Cartform from './Cartform'
import CartInfo from './CartInfo'

// ** Third Party Components
import { Card } from 'reactstrap'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Cartlist = (props) => {

return (

    <Card className='ecommerce-card collection'>  
 
        <CartThumb title={props.title} stock={props.stock} price={props.price} id={props.id} NoThumb={props.NoThumb} bgimg={props.bgimg} />
        <CartInfo comment={props.comment} />    
        <Cartform len={props.len} period={props.period} quantity={props.quantity}/>
   </Card>
)
}

export default Cartlist