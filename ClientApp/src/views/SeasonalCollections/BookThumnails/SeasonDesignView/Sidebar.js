
import axios from 'axios'
import '@styles/react/libs/noui-slider/noui-slider.scss'
import { useState, useEffect, useContext } from 'react'
import { accessContext } from '../../../context/accessContext'
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import BookList from './BookList'
import '../../css/seasonspage.css'
import Swal from 'sweetalert2'
//below swal not working in publish so updated above Swal by manisha
//const Swal = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js")


const selectedType = {
    type: null,
    group: null
}

export const track = {
    statue: 'smart',
    prvState: 'smart',
    textSearch: false,
    prvisChanged: false,
    isChange: false,
    type: false,
    group: false,
    resetTypeGroup() {
        this.type = false
        this.group = false
        this.textSearch = false
        //this.isChange = false
    },
    isChanged() {

        const res = this.statue === this.prvState
        this.prvState = this.statue
        return !res
    },
    resChanged() {

        const res = this.isChange === this.prvisChanged
        this.prvisChanged = this.isChange
        return !res
    }
}


let ftObj = {}
const getSelectedUserData = () => {
    return localStorage.selecteduser ? parseInt(JSON.parse(localStorage.selecteduser).value) : 0
}

export const searchTemplate = {
    folderId: "0",
    designName: "",
    isText: false,
    isUserAdmin: false,
    createdBy: "",
    roleidtemp: getSelectedUserData(),
    filterSearchRequestDto: {
        folderId: 0,
        features: {},
        isAnd: true
    },
    isRating: false,
    isName: true,
    start: 0,
    end: 25,
    DesignTypeIdGroupId: null,
    iswearhouse: true,
    designstate: localStorage.getItem('warehouse') !== null ? localStorage.getItem('warehouse').toLocaleLowerCase() : `sample`,
    range: {},
    Difference: 25,
    isSmart: false,
    isDesignSearch: true
}
export const setLogical = (a = 'Smart') => {

    switch (a.toLocaleLowerCase()) {
        case "smart":
            //searchTemplate.filterSearchRequestDto.isAnd = 
            searchTemplate.filterSearchRequestDto.isAnd = false
            searchTemplate.isSmart = true
            searchTemplate.isText = true
            searchTemplate.isName = false
            track.statue = "smart"
            break
        case "and":
            searchTemplate.filterSearchRequestDto.isAnd = true
            searchTemplate.isSmart = false
            searchTemplate.isText = true
            searchTemplate.isName = true
            track.statue = "and"
            //searchTemplate.isSmart = false
            break
        case "or":
            searchTemplate.filterSearchRequestDto.isAnd = false
            searchTemplate.isSmart = false
            searchTemplate.isText = false
            searchTemplate.isName = true
            track.statue = "or"
            break
    }
}
//window.getData = () => searchTemplate

const reSetSearchTemplate = () => {
    searchTemplate.designName = ""
    searchTemplate.isText = false
    searchTemplate.isUserAdmin = false
    searchTemplate.createdBy = ""
    track.textSearch = false
    searchTemplate.filterSearchRequestDto = {
        folderId: 0,
        features: {},
        isAnd: true
    }
    searchTemplate.isRating = false
    searchTemplate.isName = true
    searchTemplate.start = 0
    searchTemplate.end = 25
    searchTemplate.iswearhouse = true
    searchTemplate.range = {}
    searchTemplate.Difference = 25
    searchTemplate.isSmart = false
    ftObj = {}
}

export const updateDifference = (a = 25) => {
    searchTemplate.start = 0
    searchTemplate.end = a
    searchTemplate.Difference = a
}

export const updateOrderBy = ({ isRating, isName }) => {
    searchTemplate.isRating = isRating
    searchTemplate.isName = isName
}

export const OnclickPageClick = (start, end) => {
    searchTemplate.start = start
    searchTemplate.end = start + end
    searchTemplate.Difference = end
}

const updateList = (k, v, isClear = false, add) => {
    if (isClear) {
        ftObj = {}
    } else {
        if (v !== '') {
            add ? searchTemplate.range[k] = v : ftObj[k] = v.replaceAll('+', ',')
        } else {
            add ? delete searchTemplate.range[k] : delete ftObj[k]
        }
    }
}
let reRenderStatus
let myComplexobj = {
    type: [],
    group: [],
    ft: [],
    roll: []
}

const f = false
const featuresData = []

