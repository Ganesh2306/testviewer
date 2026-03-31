// ** React Imports
import { Fragment, useEffect, useState, useRef } from 'react'
import TopBar, { searchHandel } from './DesignComponent/TopBar'
import ImgGrid from './DesignComponent/ImgGrid'
import { selection } from "./DesignComponent/Utility/selection"
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import './../../../customStyles/archivestyle.css'
import './../../../customStyles/selectmenu.css'
import axios from 'axios'

const filterlist = (Data) => {
    if (Data === null || Data === undefined || Data instanceof Error) {
        return []
    }

    const getList = {}
    Data.supplierListDto.forEach((e) => {
        getList[e.sup_code] = e.sup_name
    })
    return getList
}

let exportsetState = null
let exportState = null
export const getState = () => [exportState, exportsetState]

const Design = () => {
    const [ImgViewToggle, setImgViewToggle] = useState(true)
    const [designList, setDesignList] = useState({})
    const [reRender, setreRender] = useState(false)
    const [myColour, setmyColour] = useState(null)
    exportsetState = setreRender
    exportState = reRender
    const suplist = []
    const callme = async () => {
        suplist[0] = await axios.get("./Design/GetSupplierList") 
    }
    const [splist, setsplist] = useState(null)
    useEffect(async () => {
        selection.reMoveAll()
        const myColour = await axios.get("./Design/LoadJson") //ToDo:
        const supplierList = await axios.get("./Design/GetSupplierList")
        setsplist(filterlist(supplierList && (supplierList.data ? supplierList.data : null)))
        setmyColour(myColour)
        axios.get('./Login/Q3durl').then(e => {
            selection.Q3dURL = e.data ? e.data : `http://CheckAppSeeting`
        }).catch(e => {
            selection.Q3dURL = `http://CheckAppSeeting`
        })
        //ToDo :- axios call --
        return () => {
            selection.reMoveAll()
            setsplist(null)
        }
    }, [])
    // console.log(designList)
    useEffect(() => {
        console.log(designList.designMaster)
        selection.designInfo = designList.designMaster
    })

    const toSetSelectedAll = (isSelectAll) => {
        if (isSelectAll) {
            selection.setSelectAll(designList)
        }
    }

    return (
        <Fragment>      
            <div className='main-design-div'>
                <TopBar className='season_upload_hide'  splist={splist} myColour={myColour && myColour.data} ImgViewToggle={ImgViewToggle} setImgViewToggle={setImgViewToggle} setDesignList={setDesignList} designList={designList} reRender={reRender} setreRender={setreRender} />
                <ImgGrid ImgViewToggle={ImgViewToggle} setImgViewToggle={setImgViewToggle} setDesignList={setDesignList} designList={designList} reRender={reRender} setreRender={setreRender} />
            </div>
        </Fragment>
    )
}

export default Design
