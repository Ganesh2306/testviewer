import { useState } from 'react'
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Trash2, MoreVertical, Share2, Plus  } from 'react-feather'
import { ModalCreateCollection } from '../../popups/ModalCreateCollection'
import { ModalAssignCollection } from '../../popups/ModalAssignCollection'

const CollectionHeaderButton = () => {
  const [is_open, setis_open] = useState(false)
  const [is_createopen, setis_createopen] = useState(false)
  const CreateOpentoggle = () => setis_createopen(!is_createopen)

    return (
        <div className="col-lg-7 col-sm-10 col-xs-10 p-0 mt-0 text-right d-flex justify-content-end" >
          <Button.Ripple color='primary' className='mt-0' onClick={CreateOpentoggle}>
              <Plus size={14} />
              <span className='align-middle ml-25'>Create Collection</span>         
          </Button.Ripple>      
           <ModalCreateCollection is_createopen={is_createopen} setis_createopen={CreateOpentoggle} /> 
        <UncontrolledDropdown  className='mt-0 btn-sm' color='primary' >
            <DropdownToggle className='' tag='span'>
              <MoreVertical size={18} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem >
                <Share2 size={15} />
                <span className='align-middle ml-50'>Share Collection</span>
              </DropdownItem>
              <DropdownItem >
                <ModalAssignCollection is_open={is_open} setis_open={setis_open} />
              </DropdownItem>
              <DropdownItem >
                <Trash2 size={15} />
                <span className='align-middle ml-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
      </div>
    )
}
export default CollectionHeaderButton