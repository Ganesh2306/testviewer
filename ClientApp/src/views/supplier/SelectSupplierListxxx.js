import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Col, Label } from 'reactstrap'

const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
]


const SelectSupplierList = () => {
    return (
        <div className='supl_list'>
            <Col className='mb-1 pl-0' md='12' sm='12' style={{paddingleft} }>
                <Select
                    theme={selectThemeColors}
                    className='react-select'
                    classNamePrefix='select'
                    defaultValue={colourOptions[0]}
                    options={colourOptions}
                    isClearable={false}
                />
            </Col>


            {/*<UncontrolledButtonDropdown>*/}
            {/*    <DropdownToggle color='white' caret>*/}
            {/*       Select Supplier*/}
            {/*    </DropdownToggle>*/}
            {/*    <DropdownMenu>*/}
            {/*        <DropdownItem href='/' tag='a'>*/}
            {/*            Option 1*/}
            {/*        </DropdownItem>*/}
            {/*        <DropdownItem href='/' tag='a'>*/}
            {/*            Option 2*/}
            {/*        </DropdownItem>*/}
            {/*        <DropdownItem href='/' tag='a'>*/}
            {/*            Option 3*/}
            {/*        </DropdownItem>*/}
            {/*    </DropdownMenu>*/}
            {/*</UncontrolledButtonDropdown>*/}
            
        </div>
    )
}

export default SelectSupplierList
