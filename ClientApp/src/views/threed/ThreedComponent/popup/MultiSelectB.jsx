import React, { Component } from "react"
import makeAnimated from "react-select/animated"
import MultiSelectUiOrganization from "./MultiSelectUiOrganization"
import { components } from "react-select"

const colourStyles = {
  menuList: styles => ({
      ...styles,
      background: '#fff'
  }),
  option: (styles, {isFocused, isSelected}) => ({
      ...styles,
      background: isFocused ? '#7367f033' : isSelected ? '#7367f0' : undefined,      
      zIndex: 1 }),
      menu: base => ({
      ...base,
      zIndex: 100
  })
  }
  
const colourOptions = [
  { value: "Suitaaa", label: "Suit", color: "#00B8D9" },
  { value: "Jacket", label: "Jacket", color: "#7367f0" },
  { value: "Shirt", label: "Shirt", color: "#7367f0" },
  { value: "Trouser", label: "Trouser", color: "#FF5630" },
  { value: "Tie", label: "Tie", color: "#FF8B00" } 
]

/* eslint-disable */
const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}

const MultiValue = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
)

const animatedComponents = makeAnimated()

export default class SelectOrg extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      // eslint-disable-next-line no-use-before-define
      optionSelected: null // eslint error no-invalid-this
    }
  }

  handleChange = selected => {
    // eslint-disable-next-line no-use-before-define
    this.setState({
      // eslint-disable-next-line no-use-before-define
      optionSelected: selected // eslint error no-invalid-this
    })
  }

  render() {
    return (
      <MultiSelectUiOrganization    
        options={colourOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option, MultiValue, animatedComponents }}
        onChange={this.handleChange}
        allowSelectAll={true}
        value={this.state.optionSelected}
        styles={colourStyles}
      />
    )
  }
}

