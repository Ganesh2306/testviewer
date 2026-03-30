/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Col, Row, Label, Input } from 'reactstrap'
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes"
import AsyncSelect from 'react-select'
import { selectThemeColors } from '@utils'
import wNumb from 'wnumb'
import Nouislider from 'nouislider-react'
import Rating from 'react-rating'
import { Star } from 'react-feather'
import '../../css/designpage.css'

export const colourOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' }
]

export const GpDropDownBox = (props) => {
  const [coption, setcoption] = useState("")
  useEffect(() => {
    setcoption((props.op  && localStorage.getItem('warehouse')) ? localStorage.getItem('warehouse') : "")
  }, [props.reset])
  const Options = (data) => {
    return <option value={data.value} >{data.label}</option>
  }
    return (
        <>
            <div className="justify-content-end p-0 clearfix" style={{ display: props.option.length  === 1 ? 'none' : 'block' }}>
        <Label>{props.label}</Label>
         <Input type='select'
         value={coption}
         onChange={(e) => {
          
           setcoption(e.target.value)
           if(e.target.selectedIndex !== 0) {
            props.onChange(props.label, e.target[e.target.selectedIndex].text, e, e.target[e.target.selectedIndex].text)
           }else{
            props.onChange(props.label, '', e, e.target[e.target.selectedIndex].text)
           }
          
          }}
            className='input_custom'>     
           {
             props.option.map((e, k) => {
               return <Options key={k} value={e.design_featuretype_id} label={e.design_featuretype_name} />
             })
           }
        </Input>
        </div>
        </>
    )
}

export const WpDropDownBox = (props) => {
  const [coption, setcoption] = useState("")
 useEffect(() => {
const localVal = localStorage.getItem('warehouse')
const availableOptions = props.option?.map(opt => opt.design_featuretype_id)

// Check if localStorage value exists in options
if (availableOptions.includes(localVal)) {
  setcoption(localVal)
  localStorage.setItem('warehouse', localVal)
} else {
  const firstOption = props.option?.[0]?.design_featuretype_id || "";
  setcoption(firstOption)
  localStorage.setItem('warehouse', firstOption)
}
  }, [props.reset, props.option])
    const Options = (data) => {
    return <option value={data.value} >{data.label}</option>
  }
    return (
        <>
            <div className="justify-content-end p-0 clearfix">
        <Label>{props.label}</Label>
         <Input type='select'
         value={coption}
         onChange={(e) => {
          if (e.target.value == 'All') {
            setcoption(e.target.value)
            props.onChange(props.label, '', e, e.target[e.target.selectedIndex].text === `All` ? localStorage.getItem('ForAllSearch') : e.target[e.target.selectedIndex].text)
            return
          }
           setcoption(e.target.value)
            props.onChange(props.label, '', e, e.target[e.target.selectedIndex].text === `All` ? "" : e.target[e.target.selectedIndex].text)
           //}
          
          }}
            className='input_custom' id="mySelect">
           {
             props.option.map((e, k) => {
               return <Options key={k} value={e.design_featuretype_id} label={e.design_featuretype_name} />
             })
           }
        </Input>
        </div>
        </>
    )
}
let elem
export const DropDownBox = (props) => {
  const [coption, setcoption] = useState('')

  useEffect(() => {
    setcoption('')
  }, [props.reset])

  const Options = (data) => {
    return <option value={data.value}>{data.label}</option>
  }
const sortedOptions = [...props.option].sort((a, b) => {
  const nameA = a.design_featuretype_name || '' 
  const nameB = b.design_featuretype_name || '' 
  if (props.label === 'GSM-Weight') {
    const aHasOz = nameA.includes("Oz")
    const bHasOz = nameB.includes("Oz")
    if (aHasOz && bHasOz) {
      return parseFloat(nameA) - parseFloat(nameB)
    }
    if (aHasOz) return -1
    if (bHasOz) return 1

  }
return nameA.localeCompare(nameB)
})
const uniqueId = `${props.label.replace(/\s+/g, '')}_label`;
  return (
    <>
      <div className="justify-content-end p-0 clearfix" id={uniqueId} >
       <Label id={coption}>{props.label}</Label>
        <Input
          type='select'
          value={coption}
          onChange={(e) => {
            setcoption(e.target.value);
            if (e.target.selectedIndex !== 0) {
              elem = e.target[e.target.selectedIndex].text
              props.onChange(props.label, e.target[e.target.selectedIndex].text, false)
            } else {
              props.onChange(props.label, '', false)
            }
          }}
          className='input_custom'
          ref={props.selectRef}
        >
          {props.label.toLowerCase() !== 'group' ? <option value='none'>Select</option> : <></>}
          {sortedOptions.map((e, k) => {
            return <Options key={k} value={e.design_featuretype_id || e.design_featuretype_name} label={e.design_featuretype_name} />
          })}
        </Input>
      </div>
    </>
  )
}
export const ColourDropDownBoxWithouthSearch = (props) => {
  const [coption, setcoption] = useState('')
  useEffect(() => {
    setcoption('')
  }, [props.reset])
  const Options = (data) => {
    return <option value={data.value} >{data.label}</option>
  }
    return (
        <>
            <div className=" justify-content-end p-0 clearfix">
        <Label>{props.label}</Label>
         <Input type='select'
         value={coption}
         onChange={(e) => {
           setcoption(e.target.value)
           props.onChange(e)}}
            className='input_custom'>
             {props.label.toLowerCase() !== 'group' ? <option value='none' >Select</option> : <></>}
           {
             props.option.map((e, k) => {
               return <Options key={k} value={e.design_featuretype_id} label={e.design_featuretype_name} />
             })
           }
        </Input>
        </div>
        </>
    )
}

