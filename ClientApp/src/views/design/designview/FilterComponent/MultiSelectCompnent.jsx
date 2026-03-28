import React, { useState, useEffect, useRef } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import ReactDOM from 'react-dom'
import { Calendar } from 'primereact/calendar'
import './MultiSelectDemo.css'
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"
//import { DateRange } from 'react-date-range'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
const MultiSelectCompnent = (props) => {
    const [selectedCountries, setSelectedCountries] = useState(null)

    useEffect(() => {
        setSelectedCountries([])
    }, [props.reset])

    const countryTemplate = (option) => {
        const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {
            width: '1rem ',
            height: '1rem ',
            backgroundColor: `${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
            border: '0.1rem solid black'
        } : {}
        return (
            <div className="country-item" style={{ display: 'flex' }}>
                <span style={style}></span>&nbsp;
                <div>{option.design_featuretype_name}</div>
            </div>
        )
    }

    const selectedCountriesTemplate = (option) => {
        if (option) {

            const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {
                width: '1rem ',
                height: '1rem ',
                backgroundColor: `${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
                border: '0.1rem solid black'
            } : {}
            return (
                <div className="country-item country-item-value">
                    <span style={style}></span>&nbsp;
                    <div >{option.design_featuretype_name}</div>
                </div>
            )
        }
        return "Select"
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
        <div className="justify-content-end clearfix">
            <div className="multiselect-demo justify-content-end clearfix">

                <label>{props.label}</label>
                <MultiSelect value={selectedCountries} options={props.option} onChange={(e) => {
                    setSelectedCountries(e.value)
                    let str = ``
                    e.target.value.map((e, k) => {
                        str += `${e.design_featuretype_name}+`
                    })
                    props.onChange(props.label, str.slice(0, str.length - 1))
                }} optionLabel="design_featuretype_name" placeholder="Select" filter className="multiselect-custom input_custom"
                    itemTemplate={countryTemplate} selectedItemTemplate={selectedCountriesTemplate} panelFooterTemplate={panelFooterTemplate} />

            </div>
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

        setSelectedCountry(e.value)
    }

    const countryOptionTemplate = (option) => {
        const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {
            width: '.8rem ',
            height: '.8rem ',
            backgroundColor: `${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
            border: 'none',
            marginLeft: '7px',
            marginTop: '3px'
        } : {}
        return (
            <div className="country-item" style={{ display: 'flex' }}>
                <span style={style}></span>&nbsp;
                <div>{option.design_featuretype_name}</div>
            </div>
        )
    }

    const selectedCountryTemplate = (option, props) => {
        if (option) {

            const style = props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? {
                width: '.8rem ',
                height: '.8rem ',
                backgroundColor: `${props.colourInfo[option.design_featuretype_name.toLowerCase()] !== undefined ? props.colourInfo[option.design_featuretype_name.toLowerCase()].hex : ''}`,
                border: 'none',
                marginLeft: '7px',
                marginTop: '3px'
            } : {}
            return (
                <div className="country-item country-item-value">
                    <span style={style}></span>&nbsp;
                    <div >{option.design_featuretype_name}</div>
                </div>
            )
        }
        return "Select"
    }

    return (
        <div className="multiselect-demo justify-content-end clearfix">
            <label>{props.label}</label>
            <Dropdown value={selectedCountry}
                options={countries} onChange={onCountryChange} optionLabel="design_featuretype_name" filter showClear filterBy="design_featuretype_name" placeholder="Select a Options"
                valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} />
        </div>
    )
}

export const RangeCalander = (props) => {
    const elementRef = useRef(null)
    const [rect, setRect] = useState(null)

    const [dates2, setDates2] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [calendarPosition, setCalendarPosition] = useState('bottom')
    useEffect(() => {
        if (elementRef.current) {
            const rectData = elementRef.current.getBoundingClientRect()
            setRect(rectData)
        }
    }, [isOpen])

    useEffect(() => {
        if (rect) {

            const spaceBelow = window.innerHeight - rect.bottom
            const spaceAbove = rect.top

            if (spaceBelow > spaceAbove) {
                setCalendarPosition('bottom')
            } else {
                setCalendarPosition('top')
            }
        }
    }, [rect])

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const calendarRef = useRef(null)
    const handleChange = (dat = []) => {
        let str = ''
        dat.forEach(e => {
            if (e !== null) {
                const date = new Date(e)
                str += `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}+`
            }
        })
        const finalStr = str.slice(0, str.length - 1)
        const datesArray = finalStr.split('+')
        if (datesArray.length === 1) {
            return datesArray[0]
        }
        return finalStr
    }

    useEffect(() => {
        setDates2(null)
    }, [props.reset])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    const buttonClose = () => {
        setIsOpen(false)
    }
    const handleClear = () => {
        setState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])
        setDates2(null)
        props.onChange(props.label, '', false, true)
        setIsOpen(false)
    }
    return (
        <>
            <div className="justify-content-end clearfix">
                <label>{props.label}</label>
                <input
                    ref={elementRef}
                    className='input_custom form-control'
                    placeholder='Select Date'
                    onClick={() => {
                        console.log('Input clicked')
                        setIsOpen(!isOpen)
                    }}
                    value={dates2 ? `${format(new Date(dates2[0]), 'yyyy-MM-dd')} - ${format(new Date(dates2[1]), 'yyyy-MM-dd')}` : ''}

                />
                {isOpen && rect && (
                    <div className='position-fixed sidebarCalendar' ref={calendarRef} style={{
                        top: calendarPosition === 'bottom' ? `${rect.bottom + window.scrollY}px` : `${rect.top + window.scrollY - (calendarRef.current?.offsetHeight || 0)}px`, left: `${rect.left + window.scrollX}px`, zIndex: 9999
                    }}

                    >
                        <DateRangePicker
                            onChange={item => {
                                setState([item.selection])
                                setDates2([item.selection.startDate, item.selection.endDate])
                                props.onChange(props.label, handleChange([item.selection.startDate, item.selection.endDate]), false, true)
                            }}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={state}
                            direction="horizontal"
                            appendTo='body'
                            locale={enUS}
                        />
                        <div style={{ marginTop: '-31px', display: 'flex', gap: '9.5px' }}>
                            <button style={{ cursor: 'pointer', backgroundColor: 'grey', border: 'none', color: 'white', height: '30px', width: "60px" }} onClick={handleClear}> Clear</button>
                            <button style={{ cursor: 'pointer', backgroundColor: '#0a66c2', border: 'none', color: 'white', height: '30px', width: "60px" }} onClick={buttonClose}>OK</button>
                        </div>
                    </div>

                )}

            </div>
        </>
    )
}

// export const RangeCalander = (props) => {

//     const [dates2, setDates2] = useState(null)

//     const today = new Date()
//     const maxDate = new Date()
//     maxDate.setMonth(today.getMonth())
//     maxDate.setFullYear(today.getFullYear())
//     maxDate.setDate(today.getDate())

//     const handelChange = (dat = []) => {
//         let str = ``
//         dat.forEach(e => {
//             if (e !== null) {

//                 const date = new Date(e)
//                 str += `${date.getFullYear()}-${(date.getMonth() + 1).toString().length === 1 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}-${date.getDate().toString().length === 1 ? 0 : ''}${date.getDate()}+`
//             } else {
//                 str += str
//             }
//         })
//        const finalStr =  str.slice(0, str.length - 1)
//         if (finalStr.split('+')[0] === finalStr.split('+')[1]) {
//             return ""
//         }
//         return finalStr
//     }

//     useEffect(() => {

//       setDates2(null)
//     }, [props.reset])   

//    return (<>
//    <div className=" justify-content-end clearfix">
//    <label>{props.label}</label>
//    <Calendar id="range" value={dates2} 
//    dateFormat="dd/mm/yy"
//    className="input_custom"
//    placeholder='Select Date'
//    appendTo= 'self'
//    onChange={(e) => { 
//     setDates2(e.value)
//     props.onChange(props.label, handelChange(e.value), false, true)
//     }} 

//    selectionMode="range" 
//    readOnlyInput hideOnRangeSelection />   
//    </div>
//    </>)
// }

export default MultiSelectCompnent
