import React, { useState, useEffect, useRef } from 'react'
import { MultiSelect } from 'primereact/multiselect'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
// import './MultiSelectDemo.css'
import '../../../../customStyles/selectmenu.css'
import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"

export const MultiSelectDropdown = (props) => {
    const { handelOnchange, pid, identifiers, rootstage, id } = props
    const [selectedprlist, setSelectedprlist] = useState([])
    const [newOption, setNewOption] = useState('')
    
    const prlist = props.PrOrList.ProductList
    const objName = identifiers === 'Td_Productname' ? 'td_Productname' : 'td_Group_Product_Name'
    
    const pro = prlist.map(z => ({ [objName]: z, code: z }))

    
    useEffect(() => {
        if (props.datard?.Td_Productname && prlist.includes(props.datard.Td_Productname[0]?.td_Productname)) {
            setSelectedprlist([pro.find(p => p[objName] === props.datard.Td_Productname[0]?.td_Productname)])
        } else {
            setSelectedprlist([])
        }
    }, [])
    const handleAddOption = (event) => {
        event.preventDefault()
        if (newOption.trim() && !prlist.includes(newOption)) {
          const newPro = { [objName]: newOption, code: newOption }
          prlist.push(newOption) // Update the original list
          prlist.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
          setSelectedprlist([...selectedprlist, newPro]) // Update selected list
          setNewOption('') // Clear the input after adding
          props.onAddProduct(newPro)  // Pass the newPro object as a prop to MultiSelectDropdown2
          // Call handelOnchange to save the design
          handelOnchange({ pid, id, identifiers, text: { target: { value: [...selectedprlist, newPro] } }, rootstage })
        }
      }
    const handleSelectionChange = (e) => {
        setSelectedprlist(e.value)
        handelOnchange({ pid, id, identifiers, text: { target: { value: e.value } }, rootstage })
    }
    const handleRemoveItem = (item, event) => {
        event.stopPropagation()
        event.preventDefault()
        const index = prlist.indexOf(item[objName])
        if (index !== -1) {
          prlist.splice(index, 1)
        }
        // const updatedList = selectedprlist.filter((i) => i[objName] !== item[objName])
        const updatedList = selectedprlist.filter((i) => {
            return JSON.stringify(i[objName]) !== JSON.stringify(item[objName])
          })
        setSelectedprlist(updatedList)
        handelOnchange({ pid, id, identifiers, text: { target: { value: updatedList } }, rootstage })
      }

    return (
        <div className="multiselect-demo">
            <div className='input-01'>
            <input 
                        type="text" 
                        value={newOption} 
                        onChange={(e) => setNewOption(e.target.value)} 
                        placeholder="Add new option" 
                        className='text-center form-control'
                    />
                    <button className="Add_Option btn btn-sm btn-primary" onClick={handleAddOption}>Add +</button>
                    
            </div>
            <div className="card">
                <MultiSelect 
                    appendTo='self' 
                    value={selectedprlist} 
                    options={pro} 
                    onChange={handleSelectionChange}
                    optionLabel={objName}
                    display="chip"
                    itemTemplate={(option) => (
                        <div className='text'>
                          <span 
                          //style={{ margin: '10%' }} 
                          >
                            {option[objName]}
                            </span>
                          {/* <i
                            className="p-multiselect-token-icon pi pi-times-circle"
                            style={{  cursor: 'pointer', color: "#4338CA" }}
                            onMouseOver={(e) => (e.target.style.color = 'red')}
                            onMouseOut={(e) => (e.target.style.color = '#4338CA')}
                            onClick={(event) => handleRemoveItem(option, event)}
                          /> */}
                        </div>
                      )}
                />
                <div>
                   </div>
            </div>
        </div>
    )
}
export default MultiSelectDropdown
export const MultiSelectDropdown2 = (props) => {
    //colourInfo={props.colourInfo}
    const {handelOnchange, pid, identifiers, rootstage, id} = props
    const [selectedprlist, setSelectedprlist] = useState(null)
    const [selectedCountries, setSelectedCountries] = useState(null)
    //const [items] = useState(Array.from({ length: 100000 }).map((_, i) => ({ label: `Item #${i}`, value: i })))
 const prlist =  props.PrOrList.ProductList
 const i = prlist.indexOf(props.datard.td_Image_Configuration[id].td_Group_Product_Name)
const objName = identifiers === `Td_Productname` ? `td_Productname` : `td_Group_Product_Name`
    
    function pr(z) {
        const obj = {}
        obj[objName] = z
        obj.code = z
        return obj
    }

   const pro = prlist.map(pr)
useEffect(() => {
    if (props.datard.td_Image_Configuration[id]?.td_Group_Product_Name !== null && props.datard.td_Image_Configuration[id]?.td_Group_Product_Name !== undefined) {
        setSelectedprlist([pro[i]])
    } else {
        setSelectedprlist([])
    }
}, [])

 useEffect(() => {
     setSelectedCountries([])
}, [])

    const countryTemplate = (option) => {
        return (
            <div className="country-item">
                <img alt={option.name} src="images/flag/flag_placeholder.png"  />
                <div>{option.name}</div>
            </div>
        )
    }

    const selectedCountriesTemplate = (option) => {
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
        <div className="multiselect-demo">
            <div className="card">   
                <MultiSelect appendTo='self' value={selectedprlist} options={pro} 
            
                    onChange={(e) => {
                        handelOnchange({pid, id, identifiers, text:{target:{value:e.value}}, rootstage})
                        setSelectedprlist(e.value)
                    }}
                    optionLabel={`${objName}`}              
                  display="chip"
                />
               
            </div>
        </div>
    )
}

