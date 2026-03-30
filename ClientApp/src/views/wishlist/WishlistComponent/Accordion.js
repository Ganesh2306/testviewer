import AppCollapse from './WishlistCollapse'
import '../css/wishlistpage.css'
import { data } from '../WishlistData/wishlistdata'
// ** Styles

const Accordion = () => {
    return (
        <AppCollapse data={data} accordion>        
        </AppCollapse>
    )
}
export default Accordion

