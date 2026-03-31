import React, { useState, useEffect } from "react"
import Select from "react-select"
import { Input, FormGroup } from 'reactstrap'
import { selectThemeColors } from "@utils"
//import {  }
import "./../DesignStyle.css"

//! props -> data  onFocusOut   onSelect
export const Selectbox = (props) => {
  const [options, setoptions] = useState(``)
  const Options = (op) => {
      return (
          <option tempid={op.value.design_featuretype_id} value={op.value.design_featuretype_name}>{op.value.design_featuretype_name}</option>
      )
  }
  
  return (
   <div className="form-check-inline">
      {/* <Input type='checkbox' defaultChecked id='' /> */}  
        <div className="select-editable">     
            <datalist id={`s-list-${props.tempid}`} value={options === `select value` ? '' : options} form-control>
                <option value=""></option>
                {
                    
                    props.data.map((e, k) => {
                        
                        return <Options key={k} value={e}  />
                    })
                }
            </datalist>
            <Input className ="form-control" list={`s-list-${props.tempid}`} /* defaultValue={} */  placeholder='SELECT' type="text" 
            onBlur ={(e) => {
                    if (e.target.value !== '')  props.onFocusOut(e)
            }} 
                    value = {options} onChange={(e) => {
                    if (props.data.includes(e.target.value)) {
                        props.onSchange(e)
                    }
                    setoptions(e.target.value)                
                }}/>
        </div>
        </div>

  )
}

export let  tempstore = {}

export const settempstore = () => {
    tempstore = {}
} 
export const SelectboxModify = (props) => {
    const [options, setoptions] = useState(``)
    useEffect(() => {
        setoptions(props.defaultV) 
    }, [])
    
    const Options = (op) => {
        return (
            <option tempid={op.value.design_featuretype_id} value={op.value.design_featuretype_name}>{op.value.design_featuretype_name}</option>
        )
    }
    
    return (
     <div className="form-check-inline">
        {/* <Input type='checkbox' defaultChecked id='' /> */}  
          <div className="select-editabledm">     
              <datalist id={`s-list-${props.tempid}`} value={options === `select value` ? '' : options} form-control>
                  <option value=""></option>
                  {
                      props.data.map((e, k) => {    
                          return <Options key={k} value={e}  />
                      })
                  }
              </datalist>
              <Input disabled={props.readOnly && true} className ="form-control" list={`s-list-${props.tempid}`}  placeholder='SELECT' type="text" onBlur ={(e) => {
                      if (e.target.value !== '')  props.onFocusOut(e)
              }} 
                      value = {options} onChange={(e) => {
                        //tempstore = e.target.value
                        tempstore[props.tempid] = e.target.value
                      if (props.data.includes(e.target.value)) {
                           
                          props.onSchange(e)
                      }
                      setoptions(e.target.value)                
                  }}/>
          </div>
          </div>
  
    )
  }

export const Ratining = (props) => {
    const [coption, setcoption] = useState('')
    const count = [1, 2, 3, 4, 5]
    useEffect(() => {
      setcoption('')
    }, [props.reset])
    const Options = (data) => {
      return <option value={data.value} >{data.label}</option>
    }
      return (
          <>
           <Input id={props.id} type='select'
           value={coption}
           onChange={(e) => {
             setcoption(e.target.value)
             props.onChange(e) 
            }
            }
              className='input_custom'>
               {<option value='none' >Please select</option>}
             {
               count.map((e, k) => {
                 return <Options key={k} value={e} label={e} />
               })
             }
          </Input>
          </>
      )
  }