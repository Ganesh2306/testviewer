import { useEffect, useState, useLayoutEffect } from "react"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import "./../DesignStyle.css"
//import { getRole } from "../../utility/GetAllProduct"
import Multiselect from 'multiselect-react-dropdown'
import ThumbGenerator from "../../utility/ThumbGenerator"
import { SingleColourComponent, SelectProGroup } from "../../ComponentType/MultiSelectCompnent"
import {
    Table,
    FormGroup,
    Label,
    Input
} from "reactstrap"
import { getHead } from "./AddDesign"
import { Selectbox, Rating } from "./SelectBox"
import axios from "axios"
// './CropDesign/js/init.js'
//import fabricJsObj1 from '../../../../../public/js/TdsFabric.min'

export const forColour = { value: null }
const Customcomponent = {
    Rating: (e) => <Rating id={e.id} onChange={e.onChange} />,
    Product: (e) => <SelectProGroup myid={e.myid} key={e.k} id={e.id}
        onChange={e.onChange}
        label={e.name}
    />,
    Color: (e) => <SingleColourComponent setSelectedColour={forColour} myid={e.myid} key={e.k} colourInfo={e.colourInfo ? JSON.parse(e.colourInfo) : {}}
        onChange={e.onChange}
        option={e.option} label={e.name}
        list={e.list} reset={e.reset} />
}

export let old = []
export let PRICE_ID = null
export let STANDARD = {
    PRICE_ID: null,
    STOCK: null,
    RATING: null,
    CREDIT: null,
    PRODUCT: null
}
window.getold = () => {
    return old
}
//const glob
export let MandatoryOptionsId = {}
export let refSelectedId = null
let selectedId = null
window.ShowSelected = () => [selectedId, refSelectedId]
let f = false

//export let bulkold = []
export const deleteRowUploaded = (arr) => {
    //for 
    const new_old = old.filter((el) => {
        return arr.includes(el.Dm_Design)
    })
    old = new_old
    //setxlRerender(true)
}

export const addXlData = (row, temp) => {
    for (let i = 0; i < old.length; i++) {
        for (let j = 0; j < row[i + 1].length; j++) {

            old[i][temp[j]] = row[i + 1][j]

        }
    }
}
//! pos : true string curentString inital flag
//ToDo: Work in progress
const DesignCode = (pos, add, str, f) => {
    if (pos) {
        if (str.split('-').length === 1) {
            return `${add}-${str}`
        } else {
            //! if pre is set  
            if (!f && (str.split('-').length === 2)) {
                //return `${add}-${str.split('-')[1]}${str.split('-')[1] === undefined ? '' :  str.split('-')[1]}`
                return `${add}-${str.split('-')[1]}${str.split('-')[2] === undefined ? '' : `-${str.split('-')[2]}`}`
            } else {
                return `${add}-${str.split('-')[1]}-${str.split('-')[2]}`
            }
        }
    } else {
        if (str.split('-').length === 1) {
            return `${str}-${add}`
        } else {
            //! if post is set then 
            if (f && (str.split('-').length === 2)) {
                return `${str.split('-')[0]}-${add}`
            } else {
                return `${str.split('-')[0]}-${str.split('-')[1]}-${add}`
            }
        }
    }
}

const getFilteredData = (Data) => {
    try {
        const options = Data.option.split('-')
        let DesignTypes = null
        let designFeatures = []
        for (let i = 0; i < Data.rollData.allDesignTypesByRoles.length; i++) {
            if (`${Data.rollData.allDesignTypesByRoles[i].design_type_id}` === options[0].trim()) {
                DesignTypes = Data.rollData.allDesignTypesByRoles[i]
                for (let j = 0; j < DesignTypes.getDesignGroupsByRoleListDto.length; j++) {
                    if (`${DesignTypes.getDesignGroupsByRoleListDto[j].design_groups_id}` === options[1].trim()) {
                        designFeatures = DesignTypes.getDesignGroupsByRoleListDto[j].getDesignFeaturesByRoleListDto
                        return designFeatures
                    }
                }
            }
        }
        return designFeatures
    } catch (error) {
        return []
    }
}

