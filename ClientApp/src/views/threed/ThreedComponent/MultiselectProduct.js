import React, { useState, useEffect, useRef } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
// import './MultiSelectDemo.css'
//import '../../../../customStyles/selectmenu.css'
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"
//import { Skeleton } from 'primereact/skeleton'
const MultiSelectProduct = (props) => { 

    const [selectedprlist, setSelectedprlist] = useState(null) 

    const prlist =  props.PrOrList.ProductList
    
    function pr(z) {
        return {
        name:z,
        code:z
        }
    }
   const pro = prlist.map(pr)

useEffect(() => {
    setSelectedprlist(null)

  return () => {
    setSelectedprlist(null)
    props.productsref.current = {value: 'All'} 
  }
}, [props.multiSlectReset])


 return (
        <div className="multiselect-demo">     
                <MultiSelect
                    value={selectedprlist}
                    options={pro}
                    onChange={(e) => {
                        setSelectedprlist(e.value)
                        props.forceRerender()
                        props.pageRest()     
                    const productArray = e.value.reduce((acc, curr) => `${acc}${curr.name},`, '')
                    props.productsref.current = {value: productArray === "" ? "All" : productArray} 
                    }}
                    placeholder="Select"
                    optionLabel="name"               
                    display="chip"        
                />
        </div>
    )
}
export default MultiSelectProduct