export const InputBox = (props) => {
  const [Text, setText] = useState('')
  useEffect(() => {
    setText('')
  }, [props.reset])
  
    return (
        <>
            <div className="justify-content-end clearfix" >
         <Label>{props.label}</Label>
        <Input type='text' value={Text} onChange={(e) => {
          setText(e.target.value)
      
          props.onChange(props.label, e.target.value)}} className='input_custom'/>
        </div>
        </>
    )
}

/*select custominput below*/
export const DropDownCheckBox = (props) => {
    return (
        <>
            <div className=" justify-content-end clearfix">
                <Label>{props.lablemulti}</Label>
                <Input type="select" name="select" id="exampleSelect" className='input_custom' onChange={

                  (e) => props.onChange(props.label, e.target.value)
                } >      
        </Input>
            </div>
        </>
    )
}

/*multi select range below*/
export const MultiSelect = (props) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    setSelectedOptions([{ label: "All", value: "*" }, ...options]);
  }, []);
  
  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }
    return (
        <>
            <div className=" justify-content-end clearfix">
        <Label>{props.lablemulti} </Label>
        <div id='selectoption'>
        <ReactMultiSelectCheckboxes
          options={[{ label: "All", value: "*" }, ...options]}
          placeholderButtonLabel="Option"
          getDropdownButtonLabel={getDropdownButtonLabel}
          value={selectedOptions}
          onChange={onChange}
          setState={setSelectedOptions}     
    />
    </div>
    </div>
    </>
    )
}


const TextBox = (props2) => {
  let b, c
  const { val, setval, props, max, min } = props2
  return (
    <Row>
          <Col className="d-flex justify-content-between clearfix" style={{width:'100px', float:'right', marginTop:'0px', marginBottom:'10px'}}>
                  <Input type='number' 
                  max={max}
                  min={min}
                  value={`${val[0]}`.split('?').length === 1 ? `${val[0]}` : `${val[0]}`.split('?')[1]  } 
                  onChange={(e) => {
                    let passVal1 = e.target.value
                    let passVal2 = val[1].toString().replace('?','').trim()
                    let finalValue = `${passVal1}+${passVal2}`
                     if (passVal1 === min.toString() && passVal2 === max.toString()) {
                      finalValue = ""
                     }
                      props.onChange(props.label, finalValue, b = false , c = true)
                      setval([`?${e.target.value}`,`${val[1]}`])
                      }} style={{width:'80px'}}/> 
                   
                   <Input type='number' 
                   max={max}
                   min={min}
                   value={`${val[1]}`.split('?').length === 1 ? `${val[1]}` : `${val[1]}`.split('?')[1]} 
                   onChange={(e) => {
                    let passVal1 = val[0].toString().replace('?','').trim()
                    let passVal2 = e.target.value
                    let finalValue = `${passVal1}+${passVal2}`
                     if (passVal1 === min.toString() && passVal2 === max.toString()) {
                      finalValue = ""
                     }
                     props.onChange(props.label, finalValue, b = false , c = true)
                   setval([`${val[0]}`,`?${e.target.value}`]) 
                       }} style={{width:'80px'}}/>
        </Col>
    </Row>
  )
}
  //! --Min eg 0 --Max eg 100
  //! start and end  valeu for slider 
  //** default min 0 max 100 same for Strat 
  export const DoubleRangeSlider = (props) => {
      const [val, setval] = useState([props.start ,props.end])
      const [ishide, setishide] = useState(true)
      let b , c
     
      useEffect(() => {
        setval([props.start ,props.end])
      }, [props.reset])
      
      const colorOptions = {
        start: val,
        connect: true,
        step: props.step === undefined ? 0 : props.step,
        tooltips: [ishide, ishide],
        range: {
          min: props.min ? props.min : 0,
          max: props.max ? props.max : 100 
        },
        onChange: e => {
          setval(e)
            if (!((props.min === parseInt(e[0])) && (props.max === parseInt(e[1])))) {
                props.onChange(props.label, `${e[0]}+${e[1]}`, b = false, c = (props.label.toLowerCase() === 'price' || props.label.toLowerCase() === 'stock') ? true : false) //shubham added purpose:slider of stock not working
            } else {
                props.onChange(props.label, ``, b = false, c = (props.label.toLowerCase() === 'price' || props.label.toLowerCase() === 'stock') ? true : false)
            }
        },
        format:wNumb({
          decimals: 0,
          prefix: ''
      })
      }
      const ShowVal = (a, b) => {
          if(a != b) {
              return [a, b]
          }
      }
      const handelOnchange = (e) => {
          if(e[0] === e[1]){ 
              return [e[0] - 1 , e[1]]
          }else {
              return []
          }
      }

      return (
          <div className='price-slider justify-content-end clearfix'>
              <Label className=''>{props.label}</Label>
              <div className='price-slider input_custom'>
          <Nouislider
          {...colorOptions}
          />
          <br />
          {
            props.isDouble ? <TextBox props={props} setval={setval} val={val} max={props.max} min={props.min} /> : <></>
          }
        </div>
      </div>
      )
    }


