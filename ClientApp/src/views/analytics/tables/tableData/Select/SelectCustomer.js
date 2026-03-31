import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label } from 'reactstrap'

const customerOptions = [
    { value: 'Raymond', label: 'Raymond' },
    { value: 'Birla', label: 'Birla' },
    { value: 'Oswald', label: 'Oswald' }
  ]
const SelectCustomer = () => {
  return (
    
       <Select className="w-100"
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={customerOptions[0]}
              options={customerOptions}
              isClearable={false}
            />  
  
  )
}

export default SelectCustomer