const Td = (data) => {
    return <td >{data.arr}</td>
}
// manisha
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useLayoutEffect(() => {
        handleSize()

        window.addEventListener("resize", handleSize)

        return () => window.removeEventListener("resize", handleSize)
    }, [])
    return windowSize
}
// manisha
const TableRow = (props) => {
    const [checkid, setcheckid] = useState(props.name.split('.')[0])
    useEffect(() => {
        if (selectedId === null || selectedId === 0) {
            document.getElementById(`row-${0}`).style.backgroundColor = '#f7f7f7'
            selectedId = 0
            refSelectedId = 0
        }
    }, [])

    // const handleOpenCrop = (e, props) => {
    //     e.stopPropagation()
    //     e.preventDefault()
    //     if (window.fabricJsObj1) {
    //         window.fabricJsObj1.loadCrop()
    //         window.getImage(props.name, true, props.url)
    //     } else {
    //         console.error("fabricJsObj1 not initialized")
    //     }
    // }
    const Thead = getHead()
    const constantValues = ['Dm_Design_Code', 'Dm_Article', 'Dm_Design', 'Dm_Variant', 'Dm_Design_Code']//Abhishek Dm_Design_Code
    return (
        <>
            <tr id={`row-${props.id}`} key={props.id} onClick={(e) => {

                if (selectedId !== null) {
                    document.getElementById(`row-${selectedId}`).style.removeProperty('background-Color')
                }
                document.getElementById(`row-${props.id}`).style.backgroundColor = '#f7f7f7'
                selectedId = props.id
                refSelectedId = props.id
            }} >
                <td>
                    <span className="align-middle ">{props.id + 1}</span>
                </td>
                <td>
                    <div className="align-items-center flex-column justify-content-center">
                        {/* <div id="cropper-container"> */}
                            {/* <div id="mainDivId"></div> */}
                        {/* </div> */}
                        <div className="thumbouter">
                            {/* <button
                                className="crop-btn"
                                id="ok"
                                onClick={(e) => {
                                    handleOpenCrop(e, props)
                                }}
                            >
                                ✂️
                            </button> */}
                            <div className="thumbImg" style={{ backgroundImage: `url("${props.url}")` }}></div></div>
                        <div className="align-middle thumbdesign_name" title={props.name.split('.')[0]}>{props.name.split('.')[0]}</div>
                    </div>
                </td>
                <td>
                    <FormGroup>
                        <Input type="text" id="basicInput" value={props.e[constantValues[0]]}
                            onChange={(e) => {
                                old[props.id][constantValues[0]] = e.target.value
                                setcheckid(e.target.value)
                                props.setreRender(true)
                            }}
                        />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup>
                        <Input type="text" id="basicInput" value={props.e[constantValues[1]]}
                            onChange={(e) => {
                                old[props.id][constantValues[1]] = e.target.value
                                const a = `${old[props.id][constantValues[1]]}` === '' ? '' : `${old[props.id][constantValues[1]]}-`
                                const v = `${old[props.id][constantValues[3]]}` === '' ? '' : `-${old[props.id][constantValues[3]]}`
                                old[props.id][constantValues[0]] = `${a}${old[props.id][constantValues[2]]}${v}`
                                props.setreRender(true)

                            }}
                        />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup>
                        <Input
                            type="text"
                            id="basicInput"
                            value={props.e[constantValues[2]]}
                            onChange={(e) => {
                                old[props.id][constantValues[2]] = e.target.value
                                const a = `${old[props.id][constantValues[1]]}` === '' ? '' : `${old[props.id][constantValues[1]]}-`
                                const v = `${old[props.id][constantValues[3]]}` === '' ? '' : `-${old[props.id][constantValues[3]]}`
                                old[props.id][constantValues[0]] = `${a}${old[props.id][constantValues[2]]}${v}`
                                props.setreRender(true)
                            }}
                        />
                    </FormGroup>
                </td>
                <td>
                    <FormGroup>
                        <Input type="text" id="basicInput" value={props.e[constantValues[3]]}
                            onChange={(e) => {
                                old[props.id][constantValues[3]] = e.target.value
                                const a = `${old[props.id][constantValues[1]]}` === '' ? '' : `${old[props.id][constantValues[1]]}-`
                                const v = `${old[props.id][constantValues[3]]}` === '' ? '' : `-${old[props.id][constantValues[3]]}`
                                old[props.id][constantValues[0]] = `${a}${old[props.id][constantValues[2]]}${v}`
                                //! pos : true string curentString inital flag
                                props.setreRender(true)
                            }}
                        />
                    </FormGroup>
                </td>
                {/* <td>
                <FormGroup>
                        <Input type="checkbox" id={`check-${checkid}`}
                         onChange={(e) => { 
                          }} 
                       />
                </FormGroup>
                </td>
                <td>
                <FormGroup>
                        <Input type="checkbox" 
                        id={`Repeat-${checkid}`}
                         onChange={(e) => { 
                            if (e.target.checked) {
                            props.singlerepeat.current = true   
                            }
                          }} 
                       />
                </FormGroup>
                </td> */}
                {/* 2 checkbox hided for renderstatus and singlerepeat */}
                {
                    Thead.map((e, k) => {
                        if (k > 3) {
                            return (<Td id={`${6 + k - 3}`} data={e} arr={props.e[Thead[4 + k - 4]]} />)
                        }
                    })
                }
            </tr>
        </>
    )
}