/*select dropdown date*/
 export const FTDate = (props) => {
   const a = new Date()
    return (      
        <div className=" justify-content-end clearfix">
             <Label>{ props.label }</Label>
            <div className=" input_custom justify-content-between" >
                <Input type='date' name='From' 
                max={`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}`} className='' 
                style={{ width: '48%' }}/>
                <Input type='date' name='To' className='' 
                style={{ width: '48%' }} max={`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}`} />
            </div>
        </div>
    )
  }
/*select dropdown basic*/

export const Basicselect = (props) => {
    const [lableV, setlableV] = useState(props.value)
    useEffect(() => {
        setlableV(props.value)
    }, [props.value])
    return (
        <div className="justify-content-end clearfix">
            <Label>{props.label}</Label>   
               <AsyncSelect
                theme={selectThemeColors}
                className='input_custom border-rounded-0'
                classNamePrefix='select'
                value={lableV}
                options={props.option}
                isClearable={false}
                onChange={ (e) => {
                  setlableV(e)
                  props.handelChange !== undefined ? props.handelChange(e) : ''
                } }                
            /> 
        </div>
    )
}

export const BasicselectB = (props) => {
  const [labelV, setLabelV] = useState(props.value)

  useEffect(() => {
      setLabelV(props.value)
  }, [props.value])

  const Options = ({ value, label }) => {
      return <option value={value}>{label}</option>
  }
  return (
      <div className="justify-content-end p-0 clearfix" id="Type_Id" style={{ display: props.option.length  <= 1 ? 'none' : 'block' }}>
          <Label>{props.label}</Label>
          <Input
              type='select'
              value={labelV}
              onChange={(e) => {
                  const selectedValue = e.target.value
                  setLabelV(selectedValue)
                  if (props.handelChange) {
                      props.handelChange(e) 
                  }
              }}
              className='input_custom'
          >
              {props.option.map((e, k) => (
                  <Options key={k} value={e.value} label={e.label} />
              ))}
          </Input>
      </div>
  )
}

export const DoubleEdit = (props) => {
    return (
        <div className="justify-content-end clearfix">
            <Label>{props.Edit}</Label>
            <div className=" input_custom justify-content-between" >
                <Input type='text' style={{ width: '48%' }} />
                <Input type='text' style={{ width: '48%' }} />
            </div>
        </div>
    )
  }

export const DesignRatings = (props) => {
  const [rating, setrating] = useState()

    const secondExample = {
        a11y: true,
        isHalf: true,
        onChange: newValue => {
            setrating(newValue)
            if(newValue !== 0){
              props.onChange(props.label, newValue.toString())
            } else {
              props.onChange(props.label, '')
            }
        }

    }

    useEffect(() => {
      setrating(0)
     
    }, [props.reset])
    
    return (
        <>
        <div className="justify-content-end clearfix">
        <Label>{props.label}</Label>
        <div style={{paddingRight: '1.5rem', float: 'right'}} 
        className="input_custom form-control"
        >
        <Rating {...secondExample}
            initialRating={rating}
            emptySymbol={<Star size={14} fill='#babfc7' stroke='#babfc7' />}
            fullSymbol={<Star size={14} fill={props.filledColor} stroke={props.filledColor}
             />}         
        />
        </div>
           </div>
      </>
    )
}
