import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const SelectOption = () => {
  return (
    <div className='demo-inline-spacing'>      
      <UncontrolledButtonDropdown className="m-0">
        <DropdownToggle outline color='secondary' size='sm' caret>
          None
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href='/' tag='a'>
         abc
          </DropdownItem>
          <DropdownItem href='/' tag='a'>
        pqr
          </DropdownItem>
          <DropdownItem href='/' tag='a'>
        ttt
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>     
    </div>
  )
}

export default SelectOption