export const SelectOrg = (props) => {
    const [selectedprlist, setSelectedprlist] = useState(null)
    const [selectedCountries, setSelectedCountries] = useState(null)

    const {handelOnchange, pid, identifiers, also } = props
    const orlist = props.PrOrList.OrgList //Object.keys(props.PrOrList.OrgList)
    const i = props.datard?.td_images_org_configuration !== null && props.datard?.td_images_org_configuration !== undefined && props.datard?.td_images_org_configuration[0] !== null  && props.datard?.td_images_org_configuration[0] !== undefined && orlist.findIndex(org => org.organisation_id === props.datard?.td_images_org_configuration[0]?.td_Organisation_Id)    
    const orl = orlist.map((e) => {
        return {
            td_Organisation_Name:  e.organization_Name,  //props.PrOrList.OrgList[e],
            td_Organisation_Id : e.organisation_id
        }
    })
    useEffect(() => {
        if (props.datard.td_images_org_configuration !== null && props.datard.td_images_org_configuration[0]?.td_Organisation_Id !== null && props.datard.td_images_org_configuration[0]?.td_Organisation_Id !== undefined && i !== -1) {
            setSelectedprlist([orl[i]])
        } else { 
            setSelectedprlist([])
        }
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
                    onChange={(e) => {
                        
                        /* console.log(e.value) */
                        if (e.value.length > 0) {
                            handelOnchange({pid, identifiers:also, text:{target:{value:true}}, rootstage:true})
                        } else {
                            handelOnchange({pid, identifiers:also, text:{target:{value:false}}, rootstage:true})
                        }
                        handelOnchange({pid, identifiers, text:{target:{value:e.value}}, rootstage:true})
                        setSelectedprlist(e.value)
                    }}
                    optionLabel="td_Organisation_Name"               
                    display="chip"
                    
                />
            </div>
    </div>
    )
}


export const SelectTryonType = (props) => {
    const [selectedprlist, setSelectedprlist] = useState(null)
    const [selectedCountries, setSelectedCountries] = useState(null)
    const {handelOnchange, pid, identifiers, also } = props
    const Tryontype_list = ["Top", "Bottom", "Fullview"]
    const trlist =  Object.keys(Tryontype_list)
    const trl =  trlist.map((e) => {
        return {
            td_TryonType: Tryontype_list[e],
            td_TryonType_Id : e
        }
    })
    useEffect(() => {
        if (props.td_Tryon_Type === "Top") {
          setSelectedprlist([trl[0]])
        } else if (props.td_Tryon_Type === "Bottom") {
          setSelectedprlist([trl[1]])
        } else if (props.td_Tryon_Type === "Fullview") {
            setSelectedprlist([trl[2]])
          } else {
          setSelectedprlist([])
        }
      }, [props.td_Tryon_Type])

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
                <MultiSelect value={selectedprlist} options={trl} 
                //defaultValue={props.td_Tryon_Type}
                    onChange={(e) => {
                        
                        /* console.log(e.value) */
                        if (e.value.length > 0) {
                            handelOnchange({pid, identifiers:also, text:{target:{value:true}}, rootstage:true})
                        } else {
                            handelOnchange({pid, identifiers:also, text:{target:{value:false}}, rootstage:true})
                        }
                        handelOnchange({pid, identifiers, text:{target:{value:e.value}}, rootstage:true})
                        setSelectedprlist(e.value)
                        //const productArray = e.value.reduce((acc, curr) => `${acc}${curr.name},`, '')
                        //let productArray = e.value.reduce((acc, curr) => `${acc}${curr.td_TryonType},`, ''
                        //setSelectedprlist(productArray)
                      }}
                    optionLabel="td_TryonType"               
                    display="chip"
                />
            </div>
    </div>
    )
}

export const SelectGender = (props) => {
    const [selectedprlist, setSelectedprlist] = useState(null)
    const [selectedCountries, setSelectedCountries] = useState(null)
    const {handelOnchange, pid, identifiers, also } = props
    const Gender_list = ["Men", "women"]
    const genderlist =  Object.keys(Gender_list)
    const gen =  genderlist.map((e) => {
        return {
            td_Gender: Gender_list[e],
            td_Gender_Id : e
        }
    })
    useEffect(() => {
        if (props.td_Tryon_Gender === "Men") {
          setSelectedprlist([gen[0]])
        } else if (props.td_Tryon_Gender === "women") {
          setSelectedprlist([gen[1]])
        } else {
          setSelectedprlist([])
        }
      }, [props.td_Tryon_Gender])

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
                <MultiSelect value={selectedprlist} options={gen} 
                    onChange={(e) => {
                        
                        /* console.log(e.value) */
                        if (e.value.length > 0) {
                            handelOnchange({pid, identifiers:also, text:{target:{value:true}}, rootstage:true})
                        } else {
                            handelOnchange({pid, identifiers:also, text:{target:{value:false}}, rootstage:true})
                        }
                        handelOnchange({pid, identifiers, text:{target:{value:e.value}}, rootstage:true})
                        setSelectedprlist(e.value)
                      }}
                    optionLabel="td_Gender"               
                    display="chip"
                />
            </div>
    </div>
    )
}