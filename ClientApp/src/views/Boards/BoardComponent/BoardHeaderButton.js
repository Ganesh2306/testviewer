// ** React Imports
import { useState } from "react"
import { Button, UncontrolledButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'
import { Trash, File, ShoppingCart } from 'react-feather'
import { ModalCreateWishlist } from "../../popups/ModalCreateWishlist"
import { MoveallCart } from "../../popups/AddCart"
import { DeleteDesigns } from "../../popups/DeleteDesigns"
import { DesignsCopyBoard } from "../../popups/DesignsCopyBoard"
const BoardHeader = (props) => {
    const [Delwish, setDelwish] = useState(false)
    const delwishtoggle = () => setDelwish(!Delwish)
    const [move, setMove] = useState(false)
    const movetoggle = () => setMove(!move)
    const [Copydesign, setCopyDesign] = useState(false)
    const copydesigntoggle = () => setCopyDesign(!Copydesign)
    const [is_createopen, setis_createopen] = useState(false)
    const CreateOpentoggle = () => setis_createopen(!is_createopen)
    return (
        <div className="p-0 mt-0 text-right d-flex col-lg-6 right-text-heading" style={{ justifyContent: 'right' }}> 
            <Button.Ripple className='btn-icon mt-0 btn-sm  mr-50' color='secondary' onClick={delwishtoggle} >
                <Trash size={14} />
            </Button.Ripple >
            <DeleteDesigns deletewishmodal={Delwish} deletetoggle={delwishtoggle} />
            <UncontrolledButtonDropdown className="mr-50">
                <Button color='secondary' className='btn-sm' >Copy to</Button>
                <DropdownToggle className='dropdown-toggle-split text-dark  btn-sm' color='secondary' size='sm' caret style={{ color: '#000' }}></DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem  onClick={copydesigntoggle}>
                        Board 1
                    </DropdownItem>
                    <DesignsCopyBoard Copydesignmodal={Copydesign} designcanceltoggle={copydesigntoggle} />
                    <DropdownItem href='/' tag='a' >
                        Board 2
                    </DropdownItem>
                    <DropdownItem href='/' tag='a' >
                        Board 3
                    </DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem onClick={CreateOpentoggle}>
                        Create a Board                      
                    </DropdownItem>
                    <ModalCreateWishlist is_createopen={is_createopen} setis_createopen={CreateOpentoggle} />
                </DropdownMenu>
            </UncontrolledButtonDropdown>
            <Button.Ripple className='btn-icon mt-0 btn-sm mr-50' color='primary' onClick={movetoggle}>
                <ShoppingCart size={14} />
                <span className='align-middle ml-25 d-none d-sm-inline'>Add to Cart</span>
            </Button.Ripple >
            <MoveallCart movemodal={move} movecancel={movetoggle} />
            <Button.Ripple className='btn-icon mt-0 btn-sm' color='primary'>
                <File size={14} />
                <span className='align-middle ml-25 d-none d-sm-inline'>Generate Report</span>
            </Button.Ripple >
      </div>
    )
}
export default BoardHeader