const TableHeader = (props) => {

    //ToDo Add Price id in PRICE_ID
    if (props.name.toLowerCase() === 'price') {
        PRICE_ID = props.id
        STANDARD.PRICE_ID = props.id
    } else if (props.name.toLowerCase() === 'stock') {
        STANDARD.STOCK = props.id
    } else if (props.name.toLowerCase() === 'credit') {
        STANDARD.CREDIT = props.id
    } else if (props.name.toLowerCase() === 'rating') {
        STANDARD.RATING = props.id
    } else if (props.name.toLowerCase() === 'product') {
        STANDARD.PRODUCT = props.id
    }
    return (
        <>
            <th id={props.id} c_id={props.cid}>{props.name} {props.is_Mandatory && <span style={{ color: "red" }}>*</span>}</th>
        </>
    )
}

const TableData = (props) => {

    const handelChange = (e) => {
        //TODO : --> Working

        //-------------Delete feature type------------//
        const arr = getHead()
        const id = parseInt(e.currentTarget.parentElement.parentElement.parentElement.id.split('-')[1])
        const tempid = e.target.options[e.target.selectedIndex]
        const ctempid = parseInt(tempid.getAttribute('tempid'))
        const selectedfeature = {
            FeatureId: parseInt([arr[4 + id]][0]),
            FeatureTypeId: ctempid,
            Feature: props.name,
            FeatureTypeName: e.target.value
        }
        props.selectedfeatureRef.current = selectedfeature
        if (!(refSelectedId === null)) {
            const arr = getHead()
            const id = parseInt(e.currentTarget.parentElement.parentElement.parentElement.id.split('-')[1])
            old[parseInt(refSelectedId)][arr[4 + id]] = e.target.value
            props.setreRender(true)
        }
    }

    const handelClick = (e) => {
        if (e.target.checked === true) {

            f = true
            const arr = getHead()
            const text = e.currentTarget.parentNode.parentNode.lastElementChild.lastElementChild.firstElementChild.value
            const id = parseInt(e.currentTarget.parentNode.parentNode.attributes.id.nodeValue.split('-')[1])
            let i = 0
            while (i < old.length) {
                old[i][arr[4 + id]] = text
                i++
            }
            props.setreRender(true)
        } else if (e.key === 'Enter') {
            f = true
            let id
            const arr = getHead()
            const text = e.currentTarget.parentNode.parentNode.lastElementChild.childNodes[0].value
            const node = e.currentTarget.parentNode.parentNode.childNodes[0].childNodes
            const selectElement = Array.from(node).find(node => node.nodeName === 'SELECT' && node.id.startsWith('s-list-'))
            if (selectElement) {
                id = parseInt(selectElement.id.split('-')[2])
            }
            // let i = 0
            // //let ofset = 6
            // while (i < old.length) {
            //     old[i][arr[4 + id]] = text
            //     i++
            // }
            old[parseInt(refSelectedId)][arr[4 + id]] = e.target.value
            props.setreRender(true)
        } else {
            const arr = getHead()
            let i = 0
            const id = parseInt(e.currentTarget.parentNode.parentNode.attributes.id.nodeValue.split('-')[1])
            while (i < old.length) {
                old[i][arr[4 + id]] = ''
                i++
            }
            props.setreRender(true)
            f = false
        }
    }
    const onChange = (e, _id, myid, _Test) => {
        if (myid === 'Rating') {
            const arr = getHead()
            const id = parseInt(document.getElementById("custom-id-Rating").parentElement.id.split('-')[1])
            const text = document.getElementById("custom-id-Rating").value
            let i = 0
            if (e.target.checked) {
                while (i < old.length) {
                    old[i][arr[4 + id]] = text
                    i++
                }
                props.setreRender(true)
            } else {
                while (i < old.length) {
                    old[i][arr[4 + id]] = ""
                    i++
                }
                props.setreRender((evl) => !evl)
            }
            return
        }

        if (myid === 'Color') {
            const arr = getHead()
            const id = parseInt(_id.split('-')[1])
            const text = _Test ? _Test.design_featuretype_name : document.querySelectorAll(`#${_id} .p-multiselect-label`)[0].textContent  // _Test.design_featuretype_name
            let i = 0
            if (e === undefined) {
                old[parseInt(refSelectedId)][arr[4 + id]] = text
                //props.setreRender(true)
            } else {
                if (e.target.checked) {
                    while (i < old.length) {
                        old[i][arr[4 + id]] = text
                        i++
                    }
                    //props.setreRender(true) 
                } else {
                    while (i < old.length) {
                        old[i][arr[4 + id]] = ""
                        i++
                    }
                }
            }

            props.setreRender((evl) => !evl)

            return
        }

        if (myid === 'Product') {

            const arr = getHead()
            const id = parseInt(_id.split('-')[1])
            const text = _Test ? _Test.design_featuretype_name : document.querySelectorAll(`#${_id} .p-multiselect-label`)[0].textContent  // _Test.design_featuretype_name
            let i = 0
            if (e === undefined) {
                old[parseInt(refSelectedId)][arr[4 + id]] = text
                //props.setreRender(true)
            } else {
                if (e.target.checked) {
                    while (i < old.length) {
                        old[i][arr[4 + id]] = text
                        i++
                    }
                    //props.setreRender(true)
                } else {
                    while (i < old.length) {
                        old[i][arr[4 + id]] = ""
                        i++
                    }
                }
            }

            props.setreRender((evl) => !evl)

            return
        }
        if (_id) {
            if (myid) {
                const arr = getHead()
                const element = document.getElementById(myid) ? document.getElementById(myid) : document.getElementById(_id)
                //id.firstElementChild.firstChild.checked
                const text = _id.design_featuretype_name ? _id.design_featuretype_name : _id
                const id = parseInt(e.currentTarget.parentElement.parentElement.id.split('-')[1])
                //const id = parseInt(myid.split('-')[1])
                if (element.firstElementChild.firstChild.checked) {
                    let i = 0
                    //let ofset = 6
                    while (i < old.length) {
                        old[i][arr[4 + id]] = text
                        i++
                    }
                    props.setreRender(true)
                } else {
                    if (!(refSelectedId === null)) {
                        old[parseInt(refSelectedId)][arr[4 + id]] = text
                        props.setreRender(true)
                    }

                }
                //console.log(id)
            } else if (e.target.checked === true) {
                f = true
                const arr = getHead()
                //const text = e.currentTarget.parentNode.parentNode.lastElementChild.lastElementChild.firstElementChild.textContent
                const text = document.getElementById(_id).value //e.currentTarget.parentNode.parentNode.lastElementChild.lastElementChild.lastElementChild.value
                const id = parseInt(e.currentTarget.parentNode.parentNode.attributes.id.nodeValue.split('-')[1])
                let i = 0
                //let ofset = 6
                while (i < old.length) {
                    old[i][arr[4 + id]] = text
                    i++
                }
                props.setreRender(true)
            } else {
                const arr = getHead()
                let i = 0
                const id = parseInt(e.currentTarget.parentNode.parentNode.attributes.id.nodeValue.split('-')[1])
                while (i < old.length) {
                    old[i][arr[4 + id]] = ''
                    i++
                }
                props.setreRender(true)
                f = false
            }
        } else {
            if (!(refSelectedId === null)) {
                const arr = getHead()
                const id = parseInt(e.target.parentElement.id.split('-')[1])
                old[parseInt(refSelectedId)][arr[4 + id]] = e.target.value
                props.setreRender(true)
            }
        }
    }

    return (
        <>
            <th>
                <div className="d-flex" id={`tho-${props.id}`} >
                    <FormGroup check inline>
                        <Input type="checkbox" id="basic-cb-checked" onClick={
                            (e) => {
                                Customcomponent[props.name] ? onChange(e, (props.name === `Product` || props.name === `Color`) ? `tho-${props.id}` : `custom-id-${props.name}`, props.name, props.name.toLowerCase() === 'color' ? forColour.value : undefined) : handelClick(e)
                            }
                        } />
                        <Label for="basic-cb-checked" check></Label>
                    </FormGroup>

                    {
                        Customcomponent[props.name] ? Customcomponent[props.name]({ onChange, id: `custom-id-${props.name}`, myid: `tho-${props.id}`, option: props.ftdata, colourInfo: props.myColour, forColour }) : <Selectbox data={props.ftdata} onFocusOut={handelChange} onSchange={handelChange} onEnter={handelClick} tempid={props.tid} name={props.name} access={props.access} />
                    }
                </div>
            </th>
        </>
    )
}

