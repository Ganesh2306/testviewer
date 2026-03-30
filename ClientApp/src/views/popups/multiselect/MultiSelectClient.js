/* eslint-disable */
import React, { useState, useEffect } from "react"
import { MultiSelect } from 'primereact/multiselect'

const clients = [
  {name: 'Ramraj', code: 'r1'},
  {name: 'Raymond', code: 'rm'},
  {name: 'Vintex', code: 'vin'},
  {name: 'HugoBoss', code: 'hb'},
  {name: 'Myntra', code: 'mnt'}
];

const MultiSelectClient = (props) => {
  //colourInfo={props.colourInfo}
  const [selectedClients, setSelectedClients] = useState([]);

   useEffect(() => {
    setSelectedClients([])
  }, []) 

  return (   
        <div className="justify-content-end clearfix">
      <div className="multiselect-demo justify-content-end clearfix w-100 assign_collection"> 
              <MultiSelect value={selectedClients}
              appendTo='self' 
              options={clients} 
              onChange={(e) => setSelectedClients(e.value)} 
              optionLabel="name" 
              placeholder="Select" 
              filter 
              className="multiselect-custom"      
              display="chip" />
      </div>
      </div>
  )
}

export default MultiSelectClient