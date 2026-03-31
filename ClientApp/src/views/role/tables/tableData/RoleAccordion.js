import React, { useState, useEffect } from "react"
import { UncontrolledCollapse, CustomInput, CardText } from "reactstrap"
import "./Role.css"
import { roleData } from './data'
import "../images/plus_icon.svg"
import "../images/minus_icon.svg"
import { useSelector, useDispatch } from 'react-redux'
const RoleAccordion = (props) => {
    
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    //  const dispatch = useDispatch()
    const store = useSelector(state => state.RoleDesignConfig)
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
    function checkUncheck(id) {
       
        const elem = document.getElementById(id)
        const feat = elem.parentElement.parentElement.getElementsByClassName('Dfeature')
        for (let i = 0; i < feat.length; i++) {
            feat[i].firstElementChild.checked = elem.checked
        }
        const grp = elem.parentElement.parentElement.getElementsByClassName('Dgroup')
        for (let i = 0; i < grp.length; i++) {
            grp[i].firstElementChild.checked = elem.checked
        }
    }
    const returnMenuItem = (item, i) => {
        let menuItem

        if (item.children.length === 0) {
            menuItem = (
                <div className="item app-collapse card childlist card ml-0" key={i}> 
                 { item.name === "Design Configuration" ? <></> : <CustomInput className={item.class} inline type='checkbox' dcid={item.design_Configuration_Id} 
                 rpcid={item.role_design_configuration_id} defaultChecked={eval(item.role_design_configuration_id === 0 ? "false" : "true")}
                  id={item.uniqueid} />}{item.name}</div>
            )
        } else {
            const menuItemChildren = item.children.map((item, i) => {
                const menuItem = returnMenuItem(item, i)
                return menuItem
            })
            menuItem = (
                <div key={i} className="item app-collapse card p-0 ml-0" style={{ position: "relative" }}>
                    { item.name === "Design Configuration" ? <></> : <CustomInput onClick={() => checkUncheck(item.uniqueid)} className={item.class}
                      defaultChecked={eval(item.role_design_configuration_id === 0 ? "false" : "true")}
                       dcid={item.design_Configuration_Id} rpcid={item.role_design_configuration_id}
                        inline type='checkbox' id={item.uniqueid} />}
                    <div className="toggler pr-6" id={`toggle-menu-item-${item.uniqueid}`} onClick={async (e) => {
                        onClickRotate(`toggle-menu-item-${item.uniqueid}`)
                    }}>

                        <div className="arrows" />{item.name}</div>
                    <UncontrolledCollapse className="children" toggler={`#toggle-menu-item-${item.uniqueid}`}>
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
        designconfig.uniqueid = (Math.random() * 1000000000).toFixed(0)
        designconfig.name = "Design Configuration"
        designconfig.id = 1
        designconfig.class = "config role_check"
        designconfig.children = []
        DesignTypes.push(designconfig)
        if (store.data !== null && store.data.allDesignTypesByRoles !== undefined && store.data.allDesignTypesByRoles.length > 0) {
            DesignTypes = []
            designconfig.class = "config role_check"
            designconfig.name = "Design Configuration"
            designconfig.id = 1
            store.data.allDesignTypesByRoles.map((item, i) => {
                const type = new Object()
                type.uniqueid = (Math.random() * 1000000000).toFixed(0)
                type.id = item.design_type_id
                type.design_Configuration_Id = item.design_Configuration_Id
                type.role_design_configuration_id = item.role_design_configuration_id
                type.ischecked = item.role_design_configuration_id === 0 ? "false" : "true"
                type.name = item.design_type_name
                type.class = "Dtype role_check"
                const Groups = []
                item.getDesignGroupsByRoleListDto.map((item1, i) => {
                    const group = new Object()
                    group.uniqueid = (Math.random() * 1000000000).toFixed(0)
                    group.id = item1.design_groups_id
                    group.typeid = item1.design_type_id
                    group.design_Configuration_Id = item1.design_Configuration_Id
                    group.role_design_configuration_id = item1.role_design_configuration_id
                    group.ischecked = item.role_design_configuration_id === 0 ? "false" : "true"
                    group.name = item1.design_groups_name
                    group.class = "Dgroup role_check"
                    const Features = []
                    item1.getDesignFeaturesByRoleListDto.map((item2, i) => {
                        const feature = new Object()
                        feature.uniqueid = (Math.random() * 1000000000).toFixed(0)
                        feature.id = item2.design_features_id
                        feature.typeid = item2.design_type_id
                        feature.groupeid = item2.design_groups_id
                        feature.design_Configuration_Id = item2.design_configuration_id
                        feature.role_design_configuration_id = item2.role_design_configuration_id
                        feature.ischecked = item.role_design_configuration_id === 0 ? "false" : "true"
                        feature.name = item2.design_features_name
                        feature.class = "Dfeature role_check"
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


    //   return <AppCollapse className="items">{items}</AppCollapse>
    return <div className="items collapse-icon collapse-margin">{dataToRender()}</div>
}
export default RoleAccordion
