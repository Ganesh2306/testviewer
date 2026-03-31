import React, { useState, useEffect } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import '../../../customStyles/selectmenu.css'
//import './MultiSelectDemo.css'
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"
//import "primeicons/"
//import { Skeleton } from 'primereact/skeleton'
//import { cdata } from './data'
import { date } from 'yup'
import axios from 'axios'

const MultiSelectCompnent = (props) => {
    //colourInfo={props.colourInfo}
    
    const [selectedCountries, setSelectedCountries] = useState(null)
  
     useEffect(() => {
        setSelectedCountries([])
    }, [props.reset]) 

    const countryTemplate = (option) => {
        
        const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {width:'1rem ',
            height:'1rem ',
            backgroundColor:`${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
            border:'0.1rem solid black'} : {}
        return (
            <div className="country-item" style={{display : 'flex'}}>
               <span style={style}></span>&nbsp;
                <div>{option.design_featuretype_name}</div>
            </div>
        )
    }

    const selectedCountriesTemplate = (option) => {
        if (option) {
            
            const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {width:'1rem ',
            height:'1rem ',
            backgroundColor:`${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
            border:'0.1rem solid black'} : {}
            return (
                <div className="country-item country-item-value">
                    <span style={style}></span>&nbsp;
                    <div >{option.design_featuretype_name}</div>
                </div>
            )
        }
        return "Select Options"
    }

    const panelFooterTemplate = () => {
        const selectedItems = selectedCountries
        const length = selectedItems ? selectedItems.length : 0
        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        )
    }

    return (     
        <div className="multiselect-demo justify-content-end clearfix z-index-1" style={{zIndex : '9999'}}>
           
                <label>{props.label}</label>
                <MultiSelect value={selectedCountries} options={props.option} onChange={(e) => {
                    setSelectedCountries(e.value)
                    let str = ``
                    e.target.value.map((e, k) => {
                        str += `${e.design_featuretype_name}+`
                    })
                    props.onChange(props.label, str.slice(0, str.length - 1))
            }} optionLabel="design_featuretype_name" placeholder="Select options" filter className="multiselect-custom input_custom"
                    itemTemplate={countryTemplate} selectedItemTemplate={selectedCountriesTemplate} panelFooterTemplate={panelFooterTemplate} />            
            
        </div>
        
    )
}

const countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]

export const SingleColourComponent = (props) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        setSelectedCountry(null)
    }, [props.reset]) 

    const onCountryChange = (e) => {
    
        // setSelectedCountry(e.value)  //changed by :- vaibhavi
        if (props?.setSelectedColour) {
            props.setSelectedColour.value = e.value
            setSelectedCountry(e.value)
        }
       props.onChange(undefined, props.myid, 'Color', {design_featuretype_name:e.value?.design_featuretype_name})
        //props.onChange(props.label, e.value?.design_featuretype_name, props.myid)
    }

    const countryOptionTemplate = (option) => {   
        const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {width:'1rem ',
            height:'1rem ', 
            backgroundColor:`${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
            border:'0.1rem solid black'} : {}
        return (
            <div className="country-item" style={{display : 'flex'}}>
               <span style={style}></span>&nbsp;
                <div>{option.design_featuretype_name}</div>
            </div>
        )
    }

    const selectedCountryTemplate = (option) => {
        if (option) {   
            const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {width:'16px ',
            height:'16px ',
            display:'block',
            backgroundColor:`${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
            border:'0.1rem solid black'} : {}
            return (
                <div className="country-item country-item-value d-flex" style={{fontSize:'0.8rem'}}>
                    <span style={style}></span>&nbsp;
                    <div className='multi_field' >{option.design_featuretype_name}</div>
                </div>
               
            )
        }
        return "Select Options"
    }
    //showClear

    return (
<div class="form-check-inline">
    <label>{props.label}</label>
            <Dropdown value={selectedCountry} appendTo='self'
            options={props.option} 
            onChange={onCountryChange} 
            optionLabel="design_featuretype_name" filter  filterBy="design_featuretype_name" 
            placeholder="Select a Options"
            valueTemplate={selectedCountryTemplate} 
            itemTemplate={countryOptionTemplate} />
  </div>
    )
}

export const RangeCalander = (props) => {

    const [dates2, setDates2] = useState(null)

    const today = new Date()
    /* let month = today.getMonth();
    let year = today.getFullYear();
    let date = today.getDate() */

    const maxDate = new Date()
    maxDate.setMonth(today.getMonth())
    maxDate.setFullYear(today.getFullYear())
    maxDate.setDate(today.getDate())

    const handelChange = (dat = []) => {
        let str = ``
        dat.forEach(e => {
            if (e !== null) {
               
                const date = new Date(e)
                str += `${date.getFullYear()}-${(date.getMonth() + 1).toString().length === 1 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}-${date.getDate().toString().length === 1 ? 0 : ''}${date.getDate()}+`
            } else {
                str += str
            }
        })
       const finalStr =  str.slice(0, str.length - 1)
        if (finalStr.split('+')[0] === finalStr.split('+')[1]) {
            return ""
        }
        return finalStr
    }

    useEffect(() => {
        
      setDates2(null)
    }, [props.reset])   

   return (<>
   <div className=" justify-content-end clearfix">
   <label>{props.label}</label>
   <Calendar id="range" value={dates2} 
   dateFormat="dd/mm/yy"
   className="input_custom"
   placeholder='Select Date'
   onChange={(e) => { 
    setDates2(e.value)
    props.onChange(props.label, handelChange(e.value), false, true)
    }} 
    selectionMode="range" 
   maxDate={maxDate}
   readOnlyInput showIcon />
   </div>
   </>)
}

export default MultiSelectCompnent

export const SelectProGroup = (props) => {
    const citySelectItems = [
        {label: 'New York', value: 'NY'},
        {label: 'Rome', value: 'RM'},
        {label: 'London', value: 'LDN'},
        {label: 'Istanbul', value: 'IST'},
        {label: 'Paris', value: 'PRS'}
    ]

    const cities = [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
    ]

    const [product, setproduct] = useState([])

    useEffect(() => {
        axios.get(`Design/GetConfiguredProducts`).then((e) => {
            const res = JSON.parse(e.data).map((e) => {
                return {name:e, code:e}
            })
            const sortedres = res.sort((a, b) => a.code.localeCompare(b.code))
            setproduct(sortedres)
        })
    }, [])

    const [selectedprlist, setSelectedprlist] = useState(null)
    return (
        <div className="multiselect-demo">
            <div className="card">   
                <MultiSelect 
                appendTo='self'
                value={selectedprlist}
                options={product}
                optionLabel="name" 
                placeholder="Select" 
                maxSelectedLabels={1000000}
                onChange={(e) => {
                    let str = ""
                    if (e.value.length > 1) {
                        e.value.forEach((n, k) => {
                            str = e.value.length - 1 === k ? `${str}${n.name}` : `${str}${n.name},`

                        })
                    } else {
                        if (e.value.length === 0) {
                            str = ""
                        } else {
                            str = e?.value[0].name
                        }
                    }
                    setSelectedprlist(e.value)
                    props.onChange(undefined, props.myid, 'Product', {design_featuretype_name: str})
                }
                }
                />
            
            </div>
    </div>
    )
}
