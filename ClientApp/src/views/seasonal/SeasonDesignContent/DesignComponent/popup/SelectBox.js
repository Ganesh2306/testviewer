import React, { useState, useEffect } from "react"
import { Input } from 'reactstrap'
//import {  }
import "./../DesignStyle.css"
export const Selectbox = (props) => {
  const [options, setoptions] = useState(``)
  const Options = (op) => {
      return (
          <option tempid={op.value.design_featuretype_id} value={op.value.design_featuretype_name}>{op.value.design_featuretype_name}</option>
      )
  }
  
  return (
   <div className="form-check-inline">

       <div className="select-editable">  
          <input  type='text' value={options === `select value` ? '' : options}
           onChange={(e) => {              
                        setoptions(e.target.value) 
                        }}
           onBlur ={(e) => {
               if (e.target.value !== '')  props.onFocusOut(e)
            }}>
           </input>  
                <select id={`s-list-${props.tempid}`} value={options === `select value` ? '' : options} form-control 
                 
                  onChange={(e) => {
                        //if (props.data.includes(e.target.value)) {
                            props.onSchange(e)
                        //}
                        setoptions(e.target.value) 
                        }}>
                              {<option value='' style={{display : 'none'}} disabled='disabled'></option>}
                   
                    {
                        
                        props.data.map((e, k) => {
                            
                            return <Options key={k} value={e}  />
                        })
                    }
                </select> 
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
          <div className="select-editabledm">     
              <datalist id={`s-list-${props.tempid}`} value={options === `select value` ? '' : options} form-control>               
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

export const Rating = (props) => {
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
               {<option value='' style={{display : 'none'}} disabled='disabled'></option>}
             {
               count.map((e, k) => {
                 return <Options key={k} value={e} label={e} />
               })
             }
          </Input>     
          </>
      )
}

