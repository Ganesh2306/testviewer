// ** React Imports
import { useState } from "react"
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from 'reactstrap'

import { MoreVertical, File, Trash, ShoppingCart } from 'react-feather'
import { DeleteWishlist } from './DeleteWishlist'
import '../css/wishlistpage.css'
import { MoveallCart } from "./MoveCart"

const Wishmenu = (props) => {
/*    const [successdelete, setsuccessdelete] = useState(false)*/
    const [Delwish, setDelwish] = useState(false)
    const delwishtoggle = () => setDelwish(!Delwish)

    const [move, setMove] = useState(false)
    const movetoggle = () => setMove(!move)

    return (
        <>
        <div className='d-flex p-50 mr-1'>
                <div><span>5 </span>designs selected</div>
                <div className='px-50'> | </div>
                <div>Deselect</div>
        </div>
        <div className='d-flex'>
                <a className='mr-50 btn btn-light p-50' onClick={delwishtoggle}>
                    <Trash size={16} style={{ transform: 'rotate(0deg)' }} />
                </a>
                <a className='mr-50 btn-light p-50' onClick={movetoggle}>
                    <ShoppingCart size={16} style={{ transform: 'rotate(0deg)' }} />
                            
                </a>
                <a className='mr-50 btn-light p-50'>
                    <File size={16} style={{ transform: 'rotate(0deg)' }} />                                  
                </a>
            </div>
        <div className="w_menu bg-light">           
            <UncontrolledDropdown>
          <DropdownToggle className='hide-arrow' tag='a' href='/' onClick={e => e.preventDefault()}>
            <MoreVertical className='text-body' size={16} />
          </DropdownToggle>
          <DropdownMenu right>                       
              <DropdownItem className='w-100' onClick={delwishtoggle}  >
                    <Trash size={16} style={{marginRight:'5px', transform:'rotate(0deg)'}}/>
                     Delete Wishlist
              </DropdownItem>
            <DeleteWishlist deletewishmodal={Delwish} deletetoggle={delwishtoggle}/>
                    <DropdownItem className='w-100 ' onClick={movetoggle}>
                            <ShoppingCart size={16} style={{marginRight:'5px', transform:'rotate(0deg)'}}/>
                      Add to Cart
                    </DropdownItem>
                    <MoveallCart movemodal={move} movecancel={movetoggle} />
            <DropdownItem className='w-100'>
            <File size={16} style={{marginRight:'5px', transform:'rotate(0deg)'}}/>
           Generate Report
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        </div>
        </>
    )
}
export default Wishmenu