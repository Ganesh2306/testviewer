import React, { useState, useEffect } from "react"
import { UncontrolledCollapse, CustomInput, CardText } from "reactstrap"
import { roleData } from './DesignData'
 import "./Share.css"
 import "../images/plus_icon.svg"
import "../images/minus_icon.svg"

const ShareDesignAccordion = (props) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

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

  useEffect(() => {
 
    const returnMenuItem = (item, i) => {
      let menuItem

      if (item.children.length === 0) {
        menuItem = (
          <div className="item appcollapse card childlist" key={i}> <CustomInput className="role_check" inline type='checkbox' id={`rolecheck-${item.id}`} />{item.name}</div>
        )
      } else {
        const menuItemChildren = item.children.map((item, i) => {
          const menuItem = returnMenuItem(item, i)
          return menuItem
        })
        menuItem = (
          
          <div key={i} className="item appcollapse card p-0 ml-2" style={mystyle.item}>
            <CustomInput className="role_check" inline type='checkbox' id={`rolecheck_b-${item.id}`} />
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

    const load = async () => {
      setLoading(false)
      const menuItems = roleData.map((item, i) => {
        const menuItem = returnMenuItem(item, i)
        return menuItem
      })
      setItems(menuItems)
    }
    if (loading) {
      load()
    }
  }, [loading])

//   return <AppCollapse className="items">{items}</AppCollapse>
  return <div className="items collapse-icon collapse-margin">{items}</div>
}
export default ShareDesignAccordion 
