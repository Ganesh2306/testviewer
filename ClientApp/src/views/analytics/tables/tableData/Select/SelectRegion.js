import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label } from 'reactstrap'

const regionOptions = [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Kolkata', label: 'Kolkata' } 
  ]
const SelectRegion = () => {
  return (
    
       <Select className="w-100"
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={regionOptions[0]}
              options={regionOptions}
              isClearable={false}
            />  
  
  )
}

export default SelectRegion
