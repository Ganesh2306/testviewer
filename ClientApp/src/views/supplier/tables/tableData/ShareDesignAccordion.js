import React, { useState, useEffect, useRef } from "react"
import { UncontrolledCollapse, CustomInput, CardText, Button, Form } from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'
import {GetCollectionsList, GetSeasonalCollectionsList, _SaveCustomerShareConfiguration, _GetShareId, _getCustomerShareConfiguration} from '../../store/actions'
import { R_Loader} from '../../../loader/loader'
import axios from 'axios'
import { roleData } from './DesignData'
 import "./Share.css"
 import "../images/plus_icon.svg"
import "../images/minus_icon.svg"
// import ShareCust from "./OpenShareCustomer"
import { ModalFooter } from "react-bootstrap"
import ModalBodyUIC from "../../../customer/tables/tableData/ModalBodyC"
import ModalFooterUI from "../../../modal/ModalFooter"
import { yupResolver } from '@hookform/resolvers/yup'
import { error } from "jquery"
let CustomerShareConfiguration = {}
const selectedId = []
const ShareDesignAccordion = (props) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.ShareCollections)
  const store1 = useSelector(state => state.ShareSeasonalCollection)
  const loaderRef1 = useRef(null)
  console.log(store)
  console.log(store1)
  console.log(props.SupplierId)
  // const [loading, setLoading] = useState(true)
  // const [items, setItems] = useState([])
  // const [selectedItems, setSelectedItems] = useState([])
  
  const handleCheckboxChange = (Id = 2, isSeasonalCollection = false) => {
    Id = Number(Id)
   const totalOptions = document.querySelectorAll(`div[toggler="#toggle-menu-item-${Id}"] input`).length
   const checkedOptions = document.querySelectorAll(`div[toggler="#toggle-menu-item-${Id}"] input:checked`).length
    const isAllChecked = totalOptions > 0 && (totalOptions === checkedOptions)
            if (isAllChecked) {
                document.getElementById(Id).checked = true
            } else {
              document.getElementById(Id).checked = false
            }
        if (isSeasonalCollection) {
          handleCheckboxChange(1, false)
        }
        
  }

  function checkUncheckSeasonal(id) {
       
    const elem = document.getElementById(id)
    const feat = elem.parentElement.parentElement.getElementsByClassName('Dgroup')
    for (let i = 0; i < feat.length; i++) {
        feat[i].firstElementChild.checked = elem.checked
    }
    const grp = elem.parentElement.parentElement.getElementsByClassName('Dtype')
    for (let i = 0; i < grp.length; i++) {
        grp[i].firstElementChild.checked = elem.checked
    }
    const totalSeasons = document.querySelectorAll(".Dtype input").length
    const selectedSeasons = document.querySelectorAll(".Dtype input:checked").length
    if (totalSeasons > 0 && (totalSeasons === selectedSeasons)) {
      handleCheckboxChange(1, false)
    }
}
function checkUncheckCollection(id) {
       
  const elem = document.getElementById(id)
  const feat = elem.parentElement.parentElement.getElementsByClassName('Dtype1')
  for (let i = 0; i < feat.length; i++) {
      feat[i].firstElementChild.checked = elem.checked
  }
  const grp = elem.parentElement.parentElement.getElementsByClassName('config')
  for (let i = 0; i < grp.length; i++) {
      grp[i].firstElementChild.checked = elem.checked
  }
}
useEffect(() => {
  const fetchData = async () => {
    try {
      
      await dispatch(GetCollectionsList({ SupplierId: props.SupplierId }))
      await dispatch(GetSeasonalCollectionsList({ SupplierId: props.SupplierId }))
      fetchCustShareConfig(props)
    } catch (error) {
      // Handle any errors if necessary
    }
  }
  fetchData()
  return (() => {
    CustomerShareConfiguration = {}
  })
// }, [dispatch, props.SupplierId])
}, [dispatch, props.SupplierId])

