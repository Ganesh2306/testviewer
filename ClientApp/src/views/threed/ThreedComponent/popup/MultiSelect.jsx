import React, { Component, filterData } from "react"
import makeAnimated from "react-select/animated"
import { components } from "react-select"
import MySelectUi from "./MultiSelectUi"

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
  { value: "Suit", label: "Suit", color: "#00B8D9" },
  { value: "Jacket", label: "Jacket", color: "#7367f0" },
  { value: "Shirt", label: "Shirt", color: "#7367f0" },
  { value: "Trouser", label: "Trouser", color: "#FF5630" },
  { value: "Tie", label: "Tie", color: "#FF8B00" } 
]

/* eslint-disable */
 Option = props => {
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
 const arr = []
export default class Example extends Component {
    constructor(props) {
        super(props)
        //this.orglist
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
 
    filterData = () => {
        props.PrOrList
        return []
    }

     arr = filterData()
   
    render() {
        return (
        <MySelectUi
         options={arr}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
       /* components={{ Option, MultiValue, animatedComponents }}*/
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
          styles={colourStyles}
      />
    )
  }
}

export const SelectProductList = (props) => {
  const [productlist, setProductlist] = useState(null)
 
  const orlist = Object.keys(props.PrOrList.OrgList) 
  const orl = orlist.map((e) => {
      return {
          name: props.PrOrList.OrgList[e],
          code: e
      }
  })    

  return (
      <div className="multiselect-demo">
          <div className="card">   
              <MultiSelect value={productlist} options={orl}
                  onChange={(e) => setProductlist(e.value)}
                  optionLabel="name"               
                  display="chip"
              />
          
          </div>
  </div>
  )
}