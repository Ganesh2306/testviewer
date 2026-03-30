
// ** Third Party Components
import Cartlist from './Cartlist'
import { CartColumn } from '../Cartdata/data'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const CartPage = (props) => { 
  //console.log(props.NoThumb)
  return ( 
    <div className='checkout-tab-steps'>
      <div className='list-view product-checkout'>
            <div className='checkout-options'>  
            {
            CartColumn.map((e, k) => {
                return <Cartlist title={e.Design_Name} stock={e.InStock} price={e.Cost} id={e.id} NoThumb={props.NoThumb} comment={props.comment} len={props.len} period={props.period} quantity={props.quantity} bgimg={(`${e.Image}`)}/>
            })       
            }          
            </div>
      </div>
    </div>           
  )
}

export default CartPage