const fetchCustShareConfig = async(props) => {
  CustomerShareConfiguration =  await _getCustomerShareConfiguration({SupplierId : props?.SupplierId, customerId: props?.customerId})
  CustomerShareConfiguration = await CustomerShareConfiguration.data && JSON.parse(CustomerShareConfiguration.data)
          selectConfiguredOpts(CustomerShareConfiguration)
}
const selectConfiguredOpts = (configuredOpts) => {
  if (configuredOpts) {
    //const data = JSON.parse(configuredOpts.data)
     for (const item of configuredOpts) { 
      const selector = item.seasonalCollection_Id || item.collection_id
      selectedId.push(selector)
      document.getElementById(selector).defaultChecked = true
    }
    store1.allData.map(seasonList => {
      handleCheckboxChange(seasonList?.seasonId, true)
    })
    handleCheckboxChange()
  }
}
  const onClickRotate = (e) => {
    const node = document.querySelector(`#${e}`).children  
    // document.getElementById(e).classList.add('openlist')
    const val = node[0].classList.value
    if (val.includes("openlist")) {
      node[0].classList.remove('openlist')
    } else {
      node[0].classList.add('openlist')
    }
  }
  const SaveCustomerShareConfiguration = () => {
    document.querySelector("#main-loader-ref").style.display = "block"
     axios.post('./Supplier/GetShareId').then(response => {
        if (response?.data) {
      const allShareId = JSON.parse(response.data)
    const orgId =  localStorage?.shareData && JSON.parse(localStorage.shareData)?.organisationId 
     const seasonalShareId =  allShareId['Seasonal Collection']
     const collectionShareId = allShareId.Collection
    const itemSelected = []
    const Customer_Id = props.customerId

    store1.allData.map(seasonList => {
     const checkedSeasonalCollections = document.querySelectorAll(`div[toggler="#toggle-menu-item-${seasonList.seasonId}"] input:checked`)
    Object.keys(checkedSeasonalCollections).map((key, value) => {  
      const SeasonalCollection_Id = Number(checkedSeasonalCollections[key].getAttribute("id"))
      //if (!selectedId.includes(SeasonalCollection_Id)) {
        itemSelected.push({
          Season_Id  : seasonList.seasonId,
          SeasonalCollection_Id,
          Is_list_seasonal_collection : true,
          Supplier_Id : props.SupplierId,
          Customer_Id,
          Cust_Share_Id : seasonalShareId,
          Organisation_Id :orgId,
          state : 0
              })
         // }
        })
      })

      const checkedCollections = document.querySelectorAll(`div[toggler="#toggle-menu-item-2"] input:checked`)
      Object.keys(checkedCollections).map((key, value) => {
        console.log(checkedCollections[key])
        itemSelected.push({
              Is_list_seasonal_collection : itemSelected[0]?.Is_list_seasonal_collection || false,
              Supplier_Id : props.SupplierId,
              Customer_Id,
              Collection_Id : Number(checkedCollections[key].getAttribute("id")),
              Cust_Share_Id : collectionShareId,
              Organisation_Id :orgId,
              state:0
            })
          })
          // delete previous configuration
        if (CustomerShareConfiguration.length) {
          for (const prevConfigured of CustomerShareConfiguration) {
            itemSelected.push({
             state:3,
             customer_share_configuration_id:prevConfigured.customer_share_configuration_id
            })
        }
        }
         
        _SaveCustomerShareConfiguration(itemSelected).then((response) => {
          fetchCustShareConfig(props)
          const Swal = require('sweetalert2')
          Swal.fire({
            title:'Customer Share Configuration saved Succefully !!'
          })
        console.log(response)
        CustomerShareConfiguration = {}
        document.querySelector("#main-loader-ref").style.display = "none"
      })
      // loaderRef.current.style.display = 'none'
        }
    }).catch((error) => {
      console.error('error occured while get share Id')
      document.querySelector("#main-loader-ref").style.display = "none"
    })
  }
  const mystyle = {
item: {
      display: "block",
      padding: "1rem"
    },
svg: {
      position: "absolute",
      right: "0",
      top: "12px",
      right: "12px",
      zindex: "9",
      padding: "4px"
  },
toggler: {
    cursor: "pointer",
    background: "#ededf0"
    // padding: "10px 36px"
},
arrows: {
  position: "absolute",
  left: "6px",
  textalign: "left",
  transform: "rotate(-90deg)",
  backgroundimage: "url('../images/plus_icon.svg')",
  backgroundsize: "18px",
  backgroundrepeat: "no-repeat",
  position: "absolute",
  width: "24px",
  height: "24px",
  backgroundposition: "center center"
},
arrows: {
  position: "absolute",
  left: "6px",
  textalign: "left",
  transform: "rotate(-90deg)",
  backgroundimage: "url('../images/minus_icon.svg')",
  backgroundsize: "18px",
  backgroundrepeat: "no-repeat",
  position: "absolute",
  width: "24px",
  height: "24px",
  backgroundposition: "center center"
},
openlist: {
  position: "absolute",
  left:"6px",
  textalign: "left",

  transform: "rotate(0deg)",
  backgroundimage: "url('../images/minus_icon.svg')",
  backgroundposition: "center center",
backgroundsize: "14px",
backgroundrepeat: "no-repeat",
width: "24px",
height: "24px"
},
arrows: {
  backgroundimage: "url('../images/plus_icon.svg')"
},
arrows: {
  backgroundimage: "url('../images/minus_icon.svg')"
},
// openlist: {
//   position: "absolute",
//   left:"6px",
//   textalign: "left",
//   transform: "rotate(0deg)",
//   backgroundimage: "(url('../images/minus_icon.svg'))",
//   backgroundposition: "center center",
//   backgroundsize: "14px",
//   backgroundrepeat: "no-repeat",
//   width: "24px",
//   height: "24px"
// },
card: {
boxshadow:" none"
 },
collapsemargin :{
boxshadow: "none"
    },
    // .item.app-collapse.card.
    childlist: {
      // background: "#ededf0",
      // padding: "8px 26px",
      // borderradius: "1"
  },
   // .item.app-collapse.
   card: {
    // background: "#ededf0",
    // padding: "8px 26px",
    // borderradius: "1"
   },
    // .item
    appcollapse: {
      // background: "#ededf0",
    
    // borderradius: "1"
    },
     item: {
      // background: "#ededf0",
     
      // borderradius: "1"
     },
     item:  {
      display: "inline-block",
      width: "auto",
      cursor: "pointer",
      /* margin-left:20px; */
      // background: "#ededf0",
      width: "90%"
      // padding: "10px 36px"
  },

  toggler: {
    
    width: "auto",
    cursor: "pointer",
    /* margin-left:20px; */
    // background: "#ededf0",
    width: "100%"
    // padding: "10px 36px"
},
   arrows: {
    position: "absolute",
    left: "6px",
  textalign: "left",
  transform: "rotate(-90deg)",
  backgroundimage: "url('../images/plus_icon.svg')",
  backgroundsize: "18px",
  backgroundrepeat: "no-repeat",
  position: "absolute",
  width: "24px",
  height: "24px",
  backgroundposition:" center center"
},
// .item::
before: {  
  // padding: "0 5px 0 0",
  left: "8px",
  paddingright:"4px",
  position: "absolute"
}
// item: {  
//   padding: "0 5px 0 0",
//   left: "8px",
//   paddingright:"4px",
//   position: "absolute"
// }
// item: {
//   padding:" 0 0 0 40px",
//   padding: "1rem"
// }
 
// item: {  
//   padding: "0 5px 0 0",
//   left: "8px",
//   // padding-right:"4px",
//   position: "absolute"
// }
  }

    const returnSeasonalMenuItem = (item, i, seasonId) => {
      let menuItem
      if (item.children.length === 0) {
        menuItem = (
          <div className="item appcollapse card childlist " key={i}> <CustomInput className={`${item.class}`} inline type='checkbox' 
          id={item.id} seasonalCollectionId ={item.id} seasonId = {seasonId}
           onClick={(e) => handleCheckboxChange(e.currentTarget.getAttribute("seasonId"), true)} 
           />{item.name}</div>
        )
      } else {
        const seasonId = item.id
        const menuItemChildren = item.children.map((item, i) => {
          const menuItem = returnSeasonalMenuItem(item, i, seasonId)
          return menuItem
        })
        menuItem = (
          
          <div key={i} className="item appcollapse card p-0 ml-2" style={mystyle.item}>
            <CustomInput  onClick={() => checkUncheckSeasonal(item.id)} className={item.class} inline type='checkbox' 
             id={item.id} 
             />
            <div className="toggler pr-6" id={`toggle-menu-item-${item.id}`} onClick={async (e) => {
              onClickRotate(`toggle-menu-item-${item.id}`)              
            }} style={mystyle.toggler}>
              {/* <ShareCust/> */}
            
            <div className="arrows" /><span className="textm"  style={{textIndent:'12px', display:'block'}}>{item.name}</span></div>
            <UncontrolledCollapse className="children collapse " toggler={`#toggle-menu-item-${item.id}`} seasonId={item.id} id={item.id}>
              {menuItemChildren}
            </UncontrolledCollapse>
          </div>
        )
      }
      return menuItem
    }

    const returnCollectionMenuItem = (item, i) => {
      let menuItem
     if (item.children.length === 0) {
        menuItem = (
          <div className="item appcollapse card childlist" key={i}> <CustomInput className={item.class} 
           inline type='checkbox'
           id={item.id}
           onClick={() => handleCheckboxChange()} 
          />{item.name}</div>
        )
      } else {
        const menuItemChildren = item.children.map((item, i) => {
          const menuItem = returnCollectionMenuItem(item, i)
          return menuItem
        })
        menuItem = (
          
          <div key={i} className="item appcollapse card p-0 ml-2" style={mystyle.item}>
            <CustomInput onClick={() => checkUncheckCollection(item.id)} className={item.class} 
           inline type='checkbox' 
            // id={`rolecheck_b-${item.id}`}
             id={item.id}
            />
            <div className="toggler pr-6" id={`toggle-menu-item-${item.id}`} onClick={async (e) => {
              onClickRotate(`toggle-menu-item-${item.id}`)              
            }} style={mystyle.toggler}>
            
            <div className="arrows" /><span className="textm"  style={{textIndent:'12px', display:'block'}}>{item.name}</span></div>
            <UncontrolledCollapse className="children collapse" toggler={`#toggle-menu-item-${item.id}`}>
              {menuItemChildren}
            </UncontrolledCollapse>
          </div>
        )
      }
      return menuItem
    }

  const SeasonalCollectionRender = () => {
    const items = []
    let CatogeryTypes = []
    const CatogeryTypes1 = []
    const catogeryconfig = new Object()
    catogeryconfig.uniqueid = (Math.random() * 1000000000).toFixed(0)
    catogeryconfig.name = "SeasonalCollection"
    catogeryconfig.id = 1
    catogeryconfig.class = "config role_check"
    catogeryconfig.children = []
    CatogeryTypes.push(catogeryconfig)
    if (store.data !== null && store.data !== undefined && store.allData.length > 0) {
        CatogeryTypes = []
        catogeryconfig.class = "config role_check"
        catogeryconfig.name = "Seasonal Collection"
        catogeryconfig.id = 1
        store1.allData.map((item, i) => {
            const type = new Object()
            type.uniqueid = (Math.random() * 1000000000).toFixed(0)
            type.id = item.seasonId
            type.name = item.seasonName
            type.class = "Dtype role_check"
            const Groups = []
            item.collectionListDtos.map((item1, i) => {
                const group = new Object()
                group.uniqueid = (Math.random() * 1000000000).toFixed(0)
                group.id = item1.collectionId
                group.name = item1.collectionName
                group.class = "Dgroup role_check"
                group.children = []
                Groups.push(group)
            })
            type.children = Groups
            CatogeryTypes1.push(type)
        })
        catogeryconfig.children = CatogeryTypes1
        CatogeryTypes.push(catogeryconfig)
    }
    if (CatogeryTypes.length > 0) {
     const menuItems = CatogeryTypes.map((item, i) => {
            const menuItem = returnSeasonalMenuItem(item, i, item.id)
            return menuItem
        })
        items.push(menuItems)
    }
    return items 
  }