export const textSearch = (text) => {
   
    text = text.toString()
    if (text.trim() !== "") {
        searchTemplate.isText = true
        searchTemplate.designName = text
        //searchTemplate.filterSearchRequestDto.isAnd = false
        track.textSearch = true
        reRenderStatus[2](searchTemplate)
        reRenderStatus[0](!reRenderStatus[1])
    } else {
        searchTemplate.designName = ''
        reSetSearchTemplate()
        reRenderStatus[0](!reRenderStatus[1])
    }
}

const ft = []
// ** from
//ToDO:- Working on LabelOreder ---
export const LabelOreder = {}


export const info = {
    orgid: null
}
const warehouseOption = [
    {
        id: 218889,
        design_featuretype_id: "stock",
        design_featuretype_name: "stock"
    },
    {
        id: 228889,
        design_featuretype_id: "noos",
        design_featuretype_name: "noos"
    },
    {
        id: 238889,
        design_featuretype_id: "sample",
        design_featuretype_name: "sample"
    }
]

const Sidebar = props => {
    const mydata = []

    const {
        sidebarOpen,
        setSidebarOpen,
        showCategory,
        setShowCategory
    } = props


    reRenderStatus = [props.setPoc, props.poc, props.setSearchobj]
    const [rolFTdata, setrolFTdata] = useState(myComplexobj)
    const [group, setGroup] = useState(rolFTdata.group)
    const { is_boarduser, access } = useContext(accessContext)

    //const val = showBoards({id:boardId, data:board})  

    //const [reRenderImgDiv, setreRenderImgDiv] = useState(f)

    const [forTypeChange, setforTypeChange] = useState([])
    //const [forGroupChange, setforGroupChange] = useState([])

    const [componentType, setComponentType] = useState([])

    const [reset, setReset] = useState(false)

    useEffect(async () => {
        if (rolFTdata.ft.length === 0) {
            axios.get("./DesignSearch/GetOrganisationId").then(e => {
                info.orgid = e.data
            })

            const response = await axios.get(`./DesignSearch/GetRoleDesignConfigurationByRole?RoleId=${localStorage.getItem('selecteduser') ? JSON.parse(localStorage.getItem('selecteduser')).role : 0}`)
            const myColour = await axios.get(`./DesignSearch/LoadJson`)
            //const resGetFt = await axios.get(`./DesignSearch/GetFeatureTypeList`)


            const data = (rs = null) => {
                let arr = []
                if (rs !== null) {
                    (rs.allDesignTypesByRoles.map((e, k) => {
                        const obj = {}
                        obj.alldata = e
                        obj.value = `${e.design_type_id}-${k}`
                        obj.label = `${e.design_type_name}`
                        arr.push(obj)
                    }))
                } else {
                    arr = []
                }
                selectedType.type = arr[0] !== undefined ? arr[0].value : ''
                return arr
            }

            const res = JSON.parse(response.data)
            const arr = res.allDesignTypesByRoles[0].getDesignGroupsByRoleListDto.map((e, k) => {
                const obj = e
                obj.label = obj.design_groups_name
                obj.design_featuretype_name = obj.design_groups_name
                obj.design_featuretype_id = `${obj.design_groups_id}-${k}`
                obj.value = `${obj.design_groups_id}-${k}`
                return obj
            })

            selectedType.group = arr[0] !== undefined ? arr[0].value : ''
            myComplexobj.type = data(res)
            myComplexobj.group = arr

            myComplexobj.roll = res
            myComplexobj.colour = JSON.parse(myColour.data)
            const resGetFt = await axios.get(`./DesignSearch/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group}${is_boarduser ? '' : `-${JSON.parse(localStorage.selecteduser)?.value}`}`)
            myComplexobj.ft = resGetFt.data
            setrolFTdata(myComplexobj)
            setGroup(arr)
            searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group}`
            searchTemplate.roleidtemp = is_boarduser ? 0 : getSelectedUserData()
            props.setPoc(!props.poc)
        }
        searchTemplate.designstate = localStorage.getItem('warehouse') !== null ? localStorage.getItem('warehouse').toLocaleLowerCase() : `sample`
        return () => {
            myComplexobj = {
                type: [],
                group: [],
                ft: [],
                roll: []
            }
            setrolFTdata(myComplexobj)
            reSetSearchTemplate()
        }
    }, [])

    function getData(data) {
        // console.log(data)
    }

    return (

        <>
            <div className='sidebar-detached sidebar-left'>
                <div className='sidebar'>

                    <div
                        className={classnames('sidebar-shop', {
                            show: sidebarOpen
                        })}
                    >
                        <BookList showCategory={showCategory} setShowCategory={setShowCategory} catalogues={props.catalogues} getData={props.getCardData} articleName={props.articleName} setAllCataDesign={props.setAllCataDesign}/>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Sidebar
