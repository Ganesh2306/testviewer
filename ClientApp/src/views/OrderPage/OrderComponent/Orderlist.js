//--------------------------------------------------------------------
//    Function    :-    Order Page form
//    Purpose        :-    place Order form (get data order form And send to OrderThumb ,OrderInfo and Orderform )
//    Created        :-    26-06-2023
//    Author        :-    Ui=Manisha-> functionality-Abhishek
//--------------------------------------------------------------------

// ** Custom Components
import OrderThumb from './OrderThumb'
import Orderform from './Orderform'
import OrderInfo from './OrderInfo'

// ** Third Party Components
import { Card } from 'reactstrap'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { useEffect } from 'react'
const RequestOptions = [
  { value: 'Reference', label: 'Reference' },
  { value: 'Yardage', label: 'Yardage' },
  { value: 'Sample', label: 'Sample' },
  { value: 'Meter', label: 'Request of Meters' },
  { value: 'Pieces', label: 'Request of Pieces' },
  { value: 'Exclusives', label: 'Request of Modification and Exclusives' }
]

const Orderlist = (props) => {
const {orderDataRef, odrequestRef, counter, title, id, setRender, comment, quantity, requestType, update, setupdate} = props
const req = props.selectedDesign[counter].myrequest
useEffect(() => {
  
  props.orderDataRef.current[counter] = {
    id,
    title,
    RequestType: req,  //10-10-2024 vaibhavi more
    Order: quantity,
    Comment: comment
 }
}, [])
return (
    <Card className='ecommerce-card collection'>     
        <OrderThumb setRender={setRender} title={title} stock={props.stock} price={props.price} id={id} NoThumb={props.NoThumb}
         bgimg={props.bgimg} selectionDataRef={props.selectionDataRef} selectedDesign={props.selectedDesign}/>
        <OrderInfo comment={props.comment} feature={props.feature}/>    
        <Orderform update={update} setupdate={setupdate} disabled={props.disabled} odrequestRef={odrequestRef} 
        RequestOptions={RequestOptions} orderDataRef={orderDataRef} counter={counter}  selectedDesign={props.selectedDesign}
         len={props.len} period={props.period} quantity={quantity} comment={comment} requestType={requestType} />
    </Card>
)
}

export default Orderlist