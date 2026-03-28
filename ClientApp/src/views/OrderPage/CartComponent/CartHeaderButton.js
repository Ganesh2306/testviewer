
import { Button } from 'reactstrap'
import { Trash, File, FolderPlus } from 'react-feather'

const CartHeaderButton = () => {

    return (
        <>
            <div className="col-lg-7 col-sm-9 col-xs-9  p-0 mt-0 text-right  d-flex" style={{ justifyContent: 'right' }}>          
                 <Button.Ripple className='btn-icon mt-0 btn-sm' color='primary' style={{marginRight:'0.8rem'}}>
                    <FolderPlus size={14} />
                    <span className='align-middle ml-25 d-none d-sm-inline'>Create Order</span>
                </Button.Ripple>
                <Button.Ripple className='btn-icon mt-0 btn-sm' color='primary' style={{marginRight:'0.8rem'}}>
                    <File size={14} />
                    <span className='align-middle ml-25 d-none d-sm-inline'>Generate Report</span>
                </Button.Ripple >
                <Button.Ripple className='btn-icon btn-sm mt-0' color='primary'>
                <Trash size={16} />
              </Button.Ripple>
             </div>
         
        </>
    )
}
export default CartHeaderButton