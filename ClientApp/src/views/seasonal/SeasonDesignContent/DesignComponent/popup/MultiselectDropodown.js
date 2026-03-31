import React, { useState, useEffect, useRef } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import './MultiSelectDemo.css'
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"
//import { Skeleton } from 'primereact/skeleton'

export const SelectProGroup = (props) => {
    const [selectedprlist, setSelectedprlist] = useState(null)
    const [selectedCountries, setSelectedCountries] = useState(null)

    const orlist = Object.keys(props.PrOrList.OrgList)

    const orl = orlist.map((e) => {
        return {
            name: props.PrOrList.OrgList[e],
            code: e
        }
    })
    

    useEffect(() => {
        setSelectedCountries([])
   }, [])
   
       const OrgTemplate = (option) => {
           return (
               <div className="country-item">
                   <img alt={option.name} src="images/flag/flag_placeholder.png"  />
                   <div>{option.name}</div>
               </div>
           )
       }
   
       const selectedOrgTemplate = (option) => {
           if (option) {
               return (
                   <div className="country-item country-item-value">
                       <img alt={option.name} src="images/flag/flag_placeholder.png"  />
                       <div>{option.name}</div>
                   </div>
               )
           }
   
           return "Select Countries"
       }
   
       const OrgFooterTemplate = () => {
           const selectedItems = selectedCountries
           const length = selectedItems ? selectedItems.length : 0
           return (
               <div className="py-2 px-3">
                   <b>{length}</b> item{length > 1 ? 's' : ''} selected.
               </div>
           )
       }


    return (
        <div className="multiselect-demo">
            <div className="card">   
                <MultiSelect value={selectedprlist} options={orl}
                    onChange={(e) => setSelectedprlist(e.value)}
                    optionLabel="name"               
                display="chip"
                />
            
            </div>
    </div>
    )
}