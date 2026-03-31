import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Button, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Col, Label } from 'reactstrap'
import { UserCheck } from 'react-feather'

const colourOptions = [
    { value: 'Supllier-A', label: 'Supllier-A' },
    { value: 'Supllier-B', label: 'Supllier-B' },
    { value: 'Supllier-c', label: 'Supllier-c' },
    { value: 'Supllier-D', label: 'Supllier-D' }  
]


const SelectSupplierList = () => {
    return (
        <div className='supl_list'>
           
            <Col className='pl-0'  md='12' sm='12'>           
                <Select
                    theme={selectThemeColors}
                    className='react-select primary'
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
