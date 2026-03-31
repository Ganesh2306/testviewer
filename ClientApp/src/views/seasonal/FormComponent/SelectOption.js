import React, { useState, useEffect } from "react"
import "../../design/DesignComponent/DesignStyle.css"


export const EditableSelect = (props) => {
    const [options, setoptions] = useState(``)
    const count = [1, 2, 3, 4, 5]
    useEffect(() => {
        setoptions('')
    }, [props.reset])
    const Options = (data) => {
        return <option value={data.value} >{data.label}</option>
    }
    const handelChange = (e) => {
        //TODO : --> Working 
        if (!(refSelectedId === null)) {
            const arr = getHead()
            console.log(refSelectedId)
            const id = parseInt(e.currentTarget.parentElement.parentElement.parentElement.id.split('-')[1])
            old[parseInt(refSelectedId)][arr[4 + id]] = e.target.value
            props.setreRender(true)
        }
    }


    return (
        <div className="form-check-inline col-sm-12 form-control pr-0">
            <div className="select-editable">
                <input type='text' className = 'pl-1'value={options === `select value` ? '' : options}
                    onChange={(e) => {                    
                        setoptions(e.target.value)
                    }}
                    onBlur={(e) => {
                        if (e.target.value !== '') props.onFocusOut(e)
                    }}>
                </input>
                <select id='abc' value={options === `select value` ? '' : options} form-control

                    onChange={(e) => {              
                        props.onChangeArticle(e)
                        setoptions(e.target.value)
                    }}>
                    {<option value='' style={{ display: 'none' }} disabled='disabled'></option>}
                    {
                        count.map((e, k) => {
                            return <Options key={k} value={e} label={e} />
                        })
                    }
                   
                </select>

            </div>
         
        </div>

    )
}