//let time = null
const ContentTable = (props) => {
    const [Thumb, setThumb] = useState(old)
    const [reRender, setreRender] = useState(false)
    const len = props.files === null ? 0 : props.files.length
    const len2 = props.files === null ? 0 : (old.length === 0) ? props.files.length : props.files.length + old.length
    const windowSize = useWindowSize()
    const [productStr, setproductStr] = useState('')
    const handelClick = (e) => {
        //!__New Function for handel click in chck box

        if (e.target.checked === true) {
            f = true
            const arr = getHead()
            //const text = e.currentTarget.parentNode.parentNode.lastElementChild.lastElementChild.firstElementChild.textContent
            const text = productStr //e.currentTarget.parentNode.parentNode.lastElementChild.lastElementChild.lastElementChild.value
            const id = parseInt(e.currentTarget.parentNode.attributes.id.nodeValue.split('-')[1])
            let i = 0
            //let ofset = 6
            while (i < old.length) {
                old[i][arr[4 + id]] = text
                i++
            }
            setreRender(true)
        } else {
            const arr = getHead()
            let i = 0
            const id = parseInt(e.currentTarget.parentNode.attributes.id.nodeValue.split('-')[1])
            while (i < old.length) {
                old[i][arr[4 + id]] = ''
                i++
            }
            setreRender(true)
            f = false
        }
    }

    const DesignCodeFormater = (str) => {
        const list = str.split("-")
        const clone = [...list]
        const first = clone[0]
        const last = clone[clone.length - 1]
        //key = list.length
        if (list.length === 1) {
            return {
                first: undefined,
                mid: first,
                last: undefined
            }
        } else if (list.length === 2) {
            return {
                first: null,
                mid: list[0],
                last: list[1]
            }
        } else {
            list.pop()
            list.shift()
            return {
                first,
                mid: list.join('-'),
                last
            }
        }
    }

    useEffect(() => {
        const arr = getHead()
        for (let i = 0; i < len; i++) {
            /*eslint-disable */

            //     ThumbGenerator(props.files[i]).then((data) => {

            //         const obj = { data: data[0], name: data[1], file: data[2] }
            //         arr.map((e, k) => {
            //             if (k === 3) {
            //                 const temp = DesignCodeFormater(obj.name.split('.')[0])//obj.name.split('.')[0].split('-')
            //                 // const A = temp.length
            //                 obj['Dm_Variant'] =  temp.last ? temp.last : `` //temp.length >= 3 ? temp[A-1] : ''
            //             } else if (k === 1) {
            //                 const temp = DesignCodeFormater(obj.name.split('.')[0])
            //                 obj['Dm_Article'] = temp.first ? temp.first : ``//temp.length > 1 ? temp[0] : ''
            //             } else if (k === 2) {
            //                 const temp = DesignCodeFormater(obj.name.split('.')[0]) //obj.name.split('.')[0].split('-')
            //                 // if(temp.length > 3){
            //                 //     temp.shift()
            //                 //     temp.pop()
            //                 // }
            //                     // let A = temp.join("-")
            //                 obj['Dm_Design'] = temp.mid ? temp.mid : ``//temp.length <= 2 ? temp.length === 2 ? A.split('-')[1] : A.split('-')[0] : A  
            //             } else if (k === 0) {
            //                 obj['Dm_Design_Code'] = obj.name.split('.')[0]
            //             } else {
            //                 obj[e] = ''
            //             }
            //         })

            //         old = [...old, obj]
            //          //AI Auto Tagging//
            //             const thElements = document.querySelectorAll('th')
            //             let Weave = null
            //             let color = null
            //             let Wid = null
            //             let Cid = null
            //             let id = null
            //             let c_id = null

            //             thElements.forEach(th => {
            //             if (th.textContent.trim() === "Weave") {
            //                 Weave = {
            //                 id: th.id
            //                 }
            //                   Wid = Weave.id
            //                    id = arr.slice(4).indexOf(Wid)
            //             }

            //              if (th.textContent.trim() === "Color") {
            //                 color = {
            //                 id: th.id
            //                 }
            //                 Cid = color.id
            //                 c_id = arr.slice(4).indexOf(Cid)
            //             }
            //             })

            //            f = true
            //            for (let i = 0; i < old.length; i++) {
            //             if (old[i]) {
            //                 if(id !== null && id !== undefined){
            //                     old[i][arr[4 + id]] = props.airesponseRef.current.weave
            //                 }
            //                 if(c_id !== null && c_id !== undefined){
            //                     old[i][arr[4 + c_id]] = props.airesponseRef.current.color
            //                 }

            //             }
            //         }
            //         setreRender(true)
            // //Auto tagging end//
            //         setThumb(old)
            //         //}
            //     })

            ///////
            ThumbGenerator(props.files[i]).then((data) => {
                const obj = { data: data[0], name: data[1], file: data[2] }

                arr.map((e, k) => {
                    if (k === 3) {
                        const temp = DesignCodeFormater(obj.name.split('.')[0])
                        obj['Dm_Variant'] = temp.last ? temp.last : ``
                    } else if (k === 1) {
                        const temp = DesignCodeFormater(obj.name.split('.')[0])
                        obj['Dm_Article'] = temp.first ? temp.first : ``
                    } else if (k === 2) {
                        const temp = DesignCodeFormater(obj.name.split('.')[0])
                        obj['Dm_Design'] = temp.mid ? temp.mid : ``
                    } else if (k === 0) {
                        obj['Dm_Design_Code'] = obj.name.split('.')[0]
                    } else {
                        obj[e] = ''
                    }
                })

                // --- AI Auto Tagging --- //
                const thElements = document.querySelectorAll('th')
                let weaveId = null
                let colorId = null
                let patternId = null
                thElements.forEach(th => {
                    if (th.textContent.trim() === "Weave") weaveId = th.id
                    if (th.textContent.trim() === "Color") colorId = th.id
                    if (th.textContent.trim() === "Pattern") patternId = th.id
                })

                const weaveIndex = arr.slice(4).indexOf(weaveId)
                const colorIndex = arr.slice(4).indexOf(colorId)
                const patternIndex = arr.slice(4).indexOf(patternId)

                const ai = props.airesponseRef?.current?.[i] || {}

                if (weaveIndex !== -1 && ai.weave) {
                    obj[arr[4 + weaveIndex]] = ai.weave
                }

                if (colorIndex !== -1 && ai.color) {
                    obj[arr[4 + colorIndex]] = ai.color
                }

                if (patternIndex !== -1 && ai.pattern) {
                    obj[arr[4 + patternIndex]] = ai.pattern
                }
                // --- Ai auto tagging end --- //

                // Add to old
                old = [...old, obj]

                setreRender(true)
                setThumb(old)
            })

        }
        return () => {
            props.setFiles(null)
        }
    }, [props.files])

    useEffect(() => {
        if (old.length !== 0) {

            old = []
            selectedId = null
            refSelectedId = null
            setThumb(old)
        }
        return () => {
            props.setremoveAll(false)
        }
    }, [props.removeAll, props.option])

    useEffect(() => {
        if (selectedId !== null) {
            old.splice(selectedId, 1)
            document.getElementById(`row-${selectedId}`).style.removeProperty('background-Color')
            setThumb(old)
            selectedId = null
            refSelectedId = null
        }
        return () => {
            props.setreMoveid({ dontUse: false, use: undefined })
            //selectedId = null
        }
    }, [props.reMoveid.dontUse])

    useEffect(() => {
        if (reRender !== false) {
            //ToDo :  Remove it When used UseMemo hook
            setThumb(old)
            //console.log('called')

        }
        if (props.rDel) {
            //document.getElementById(`row-${selectedId}`).style.removeProperty('background-Color')
            setThumb(old)
            selectedId = null
            refSelectedId = null
        }
        //console.log(props.rDel);
        return () => {
            setreRender(false)
            props.setxlRerender(false)
            props.setrDel(false)
        }
    }, [reRender, props.xlRerender, props.rDel])

    const [rolData, setrolData] = useState([])

    useEffect(() => {
        const data = getFilteredData(props)
        setrolData(data)
    }, [props.option])

    const [ListData, setListData] = useState([{ name: 'shirt', id: 1 }, { name: 'suit', id: 2 }, { name: 'jeens', id: 3 }, { name: 'kurta', id: 4 }]);

    function onSelect(e) {
        let str = []
        //`tho-${rolData.length}`
        e.map((a, k) => {
            str.push(a.name)
        })
        setproductStr(str.join())
        //console.log(str.join())
        if (!(refSelectedId === null)) {
            const arr = getHead()
            //console.log(refSelectedId)
            const id = rolData.length //parseInt(e.currentTarget.parentElement.parentElement.parentElement.id.split('-')[1])
            old[parseInt(refSelectedId)][arr[4 + id]] = str.join()
            setreRender(true)
        }
    }

    function onRemove(ListData, k) {
        setproductStr(productStr.replace(`,${k.name}`, '').replace(`${k.name},`, '').replace(`${k.name}`, ''))
        //console.log(productStr.replace(`,${k.name}`,'').replace(`${k.name},`,'').replace(`${k.name}`,''))

        if (!(refSelectedId === null)) {
            const arr = getHead()
            //console.log(refSelectedId)
            const id = rolData.length //parseInt(e.currentTarget.parentElement.parentElement.parentElement.id.split('-')[1])
            old[parseInt(refSelectedId)][arr[4 + id]] = productStr.replace(`,${k.name}`, '').replace(`${k.name},`, '').replace(`${k.name}`, '')
            setreRender(true)
        }
    }

    useEffect(() => {

        return () => {
            STANDARD = {
                PRICE_ID: null,
                STOCK: null,
                RATING: null,
                CREDIT: null,
                PRODUCT: null
            }
        }
    }, [productStr])

    MandatoryOptionsId = {}
    const menuelement = document.getElementById("table_details")
    const handleMouseDown = (event) => {
        menuelement.click()
    }
    return (
        <Table responsive className="text-center" id="table_details"
            onClick={handleMouseDown}
        >
            <thead id="main-thead">
                <tr>
                    <th>Sr.no</th>
                    <th>Fabric</th>
                    <th>Design Code</th>
                    <th>Article</th>
                    <th>Design</th>
                    <th>Variant</th>
                    {/* <th>Render Status</th> */}
                    {/* <th>Single Repeate</th> */}
                    {
                        rolData.map((e, k) => {
                            if (e.is_Mandatory) {
                                //MandatoryOptionsId.push(e.design_features_id)
                                MandatoryOptionsId[e.design_features_id] = e.is_Mandatory
                            }
                            return <TableHeader is_Mandatory={e.is_Mandatory} id={e.design_features_id} name={e.design_features_name} cid={e.design_configuration_id} />
                        })
                    }
                    {/* <th id="Di_Product">Product</th> */}
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    {/* <th></th> */}
                    {/* <th></th> */}
                    {
                        rolData.map((e, k) => {

                            let ftdata = []
                            if (props.featureTData != null) {
                                for (let i = 0; i < props.featureTData.length; i++) {
                                    if (props.featureTData[i].design_feature_id === e.design_features_id) {
                                        ftdata = props.featureTData[i].featureTypeList
                                    }
                                }
                            }

                            return <TableData id={k} myColour={props.myColour} ftdata={ftdata} setreRender={setreRender} tid={k} name={e.design_features_name} selectedfeatureRef={props.selectedfeatureRef} access={props.access} />
                        })
                    }
                </tr>
            </thead>
            <tbody
                id="fabricList" style={{ width: '({windowSize.width})px' }} width={windowSize.width}
            >
                {
                    Thumb.map((e, k) => {
                        return <TableRow
                            setreRender={setreRender}
                            url={e.data}
                            name={e.name}
                            singlerepeat={props.singlerepeat}
                            id={k}
                            fabricInstance={props.fabricInstance}
                            e={e} />
                    })
                }
            </tbody>
        </Table>
    )
}

export default ContentTable
