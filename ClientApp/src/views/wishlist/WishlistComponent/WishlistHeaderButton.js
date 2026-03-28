
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { Trash, File, FolderPlus, Plus, ShoppingCart } from 'react-feather'
import { ModalCreateWishlist } from "../../popups/ModalCreateWishlist"

const WishlistHeader = (props) => {

    return (
        <div className="p-0 mt-0 text-right d-flex col-lg-6" style={{ justifyContent: 'right' }}>
            <Label sm='3'>
                Select
            </Label>
            <FormGroup className="mr-50 mb-0  w-25">
                <Input type='select' name='select' id='select-basic'>
                    <option>Autumn 2020</option>
                    <option>Summer 2020</option>
                    <option>Spring 2020</option>
                </Input>
            </FormGroup>
            {/*<Button.Ripple className='btn-icon mt-0 btn-sm mr-50' color='secondary'>*/}
            {/*    <Plus size={14} />*/}
            {/*    <span className='align-middle ml-25 d-none d-sm-inline'>Create New</span>*/}
            {/*</Button.Ripple >*/}
            <ModalCreateWishlist />
            <Button.Ripple className='btn-icon mt-0 btn-sm' color='primary' style={{ marginRight: '0.8rem' }}>
                <ShoppingCart size={14} />
                <span className='align-middle ml-25 d-none d-sm-inline'>Add to Cart</span>
            </Button.Ripple >
      </div>
    )
}
export default WishlistHeader