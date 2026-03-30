
import { Button } from 'reactstrap'
import { Trash, File, FolderPlus } from 'react-feather'

const OrderHeaderButton = () => {

    return (
        <div className="col-lg-7 col-sm-10 col-xs-10  p-0 mt-0 text-right" style={{justifyContent:'right'}}>
         <Button.Ripple color='primary' className='mt-0 btn-sm' style={{marginRight:'0.8rem'}} >
            <FolderPlus size={14} />
            <span className='align-middle ml-25 d-sm-none d-none d-sm-inline'>Create Order</span>
        </Button.Ripple>
        <Button.Ripple color='primary' className='mt-0 btn-sm' style={{marginRight:'0.8rem'}}>
            <File size={14} />
            <span className='align-middle ml-25 d-none d-sm-inline'>Generate Report</span>
        </Button.Ripple >
        <Button.Ripple className='btn-icon mt-0 btn-sm' color='primary'>
        <Trash size={16} />
      </Button.Ripple>
      </div>
    )
}
export default OrderHeaderButton    