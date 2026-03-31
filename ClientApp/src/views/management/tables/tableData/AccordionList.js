import React, { useState, useEffect } from "react"
import { UncontrolledCollapse, CardText } from "reactstrap"
import "./accordion.css"
import AppCollapse from '@components/app-collapse'
import { menuData } from './data'
import { GetDesignTypes } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import AddDesignConfig from './OpenDesignConfig'
import { ChevronDown, Plus } from "react-feather"
import "../images/plus_icon.svg"
import "../images/minus_icon.svg"

const AccordionList = (props) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
    const dispatch = useDispatch()
    const store = useSelector(state => state.DesignType)

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
    useEffect(() => {
        dispatch(
            GetDesignTypes({
                page: "",
                perPage: "",
                q: ""
            })
        )
    }, [dispatch])
    

    const returnMenuItem = (item, i) => {
        let menuItem

        if (item.children.length === 0) {
            menuItem = (
                //Togall 
                <div className="item app-collapse card childlist Dfeature" key={i}>{item.name}
                    <AddDesignConfig pcid={item.design_Configuration_Id} type={item.class} id={item.id} groupid={item.groupeid === undefined ? 0 : item.groupeid} typeid={item.typeid === undefined ? 0 : item.typeid} />
                </div>
            )
        } else {
            const menuItemChildren = item.children.map((item, i) => {
                const menuItem = returnMenuItem(item, i)
                // List
                return menuItem
            })
            menuItem = (
                <div key={i} className="item app-collapse card p-0" style={{ position: "relative" }}><AddDesignConfig pcid={item.design_Configuration_Id } type={item.class} id={item.id} typeid={item.typeid === undefined ? 0 : item.typeid} />
                    <div className={`toggler pr-6 ${item.class}`} id={`toggle-menu-item-${item.id}`} onClick={async (e) => {
                        onClickRotate(`toggle-menu-item-${item.id}`)
                    }} ><div className="arrows" />{item.name}</div>
                    <UncontrolledCollapse className="children" toggler={`#toggle-menu-item-${item.id}`}>
                        {menuItemChildren}
                    </UncontrolledCollapse>
                </div>
            )
        }
        return menuItem
    }

    const dataToRender = () => {
        const items = []
        let DesignTypes = []
        const DesignTypes1 = []
        const designconfig = new Object()
        designconfig.name = "Design Configuration"
        designconfig.id = 1
        designconfig.class = "config"
        designconfig.children = []
        DesignTypes.push(designconfig)
        if (store.data.length > 0) {
            DesignTypes = []
            designconfig.class = "config"
            designconfig.name = "Design Configuration"
            designconfig.id = 1
            store.data.map((item, i) => {
                const type = new Object()
                type.id = item.design_type_id
                type.design_Configuration_Id = item.design_Configuration_Id
                type.name = item.design_type_name
                type.class = "Dtype"
                const Groups = []
                item.getDesignGroupsByRoleListDto.map((item1, i) => {
                    const group = new Object()
                    group.id = item1.design_groups_id
                    group.typeid = item1.design_type_id
                    group.design_Configuration_Id = item1.design_Configuration_Id
                    group.name = item1.design_groups_name
                    group.class = "Dgroup"
                    const Features = []
                    item1.getDesignFeaturesByRoleListDto.map((item2, i) => {
                        const feature = new Object()
                        feature.id = item2.design_features_id
                        feature.typeid = item2.design_type_id
                        feature.groupeid = item2.design_groups_id
                        feature.design_Configuration_Id = item2.design_configuration_id
                       
                            feature.name = item2.design_features_name
                            feature.children = []
                            Features.push(feature)
                        })
                    group.children = Features
                    Groups.push(group)
                })
                type.children = Groups
                DesignTypes1.push(type)
            })
            designconfig.children = DesignTypes1
            DesignTypes.push(designconfig)
        }
        if (DesignTypes.length > 0) {


            const menuItems = DesignTypes.map((item, i) => {
                const menuItem = returnMenuItem(item, i)
                return menuItem
            })
            items.push(menuItems)
        }
        return items
    }
    

    //const load = async () => {
    //    setLoading(false)
    //    const menuItems = menuData.map((item, i) => {
    //        const menuItem = returnMenuItem(item, i)
    //        return menuItem
    //    })
    //    setItems(menuItems)
    //}
    //if (loading) {
    //    load()
    //}

    return <div className="items collapse-icon collapse-margin">{dataToRender()}</div>
}
export default AccordionList 
