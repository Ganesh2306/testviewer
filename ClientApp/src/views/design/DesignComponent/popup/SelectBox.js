import React, { useState, useEffect } from "react"
import Select from "react-select"
import { Input, FormGroup } from 'reactstrap'
import { selectThemeColors } from "@utils"
//import {  }
import "./../DesignStyle.css"

export const Selectbox = (props) => {
    const [options, setoptions] = useState(``)
    const [showWarning, setShowWarning] = useState(false)
  
    const Options = (op) => {
      return (
        <option tempid={op.value.design_featuretype_id} value={op.value.design_featuretype_name}>
          {op.value.design_featuretype_name}
        </option>
      )
    }
  
    const isValidInput = (inputValue) => {
      if (props.name === "Stock" || props.name === "Rating") {
        return /^\d+$/.test(inputValue) // only allow integers
      }
      return true  
    }
  
    const handleInputChange = (e) => {
      const inputValue = e.target.value
      if (inputValue === '' || isValidInput(inputValue)) {
        setShowWarning(false)// hide warning message
        setoptions(inputValue)
        // if (props.data.includes(inputValue)) {
        //   props.onSchange(e)
        // }
        if (e.key === 'Enter') {
          props.onEnter(e)
        }
      } else {
        setShowWarning(true) // show warning message
        console.error("Invalid input for FidName", props.name, ". Only integers are allowed.")
      }
    }
  
    return (
      <div className="form-check-inline">
        <div className="select-editable">
          <input
            placeholder="Select"
            type="text"
            value={options === `select value` ? '' : options}
            title={options ? ` ${options}` : ''} 
            onChange={handleInputChange}
            disabled={!(props.access.current !== null && props.access.current["111119"] && props.access.current["111119"]["211119"])}
            // onBlur={(e) => {
            //   if (e.target.value !== '') props.onFocusOut(e)
            // }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                // props.onSchange(e)
                props.onEnter(e)
              }
            }}
            
          />
          <select
            id={`s-list-${props.tempid}`}
            value={options === `select value` ? '' : options}
            form-control
            onChange={(e) => {
              if (isValidInput(e.target.value)) {
                props.onSchange(e)
                setoptions(e.target.value)
              }
            }}
            onClick={(e) => {
              // Trigger action when clicking the same option
              if (e.target.value === options) {
                  props.onSchange(e)  // Trigger the same event
              }
          }}
          >
            <option value="" style={{ display: 'none' }} disabled="disabled"></option>
            {props.data.map((e, k) => {
              return <Options key={k} value={e} />
            })}
          </select>
          {showWarning && (
              <h6 style={{ color: 'red', fontSize: '12px' }}>
               Please enter numeric values
              </h6>
            )}
        </div>
      </div>
    )
  }

export let  tempstore = {}

export const settempstore = () => {
    tempstore = {}
} 

export const SelectboxModify = (props) => {
  const [options, setoptions] = useState("")
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    setoptions(props.defaultV)
  }, [props.defaultV])

  const isValidInput = (inputValue) => {
    if (props.FidName === "Stock" || props.FidName === "Rating") {
      return /^\d*$/.test(inputValue)  // Allow only numbers
    }
    return true
  }

  const handleInputChange = (e) => {
    if (isValidInput(e.target.value)) {
      setShowWarning(false)
      tempstore[props.tempid] = e.target.value
      if (props.data.includes(e.target.value)) {
        props.onSchange(e)
      }
      setoptions(e.target.value)
    } else {
      setShowWarning(true)
      console.error("Invalid input for FidName", props.FidName, ". Only numbers are allowed.")
    }
  }

  return (
    <div className="form-check-inline">
      <div className="select-editabledm">
        <input
          disabled={props.readOnly}
          className="form-control"
          list={`s-list-${props.tempid}`}
          placeholder="SELECT"
          type="text"
          autoComplete="off" 
          value={options}
          onInput={handleInputChange} // Use onInput for dynamic updates
          // onBlur={(e) => {
          //   if (e.target.value !== "") props.onFocusOut(e)
          // }}
        />
        <datalist id={`s-list-${props.tempid}`}>
          {props.data.map((e, k) => (
            <option key={k} value={e.design_featuretype_name} />
          ))}
        </datalist>
        {showWarning && (
          <h6 style={{ color: "red", fontSize: "12px" }}>Please enter numeric values</h6>
        )}
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