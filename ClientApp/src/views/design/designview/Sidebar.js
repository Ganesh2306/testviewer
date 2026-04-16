
// ** Third Party Components
import classnames from 'classnames'
import { Col, Button } from 'reactstrap'
import { GpDropDownBox, WpDropDownBox, BasicselectB } from './FilterComponent/FilterComponent'
import PerfectScrollbar from 'react-perfect-scrollbar'
import axios from 'axios'
// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'
import './../css/filter.css'
import { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { FilterComponentType } from './FilterComponent/FilterComponentType'
import { accessContext } from '../../context/accessContext'
import { bcMenuContext } from '../../context/bcMenuContext'
import { getDataForFav } from '../../../utility/_boardutils/utils'
import { searchBoard } from '../../SeasonalCollections/BookThumnails/SeasonDesignView/DesignsPage'

const selectedType = {
  type: null,
  group: null,
  selectedUSer: null
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

let logicalrf = null //logicalrf.LogicalOperator.current[logicalrf.LogicalOperator.current.selectedIndex].textContent
let ftObj = {}
const getSelectedUserData = () => {
  return localStorage.selecteduser ? parseInt(JSON.parse(localStorage.selecteduser).value) : 0
}

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0
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
    features: {}, //!  ,..,..,
    isAnd: true
  },
  isRating: false,
  isName: false,
  isLatest: true,
  start: 0,
  end: 25,
  DesignTypeIdGroupId: null,
  iswearhouse: true,
  designstate: localStorage.getItem('warehouse') !== null ? localStorage.getItem('warehouse').toLocaleLowerCase() : `sample`,
  range: {}, //! +
  Difference: 25,
  isSmart: false,
  isDesignSearch: true,
  CustomerId: 0,
  fromClear: false,
  Base64Image: '',
  Ai_Design: '',
  Is_AISearch: false,
  hsv1: '',
  hsv2: '',
  pattern: '',
  w1: '',
  w2: '',
  ispattern: false,
  iscolor: true
}
export const setLogical = (a = 'Smart') => {

  switch (a.toLocaleLowerCase()) {
    case "smart":
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

export const reSetSearchTemplate = (resetFilter = true) => {
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
  searchTemplate.isName = false
  searchTemplate.isLatest = true
  searchTemplate.start = 0
  searchTemplate.end = 25
  searchTemplate.iswearhouse = true
  searchTemplate.range = {}
  searchTemplate.Difference = 25
  searchTemplate.isSmart = false
  ftObj = resetFilter ? {} : ftObj
}

export const updateDifference = (a = 25) => {
  searchTemplate.start = 0
  searchTemplate.end = a
  searchTemplate.Difference = a
}

export const updateOrderBy = ({ isRating, isName, isLatest }) => {
  searchTemplate.isRating = isRating
  searchTemplate.isName = isName
  searchTemplate.isLatest = isLatest
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
      if (k === 'Date' || k === 'Price') {
        searchTemplate.range[k] = v
      }
      ftObj[k] = v
    } else {
      if (k === 'Date') {
        delete searchTemplate.range[k]
      }
      delete ftObj[k]
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

let f = false
let featuresData = []

export const textSearch = (text, reRenderStatus = []) => {
  text = text.toString()
  if (text.trim() !== "") {
    if (logicalrf && logicalrf.current) {
      setLogical(logicalrf.current[logicalrf.current.selectedIndex].textContent)
    }
    searchTemplate.start = 0
    searchTemplate.end = searchTemplate.Difference
    searchTemplate.designName = text
    if (searchTemplate.designName) {
      searchTemplate.filterSearchRequestDto.features = {}
    }
    const regesN = /[ `!@#$%^&*()_+\=\[\]{}':"\\|,.<>\/?~]/ //nirbhay
    const regisAnnd = regesN.test(text)  // nirbhay
    // searchTemplate.filterSearchRequestDto.isAnd = logicalrf?.current ? (logicalrf.current[logicalrf.current.selectedIndex].textContent === 'And' ? true : regisAnd) : true // nirbhay
    track.textSearch = true
    reRenderStatus[2](searchTemplate)
    reRenderStatus[0](!reRenderStatus[1])
    searchTemplate.isLatest = false
  } else {
    searchTemplate.designName = ''
    reSetSearchTemplate(false)
    track.textSearch = true
    reRenderStatus[0](!reRenderStatus[1]) //added by vaibhavi
  }
}

const ft = []
export const LabelOreder = {}

export const info = {
  orgid: null
}

const warehouseOption = [
  {
    id: (218889, 228889, 238889),
    design_featuretype_id: 'All',
    design_featuretype_name: "All"
  },
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

  logicalrf = props.LogicalOperator
  const { sidebarOpen } = props
  reRenderStatus = [props.setPoc, props.poc, props.setSearchobj]
  const [rolFTdata, setrolFTdata] = useState(myComplexobj)
  const [group, setGroup] = useState(rolFTdata.group)
  const { boardId } = useParams()
  const { is_boarduser, access, selectedUser, loginuser, orgtype, logincust, setSelectesUser, setis_boarduser, SelectesUseraccess, setSelectesUseraccess, setboard } = useContext(accessContext)
  const { bcMenudata, setbcMenudata } = useContext(bcMenuContext)
  const [forTypeChange, setforTypeChange] = useState([])
  const [componentType, setComponentType] = useState([])
  const [reset, setReset] = useState(false)
  const [addSome, setaddSome] = useState(false)
  const toggleaddSome = () => { setaddSome(!addSome) }
  const [lgnuser, setlgnuser] = useState(loginuser)
  const [lgncust, setlogincust] = useState(logincust)
  const supidRef = useRef(null)
  const custidRef = useRef(null)
  const selectRef = useRef(null)
  const resetSearch = useRef(null) // shubham added purpose:get all fab while none filters selected
  const [userid, setuserid] = useState('')
  const [list, setlist] = useState([])
  const obj1 = {}
  const access1Keys = Object.keys(SelectesUseraccess[333339] || {})
  const accessKeys = Object.keys(access[333339] || {})
  const commonKeys = access1Keys.filter(key => accessKeys.includes(key))
  const result = {}
  commonKeys.forEach(key => {
    result[key] = true
  })

  useEffect(async () => {
    axios.get("./DesignSearch/GetOrganisationId").then(e => {
      info.orgid = e.data
    })
    if (localStorage?.selecteduser && JSON.parse(localStorage.selecteduser) !== undefined) {
      const GetSupCustConfigurationRequestDto = {}
      if (JSON.parse(localStorage.userData).org_type === 2) {
        GetSupCustConfigurationRequestDto.SupRoleId = JSON.parse(localStorage.userData).roleId
        GetSupCustConfigurationRequestDto.CustRoleId = JSON.parse(localStorage.selecteduser).role
        GetSupCustConfigurationRequestDto.OrganisationId = JSON.parse(localStorage.userData).organisationId
        GetSupCustConfigurationRequestDto.SupplierId = JSON.parse(localStorage.userData).org_type_id
        GetSupCustConfigurationRequestDto.CustomerId = JSON.parse(localStorage.selecteduser).value
      } else {
         GetSupCustConfigurationRequestDto.SupRoleId = JSON.parse(localStorage.userData).roleId
        GetSupCustConfigurationRequestDto.CustRoleId = JSON.parse(localStorage.selecteduser).role
        GetSupCustConfigurationRequestDto.OrganisationId = JSON.parse(localStorage.userData).organisationId
        GetSupCustConfigurationRequestDto.SupplierId = JSON.parse(localStorage.userData).org_type_id
        GetSupCustConfigurationRequestDto.CustomerId = JSON.parse(localStorage.selecteduser).value
      }
      const response = await axios.post(`./DesignSearch/GetCommonSupCustConfiguration`, GetSupCustConfigurationRequestDto)
      // console.log(JSON.parse(response.data))
      props.getFeatureListD.current = response.data
      const myColour = await axios.get(`./DesignSearch/LoadJson`)
      const data = (rs = null) => {
        let arr = []
        if (rs !== null) {
          (rs.map((e, k) => {
            const obj = {}
            obj.alldata = e
            obj.value = `${e.designTypeId}-${k}`
            obj.label = `${e.designTypeName}`
            arr.push(obj)
          }))
        } else {
          arr = []
        }
        selectedType.type = arr[0] !== undefined ? arr[0].value : ''
        return arr
      }

      const res = JSON.parse(response.data)
      const lengthValue1 = res[0].designGroup[0].designFeatureDto.length
      localStorage.setItem('designFeaturesCountSup', lengthValue1)
      const arr = res[0].designGroup.map((e, k) => {
        const obj = e
        obj.label = obj.designGroupName
        obj.design_featuretype_name = obj.designGroupName
        obj.design_featuretype_id = `${obj.designGroupId}-${k}`
        obj.value = `${obj.designGroupId}-${k}`
        return obj
      })

      selectedType.group = arr[0] !== undefined ? arr[0].value : ''
      myComplexobj.type = data(res)
      myComplexobj.group = arr

      myComplexobj.roll = res
      myComplexobj.colour = JSON.parse(myColour.data)
      myComplexobj.ft = []

      setrolFTdata(myComplexobj)
      setGroup(arr)
      if (myComplexobj.roll !== undefined && myComplexobj.roll.length > 0) {
        featuresData = myComplexobj.roll.map((e, k) => {
          return e.designGroup.map((a, k) => {
            return a.designFeatureDto
          })
        })
        myComplexobj.ft = featuresData[0][0]
        setComponentType(featuresData)
        setforTypeChange(featuresData[0][0])
      }
      searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group}`
      searchTemplate.roleidtemp = is_boarduser ? 0 : selectedUser.value
      searchTemplate.CustomerId = 0
      props.setPoc(!props.poc)
    } else {
      const response = await axios.get(`./DesignSearch/GetRoleDesignConfigurationByRole?RoleId=${JSON.parse(localStorage.userData).roleId}&IsAI=${props.AIsearchref?.current}`)
      const myColour = await axios.get(`./DesignSearch/LoadJson`)
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

      const resGetFt = await axios.get(`./DesignSearch/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group}`)
      myComplexobj.ft = resGetFt.data
      props.getFeatureListD.current = resGetFt.data

      setrolFTdata(myComplexobj)
      setGroup(arr)
      if (myComplexobj.roll.allDesignTypesByRoles !== undefined && myComplexobj.roll.allDesignTypesByRoles.length > 0) {
        featuresData = myComplexobj.roll.allDesignTypesByRoles.map((e, k) => {
          return e.getDesignGroupsByRoleListDto.map((a, k) => {
            return a.getDesignFeaturesByRoleListDto
          })
        })
        setComponentType(featuresData)
        setforTypeChange(featuresData[0][0])
      }
      searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group}`
      searchTemplate.roleidtemp = is_boarduser ? 0 : selectedUser.value
      searchTemplate.CustomerId = selectedUser?.value ? selectedUser.value : 0
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
  useEffect(() => {
    if (myComplexobj.roll.allDesignTypesByRoles !== undefined && myComplexobj.roll.allDesignTypesByRoles.length > 0) {
      featuresData = myComplexobj.roll.allDesignTypesByRoles.map((e, k) => {
        return e.getDesignGroupsByRoleListDto.map((a, k) => {
          return a.getDesignFeaturesByRoleListDto
        })
      })
      setComponentType(featuresData)
      setforTypeChange(featuresData[0][0])


      return () => {
        setComponentType([])
        setforTypeChange([])
        reSetSearchTemplate()
        myComplexobj = {
          type: [],
          group: [],
          ft: [],
          roll: []
        }
        searchTemplate.DesignTypeIdGroupId = null
      }
    }
  }, [rolFTdata.roll])

  const FilterData = (data) => {

    const b = {}
    data.forEach((e) => {
      const f = {}
      e.getOperationIdOperationNameRoleTaskIdResponseDtos.forEach((t) => {
        f[t.operation_Id] = true

      })
      b[e.task_Id] = f
    })
    return b
  }
  const fetchData = async (userid, roleId) => {
    if (roleId !== 0 || roleId !== undefined || roleId !== null) {
      await axios.get(`./DesignSearch/RoleAccessToElement?RoleId=${roleId}`).then(eee => {
        const ft = FilterData(JSON.parse(eee.data).allDetails)
        localStorage.setItem("selecteduseraccessinfo", JSON.stringify(ft))
        setSelectesUseraccess(ft)
      })
    }
    if (userid !== "" && !is_boarduser) {
      try {
        let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
        if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
          log_supplier_id = JSON.parse(localStorage.selecteduser).value
          log_supplier_creBoaredID = JSON.parse(localStorage.userData).userid
          log_supplier_custId = JSON.parse(localStorage.userData).org_type_id

          const response = await axios.get(`/DesignSearch/GetBoardList?id=${log_supplier_id}&custBoardId=${log_supplier_creBoaredID}&suppcustid=${log_supplier_custId}`)
          const response1 = await axios.get(`/DesignSearch/GetCollectionList?id=${userid}`)
          const data = JSON.parse(response.data)
          const data1 = JSON.parse(response1.data)
          sessionStorage.setItem("privselected", response.data)
          localStorage.setItem("board", response.data)
          setboard(getDataForFav(data))
          localStorage.setItem('selectUserBoard', response.data)
          setbcMenudata(getDataForFav(data1))
        } else {
          const response = await axios.get(`/DesignSearch/GetCollectionList?id=${userid}`)
          const data = JSON.parse(response.data)
          sessionStorage.setItem("privselected", response.data)
          localStorage.setItem('selectUserBoard', response.data)
          setbcMenudata(getDataForFav(data))
        }
      } catch (error) {
        console.error("Error fetching board list:", error)
      }
    } else if (userid !== "" && is_boarduser) {
      let log_supplier_id, log_supplier_creBoaredID, log_supplier_custId
      try {
        if (localStorage.who === "Customer Admin" || localStorage.who === "Customer User") {
          log_supplier_id = JSON.parse(localStorage.selecteduser).value
          log_supplier_creBoaredID = JSON.parse(localStorage.userData).userid
          log_supplier_custId = JSON.parse(localStorage.userData).org_type_id
        } else {
          log_supplier_id = JSON.parse(localStorage.userData).org_type_id
          log_supplier_creBoaredID = JSON.parse(localStorage.selecteduser).user_id
          log_supplier_custId = JSON.parse(localStorage.selecteduser).value
        }
        const response = await axios.get(`/DesignSearch/GetBoardList?id=${log_supplier_id}&custBoardId=${log_supplier_creBoaredID}&suppcustid=${log_supplier_custId}`)
        const data = JSON.parse(response.data)
        sessionStorage.setItem("privselected", response.data)
        localStorage.setItem('selectUserBoard', response.data)
        setbcMenudata(getDataForFav(data))
      } catch (error) {
        console.error("Error fetching collection list:", error)
      }
    }
  }
  //! Type
  const handelChange = async (ev) => {
    const arr = []
    const id = parseInt(ev.target.value.split('-')[1])
    selectedType.type = ev.target.value
    if (localStorage?.selecteduser && JSON.parse(localStorage.selecteduser) !== undefined) {
      rolFTdata.roll[id].designGroup.map((e, k) => {
        const obj = e
        obj.label = obj.designGroupName
        obj.design_featuretype_name = obj.designGroupName
        obj.design_featuretype_id = `${obj.designGroupId}-${k}`
        obj.value = `${obj.designGroupId}-${k}`
        arr.push(obj)
      })
      selectedType.group = arr[0].value
      myComplexobj.group = arr
      searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group.split('-')[0]}`
      searchTemplate.isText = false
      setGroup(arr)
      myComplexobj.ft = featuresData[id][0]
      props.getFeatureListD.current = myComplexobj.ft
      setforTypeChange(featuresData[id][0])

      track.type = true
      searchTemplate.start = 0
      searchTemplate.end = searchTemplate.Difference
      props.setPoc(!props.poc)
    } else {
      rolFTdata.roll.allDesignTypesByRoles[id].getDesignGroupsByRoleListDto.map((e, k) => {
        const obj = e
        obj.label = obj.design_groups_name
        obj.value = `${obj.design_groups_id}-${k}`
        obj.design_featuretype_name = obj.design_groups_name
        obj.design_featuretype_id = `${obj.design_groups_id}-${k}`
        arr.push(obj)
      })
      selectedType.group = arr[0].value
      myComplexobj.group = arr
      searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group.split('-')[0]}`
      searchTemplate.isText = false
      const resGetFt = await axios.get(`./DesignSearch/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group}`)
      myComplexobj.ft = resGetFt.data
      props.getFeatureListD.current = resGetFt.data
      setrolFTdata(myComplexobj)
      setGroup(arr)
      if (myComplexobj.roll.allDesignTypesByRoles !== undefined && myComplexobj.roll.allDesignTypesByRoles.length > 0) {
        featuresData = myComplexobj.roll.allDesignTypesByRoles.map((e, k) => {
          return e.getDesignGroupsByRoleListDto.map((a, k) => {
            return a.getDesignFeaturesByRoleListDto
          })
        }) //b[Type-index][goup-index]
        setComponentType(featuresData)
        setforTypeChange(featuresData[id][0])
      }
      track.type = true
      searchTemplate.start = 0
      searchTemplate.end = searchTemplate.Difference
      props.setPoc(!props.poc)
    }
  }

  const WarehouseChange = (e, bk, c, b) => {
    reSetSearchTemplate()
    b = b || 'All,Stock,Noos,Sample'
    searchTemplate.designstate = b.toLocaleLowerCase()
    searchTemplate.isText = !isObjectEmpty(searchTemplate.filterSearchRequestDto.features)
    // shubham Added below purpose: for all search isAnd flag is true & isSmart is false
    if (!isObjectEmpty(ftObj)) {
      searchTemplate.filterSearchRequestDto.isAnd = false
      searchTemplate.isSmart = true
    } else {
      searchTemplate.filterSearchRequestDto.isAnd = true
      searchTemplate.isSmart = false
    }
    localStorage.setItem(`warehouse`, b)
    props.setPoc(!props.poc)
    document.querySelector('#searchBtn button').click()
  }

  const GroupeChange = async (a, b, e) => {
    selectedType.group = e.target.value
    const id = selectedType.type.split('-')[1]
    const gid = e.target.selectedIndex
    const arr = []
    if (localStorage?.selecteduser && JSON.parse(localStorage.selecteduser) !== undefined) {
      rolFTdata.roll[id].designGroup.map((e, k) => {
        const obj = e
        obj.label = obj.designGroupName
        obj.design_featuretype_name = obj.designGroupName
        obj.design_featuretype_id = `${obj.designGroupId}-${k}`
        obj.value = `${obj.designGroupId}-${k}`
        arr.push(obj)
      })
      selectedType.group = arr[gid].value
      myComplexobj.group = arr
      searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group.split('-')[0]}`
      searchTemplate.isText = false
      myComplexobj.ft = featuresData[id][selectedType.group.split('-')[1]]
      props.getFeatureListD.current = myComplexobj.ft
      setforTypeChange(featuresData[id][selectedType.group.split('-')[1]])

      track.group = true
      searchTemplate.start = 0
      searchTemplate.end = searchTemplate.Difference
      props.setPoc(!props.poc)
    } else {
      searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group.split('-')[0]}`
      searchTemplate.isText = false
      const resGetFt = await axios.get(`./DesignSearch/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group}`)
      myComplexobj.ft = resGetFt.data
      props.getFeatureListD.current = resGetFt.data
      setrolFTdata(myComplexobj)
      if (myComplexobj.roll.allDesignTypesByRoles !== undefined && myComplexobj.roll.allDesignTypesByRoles.length > 0) {
        featuresData = myComplexobj.roll.allDesignTypesByRoles.map((e, k) => {
          return e.getDesignGroupsByRoleListDto.map((a, k) => {
            return a.getDesignFeaturesByRoleListDto
          })
        })
        setComponentType(featuresData)
        setforTypeChange(featuresData[id][selectedType.group.split('-')[1]])
      }
      track.group = true
      searchTemplate.start = 0
      searchTemplate.end = searchTemplate.Difference
      props.setPoc(!props.poc)
    }
    setReset(!reset)
  }
  useEffect(() => {
    if (custidRef.current?.value !== 'None') {
      const fetchData = async () => {
        const isAI_Search = props.AIsearchref?.current === true
        const userData = JSON.parse(localStorage.userData)
        const selectedUser = JSON.parse(localStorage.selecteduser)

        const GetSupCustConfigurationRequestDto = {
          SupRoleId: JSON.parse(localStorage.userData).roleId,
          CustRoleId: JSON.parse(localStorage.selecteduser).role,
          OrganisationId: JSON.parse(localStorage.userData).organisationId,
          SupplierId: JSON.parse(localStorage.userData).org_type_id,
          CustomerId: JSON.parse(localStorage.selecteduser).value
        }
        try {
          const apiUrl = isAI_Search ? `./DesignSearch/GetCommonSupCustConfiguration_AI` : `./DesignSearch/GetCommonSupCustConfiguration`

          const response = await axios.post(apiUrl, GetSupCustConfigurationRequestDto)
          const myColour = await axios.get(`./DesignSearch/LoadJson`)
          const res = JSON.parse(response.data)

          const buildTypeOptions = (rs = []) => rs.map((e, k) => ({
            alldata: e,
            value: `${e.designTypeId}-${k}`,
            label: `${e.designTypeName}`
          }))

          const designGroups = res[0]?.designGroup?.map((e, k) => ({
            ...e,
            label: e.designGroupName,
            design_featuretype_name: e.designGroupName,
            design_featuretype_id: `${e.designGroupId}-${k}`,
            value: `${e.designGroupId}-${k}`
          })) || []

          selectedType.group = designGroups[0]?.value || ''
          selectedType.type = buildTypeOptions(res)[0]?.value || ''

          myComplexobj.type = buildTypeOptions(res)
          myComplexobj.group = designGroups
          myComplexobj.roll = res
          myComplexobj.colour = JSON.parse(myColour.data)
          myComplexobj.ft = []

          setrolFTdata(myComplexobj)
          setGroup(designGroups)

          if (res?.length > 0) {
            const featuresData = isAI_Search ? res.flatMap((e) => e.designGroup.map((group) => group.designFeatureDto)) : res.map((e) => e.designGroup.map((group) => group.designFeatureDto))

            const flatFeatures = isAI_Search ? featuresData : featuresData.flat()
            myComplexobj.ft = flatFeatures[0] || []

            setComponentType(featuresData)
            setforTypeChange(flatFeatures[0] || [])
          }

        } catch (error) {
          console.error('Error loading configuration:', error)
        }
      }

      fetchData()
    }
  }, [props.AIsearchref?.current, custidRef.current?.value])
  return (
    <div className='sidebar-detached sidebar-left'>
      <div className='sidebar'>
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Col sm='12' className='show_mobile'>
            <h6 className='filter-heading'>Filter by Category</h6>
          </Col>

          <div className='border-0'>
            <div style={{ position: 'relative' }}>
              <div className='filterheading d-flex justify-content-end pr-1' >
                <h6 className='text-success cursor' id='clearall' onClick={() => {

                  reSetSearchTemplate()
                  if (props.rowsPerPage.current !== null || props.rowsPerPage.current !== undefined) {

                    props.rowsPerPage.current.value = props.rowsPerPage.current.value
                    props.OrderBy.current.selectedIndex = 0
                    track.type = true
                  }
                  props.LogicalOperator.current.value = props.LogicalOperator.current.value
                  searchTemplate.fromClear = true
                  setReset(!reset)
                  props.setPoc(!props.poc)
                }} ref={resetSearch}
                >Clear All</h6>
              </div>
              <PerfectScrollbar className={localStorage.getItem('designFeaturesCount') === '10' ? 'EqualLength' : 'Extralenghth'}>
                <div id='product-categories' className='mt-2' >
                  {lgnuser.length > 1 && orgtype === 3 && (<form className="justify-content-end p-0 clearfix">
                    <label key='supp' className="float-left mr-1">Supplier</label>
                    <select className="input_custom form-control" style={{ width: "140px" }}
                      ref={supidRef} defaultValue={selectedUser.value}
                      onChange={async () => {
                        // cleanup()
                        const selectedOption = supidRef.current.options[supidRef.current.selectedIndex]
                        const roleId = selectedOption.dataset.roleid
                        const userid = selectedOption.dataset.userid
                        setuserid(userid)
                        const username = selectedOption.innerHTML
                        const ele = document.getElementById('selecteduser')
                        ele.innerText = username

                        if (selectedUser === false) {
                          obj1.user_id = parseInt(userid)
                          obj1.label = username
                          obj1.value = supidRef.current.value ? parseInt(supidRef.current.value) : ""
                          localStorage.setItem(`selecteduser`, JSON.stringify(obj1))
                        } else {
                          selectedUser.user_id = parseInt(userid)
                          selectedUser.label = username
                          selectedUser.value = supidRef.current.value ? parseInt(supidRef.current.value) : ""
                          selectedUser.role = parseInt(roleId)
                          obj1.user_id = parseInt(userid)
                          obj1.label = username
                          obj1.value = supidRef.current.value ? parseInt(supidRef.current.value) : ""
                          obj1.role = parseInt(roleId)
                          localStorage.setItem(`selecteduser`, JSON.stringify(obj1))
                        }
                        if (supidRef.current !== null && supidRef.current !== undefined && supidRef.current?.value && userid !== "" && userid !== undefined) {
                          await fetchData(userid, roleId)
                        }
                        const GetSupCustConfigurationRequestDto = {}
                        GetSupCustConfigurationRequestDto.CustRoleId = JSON.parse(localStorage.userData).roleId
                        GetSupCustConfigurationRequestDto.SupRoleId = JSON.parse(localStorage.selecteduser).role
                        GetSupCustConfigurationRequestDto.OrganisationId = JSON.parse(localStorage.userData).organisationId
                        GetSupCustConfigurationRequestDto.CustomerId = JSON.parse(localStorage.userData).org_type_id
                        GetSupCustConfigurationRequestDto.SupplierId = JSON.parse(localStorage.selecteduser).value
                        const response = await axios.post(`./DesignSearch/GetCommonSupCustConfiguration`, GetSupCustConfigurationRequestDto)
                        const myColour = await axios.get(`./DesignSearch/LoadJson`)
                        const data = (rs = null) => {
                          let arr = []
                          if (rs !== null) {
                            (rs.map((e, k) => {
                              const obj = {}
                              obj.alldata = e
                              obj.value = `${e.designTypeId}-${k}`
                              obj.label = `${e.designTypeName}`
                              arr.push(obj)
                            }))
                          } else {
                            arr = []
                          }
                          selectedType.type = arr[0] !== undefined ? arr[0].value : ''
                          return arr
                        }

                        const res = JSON.parse(response.data)
                        props.getFeatureListD.current = res
                        const arr = res[0].designGroup.map((e, k) => {
                          const obj = e
                          obj.label = obj.designGroupName
                          obj.design_featuretype_name = obj.designGroupName
                          obj.design_featuretype_id = `${obj.designGroupId}-${k}`
                          obj.value = `${obj.designGroupId}-${k}`
                          return obj
                        })
                        selectedType.group = arr[0] !== undefined ? arr[0].value : ''
                        myComplexobj.type = data(res)
                        myComplexobj.group = arr

                        myComplexobj.roll = res
                        myComplexobj.colour = JSON.parse(myColour.data)
                        setrolFTdata(myComplexobj)
                        setGroup(arr)
                        if (myComplexobj.roll !== undefined && myComplexobj.roll.length > 0) {
                          featuresData = myComplexobj.roll.map((e, k) => {
                            return e.designGroup.map((a, k) => {
                              return a.designFeatureDto
                            })
                          })
                          myComplexobj.ft = featuresData[0][0]
                          setComponentType(featuresData)
                          setforTypeChange(featuresData[0][0])
                        }
                        searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group}`
                        searchTemplate.roleidtemp = is_boarduser ? 0 : parseInt(supidRef.current.value)
                        searchTemplate.CustomerId = selectedUser?.value ? selectedUser.value : 0
                        props.setPoc(!props.poc)
                        searchTemplate.designstate = localStorage.getItem('warehouse') !== null ? localStorage.getItem('warehouse').toLocaleLowerCase() : `sample`
                      }}
                    >
                      {lgnuser && lgnuser.map((e, k) => {
                        return <option value={e.supplier_id} data-roleid={e.roleid} data-userid={e.user_id}>{e.sup_name}</option>
                      })}
                    </select>
                  </form>)}

                  {lgncust.length >= 1 && orgtype === 2 && (<form className="justify-content-end p-0 clearfix active">
                    <label className="float-left mr-1">Customer</label>
                    <select className="input_custom form-control" style={{ width: "140px" }}
                      defaultValue={selectedUser.value ? selectedUser.value : ""}
                      ref={custidRef}
                      onChange={async () => {
                        // cleanup()
                        reSetSearchTemplate()
                        const selectedOp = custidRef.current.options[custidRef.current.selectedIndex]
                        const userid = parseInt(selectedOp.dataset.userid)
                        const roleId = parseInt(selectedOp.dataset.roleid)
                        setuserid(userid)
                        const username = selectedOp.innerHTML
                        if (username === 'None') {
                          const ele = document.getElementById('selecteduser')
                          ele.innerText = JSON.parse(localStorage.userData)?.userName ? JSON.parse(localStorage.userData)?.userName : ""
                        } else {
                          const ele = document.getElementById('selecteduser')
                          ele.innerText = username
                        }
                        if (selectedUser === false) {
                          obj1.user_id = parseInt(userid)
                          obj1.label = username
                          obj1.value = custidRef.current.value ? parseInt(custidRef.current.value) : ""
                          obj1.role = parseInt(roleId)
                          localStorage.setItem(`selecteduser`, JSON.stringify(obj1))
                        } else {
                          selectedUser.user_id = parseInt(userid)
                          selectedUser.label = username
                          selectedUser.value = custidRef.current.value ? parseInt(custidRef.current.value) : ""
                          selectedUser.role = parseInt(roleId)
                          obj1.user_id = parseInt(userid)
                          obj1.label = username
                          obj1.value = custidRef.current.value ? parseInt(custidRef.current.value) : ""
                          obj1.role = parseInt(roleId)
                          localStorage.setItem(`selecteduser`, JSON.stringify(obj1))
                        }
                        if (custidRef.current !== null && custidRef.current !== undefined && custidRef.current?.value && custidRef.current?.value !== 'None' && userid !== "" && userid !== undefined) {
                          await fetchData(userid, roleId)
                        }
                        if (custidRef.current?.value === 'None') {
                          sessionStorage.removeItem('privselected')
                          localStorage.removeItem(`selecteduser`)
                          setSelectesUser(false)
                        }
                        if (custidRef.current?.value !== 'None') {
                          const GetSupCustConfigurationRequestDto = {}
                          GetSupCustConfigurationRequestDto.SupRoleId = JSON.parse(localStorage.userData).roleId
                          GetSupCustConfigurationRequestDto.CustRoleId = JSON.parse(localStorage.selecteduser).role
                          GetSupCustConfigurationRequestDto.OrganisationId = JSON.parse(localStorage.userData).organisationId
                          GetSupCustConfigurationRequestDto.SupplierId = JSON.parse(localStorage.userData).org_type_id
                          GetSupCustConfigurationRequestDto.CustomerId = JSON.parse(localStorage.selecteduser).value
                          const response = await axios.post(`./DesignSearch/GetCommonSupCustConfiguration`, GetSupCustConfigurationRequestDto)
                          //  console.log(JSON.parse(response.data))
                          const myColour = await axios.get(`./DesignSearch/LoadJson`)
                          const data = (rs = null) => {
                            let arr = []
                            if (rs !== null) {
                              (rs.map((e, k) => {
                                const obj = {}
                                obj.alldata = e
                                obj.value = `${e.designTypeId}-${k}`
                                obj.label = `${e.designTypeName}`
                                arr.push(obj)
                              }))
                            } else {
                              arr = []
                            }
                            selectedType.type = arr[0] !== undefined ? arr[0].value : ''
                            return arr
                          }

                          const res = JSON.parse(response.data)
                          const arr = res[0].designGroup.map((e, k) => {
                            const obj = e
                            obj.label = obj.designGroupName
                            obj.design_featuretype_name = obj.designGroupName
                            obj.design_featuretype_id = `${obj.designGroupId}-${k}`
                            obj.value = `${obj.designGroupId}-${k}`
                            return obj
                          })

                          selectedType.group = arr[0] !== undefined ? arr[0].value : ''
                          myComplexobj.type = data(res)
                          myComplexobj.group = arr

                          myComplexobj.roll = res
                          myComplexobj.colour = JSON.parse(myColour.data)
                          myComplexobj.ft = []

                          setrolFTdata(myComplexobj)
                          setGroup(arr)
                          if (myComplexobj.roll !== undefined && myComplexobj.roll.length > 0) {
                            featuresData = myComplexobj.roll.map((e, k) => {
                              return e.designGroup.map((a, k) => {
                                return a.designFeatureDto
                              })
                            })
                            myComplexobj.ft = featuresData[0][0]
                            setComponentType(featuresData)
                            setforTypeChange(featuresData[0][0])
                          }
                        } else {

                          const response = await axios.get(`./DesignSearch/GetRoleDesignConfigurationByRole?RoleId=${JSON.parse(localStorage.userData).roleId}&IsAI=${props.AIsearchref?.current}`)
                          const myColour = await axios.get(`./DesignSearch/LoadJson`)
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
                          const resGetFt = await axios.get(`./DesignSearch/GetFeatureTypeList?PTPG=${selectedType.type.split('-')[0]}-${selectedType.group}`)
                          myComplexobj.ft = resGetFt.data
                          setrolFTdata(myComplexobj)
                          setGroup(arr)
                          if (myComplexobj.roll.allDesignTypesByRoles !== undefined && myComplexobj.roll.allDesignTypesByRoles.length > 0) {
                            featuresData = myComplexobj.roll.allDesignTypesByRoles.map((e, k) => {
                              return e.getDesignGroupsByRoleListDto.map((a, k) => {
                                return a.getDesignFeaturesByRoleListDto
                              })
                            })
                            setComponentType(featuresData)
                            setforTypeChange(featuresData[0][0])
                          }
                        }
                        if (selectedUser === false) {
                          setSelectesUser({
                            user_id: parseInt(userid),
                            label: username,
                            value: custidRef.current.value ? parseInt(custidRef.current.value) : ""
                          })
                        }
                        if (custidRef.current?.value === 'None') {
                          sessionStorage.removeItem('privselected')
                          localStorage.removeItem(`selecteduser`)
                          setSelectesUser(false)
                        }
                        searchTemplate.DesignTypeIdGroupId = `${selectedType.type.split('-')[0]}-${selectedType.group}`
                        searchTemplate.roleidtemp = is_boarduser ? 0 : custidRef.current.value
                        if (selectedOp.innerHTML === 'None') {
                          searchTemplate.CustomerId = 0
                        } else {
                          searchTemplate.CustomerId = custidRef.current.value
                        }
                        props.setPoc(!props.poc)
                        searchTemplate.designstate = localStorage.getItem('warehouse') !== null ? localStorage.getItem('warehouse').toLocaleLowerCase() : `sample`
                      }}
                    >
                      <option >{'None'}</option>
                      {lgncust && lgncust.map((e, k) => {
                        return <option value={e.customer_id} data-roleid={e.role_Id} data-userid={e.user_id}>{e.customer_Name}</option>
                      })}
                    </select>
                  </form>)}
                  <BasicselectB value={rolFTdata.type[0]} handelChange={handelChange} option={rolFTdata.type} label={`Type`} className='type_class' />
                  <div class="active">
                    <GpDropDownBox label={'Group'} option={group} onChange={GroupeChange} />
                    {selectedUser ? <WpDropDownBox op={true}
                      reset={reset} label={'Warehouse'}
                      option={warehouseOption.filter(e => {
                        return result && result[e.id]
                      })
                      }
                      onChange={WarehouseChange} /> : <WpDropDownBox op={true}
                        reset={reset} label={'Warehouse'}
                        option={warehouseOption.filter(e => {
                          return access["333339"] && access["333339"][e.id]
                        })
                        }
                        onChange={WarehouseChange} />}
                  </div>
                  <div><hr /></div>
                  {
                    //!Filter - Type 
                    localStorage?.selecteduser && JSON.parse(localStorage.selecteduser) !== undefined ? forTypeChange.map((e) => {
                      const data = rolFTdata.ft.filter((s) => s.design_feature_id === e.design_feature_id)
                      const op = data.length === 0 || data === undefined ? [] : data[0].featureTypeList
                      if (data.length === 0) {
                        return
                      }
                      return FilterComponentType[e.filter_Control <= 10 ? e.filter_Control : undefined]({
                        onChange: (e, v, o, add) => { updateList(e, v, o, add) },
                        option: op,
                        name: e.design_feature_name,
                        rs: e,
                        list: updateList,
                        reset,
                        colourInfo: rolFTdata.colour,
                        selectRef: props.selectRef
                      })
                    }) : forTypeChange.map((e) => {
                      const data = rolFTdata.ft.filter((s) => s.design_feature_id === e.design_features_id)
                      const op = data.length === 0 || data === undefined ? [] : data[0].featureTypeList
                      if (data.length === 0) {
                        return
                      }
                      return FilterComponentType[e.filter_Control <= 10 ? e.filter_Control : undefined]({
                        onChange: (e, v, o, add) => { updateList(e, v, o, add) },
                        option: op,
                        name: e.design_features_name,
                        rs: e,
                        list: updateList,
                        reset,
                        colourInfo: rolFTdata.colour,
                        selectRef: props.selectRef
                      })
                    })
                  }

                </div>
              </PerfectScrollbar>
              <div id='searchBtn'>
                <Button.Ripple color='primary' block onClick={() => {
                  document.getElementById("closebtn1")?.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }))
                  setLogical(props.LogicalOperator.current[props.LogicalOperator.current.selectedIndex].textContent)
                  if (track.statue === 'smart') {
                    searchTemplate.isText = true
                    searchTemplate.filterSearchRequestDto.isAnd = false
                    searchTemplate.isSmart = true
                  }
                  searchTemplate.start = 0
                  searchTemplate.Difference = parseInt(props.rowsPerPage.current.value)
                  searchTemplate.end = parseInt(props.rowsPerPage.current.value)
                  track.type = true

                  if (Object.keys(ftObj).length !== 0 || Object.keys(searchTemplate.range).length !== 0) {
                    const { Date, Price, ...featuresWithoutDate } = ftObj
                    for (const key in featuresWithoutDate) {
                      if (featuresWithoutDate.hasOwnProperty(key)) {
                        featuresWithoutDate[key] = featuresWithoutDate[key].replace(/\+/g, ',')
                      }
                    }
                    searchTemplate.filterSearchRequestDto.features = featuresWithoutDate
                    searchTemplate.range = { Date, Price }
                    searchTemplate.isLatest = false
                    searchTemplate.designName = "" //vaibhavi more Object.entries(ftObj)[0][1]     
                    //vaibhavi more :- to showing proper result on searching mode
                    props.setPoc(!props.poc)
                    f = true
                  } else {
                    toggleaddSome()
                    //resetSearch ? resetSearch.current.click() : ""
                    resetSearch.current.click()    //vaibhavi more :- if user not filtering anything, to prevent unecessary api call
                    //!Can add PopUP
                    // alert("add some")
                  }

                }}>
                  Search
                </Button.Ripple>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
