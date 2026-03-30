/* eslint-disable */
import React, { useState, useEffect } from "react"
import { MultiSelect } from 'primereact/multiselect'

const collections = [
  {name: 'cc01', code: 'cc01'},
  {name: 'AW25', code: 'aw25'},
  {name: 'cc02', code: 'cc02'},
  {name: 'SS24', code: 'ss24'},
  {name: 'AW22', code: 'aww22'}
];

const MultiSelectCollection = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

   useEffect(() => {
    setSelectedOptions([])
  }, []) 

  return (   
        <div className="justify-content-end clearfix">
      <div className="multiselect-demo justify-content-end clearfix w-100 assign_collection">
 
              <MultiSelect value={selectedOptions}
              appendTo='self' 
              options={collections} 
              onChange={(e) => setSelectedOptions(e.value)} 
              optionLabel="name" 
              placeholder="Select" 
              filter 
              className="multiselect-custom"      
              display="chip" />
      </div>
      </div>
  )
}




export default MultiSelectCollection