const CollectionRender  = () => {
  const items = []
  let CatogeryTypes = []
  const CatogeryTypes1 = []
  const catogeryconfig = new Object()
  catogeryconfig.uniqueid = (Math.random() * 1000000000).toFixed(0)
  catogeryconfig.name = "Collection"
  catogeryconfig.id = 2
  catogeryconfig.class = "config role_check"
  catogeryconfig.children = []
  CatogeryTypes.push(catogeryconfig)
  if (store.data !== null && store.data !== undefined && store.allData.length > 0) {
      CatogeryTypes = []
      catogeryconfig.class = "config role_check"
      catogeryconfig.name = "Collection"
      catogeryconfig.id = 2
      store.allData.map((item, i) => {
          const type = new Object()
          type.uniqueid = (Math.random() * 1000000000).toFixed(0)
          type.id = item.collection_Id
          type.name = item.collection_Name
          type.class = "Dtype1 role_check"
          type.children = []
          CatogeryTypes1.push(type)
      })
      catogeryconfig.children = CatogeryTypes1
      CatogeryTypes.push(catogeryconfig)
  }
  if (CatogeryTypes.length > 0) {
   const menuItems = CatogeryTypes.map((item, i) => {
          const menuItem = returnCollectionMenuItem(item, i)
          return menuItem
      })
      items.push(menuItems)
  }
  return items
}

  return (
    <Form onSubmit={(e) => {
       e.preventDefault()
     SaveCustomerShareConfiguration()
 
  }}>         
        <div>    
        <div className="items collapse-icon collapse-margin">
            {SeasonalCollectionRender()}
        </div>
        <div className="items collapse-icon collapse-margin2">
            {CollectionRender()}
        </div>
        <ModalFooterUI setis_open={props.setOpen1} FooterBtnName="Save" />   
    </div>
  </Form>
  ) 
  //<div className="items collapse-icon collapse-margin">{dataToRender()}</div>
}
export default ShareDesignAccordion 